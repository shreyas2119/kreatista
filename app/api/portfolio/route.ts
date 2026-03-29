import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { getAdminAuth } from "@/lib/firebase-admin";

export const dynamic = "force-dynamic";

const BUCKET = "portfolio";
const FILE_PATH = "deck.pdf";
const SIGNED_URL_EXPIRY = 60; // seconds

export async function POST(req: NextRequest) {
  try {
    // 1. Extract Bearer token from Authorization header
    const authHeader = req.headers.get("authorization");
    const idToken = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;

    if (!idToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Verify token server-side — this is the only trusted source of uid/email
    let uid: string;
    let email: string;
    try {
      const decoded = await getAdminAuth().verifyIdToken(idToken);
      uid = decoded.uid;
      email = decoded.email ?? "";
    } catch {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
    }

    // 3. Generate short-lived signed URL
    const { data, error } = await supabaseAdmin.storage
      .from(BUCKET)
      .createSignedUrl(FILE_PATH, SIGNED_URL_EXPIRY);

    if (error || !data?.signedUrl) {
      console.error("Supabase signed URL error:", error);
      return NextResponse.json({ error: "Could not generate link" }, { status: 500 });
    }

    // 4. Log access
    await supabaseAdmin.from("portfolio_access").insert({
      firebase_uid: uid,
      email,
      accessed_at: new Date().toISOString(),
    });

    return NextResponse.json({ url: data.signedUrl });
  } catch (err) {
    console.error("Portfolio route error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

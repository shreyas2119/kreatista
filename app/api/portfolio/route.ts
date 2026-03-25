import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

// The PDF lives at: Supabase Storage > bucket "portfolio" > file "deck.pdf"
// To update the PDF, just re-upload a new file with the same name "deck.pdf"
const BUCKET = "portfolio";
const FILE_PATH = "deck.pdf";
const SIGNED_URL_EXPIRY = 60; // seconds — short-lived so URL can't be shared

export async function POST(req: NextRequest) {
  try {
    const { uid, email } = await req.json();

    if (!uid || !email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Generate a short-lived signed URL (server-side, uses service role)
    const { data, error } = await supabaseAdmin.storage
      .from(BUCKET)
      .createSignedUrl(FILE_PATH, SIGNED_URL_EXPIRY);

    if (error || !data?.signedUrl) {
      console.error("Supabase signed URL error:", error);
      return NextResponse.json({ error: "Could not generate link" }, { status: 500 });
    }

    // Log the access (RLS on portfolio_access table allows insert for any authenticated call here)
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

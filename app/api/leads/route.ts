import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { requireAdmin } from "@/lib/admin-auth";

const ALLOWED_STATUSES = ["new", "contacted", "qualified", "closed"];

export async function GET(req: NextRequest) {
  const unauth = await requireAdmin();
  if (unauth) return unauth;

  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type") ?? "contact";
  const service = searchParams.get("service");
  const search = searchParams.get("search");
  const page = parseInt(searchParams.get("page") ?? "1");
  const limit = 20;
  const offset = (page - 1) * limit;

  if (type === "audit") {
    let query = supabaseAdmin
      .from("leads")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (search) query = query.or(`full_name.ilike.%${search}%,email.ilike.%${search}%,website.ilike.%${search}%`);

    const { data, error, count } = await query;
    if (error) {
      console.error("Audit leads fetch error:", JSON.stringify(error));
      // Table may not exist yet — return empty gracefully
      if (error.code === "42P01") {
        return NextResponse.json({ leads: [], total: 0, page, limit, type: "audit" });
      }
      return NextResponse.json({ error: error.message, details: error }, { status: 500 });
    }

    return NextResponse.json({
      leads: data ?? [],
      total: count ?? 0,
      page,
      limit,
      type: "audit",
    });
  }

  // Default: contact_submissions
  let query = supabaseAdmin
    .from("contact_submissions")
    .select("*", { count: "exact" })
    .order("id", { ascending: false })
    .range(offset, offset + limit - 1);

  if (service && service !== "all") query = query.eq("subject", service);
  if (search) query = query.or(`first_name.ilike.%${search}%,last_name.ilike.%${search}%,email.ilike.%${search}%`);

  const { data, error, count } = await query;
  if (error) {
    console.error("Leads fetch error:", JSON.stringify(error));
    return NextResponse.json({ error: error.message, details: error }, { status: 500 });
  }

  return NextResponse.json({ leads: data ?? [], total: count ?? 0, page, limit, type: "contact" });
}

// PATCH — update status
export async function PATCH(req: NextRequest) {
  const unauth = await requireAdmin();
  if (unauth) return unauth;

  const { id, status, type } = await req.json();
  if (!id || !status) return NextResponse.json({ error: "Missing id or status" }, { status: 400 });

  if (!ALLOWED_STATUSES.includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const table = type === "audit" ? "leads" : "contact_submissions";

  const { error } = await supabaseAdmin
    .from(table)
    .update({ status })
    .eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}

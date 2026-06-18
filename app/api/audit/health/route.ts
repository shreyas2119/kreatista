import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { requireAdmin } from "@/lib/admin-auth";

export async function GET() {
  const unauth = await requireAdmin();
  if (unauth) return unauth;

  const checks: Record<string, { status: "ok" | "error"; message: string }> = {};

  // Check Supabase connectivity
  try {
    const { error } = await supabaseAdmin.from("leads").select("id", { count: "exact", head: true });
    if (error) throw error;
    checks.supabase = { status: "ok", message: "Connected" };
  } catch (err) {
    checks.supabase = { status: "error", message: err instanceof Error ? err.message : "Connection failed" };
  }

  // Check OpenRouter AI key
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey || apiKey.trim() === "") {
    checks.openrouter = { status: "error", message: "API key not configured" };
  } else {
    try {
      const res = await fetch("https://openrouter.ai/api/v1/auth/key", {
        headers: { Authorization: `Bearer ${apiKey.trim()}` },
      });
      if (res.ok) {
        checks.openrouter = { status: "ok", message: "Connected" };
      } else {
        const data = await res.json();
        checks.openrouter = { status: "error", message: data.error?.message || `HTTP ${res.status}` };
      }
    } catch (err) {
      checks.openrouter = { status: "error", message: err instanceof Error ? err.message : "Connection failed" };
    }
  }

  // Check Gmail/Nodemailer config
  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD;
  if (!gmailUser || !gmailPass) {
    checks.email = { status: "error", message: "Gmail credentials not configured" };
  } else {
    checks.email = { status: "ok", message: "Configured" };
  }

  // Check the reports table exists
  try {
    const { error } = await supabaseAdmin.from("reports").select("id", { count: "exact", head: true });
    if (error) throw error;
    checks.reportsTable = { status: "ok", message: "Ready" };
  } catch (err) {
    checks.reportsTable = { status: "error", message: err instanceof Error ? err.message : "Table not found" };
  }

  const allOk = Object.values(checks).every((c) => c.status === "ok");

  return NextResponse.json({ status: allOk ? "healthy" : "degraded", checks });
}

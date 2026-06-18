import { NextResponse } from "next/server";

/**
 * Public uptime endpoint for Better Stack monitoring.
 * No auth required — lightweight ping that verifies the server responds.
 */
export async function GET() {
  try {
    const checks: Record<string, string> = {};

    // Quick Supabase connectivity check
    try {
      const { supabaseAdmin } = await import("@/lib/supabase");
      const { error } = await supabaseAdmin.from("leads").select("id", { count: "exact", head: true });
      if (error && error.code !== "42P01") throw error;
      checks.database = "ok";
    } catch {
      checks.database = "error";
    }

    // OpenRouter API key presence check
    const apiKey = process.env.OPENROUTER_API_KEY;
    checks.ai = apiKey && apiKey.trim() ? "ok" : "unconfigured";

    // Email config presence check
    checks.email = process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD ? "ok" : "unconfigured";

    const allOk = Object.values(checks).every((c) => c === "ok");
    const statusCode = allOk ? 200 : 200; // Always return 200 so uptime monitors see a response

    return NextResponse.json(
      {
        status: allOk ? "healthy" : "degraded",
        uptime: true,
        timestamp: new Date().toISOString(),
        checks,
      },
      { status: statusCode }
    );
  } catch {
    return NextResponse.json(
      { status: "error", uptime: false, timestamp: new Date().toISOString() },
      { status: 500 }
    );
  }
}

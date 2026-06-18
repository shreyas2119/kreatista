import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import * as Sentry from "@sentry/nextjs";
import { scrapeWebsite } from "@/lib/scraper";
import { generateFullReport } from "@/lib/audit";
import { supabaseAdmin } from "@/lib/supabase";
import { sendReportEmail } from "@/lib/email";

const rateLimit = new Map<string, { count: number; resetAt: number }>();
const LIMIT = 5;
const WINDOW_MS = 10 * 60 * 1000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (entry.count >= LIMIT) return false;
  entry.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
    }

    const { url, name, email } = await request.json();

    if (!url || !name || !email) {
      return NextResponse.json({ error: "URL, name, and email are required" }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const normalizedUrl = url.startsWith("http") ? url : `https://${url}`;
    try {
      new URL(normalizedUrl);
    } catch {
      return NextResponse.json({ error: "Invalid URL format" }, { status: 400 });
    }

    // Scrape and generate full report
    const scraped = await scrapeWebsite(normalizedUrl);
    const report = await generateFullReport(scraped);

    // Save report to Supabase
    const reportId = crypto.randomUUID();

    const { error: reportError } = await supabaseAdmin.from("reports").insert({
      id: reportId,
      website: normalizedUrl,
      report_json: report,
      score: report.overallScore,
    });

    if (reportError) {
      console.error("Report insert error:", reportError);
      return NextResponse.json({ error: "Failed to save report" }, { status: 500 });
    }

    // Save lead to Supabase
    const { error: leadError } = await supabaseAdmin.from("leads").insert({
      id: crypto.randomUUID(),
      full_name: name,
      email,
      website: normalizedUrl,
      score: report.overallScore,
      report_id: reportId,
    });

    if (leadError) {
      console.error("Lead insert error:", leadError);
    }

    // Send email with report link
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://socioryx.com";
    const reportUrl = `${baseUrl}/report/${reportId}`;

    try {
      await sendReportEmail(name, email, normalizedUrl, report.overallScore, report.findings, reportUrl);
    } catch (emailError) {
      console.error("Email send error:", emailError);
    }

    return NextResponse.json({
      success: true,
      reportId,
      reportUrl,
    });
  } catch (error) {
    console.error("Audit report error:", error);
    Sentry.captureException(error, { tags: { endpoint: "audit/report" } });
    const message = error instanceof Error ? error.message : "Failed to generate report";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

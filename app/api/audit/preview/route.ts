import { NextRequest, NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";
import { scrapeWebsite } from "@/lib/scraper";
import { generatePreview } from "@/lib/audit";

const rateLimit = new Map<string, { count: number; resetAt: number }>();
const LIMIT = 10;
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

    const { url } = await request.json();
    if (!url) {
      return NextResponse.json({ error: "Website URL is required" }, { status: 400 });
    }

    const normalizedUrl = url.startsWith("http") ? url : `https://${url}`;
    try {
      new URL(normalizedUrl);
    } catch {
      return NextResponse.json({ error: "Invalid URL format" }, { status: 400 });
    }

    const scraped = await scrapeWebsite(normalizedUrl);
    const preview = await generatePreview(scraped);

    return NextResponse.json({ success: true, preview });
  } catch (error) {
    console.error("Audit preview error:", error);
    Sentry.captureException(error, { tags: { endpoint: "audit/preview" } });
    const message = error instanceof Error ? error.message : "Failed to analyze website";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

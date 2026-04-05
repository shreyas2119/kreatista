import { NextResponse } from "next/server";
import { createHash, timingSafeEqual } from "crypto";

// In-memory rate limiter — resets on server restart (fine for edge cases)
const attempts = new Map<string, { count: number; resetAt: number }>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

function getIP(req: Request): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
}

function sanitize(input: string): string {
  // Remove non-printable characters, limit length
  return input.replace(/[^\x20-\x7E]/g, "").slice(0, 200);
}

function safeCompare(a: string, b: string): boolean {
  try {
    const bufA = Buffer.from(createHash("sha256").update(a).digest("hex"));
    const bufB = Buffer.from(createHash("sha256").update(b).digest("hex"));
    return timingSafeEqual(bufA, bufB);
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  const ip = getIP(req);
  const now = Date.now();

  // Rate limit check
  const record = attempts.get(ip);
  if (record) {
    if (now < record.resetAt && record.count >= MAX_ATTEMPTS) {
      // Always return same generic message
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }
    if (now >= record.resetAt) {
      attempts.delete(ip);
    }
  }

  let body: { password?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (typeof body.password !== "string") {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const password = sanitize(body.password);
  const expected = process.env.ADMIN_PASSWORD ?? "";

  const valid = safeCompare(password, expected);

  if (!valid) {
    // Increment attempt counter
    const current = attempts.get(ip) ?? { count: 0, resetAt: now + WINDOW_MS };
    attempts.set(ip, { count: current.count + 1, resetAt: current.resetAt });
    // Generic error — same message regardless of reason
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  // Success — clear attempts
  attempts.delete(ip);

  const response = NextResponse.json({ success: true });
  response.cookies.set("socioryx_admin", process.env.ADMIN_SESSION_TOKEN!, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  // Security headers
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");

  return response;
}

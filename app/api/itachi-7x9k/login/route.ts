import { NextResponse } from "next/server";
import { createHash, timingSafeEqual } from "crypto";

// Per-IP rate limiter
const ipAttempts = new Map<string, { count: number; resetAt: number }>();
// Global rate limiter — catches distributed brute force across IPs
const globalAttempts = { count: 0, resetAt: Date.now() + 60_000 };

const MAX_PER_IP = 5;
const MAX_GLOBAL = 20; // max 20 attempts/min across all IPs
const WINDOW_MS = 15 * 60 * 1000; // 15 min per-IP window
const GLOBAL_WINDOW_MS = 60 * 1000; // 1 min global window

function getIP(req: Request): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
}

function sanitize(input: string): string {
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

function checkRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();

  // Reset global window if expired
  if (now > globalAttempts.resetAt) {
    globalAttempts.count = 0;
    globalAttempts.resetAt = now + GLOBAL_WINDOW_MS;
  }

  // Check global limit first
  if (globalAttempts.count >= MAX_GLOBAL) {
    return { allowed: false, retryAfter: Math.ceil((globalAttempts.resetAt - now) / 1000) };
  }

  // Check per-IP limit
  const record = ipAttempts.get(ip);
  if (record) {
    if (now > record.resetAt) {
      ipAttempts.delete(ip);
    } else if (record.count >= MAX_PER_IP) {
      return { allowed: false, retryAfter: Math.ceil((record.resetAt - now) / 1000) };
    }
  }

  return { allowed: true };
}

function recordFailure(ip: string) {
  const now = Date.now();

  // Increment global
  globalAttempts.count++;

  // Increment per-IP
  const record = ipAttempts.get(ip);
  if (!record || now > record.resetAt) {
    ipAttempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
  } else {
    record.count++;
  }
}

export async function POST(req: Request) {
  const ip = getIP(req);

  // Rate limit check
  const { allowed, retryAfter } = checkRateLimit(ip);
  if (!allowed) {
    return NextResponse.json(
      { error: "Too many requests" },
      {
        status: 429,
        headers: retryAfter ? { "Retry-After": String(retryAfter) } : {},
      }
    );
  }

  // Parse body
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

  // Always run comparison even if password is empty — prevents timing attacks
  const valid = safeCompare(password, expected);

  if (!valid) {
    recordFailure(ip);
    // Constant-time delay to prevent timing-based enumeration
    await new Promise((r) => setTimeout(r, 300 + Math.random() * 200));
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  // Success — clear per-IP attempts
  ipAttempts.delete(ip);

  const response = NextResponse.json({ success: true });
  response.cookies.set("socioryx_admin", process.env.ADMIN_SESSION_TOKEN!, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });

  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");

  return response;
}

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Edge-compatible timing-safe string comparison
// Uses fixed-time XOR to prevent timing attacks without Node crypto
function safeTokenCompare(a: string, b: string): boolean {
  if (a.length !== b.length) {
    // Still do a dummy comparison to avoid length-based timing leak
    let dummy = 0;
    for (let i = 0; i < a.length; i++) dummy |= a.charCodeAt(i);
    return false;
  }
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/itachi-7x9k")) {
    if (pathname === "/itachi-7x9k/login") return NextResponse.next();

    const adminSession = request.cookies.get("socioryx_admin");
    const expected = process.env.ADMIN_SESSION_TOKEN ?? "";

    if (!adminSession || !safeTokenCompare(adminSession.value, expected)) {
      return new NextResponse(null, { status: 404 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/itachi-7x9k/:path*"],
};

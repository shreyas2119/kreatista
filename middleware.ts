import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/itachi-7x9k")) {
    // Login page itself — always allow
    if (pathname === "/itachi-7x9k/login") return NextResponse.next();

    const adminSession = request.cookies.get("socioryx_admin");
    if (!adminSession || adminSession.value !== process.env.ADMIN_SESSION_TOKEN) {
      // Return 404 instead of redirect — hides that the page exists
      return new NextResponse(null, { status: 404 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/itachi-7x9k/:path*"],
};

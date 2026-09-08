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

function markdownFor(pathname: string): string {
  const base = "https://socioryx.com";
  const pages: Record<string, string> = {
    "/": `# Socioryx — Content Marketing Agency India

Socioryx is a full-stack content marketing agency for D2C brands, SaaS startups & creators. One team for websites, social media, video, and influencer marketing.

## Services
- Website Design & Development: ${base}/services/website-design-development
- Brand Marketing & Positioning: ${base}/services/brand-marketing-positioning
- Content Creation: ${base}/services/content-creation-social-media
- Social Media Management: ${base}/services/social-media-management
- Influencer Marketing: ${base}/services/influencer-marketing-d2c-brands
- Video Production: ${base}/services/video-production

## Contact
- Email: work@socioryx.com
- Site: ${base}
- Book a call: ${base}/free-ai-marketing-audit

## Links
- Docs: ${base}/docs/api
- API catalog: ${base}/.well-known/api-catalog
- AI catalog: ${base}/.well-known/ai-catalog.json
`,
  };
  return pages[pathname] ?? `# Socioryx — ${pathname}\n\nContent for ${base}${pathname}. See ${base} for full site.\n\n- API catalog: ${base}/.well-known/api-catalog\n- AI catalog: ${base}/.well-known/ai-catalog.json\n`;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Markdown negotiation — RFC: Accept: text/markdown returns markdown
  const accept = request.headers.get("accept") || "";
  if (accept.includes("text/markdown") && request.method === "GET") {
    const isPage =
      !pathname.startsWith("/api/") &&
      !pathname.startsWith("/_next") &&
      !pathname.startsWith("/.well-known") &&
      !pathname.includes(".") &&
      !pathname.startsWith("/monitoring");
    if (isPage) {
      const md = markdownFor(pathname);
      const tokens = String(Math.ceil(md.length / 4));
      return new Response(md, {
        headers: {
          "Content-Type": "text/markdown; charset=utf-8",
          "x-markdown-tokens": tokens,
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "public, max-age=3600",
        },
      });
    }
  }

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
  matcher: ["/itachi-7x9k/:path*", "/:path*"],
};

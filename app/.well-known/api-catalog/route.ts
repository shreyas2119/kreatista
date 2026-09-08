import { NextResponse } from "next/server";

export async function GET() {
  const base = "https://socioryx.com";
  const body = {
    linkset: [
      {
        anchor: base,
        "api-catalog": [{ href: `${base}/.well-known/api-catalog`, type: "application/linkset+json" }],
        "service-desc": [
          { href: `${base}/openapi.json`, type: "application/vnd.oai.openapi+json", title: "Socioryx OpenAPI" },
        ],
        "service-doc": [{ href: `${base}/docs/api`, type: "text/html", title: "API Documentation" }],
        status: [{ href: `${base}/api/uptime`, type: "application/json", title: "Health" }],
        describedby: [{ href: `${base}/.well-known/ai-catalog.json`, type: "application/json" }],
      },
      {
        anchor: `${base}/api/contact`,
        "service-desc": [{ href: `${base}/openapi.json`, type: "application/vnd.oai.openapi+json" }],
        "service-doc": [{ href: `${base}/docs/api#contact`, type: "text/html" }],
      },
      {
        anchor: `${base}/api/audit`,
        "service-desc": [{ href: `${base}/openapi.json`, type: "application/vnd.oai.openapi+json" }],
        "service-doc": [{ href: `${base}/docs/api#audit`, type: "text/html" }],
        status: [{ href: `${base}/api/audit/health`, type: "application/json" }],
      },
    ],
  };
  return NextResponse.json(body, {
    headers: {
      "Content-Type": "application/linkset+json",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

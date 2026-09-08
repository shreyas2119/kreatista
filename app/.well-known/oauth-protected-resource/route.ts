import { NextResponse } from "next/server";

export async function GET() {
  const base = "https://socioryx.com";
  return NextResponse.json(
    {
      resource: base,
      authorization_servers: [base],
      scopes_supported: ["read", "write", "openid", "profile", "email"],
      bearer_methods_supported: ["header"],
      resource_name: "Socioryx API",
      resource_documentation: `${base}/docs/api`,
    },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, max-age=3600",
      },
    }
  );
}

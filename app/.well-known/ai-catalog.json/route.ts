import { NextResponse } from "next/server";

export async function GET() {
  const base = "https://socioryx.com";
  const body = {
    specVersion: "1.0",
    host: {
      displayName: "Socioryx",
      identifier: "did:web:socioryx.com",
    },
    entries: [
      {
        identifier: "urn:air:socioryx.com:service:content-marketing",
        displayName: "Content Marketing Services",
        type: "text/html",
        url: `${base}/services`,
        representativeQueries: [
          "content marketing services for D2C brands",
          "social media management for startups",
          "influencer marketing in India",
          "video production for brands",
        ],
      },
      {
        identifier: "urn:air:socioryx.com:service:ai-audit",
        displayName: "Free AI Marketing Audit",
        type: "application/json",
        url: `${base}/free-ai-marketing-audit`,
        representativeQueries: [
          "get a free AI marketing audit",
          "analyze my brand's content strategy",
          "audit my D2C brand marketing",
        ],
      },
      {
        identifier: "urn:air:socioryx.com:blog:insights",
        displayName: "Socioryx Blog Insights",
        type: "text/html",
        url: `${base}/blog`,
        representativeQueries: [
          "D2C growth without paid ads",
          "how to fix Instagram Reels engagement",
          "build a content funnel for SaaS",
        ],
      },
      {
        identifier: "urn:air:socioryx.com:mcp:server",
        displayName: "Socioryx MCP Server",
        type: "application/mcp-server-card+json",
        url: `${base}/.well-known/mcp/server-card.json`,
        representativeQueries: [
          "list Socioryx MCP tools",
          "connect to Socioryx MCP server",
          "what can the Socioryx agent do",
        ],
      },
    ],
  };
  return NextResponse.json(body, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

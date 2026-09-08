import { NextResponse } from "next/server";

export async function GET() {
  const base = "https://socioryx.com";
  const body = {
    schemaVersion: "1.0",
    serverInfo: { name: "Socioryx MCP Server", version: "1.0.0", title: "Socioryx" },
    endpoint: `${base}/mcp`,
    transport: { type: "streamable-http", endpoint: `${base}/mcp` },
    capabilities: {
      tools: { listChanged: true },
      resources: { listChanged: true },
      prompts: { listChanged: false },
    },
    description: "Socioryx content marketing MCP server",
  };
  return NextResponse.json(body, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

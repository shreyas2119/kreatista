import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    {
      serverInfo: { name: "Socioryx MCP Server", version: "1.0.0" },
      endpoint: "https://socioryx.com/mcp",
      capabilities: { tools: {}, resources: {}, prompts: {} },
      description: "Socioryx MCP server card — use /.well-known/mcp/server-card.json",
    },
    { headers: { "Access-Control-Allow-Origin": "*" } }
  );
}

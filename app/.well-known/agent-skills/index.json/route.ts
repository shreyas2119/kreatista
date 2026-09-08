import { NextResponse } from "next/server";

export async function GET() {
  const body = {
    $schema: "https://schemas.agentskills.io/discovery/0.2.0/schema.json",
    skills: [
      {
        name: "socioryx-api",
        type: "skill-md",
        description: "Socioryx content marketing API — contact, audit, portfolio and discovery endpoints",
        url: "https://socioryx.com/.well-known/agent-skills/socioryx-api/SKILL.md",
        digest: "sha256:d50d90983cc3323df64e91d2d5b83617b983149ef901e4674ddc2c6c46af5875",
      },
      {
        name: "socioryx-content-marketing",
        type: "skill-md",
        description: "Socioryx content marketing services catalog for D2C and SaaS brands",
        url: "https://socioryx.com/.well-known/agent-skills/socioryx-api/SKILL.md",
        digest: "sha256:d50d90983cc3323df64e91d2d5b83617b983149ef901e4674ddc2c6c46af5875",
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

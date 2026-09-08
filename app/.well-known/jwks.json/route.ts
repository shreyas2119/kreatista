import { NextResponse } from "next/server";
// Placeholder JWKS — replace with real keys when you enable auth
export async function GET() {
  return NextResponse.json(
    { keys: [] },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, max-age=3600",
      },
    }
  );
}

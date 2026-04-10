import { cookies } from "next/headers";
import { NextResponse } from "next/server";

/**
 * Verifies the admin session cookie server-side.
 * Returns null if valid, or a 401 NextResponse if not.
 */
export async function requireAdmin(): Promise<NextResponse | null> {
  const cookieStore = await cookies();
  const session = cookieStore.get("socioryx_admin")?.value;

  if (!session || session !== process.env.ADMIN_SESSION_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

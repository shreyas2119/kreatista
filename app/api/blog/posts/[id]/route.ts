import { NextResponse } from "next/server";
import { getPostByIdAdmin, updatePost, deletePost } from "@/lib/blog";
import { requireAdmin } from "@/lib/admin-auth";

// GET /api/blog/posts/[id] — admin only (used by edit page)
export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const unauth = await requireAdmin();
  if (unauth) return unauth;

  const { id } = await params;
  if (!isValidUUID(id)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

  const post = await getPostByIdAdmin(id);
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(post);
}

// PATCH /api/blog/posts/[id] — admin only
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const unauth = await requireAdmin();
  if (unauth) return unauth;

  const { id } = await params;
  if (!isValidUUID(id)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

  try {
    const body = await req.json();

    // Prevent overwriting id or created_at
    delete body.id;
    delete body.created_at;

    // Validate slug if provided
    if (body.slug && !/^[a-z0-9-]+$/.test(body.slug)) {
      return NextResponse.json({ error: "Invalid slug format" }, { status: 400 });
    }

    const post = await updatePost(id, body);
    return NextResponse.json(post);
  } catch {
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
  }
}

// DELETE /api/blog/posts/[id] — admin only
export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const unauth = await requireAdmin();
  if (unauth) return unauth;

  const { id } = await params;
  if (!isValidUUID(id)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

  try {
    await deletePost(id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
  }
}

// UUID v4 validation — prevents path traversal / injection via id param
function isValidUUID(id: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id);
}

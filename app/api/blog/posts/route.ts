import { NextResponse } from "next/server";
import { getAllPostsAdmin, createPost, getPublishedPosts } from "@/lib/blog";
import { requireAdmin } from "@/lib/admin-auth";

// GET /api/blog/posts
// Public: returns only published posts (no auth)
// Admin: pass ?admin=1 with valid session to get all posts including drafts
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  if (searchParams.get("admin") === "1") {
    const unauth = await requireAdmin();
    if (unauth) return unauth;
    try {
      const posts = await getAllPostsAdmin();
      return NextResponse.json(posts);
    } catch {
      return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
    }
  }

  // Public — published only
  try {
    const posts = await getPublishedPosts();
    return NextResponse.json(posts);
  } catch {
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}

// POST /api/blog/posts — create post (admin only)
export async function POST(req: Request) {
  const unauth = await requireAdmin();
  if (unauth) return unauth;

  try {
    const body = await req.json();

    // Validate required fields
    if (!body.title || typeof body.title !== "string") {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }
    if (!body.slug || typeof body.slug !== "string") {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }
    // Sanitize slug — only allow url-safe chars
    if (!/^[a-z0-9-]+$/.test(body.slug)) {
      return NextResponse.json({ error: "Invalid slug format" }, { status: 400 });
    }

    const post = await createPost(body);
    return NextResponse.json(post, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { getAllPostsAdmin, createPost } from "@/lib/blog";

// GET /api/blog/posts — all posts (admin)
export async function GET() {
  try {
    const posts = await getAllPostsAdmin();
    return NextResponse.json(posts);
  } catch {
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}

// POST /api/blog/posts — create post
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const post = await createPost(body);
    return NextResponse.json(post, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}

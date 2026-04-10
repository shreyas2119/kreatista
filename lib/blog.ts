import { supabaseAdmin } from "./supabase";

// All blog functions are server-side only — use supabaseAdmin throughout
const supabase = supabaseAdmin;

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  cover_image: string | null;
  author: string;
  tags: string[] | null;
  published: boolean;
  published_at: string | null;
  created_at: string;
}

// Public — fetch all published posts
export async function getPublishedPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

// Public — fetch single post by slug
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();
  if (error) return null;
  return data;
}

// Admin — fetch all posts (published + drafts)
export async function getAllPostsAdmin(): Promise<Post[]> {
  const { data, error } = await supabaseAdmin
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

// Admin — fetch single post by id
export async function getPostByIdAdmin(id: string): Promise<Post | null> {
  const { data, error } = await supabaseAdmin
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();
  if (error) return null;
  return data;
}

// Admin — create post
export async function createPost(post: Omit<Post, "id" | "created_at">): Promise<Post> {
  const { data, error } = await supabaseAdmin
    .from("posts")
    .insert([post])
    .select()
    .single();
  if (error) throw error;
  return data;
}

// Admin — update post
export async function updatePost(id: string, post: Partial<Post>): Promise<Post> {
  const { data, error } = await supabaseAdmin
    .from("posts")
    .update(post)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

// Admin — delete post
export async function deletePost(id: string): Promise<void> {
  const { error } = await supabaseAdmin.from("posts").delete().eq("id", id);
  if (error) throw error;
}

// Utility — generate slug from title
export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

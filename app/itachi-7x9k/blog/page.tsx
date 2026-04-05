"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/components/providers/auth-provider";
import type { Post } from "@/lib/blog";

export default function AdminBlogPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!loading && !user) router.replace("/");
  }, [user, loading, router]);

  useEffect(() => {
    if (!user) return;
    fetch("/api/blog/posts")
      .then((r) => r.json())
      .then((data) => { setPosts(data); setFetching(false); })
      .catch(() => setFetching(false));
  }, [user]);

  const deletePost = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    await fetch(`/api/blog/posts/${id}`, { method: "DELETE" });
    setPosts((p) => p.filter((post) => post.id !== id));
  };

  const togglePublish = async (post: Post) => {
    const res = await fetch(`/api/blog/posts/${post.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        published: !post.published,
        published_at: !post.published ? new Date().toISOString() : post.published_at,
      }),
    });
    const updated = await res.json();
    setPosts((p) => p.map((x) => (x.id === post.id ? updated : x)));
  };

  if (loading || !user) return null;

  return (
    <main className="min-h-screen bg-[#0f1419] px-5 sm:px-8 lg:px-16 py-16">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#E5E4E2] mb-1 font-body">Admin</p>
            <h1 className="text-3xl font-semibold text-[#F8F8FF] font-heading">Blog Posts</h1>
          </div>
          <Link
            href="/itachi-7x9k/blog/new"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#E5E4E2] text-[#0f1419] text-sm font-extrabold font-heading rounded-lg hover:bg-[#D0CFD0] transition-colors"
          >
            <Plus className="w-4 h-4" />
            New Post
          </Link>
        </div>

        {fetching ? (
          <p className="text-[#B8C5D6]/40 font-body">Loading...</p>
        ) : posts.length === 0 ? (
          <p className="text-[#B8C5D6]/40 font-body">No posts yet. Create your first one.</p>
        ) : (
          <div className="space-y-3">
            {posts.map((post) => (
              <div key={post.id} className="flex items-center justify-between bg-[#151a21] border border-[#F8F8FF]/[0.06] rounded-xl px-5 py-4">
                <div className="flex-1 min-w-0 mr-4">
                  <div className="flex items-center gap-3 mb-1">
                    <span className={`text-[10px] px-2 py-0.5 rounded font-body tracking-wide uppercase ${post.published ? "bg-green-500/10 text-green-400" : "bg-[#1a1f26] text-[#B8C5D6]/40"}`}>
                      {post.published ? "Published" : "Draft"}
                    </span>
                    {post.tags?.slice(0, 2).map((t) => (
                      <span key={t} className="text-[10px] px-2 py-0.5 bg-[#1a1f26] text-[#B8C5D6]/30 rounded font-body">{t}</span>
                    ))}
                  </div>
                  <p className="text-[#F8F8FF] font-medium font-heading truncate">{post.title}</p>
                  <p className="text-xs text-[#B8C5D6]/30 font-body mt-0.5">
                    {new Date(post.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button onClick={() => togglePublish(post)} title={post.published ? "Unpublish" : "Publish"}
                    className="p-2 text-[#B8C5D6]/40 hover:text-[#E5E4E2] transition-colors">
                    {post.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  <Link href={`/itachi-7x9k/blog/${post.id}/edit`}
                    className="p-2 text-[#B8C5D6]/40 hover:text-[#E5E4E2] transition-colors">
                    <Pencil className="w-4 h-4" />
                  </Link>
                  <button onClick={() => deletePost(post.id)}
                    className="p-2 text-[#B8C5D6]/40 hover:text-red-400 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

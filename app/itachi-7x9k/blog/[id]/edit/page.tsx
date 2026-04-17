"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import type { Post } from "@/lib/blog";
import BlogEditor from "@/components/ui/blog-editor";
import CoverImageUploader from "@/components/ui/cover-image-uploader";
import { AdminField, AdminBackLink, adminInputCls } from "@/components/ui/admin-form-field";

export default function EditPostPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: "", slug: "", excerpt: "", content: "",
    cover_image: "", author: "Socioryx", tags: "", published: false,
  });

  useEffect(() => {
    fetch(`/api/blog/posts/${id}`)
      .then((r) => r.json())
      .then((post: Post) => {
        setForm({
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt ?? "",
          content: post.content ?? "",
          cover_image: post.cover_image ?? "",
          author: post.author,
          tags: post.tags?.join(", ") ?? "",
          published: post.published,
        });
      });
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      ...form,
      tags: form.tags ? form.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
      published_at: form.published ? new Date().toISOString() : null,
    };
    const res = await fetch(`/api/blog/posts/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      router.push("/itachi-7x9k/blog");
    } else {
      alert("Failed to save.");
      setSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0f1419] px-5 sm:px-8 lg:px-16 py-16">
      <div className="max-w-6xl mx-auto">
        <AdminBackLink href="/itachi-7x9k/blog" label="Back to Posts" />

        <h1 className="text-3xl font-semibold text-[#F8F8FF] font-heading mb-8">Edit Post</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="max-w-3xl space-y-5">
          <AdminField label="Title *">
            <input required value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} className={adminInputCls} />
          </AdminField>
          <AdminField label="Slug *">
            <input required value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))} className={adminInputCls} />
          </AdminField>
          <AdminField label="Excerpt">
            <input value={form.excerpt} onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))} className={adminInputCls} />
          </AdminField>
          <AdminField label="Cover Image">
            <CoverImageUploader
              value={form.cover_image}
              onChange={(url) => setForm((f) => ({ ...f, cover_image: url }))}
            />
          </AdminField>
          <AdminField label="Author">
            <input value={form.author} onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))} className={adminInputCls} />
          </AdminField>
          <AdminField label="Tags (comma separated)">
            <input value={form.tags} onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))} className={adminInputCls} />
          </AdminField>
          </div>
          <AdminField label="Content *">
            <BlogEditor
              value={form.content}
              onChange={(v) => setForm((f) => ({ ...f, content: v }))}
            />
          </AdminField>

          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={form.published} onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))}
              className="w-4 h-4 accent-[#E5E4E2]" />
            <span className="text-sm text-[#B8C5D6]/70 font-body">Published</span>
          </label>

          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving}
              className="px-8 py-3 bg-[#E5E4E2] text-[#0f1419] text-sm font-extrabold font-heading rounded-lg hover:bg-[#D0CFD0] transition-colors disabled:opacity-50">
              {saving ? "Saving..." : "Save Changes"}
            </button>
            <Link href="/itachi-7x9k/blog"
              className="px-8 py-3 border border-[#F8F8FF]/10 text-[#B8C5D6] text-sm font-body rounded-lg hover:bg-white/[0.04] transition-colors">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}

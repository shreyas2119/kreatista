"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { slugify } from "@/lib/slugify";
import ImageUploader from "@/components/ui/image-uploader";
import MarkdownRenderer from "@/components/ui/markdown-renderer";
import BlogEditor from "@/components/ui/blog-editor";
import CoverImageUploader from "@/components/ui/cover-image-uploader";
import { AdminField, AdminBackLink, adminInputCls } from "@/components/ui/admin-form-field";
import Link from "next/link";

export default function NewPostPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    cover_image: "",
    author: "Socioryx",
    tags: "",
    published: false,
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setForm((f) => ({ ...f, title, slug: slugify(title) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      ...form,
      tags: form.tags ? form.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
      published_at: form.published ? new Date().toISOString() : null,
    };
    const res = await fetch("/api/blog/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      router.push("/itachi-7x9k/blog");
    } else {
      alert("Failed to save post.");
      setSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0f1419] px-5 sm:px-8 lg:px-16 py-16">
      <div className="max-w-6xl mx-auto">
        <AdminBackLink href="/itachi-7x9k/blog" label="Back to Posts" />

        <h1 className="text-3xl font-semibold text-[#F8F8FF] font-heading mb-8">New Post</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="max-w-3xl space-y-5">
          <AdminField label="Title *">
            <input required value={form.title} onChange={handleTitleChange}
              className={adminInputCls} placeholder="My awesome post" />
          </AdminField>

          <AdminField label="Slug *">
            <input required value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
              className={adminInputCls} placeholder="my-awesome-post" />
          </AdminField>

          <AdminField label="Excerpt">
            <input value={form.excerpt} onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
              className={adminInputCls} placeholder="Short description shown in the blog listing" />
          </AdminField>

          <AdminField label="Cover Image">
            <CoverImageUploader
              value={form.cover_image}
              onChange={(url) => setForm((f) => ({ ...f, cover_image: url }))}
            />
          </AdminField>

          <AdminField label="Author">
            <input value={form.author} onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))}
              className={adminInputCls} />
          </AdminField>

          <AdminField label="Tags (comma separated)">
            <input value={form.tags} onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))}
              className={adminInputCls} placeholder="Marketing, D2C, Social Media" />
          </AdminField>
          </div>

          {/* Content editor */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium tracking-wide uppercase text-[#B8C5D6]/50 font-body">Content *</label>
            <BlogEditor
              value={form.content}
              onChange={(v) => setForm((f) => ({ ...f, content: v }))}
            />
          </div>

          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={form.published} onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))}
              className="w-4 h-4 accent-[#E5E4E2]" />
            <span className="text-sm text-[#B8C5D6]/70 font-body">Publish immediately</span>
          </label>

          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving}
              className="px-8 py-3 bg-[#E5E4E2] text-[#0f1419] text-sm font-extrabold font-heading rounded-lg hover:bg-[#D0CFD0] transition-colors disabled:opacity-50">
              {saving ? "Saving..." : "Save Post"}
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


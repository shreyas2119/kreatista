"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { slugify } from "@/lib/slugify";

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
      <div className="max-w-3xl mx-auto">
        <Link href="/itachi-7x9k/blog" className="inline-flex items-center gap-2 text-sm text-[#B8C5D6] hover:text-[#E5E4E2] transition-colors mb-8 group font-body">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Posts
        </Link>

        <h1 className="text-3xl font-semibold text-[#F8F8FF] font-heading mb-8">New Post</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Field label="Title *">
            <input required value={form.title} onChange={handleTitleChange}
              className={inputCls} placeholder="My awesome post" />
          </Field>

          <Field label="Slug *">
            <input required value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
              className={inputCls} placeholder="my-awesome-post" />
          </Field>

          <Field label="Excerpt">
            <input value={form.excerpt} onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
              className={inputCls} placeholder="Short description shown in the blog listing" />
          </Field>

          <Field label="Cover Image URL">
            <input value={form.cover_image} onChange={(e) => setForm((f) => ({ ...f, cover_image: e.target.value }))}
              className={inputCls} placeholder="https://..." />
          </Field>

          <Field label="Author">
            <input value={form.author} onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))}
              className={inputCls} />
          </Field>

          <Field label="Tags (comma separated)">
            <input value={form.tags} onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))}
              className={inputCls} placeholder="Marketing, D2C, Social Media" />
          </Field>

          <Field label="Content *">
            <textarea required value={form.content} onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
              className={`${inputCls} min-h-[400px] resize-y`} placeholder="Write your post content here..." />
          </Field>

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

const inputCls = "w-full bg-[#151a21] border border-[#F8F8FF]/[0.08] rounded-lg px-4 py-2.5 text-[#F8F8FF] text-sm font-body placeholder:text-[#B8C5D6]/20 focus:outline-none focus:border-[#E5E4E2]/30 transition-colors";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium tracking-wide uppercase text-[#B8C5D6]/50 font-body">{label}</label>
      {children}
    </div>
  );
}

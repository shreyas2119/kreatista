import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import MarkdownRenderer from "@/components/ui/markdown-renderer";
import ScrollToTop from "@/components/ui/scroll-to-top";
import { getPostBySlug, getPublishedPosts } from "@/lib/blog";

export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title,
    description: post.excerpt ?? undefined,
    alternates: { canonical: `https://socioryx.com/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt ?? undefined,
      images: post.cover_image ? [post.cover_image] : undefined,
    },
  };
}

function readingTime(content: string): string {
  const words = content.trim().split(/\s+/).length;
  const mins = Math.max(1, Math.round(words / 200));
  return `${mins} min read`;
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const content = (post.content ?? "").replace(/^#\s+.+\n?/, "");

  return (
    <main className="bg-[#0f1419] min-h-screen">
      <Navbar />

      <article className="pt-32 pb-32 px-5">

        {/* Back link */}
        <div className="max-w-[680px] mx-auto mb-10">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-[#B8C5D6]/40 hover:text-[#B8C5D6] transition-colors group" style={{ fontFamily: "var(--font-blog-ui)" }}>
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            All posts
          </Link>
        </div>

        {/* Header */}
        <header className="max-w-[680px] mx-auto mb-10">
          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-5">
              {post.tags.map((tag) => (
                <span key={tag} className="text-[11px] px-2.5 py-1 bg-[#E5E4E2]/[0.06] text-[#B8C5D6]/50 rounded-full tracking-[0.12em] uppercase" style={{ fontFamily: "var(--font-blog-ui)" }}>
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl font-bold text-[#F8F8FF] tracking-[-0.02em] leading-[1.15] mb-6" style={{ fontFamily: "var(--font-blog-body)" }}>
            {post.title}
          </h1>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-xl text-[#B8C5D6]/55 leading-relaxed mb-8" style={{ fontFamily: "var(--font-blog-body)" }}>
              {post.excerpt}
            </p>
          )}

          {/* Meta row */}
          <div className="flex items-center gap-3 py-4 border-y border-[#F8F8FF]/[0.06]">
            <div className="w-10 h-10 rounded-full bg-[#E5E4E2]/10 flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-bold text-[#E5E4E2]/60" style={{ fontFamily: "var(--font-blog-ui)" }}>
                {post.author.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[15px] font-medium text-[#F8F8FF]/80" style={{ fontFamily: "var(--font-blog-ui)" }}>{post.author}</span>
              <div className="flex items-center gap-2 text-[13px] text-[#B8C5D6]/50" style={{ fontFamily: "var(--font-blog-ui)" }}>
                {post.published_at && (
                  <span>
                    {new Date(post.published_at).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                )}
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {readingTime(post.content ?? "")}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Cover image — same width as content */}
        {post.cover_image && (
          <div className="max-w-[680px] mx-auto mb-14">
            <div className="aspect-video w-full overflow-hidden rounded-2xl bg-[#1a1f26] shadow-2xl">
              <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover" />
            </div>
          </div>
        )}

        {/* Content — narrow for readability, Lora for Medium feel */}
        <div className="max-w-[680px] mx-auto" style={{ fontFamily: "var(--font-blog-body)" }}>
          <MarkdownRenderer content={content} />
        </div>

        {/* Author card at bottom */}
        <div className="max-w-[680px] mx-auto mt-20 pt-8 border-t border-[#F8F8FF]/[0.06]">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-full bg-[#E5E4E2]/10 flex items-center justify-center flex-shrink-0">
              <span className="text-xl font-bold text-[#E5E4E2]/60" style={{ fontFamily: "var(--font-blog-ui)" }}>
                {post.author.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="text-[11px] text-[#B8C5D6]/35 uppercase tracking-[0.14em] mb-1" style={{ fontFamily: "var(--font-blog-ui)" }}>Written by</p>
              <p className="text-base font-semibold text-[#F8F8FF] mb-1" style={{ fontFamily: "var(--font-blog-ui)" }}>{post.author}</p>
              <p className="text-[15px] text-[#B8C5D6]/45 leading-relaxed" style={{ fontFamily: "var(--font-blog-body)" }}>
                Content marketing insights from the Socioryx team.
              </p>
            </div>
          </div>
        </div>

      </article>

      <Footer />
      <ScrollToTop />
    </main>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
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

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <main className="bg-[#0f1419]">
      <Navbar />
      <article className="pt-32 pb-24 px-5 sm:px-8 lg:px-16">
        <div className="max-w-3xl mx-auto">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-[#B8C5D6] hover:text-[#E5E4E2] transition-colors mb-8 group font-body">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            All Posts
          </Link>

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span key={tag} className="text-[10px] px-2 py-0.5 bg-[#1a1f26] text-[#B8C5D6]/50 rounded font-body tracking-wide uppercase">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h1 className="text-3xl sm:text-5xl font-semibold text-[#F8F8FF] tracking-[-0.03em] leading-tight mb-4 font-heading">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 mb-8 text-sm text-[#B8C5D6]/40 font-body">
            <span>{post.author}</span>
            {post.published_at && (
              <>
                <span>·</span>
                <span>{new Date(post.published_at).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</span>
              </>
            )}
          </div>

          {post.cover_image && (
            <div className="aspect-video w-full overflow-hidden rounded-xl bg-[#1a1f26] mb-10">
              <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover" />
            </div>
          )}

          {/* Content — rendered as plain text with whitespace preserved */}
          <div className="prose prose-invert prose-base max-w-none text-[#B8C5D6]/80 leading-relaxed font-body whitespace-pre-wrap">
            {post.content}
          </div>
        </div>
      </article>
      <Footer />
    </main>
  );
}

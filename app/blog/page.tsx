import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import { getPublishedPosts } from "@/lib/blog";
import ScrollToTop from "@/components/ui/scroll-to-top";

export const metadata: Metadata = {
  title: "Blog — Insights on Content Marketing",
  description: "Strategies, insights and playbooks from the Socioryx team on content marketing, D2C growth, and social media.",
  alternates: { canonical: "https://socioryx.com/blog" },
};

export const revalidate = 60; // revalidate every 60s

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <main className="bg-[#0f1419]">
      <Navbar />
      <section className="pt-32 pb-24 px-5 sm:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#E5E4E2] mb-4 font-body">Insights</p>
          <h1 className="text-4xl sm:text-6xl font-semibold text-[#F8F8FF] tracking-[-0.03em] mb-4 font-heading">
            The Socioryx Blog
          </h1>
          <p className="text-[#B8C5D6]/60 text-base mb-16 max-w-xl font-body">
            Strategies, playbooks and insights on content marketing, D2C growth, and social media.
          </p>

          {posts.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-[#B8C5D6]/40 font-body">No posts yet. Check back soon.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
              {posts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="group h-full">
                  <article className="h-full flex flex-col bg-[#151a21] border border-[#F8F8FF]/[0.06] rounded-xl overflow-hidden hover:border-[#F8F8FF]/[0.12] transition-colors duration-300">
                    {post.cover_image && (
                      <div className="aspect-video w-full overflow-hidden bg-[#1a1f26] flex-shrink-0">
                        <img
                          src={post.cover_image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="p-6 flex flex-col flex-1">
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {post.tags.slice(0, 2).map((tag) => (
                            <span key={tag} className="text-[10px] px-2 py-0.5 bg-[#1a1f26] text-[#B8C5D6]/50 rounded font-body tracking-wide uppercase">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      <h2 className="text-lg font-semibold text-[#F8F8FF] leading-snug mb-2 font-heading group-hover:text-[#E5E4E2] transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                      {post.excerpt && (
                        <p className="text-sm text-[#B8C5D6]/50 leading-relaxed line-clamp-2 font-body mb-4">
                          {post.excerpt}
                        </p>
                      )}
                      <div className="mt-auto flex items-center justify-between pt-4 border-t border-[#F8F8FF]/[0.04]">
                        <span className="text-xs text-[#B8C5D6]/30 font-body">
                          {post.author}
                        </span>
                        {post.published_at && (
                          <span className="text-xs text-[#B8C5D6]/30 font-body">
                            {new Date(post.published_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                          </span>
                        )}
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />
      <ScrollToTop />
    </main>
  );
}

import type { MetadataRoute } from "next";
import { getPublishedPosts } from "@/lib/blog";

export const revalidate = 60;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://socioryx.com";

  const posts = await getPublishedPosts();

  const postUrls: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: post.published_at ? new Date(post.published_at) : undefined,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // No lastModified on static pages: a hardcoded date is a false freshness signal.
  return [
    { url: base, changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/about`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/contact`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/blog`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/services`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/portfolio`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/portfolio/websites`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/portfolio/indore-dental-hospital`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/portfolio/puja-shraddha`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/team`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/free-ai-marketing-audit`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/services/website-design-development`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/services/brand-marketing-positioning`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/services/content-creation-social-media`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/services/social-media-management`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/services/influencer-marketing-d2c-brands`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/services/video-production`, changeFrequency: "monthly", priority: 0.8 },
    ...postUrls,
  ];
}

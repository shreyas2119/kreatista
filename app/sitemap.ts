import type { MetadataRoute } from "next";
import { getPublishedPosts } from "@/lib/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://socioryx.com";

  const posts = await getPublishedPosts();

  const postUrls: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: post.published_at ? new Date(post.published_at) : undefined,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    { url: base, lastModified: new Date("2026-07-21T15:35:48.874Z"), changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/blog`, lastModified: new Date("2026-07-21T15:35:48.874Z"), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/services`, lastModified: new Date("2026-07-21T15:35:48.874Z"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/portfolio`, lastModified: new Date("2026-07-21T15:35:48.874Z"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/team`, lastModified: new Date("2026-07-21T15:35:48.874Z"), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/free-ai-marketing-audit`, lastModified: new Date("2026-07-21T15:35:48.874Z"), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/services/website-design-development`, lastModified: new Date("2026-07-21T15:35:48.874Z"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/services/brand-marketing-positioning`, lastModified: new Date("2026-07-21T15:35:48.874Z"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/services/content-creation-social-media`, lastModified: new Date("2026-07-21T15:35:48.874Z"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/services/social-media-management`, lastModified: new Date("2026-07-21T15:35:48.874Z"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/services/influencer-marketing-d2c-brands`, lastModified: new Date("2026-07-21T15:35:48.874Z"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/services/video-production`, lastModified: new Date("2026-07-21T15:35:48.874Z"), changeFrequency: "monthly", priority: 0.8 },
    ...postUrls,
  ];
}
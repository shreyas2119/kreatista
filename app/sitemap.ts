import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://socioryx.com";
  const now = new Date();

  return [
    { url: base,               lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${base}/blog`,     lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${base}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/portfolio`,lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/team`,     lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    // Individual service pages
    { url: `${base}/services/website-design-development`,      lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/services/brand-marketing-positioning`,     lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/services/content-creation-social-media`,   lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/services/social-media-management`,         lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/services/influencer-marketing-d2c-brands`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/services/video-production`,                lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    {
      url: `${base}/blog/how-do-d2c-brands-grow-online-in-india`,
      lastModified: new Date("2026-04-09T00:00:00.000Z"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}

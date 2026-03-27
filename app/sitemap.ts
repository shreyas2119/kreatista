import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://kreatista.in";
  const now = new Date();

  return [
    { url: base,               lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${base}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/portfolio`,lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/team`,     lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];
}

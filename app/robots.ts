import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Standard crawlers
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/itachi-7x9k/"],
      },
      // OpenAI / ChatGPT
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: ["/api/", "/itachi-7x9k/"],
      },
      // OpenAI browsing plugin
      {
        userAgent: "ChatGPT-User",
        allow: "/",
        disallow: ["/api/", "/itachi-7x9k/"],
      },
      // Google Gemini / Bard
      {
        userAgent: "Google-Extended",
        allow: "/",
        disallow: ["/api/", "/itachi-7x9k/"],
      },
      // Anthropic Claude
      {
        userAgent: "anthropic-ai",
        allow: "/",
        disallow: ["/api/", "/itachi-7x9k/"],
      },
      {
        userAgent: "ClaudeBot",
        allow: "/",
        disallow: ["/api/", "/itachi-7x9k/"],
      },
      // Perplexity
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: ["/api/", "/itachi-7x9k/"],
      },
      // Meta AI
      {
        userAgent: "FacebookBot",
        allow: "/",
        disallow: ["/api/", "/itachi-7x9k/"],
      },
      // Common AI training crawlers
      {
        userAgent: "CCBot",
        allow: "/",
        disallow: ["/api/", "/itachi-7x9k/"],
      },
      {
        userAgent: "Omgilibot",
        allow: "/",
        disallow: ["/api/", "/itachi-7x9k/"],
      },
    ],
    sitemap: "https://socioryx.com/sitemap.xml",
  };
}

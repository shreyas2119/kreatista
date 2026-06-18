import axios from "axios";
import * as cheerio from "cheerio";

export interface ScrapedData {
  title: string;
  metaDescription: string;
  h1s: string[];
  h2s: string[];
  paragraphs: string;
  images: { src: string; alt: string }[];
  internalLinks: string[];
  externalLinks: string[];
  socialLinks: string[];
}

const SOCIAL_DOMAINS = [
  "instagram.com", "facebook.com", "twitter.com", "x.com",
  "linkedin.com", "youtube.com", "tiktok.com", "pinterest.com",
  "snapchat.com", "reddit.com", "threads.net",
];

export async function scrapeWebsite(url: string): Promise<ScrapedData> {
  const normalizedUrl = url.startsWith("http") ? url : `https://${url}`;

  const { data: html } = await axios.get<string>(normalizedUrl, {
    timeout: 15000,
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
      Accept: "text/html,application/xhtml+xml",
    },
  });

  const $ = cheerio.load(html);

  const title = $("title").first().text().trim();
  const metaDescription = $('meta[name="description"]').attr("content")?.trim() ?? "";
  const h1s: string[] = [];
  $("h1").each((_, el) => { const t = $(el).text().trim(); if (t) h1s.push(t); });
  const h2s: string[] = [];
  $("h2").each((_, el) => { const t = $(el).text().trim(); if (t) h2s.push(t); });

  const paragraphs: string[] = [];
  $("p").each((_, el) => {
    const t = $(el).text().trim();
    if (t.length > 20) paragraphs.push(t);
  });

  const images: { src: string; alt: string }[] = [];
  $("img").each((_, el) => {
    const src = $(el).attr("src");
    const alt = $(el).attr("alt") ?? "";
    if (src && !src.startsWith("data:")) images.push({ src, alt });
  });

  const baseUrl = new URL(normalizedUrl);
  const baseOrigin = baseUrl.origin;

  const internalLinks: string[] = [];
  const externalLinks: string[] = [];
  const socialLinks: string[] = [];

  $("a[href]").each((_, el) => {
    const href = $(el).attr("href")?.trim();
    if (!href || href.startsWith("#") || href.startsWith("javascript:")) return;

    try {
      const resolved = new URL(href, normalizedUrl);
      const hostname = resolved.hostname.replace(/^www\./, "");

      if (resolved.origin === baseOrigin) {
        internalLinks.push(resolved.href);
      } else {
        externalLinks.push(resolved.href);
        if (SOCIAL_DOMAINS.some((d) => hostname.includes(d))) {
          socialLinks.push(resolved.href);
        }
      }
    } catch {
      // invalid URL — skip
    }
  });

  return {
    title,
    metaDescription,
    h1s,
    h2s,
    paragraphs: paragraphs.join("\n\n").slice(0, 8000),
    images,
    internalLinks: [...new Set(internalLinks)],
    externalLinks: [...new Set(externalLinks)],
    socialLinks: [...new Set(socialLinks)],
  };
}

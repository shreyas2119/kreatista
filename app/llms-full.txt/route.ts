import { team } from "@/lib/team";
import { getPublishedPosts } from "@/lib/blog";
import { services } from "@/lib/services";
import { caseStudies } from "@/lib/case-studies";
import { homeFaqs } from "@/lib/faqs";

export const revalidate = 3600;

const base = "https://socioryx.com";

export async function GET() {
  let posts: { title: string; slug: string }[] = [];
  try {
    posts = await getPublishedPosts();
  } catch {
    // Keep the static sections even if the CMS is unreachable.
  }

  const body = [
    "# Socioryx — Full Reference",
    "",
    "> Socioryx is a full-stack content marketing agency based in India, founded in 2024. One team for website design and development, brand marketing and positioning, content creation, social media management, influencer marketing, and video production.",
    "",
    "## Services",
    "",
    ...services.flatMap((s) => [
      `### ${s.name}`,
      `URL: ${base}/services/${s.slug}`,
      s.summary,
      "",
    ]),
    "## Case Studies",
    "",
    ...caseStudies.flatMap((c) => [
      `### ${c.client} (${c.industry})`,
      `Case study: ${base}/portfolio/${c.slug}`,
      `Live site: ${c.liveUrl}`,
      c.summary,
      `Problem: ${c.problem}`,
      `What shipped: ${c.built.join("; ")}.`,
      `Client figures: ${c.stats.map((s) => `${s.value} ${s.label}`).join(" | ")}.`,
      "",
    ]),
    "## Team",
    "",
    ...team.map((m) => `- ${m.name} — ${m.role}`),
    "",
    "## Frequently Asked Questions",
    "",
    ...homeFaqs.flatMap((f) => [`**${f.q}**`, f.a, ""]),
    "## Contact",
    "",
    `- Website: ${base}`,
    `- About: ${base}/about`,
    `- Contact: ${base}/contact`,
    "- Email: work@socioryx.com",
    "- Instagram: https://www.instagram.com/socioryx_network/",
    "- LinkedIn: https://www.linkedin.com/company/socioryx/",
    "- X: https://x.com/SocioryxN79343",
    "",
    "## Blog",
    "",
    ...(posts.length
      ? posts.map((p) => `- ${p.title}: ${base}/blog/${p.slug}`)
      : [`- ${base}/blog`]),
    "",
  ].join("\n");

  return new Response(`${body}\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}

import { team } from "@/lib/team";
import { getPublishedPosts } from "@/lib/blog";
import { services } from "@/lib/services";
import { caseStudies } from "@/lib/case-studies";

export const revalidate = 3600;

const base = "https://socioryx.com";

export async function GET() {
  let posts: { title: string; slug: string }[] = [];
  try {
    posts = await getPublishedPosts();
  } catch {
    // Blog stays linked even if the CMS is unreachable.
  }

  const body = [
    "# Socioryx",
    "",
    "> Socioryx is a full-stack content marketing agency based in India. We help D2C brands, SaaS startups, and creators grow online through website design and development, content creation, social media management, influencer collaborations, video production, and brand marketing and positioning — all under one roof.",
    "",
    `Full reference: ${base}/llms-full.txt`,
    "",
    "## What We Do",
    "",
    "Socioryx offers six core services:",
    "",
    ...services.map((s) => `- **${s.name}** (${base}/services/${s.slug}): ${s.summary}`),
    "",
    "## Who We Work With",
    "",
    "- D2C brand founders building or scaling their digital presence in India",
    "- SaaS startup teams that need content and positioning to convert users",
    "- Creators and personal brands looking to grow their audience and monetize",
    "",
    "## Why Socioryx",
    "",
    "- One team handles everything — no coordination overhead between agencies",
    "- Strategy-first approach — every piece of content has a purpose",
    "- Limited client intake each month — each client gets full team attention",
    "- Based in India, built for the Indian D2C and SaaS market",
    "",
    "## Frequently Asked Questions",
    "",
    "**What is Socioryx?**",
    "Socioryx is a full-stack content marketing agency based in India that helps D2C brands, SaaS startups, and creators grow online through six services: website design and development, brand marketing and positioning, content creation, social media management, influencer marketing, and video production.",
    "",
    "**How can I contact Socioryx?**",
    `Email work@socioryx.com or fill the contact form at ${base}/services. You can also book a free strategy call by clicking "Let's Talk" on the website.`,
    "",
    "**What types of brands does Socioryx work with?**",
    "Socioryx works with D2C brand founders, SaaS startup teams, and individual creators at all stages — from early-stage to established brands scaling their content operations.",
    "",
    "**How long does it take to see results from content marketing?**",
    "Organic content and SEO typically show measurable results in 3 to 6 months. Short-form video can generate traction within 30 to 60 days with consistent posting.",
    "",
    "## Team",
    "",
    ...team.map((m) => `- ${m.name} — ${m.role}`),
    "",
    "## Case Studies",
    "",
    ...caseStudies.map(
      (c) =>
        `- **${c.client}** (${c.industry}): ${c.summary} Case study: ${base}/portfolio/${c.slug} | Live site: ${c.liveUrl}`
    ),
    "",
    "## Contact",
    "",
    `- Website: ${base}`,
    "- Email: work@socioryx.com",
    "- Instagram: https://www.instagram.com/socioryx_network/",
    "- LinkedIn: https://www.linkedin.com/company/socioryx/",
    "- X: https://x.com/SocioryxN79343",
    "",
    "## Blog",
    "",
    `Socioryx publishes content marketing insights, D2C growth strategies, and social media playbooks at ${base}/blog`,
    "",
    "Published posts:",
    ...(posts.length
      ? posts.map((p) => `- ${p.title}: ${base}/blog/${p.slug}`)
      : [`- ${base}/blog`]),
    "",
    "## Pages",
    "",
    `- Homepage (Content Marketing Agency India): ${base}`,
    `- About: ${base}/about`,
    `- Contact: ${base}/contact`,
    `- Services (Content Marketing Services for D2C Brands): ${base}/services`,
    ...services.map((s) => `- ${s.name}: ${base}/services/${s.slug}`),
    `- Free AI Marketing Audit: ${base}/free-ai-marketing-audit`,
    `- Portfolio: ${base}/portfolio`,
    `- Website work and process: ${base}/portfolio/websites`,
    ...caseStudies.map((c) => `- ${c.client} case study: ${base}/portfolio/${c.slug}`),
    `- Team: ${base}/team`,
    `- Blog: ${base}/blog`,
    `- Privacy Policy: ${base}/privacy`,
    `- Terms of Service: ${base}/terms`,
  ].join("\n");

  return new Response(`${body}\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}

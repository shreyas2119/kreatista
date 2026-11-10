export interface Faq {
  q: string;
  a: string;
}

export const homeFaqs: Faq[] = [
  {
    q: "What is Socioryx and what do you do?",
    a: "Socioryx is a full-stack content marketing agency based in India. We help D2C brands, SaaS startups, and creators grow online through six core services: website design and development, brand marketing and positioning, content creation, social media management, influencer collaborations, and video production — all under one roof.",
  },
  {
    q: "What services does Socioryx offer?",
    a: "We offer six services: conversion-focused website design and development, brand marketing and positioning strategy, content creation for social media, end-to-end social media management, influencer marketing campaigns, and video production. You can hire us for one service or let us handle everything together.",
  },
  {
    q: "How can I contact Socioryx or get started?",
    a: "You can reach us at work@socioryx.com or fill the contact form on our services page. We also offer a free strategy call — click 'Let's Talk' anywhere on the site to book a time directly on our calendar. We respond to all enquiries within 24 hours.",
  },
  {
    q: "What does a content marketing agency do?",
    a: "A content marketing agency handles the creation, distribution, and strategy behind your brand's content — including social media posts, videos, blog articles, and influencer campaigns. Socioryx manages all of this under one roof so your messaging stays consistent across every platform.",
  },
  {
    q: "How much does social media management cost in India?",
    a: "Social media management pricing in India varies based on the number of platforms, posting frequency, and whether content creation is included. Socioryx offers end-to-end packages that cover strategy, creation, and posting. Contact us for a custom quote based on your brand's needs.",
  },
  {
    q: "Which is better for D2C brands — Instagram or YouTube?",
    a: "Both serve different purposes. Instagram drives discovery and daily engagement through Reels and Stories. YouTube builds long-term authority and search traffic. Most D2C brands benefit from starting with Instagram and adding YouTube once they have consistent content production. Socioryx helps you decide based on your category and audience.",
  },
  {
    q: "Do you work with early-stage startups or only established brands?",
    a: "We work with brands at all stages — from founders building their first digital presence to established D2C brands scaling their content operations. Our approach adapts to your budget and growth stage.",
  },
  {
    q: "How long does it take to see results from content marketing?",
    a: "Organic content and SEO typically show measurable results in 3 to 6 months. Short-form video on Instagram and YouTube Shorts can generate traction within 30 to 60 days with consistent posting. Paid campaigns can drive results faster. We set realistic timelines based on your goals during the strategy call.",
  },
  {
    q: "Can Socioryx handle everything or do we need to be involved?",
    a: "We handle everything — strategy, content creation, posting, and reporting. Your involvement is as much or as little as you want. Most clients do a monthly check-in call to review performance and align on upcoming campaigns.",
  },
];

export const serviceStartFaqs: Faq[] = [
  {
    q: "How much does this service cost?",
    a: "Every engagement is quoted after a free audit, because scope, platforms, and content volume change the price. You get a fixed quote with named deliverables before work starts — no hourly billing and no surprise add-ons.",
  },
  {
    q: "How do I start working with Socioryx?",
    a: "Book a free 30-minute strategy call or email work@socioryx.com. We reply within 24 hours, review what you need, and send a fixed scope and quote after the call.",
  },
];

export function faqSchema(items: Faq[]) {  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

import type { Metadata } from "next";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import ServicePageLayout, { type ServicePageData } from "@/components/sections/ServicePageLayout";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Social Media Management Services for D2C Brands India | Socioryx",
  description: "Full-service social media management for D2C brands and SaaS startups in India. Strategy, content creation, scheduling, community management, and monthly reporting.",
  alternates: { canonical: "https://socioryx.com/services/social-media-management" },
  openGraph: { title: "Social Media Management Services | Socioryx", description: "End-to-end social media management for D2C brands in India. Strategy, content, posting, and community all handled.", url: "https://socioryx.com/services/social-media-management", images: [{ url: "https://socioryx.com/og-image.png", width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", title: "Social Media Management Services | Socioryx", description: "End-to-end social media management for D2C brands in India.", images: ["https://socioryx.com/og-image.png"] },
};

const data: ServicePageData = {
  slug: "social-media-management",
  label: "Social Media Management",
  headline: "Your Brand Stays Active While You Focus on the Business",
  subheadline: "Posting consistently is hard when you are running a company. We handle strategy, creation, scheduling, community management, and reporting so you never have to think about it.",
  intro: "A brand that goes quiet on social media loses trust. A brand that posts inconsistently looks unprofessional. A brand that posts without strategy wastes time and money. We handle all three problems with a full-service social media management system built around your growth goals.",
  whatWeDoTitle: "Social Media Management Services in India",
  whatWeDo: "We manage your social media presence end-to-end across Instagram, LinkedIn, YouTube, and wherever your audience spends time. This includes monthly strategy planning, content creation, scheduling, community management, and performance reporting. You get a dedicated team that understands your brand, your audience, and your goals. We do not just post content. We build an audience that trusts your brand and eventually buys from you.",
  benefits: ["Monthly strategy aligned with your business goals", "Content creation included: Reels, carousels, static posts, Stories", "Consistent posting schedule across all platforms", "Community management: replies, DMs, and comment moderation", "Monthly performance report with insights and recommendations", "No more missed posting days or last-minute content scrambles"],
  howItWorksTitle: "How We Manage Your Social Media",
  howItWorks: [
    { step: "01", title: "Strategy", desc: "We build a monthly content strategy based on your goals, audience, and platform priorities." },
    { step: "02", title: "Creation", desc: "We produce all content in-house: copy, design, video editing, and captions." },
    { step: "03", title: "Scheduling", desc: "We schedule and post everything at optimal times for your audience." },
    { step: "04", title: "Reporting", desc: "We send a monthly report covering reach, engagement, follower growth, and what we are doing next." },
  ],
  whoIsItForTitle: "For Founders Who Cannot Afford to Ignore Social Media",
  whoIsItFor: "This service is for D2C founders who know social media matters but do not have the time or team to do it consistently, SaaS startups that need to build an audience before their next funding round or product launch, and creators who want to scale their presence without managing the day-to-day themselves.",
  faqs: [
    { q: "Which platforms do you manage?", a: "We primarily manage Instagram and LinkedIn. We also handle YouTube Shorts, Twitter/X, and Facebook depending on your audience. We recommend the right platforms based on your category and target customer." },
    { q: "Do you create the content or just post it?", a: "We create everything. Content creation is included in our social media management service. You do not need a separate content team." },
    { q: "How much involvement is required from my side?", a: "Minimal. We handle everything. Most clients do a monthly 30-minute check-in call to review performance and align on upcoming campaigns. Beyond that, we run independently." },
    { q: "How long before we see results?", a: "Consistent posting with a clear strategy typically shows measurable results in 60 to 90 days. Follower growth, engagement rate, and reach all improve with consistency over time." },
    { q: "Can you manage social media for multiple brands?", a: "Yes. We work with brands that have multiple product lines or sub-brands and manage each with its own strategy and content." },
  ],
  relatedServices: [{ title: "Content Creation for Social Media", href: "/services/content-creation-social-media" }, { title: "Influencer Marketing for D2C Brands", href: "/services/influencer-marketing-d2c-brands" }, { title: "Video Production", href: "/services/video-production" }],
  ctaSubject: "Interested in: Social Media Management",
};

const serviceSchema = { "@context": "https://schema.org", "@type": "Service", name: "Social Media Management Services", serviceType: "Social Media Management", provider: { "@type": "Organization", name: "Socioryx", url: "https://socioryx.com" }, description: data.whatWeDo, areaServed: { "@type": "Country", name: "India" }, url: "https://socioryx.com/services/social-media-management", offers: { "@type": "Offer", availability: "https://schema.org/InStock", areaServed: "IN" } };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: data.faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://socioryx.com" }, { "@type": "ListItem", position: 2, name: "Services", item: "https://socioryx.com/services" }, { "@type": "ListItem", position: 3, name: "Social Media Management", item: "https://socioryx.com/services/social-media-management" }] };

export default function SocialMediaManagementPage() {
  return (<><Script id="service-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} /><Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} /><Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} /><Navbar /><ServicePageLayout data={data} /><Footer /></>);
}

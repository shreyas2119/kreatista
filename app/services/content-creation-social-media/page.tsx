import type { Metadata } from "next";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import ServicePageLayout, { type ServicePageData } from "@/components/sections/ServicePageLayout";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Content Creation for Social Media | D2C Brands India | Socioryx",
  description: "Socioryx creates social media content for D2C brands and SaaS startups in India. Reels, carousels, blog posts, and email copy that builds audiences and drives sales.",
  alternates: { canonical: "https://socioryx.com/services/content-creation-social-media" },
  openGraph: { title: "Content Creation for Social Media | Socioryx", description: "Social media content for D2C brands in India. Reels, carousels, and copy that builds audiences and drives sales.", url: "https://socioryx.com/services/content-creation-social-media", images: [{ url: "https://socioryx.com/og-image.png", width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", title: "Content Creation for Social Media | Socioryx", description: "Social media content for D2C brands in India.", images: ["https://socioryx.com/og-image.png"] },
};

const data: ServicePageData = {
  slug: "content-creation-social-media",
  label: "Content Creation",
  headline: "Content People Actually Want to Watch and Share",
  subheadline: "Not just stuff that fills a calendar. Every piece of content we create has a job: to build awareness, drive engagement, or push a purchase decision.",
  intro: "Most brands post content because they feel they should. The result is generic posts that get ignored. We create content with a purpose behind every piece, researched for your specific audience and produced to perform on the platforms they actually use.",
  whatWeDoTitle: "Content Creation for D2C Brands and SaaS Startups in India",
  whatWeDo: "We research what your audience responds to, build a content plan around those insights, and produce everything in-house. Reels, carousels, blog posts, email copy, all consistent with your brand voice and aligned with your business goals. We handle the full production process from concept to final file, so you never have to brief a freelancer or chase a deadline again. Content is planned monthly, produced in batches, and delivered ready to post.",
  benefits: ["Content planned around your audience and business goals", "Reels, carousels, static posts, and stories all covered", "Blog and long-form content for SEO and authority building", "Email copy that nurtures leads and drives repeat purchases", "Consistent brand voice across every format and platform", "Monthly content calendar so you always know what is coming"],
  howItWorksTitle: "How We Create Your Content",
  howItWorks: [
    { step: "01", title: "Research", desc: "We analyse your audience, competitors, and top-performing content in your category." },
    { step: "02", title: "Planning", desc: "We build a monthly content calendar with topics, formats, and goals for each piece." },
    { step: "03", title: "Production", desc: "We write, design, and produce all content in-house to your brand guidelines." },
    { step: "04", title: "Delivery", desc: "You receive final files ready to post, with captions and hashtags included." },
  ],
  whoIsItForTitle: "For Brands That Need Content That Works",
  whoIsItFor: "This service is for D2C founders who know they need to post consistently but do not have the time or team to do it well, SaaS startups that need educational content to build trust with their audience, and creators who want to scale their output without burning out.",
  faqs: [
    { q: "What types of content do you create?", a: "We create Reels, carousels, static posts, Stories, blog articles, email newsletters, and ad copy. The mix depends on your platform priorities and audience." },
    { q: "Do you post the content or just create it?", a: "Content creation covers production and delivery of final files. If you want us to handle posting, scheduling, and community management as well, that falls under our Social Media Management service." },
    { q: "How many pieces of content do you produce per month?", a: "This depends on your package. We discuss your platform needs and posting frequency during the strategy call and build a plan that fits your goals and budget." },
    { q: "Do you create content in Hindi or regional languages?", a: "Yes. We can create content in Hindi and other regional languages for brands targeting Tier 2 and Tier 3 audiences in India." },
    { q: "How do you make sure the content matches our brand voice?", a: "We start every engagement with a brand voice session where we document your tone, style, and messaging guidelines. All content is produced against this document." },
  ],
  relatedServices: [{ title: "Social Media Management", href: "/services/social-media-management" }, { title: "Video Production", href: "/services/video-production" }, { title: "Brand Marketing and Positioning", href: "/services/brand-marketing-positioning" }],
  ctaSubject: "Interested in: Content Creation for Social Media",
};

const serviceSchema = { "@context": "https://schema.org", "@type": "Service", name: "Content Creation for Social Media", serviceType: "Content Marketing", provider: { "@type": "Organization", name: "Socioryx", url: "https://socioryx.com" }, description: data.whatWeDo, areaServed: { "@type": "Country", name: "India" }, url: "https://socioryx.com/services/content-creation-social-media", offers: { "@type": "Offer", availability: "https://schema.org/InStock", areaServed: "IN" } };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: data.faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://socioryx.com" }, { "@type": "ListItem", position: 2, name: "Services", item: "https://socioryx.com/services" }, { "@type": "ListItem", position: 3, name: "Content Creation for Social Media", item: "https://socioryx.com/services/content-creation-social-media" }] };

export default function ContentCreationPage() {
  return (<><Script id="service-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} /><Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} /><Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} /><Navbar /><ServicePageLayout data={data} /><Footer /></>);
}

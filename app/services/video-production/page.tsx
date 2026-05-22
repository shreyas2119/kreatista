import type { Metadata } from "next";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import ServicePageLayout, { type ServicePageData } from "@/components/sections/ServicePageLayout";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Video Production Services for D2C Brands India | Socioryx",
  description: "Socioryx produces brand videos, product demos, Reels, and founder stories for D2C brands and SaaS startups in India. 4K production, editing, and motion graphics.",
  alternates: { canonical: "https://socioryx.com/services/video-production" },
  openGraph: { title: "Video Production Services for D2C Brands | Socioryx", description: "Brand videos, product demos, and Reels for D2C brands in India. 4K production, editing, and motion graphics.", url: "https://socioryx.com/services/video-production", images: [{ url: "https://socioryx.com/og-image.png", width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", title: "Video Production Services for D2C Brands | Socioryx", description: "Brand videos, product demos, and Reels for D2C brands in India.", images: ["https://socioryx.com/og-image.png"] },
};

const data: ServicePageData = {
  slug: "video-production",
  label: "Video Production",
  headline: "Video That Earns Attention and Drives Action",
  subheadline: "From a 15-second hook to a full brand film. We produce video built to perform on the platforms your audience actually uses, not just to look good in a portfolio.",
  intro: "Video is the highest-ROI content format for D2C brands right now, but only when it is built around a clear objective. Most brand videos fail because they are made to impress, not to convert. We start with the platform, the audience, and the action you want them to take, then build the video around that.",
  whatWeDoTitle: "Video Production Services for D2C Brands in India",
  whatWeDo: "We handle the full video production process in-house: scripting, shooting, editing, motion graphics, sound design, and final delivery. Whether you need a 15-second Reel hook, a product demo, a founder story, or a full brand film, we produce video that is engineered to perform. We shoot in 4K with professional studio gear and deliver files optimised for every platform: Instagram, YouTube, LinkedIn, and paid ads.",
  benefits: ["4K production with professional studio gear", "Scripting and concept development included", "Post-editing with colour grading and sound design", "Motion graphics and text overlays for social media", "Files delivered optimised for every platform", "Short-form Reels and long-form brand films both covered"],
  howItWorksTitle: "How We Produce Your Video",
  howItWorks: [
    { step: "01", title: "Brief", desc: "We define the objective, platform, audience, and call to action before any production begins." },
    { step: "02", title: "Pre-production", desc: "We write the script, plan the shoot, and prepare all creative assets." },
    { step: "03", title: "Production", desc: "We shoot with 4K equipment and professional lighting and audio." },
    { step: "04", title: "Post-production", desc: "We edit, colour grade, add motion graphics, and deliver final files ready to publish." },
  ],
  whoIsItForTitle: "For Brands That Need Video That Performs",
  whoIsItFor: "This service is for D2C brands that need product videos, unboxing content, or brand films for their website and social media, SaaS startups that need explainer videos or founder story content, and creators who want professional production quality for their YouTube or Instagram content.",
  faqs: [
    { q: "What types of videos do you produce?", a: "We produce brand films, product demos, founder stories, testimonial videos, Reels and short-form content, explainer videos, and ad creatives. The format depends on your platform and objective." },
    { q: "Do you handle scripting?", a: "Yes. Scripting is included in every video production project. A well-written script is the foundation of a video that converts." },
    { q: "How long does a video production project take?", a: "A short-form Reel or product video typically takes 1 to 2 weeks from brief to delivery. A full brand film takes 3 to 5 weeks depending on complexity." },
    { q: "Do you shoot on location or in a studio?", a: "Both. We have studio facilities and also shoot on location depending on the creative brief. Location shoots are planned and coordinated by our production team." },
    { q: "Can you produce videos in bulk for social media?", a: "Yes. We offer batch production for brands that need a consistent volume of short-form content for Instagram and YouTube Shorts. This is more cost-effective than producing individual videos." },
  ],
  relatedServices: [{ title: "Content Creation for Social Media", href: "/services/content-creation-social-media" }, { title: "Social Media Management", href: "/services/social-media-management" }, { title: "Influencer Marketing for D2C Brands", href: "/services/influencer-marketing-d2c-brands" }],
  ctaSubject: "Interested in: Video Production",
};

const serviceSchema = { "@context": "https://schema.org", "@type": "Service", name: "Video Production Services", serviceType: "Video Production", provider: { "@type": "Organization", name: "Socioryx", url: "https://socioryx.com" }, description: data.whatWeDo, areaServed: { "@type": "Country", name: "India" }, url: "https://socioryx.com/services/video-production", offers: { "@type": "Offer", availability: "https://schema.org/InStock", areaServed: "IN" } };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: data.faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://socioryx.com" }, { "@type": "ListItem", position: 2, name: "Services", item: "https://socioryx.com/services" }, { "@type": "ListItem", position: 3, name: "Video Production", item: "https://socioryx.com/services/video-production" }] };

export default function VideoProductionPage() {
  return (<><Script id="service-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} /><Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} /><Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} /><Navbar /><ServicePageLayout data={data} /><Footer /></>);
}

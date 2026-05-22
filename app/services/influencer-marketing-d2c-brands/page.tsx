import type { Metadata } from "next";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import ServicePageLayout, { type ServicePageData } from "@/components/sections/ServicePageLayout";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Influencer Marketing for D2C Brands in India | Socioryx",
  description: "Socioryx connects D2C brands with the right influencers in India. Creator vetting, campaign management, and performance tracking for reach that actually converts.",
  alternates: { canonical: "https://socioryx.com/services/influencer-marketing-d2c-brands" },
  openGraph: { title: "Influencer Marketing for D2C Brands in India | Socioryx", description: "Connect with the right influencers in India. Creator vetting, campaign management, and tracking for D2C brands.", url: "https://socioryx.com/services/influencer-marketing-d2c-brands", images: [{ url: "https://socioryx.com/og-image.png", width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", title: "Influencer Marketing for D2C Brands in India | Socioryx", description: "Creator vetting, campaign management, and tracking for D2C brands in India.", images: ["https://socioryx.com/og-image.png"] },
};

const data: ServicePageData = {
  slug: "influencer-marketing-d2c-brands",
  label: "Influencer Marketing",
  headline: "Reach That Actually Converts",
  subheadline: "Follower counts are vanity. We connect you with creators whose audiences trust them. When they talk about your brand, people listen and buy.",
  intro: "Influencer marketing in India is one of the highest-ROI channels for D2C brands, but only when done right. Most brands waste budget on creators with inflated follower counts and disengaged audiences. We vet every creator on engagement rate, audience quality, and niche relevance before recommending them.",
  whatWeDoTitle: "Influencer Marketing for D2C Brands in India",
  whatWeDo: "We handle the full influencer marketing process from start to finish. We identify creators whose audiences match your target customer, vet them on engagement rate and content quality, negotiate terms, brief them on your brand, manage the campaign, and track what actually converts. For D2C brands in India, micro and mid-tier influencers consistently outperform celebrity endorsements because their audiences are specific and trust their recommendations. We focus on creators who drive real results, not just impressions.",
  benefits: ["Creator vetting based on engagement rate and audience quality", "Niche-specific influencer matching for your product category", "Full campaign management from brief to final deliverable", "Contract and payment handling", "Performance tracking with UTM links and discount codes", "Post-campaign report with ROI analysis"],
  howItWorksTitle: "How We Run Your Influencer Campaign",
  howItWorks: [
    { step: "01", title: "Discovery", desc: "We identify creators in your niche whose audience matches your target customer profile." },
    { step: "02", title: "Vetting", desc: "We analyse engagement rate, audience demographics, and content quality before recommending anyone." },
    { step: "03", title: "Campaign", desc: "We brief creators, manage timelines, review content, and handle all communication." },
    { step: "04", title: "Tracking", desc: "We track performance with unique codes and links and report on reach, conversions, and ROI." },
  ],
  whoIsItForTitle: "For D2C Brands Ready to Scale Through Creators",
  whoIsItFor: "This service is for D2C brands that want to reach new audiences through trusted voices in their category, brands launching a new product and needing rapid awareness, and founders who have tried influencer marketing before but did not see results because of poor creator selection.",
  faqs: [
    { q: "What is the difference between micro and macro influencers?", a: "Micro-influencers have between 10,000 and 100,000 followers. Macro-influencers have over 100,000. For D2C brands in India, micro-influencers typically deliver higher engagement rates and better conversion because their audiences are more niche and trust their recommendations more." },
    { q: "How do you measure the success of an influencer campaign?", a: "We track reach, engagement, click-through rate, and conversions using unique discount codes and UTM-tracked links. Every campaign ends with a performance report." },
    { q: "Do you work with regional language influencers?", a: "Yes. We work with creators who produce content in Hindi, Tamil, Telugu, Kannada, and other regional languages for brands targeting specific geographic markets in India." },
    { q: "How many influencers do you work with per campaign?", a: "This depends on your budget and goals. A typical campaign involves 5 to 20 micro-influencers. We recommend the right number based on your category and target reach." },
    { q: "Can you run influencer campaigns on YouTube as well as Instagram?", a: "Yes. We run campaigns across Instagram, YouTube, and other platforms depending on where your audience is most active." },
  ],
  relatedServices: [{ title: "Social Media Management", href: "/services/social-media-management" }, { title: "Content Creation for Social Media", href: "/services/content-creation-social-media" }, { title: "Video Production", href: "/services/video-production" }],
  ctaSubject: "Interested in: Influencer Marketing",
};

const serviceSchema = { "@context": "https://schema.org", "@type": "Service", name: "Influencer Marketing for D2C Brands", serviceType: "Influencer Marketing", provider: { "@type": "Organization", name: "Socioryx", url: "https://socioryx.com" }, description: data.whatWeDo, areaServed: { "@type": "Country", name: "India" }, url: "https://socioryx.com/services/influencer-marketing-d2c-brands", offers: { "@type": "Offer", availability: "https://schema.org/InStock", areaServed: "IN" } };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: data.faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://socioryx.com" }, { "@type": "ListItem", position: 2, name: "Services", item: "https://socioryx.com/services" }, { "@type": "ListItem", position: 3, name: "Influencer Marketing for D2C Brands", item: "https://socioryx.com/services/influencer-marketing-d2c-brands" }] };

export default function InfluencerMarketingPage() {
  return (<><Script id="service-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} /><Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} /><Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} /><Navbar /><ServicePageLayout data={data} /><Footer /></>);
}

import type { Metadata } from "next";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import ServicePageLayout, { type ServicePageData } from "@/components/sections/ServicePageLayout";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Brand Marketing and Positioning Strategy for D2C Brands | Socioryx",
  description: "Socioryx helps D2C brands and SaaS startups in India build clear positioning, messaging frameworks, and go-to-market strategies that make them the obvious choice.",
  alternates: { canonical: "https://socioryx.com/services/brand-marketing-positioning" },
  openGraph: {
    title: "Brand Marketing and Positioning Strategy | Socioryx",
    description: "Clear positioning and messaging for D2C brands and SaaS startups in India. Stop being ignored. Start being chosen.",
    url: "https://socioryx.com/services/brand-marketing-positioning",
    images: [{ url: "https://socioryx.com/og-image.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title: "Brand Marketing and Positioning Strategy | Socioryx", description: "Clear positioning and messaging for D2C brands in India.", images: ["https://socioryx.com/og-image.png"] },
};

const data: ServicePageData = {
  slug: "brand-marketing-positioning",
  label: "Brand Marketing and Positioning",
  headline: "Make Your Brand the Obvious Choice",
  subheadline: "Your competitors are louder. We make you clearer. We find exactly what makes you different and build messaging that makes your audience feel like you were made for them.",
  intro: "Most D2C brands and SaaS startups struggle not because their product is weak but because their positioning is unclear. When your messaging is vague, potential customers compare you on price. When your positioning is sharp, they choose you because nothing else feels right.",
  whatWeDoTitle: "Brand Marketing and Positioning Strategy in India",
  whatWeDo: "We run a brand audit to understand where you stand today, who your real competitors are, and what your audience actually cares about. From there we build a positioning framework that defines your unique angle, your target audience, and the language that resonates with them. This framework becomes the foundation for everything: your website copy, your social media, your ads, your pitch deck, and your sales conversations. When your positioning is right, every piece of content you create starts working harder.",
  benefits: ["Clear differentiation from competitors in your category", "Messaging that speaks directly to your target audience", "A positioning framework your whole team can use consistently", "Go-to-market strategy for new product or service launches", "Brand voice guidelines for content and communications", "Reduced customer acquisition cost over time"],
  howItWorksTitle: "How We Build Your Brand Positioning",
  howItWorks: [
    { step: "01", title: "Brand Audit", desc: "We review your current messaging, competitors, and audience to identify gaps and opportunities." },
    { step: "02", title: "Positioning Workshop", desc: "We work with your team to define your unique angle, target audience, and core value proposition." },
    { step: "03", title: "Messaging Framework", desc: "We build a complete messaging document covering headlines, taglines, and copy for every channel." },
    { step: "04", title: "Rollout Support", desc: "We help you apply the new positioning across your website, social media, and sales materials." },
  ],
  whoIsItForTitle: "For Brands That Are Being Ignored",
  whoIsItFor: "This service is for D2C founders whose product is good but whose marketing is not converting, SaaS startups preparing for a launch or rebrand, and creators who want to build a recognisable personal brand. If you are posting content and running ads but not seeing the results you expect, unclear positioning is usually the root cause.",
  faqs: [
    { q: "What is brand positioning?", a: "Brand positioning is the process of defining how your brand is different from competitors and why your target audience should choose you. It covers your unique value proposition, your target customer, and the language you use to communicate both." },
    { q: "How long does a positioning project take?", a: "A full brand positioning project typically takes 2 to 4 weeks. This includes the audit, workshop, framework development, and one round of revisions." },
    { q: "Do I need brand positioning if I am just starting out?", a: "Yes, especially if you are just starting out. Getting your positioning right before you invest in content, ads, or a website saves significant time and money. It is much harder to fix positioning after you have built everything around the wrong message." },
    { q: "What is the difference between brand positioning and brand identity?", a: "Brand identity covers visual elements like your logo, colours, and typography. Brand positioning covers the strategic message: who you are for, what you do, and why you are different. Both matter, but positioning comes first." },
    { q: "Will this help with my social media and ads?", a: "Yes. A clear positioning framework makes every piece of content easier to write and more effective. Your social media, ads, email, and website all become more consistent and more persuasive." },
  ],
  relatedServices: [{ title: "Website Design and Development", href: "/services/website-design-development" }, { title: "Content Creation for Social Media", href: "/services/content-creation-social-media" }, { title: "Social Media Management", href: "/services/social-media-management" }],
  ctaSubject: "Interested in: Brand Marketing and Positioning",
};

const serviceSchema = { "@context": "https://schema.org", "@type": "Service", name: "Brand Marketing and Positioning Strategy", serviceType: "Brand Strategy", provider: { "@type": "Organization", name: "Socioryx", url: "https://socioryx.com" }, description: data.whatWeDo, areaServed: { "@type": "Country", name: "India" }, url: "https://socioryx.com/services/brand-marketing-positioning", offers: { "@type": "Offer", availability: "https://schema.org/InStock", areaServed: "IN" } };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: data.faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://socioryx.com" }, { "@type": "ListItem", position: 2, name: "Services", item: "https://socioryx.com/services" }, { "@type": "ListItem", position: 3, name: "Brand Marketing and Positioning", item: "https://socioryx.com/services/brand-marketing-positioning" }] };

export default function BrandMarketingPage() {
  return (<><Script id="service-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} /><Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} /><Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} /><Navbar /><ServicePageLayout data={data} /><Footer /></>);
}

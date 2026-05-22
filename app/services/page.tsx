import type { Metadata } from "next";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import ServicesPageContent from "@/components/sections/ServicesPageContent";
import ServicesShaderBg from "@/components/ui/services-shader-bg";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Services — Website, Content, Social Media & Video | Socioryx",
  description: "One team for your website, content, social media, and video. Built for D2C brands and SaaS startups that are serious about growth.",
  alternates: { canonical: "https://socioryx.com/services" },
  openGraph: {
    title: "Services | Socioryx",
    description: "One team for your website, content, social media, and video. Built for D2C brands and SaaS startups.",
    url: "https://socioryx.com/services",
    images: [{ url: "https://socioryx.com/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Services | Socioryx",
    description: "One team for your website, content, social media, and video. Built for D2C brands and SaaS startups.",
    images: ["https://socioryx.com/og-image.png"],
  },
};

const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Socioryx Content Marketing Services",
  description: "Full-stack content marketing services for D2C brands and SaaS startups in India.",
  url: "https://socioryx.com/services",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Website Design and Development", url: "https://socioryx.com/services/website-design-development" },
    { "@type": "ListItem", position: 2, name: "Brand Marketing and Positioning", url: "https://socioryx.com/services/brand-marketing-positioning" },
    { "@type": "ListItem", position: 3, name: "Content Creation for Social Media", url: "https://socioryx.com/services/content-creation-social-media" },
    { "@type": "ListItem", position: 4, name: "Social Media Management", url: "https://socioryx.com/services/social-media-management" },
    { "@type": "ListItem", position: 5, name: "Influencer Marketing for D2C Brands", url: "https://socioryx.com/services/influencer-marketing-d2c-brands" },
    { "@type": "ListItem", position: 6, name: "Video Production", url: "https://socioryx.com/services/video-production" },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://socioryx.com" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://socioryx.com/services" },
  ],
};

export default function ServicesPage() {
  return (
    <main className="bg-[#0f1419] relative">
      <Script id="services-list-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <ServicesShaderBg />
      <div className="relative z-10">
        <Navbar />
        <ServicesPageContent />
        <Footer />
      </div>
    </main>
  );
}

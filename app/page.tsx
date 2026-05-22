import { redirect } from "next/navigation";
import dynamic from "next/dynamic";
import Script from "next/script";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";

// Force fresh evaluation on every request — needed for time-based redirect
export const revalidate = 0;

// Launch: 23:52 IST = 18:22 UTC on May 10, 2026
const LAUNCH_TIME = new Date("2026-05-10T18:22:00Z").getTime();

const LogoStrip = dynamic(() => import("@/components/sections/LogoStrip"));
const Services = dynamic(() => import("@/components/sections/Services"));
const HowItWorks = dynamic(() => import("@/components/sections/HowItWorks"));
const Testimonials = dynamic(() => import("@/components/sections/Testimonials"));
const MeetTheTeam = dynamic(() => import("@/components/sections/MeetTheTeam"));
const SocialProof = dynamic(() => import("@/components/sections/SocialProof"));
const CTA = dynamic(() => import("@/components/sections/CTA"));
const EmailStrip = dynamic(() => import("@/components/sections/EmailStrip"));
const Footer = dynamic(() => import("@/components/sections/Footer"));

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Socioryx",
  url: "https://socioryx.com",
  logo: "https://socioryx.com/og-image.png",
  description: "Full-stack content marketing agency in India helping D2C brands, SaaS startups and creators grow through video, social media, influencer marketing and web design.",
  address: { "@type": "PostalAddress", addressCountry: "IN" },
  sameAs: [
    "https://www.instagram.com/socioryx_network/",
    "https://www.linkedin.com/company/socioryx/",
    "https://x.com/SocioryxN79343",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: "work@socioryx.com",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Content Marketing Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Website Design and Development", url: "https://socioryx.com/services/website-design-development" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Brand Marketing and Positioning", url: "https://socioryx.com/services/brand-marketing-positioning" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Content Creation for Social Media", url: "https://socioryx.com/services/content-creation-social-media" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Social Media Management", url: "https://socioryx.com/services/social-media-management" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Influencer Marketing for D2C Brands", url: "https://socioryx.com/services/influencer-marketing-d2c-brands" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Video Production", url: "https://socioryx.com/services/video-production" } },
    ],
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Socioryx",
  url: "https://socioryx.com",
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: "https://socioryx.com/blog?q={search_term_string}" },
    "query-input": "required name=search_term_string",
  },
};

export default function Home() {
  if (Date.now() < LAUNCH_TIME) {
    redirect("/countdown");
  }
  return (
    <main>
      <Script id="org-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      <Script id="website-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <Navbar />
      <Hero />
      <LogoStrip />
      <Services />
      <HowItWorks />
      <Testimonials />
      <MeetTheTeam />
      <SocialProof />
      <CTA />
      <EmailStrip />
      <Footer />
    </main>
  );
}

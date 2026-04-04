import { redirect } from "next/navigation";
import dynamic from "next/dynamic";
import Script from "next/script";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";

// Launch: 23:12 IST = 17:42 UTC on April 4, 2026
const LAUNCH_TIME = new Date("2026-04-04T17:42:00Z").getTime();

const LogoStrip = dynamic(() => import("@/components/sections/LogoStrip"));
const Services = dynamic(() => import("@/components/sections/Services"));
const HowItWorks = dynamic(() => import("@/components/sections/HowItWorks"));
const Testimonials = dynamic(() => import("@/components/sections/Testimonials"));
const MeetTheTeam = dynamic(() => import("@/components/sections/MeetTheTeam"));
const SocialProof = dynamic(() => import("@/components/sections/SocialProof"));
const CTA = dynamic(() => import("@/components/sections/CTA"));
const EmailStrip = dynamic(() => import("@/components/sections/EmailStrip"));
const Footer = dynamic(() => import("@/components/sections/Footer"));

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Socioryx",
  url: "https://socioryx.com",
  logo: "https://socioryx.com/og-image.png",
  description: "Full-stack content marketing agency in India helping D2C brands, SaaS startups and creators grow through video, social media, influencer marketing and web design.",
  address: {
    "@type": "PostalAddress",
    addressCountry: "IN",
  },
  sameAs: [
    "https://www.instagram.com/droppingsoon12/",
    "https://www.linkedin.com/company/socioryx",
    "https://x.com/SocioryxN79343",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: "work@socioryx.com",
  },
};

export default function Home() {
  // Before launch — redirect everyone to countdown
  if (Date.now() < LAUNCH_TIME) {
    redirect("/countdown");
  }
return (
    <main>
      <Script
        id="org-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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


import dynamic from "next/dynamic";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";

const Services = dynamic(() => import("@/components/sections/Services"));
const HowItWorks = dynamic(() => import("@/components/sections/HowItWorks"));
const Testimonials = dynamic(() => import("@/components/sections/Testimonials"));
const Pricing = dynamic(() => import("@/components/sections/Pricing"));
const ToolsStack = dynamic(() => import("@/components/sections/ToolsStack"));
const Platforms = dynamic(() => import("@/components/sections/Platforms"));
const SocialProof = dynamic(() => import("@/components/sections/SocialProof"));
const CTA = dynamic(() => import("@/components/sections/CTA"));
const Footer = dynamic(() => import("@/components/sections/Footer"));

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Services />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <ToolsStack />
      <Platforms />
      <SocialProof />
      <CTA />
      <Footer />
    </main>
  );
}

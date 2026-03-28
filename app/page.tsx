import dynamic from "next/dynamic";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";

const LogoStrip = dynamic(() => import("@/components/sections/LogoStrip"));
const Services = dynamic(() => import("@/components/sections/Services"));
const HowItWorks = dynamic(() => import("@/components/sections/HowItWorks"));
const Testimonials = dynamic(() => import("@/components/sections/Testimonials"));
const MeetTheTeam = dynamic(() => import("@/components/sections/MeetTheTeam"));
const SocialProof = dynamic(() => import("@/components/sections/SocialProof"));
const CTA = dynamic(() => import("@/components/sections/CTA"));
const Footer = dynamic(() => import("@/components/sections/Footer"));

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <LogoStrip />
      <Services />
      <HowItWorks />
      <Testimonials />
      <MeetTheTeam />
      <SocialProof />
      <CTA />
      <Footer />
    </main>
  );
}

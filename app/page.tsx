import dynamic from "next/dynamic";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import { faqSchema, homeFaqs } from "@/lib/faqs";

const LogoStrip = dynamic(() => import("@/components/sections/LogoStrip"));
const Services = dynamic(() => import("@/components/sections/Services"));
const HowItWorks = dynamic(() => import("@/components/sections/HowItWorks"));
const Testimonials = dynamic(() => import("@/components/sections/Testimonials"));
const MeetTheTeam = dynamic(() => import("@/components/sections/MeetTheTeam"));
const SocialProof = dynamic(() => import("@/components/sections/SocialProof"));
const FAQ = dynamic(() => import("@/components/sections/FAQ"));
const CTA = dynamic(() => import("@/components/sections/CTA"));
const EmailStrip = dynamic(() => import("@/components/sections/EmailStrip"));
const CinematicFooter = dynamic(() =>
  import("@/components/ui/motion-footer").then((mod) => mod.CinematicFooter)
);

export default function Home() {
  return (
    <>
      <main className="relative z-10 bg-[#0f1419]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(homeFaqs)) }}
        />
        <Navbar />
        <Hero />
        <LogoStrip />
        <Services />
        <HowItWorks />
        <Testimonials />
        <MeetTheTeam />
        <SocialProof />
        <FAQ />
        <CTA />
        <EmailStrip />
      </main>
      <CinematicFooter />
    </>
  );
}

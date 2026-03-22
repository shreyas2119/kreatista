import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import HowItWorks from "@/components/sections/HowItWorks";
import ToolsStack from "@/components/sections/ToolsStack";
import Platforms from "@/components/sections/Platforms";
import SocialProof from "@/components/sections/SocialProof";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Services />
      <HowItWorks />
      <ToolsStack />
      <Platforms />
      <SocialProof />
      <CTA />
      <Footer />
    </main>
  );
}

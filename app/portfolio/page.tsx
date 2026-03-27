import type { Metadata } from "next";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import PortfolioPageContent from "@/components/sections/PortfolioPageContent";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Explore Socioryx's work — case studies, results and campaigns for D2C brands, SaaS startups and creators.",
};

export default function PortfolioPage() {
  return (
    <main className="bg-[#13131a]">
      <Navbar />
      <PortfolioPageContent />
      <Footer />
    </main>
  );
}

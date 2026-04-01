import type { Metadata } from "next";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import PortfolioPageContent from "@/components/sections/PortfolioPageContent";

export const metadata: Metadata = {
  title: "Portfolio — Case Studies & Client Results",
  description: "Explore Socioryx's work — real results, case studies and campaigns delivered for D2C brands, SaaS startups and creators across India.",
  alternates: { canonical: "https://socioryx.com/portfolio" },
  openGraph: {
    title: "Portfolio | Socioryx",
    description: "Real results and case studies for D2C brands, SaaS startups and creators.",
    url: "https://socioryx.com/portfolio",
  },
};

export default function PortfolioPage() {
  return (
    <main className="bg-[#0f1419]">
      <Navbar />
      <PortfolioPageContent />
      <Footer />
    </main>
  );
}

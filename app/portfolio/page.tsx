import type { Metadata } from "next";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import PortfolioPageContent from "@/components/sections/PortfolioPageContent";

export const metadata: Metadata = {
  title: "Portfolio — Client Work & Results",
  description: "Socioryx portfolio — public case studies for Indore Dental Hospital and Puja Shraddha, plus D2C campaigns, SaaS content strategies, and creator growth work.",
  alternates: { canonical: "https://socioryx.com/portfolio" },
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

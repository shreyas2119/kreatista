import type { Metadata } from "next";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import PortfolioPageContent from "@/components/sections/PortfolioPageContent";

export const metadata: Metadata = {
  title: "Portfolio — Socioryx",
  description: "View Socioryx's portfolio — real campaigns, content strategies, and results for D2C brands and SaaS startups. Sign in to access the full deck.",
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

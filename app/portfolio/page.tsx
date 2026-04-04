import type { Metadata } from "next";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import ComingSoon from "@/components/sections/ComingSoon";

export const metadata: Metadata = {
  title: "Portfolio — Coming Soon",
  description: "Our portfolio is coming soon. Explore Socioryx's work — case studies, results and campaigns for D2C brands, SaaS startups and creators.",
  alternates: { canonical: "https://socioryx.com/portfolio" },
};

export default function PortfolioPage() {
  return (
    <main className="bg-[#0f1419]">
      <Navbar />
      <ComingSoon
        label="Portfolio"
        heading="Our Work is Coming Soon"
        subheading="We're putting together our case studies and campaign results. Check back shortly."
      />
      <Footer />
    </main>
  );
}

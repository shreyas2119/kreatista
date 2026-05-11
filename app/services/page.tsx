import type { Metadata } from "next";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import ServicesPageContent from "@/components/sections/ServicesPageContent";

export const metadata: Metadata = {
  title: "Content Marketing Services — Video, Social Media & Web Design",
  description: "Website design, social media management, video production, influencer marketing, and brand positioning for D2C brands and SaaS startups in India. Get a custom quote.",
  alternates: { canonical: "https://socioryx.com/services" },
  openGraph: {
    title: "Content Marketing Services | Socioryx",
    description: "Video production, social media, influencer marketing, web design — all under one roof for D2C brands and SaaS startups.",
    url: "https://socioryx.com/services",
  },
};

export default function ServicesPage() {
  return (
    <main className="bg-[#0f1419]">
      <Navbar />
      <ServicesPageContent />
      <Footer />
    </main>
  );
}

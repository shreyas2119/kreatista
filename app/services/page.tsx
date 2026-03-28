import type { Metadata } from "next";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import ServicesPageContent from "@/components/sections/ServicesPageContent";

export const metadata: Metadata = {
  title: "Services",
  description: "Website design, product marketing, content creation, social media, influencer collabs and video production — all under one roof.",
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

import type { Metadata } from "next";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import TeamPageContent from "@/components/sections/TeamPageContent";

export const metadata: Metadata = {
  title: "Our Team",
  description: "Meet the minds behind Socioryx — strategists, creators and builders obsessed with making brands impossible to ignore.",
};

export default function TeamPage() {
  return (
    <main className="bg-[#0f1419]">
      <Navbar />
      <TeamPageContent />
      <Footer />
    </main>
  );
}

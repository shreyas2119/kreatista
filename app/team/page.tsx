import type { Metadata } from "next";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import TeamPageContent from "@/components/sections/TeamPageContent";

export const metadata: Metadata = {
  title: "Meet the Team — Strategists, Creators & Builders",
  description: "Meet the minds behind Socioryx — a team of strategists, creators and builders obsessed with making brands impossible to ignore.",
  alternates: { canonical: "https://socioryx.com/team" },
  openGraph: {
    title: "Meet the Team | Socioryx",
    description: "The strategists, creators and builders behind Socioryx's results.",
    url: "https://socioryx.com/team",
  },
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

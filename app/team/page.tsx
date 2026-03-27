import type { Metadata } from "next";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import TeamPageContent from "@/components/sections/TeamPageContent";

export const metadata: Metadata = {
  title: "Our Team",
  description: "Meet the minds behind Kreatista — strategists, creators and builders obsessed with making brands impossible to ignore.",
};

export default function TeamPage() {
  return (
    <main className="bg-[#13131a]">
      <Navbar />
      <TeamPageContent />
      <Footer />
    </main>
  );
}

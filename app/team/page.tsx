import type { Metadata } from "next";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import TeamPageContent from "@/components/sections/TeamPageContent";
import { team } from "@/lib/team";

export const metadata: Metadata = {
  title: "Meet the Team — Strategists, Creators & Builders",
  description: "Meet the Socioryx team — 5 specialists in content strategy, social media, video production, influencer marketing, and web development based in India.",
  alternates: { canonical: "https://socioryx.com/team" },
  openGraph: {
    title: "Meet the Team | Socioryx",
    description: "The strategists, creators and builders behind Socioryx's results.",
    url: "https://socioryx.com/team",
  },
};

const teamSchema = team.map((member) => ({
  "@type": "Person",
  name: member.name,
  jobTitle: member.role,
  url: "https://socioryx.com/team",
  ...(member.photo ? { image: `https://socioryx.com${member.photo}` } : {}),
  worksFor: { "@type": "Organization", "@id": "https://socioryx.com/#organization" },
  ...(member.socials
    ? { sameAs: [member.socials.linkedin, member.socials.instagram].filter(Boolean) }
    : {}),
}));

export default function TeamPage() {
  return (
    <main className="bg-[#0f1419]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({ "@context": "https://schema.org", "@graph": teamSchema }),
        }}
      />
      <Navbar />
      <TeamPageContent />
      <Footer />
    </main>
  );
}

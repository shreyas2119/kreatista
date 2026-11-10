import type { Metadata } from "next";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import CaseStudyPage from "@/components/sections/CaseStudyPage";
import { caseStudies } from "@/lib/case-studies";

const study = caseStudies.find((s) => s.slug === "indore-dental-hospital")!;
const url = "https://socioryx.com/portfolio/indore-dental-hospital";

export const metadata: Metadata = {
  title: "Indore Dental Hospital — Website Case Study",
  description: study.summary,
  alternates: { canonical: url },
  openGraph: { title: "Indore Dental Hospital — Socioryx case study", description: study.summary, url, images: [study.image] },
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CreativeWork",
      name: `${study.client} — website by Socioryx`,
      description: study.summary,
      image: `https://socioryx.com${study.image}`,
      url,
      creator: { "@type": "Organization", "@id": "https://socioryx.com/#organization" },
      about: { "@type": "Organization", name: study.client, url: study.liveUrl },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://socioryx.com" },
        { "@type": "ListItem", position: 2, name: "Portfolio", item: "https://socioryx.com/portfolio" },
        { "@type": "ListItem", position: 3, name: study.client, item: url },
      ],
    },
  ],
};

export default function Page() {
  return (
    <main className="bg-[#0f1419]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Navbar />
      <CaseStudyPage study={study} />
      <Footer />
    </main>
  );
}

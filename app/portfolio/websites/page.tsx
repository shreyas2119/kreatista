import type { Metadata } from "next";
import { WorkPage } from "@/components/work/work-page";
import { caseStudies } from "@/lib/case-studies";

export const metadata: Metadata = {
  title: "How your website project unfolds",
  description: "How a website project unfolds with Socioryx, from the discovery call to launch. Live work includes Indore Dental Hospital and Puja Shraddha.",
  alternates: { canonical: "https://socioryx.com/portfolio/websites" },
  openGraph: {
    title: "How your website project unfolds | Socioryx",
    description: "Discovery, design, build, and launch. Live work includes Indore Dental Hospital and Puja Shraddha.",
    url: "https://socioryx.com/portfolio/websites",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ItemList",
      name: "Socioryx website case studies",
      url: "https://socioryx.com/portfolio/websites",
      itemListElement: caseStudies.map((study, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: study.client,
        url: `https://socioryx.com/portfolio/${study.slug}`,
      })),
    },
    ...caseStudies.map((study) => ({
      "@type": "CreativeWork",
      name: `${study.client} — website by Socioryx`,
      description: study.summary,
      image: `https://socioryx.com${study.image}`,
      url: `https://socioryx.com/portfolio/${study.slug}`,
      creator: { "@type": "Organization", "@id": "https://socioryx.com/#organization" },
      about: { "@type": "Organization", name: study.client, url: study.liveUrl },
    })),
  ],
};

export default function WebsiteWorkPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <WorkPage />
    </>
  );
}

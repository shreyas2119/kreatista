import type { Metadata } from "next";
import { WorkPage } from "@/components/work/work-page";

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

export default function WebsiteWorkPage() {
  return <WorkPage />;
}

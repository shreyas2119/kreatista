import type { Metadata } from "next";
import Navbar from "@/components/sections/Navbar";
import MarketingAudit from "@/components/sections/MarketingAudit";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Free AI Marketing Audit | Socioryx",
  description: "Get a free AI-powered marketing audit. Discover your biggest growth opportunities in under 60 seconds. SEO, content, branding, and conversion analysis.",
  openGraph: {
    title: "Free AI Marketing Audit | Socioryx",
    description: "Get a free AI-powered marketing audit. Discover your biggest growth opportunities in under 60 seconds.",
  },
};

export default function AuditPage() {
  return (
    <main>
      <Navbar />
      <MarketingAudit />
      <Footer />
    </main>
  );
}

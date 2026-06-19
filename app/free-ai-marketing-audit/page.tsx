import type { Metadata } from "next";
import Navbar from "@/components/sections/Navbar";
import MarketingAudit from "@/components/sections/MarketingAudit";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Free AI Marketing Audit — Analyze Your Website in Seconds | Socioryx",
  description: "Get a free AI-powered marketing audit for your website. Instantly analyze SEO, content, branding, and conversion. Actionable insights to grow your business — no credit card required.",
  keywords: ["free marketing audit", "AI marketing audit", "website audit tool", "SEO audit", "brand audit", "conversion audit", "marketing analysis", "free website analyzer", "Socioryx"],
  openGraph: {
    title: "Free AI Marketing Audit — Analyze Your Website in Seconds | Socioryx",
    description: "Get a free AI-powered marketing audit for your website. Instantly analyze SEO, content, branding, and conversion. Actionable insights to grow your business — no credit card required.",
    type: "website",
    url: "https://socioryx.com/free-ai-marketing-audit",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Marketing Audit — Analyze Your Website in Seconds | Socioryx",
    description: "Get a free AI-powered marketing audit for your website. Instantly analyze SEO, content, branding, and conversion.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://socioryx.com/free-ai-marketing-audit" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Socioryx Free AI Marketing Audit",
  url: "https://socioryx.com/free-ai-marketing-audit",
  description: "Free AI-powered website marketing audit tool. Analyzes SEO, content, branding, and conversion to help businesses grow.",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  provider: {
    "@type": "Organization",
    name: "Socioryx",
    url: "https://socioryx.com",
  },
};

export default function AuditPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <MarketingAudit />
      <Footer />
    </main>
  );
}

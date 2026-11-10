import type { Metadata } from "next";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import ContactPageContent from "@/components/sections/ContactPageContent";

export const metadata: Metadata = {
  title: "Contact Socioryx — Book a Free Strategy Call",
  description: "Contact Socioryx, a content marketing agency in India. Email work@socioryx.com, send a message, or book a free 30-minute strategy call. Replies within 24 hours.",
  alternates: { canonical: "https://socioryx.com/contact" },
  openGraph: {
    title: "Contact Socioryx",
    description: "Book a free 30-minute strategy call or send a message. Replies within 24 hours.",
    url: "https://socioryx.com/contact",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  url: "https://socioryx.com/contact",
  mainEntity: {
    "@type": "Organization",
    "@id": "https://socioryx.com/#organization",
    name: "Socioryx",
    email: "work@socioryx.com",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: "work@socioryx.com",
      areaServed: "IN",
      availableLanguage: ["en", "hi"],
    },
  },
};

export default function ContactPage() {
  return (
    <main className="bg-[#0f1419]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Navbar />
      <ContactPageContent />
      <Footer />
    </main>
  );
}

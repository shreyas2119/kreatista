import type { Metadata } from "next";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms and conditions governing your use of socioryx.com.",
};

export default function TermsPage() {
  return (
    <main className="bg-[#0f1419]">
      <Navbar />
      <LegalPage
        title="Terms of Service"
        effectiveDate="April 1, 2026"
        sections={termsSections}
      />
      <Footer />
    </main>
  );
}

function LegalPage({ title, effectiveDate, sections }: {
  title: string;
  effectiveDate: string;
  sections: { heading: string; body: React.ReactNode }[];
}) {
  return (
    <section className="pt-32 pb-24 px-5 sm:px-8 lg:px-16">
      <div className="max-w-3xl mx-auto">
        <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#E5E4E2] mb-4 font-body">Legal</p>
        <h1 className="text-4xl sm:text-6xl font-semibold text-[#F8F8FF] tracking-[-0.03em] mb-3 font-heading">{title}</h1>
        <p className="text-base text-[#B8C5D6]/50 font-body mb-16">Effective Date: {effectiveDate} · socioryx.com · <a href="mailto:Work@Socioryxnetwork.com" className="hover:text-[#E5E4E2] transition-colors">Work@Socioryxnetwork.com</a></p>

        <div className="space-y-12">
          {sections.map((s, i) => (
            <div key={i} className="border-t border-[#F8F8FF]/[0.06] pt-8">
              <h2 className="text-xl font-semibold text-[#F8F8FF] mb-4 font-heading">{i + 1}. {s.heading}</h2>
              <div className="text-[#B8C5D6]/80 text-base leading-relaxed font-body space-y-3">{s.body}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const termsSections: { heading: string; body: React.ReactNode }[] = [
  {
    heading: "Acceptance of Terms",
    body: <p>By accessing or using socioryx.com, you agree to be bound by these Terms of Service. If you do not agree, please do not use our website.</p>,
  },
  {
    heading: "About Socioryx",
    body: <p>Socioryx is a content marketing agency that provides services including website design and development, social media management, video production, influencer collaborations, and brand growth strategy. These Terms govern your use of our website and any services you engage us for.</p>,
  },
  {
    heading: "Use of the Website",
    body: (
      <>
        <p>You agree to use socioryx.com only for lawful purposes. You must not:</p>
        <ul className="list-disc list-inside space-y-1 text-[#B8C5D6]/70 mt-2">
          <li>Use the website in any way that violates applicable laws or regulations</li>
          <li>Attempt to gain unauthorized access to any part of the website or its systems</li>
          <li>Transmit any harmful, offensive, or disruptive content through our contact forms</li>
          <li>Reproduce, distribute, or modify any content from this website without our written permission</li>
        </ul>
      </>
    ),
  },
  {
    heading: "Portfolio Access",
    body: (
      <>
        <p>Certain areas of our website require account registration to access. By creating an account, you agree to:</p>
        <ul className="list-disc list-inside space-y-1 text-[#B8C5D6]/70 mt-2">
          <li>Provide accurate and complete information</li>
          <li>Keep your login credentials confidential</li>
          <li>Notify us immediately of any unauthorized use of your account</li>
        </ul>
        <p className="mt-3">We reserve the right to suspend or terminate accounts that violate these Terms.</p>
      </>
    ),
  },
  {
    heading: "Intellectual Property",
    body: <p>All content on socioryx.com — including text, images, graphics, videos, and branding — is the property of Socioryx or its content suppliers and is protected under applicable intellectual property laws. You may not use, copy, or distribute our content without prior written consent.</p>,
  },
  {
    heading: "Service Engagements",
    body: <p>These Terms govern your use of the website only. Separate agreements, proposals, or contracts govern any paid services you engage Socioryx for. Nothing on this website constitutes a binding offer or guarantee of service availability, pricing, or timelines.</p>,
  },
  {
    heading: "Disclaimer of Warranties",
    body: <p>Our website is provided on an "as is" and "as available" basis. We make no warranties, express or implied, regarding the accuracy, reliability, or availability of the website or its content. We do not guarantee that the website will be uninterrupted or error-free.</p>,
  },
  {
    heading: "Limitation of Liability",
    body: <p>To the fullest extent permitted by law, Socioryx shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of this website or our services, including but not limited to loss of data, revenue, or business opportunities.</p>,
  },
  {
    heading: "Third-Party Links",
    body: <p>Our website may contain links to third-party websites. We are not responsible for the content, privacy practices, or terms of those websites. Accessing third-party links is at your own risk.</p>,
  },
  {
    heading: "Governing Law",
    body: <p>These Terms are governed by the laws of India. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts located in India.</p>,
  },
  {
    heading: "Changes to These Terms",
    body: <p>We reserve the right to update these Terms at any time. Changes will be posted on this page with an updated effective date. Continued use of the website after changes constitutes acceptance of the updated Terms.</p>,
  },
  {
    heading: "Contact Us",
    body: <p>For any questions about these Terms, email us at <a href="mailto:Work@Socioryxnetwork.com" className="text-[#E5E4E2] hover:underline">Work@Socioryxnetwork.com</a>.</p>,
  },
];

import type { Metadata } from "next";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Socioryx collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <main className="bg-[#0f1419]">
      <Navbar />
      <LegalPage
        title="Privacy Policy"
        effectiveDate="April 5, 2026"
        sections={privacySections}
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
        <p className="text-base text-[#B8C5D6]/50 font-body mb-16">Effective Date: {effectiveDate} · socioryx.com · <a href="mailto:work@socioryx.com" className="hover:text-[#E5E4E2] transition-colors">work@socioryx.com</a></p>

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

const privacySections: { heading: string; body: React.ReactNode }[] = [
  {
    heading: "Who We Are",
    body: <p>Socioryx is a full-stack content marketing agency based in India. We provide services including website design, social media management, video production, influencer collaborations, and brand growth strategy. This Privacy Policy explains how we collect, use, store, and protect your information when you visit socioryx.com. It is compliant with India's Digital Personal Data Protection (DPDP) Act, 2023 and the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011.</p>,
  },
  {
    heading: "What Data We Collect and Why",
    body: (
      <>
        <p><strong className="text-[#F8F8FF]">Contact Form.</strong> When you submit our contact form, we collect your name, email address, and message. We use this solely to respond to your inquiry. We do not add you to any mailing list without your explicit consent.</p>
        <p><strong className="text-[#F8F8FF]">Booking (Calendly).</strong> When you book a discovery call, Calendly collects your name, email, and scheduling preferences. This is handled by Calendly under their own Privacy Policy. We receive a copy of your booking details to prepare for the call.</p>
        <p><strong className="text-[#F8F8FF]">Portfolio Access (Account Login).</strong> To access our portfolio, you may sign in with your email and password or Google account. Authentication is handled by Firebase (Google). We store only what is necessary to verify your identity.</p>
        <p><strong className="text-[#F8F8FF]">Analytics (Microsoft Clarity).</strong> With your consent, we use Microsoft Clarity to understand how visitors use our site. Clarity may collect session recordings, heatmaps, click patterns, and device/browser information. This data is anonymised and used only to improve the website. Clarity is not loaded until you accept cookies.</p>
        <p><strong className="text-[#F8F8FF]">Automatically Collected Data.</strong> Our servers may log your IP address, browser type, device, operating system, referring URL, and pages visited. This is standard web server logging used for security and performance monitoring.</p>
      </>
    ),
  },
  {
    heading: "How Long We Keep Your Data",
    body: (
      <ul className="list-disc list-inside space-y-2 text-[#B8C5D6]/70">
        <li><strong className="text-[#F8F8FF]">Contact form submissions</strong> — kept for 12 months, then deleted</li>
        <li><strong className="text-[#F8F8FF]">Account data (portfolio access)</strong> — kept as long as your account is active; deleted within 30 days of a deletion request</li>
        <li><strong className="text-[#F8F8FF]">Calendly booking data</strong> — retained by Calendly per their policy; we delete our copy after 6 months</li>
        <li><strong className="text-[#F8F8FF]">Analytics data (Clarity)</strong> — retained by Microsoft for up to 13 months</li>
        <li><strong className="text-[#F8F8FF]">Server logs</strong> — retained for 30 days for security purposes</li>
      </ul>
    ),
  },
  {
    heading: "Cookies and Your Consent",
    body: (
      <>
        <p>We use cookies for two purposes: essential site functionality (authentication) and analytics (Microsoft Clarity). Analytics cookies are only placed after you explicitly accept via our cookie consent banner.</p>
        <p>You can withdraw consent at any time by clearing your browser cookies and declining on the next visit. Declining analytics cookies does not affect your ability to use the website.</p>
      </>
    ),
  },
  {
    heading: "How We Use Your Information",
    body: (
      <>
        <ul className="list-disc list-inside space-y-1 text-[#B8C5D6]/70">
          <li>To respond to your inquiries and service requests</li>
          <li>To schedule and confirm discovery calls</li>
          <li>To grant access to our portfolio</li>
          <li>To improve website performance and user experience</li>
          <li>To maintain security and prevent fraud</li>
        </ul>
        <p className="mt-3">We do not sell, rent, or share your personal data with third parties for marketing purposes.</p>
      </>
    ),
  },
  {
    heading: "Data Storage and Security",
    body: <p>Contact form data is stored in Supabase (a secure cloud database with encryption at rest). Account authentication is handled by Firebase. We implement reasonable technical and organisational measures to protect your data. No method of internet transmission is 100% secure, but we take all practical steps to protect your information.</p>,
  },
  {
    heading: "Your Rights Under DPDP Act 2023",
    body: (
      <>
        <p>As a data principal under India's DPDP Act 2023, you have the right to:</p>
        <ul className="list-disc list-inside space-y-1 text-[#B8C5D6]/70 mt-2">
          <li>Access the personal data we hold about you</li>
          <li>Correct inaccurate or incomplete data</li>
          <li>Request deletion of your personal data</li>
          <li>Withdraw consent for data processing at any time</li>
          <li>Nominate another person to exercise these rights on your behalf</li>
        </ul>
        <p className="mt-3">To exercise any of these rights, email us at <a href="mailto:work@socioryx.com" className="text-[#E5E4E2] hover:underline">work@socioryx.com</a>. We will respond within 30 days.</p>
      </>
    ),
  },
  {
    heading: "Third-Party Services",
    body: (
      <p>We use the following third-party services, each governed by their own privacy policies: Firebase (Google) for authentication, Supabase for database storage, Calendly for scheduling, Microsoft Clarity for analytics, and Vercel for hosting. We encourage you to review their respective policies.</p>
    ),
  },
  {
    heading: "Children's Privacy",
    body: <p>Our website is not directed at children under the age of 18. We do not knowingly collect personal data from minors. If you believe a minor has submitted data to us, contact us immediately at <a href="mailto:work@socioryx.com" className="text-[#E5E4E2] hover:underline">work@socioryx.com</a> and we will delete it promptly.</p>,
  },
  {
    heading: "Updates to This Policy",
    body: <p>We may update this Privacy Policy periodically. Changes take effect immediately upon posting. The effective date at the top of this page reflects the most recent revision. We encourage you to review this page regularly.</p>,
  },
  {
    heading: "Contact Us",
    body: <p>For any questions, data requests, or concerns about this Privacy Policy, contact us at <a href="mailto:work@socioryx.com" className="text-[#E5E4E2] hover:underline">work@socioryx.com</a>. We aim to respond within 30 days.</p>,
  },
];

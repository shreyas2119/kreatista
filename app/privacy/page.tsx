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
        effectiveDate="April 1, 2026"
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

const privacySections: { heading: string; body: React.ReactNode }[] = [
  {
    heading: "Who We Are",
    body: <p>Socioryx is a full-stack content marketing agency based in India. We provide services including website design and development, social media management, video production, influencer collaborations, and brand growth strategy. This Privacy Policy explains how we collect, use, and protect your information when you visit socioryx.com.</p>,
  },
  {
    heading: "Information We Collect",
    body: (
      <>
        <p>We gather personal information to support account authentication and enhance your experience. This may include details you provide during registration, such as your email address and password (for email-based sign-ups), or information received through third-party login methods like Google Sign-In.</p>
        <p>In addition, we collect usage data automatically. This may include your IP address, browser type, device information, operating system, referring URLs, pages visited, and the date and time of your interactions with our platform.</p>
        <p><strong className="text-[#F8F8FF]">Contact Form.</strong> When you submit our contact form, we collect your first name, last name, email address, and message. This information is stored in our secure database and used to respond to your inquiry.</p>
        <p><strong className="text-[#F8F8FF]">Booking (Calendly).</strong> When you book a call through our website, Calendly collects your name, email address, and scheduling preferences. This data is handled by Calendly in accordance with their own Privacy Policy.</p>
        <p><strong className="text-[#F8F8FF]">Portfolio Access (Account Login).</strong> To access our portfolio, you may create an account using your email address and password. This authentication is handled by Firebase (Google). We store only the information necessary to verify your identity and grant access.</p>
        <p><strong className="text-[#F8F8FF]">Analytics.</strong> We use Microsoft Clarity to understand how visitors interact with our website. Clarity may collect session recordings, heatmaps, and usage data. This data is anonymized and used solely to improve our website experience.</p>
      </>
    ),
  },
  {
    heading: "How We Use Your Information",
    body: (
      <>
        <p>We use the information we collect to:</p>
        <ul className="list-disc list-inside space-y-1 text-[#B8C5D6]/70 mt-2">
          <li>Operate, maintain, and improve our services</li>
          <li>Respond to your inquiries and service requests</li>
          <li>Schedule and confirm discovery calls</li>
          <li>Grant access to our portfolio</li>
          <li>Customize your experience and provide content relevant to your preferences</li>
          <li>Communicate with you regarding your account, updates, and promotional content</li>
          <li>Maintain the safety, security, and reliability of our platform</li>
          <li>Analyze user behavior and trends to enhance overall performance and features</li>
        </ul>
        <p className="mt-3">We do not sell, rent, or trade your personal information to third parties.</p>
      </>
    ),
  },
  {
    heading: "Data Storage and Security",
    body: <p>Your contact form submissions are stored in Supabase, a secure cloud database. We implement reasonable technical and organizational measures to protect your data from unauthorized access, loss, or misuse. However, no method of transmission over the internet is 100% secure.</p>,
  },
  {
    heading: "Third-Party Links",
    body: <p>Our services may include links to external websites that are not operated by Socioryx. If you choose to visit these third-party sites, we recommend reviewing their privacy policies. We are not responsible for the content, policies, or practices of any external websites or services.</p>,
  },
  {
    heading: "Cookies and Tracking Technologies",
    body: (
      <>
        <p>We use cookies and similar technologies to monitor activity on our platform and store certain information. Cookies are small data files that may include a unique anonymous identifier and are stored on your device.</p>
        <p>We may also use technologies such as beacons, tags, and scripts to collect and analyze information, helping us improve our services and user experience. You may disable cookies through your browser settings, though this may affect certain features of the website.</p>
      </>
    ),
  },
  {
    heading: "Your Rights",
    body: (
      <>
        <p>You have the right to request access to, correction of, or deletion of your personal data. To exercise any of these rights, contact us at <a href="mailto:Work@Socioryxnetwork.com" className="text-[#E5E4E2] hover:underline">Work@Socioryxnetwork.com</a>.</p>
      </>
    ),
  },
  {
    heading: "Children's Privacy",
    body: <p>Our website is not directed at children under the age of 13. We do not knowingly collect personal information from children.</p>,
  },
  {
    heading: "Updates to This Privacy Policy",
    body: <p>We may revise this Privacy Policy periodically. Any updates will be posted on this page, and changes will take effect immediately upon posting. We encourage you to review this page regularly to stay informed about how we protect your information.</p>,
  },
  {
    heading: "Contact Us",
    body: <p>For any questions about this Privacy Policy, email us at <a href="mailto:Work@Socioryxnetwork.com" className="text-[#E5E4E2] hover:underline">Work@Socioryxnetwork.com</a>.</p>,
  },
];

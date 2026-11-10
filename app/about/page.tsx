import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import { team } from "@/lib/team";
import { caseStudies } from "@/lib/case-studies";

export const metadata: Metadata = {
  title: "About Socioryx — Full-Stack Content Marketing Agency India",
  description: "Socioryx is a full-stack content marketing agency in India, founded in 2024. One team for websites, brand positioning, content, social media, influencer marketing, and video.",
  alternates: { canonical: "https://socioryx.com/about" },
  openGraph: {
    title: "About Socioryx",
    description: "A full-stack content marketing agency in India, founded in 2024.",
    url: "https://socioryx.com/about",
  },
};

const services = [
  "Website design and development",
  "Brand marketing and positioning",
  "Content creation for social media",
  "Social media management",
  "Influencer marketing for D2C brands",
  "Video production",
];

const schema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  url: "https://socioryx.com/about",
  mainEntity: { "@type": "Organization", "@id": "https://socioryx.com/#organization" },
};

export default function AboutPage() {
  return (
    <main className="bg-[#0f1419]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Navbar />

      <section className="pt-32 pb-16 px-5 sm:px-8 lg:px-16">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#E5E4E2] mb-4 font-body">About</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#F8F8FF] tracking-[-0.04em] leading-[1.05] mb-6 font-heading">
            One team for everything your brand publishes.
          </h1>
          <p className="text-lg text-[#B8C5D6]/70 leading-relaxed font-body max-w-2xl">
            Socioryx is a full-stack content marketing agency based in India, founded in 2024. We help D2C brands,
            SaaS startups, and creators grow online with six services under one team: website design and development,
            brand marketing and positioning, content creation for social media, social media management, influencer
            marketing for D2C brands, and video production.
          </p>
        </div>
      </section>

      <section className="px-5 sm:px-8 lg:px-16 pb-20">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl font-semibold text-[#F8F8FF] tracking-[-0.03em] mb-4 font-heading">What we do</h2>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service} className="text-[#B8C5D6]/65 font-body text-sm leading-relaxed flex gap-2">
                  <span className="text-[#E5E4E2]">—</span>
                  {service}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-[#F8F8FF] tracking-[-0.03em] mb-4 font-heading">Who we work with</h2>
            <p className="text-[#B8C5D6]/65 font-body text-sm leading-relaxed mb-4">
              D2C brand founders building or scaling their digital presence in India, SaaS startup teams that need
              content and positioning to convert users, and creators and personal brands growing an audience.
            </p>
            <p className="text-[#B8C5D6]/65 font-body text-sm leading-relaxed">
              One team handles everything, so there is no coordination overhead between agencies. Limited client
              intake each month means each client gets full team attention.
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 sm:px-8 lg:px-16 pb-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-[#F8F8FF] tracking-[-0.03em] mb-6 font-heading">Live client work</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {caseStudies.map((study) => (
              <Link
                key={study.slug}
                href={`/portfolio/${study.slug}`}
                className="group bg-[#151a21] border border-[#F8F8FF]/[0.07] rounded-2xl p-6 hover:border-[#F8F8FF]/[0.16] transition-colors"
              >
                <p className="text-[10px] uppercase tracking-[0.16em] text-[#B8C5D6]/40 font-body mb-2">{study.industry}</p>
                <h3 className="text-lg font-semibold text-[#F8F8FF] font-heading mb-2">{study.client}</h3>
                <p className="text-sm text-[#B8C5D6]/55 font-body leading-relaxed mb-4">{study.summary}</p>
                <span className="inline-flex items-center gap-1.5 text-sm text-[#E5E4E2] font-body">
                  Read the case study
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 sm:px-8 lg:px-16 pb-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-[#F8F8FF] tracking-[-0.03em] mb-2 font-heading">The team</h2>
          <p className="text-[#B8C5D6]/55 font-body text-sm mb-6">
            {team.length} people, all in-house.{" "}
            <Link href="/team" className="text-[#E5E4E2] underline underline-offset-4 decoration-[#E5E4E2]/30">
              Meet the team
            </Link>
            .
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {team.map((member) => (
              <div key={member.name} className="bg-[#151a21] border border-[#F8F8FF]/[0.06] rounded-xl p-4">
                <p className="text-sm font-semibold text-[#F8F8FF] font-heading">{member.name}</p>
                <p className="text-xs text-[#B8C5D6]/50 font-body mt-0.5">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 sm:px-8 lg:px-16 pb-28">
        <div className="max-w-4xl mx-auto bg-[#151a21] border border-[#F8F8FF]/[0.07] rounded-2xl p-8 flex flex-col sm:flex-row sm:items-center gap-6 sm:justify-between">
          <div>
            <p className="text-lg font-semibold text-[#F8F8FF] font-heading mb-1">Start with a free AI marketing audit.</p>
            <p className="text-sm text-[#B8C5D6]/55 font-body">Analyze your website in seconds, no credit card required.</p>
          </div>
          <Link
            href="/free-ai-marketing-audit"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#E5E4E2] text-[#0f1419] text-sm font-extrabold uppercase tracking-widest rounded-lg font-heading hover:bg-[#D0CFD0] transition-colors flex-shrink-0"
          >
            Run the audit
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { useContactModal } from "@/components/providers/contact-modal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export interface ServicePageData {
  slug: string;
  label: string;
  headline: string;
  subheadline: string;
  intro: string;
  whatWeDoTitle: string;
  whatWeDo: string;
  benefits: string[];
  howItWorksTitle: string;
  howItWorks: { step: string; title: string; desc: string }[];
  whoIsItForTitle: string;
  whoIsItFor: string;
  faqs: { q: string; a: string }[];
  relatedServices: { title: string; href: string }[];
  ctaSubject: string;
}

const allServices = [
  { title: "Website Design and Development", href: "/services/website-design-development" },
  { title: "Brand Marketing and Positioning", href: "/services/brand-marketing-positioning" },
  { title: "Content Creation for Social Media", href: "/services/content-creation-social-media" },
  { title: "Social Media Management", href: "/services/social-media-management" },
  { title: "Influencer Marketing for D2C Brands", href: "/services/influencer-marketing-d2c-brands" },
  { title: "Video Production", href: "/services/video-production" },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "0px" },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export default function ServicePageLayout({ data }: { data: ServicePageData }) {
  const { openCalendly } = useContactModal();

  return (
    <main className="bg-[#0f1419] min-h-screen">

      {/* Hero — full width */}
      <section className="pt-32 pb-16 px-5 sm:px-8 lg:px-16 bg-[#0f1419]">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp(0)}>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm text-[#B8C5D6]/50 hover:text-[#B8C5D6] transition-colors mb-8 group font-body"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              All Services
            </Link>
          </motion.div>

          <motion.div {...fadeUp(0.05)} className="max-w-3xl">
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#E5E4E2] mb-4 font-body">
              {data.label}
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#F8F8FF] tracking-[-0.04em] leading-[1.05] mb-5 font-heading">
              {data.headline}
            </h1>
            <p className="text-lg text-[#B8C5D6]/70 leading-relaxed font-body">
              {data.subheadline}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main content + sticky sidebar */}
      <section className="px-5 sm:px-8 lg:px-16 pb-24 bg-[#0f1419]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 lg:gap-16 items-start">

            {/* LEFT — scrollable content */}
            <div className="space-y-16">

              {/* Intro */}
              <motion.div {...fadeUp(0)}>
                <div className="bg-[#151a21] border border-[#F8F8FF]/[0.07] rounded-2xl p-8">
                  <p className="text-[#B8C5D6]/75 text-base leading-relaxed font-body">
                    {data.intro}
                  </p>
                </div>
              </motion.div>

              {/* What we do */}
              <motion.div {...fadeUp(0)}>
                <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#E5E4E2] mb-3 font-body">What We Do</p>
                <h2 className="text-2xl sm:text-3xl font-semibold text-[#F8F8FF] tracking-[-0.03em] mb-5 font-heading">
                  {data.whatWeDoTitle}
                </h2>
                <p className="text-[#B8C5D6]/70 text-base leading-relaxed font-body mb-8">
                  {data.whatWeDo}
                </p>

                {/* Benefits grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {data.benefits.map((b, i) => (
                    <div key={i} className="flex items-start gap-3 bg-[#151a21] border border-[#F8F8FF]/[0.06] rounded-xl p-4">
                      <CheckCircle2 className="w-4 h-4 text-[#E5E4E2] flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-[#F8F8FF]/80 font-body leading-relaxed">{b}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* How it works */}
              <motion.div {...fadeUp(0)}>
                <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#E5E4E2] mb-3 font-body">Process</p>
                <h2 className="text-2xl sm:text-3xl font-semibold text-[#F8F8FF] tracking-[-0.03em] mb-8 font-heading">
                  {data.howItWorksTitle}
                </h2>
                <div className="space-y-4">
                  {data.howItWorks.map((step, i) => (
                    <div key={i} className="flex gap-5 bg-[#151a21] border border-[#F8F8FF]/[0.06] rounded-xl p-5">
                      <span className="text-2xl font-extrabold text-[#E5E4E2]/15 font-heading flex-shrink-0 w-10">{step.step}</span>
                      <div>
                        <p className="text-base font-semibold text-[#F8F8FF] font-heading mb-1">{step.title}</p>
                        <p className="text-sm text-[#B8C5D6]/55 font-body leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Who is it for */}
              <motion.div {...fadeUp(0)}>
                <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#E5E4E2] mb-3 font-body">Who It Is For</p>
                <h2 className="text-2xl sm:text-3xl font-semibold text-[#F8F8FF] tracking-[-0.03em] mb-5 font-heading">
                  {data.whoIsItForTitle}
                </h2>
                <p className="text-[#B8C5D6]/70 text-base leading-relaxed font-body">
                  {data.whoIsItFor}
                </p>
              </motion.div>

              {/* FAQ */}
              <motion.div {...fadeUp(0)}>
                <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#E5E4E2] mb-3 font-body">FAQ</p>
                <h2 className="text-2xl sm:text-3xl font-semibold text-[#F8F8FF] tracking-[-0.03em] mb-8 font-heading">
                  Frequently Asked Questions
                </h2>
                <Accordion type="single" collapsible className="w-full">
                  {data.faqs.map((faq, i) => (
                    <AccordionItem key={i} value={`item-${i}`}>
                      <AccordionTrigger className="text-base font-body font-medium text-left">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-[15px]">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>

            </div>

            {/* RIGHT — sticky sidebar */}
            <div className="lg:sticky lg:top-28 space-y-5">

              {/* CTA card */}
              <motion.div {...fadeUp(0.1)}>
                <div className="bg-[#151a21] border border-[#F8F8FF]/[0.07] rounded-2xl p-6">
                  <p className="text-sm font-semibold text-[#F8F8FF] font-heading mb-2">Ready to get started?</p>
                  <p className="text-sm text-[#B8C5D6]/55 font-body leading-relaxed mb-5">
                    Book a free 30-minute strategy call. We will review your situation and tell you exactly what we would do.
                  </p>
                  <button
                    onClick={() => openCalendly(data.ctaSubject)}
                    className="w-full py-3.5 bg-[#E5E4E2] text-[#0f1419] font-extrabold text-sm uppercase tracking-widest hover:bg-[#D0CFD0] transition-colors rounded-lg font-heading cursor-pointer mb-3"
                  >
                    Book a Free Call
                  </button>
                  <Link
                    href="/services"
                    className="block w-full py-3 text-center border border-[#F8F8FF]/[0.08] text-[#B8C5D6]/60 text-sm font-body rounded-lg hover:bg-white/[0.04] hover:text-[#E5E4E2] transition-all"
                  >
                    View All Services
                  </Link>
                </div>
              </motion.div>

              {/* Other services */}
              <motion.div {...fadeUp(0.15)}>
                <div className="bg-[#151a21] border border-[#F8F8FF]/[0.07] rounded-2xl p-6">
                  <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#E5E4E2] mb-4 font-body">Other Services</p>
                  <ul className="space-y-1">
                    {allServices
                      .filter(s => s.href !== `/services/${data.slug}`)
                      .map(s => (
                        <li key={s.href}>
                          <Link
                            href={s.href}
                            className="flex items-center justify-between py-2.5 px-3 rounded-lg text-sm text-[#B8C5D6]/60 hover:text-[#E5E4E2] hover:bg-[#F8F8FF]/[0.04] transition-all font-body group"
                          >
                            <span>{s.title}</span>
                            <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </section>

    </main>
  );
}

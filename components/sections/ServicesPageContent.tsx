"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Globe, Target, PenLine, Radio, Users, Film } from "lucide-react";
import { useContactModal } from "@/components/providers/contact-modal";
import FAQ from "@/components/sections/FAQ";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "0px" },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const services = [
  {
    num: "01",
    icon: Globe,
    name: "Website Design and Development",
    tagline: "Your website is losing you customers. We fix that.",
    description: "Fast, mobile-first websites built around one goal: conversion. Design, dev, copy, and SEO in one build.",
    cta: "See how we build",
    href: "/services/website-design-development",
    subject: "Interested in: Website Design and Development",
    accent: false,
  },
  {
    num: "02",
    icon: Target,
    name: "Brand Marketing and Positioning",
    tagline: "Your competitors are louder. We make you clearer.",
    description: "We find what makes you different and build messaging your audience actually remembers across every channel.",
    cta: "Fix my positioning",
    href: "/services/brand-marketing-positioning",
    subject: "Interested in: Brand Marketing and Positioning",
    accent: true,
  },
  {
    num: "03",
    icon: PenLine,
    name: "Content Creation",
    tagline: "Content that has a job. Not just a calendar.",
    description: "Reels, carousels, blog posts, email copy — all built around what your audience actually responds to.",
    cta: "See what we create",
    href: "/services/content-creation-social-media",
    subject: "Interested in: Content Creation",
    accent: false,
  },
  {
    num: "04",
    icon: Radio,
    name: "Social Media Management",
    tagline: "Post consistently without thinking about it.",
    description: "We handle strategy, creation, scheduling, and reporting. You stay focused on the product.",
    cta: "Take it off my plate",
    href: "/services/social-media-management",
    subject: "Interested in: Social Media Management",
    accent: false,
  },
  {
    num: "05",
    icon: Users,
    name: "Influencer Marketing",
    tagline: "Reach audiences that actually trust the person talking.",
    description: "We connect you with vetted micro and mid-tier creators in your niche, not just big follower counts.",
    cta: "Find my creators",
    href: "/services/influencer-marketing-d2c-brands",
    subject: "Interested in: Influencer Marketing",
    accent: false,
  },
  {
    num: "06",
    icon: Film,
    name: "Video Production",
    tagline: "Video engineered to perform, not just to look good.",
    description: "15-second hooks to full brand films. Scripted, shot, and edited in-house for the platforms that matter.",
    cta: "Watch our work",
    href: "/services/video-production",
    subject: "Interested in: Video Production",
    accent: false,
  },
];

function ServiceCard({ s, index }: { s: typeof services[0]; index: number }) {
  const Icon = s.icon;
  return (
    <motion.div
      {...fadeUp(index * 0.06)}
      className="h-full"
    >
      <Link
        href={s.href}
        className={`group relative overflow-hidden rounded-2xl border p-6 cursor-pointer flex flex-col h-full transition-all duration-300 ${
          s.accent
            ? "bg-[#E5E4E2] border-[#E5E4E2] hover:bg-[#D0CFD0]"
            : "bg-[#151a21] border-[#F8F8FF]/[0.07] hover:border-[#F8F8FF]/[0.15] hover:bg-[#1a1f26]"
        }`}
        style={{ display: "flex" }}
      >
        {/* Number + Icon */}
        <div className="flex items-center justify-between mb-5">
          <span className={`text-xs font-medium tracking-[0.15em] font-body ${s.accent ? "text-[#0f1419]/40" : "text-[#B8C5D6]/30"}`}>
            {s.num}
          </span>
          <Icon className={`w-7 h-7 ${s.accent ? "text-[#0f1419]" : "text-[#E5E4E2]"}`} />
        </div>

        {/* Name */}
        <h3 className={`text-xl font-semibold mb-2 font-heading leading-snug ${s.accent ? "text-[#0f1419]" : "text-[#F8F8FF]"}`}>
          {s.name}
        </h3>

        {/* Tagline — always visible, larger, lighter */}
        <p className={`text-[16px] leading-relaxed font-body mb-3 font-normal ${s.accent ? "text-[#0f1419]/60" : "text-[#B8C5D6]/50"}`}>
          {s.tagline}
        </p>

        {/* Description — smaller, brighter, medium weight — clearly different from tagline */}
        <p className={`text-[13px] leading-relaxed font-body mb-5 flex-1 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200 font-medium tracking-wide ${s.accent ? "text-[#0f1419]/80" : "text-[#E5E4E2]/80"}`}>
          {s.description}
        </p>

        {/* CTA */}
        <div className="mt-auto pt-4 border-t border-current/10">
          <span className={`inline-flex items-center gap-1.5 text-sm font-semibold font-body transition-all ${
            s.accent ? "text-[#0f1419]" : "text-[#E5E4E2]"
          }`}>
            {s.cta}
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

export default function ServicesPageContent() {
  const { openCalendly } = useContactModal();

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 px-5 sm:px-8 lg:px-16 max-w-6xl mx-auto">
        <motion.div {...fadeUp(0)}>
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#E5E4E2] mb-4 font-body">What We Do</p>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-semibold tracking-[-0.04em] leading-[0.9] text-[#F8F8FF] mb-5 font-heading">
            Pick your problem.<br />
            <span className="text-[#B8C5D6]/50 font-light font-accent italic">We will handle the rest.</span>
          </h1>
        </motion.div>
      </section>

      {/* Bento grid */}
      <section className="relative px-5 sm:px-8 lg:px-16 pb-20 max-w-6xl mx-auto">
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s, i) => (
            <ServiceCard key={s.num} s={s} index={i} />
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-5 sm:px-8 lg:px-16 py-20 bg-[#151a21]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            {...fadeUp(0)}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#F8F8FF] tracking-[-0.03em] mb-4 font-heading">
              Not sure which service you need?
            </h2>
            <p className="text-[#B8C5D6]/60 text-base leading-relaxed mb-8 font-body">
              Most brands we work with start with a 20-minute call. We figure it out together.
            </p>
            <button
              onClick={() => openCalendly("Book a free strategy call")}
              className="px-10 py-4 bg-[#E5E4E2] text-[#0f1419] font-extrabold text-sm uppercase tracking-widest hover:bg-[#D0CFD0] transition-colors rounded-lg font-heading cursor-pointer"
            >
              Book a Free Strategy Call
            </button>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <FAQ />
    </>
  );
}

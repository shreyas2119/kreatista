"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion, type Transition } from "framer-motion";
import Link from "next/link";
import { useContactModal } from "@/components/providers/contact-modal";
import { HeroShader } from "@/components/ui/hero-shader";
import { ArrowUpRight } from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay } as Transition,
});

const stats = ["100+ Videos", "6 Platforms → 1 Team"];

export default function Hero() {
  const { openCalendly } = useContactModal();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // useScroll without a target tracks window scroll — works correctly with Lenis
  const { scrollY } = useScroll();

  // Hero is min-h-screen, so it exits at ~100vh. We animate over that range.
  const heroHeight = typeof window !== "undefined" ? window.innerHeight : 800;
  const contentY = useTransform(scrollY, [0, heroHeight], [0, shouldReduceMotion ? 0 : -100]);
  const contentOpacity = useTransform(scrollY, [0, heroHeight * 0.55], [1, 0]);
  const shaderScale = useTransform(scrollY, [0, heroHeight], [1, shouldReduceMotion ? 1 : 1.1]);



  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-5 sm:px-8 lg:px-16 pt-24 pb-16 overflow-hidden bg-[#0f1419]"
    >
      {/* Shader scales subtly as you scroll — creates depth */}
      <motion.div className="absolute inset-0" style={{ scale: shaderScale }}>
        <HeroShader />
      </motion.div>

      {/* Invert cursor circle on heading — removed */}

      {/* Content drifts up and fades out as user scrolls away */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 max-w-4xl w-full mx-auto flex flex-col items-center"
      >
        {/* Main title */}
        <h1
          ref={headingRef}
          className="text-[clamp(2.8rem,7vw,6.5rem)] font-heading font-semibold tracking-[-0.04em] leading-[0.92] text-[#F8F8FF] mb-6 overflow-visible"
        >
          <motion.span {...fadeUp(0.1)} className="block overflow-visible">Welcome to the <span className="text-[#E5E4E2]">home</span> of</motion.span>
          <motion.span {...fadeUp(0.18)} className="block">Next Gen Growth.</motion.span>
        </h1>

        {/* Subheading */}
        <motion.p
          {...fadeUp(0.28)}
          className="text-base sm:text-xl font-body font-light text-[#B8C5D6]/80 leading-relaxed max-w-xl mb-10"
        >
          Powering digital expansion with strategy, scale, and precision.
        </motion.p>

        {/* CTAs */}
        <motion.div {...fadeUp(0.38)} className="flex flex-col sm:flex-row gap-4 mb-12">
          <button
            onClick={() => openCalendly()}
            className="px-8 py-4 bg-[#E5E4E2] text-[#0f1419] text-base font-heading font-extrabold hover:bg-[#D0CFD0] hover:text-[#0f1419] active:scale-95 transition-all duration-200 shadow-lg shadow-[#E5E4E2]/20 rounded-lg"
          >
            Let&apos;s Talk
          </button>
          <Link
            href="/portfolio"
            className="px-8 py-4 border border-[#F8F8FF]/20 text-[#F8F8FF] text-base font-heading font-medium hover:bg-white/[0.04] hover:border-[#F8F8FF]/40 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 rounded-lg"
          >
            See Our Work
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          {...fadeUp(0.48)}
          className="flex flex-wrap justify-center items-center gap-8 pt-10 border-t border-[#E5E4E2]/20 w-full max-w-3xl"
        >
          {stats.flatMap((stat, index) => [
            <span key={stat} className="text-base font-heading font-medium text-[#F8F8FF] tracking-wide whitespace-nowrap">
              {stat}
            </span>,
            index < stats.length - 1 && <span key={`sep-${index}`} className="text-[#E5E4E2]/30">|</span>
          ]).filter(Boolean)}
        </motion.div>
      </motion.div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#0f1419] to-transparent" />
    </section>
  );
}

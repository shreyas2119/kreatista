"use client";

import { useEffect, useRef } from "react";
import { motion, type Transition } from "framer-motion";
import Link from "next/link";
import { useContactModal } from "@/components/providers/contact-modal";
import { HeroShader } from "@/components/ui/hero-shader";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay } as Transition,
});

const stats = ["100+ Videos", "3 Platforms → 1 Team"];

export default function Hero() {
  const { openCalendly } = useContactModal();
  const circleRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const circle = circleRef.current;
    const heading = headingRef.current;
    if (!circle || !heading) return;
    const section = heading.closest("section");
    if (!section) return;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        circle.style.transform = `translate(${e.clientX - rect.left}px, ${e.clientY - rect.top}px) translate(-50%, -50%)`;
        circle.style.opacity = "1";
      });
    };
    const onLeave = () => { circle.style.opacity = "0"; };

    heading.addEventListener("mousemove", onMove);
    heading.addEventListener("mouseleave", onLeave);
    return () => {
      heading.removeEventListener("mousemove", onMove);
      heading.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center text-center px-5 sm:px-8 lg:px-16 pt-24 pb-16 overflow-hidden bg-[#0f1419]">
      <HeroShader />

      {/* Invert cursor circle on heading */}
      <div
        ref={circleRef}
        className="absolute top-0 left-0 w-48 h-48 rounded-full pointer-events-none z-20"
        style={{ background: "white", mixBlendMode: "difference", opacity: 0, transition: "opacity 0.2s ease", willChange: "transform" }}
      />

      <div className="relative z-10 max-w-4xl w-full mx-auto flex flex-col items-center">


        {/* Main title */}
        <h1
          ref={headingRef}
          className="text-[clamp(2.8rem,7vw,6.5rem)] font-heading font-semibold tracking-[-0.04em] leading-[0.92] text-[#F8F8FF] mb-6 cursor-none overflow-visible"
        >
          <motion.span {...fadeUp(0.1)} className="block overflow-visible">Welcome to the <span className="text-[#E5E4E2]">home</span> of</motion.span>
          <motion.span {...fadeUp(0.18)} className="block">next gen growth.</motion.span>
        </h1>

        {/* Subheading */}
        <motion.p
          {...fadeUp(0.28)}
          className="text-base sm:text-xl font-body font-light text-[#B8C5D6]/60 leading-relaxed max-w-xl mb-10"
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
            See Our Work ↗
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
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#0f1419] to-transparent" />
    </section>
  );
}


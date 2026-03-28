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

const stats = ["50+ Brands", "200+ Videos", "3 Platforms → 1 Team"];

export default function Hero() {
  const { open: openModal } = useContactModal();
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
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center text-center px-5 sm:px-8 lg:px-16 pt-24 pb-16 overflow-hidden bg-[#13131a]">
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
          className="text-[clamp(2.8rem,7vw,6.5rem)] font-black tracking-[-0.04em] leading-[0.92] text-[#e4e1ec] mb-6 cursor-none"
          style={{ fontFamily: "var(--font-epilogue)" }}
        >
          <motion.span {...fadeUp(0.1)} className="block">Welcome to the <em style={{ fontStyle: "italic", fontWeight: 600, color: "#c8622a" }}>home</em> of</motion.span>
          <motion.span {...fadeUp(0.18)} className="block">next gen growth.</motion.span>
        </h1>

        {/* Subheading */}
        <motion.p
          {...fadeUp(0.28)}
          className="text-base sm:text-xl text-[#ddc1b5]/60 leading-relaxed max-w-xl mb-10"
        >
          We bring your ideas, talent and execution together.
        </motion.p>

        {/* CTAs */}
        <motion.div {...fadeUp(0.38)} className="flex flex-col sm:flex-row gap-4 mb-12">
          <button
            onClick={() => openModal()}
            className="px-8 py-4 bg-[#c8622a] text-[#e4e1ec] text-base font-bold hover:bg-[#b5561f] active:scale-95 transition-all duration-200 shadow-lg shadow-[#c8622a]/20 rounded-lg"
            style={{ fontFamily: "var(--font-epilogue)" }}
          >
            Book a Call
          </button>
          <Link
            href="/portfolio"
            className="px-8 py-4 border border-[#e4e1ec]/20 text-[#e4e1ec] text-base font-bold hover:bg-white/[0.04] hover:border-[#e4e1ec]/40 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 rounded-lg"
            style={{ fontFamily: "var(--font-epilogue)" }}
          >
            See Our Work ↗
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          {...fadeUp(0.48)}
          className="flex flex-wrap justify-center gap-x-8 gap-y-3 pt-8 border-t border-[#e4e1ec]/[0.07] w-full max-w-sm"
        >
          {stats.map((stat) => (
            <span key={stat} className="text-xs text-[#ddc1b5]/50 tracking-wide">{stat}</span>
          ))}
        </motion.div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#13131a] to-transparent" />
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { motion, type Transition } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useContactModal } from "@/components/providers/contact-modal";
import { HeroShader } from "@/components/ui/hero-shader";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay } as Transition,
});

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
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        circle.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
        circle.style.opacity = "1";
      });
    };

    const onLeave = () => {
      circle.style.opacity = "0";
    };

    heading.addEventListener("mousemove", onMove);
    heading.addEventListener("mouseleave", onLeave);
    return () => {
      heading.removeEventListener("mousemove", onMove);
      heading.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);


  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 pb-16 px-5 sm:px-8 lg:px-16 overflow-hidden bg-[#13131a]">
      <HeroShader />

      {/* Invert cursor circle — mix-blend-mode difference inverts text colour on overlap */}
      <div
        ref={circleRef}
        className="absolute top-0 left-0 w-48 h-48 rounded-full pointer-events-none z-20"
        style={{
          background: "white",
          mixBlendMode: "difference",
          opacity: 0,
          transition: "opacity 0.2s ease",
          willChange: "transform",
        }}
      />
      {/* Terracotta glow top right */}
      <div className="pointer-events-none absolute top-[10%] right-[5%] w-[500px] h-[500px] rounded-full bg-[#c8622a]/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-[20%] left-[10%] w-[350px] h-[350px] rounded-full bg-[#c8622a]/05 blur-[100px]" />

      <div className="relative z-10 max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

        {/* Left — text */}
        <div className="lg:col-span-7 z-10">
          {/* Badge */}
          <motion.span
            {...fadeUp(0)}
            className="inline-block px-3 py-1 bg-[#2a2931] text-[#c8622a] text-[10px] font-semibold tracking-[0.15em] uppercase mb-6 sm:mb-8"
          >
            Creative Excellence
          </motion.span>

          {/* Headline */}
          <h1 ref={headingRef} className="text-[clamp(2.6rem,7vw,6rem)] font-extrabold tracking-[-0.04em] leading-[0.92] text-[#e4e1ec] mb-6 sm:mb-8 cursor-none">
            <motion.span {...fadeUp(0.1)} className="block">
              The Content
            </motion.span>
            <motion.span {...fadeUp(0.18)} className="block">
              Powerhouse for
            </motion.span>
            <motion.span
              {...fadeUp(0.26)}
              className="block"
              style={{
                background: "linear-gradient(135deg, #c8622a 0%, #e8956a 50%, #c8622a 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              D2C, SaaS &amp; Creators.
            </motion.span>
          </h1>

          {/* Subtext */}
          <motion.p
            {...fadeUp(0.35)}
            className="text-base sm:text-lg text-[#ddc1b5]/70 leading-relaxed max-w-xl mb-8 sm:mb-10"
          >
            Scale your brand with all-under-one-roof websites, product marketing,
            content creation, social media, and more.
          </motion.p>

          {/* CTAs */}
          <motion.div {...fadeUp(0.45)} className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => openModal()}
              className="px-8 py-4 bg-[#c8622a] text-[#e4e1ec] text-base font-bold hover:bg-[#b5561f] active:scale-95 transition-all duration-200 shadow-lg shadow-[#c8622a]/20"
            >
              Book a Call
            </button>
            <Link
              href="/portfolio"
              className="px-8 py-4 border border-[#e4e1ec]/20 text-[#e4e1ec] text-base font-bold hover:bg-white/[0.04] hover:border-[#e4e1ec]/40 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
            >
              See Our Work ↗
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            {...fadeUp(0.55)}
            className="flex flex-wrap gap-x-8 gap-y-3 mt-10 sm:mt-12 pt-8 border-t border-[#e4e1ec]/[0.07]"
          >
            {["50+ Brands", "200+ Videos", "3 Platforms → 1 Team"].map((stat) => (
              <span key={stat} className="text-xs text-[#ddc1b5]/50 tracking-wide">
                {stat}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Right — image */}
        <motion.div
          initial={{ opacity: 0, x: 40, rotate: 3 }}
          animate={{ opacity: 1, x: 0, rotate: 3 }}
          whileHover={{ rotate: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="lg:col-span-5 relative hidden lg:block"
        >
          <div className="aspect-[4/5] bg-[#2a2931] overflow-hidden shadow-2xl">
            <Image
              src="/images/web.webp"
              alt="Socioryx creative workspace"
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-1000 opacity-70"
              priority
            />
          </div>
          {/* Decorative blur blob behind image */}
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-[#c8622a] rounded-full -rotate-6 opacity-10 blur-2xl -z-10" />
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#13131a] to-transparent" />
    </section>
  );
}

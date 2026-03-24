"use client";

import { motion, type Transition } from "framer-motion";
import { Button } from "@/components/ui/button";
import { OrbBackground } from "@/components/ui/orb-background";
import { GridBackground } from "@/components/ui/grid-background";
import { WordReveal } from "@/components/ui/word-reveal";
import { FloatingShapes } from "@/components/ui/floating-shapes";
import { useContactModal } from "@/components/providers/contact-modal";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut", delay } as Transition,
});

export default function Hero() {
  const { open: openModal } = useContactModal();

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-20 sm:pt-16 overflow-hidden">
        <OrbBackground />
        <GridBackground />
        <FloatingShapes />

        <div className="relative z-10 flex flex-col items-center">
          <motion.p
            {...fadeUp(0)}
            className="text-xs sm:text-sm text-violet-400 font-medium tracking-widest uppercase mb-4 sm:mb-6"
          >
            Full-Stack Content Marketing
          </motion.p>

          <h1 className="text-3xl sm:text-6xl lg:text-7xl font-bold text-foreground leading-tight max-w-4xl px-2">
            <WordReveal text="Your Brand." delay={0.1} trigger="animate" />
            <br />
            <WordReveal text="Every Platform." delay={0.3} trigger="animate" />
            <br />
            <WordReveal text="One Team." delay={0.5} trigger="animate" />
          </h1>

          <motion.p
            {...fadeUp(0.75)}
            className="mt-4 sm:mt-6 text-sm sm:text-lg text-zinc-400 max-w-xs sm:max-w-xl px-2"
          >
            Full-stack content marketing for D2C brands, SaaS startups &amp; creators.
          </motion.p>

          <motion.div
            {...fadeUp(0.9)}
            className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 items-center w-full sm:w-auto px-4 sm:px-0"
          >
            <Button size="lg" className="w-full sm:w-auto" onClick={openModal}>
              Book a Free Call
            </Button>
            <Button variant="ghost" size="lg" className="w-full sm:w-auto">
              See Our Work ↓
            </Button>
          </motion.div>

          <motion.div
            {...fadeUp(1.05)}
            className="mt-8 sm:mt-12 flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-zinc-500"
          >
            {["50+ Brands", "200+ Videos", "3 Platforms → 1 Team"].map((stat) => (
              <span key={stat} className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-violet-500 inline-block" />
                {stat}
              </span>
            ))}
          </motion.div>
        </div>

        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#09090b] to-transparent" />
      </section>
  );
}

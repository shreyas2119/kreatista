"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, type Transition } from "framer-motion";
import { Button } from "@/components/ui/button";
import { OrbBackground } from "@/components/ui/orb-background";
import { GridBackground } from "@/components/ui/grid-background";
import { WordReveal } from "@/components/ui/word-reveal";
import { FloatingShapes } from "@/components/ui/floating-shapes";
import { Typewriter } from "@/components/ui/typewriter";
import { ContactFormModal } from "@/components/ui/contact-form-modal";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut", delay } as Transition,
});

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);

  return (
    <>
      <section ref={ref} className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-16 overflow-hidden">
      <OrbBackground />
      <GridBackground />
      <FloatingShapes />

      <motion.div style={{ scale, opacity }} className="relative z-10 flex flex-col items-center">
        <motion.p
          {...fadeUp(0)}
          className="text-sm text-violet-400 font-medium tracking-widest uppercase mb-6"
        >
          Full-Stack Content Marketing
        </motion.p>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-foreground leading-tight max-w-4xl">
          <WordReveal text="From Design to Market —" delay={0.1} trigger="animate" />
          <br />
          <WordReveal text="We Handle" delay={0.3} trigger="animate" />
          <br />
          <motion.span
            {...fadeUp(0.6)}
            className="flex justify-center"
          >
            <Typewriter
              words={[
                "Everything",
                "Marketing",
                "Websites",
                "Content",
                "Strategy",
                "Growth",
              ]}
              className="text-violet-500"
              typingSpeed={120}
              deletingSpeed={60}
              delayBetweenWords={2000}
            />
          </motion.span>
        </h1>

        <motion.p
          {...fadeUp(0.75)}
          className="mt-6 text-base sm:text-lg text-zinc-400 max-w-xl"
        >
          Full-stack content marketing for D2C brands, SaaS startups &amp; creators.
        </motion.p>

        <motion.div
          {...fadeUp(0.9)}
          className="mt-8 flex flex-col sm:flex-row gap-3 items-center"
        >
          <Button size="lg" onClick={() => setIsModalOpen(true)}>Book a Free Call</Button>
          <Button variant="ghost" size="lg">
            See Our Work ↓
          </Button>
        </motion.div>

        <motion.div
          {...fadeUp(1.05)}
          className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-zinc-500"
        >
          {["50+ Brands", "200+ Videos", "3 Platforms → 1 Team"].map((stat) => (
            <span key={stat} className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-violet-500 inline-block" />
              {stat}
            </span>
          ))}
        </motion.div>
      </motion.div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#09090b] to-transparent" />
    </section>

    <ContactFormModal open={isModalOpen} onOpenChange={setIsModalOpen} />
  </>
  );
}

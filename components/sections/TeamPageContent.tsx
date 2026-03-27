"use client";

import { motion } from "framer-motion";
import { team } from "@/lib/team";
import TeamShowcase from "@/components/ui/team-showcase";

export default function TeamPageContent() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 px-5 sm:px-8 lg:px-16 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
        >
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#c8622a] mb-4">Our Team</p>
          <h1
            className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-[-0.04em] leading-none text-[#e4e1ec] mb-5"
            style={{ fontFamily: "var(--font-epilogue)" }}
          >
            The Minds Behind<br className="hidden sm:block" /> Socioryx
          </h1>
          <p className="text-sm sm:text-base text-[#ddc1b5]/60 max-w-lg leading-relaxed">
            A collective of strategists, creators, and builders obsessed with making brands impossible to ignore.
          </p>
        </motion.div>
      </section>

      <div className="w-full h-px bg-[#e4e1ec]/[0.06]" />

      {/* Team showcase */}
      <section className="py-16 sm:py-24">
        <TeamShowcase members={team} />
      </section>
    </>
  );
}

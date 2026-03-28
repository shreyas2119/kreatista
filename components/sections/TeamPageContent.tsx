"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
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
          {/* Back Button */}
          <Link 
            href="/#team" 
            className="inline-flex items-center gap-2 text-sm text-[#B8C5D6] hover:text-[#E5E4E2] transition-colors mb-6 group font-body"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#E5E4E2] mb-4 font-body">Our Team</p>
          <h1
            className="text-5xl sm:text-7xl lg:text-8xl font-semibold tracking-[-0.04em] leading-none text-[#F8F8FF] mb-5 font-heading"
          >
            The Minds Behind<br className="hidden sm:block" /> Socioryx
          </h1>
          <p className="text-sm sm:text-base text-[#B8C5D6]/60 max-w-lg leading-relaxed font-body">
            A collective of strategists, creators, and builders obsessed with making brands impossible to ignore.
          </p>
        </motion.div>
      </section>

      <div className="w-full h-px bg-[#F8F8FF]/[0.06]" />

      {/* Team showcase */}
      <section className="py-16 sm:py-24">
        <TeamShowcase members={team} />
      </section>
    </>
  );
}

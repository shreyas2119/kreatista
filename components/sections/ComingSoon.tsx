"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface ComingSoonProps {
  label?: string;
  heading?: string;
  subheading?: string;
}

export default function ComingSoon({
  label = "Coming Soon",
  heading = "Something Great is Coming",
  subheading = "We're working on it. Check back soon.",
}: ComingSoonProps) {
  return (
    <section className="min-h-screen flex items-center justify-center px-5 sm:px-8 relative overflow-hidden">
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 35% at 50% 50%, rgba(229,228,226,0.04) 0, transparent 70%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-lg text-center"
      >
        <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#E5E4E2] mb-6 font-body">
          {label}
        </p>

        <h1 className="text-4xl sm:text-6xl font-semibold tracking-[-0.04em] leading-none text-[#F8F8FF] mb-6 font-heading">
          {heading}
        </h1>

        <p className="text-[#B8C5D6]/70 text-base leading-relaxed mb-12 font-body max-w-sm mx-auto">
          {subheading}
        </p>

        {/* Decorative progress bar */}
        <div className="w-48 h-px bg-[#E5E4E2]/10 mx-auto mb-12 overflow-hidden">
          <motion.div
            className="h-full bg-[#E5E4E2]/40"
            initial={{ width: "0%" }}
            animate={{ width: "65%" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
          />
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[#B8C5D6] hover:text-[#E5E4E2] transition-colors font-body group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>
      </motion.div>
    </section>
  );
}

"use client";

import { useInView } from "framer-motion";
import { useRef } from "react";
import { motion } from "framer-motion";
import { useCountUp } from "@/hooks/useCountUp";

const stats = [
  { value: 50, suffix: "+", label: "Brands Worked With" },
  { value: 200, suffix: "+", label: "Videos Produced" },
  { value: 6, suffix: "", label: "Platforms Managed" },
];

function StatCard({ value, suffix, label, index }: { value: number; suffix: string; label: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const count = useCountUp(value, 1800, inView);

  return (
    <motion.div
      ref={ref}
      initial={{ clipPath: "inset(100% 0% 0% 0%)", opacity: 0 }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
      className="flex-1"
    >
      <motion.div
        whileHover={{ scale: 1.03, y: -3 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="relative rounded-2xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-md p-8 text-center overflow-hidden group"
      >
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: "radial-gradient(200px circle at 50% 0%, rgba(139,92,246,0.12), transparent 70%)" }}
        />
        <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <span className="relative text-5xl sm:text-6xl font-bold text-white block mb-2 tabular-nums">
          {count}{suffix}
        </span>
        <span className="relative text-sm text-zinc-500 group-hover:text-zinc-400 transition-colors duration-300">
          {label}
        </span>
      </motion.div>
    </motion.div>
  );
}

export default function SocialProof() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row gap-4" style={{ perspective: "800px" }}>
        {stats.map((s, i) => (
          <StatCard key={s.label} {...s} index={i} />
        ))}
      </div>
    </section>
  );
}

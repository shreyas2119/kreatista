"use client";

import { useInView } from "framer-motion";
import { useRef } from "react";
import { motion } from "framer-motion";
import { useCountUp } from "@/hooks/useCountUp";

const stats = [
  { value: 100, suffix: "+", label: "Videos Produced" },
  { value: 6,   suffix: "",  label: "Platforms Managed" },
];

function StatCard({ value, suffix, label, index }: { value: number; suffix: string; label: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const count = useCountUp(value, 1800, inView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="flex-1 bg-[#151a21] p-8 sm:p-10 text-center"
    >
      <span className="text-4xl sm:text-5xl font-semibold text-[#F8F8FF] block mb-1 tabular-nums font-heading" style={{ letterSpacing: "-0.03em" }}>
        {count}{suffix}
      </span>
      <span className="text-xs text-[#B8C5D6]/50 tracking-wide">{label}</span>
    </motion.div>
  );
}

export default function SocialProof() {
  return (
    <section className="py-16 sm:py-20 px-5 sm:px-8 lg:px-16 bg-[#0f1419]">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row gap-3 sm:gap-4">
        {stats.map((s, i) => (
          <StatCard key={s.label} {...s} index={i} />
        ))}
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";

interface WordRevealProps {
  text: string;
  className?: string;
  delay?: number;
  /** Use "animate" for above-fold (hero), "whileInView" for scroll-triggered sections */
  trigger?: "animate" | "whileInView";
}

export function WordReveal({ text, className = "", delay = 0, trigger = "whileInView" }: WordRevealProps) {
  const words = text.split(" ");
  return (
    <span className={`inline-flex flex-wrap gap-x-[0.3em] ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="overflow-hidden inline-block">
          {trigger === "animate" ? (
            <motion.span
              className="inline-block"
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ duration: 0.55, ease: "easeOut", delay: delay + i * 0.07 }}
            >
              {word}
            </motion.span>
          ) : (
            <motion.span
              className="inline-block"
              initial={{ y: "110%", opacity: 0 }}
              whileInView={{ y: "0%", opacity: 1 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.55, ease: "easeOut", delay: delay + i * 0.07 }}
            >
              {word}
            </motion.span>
          )}
        </span>
      ))}
    </span>
  );
}

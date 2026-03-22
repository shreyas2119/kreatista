"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: string[];
  className?: string;
  speed?: number;
  reverse?: boolean;
}

export function Marquee({ items, className, speed = 30, reverse = false }: MarqueeProps) {
  const doubled = [...items, ...items];
  return (
    <div className={cn("overflow-hidden w-full", className)}>
      <motion.div
        className="flex gap-4 w-max"
        animate={{ x: reverse ? ["0%", "50%"] : ["0%", "-50%"] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="px-5 py-2 rounded-full border border-zinc-700/60 bg-zinc-900/60 backdrop-blur-sm text-sm text-zinc-300 whitespace-nowrap hover:border-violet-500/60 hover:text-violet-300 transition-colors duration-200"
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

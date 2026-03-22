"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface OrbProps {
  className?: string;
  delay?: number;
  duration?: number;
  parallaxSpeed?: number;
}

function Orb({ className = "", delay = 0, duration = 8, parallaxSpeed = 50 }: OrbProps) {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl opacity-20 ${className}`}
      animate={{
        y: [0, -30, 0],
        scale: [1, 1.08, 1],
        opacity: [0.15, 0.25, 0.15],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

export function OrbBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div style={{ y: y1 }}>
        <Orb className="w-[600px] h-[600px] bg-violet-600 -top-40 -left-32" delay={0} duration={9} />
      </motion.div>
      <motion.div style={{ y: y2 }}>
        <Orb className="w-[400px] h-[400px] bg-violet-400 top-1/3 right-0" delay={2} duration={11} />
      </motion.div>
      <motion.div style={{ y: y3 }}>
        <Orb className="w-[300px] h-[300px] bg-indigo-600 bottom-0 left-1/3" delay={4} duration={8} />
      </motion.div>
    </div>
  );
}

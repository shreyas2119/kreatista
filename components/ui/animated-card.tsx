"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  shimmerDelay?: number;
}

export function AnimatedCard({ children, className, shimmerDelay = 0 }: AnimatedCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50 });

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 160, damping: 24 });
  const y = useSpring(rawY, { stiffness: 160, damping: 24 });
  const rotateX = useTransform(y, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(x, [-0.5, 0.5], ["-5deg", "5deg"]);

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
    setSpotlight({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }

  function onMouseLeave() {
    rawX.set(0);
    rawY.set(0);
    setHovered(false);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onMouseLeave}
      whileHover={{ scale: 1.015 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={cn("relative rounded-2xl overflow-hidden", className)}
    >
      {/* glassmorphism base */}
      <div className="absolute inset-0 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/[0.08]" />

      {/* hover border glow */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl"
        animate={hovered ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          background: `radial-gradient(400px circle at ${spotlight.x}% ${spotlight.y}%, rgba(139,92,246,0.15), transparent 60%)`,
        }}
      />

      {/* conic border on hover */}
      <motion.div
        className="pointer-events-none absolute -inset-[1px] rounded-2xl"
        animate={hovered ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          background: `conic-gradient(from 180deg at ${spotlight.x}% ${spotlight.y}%, rgba(139,92,246,0.8) 0deg, rgba(99,102,241,0.4) 60deg, transparent 120deg, transparent 360deg)`,
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: "1px",
        }}
      />

      {/* idle shimmer */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0"
        animate={{ backgroundPosition: ["200% 0%", "-200% 0%"] }}
        transition={{ duration: 6, delay: shimmerDelay, repeat: Infinity, ease: "linear" }}
        style={{
          background: "linear-gradient(105deg, transparent 40%, rgba(139,92,246,0.04) 50%, transparent 60%)",
          backgroundSize: "200% 100%",
        }}
      />

      {/* bottom glow bar */}
      <motion.div
        className="pointer-events-none absolute bottom-0 left-6 right-6 h-px"
        animate={hovered ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0.2 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={{ background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.8), transparent)" }}
      />

      {/* content */}
      <div className="relative z-10" style={{ transform: "translateZ(16px)" }}>
        {children}
      </div>
    </motion.div>
  );
}

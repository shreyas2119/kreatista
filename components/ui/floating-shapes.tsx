"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

function FloatingShape({
  className,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-violet-500/[0.15]",
  animationClass = "animate-float-shape-1",
  delay = 0,
}: {
  className?: string;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
  animationClass?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={cn("absolute", className)}
      style={{ width, height, rotate }}
      initial={{ opacity: 0, y: -150, rotate: rotate - 20 }}
      animate={{ opacity: 1, y: 0, rotate }}
      transition={{ duration: 1.2, delay, ease: [0.23, 0.86, 0.39, 0.96] }}
    >
      <div className={cn("w-full h-full will-change-transform", animationClass)}>
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r to-transparent",
            gradient,
            "backdrop-blur-[2px] border-2 border-white/[0.15]",
            "shadow-[0_8px_32px_0_rgba(244,82,30,0.15)]",
            "after:absolute after:inset-0 after:rounded-full",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(244,82,30,0.2),transparent_70%)]"
          )}
        />
      </div>
    </motion.div>
  );
}

export function FloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <FloatingShape width={600} height={140} rotate={40}  delay={0.3} gradient="from-orange-500/[0.12]"  animationClass="animate-float-shape-1" className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]" />
      <FloatingShape width={500} height={120} rotate={-40} delay={0.5} gradient="from-red-500/[0.10]"     animationClass="animate-float-shape-2" className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]" />
      <FloatingShape width={300} height={80}  rotate={40}  delay={0.4} gradient="from-orange-400/[0.12]"  animationClass="animate-float-shape-3" className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]" />
      <FloatingShape width={200} height={60}  rotate={-40} delay={0.6} gradient="from-red-600/[0.10]"     animationClass="animate-float-shape-1" className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]" />
      <FloatingShape width={150} height={40}  rotate={40}  delay={0.2} gradient="from-orange-600/[0.12]"  animationClass="animate-float-shape-2" className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]" />
    </div>
  );
}

"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

interface ScoreRingProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  label?: string;
}

export function ScoreRing({
  score,
  size = 180,
  strokeWidth = 8,
  className,
  label,
}: ScoreRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { stiffness: 60, damping: 15 });

  const strokeDashoffset = useTransform(springValue, (v) => circumference * (1 - v / 100));

  useEffect(() => {
    motionValue.set(score);
  }, [score, motionValue]);

  const displayScore = useTransform(springValue, (v) => Math.round(v));

  const getColor = (s: number) => {
    if (s >= 80) return "#22c55e";
    if (s >= 60) return "#eab308";
    if (s >= 40) return "#f97316";
    return "#ef4444";
  };

  const color = getColor(score);
  const trackColor = "#1a1f26";

  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={trackColor}
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          style={{ strokeDashoffset }}
        />
      </svg>
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        <motion.span className="text-5xl font-heading font-semibold text-[#F8F8FF]">
          {displayScore}
        </motion.span>
      </div>
      {label && (
        <span className="text-sm font-body text-[#B8C5D6]/60 mt-1">{label}</span>
      )}
    </div>
  );
}

interface CategoryScoreProps {
  label: string;
  score: number;
}

export function CategoryScore({ label, score }: CategoryScoreProps) {
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { stiffness: 60, damping: 15 });

  useEffect(() => {
    motionValue.set(score);
  }, [score, motionValue]);

  const width = useTransform(springValue, (v) => `${v}%`);

  const getColor = (s: number) => {
    if (s >= 80) return "bg-green-500";
    if (s >= 60) return "bg-yellow-500";
    if (s >= 40) return "bg-orange-500";
    return "bg-red-500";
  };

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="text-sm font-body text-[#B8C5D6]">{label}</span>
        <motion.span className="text-sm font-heading font-semibold text-[#F8F8FF]">
          {springValue}
        </motion.span>
      </div>
      <div className="h-2 bg-[#1a1f26] rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${getColor(score)}`}
          style={{ width }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

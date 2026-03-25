"use client";

import { cn } from "@/lib/utils";

interface OrbProps {
  className?: string;
  style?: React.CSSProperties;
}

function Orb({ className = "", style }: OrbProps) {
  return (
    <div
      className={cn(
        "absolute rounded-full blur-3xl will-change-transform",
        className
      )}
      style={style}
    />
  );
}

export function OrbBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <Orb className="w-[500px] h-[500px] bg-[#c8622a]/[0.05] -top-40 -left-32 animate-orb-1" />
      <Orb className="w-[350px] h-[350px] bg-[#c8622a]/[0.03] top-1/3 right-0 animate-orb-2" />
      <Orb className="w-[250px] h-[250px] bg-[#c8622a]/[0.04] bottom-0 left-1/3 animate-orb-3" />
    </div>
  );
}

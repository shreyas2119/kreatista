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
      {/* Large violet orb — top left */}
      <Orb
        className="w-[600px] h-[600px] bg-violet-600/20 -top-40 -left-32 animate-orb-1"
      />
      {/* Medium violet orb — right */}
      <Orb
        className="w-[400px] h-[400px] bg-violet-400/15 top-1/3 right-0 animate-orb-2"
      />
      {/* Small indigo orb — bottom center */}
      <Orb
        className="w-[300px] h-[300px] bg-indigo-600/20 bottom-0 left-1/3 animate-orb-3"
      />
    </div>
  );
}

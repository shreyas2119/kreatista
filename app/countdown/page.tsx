"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Launch: 23:12 IST = 17:42 UTC on April 4, 2026
const LAUNCH_TIME = new Date("2026-04-04T17:42:00Z").getTime();

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function CountdownPage() {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState({ h: 0, m: 0, s: 0, done: false });

  useEffect(() => {
    const tick = () => {
      const diff = LAUNCH_TIME - Date.now();
      if (diff <= 0) {
        setTimeLeft({ h: 0, m: 0, s: 0, done: true });
        router.replace("/");
        return;
      }
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeLeft({ h, m, s, done: false });
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [router]);

  return (
    <main className="min-h-screen bg-[#0f1419] flex flex-col items-center justify-center px-5 text-center">
      {/* Subtle glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 35% at 50% 50%, rgba(229,228,226,0.04) 0, transparent 70%)",
        }}
      />

      <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#E5E4E2] mb-8 font-body relative z-10">
        Socioryx
      </p>

      <h1 className="text-5xl sm:text-7xl lg:text-8xl font-semibold tracking-[-0.04em] leading-none text-[#F8F8FF] mb-4 font-heading relative z-10">
        Going Live
      </h1>

      <p className="text-[#B8C5D6]/60 text-base mb-16 font-body relative z-10">
        Something big is launching tonight.
      </p>

      {/* Countdown */}
      <div className="flex items-center gap-4 sm:gap-8 relative z-10">
        {[
          { value: timeLeft.h, label: "HRS" },
          { value: timeLeft.m, label: "MIN" },
          { value: timeLeft.s, label: "SEC" },
        ].map(({ value, label }, i) => (
          <div key={label} className="flex items-center gap-4 sm:gap-8">
            <div className="flex flex-col items-center">
              <span className="text-6xl sm:text-8xl font-semibold font-heading text-[#F8F8FF] tabular-nums leading-none">
                {pad(value)}
              </span>
              <span className="text-xs tracking-[0.2em] uppercase text-[#B8C5D6]/40 font-body mt-3">
                {label}
              </span>
            </div>
            {i < 2 && (
              <span className="text-5xl sm:text-7xl font-semibold text-[#E5E4E2]/20 font-heading leading-none mb-4">
                :
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Progress bar — derived from client state, no hydration mismatch */}
        <div className="mt-16 w-48 h-px bg-[#E5E4E2]/10 overflow-hidden relative z-10">
          <div
            className="h-full bg-[#E5E4E2]/50 transition-none"
            style={{
              width: timeLeft.done ? "100%" : `${Math.max(0, Math.min(100, 100 - ((timeLeft.h * 3600 + timeLeft.m * 60 + timeLeft.s) / (12 * 3600)) * 100))}%`,
            }}
          />
        </div>

      <p className="mt-8 text-xs text-[#B8C5D6]/30 font-body relative z-10">
        April 4, 2026 · 11:16 PM IST
      </p>
    </main>
  );
}

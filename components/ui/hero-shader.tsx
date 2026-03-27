"use client";

export function HeroShader() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Base noise texture via SVG filter */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
        <filter id="hero-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#hero-noise)" />
      </svg>

      {/* Terracotta glow — top right */}
      <div
        className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(200,98,42,0.12) 0%, rgba(200,98,42,0.04) 40%, transparent 70%)",
          animation: "hero-glow-1 12s ease-in-out infinite",
        }}
      />

      {/* Secondary faint glow — bottom left */}
      <div
        className="absolute -bottom-40 -left-20 w-[500px] h-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(200,98,42,0.07) 0%, transparent 65%)",
          animation: "hero-glow-2 16s ease-in-out infinite",
        }}
      />

      {/* Slow drifting mid glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full"
        style={{
          background: "radial-gradient(ellipse, rgba(200,98,42,0.04) 0%, transparent 60%)",
          animation: "hero-glow-3 20s ease-in-out infinite",
        }}
      />

      <style>{`
        @keyframes hero-glow-1 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 1; }
          33%       { transform: translate(-40px, 30px) scale(1.1); opacity: 0.7; }
          66%       { transform: translate(20px, -20px) scale(0.95); opacity: 0.9; }
        }
        @keyframes hero-glow-2 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 1; }
          50%       { transform: translate(30px, -40px) scale(1.15); opacity: 0.6; }
        }
        @keyframes hero-glow-3 {
          0%, 100% { transform: translate(-50%, -50%) scale(1) rotate(0deg); opacity: 1; }
          25%       { transform: translate(-50%, -50%) scale(1.1) rotate(5deg); opacity: 0.5; }
          75%       { transform: translate(-50%, -50%) scale(0.9) rotate(-5deg); opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}

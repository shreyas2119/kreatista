"use client";

export function HeroShader() {
  const dotGrid = {
    backgroundImage: "radial-gradient(circle, #e4e1ec 1px, transparent 1px)",
    backgroundSize: "32px 32px",
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">

      {/* Base dim dot grid */}
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          ...dotGrid,
          maskImage: "radial-gradient(ellipse 85% 85% at 50% 50%, black 20%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 85% 85% at 50% 50%, black 20%, transparent 100%)",
        }}
      />

      {/* Ambient terracotta glow — top right */}
      <div
        className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(200,98,42,0.08) 0%, transparent 65%)",
          animation: "hero-drift 16s ease-in-out infinite",
        }}
      />

      {/* Pulse rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="absolute rounded-full border border-[#c8622a]/[0.07]"
            style={{
              width: `${300 + i * 180}px`,
              height: `${300 + i * 180}px`,
              animation: `hero-pulse ${5 + i * 1.3}s ease-out infinite`,
              animationDelay: `${i * 1.3}s`,
              opacity: 0,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes hero-drift {
          0%, 100% { transform: translate(0, 0); }
          50%       { transform: translate(-20px, 15px); }
        }
        @keyframes hero-pulse {
          0%   { transform: scale(0.5); opacity: 0; }
          15%  { opacity: 1; }
          100% { transform: scale(2); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

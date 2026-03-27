"use client";

const clients = [
  "LUMIN", "HYPERLINK", "FLOWSTATE", "VELOCITY", "MAVEN", "NEXUS",
  "LUMIN", "HYPERLINK", "FLOWSTATE", "VELOCITY", "MAVEN", "NEXUS",
];

export default function LogoStrip() {
  return (
    <section className="py-10 overflow-hidden bg-[#13131a]">
      <p className="text-center text-[#ddc1b5]/30 text-[10px] font-medium tracking-[0.2em] uppercase mb-8">
        Trusted by industry leaders in D2C, SaaS &amp; Creator Economy
      </p>

      {/* Constrained marquee container */}
      <div className="relative max-w-3xl mx-auto overflow-hidden">
        {/* Heavy fade on both sides — names vanish well before the edge */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-[#13131a] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-[#13131a] to-transparent" />

        <div className="flex animate-marquee whitespace-nowrap">
          {clients.map((name, i) => (
            <span
              key={i}
              className="inline-flex items-center mx-6 text-3xl sm:text-4xl font-black tracking-[-0.03em] select-none"
              style={{ fontFamily: "var(--font-epilogue)" }}
            >
              {i % 2 === 0 ? (
                <span
                  className="cursor-default"
                  style={{
                    background: "linear-gradient(180deg, #ffffff 0%, #a0a0a0 50%, #ffffff 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    filter: "drop-shadow(0 0 8px rgba(255,255,255,0.15))",
                  }}
                >
                  {name}
                </span>
              ) : (
                <span
                  className="cursor-default"
                  style={{
                    background: "linear-gradient(180deg, #f4a07a 0%, #c8622a 50%, #f4a07a 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    filter: "drop-shadow(0 0 10px rgba(200,98,42,0.4))",
                  }}
                >
                  {name}
                </span>
              )}
              <span className="ml-6 text-[#e4e1ec]/10 text-xs">✦</span>
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
          will-change: transform;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}

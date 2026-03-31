"use client";

const clients = [
  "TYPETHINK.AI", "PICXSTUDIO", "CLAWSIFY",
  "TYPETHINK.AI", "PICXSTUDIO", "CLAWSIFY",
];

export default function LogoStrip() {
  return (
    <section className="py-10 overflow-hidden bg-[#0f1419]">
      <p className="text-center text-[#B8C5D6]/30 text-[10px] font-medium tracking-[0.2em] uppercase mb-8">
        Trusted by industry leaders in D2C, SaaS &amp; Creator Economy
      </p>

      {/* Constrained marquee container */}
      <div className="relative max-w-3xl mx-auto overflow-hidden">
        {/* Heavy fade on both sides — names vanish well before the edge */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-[#0f1419] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-[#0f1419] to-transparent" />

        <div className="flex animate-marquee whitespace-nowrap">
          {clients.map((name, i) => (
            <span
              key={i}
              className="inline-flex items-center mx-6 text-3xl sm:text-4xl font-semibold tracking-[-0.03em] select-none font-heading"
            >
              {i % 2 === 0 ? (
                <span
                  className="cursor-default bg-clip-text text-transparent"
                  style={{
                    backgroundImage: "linear-gradient(180deg, #ffffff 0%, #a0a0a0 50%, #ffffff 100%)",
                    filter: "drop-shadow(0 0 8px rgba(255,255,255,0.15))",
                  }}
                >
                  {name}
                </span>
              ) : (
                <span
                  className="cursor-default bg-clip-text text-transparent"
                  style={{
                    backgroundImage: "linear-gradient(180deg, #E5E4E2 0%, #B8C5D6 50%, #E5E4E2 100%)",
                    filter: "drop-shadow(0 0 10px rgba(229,228,226,0.3))",
                  }}
                >
                  {name}
                </span>
              )}
              <span className="ml-6 text-[#F8F8FF]/10 text-xs">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

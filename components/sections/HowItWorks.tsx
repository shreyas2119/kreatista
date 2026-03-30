"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Search, Paintbrush, TrendingUp } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Discover",
    icon: Search,
    desc: "We dive deep into data and insights to understand what works, identify opportunities, and uncover what others often overlook.",
    tags: ["Research", "Strategy", "Insights"],
  },
  {
    number: "02",
    title: "Create",
    icon: Paintbrush,
    desc: "We craft high impact, scroll worthy content designed with purpose to engage, perform, and deliver measurable value.",
    tags: ["Content", "Creatives", "Campaigns"],
  },
  {
    number: "03",
    title: "Grow",
    icon: TrendingUp,
    desc: "We continuously test, optimize, and scale with precision turning insights into consistent, result-driven growth that compounds over time.",
    tags: ["Analytics", "Testing", "Scaling"],
  },
];

// Shared card content
function StepCard({ step, i }: { step: typeof steps[0]; i: number }) {
  const Icon = step.icon;
  return (
    <div className="bg-gradient-to-br from-[#0f1419] to-[#1a1a24] p-8 shadow-2xl shadow-black/60 border-2 border-[#1a1f26] relative overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#E5E4E2]/5 to-transparent opacity-0"
        animate={{ opacity: [0, 0.3, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
      />
      <div className="flex items-center gap-4 mb-6 relative z-10">
        <motion.div className="w-16 h-16 flex items-center justify-center bg-[#1a1f26] relative" whileHover={{ scale: 1.1, rotate: 5 }}>
          <Icon className="w-7 h-7 text-[#E5E4E2]" />
          <div className="absolute inset-0 bg-[#E5E4E2]/20 blur-xl" />
        </motion.div>
        <div>
          <span className="text-xs text-[#E5E4E2] font-medium tracking-[0.15em] uppercase block mb-1 font-body">STEP {step.number}</span>
          <h3 className="text-3xl sm:text-4xl font-semibold text-[#F8F8FF] leading-none font-heading" style={{ letterSpacing: "-0.02em" }}>{step.title}</h3>
        </div>
      </div>
      <p className="text-lg text-[#F8F8FF] leading-relaxed mb-6 relative z-10 font-body">{step.desc}</p>
      <div className="flex flex-wrap gap-2 relative z-10">
        {step.tags.map((tag) => (
          <span key={tag} className="text-xs px-3 py-1.5 text-[#B8C5D6]/70 bg-[#1a1f26] tracking-wide border border-[#E5E4E2]/10 font-body">{tag}</span>
        ))}
      </div>
      <div className="absolute -top-4 -right-4 text-[140px] font-semibold text-[#F8F8FF]/[0.02] leading-none pointer-events-none font-heading">{step.number}</div>
      <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-[#E5E4E2]/20" />
      <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-[#E5E4E2]/20" />
    </div>
  );
}

// Mobile: simple stacked cards
function MobileHowItWorks() {
  return (
    <section className="bg-[#151a21] py-20 px-5 sm:px-8">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#E5E4E2] mb-3 font-body">The Process</p>
          <h2 className="text-3xl font-semibold text-white leading-none font-heading" style={{ letterSpacing: "-0.03em" }}>How It Works</h2>
          <p className="mt-3 text-sm text-[#B8C5D6]/60 font-body">Three steps. Zero fluff. Real growth.</p>
        </div>
        <div className="flex flex-col gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <StepCard step={step} i={i} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Desktop: scroll-animated sticky section
function DesktopHowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  return (
    <section ref={containerRef} className="relative bg-[#151a21]" style={{ height: "250vh" }}>
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="max-w-6xl mx-auto px-8 lg:px-16 w-full">
          <div className="text-center mb-12">
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#E5E4E2] mb-3 font-body">The Process</p>
            <h2 className="text-5xl font-semibold text-white leading-none font-heading" style={{ letterSpacing: "-0.03em" }}>How It Works</h2>
            <p className="mt-3 text-sm text-[#B8C5D6]/60 font-body">Three steps. Zero fluff. Real growth.</p>
          </div>

          {/* Progress indicator */}
          <motion.div className="absolute top-8 right-8 flex flex-col gap-2" style={{ opacity: useTransform(scrollYProgress, [0.1, 0.2], [0, 1]) }}>
            {steps.map((_, i) => {
              const isActive = useTransform(scrollYProgress, [0.2 + (i * 0.25), 0.2 + ((i + 1) * 0.25)], [0, 1]);
              return (
                <motion.div key={i} className="w-1 h-12 bg-[#1a1f26] rounded-full overflow-hidden">
                  <motion.div className="w-full bg-[#E5E4E2] origin-top" style={{ scaleY: isActive }} />
                </motion.div>
              );
            })}
          </motion.div>

          {/* Cards */}
          <div className="relative h-[600px] flex items-center justify-center" style={{ perspective: "2000px" }}>
            {steps.map((step, i) => {
              const cardStart = 0.15 + (i * 0.1);
              const finalX = i === 0 ? -500 : i === 1 ? 0 : 500;

              const opacity = useTransform(scrollYProgress, [cardStart - 0.05, cardStart, 1], [0, 1, 1]);
              const scale = useTransform(scrollYProgress, [cardStart - 0.05, cardStart, cardStart + 0.03, 0.7, 1], [0.7, 1.1, 1, i === 1 ? 0.92 : 0.95, i === 1 ? 0.92 : 0.95]);
              const x = useTransform(scrollYProgress, [cardStart, cardStart + 0.06, 0.45, 0.65, 1], [0, finalX * 0.4, finalX * 0.8, finalX, finalX]);
              const y = useTransform(scrollYProgress, [cardStart - 0.05, cardStart, cardStart + 0.03, 0.7, 1], [150, -20, 0, -40, -40]);
              const rotateY = useTransform(scrollYProgress, [cardStart, cardStart + 0.06, 0.45, 0.65, 1], [i === 0 ? -25 : i === 1 ? 0 : 25, i === 0 ? -15 : i === 1 ? 0 : 15, i === 0 ? -8 : i === 1 ? 0 : 8, i === 0 ? 10 : i === 1 ? 0 : -10, i === 0 ? 10 : i === 1 ? 0 : -10]);
              const rotateX = useTransform(scrollYProgress, [cardStart - 0.05, cardStart, cardStart + 0.06, 0.7, 1], [15, -5, 0, 2, 2]);
              const z = useTransform(scrollYProgress, [cardStart, cardStart + 0.06, 0.7, 1], [0, 50, i === 1 ? 30 : 0, i === 1 ? 30 : 0]);

              return (
                <motion.div key={step.number} style={{ scale, opacity, x, y, rotateY, rotateX, z, transformStyle: "preserve-3d", transformOrigin: "center center", zIndex: i === 1 ? 20 : 10 - i }} className="absolute w-[520px]">
                  <StepCard step={step} i={i} />
                </motion.div>
              );
            })}
          </div>

          {/* Scroll hint */}
          <motion.div style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <p className="text-xs text-[#B8C5D6]/50 tracking-wide">Scroll to explore</p>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} className="w-5 h-8 border border-[#B8C5D6]/30 rounded-full flex items-start justify-center p-1.5">
              <div className="w-1 h-2 bg-[#E5E4E2] rounded-full" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function HowItWorks() {
  return (
    <>
      <div className="lg:hidden"><MobileHowItWorks /></div>
      <div className="hidden lg:block"><DesktopHowItWorks /></div>
    </>
  );
}

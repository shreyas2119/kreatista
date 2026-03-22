"use client";

import StickyTabs from "@/components/ui/sticky-section-tabs";
import { motion } from "framer-motion";

const steps = [
  {
    id: "find",
    title: "01 — Find",
    desc: "We audit your brand, audience, and competitors to build a clear strategy.",
    details: "Deep dive into your market positioning, competitor analysis, audience personas, and content gaps. We identify opportunities and create a roadmap tailored to your goals.",
  },
  {
    id: "create",
    title: "02 — Create",
    desc: "Our team produces content, creatives, and campaigns built to perform.",
    details: "From concept to execution, we craft scroll-stopping content across all formats — video, graphics, copy, and campaigns that resonate with your audience and drive action.",
  },
  {
    id: "grow",
    title: "03 — Grow",
    desc: "We publish, optimize, and scale what works — consistently.",
    details: "Continuous testing, data-driven optimization, and strategic scaling. We double down on what converts and iterate on what doesn't, ensuring sustainable growth.",
  },
];

function StepContent({ step }: { step: typeof steps[0] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="space-y-8"
    >
      <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] backdrop-blur-sm p-8 sm:p-10">
        <div className="flex items-start gap-6">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-full border-2 border-violet-500 flex items-center justify-center bg-violet-500/10">
              <span className="text-violet-400 font-bold text-lg">
                {step.id === "find" ? "🔍" : step.id === "create" ? "✨" : "📈"}
              </span>
            </div>
          </div>
          <div className="flex-1">
            <p className="text-lg text-zinc-300 leading-relaxed mb-4">{step.desc}</p>
            <p className="text-sm text-zinc-500 leading-relaxed">{step.details}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {["Strategy", "Execution", "Results"].map((item, i) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
            className="rounded-xl border border-white/[0.05] bg-white/[0.01] p-6 hover:border-violet-500/30 transition-colors duration-300"
          >
            <h4 className="text-sm font-semibold text-white mb-2">{item}</h4>
            <p className="text-xs text-zinc-500">
              {i === 0 && "Data-driven planning"}
              {i === 1 && "Expert implementation"}
              {i === 2 && "Measurable outcomes"}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default function HowItWorks() {
  return (
    <div className="relative bg-zinc-950">
      {/* animated gradient sweep background */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        style={{
          background:
            "linear-gradient(120deg, transparent 0%, rgba(139,92,246,0.05) 40%, rgba(99,102,241,0.07) 60%, transparent 100%)",
          backgroundSize: "200% 200%",
        }}
      />

      <StickyTabs
        mainNavHeight="4rem"
        rootClassName="bg-zinc-950 text-white"
        navSpacerClassName="border-b border-white/10 bg-zinc-950"
        sectionClassName="bg-zinc-950"
        headerContentWrapperClassName="border-b border-white/10 bg-zinc-950/90 backdrop-blur-md"
        headerContentLayoutClassName="mx-auto max-w-6xl px-4 py-5 sm:px-6"
        titleClassName="text-xl font-bold text-white sm:text-2xl"
        contentLayoutClassName="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16"
      >
        {steps.map((step) => (
          <StickyTabs.Item key={step.id} title={step.title} id={step.id}>
            <StepContent step={step} />
          </StickyTabs.Item>
        ))}
      </StickyTabs>
    </div>
  );
}

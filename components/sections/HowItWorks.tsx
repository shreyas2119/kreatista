"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Search, Paintbrush, TrendingUp } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Find",
    icon: Search,
    illustration: "/illustrations/find.svg",
    desc: "We dig into your brand, audience, and competitors to build a strategy that actually makes sense.",
    details: "Deep dive into your market positioning, competitor moves, audience personas, and content gaps. We spot the opportunities others miss and map out a roadmap built around your goals.",
    tags: ["Market Research", "Competitor Analysis", "Audience Mapping"],
  },
  {
    number: "02",
    title: "Create",
    icon: Paintbrush,
    illustration: "/illustrations/create.svg",
    desc: "Our team builds content, creatives, and campaigns that are made to perform, not just look pretty.",
    details: "From idea to execution, we craft scroll-stopping content across every format — video, graphics, copy, and campaigns that hit different and actually get your audience to do something.",
    tags: ["Content Production", "Ad Creatives", "Copywriting"],
  },
  {
    number: "03",
    title: "Grow",
    icon: TrendingUp,
    illustration: "/illustrations/grow.svg",
    desc: "We publish, optimize, and scale what works — no guessing, just results.",
    details: "Non-stop testing, data-driven decisions, and smart scaling. We double down on what converts, cut what doesn't, and keep the growth engine running consistently.",
    tags: ["Performance Tracking", "A/B Testing", "Scaling"],
  },
];

export default function HowItWorks() {
  return (
    <section className="relative py-20 sm:py-32 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(139,92,246,0.08),transparent)]" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 sm:mb-20"
        >
          <p className="text-xs sm:text-sm text-violet-400 font-medium tracking-widest uppercase mb-3">The Process</p>
          <h2 className="text-3xl sm:text-5xl font-bold text-foreground">How It Works</h2>
          <p className="mt-4 text-sm sm:text-base text-zinc-500 max-w-md mx-auto">
            Three steps. Zero fluff. Real growth.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500/30 via-violet-500/10 to-transparent -translate-x-1/2 hidden sm:block" />

          <div className="space-y-8 sm:space-y-0">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isEven = i % 2 === 1;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
                  className="relative sm:grid sm:grid-cols-2 sm:gap-12 sm:items-center sm:mb-20"
                >
                  <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-violet-500 ring-4 ring-violet-500/20 z-10" />

                  {/* card */}
                  <div className={isEven ? "sm:col-start-2 sm:row-start-1" : ""}>
                    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 sm:p-8 hover:border-violet-500/20 transition-colors duration-300 group">
                      <div className="flex items-center gap-4 mb-5">
                        <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-violet-500/15 transition-colors duration-300">
                          <Icon className="w-4 h-4 text-violet-400" />
                        </div>
                        <div>
                          <span className="text-xs text-violet-400 font-medium tracking-widest uppercase">{step.number}</span>
                          <h3 className="text-xl sm:text-2xl font-bold text-white leading-none">{step.title}</h3>
                        </div>
                      </div>
                      <p className="text-sm sm:text-base text-zinc-300 leading-relaxed mb-3">{step.desc}</p>
                      <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed mb-5">{step.details}</p>
                      <div className="flex flex-wrap gap-2">
                        {step.tags.map((tag) => (
                          <span key={tag} className="text-xs px-3 py-1 rounded-full border border-violet-500/20 text-violet-400 bg-violet-500/5">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* illustration */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: i * 0.15 + 0.2, ease: "easeOut" }}
                    className={`hidden sm:flex items-center justify-center ${isEven ? "sm:col-start-1 sm:row-start-1" : ""}`}
                  >
                    <Image
                      src={step.illustration}
                      alt={step.title}
                      width={220}
                      height={180}
                      className="object-contain opacity-90"
                      style={{ width: "220px", height: "auto" }}
                    />
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

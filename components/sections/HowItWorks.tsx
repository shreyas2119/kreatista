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
    details: "Deep dive into your market positioning, competitor moves, audience personas, and content gaps. We spot the opportunities others miss.",
    tags: ["Market Research", "Competitor Analysis", "Audience Mapping"],
  },
  {
    number: "02",
    title: "Create",
    icon: Paintbrush,
    illustration: "/illustrations/create.svg",
    desc: "Our team builds content, creatives, and campaigns that are made to perform, not just look pretty.",
    details: "From idea to execution — scroll-stopping content across every format. Video, graphics, copy, and campaigns that get your audience to act.",
    tags: ["Content Production", "Ad Creatives", "Copywriting"],
  },
  {
    number: "03",
    title: "Grow",
    icon: TrendingUp,
    illustration: "/illustrations/grow.svg",
    desc: "We publish, optimize, and scale what works — no guessing, just results.",
    details: "Non-stop testing, data-driven decisions, and smart scaling. We double down on what converts and keep the growth engine running.",
    tags: ["Performance Tracking", "A/B Testing", "Scaling"],
  },
];

export default function HowItWorks() {
  return (
    <section className="relative py-20 sm:py-32 bg-[#1b1b22]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 sm:mb-20"
        >
          <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-[#c8622a] mb-3">The Process</p>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#e4e1ec] leading-none" style={{ letterSpacing: "-0.03em" }}>
            How It Works
          </h2>
          <p className="mt-3 text-sm text-[#ddc1b5]/60 max-w-xs">
            Three steps. Zero fluff. Real growth.
          </p>
        </motion.div>

        <div className="space-y-12 sm:space-y-0">
          {steps.map((step, i) => {
            const Icon = step.icon;
            const isEven = i % 2 === 1;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="relative sm:grid sm:grid-cols-2 sm:gap-16 sm:items-center sm:mb-20"
              >
                {/* Connector line — desktop only */}
                {i < steps.length - 1 && (
                  <div className="hidden sm:block absolute left-1/2 top-full w-px h-20 bg-gradient-to-b from-[#c8622a]/40 to-transparent -translate-x-1/2" />
                )}

                {/* Card */}
                <div className={isEven ? "sm:col-start-2 sm:row-start-1" : ""}>
                  <div className="bg-[#13131a] p-6 sm:p-8 group">
                    <div className="flex items-center gap-4 mb-5">
                      <div className="w-9 h-9 flex items-center justify-center bg-[#2a2931] flex-shrink-0">
                        <Icon className="w-4 h-4 text-[#ddc1b5]" />
                      </div>
                      <div>
                        <span className="text-[10px] text-[#c8622a] font-medium tracking-[0.15em] uppercase block">{step.number}</span>
                        <h3 className="text-xl sm:text-2xl font-extrabold text-[#e4e1ec] leading-none" style={{ letterSpacing: "-0.02em" }}>{step.title}</h3>
                      </div>
                    </div>
                    <p className="text-sm text-[#e4e1ec]/80 leading-relaxed mb-2">{step.desc}</p>
                    <p className="text-xs text-[#ddc1b5]/50 leading-relaxed mb-5">{step.details}</p>
                    <div className="flex flex-wrap gap-2">
                      {step.tags.map((tag) => (
                        <span key={tag} className="text-[10px] px-2.5 py-1 text-[#ddc1b5]/60 bg-[#2a2931] tracking-wide">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Illustration */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.1 + 0.15 }}
                  className={`hidden sm:flex items-center justify-center ${isEven ? "sm:col-start-1 sm:row-start-1" : ""}`}
                >
                  <div className="relative w-[200px] h-[160px] opacity-70">
                    <Image src={step.illustration} alt={step.title} fill className="object-contain" />
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useContactModal } from "@/components/providers/contact-modal";

const plans = [
  {
    name: "Starter",
    price: "From ₹25,000",
    period: "/ month",
    desc: "For brands just getting started with content. We get you visible, consistent, and growing.",
    services: [
      "Social media content & posting",
      "Basic ad creatives",
      "Caption & copy writing",
      "1–2 platforms managed",
      "Monthly performance recap",
    ],
    cta: "Get Started",
    highlight: false,
  },
  {
    name: "Growth",
    price: "From ₹60,000",
    period: "/ month",
    desc: "For brands ready to go harder. More content, more channels, more results.",
    services: [
      "Everything in Starter",
      "Short-form video production",
      "Influencer outreach & collab",
      "Paid ad strategy & creatives",
      "3+ platforms managed",
      "Bi-weekly strategy calls",
    ],
    cta: "Let's Grow",
    highlight: true,
  },
  {
    name: "Full-Stack",
    price: null,
    period: "",
    desc: "You want the whole thing — strategy, content, video, ads, influencers, and a team that runs it all.",
    services: [
      "Full content strategy & roadmap",
      "Video production & editing",
      "End-to-end campaign management",
      "Influencer campaigns",
      "Website & landing pages",
      "Dedicated account manager",
    ],
    cta: "Book a Call",
    highlight: false,
  },
];

export default function Pricing() {
  const { open: openModal } = useContactModal();

  return (
    <section className="relative py-20 sm:py-32 bg-[#1b1b22]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16"
        >
          <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-[#c8622a] mb-3">Pricing</p>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#e4e1ec] leading-none" style={{ letterSpacing: "-0.03em" }}>
            No Fixed Packages.<br className="hidden sm:block" /> Just Results.
          </h2>
          <p className="mt-4 text-sm text-[#ddc1b5]/60 max-w-lg leading-relaxed">
            Every brand is different — so we don't do cookie-cutter pricing. These tiers give you a rough idea. The actual scope gets figured out on a call.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={`relative flex flex-col p-6 sm:p-8 ${
                plan.highlight
                  ? "bg-[#2a2931] outline outline-1 outline-[#c8622a]/40"
                  : "bg-[#13131a]"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-6">
                  <span className="text-[9px] font-semibold px-2.5 py-1 bg-[#c8622a] text-[#e4e1ec] tracking-[0.12em] uppercase">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <p className="text-[10px] text-[#c8622a] font-medium tracking-[0.15em] uppercase mb-3">{plan.name}</p>
                {plan.price ? (
                  <div className="flex items-end gap-1.5 mb-2">
                    <span className="text-2xl sm:text-3xl font-extrabold text-[#e4e1ec]" style={{ letterSpacing: "-0.02em" }}>{plan.price}</span>
                    <span className="text-[#ddc1b5]/50 text-sm mb-0.5">{plan.period}</span>
                  </div>
                ) : (
                  <div className="mb-2">
                    <span className="text-lg font-semibold text-[#ddc1b5]/60 italic">Let's talk scope</span>
                  </div>
                )}
                <p className="text-xs text-[#ddc1b5]/50 leading-relaxed">{plan.desc}</p>
              </div>

              <ul className="space-y-2.5 mb-8 flex-1">
                {plan.services.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-xs text-[#ddc1b5]/70">
                    <Check className="w-3.5 h-3.5 text-[#c8622a] flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => openModal()}
                className={`w-full py-3 text-sm font-semibold transition-colors ${
                  plan.highlight
                    ? "bg-[#c8622a] text-[#e4e1ec] hover:bg-[#b5561f]"
                    : "border border-[#e4e1ec]/20 text-[#e4e1ec] hover:bg-white/[0.04]"
                }`}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-xs text-[#ddc1b5]/40 mt-8"
        >
          Prices are starting points, not ceilings. Final scope is always custom.{" "}
          <button onClick={() => openModal()} className="text-[#c8622a] hover:underline">
            Book a free call to get a real number.
          </button>
        </motion.p>
      </div>
    </section>
  );
}

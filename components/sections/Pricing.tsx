"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
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
    desc: "You want the whole thing — strategy, content, video, ads, influencers, and a team that runs it all. Let's build something serious.",
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
    <section className="relative py-20 sm:py-32 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_40%_at_50%_0%,rgba(139,92,246,0.07),transparent)]" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <p className="text-xs sm:text-sm text-violet-400 font-medium tracking-widest uppercase mb-3">Pricing</p>
          <h2 className="text-3xl sm:text-5xl font-bold text-foreground">No Fixed Packages. Just Results.</h2>
          <p className="mt-4 text-sm sm:text-base text-zinc-500 max-w-lg mx-auto">
            Every brand is different — so we don't do cookie-cutter pricing. These tiers give you a rough idea of where you might land. The actual scope gets figured out on a call.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              className={`relative rounded-2xl p-6 sm:p-8 flex flex-col ${
                plan.highlight
                  ? "border border-violet-500/50 bg-violet-500/[0.07]"
                  : "border border-white/[0.07] bg-white/[0.02]"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-violet-500 text-white whitespace-nowrap">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <p className="text-xs text-violet-400 font-medium tracking-widest uppercase mb-2">{plan.name}</p>
                {plan.price ? (
                  <div className="flex items-end gap-1 mb-2">
                    <span className="text-2xl sm:text-3xl font-bold text-white">{plan.price}</span>
                    {plan.period && <span className="text-zinc-500 text-sm mb-1">{plan.period}</span>}
                  </div>
                ) : (
                  <div className="mb-2">
                    <span className="text-lg font-semibold text-zinc-400 italic">Let's talk scope</span>
                  </div>
                )}
                <p className="text-xs text-zinc-500 leading-relaxed">{plan.desc}</p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.services.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-zinc-300">
                    <Check className="w-4 h-4 text-violet-400 flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.highlight ? "default" : "outline"}
                className="w-full"
                onClick={openModal}
              >
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-xs text-zinc-600 mt-8"
        >
          Prices are starting points, not ceilings. Final scope is always custom.{" "}
          <button onClick={openModal} className="text-violet-400 hover:text-violet-300 transition-colors">
            Book a free call to get a real number.
          </button>
        </motion.p>
      </div>
    </section>
  );
}

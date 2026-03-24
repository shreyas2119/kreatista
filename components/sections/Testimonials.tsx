"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Arjun Mehta",
    role: "Founder, NovaSaaS",
    avatar: "AM",
    text: "Kreatista took our content from zero to consistent in 3 weeks. Our LinkedIn impressions tripled and we started getting inbound leads we never had before. Worth every rupee.",
    stars: 5,
  },
  {
    name: "Priya Sharma",
    role: "D2C Brand Owner, Lumière",
    avatar: "PS",
    text: "The video content they produced for our product launch was insane. Reels hit 200k+ views organically. The team just gets what works on social — no hand-holding needed.",
    stars: 5,
  },
  {
    name: "Rohan Kapoor",
    role: "CEO, BuildFast",
    avatar: "RK",
    text: "We tried two other agencies before Kreatista. The difference is they actually understand SaaS marketing — not just pretty posts. Our trial signups went up 40% in 6 weeks.",
    stars: 5,
  },
  {
    name: "Sneha Iyer",
    role: "Creator & Coach",
    avatar: "SI",
    text: "I was skeptical about outsourcing my content but they matched my voice perfectly. My audience couldn't even tell. Engagement is up and I finally have time to focus on my actual work.",
    stars: 5,
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5 mb-3">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-3.5 h-3.5 fill-violet-400 text-violet-400" />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="relative py-20 sm:py-32 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_100%,rgba(139,92,246,0.07),transparent)]" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <p className="text-xs sm:text-sm text-violet-400 font-medium tracking-widest uppercase mb-3">Social Proof</p>
          <h2 className="text-3xl sm:text-5xl font-bold text-foreground">What Clients Say</h2>
          <p className="mt-4 text-sm sm:text-base text-zinc-500 max-w-md mx-auto">
            Real results from real brands. No fluff.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 sm:p-7 hover:border-violet-500/20 transition-colors duration-300 group"
            >
              <Stars count={t.stars} />
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed mb-5">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-violet-400">{t.avatar}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-zinc-500">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Arjun Mehta",
    role: "CEO at NovaSaaS",
    text: "Kreatista completely revamped our SaaS branding. Our conversion rate increased by 40% within the first month of the new site launch.",
    stars: 5,
  },
  {
    name: "Priya Sharma",
    role: "Founder of Lumière",
    text: "The social content they produced for our D2C launch went viral overnight. They understand exactly how to stop the scroll.",
    stars: 5,
    featured: true,
  },
  {
    name: "Rohan Kapoor",
    role: "CEO, BuildFast",
    text: "As a SaaS founder, it's hard to find an agency that gets product marketing. Kreatista scaled our trial signups 40% in 6 weeks.",
    stars: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 sm:py-32 px-5 sm:px-8 lg:px-16 overflow-hidden bg-[#13131a]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 sm:mb-20"
        >
          <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-[#c8622a] mb-3">Social Proof</p>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[#e4e1ec] leading-none tracking-[-0.04em]">
            Wall of Results
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={`p-7 sm:p-8 relative ${
                t.featured
                  ? "bg-[#2a2931] sm:scale-105 sm:z-10 shadow-2xl shadow-black/40 outline outline-1 outline-[#c8622a]/20"
                  : "bg-[#1b1b22]"
              }`}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <svg key={j} className="w-3.5 h-3.5 fill-[#c8622a]" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className={`leading-relaxed mb-6 italic ${t.featured ? "text-base text-[#e4e1ec]/90" : "text-sm text-[#e4e1ec]/70"}`}>
                &ldquo;{t.text}&rdquo;
              </p>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-[#34343c] flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-[#ddc1b5]">
                  {t.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <p className="text-sm font-bold text-[#e4e1ec]">{t.name}</p>
                  <p className="text-xs text-[#ddc1b5]/50">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

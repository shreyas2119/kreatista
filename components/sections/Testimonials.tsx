"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, animate } from "framer-motion";

const testimonials = [
  {
    name: "Arjun Mehta",
    role: "CEO at NovaSaaS",
    text: "Socioryx completely revamped our SaaS branding. Our conversion rate increased by 40% within the first month of the new site launch.",
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
    text: "As a SaaS founder, it's hard to find an agency that gets product marketing. Socioryx scaled our trial signups 40% in 6 weeks.",
    stars: 5,
  },
];

export default function Testimonials() {
  const [isPaused, setIsPaused] = useState(false);
  const x = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Duplicate testimonials for infinite scroll
  const allTestimonials = [...testimonials, ...testimonials, ...testimonials];

  useEffect(() => {
    if (isPaused) return;

    const controls = animate(x, -33.33, {
      duration: 30,
      repeat: Infinity,
      ease: "linear",
      repeatType: "loop",
    });

    return controls.stop;
  }, [isPaused, x]);

  return (
    <section className="py-20 sm:py-32 px-5 sm:px-8 lg:px-16 bg-[#0f1419] overflow-hidden">
      <div className="max-w-6xl mx-auto overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 sm:mb-20"
        >
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#E5E4E2] mb-3 font-body">Social Proof</p>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-semibold text-[#F8F8FF] leading-none tracking-[-0.04em] font-heading">
            Wall of Results
          </h2>
        </motion.div>

        {/* Infinite scroll carousel */}
        <div 
          ref={containerRef}
          className="relative overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <motion.div 
            className="flex gap-4"
            style={{ x: useTransform(x, (v) => `${v}%`) }}
          >
            {allTestimonials.map((t, i) => {
              const position = i % testimonials.length;
              const isFeatured = t.featured;
              
              return (
                <motion.div
                  key={`${t.name}-${i}`}
                  className={`flex-shrink-0 w-[85vw] sm:w-[400px] p-7 sm:p-8 relative ${
                    isFeatured
                      ? "bg-[#1a1f26] shadow-2xl shadow-black/40 outline outline-1 outline-[#E5E4E2]/20"
                      : "bg-[#151a21]"
                  }`}
                  whileHover={{ 
                    scale: 1.05, 
                    rotateY: 5,
                    z: 50,
                    transition: { duration: 0.3 }
                  }}
                  style={{
                    transformStyle: "preserve-3d",
                    perspective: 1000,
                  }}
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-5">
                    {Array.from({ length: t.stars }).map((_, j) => (
                      <motion.svg 
                        key={j} 
                        className="w-3.5 h-3.5 fill-[#E5E4E2]" 
                        viewBox="0 0 20 20"
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        transition={{ delay: j * 0.1, type: "spring" }}
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </motion.svg>
                    ))}
                  </div>

                  <p className={`leading-relaxed mb-6 font-body ${isFeatured ? "text-base text-[#F8F8FF]/90" : "text-sm text-[#F8F8FF]/70"}`}>
                    &ldquo;{t.text}&rdquo;
                  </p>

                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-[#252a31] flex items-center justify-center flex-shrink-0 text-xs font-medium text-[#B8C5D6] font-heading">
                      {t.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#F8F8FF] font-heading">{t.name}</p>
                      <p className="text-xs text-[#B8C5D6]/50 font-body">{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
          
          {/* Gradient overlays */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#0f1419] to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#0f1419] to-transparent z-10" />
        </div>
      </div>
    </section>
  );
}

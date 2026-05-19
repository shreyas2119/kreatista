"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Yash Patidar",
    role: "Co-Founder at TypethinkAI",
    text: "As a growing brand, we needed more than marketing we needed direction, and Socioryx delivered exactly that they helped us build a strong digital presence with content and strategies that truly connect with our audience their clarity, consistency, and focus on meaningful growth made a clear impact. The results speak for themselves stronger presence, better engagement, and a more aligned brand.",
    stars: 5,
  },
  {
    name: "Arunima Agrawal",
    role: "Developer at ClawsifyAI",
    text: "When I first came across Socioryx, the meaning behind the name combining Socio with the idea of rising to something extraordinary instantly stood out. After working with them, I can confidently say they don't just represent it, they deliver on it through their work and results.",
    stars: 5,
    featured: true,
  },
];

export default function Testimonials() {
  const [isPaused, setIsPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  // Drag state
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const allTestimonials = [...testimonials, ...testimonials, ...testimonials];

  // Pointer down — start drag
  const onPointerDown = (e: React.PointerEvent) => {
    if (!trackRef.current) return;
    isDragging.current = true;
    startX.current = e.clientX;
    scrollLeft.current = trackRef.current.scrollLeft;
    trackRef.current.setPointerCapture(e.pointerId);
    setIsPaused(true);
  };

  // Pointer move — scroll
  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current || !trackRef.current) return;
    const dx = e.clientX - startX.current;
    trackRef.current.scrollLeft = scrollLeft.current - dx;
  };

  // Pointer up — end drag
  const onPointerUp = () => {
    isDragging.current = false;
    setTimeout(() => setIsPaused(false), 800);
  };

  // Auto-scroll via requestAnimationFrame when not paused
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let rafId: number;
    const speed = 0.6; // px per frame

    const tick = () => {
      if (!isPaused && track) {
        track.scrollLeft += speed;
        // Seamless loop: when we've scrolled one third, reset to start
        if (track.scrollLeft >= track.scrollWidth / 3) {
          track.scrollLeft = 0;
        }
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isPaused]);

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

        {/* Track — native overflow scroll, no Framer Motion on the scroll axis */}
        <div className="relative">
          <div
            ref={trackRef}
            className="flex gap-4 overflow-x-scroll scrollbar-hide cursor-grab active:cursor-grabbing select-none"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => { setIsPaused(false); isDragging.current = false; }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
          >
            {allTestimonials.map((t, i) => {
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
                    scale: 1.03,
                    transition: { duration: 0.3 }
                  }}
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-5">
                    {Array.from({ length: t.stars }).map((_, j) => (
                      <svg key={j} className="w-3.5 h-3.5 fill-[#E5E4E2]" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  <p className={`leading-relaxed mb-6 font-body ${isFeatured ? "text-base text-[#F8F8FF]/90" : "text-sm text-[#F8F8FF]/80"}`}>
                    &ldquo;{t.text}&rdquo;
                  </p>

                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-[#252a31] flex items-center justify-center flex-shrink-0 text-xs font-medium text-[#B8C5D6] font-heading">
                      {t.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#F8F8FF] font-heading">{t.name}</p>
                      <p className="text-xs text-[#B8C5D6]/80 font-body">{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Gradient overlays */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#0f1419] to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#0f1419] to-transparent z-10" />
        </div>
      </div>
    </section>
  );
}

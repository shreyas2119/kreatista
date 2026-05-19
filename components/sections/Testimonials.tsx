"use client";

import { useRef, useState, useEffect, useCallback } from "react";
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

const ITEMS = [...testimonials, ...testimonials, ...testimonials, ...testimonials];

export default function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);       // current translateX in px
  const rafRef = useRef<number>(0);
  const isPaused = useRef(false);
  const dragStartX = useRef(0);
  const dragStartOffset = useRef(0);
  const isDragging = useRef(false);
  const [, forceRender] = useState(0); // unused but keeps hook count stable

  const applyTransform = useCallback((px: number) => {
    if (!trackRef.current) return;
    trackRef.current.style.transform = `translateX(${px}px)`;
  }, []);

  // RAF loop — moves left by speed px/frame
  useEffect(() => {
    const speed = 0.7;

    const tick = () => {
      if (!isPaused.current && trackRef.current) {
        const halfWidth = trackRef.current.scrollWidth / 2;
        offsetRef.current -= speed;
        // Seamless reset: when we've moved left by half the total width, jump back
        if (Math.abs(offsetRef.current) >= halfWidth) {
          offsetRef.current += halfWidth;
        }
        applyTransform(offsetRef.current);
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [applyTransform]);

  // Mouse drag
  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    isPaused.current = true;
    dragStartX.current = e.clientX;
    dragStartOffset.current = offsetRef.current;
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - dragStartX.current;
    offsetRef.current = dragStartOffset.current + dx;
    applyTransform(offsetRef.current);
  };
  const onMouseUp = () => {
    isDragging.current = false;
    isPaused.current = false;
  };

  // Touch drag
  const onTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true;
    isPaused.current = true;
    dragStartX.current = e.touches[0].clientX;
    dragStartOffset.current = offsetRef.current;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    const dx = e.touches[0].clientX - dragStartX.current;
    offsetRef.current = dragStartOffset.current + dx;
    applyTransform(offsetRef.current);
  };
  const onTouchEnd = () => {
    isDragging.current = false;
    isPaused.current = false;
  };

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

        {/* Outer: clips overflow */}
        <div
          className="relative overflow-hidden cursor-grab active:cursor-grabbing"
          onMouseEnter={() => { isPaused.current = true; }}
          onMouseLeave={() => { isPaused.current = false; isDragging.current = false; }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Inner: translateX controlled by RAF */}
          <div
            ref={trackRef}
            className="flex gap-4 w-max select-none will-change-transform"
          >
            {ITEMS.map((t, i) => {
              const isFeatured = t.featured;
              return (
                <div
                  key={`${t.name}-${i}`}
                  className={`flex-shrink-0 w-[85vw] sm:w-[400px] p-7 sm:p-8 ${
                    isFeatured
                      ? "bg-[#1a1f26] shadow-2xl shadow-black/40 outline outline-1 outline-[#E5E4E2]/20"
                      : "bg-[#151a21]"
                  }`}
                >
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
                </div>
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

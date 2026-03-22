"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { WordReveal } from "@/components/ui/word-reveal";
import { GlowingStarsBackgroundCard, Illustration } from "@/components/ui/glowing-stars";
import { ArrowRight } from "lucide-react";

const services = [
  {
    emoji: "🚀",
    title: "SaaS Marketing",
    desc: "Demand gen and growth campaigns for SaaS products.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
  },
  {
    emoji: "📦",
    title: "Product Marketing",
    desc: "Positioning, messaging, and launch strategy.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
  },
  {
    emoji: "🎬",
    title: "Content Creation",
    desc: "Scroll-stopping content tailored to your brand voice.",
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&q=80",
  },
  {
    emoji: "📱",
    title: "Social Media Management",
    desc: "Consistent presence across every major platform.",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&q=80",
  },
  {
    emoji: "🤝",
    title: "Influencer Collaborations",
    desc: "Curated creator partnerships that convert.",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&q=80",
  },
  {
    emoji: "🎥",
    title: "Video Production",
    desc: "High-quality video from concept to final cut.",
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&q=80",
  },
];

function ServiceCard({
  emoji, title, desc, image, index, scrollYProgress,
}: {
  emoji: string;
  title: string;
  desc: string;
  image: string;
  index: number;
  scrollYProgress: any;
}) {
  const [hovered, setHovered] = useState(false);

  // different start positions for each card
  const startPositions = [
    { x: -600, y: -300, rotate: -25, scale: 0.4 },
    { x: 600, y: -400, rotate: 30, scale: 0.3 },
    { x: -700, y: 100, rotate: -35, scale: 0.35 },
    { x: 700, y: 50, rotate: 40, scale: 0.4 },
    { x: -500, y: 500, rotate: -30, scale: 0.35 },
    { x: 500, y: 600, rotate: 35, scale: 0.3 },
  ];

  const start = startPositions[index];
  
  // tighter timing — all cards finish by 60% scroll progress
  const startProgress = 0.15 + index * 0.03;
  const endProgress = 0.45 + index * 0.03;

  const x = useTransform(scrollYProgress, [startProgress, endProgress], [start.x, 0]);
  const y = useTransform(scrollYProgress, [startProgress, endProgress], [start.y, 0]);
  const rotate = useTransform(scrollYProgress, [startProgress, endProgress], [start.rotate, 0]);
  const scale = useTransform(scrollYProgress, [startProgress, endProgress], [start.scale, 1]);
  const opacity = useTransform(scrollYProgress, [startProgress, endProgress], [0, 1]);

  return (
    <motion.div style={{ x, y, rotate, scale, opacity }} className="h-full">
      <div
        className="relative h-56 sm:h-64 lg:h-72 rounded-2xl overflow-hidden cursor-none group"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* ── image layer — slides right on hover ── */}
        <motion.div
          className="absolute inset-0 z-10"
          animate={{ x: hovered ? "100%" : "0%" }}
          transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-black/50 to-black/70 z-10" />
          <img src={image} alt={title} className="w-full h-full object-cover" />
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 z-20 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
            <span className="text-2xl sm:text-3xl mr-2">{emoji}</span>
            <span className="text-white font-semibold text-base sm:text-lg">{title}</span>
          </div>
        </motion.div>

        {/* ── text layer — revealed underneath with glowing stars ── */}
        <GlowingStarsBackgroundCard className="absolute inset-0 z-0 rounded-2xl flex flex-col justify-between p-5 sm:p-7 border-white/[0.05]">
          <div className="w-10 h-[2px] bg-gradient-to-r from-violet-500 to-violet-600 rounded-full shadow-[0_0_8px_rgba(139,92,246,0.5)]" />
          <div>
            <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-5">{desc}</p>
            <motion.span
              className="inline-flex items-center gap-1 text-violet-400 text-xs font-medium tracking-wide"
              whileHover={{ x: 3 }}
              transition={{ duration: 0.2 }}
            >
              Learn more <ArrowRight className="w-3 h-3" />
            </motion.span>
          </div>
          <span className="absolute bottom-4 right-5 sm:bottom-5 sm:right-6 text-6xl sm:text-7xl opacity-[0.06] select-none blur-[1px]">
            {emoji}
          </span>
        </GlowingStarsBackgroundCard>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <section ref={ref} className="relative py-16 sm:py-20 px-4 max-w-7xl mx-auto" style={{ minHeight: "300vh" }}>
      <div className="sticky top-0 min-h-screen flex flex-col justify-center py-8">
        <motion.p
          style={{ opacity: useTransform(scrollYProgress, [0.1, 0.25], [0, 1]) }}
          className="text-center text-xs text-violet-400 font-medium tracking-[0.2em] uppercase mb-3"
        >
          Services
        </motion.p>

        <motion.div style={{ opacity: useTransform(scrollYProgress, [0.1, 0.25], [0, 1]) }}>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-center mb-3 leading-tight px-4">
            <WordReveal text="What We Do" delay={0.05} trigger="animate" />
          </h2>
        </motion.div>

        <motion.p
          style={{ opacity: useTransform(scrollYProgress, [0.1, 0.25], [0, 1]) }}
          className="text-center text-zinc-500 mb-8 sm:mb-12 text-xs sm:text-sm max-w-md mx-auto px-4"
        >
          Everything your brand needs to grow — under one roof.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 px-2">
          {services.map((s, i) => (
            <ServiceCard key={s.title} {...s} index={i} scrollYProgress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}

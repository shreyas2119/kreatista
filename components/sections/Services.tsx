"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { WordReveal } from "@/components/ui/word-reveal";
import { GlowingStarsBackgroundCard, Illustration } from "@/components/ui/glowing-stars";
import { ArrowRight } from "lucide-react";

const services = [
  {
    emoji: "🚀",
    title: "SaaS Marketing",
    desc: "We help SaaS brands grow with data-driven strategies—from user acquisition to retention—optimizing every step to build a scalable and profitable growth engine. End-to-end growth strategy tailored for your SaaS, conversion-focused funnel design, user acquisition systems, retention & lifecycle marketing, and continuous optimization.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
  },
  {
    emoji: "📦",
    title: "Product Marketing",
    desc: "If you have a great product but people don't know about it, it won't grow. We help you build a strong online presence, create engaging content, and showcase your product in a way that attracts the right audience. From branding to promotion across social media platforms.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
  },
  {
    emoji: "🎬",
    title: "Content Creation",
    desc: "We don't just create content, we create impact. From scroll-stopping visuals to engaging storytelling, we design content that connects with your audience and drives real engagement. Social media creatives, ad creatives & copywriting, brand storytelling, and content strategy & planning.",
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4",
  },
  {
    emoji: "📱",
    title: "Social Media Management",
    desc: "Your social media isn't just a page—it's your brand's personality. We actively engage with your audience, build meaningful relationships, and turn interactions into trust. Daily content posting, active audience engagement, community building, and consistent brand communication with performance tracking.",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7",
  },
  {
    emoji: "🤝",
    title: "Influencer Collaborations",
    desc: "We connect your brand with the right influencers who actually convert, not just create noise. Our campaigns are built to generate trust, awareness, and measurable ROI. Influencer sourcing & outreach, campaign planning & execution, performance tracking, and ROI-focused collaborations.",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0",
  },
  {
    emoji: "🎥",
    title: "Video Production",
    desc: "Video is the most powerful way to capture attention. We create high-quality videos that tell your brand story, showcase your product, and convert viewers into customers. Ad videos (Reels, Shorts, YouTube Ads), product demos & explainers, brand storytelling videos, and professional editing & post-production.",
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d",
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
        className="relative h-56 sm:h-64 lg:h-72 rounded-2xl overflow-hidden group"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Background Image */}
        <motion.div
          className="absolute inset-0"
          animate={{ 
            filter: hovered ? "blur(8px) brightness(0.4)" : "blur(0px) brightness(0.6)",
            scale: hovered ? 1.05 : 1
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-black/50 to-black/70 z-10" />
          <Image src={image} alt={title} fill className="object-cover opacity-60" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px" />
        </motion.div>

        {/* Title - Always visible */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 z-20 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
          <motion.span 
            className="text-white font-black text-xl sm:text-2xl lg:text-3xl uppercase tracking-wider"
            style={{
              fontFamily: '"Righteous", sans-serif',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
              letterSpacing: '0.1em'
            }}
            animate={{
              opacity: hovered ? 0 : 1,
              y: hovered ? 20 : 0
            }}
            transition={{ duration: 0.3 }}
          >
            {title}
          </motion.span>
        </div>

        {/* Description Overlay - Appears on hover */}
        <motion.div
          className="absolute inset-0 z-30 flex flex-col justify-center p-6 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          style={{ pointerEvents: hovered ? 'auto' : 'none' }}
        >
          <div className="relative">
            {/* Decorative line */}
            <motion.div 
              className="w-16 h-1 bg-gradient-to-r from-violet-500 to-violet-600 rounded-full mb-4"
              initial={{ width: 0 }}
              animate={{ width: hovered ? 64 : 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            />
            
            {/* Title on hover */}
            <motion.h3
              className="text-white font-bold text-lg sm:text-xl mb-3"
              style={{
                fontFamily: '"Righteous", sans-serif',
                letterSpacing: '0.05em'
              }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: hovered ? 0 : 20, opacity: hovered ? 1 : 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              {title}
            </motion.h3>

            {/* Description */}
            <motion.p
              className="text-zinc-200 text-xs sm:text-sm leading-relaxed mb-4"
              style={{
                fontFamily: '"Inter", sans-serif',
                fontWeight: 300,
                lineHeight: '1.6'
              }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: hovered ? 0 : 20, opacity: hovered ? 1 : 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              {desc}
            </motion.p>

            {/* Learn more link */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: hovered ? 0 : 20, opacity: hovered ? 1 : 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <motion.span
                className="inline-flex items-center gap-2 text-violet-400 text-sm font-medium"
                style={{ fontFamily: '"Inter", sans-serif' }}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                Learn more <ArrowRight className="w-4 h-4" />
              </motion.span>
            </motion.div>
          </div>
        </motion.div>
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
      <div className="sticky top-0 min-h-screen flex flex-col justify-center py-4">
        <motion.p
          style={{ opacity: useTransform(scrollYProgress, [0.1, 0.25], [0, 1]) }}
          className="text-center text-xs text-violet-400 font-medium tracking-[0.2em] uppercase mb-2"
        >
          Services
        </motion.p>

        <motion.div style={{ opacity: useTransform(scrollYProgress, [0.1, 0.25], [0, 1]) }}>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-center mb-2 leading-tight px-4">
            <WordReveal text="What We Do" delay={0.05} trigger="animate" />
          </h2>
        </motion.div>

        <motion.p
          style={{ opacity: useTransform(scrollYProgress, [0.1, 0.25], [0, 1]) }}
          className="text-center text-zinc-500 mb-6 sm:mb-8 text-xs sm:text-sm max-w-md mx-auto px-4"
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

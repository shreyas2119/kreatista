"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Search, Paintbrush, TrendingUp } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Find",
    icon: Search,
    desc: "We dig deep. Uncover what works. Spot what others miss.",
    tags: ["Research", "Strategy", "Insights"],
  },
  {
    number: "02",
    title: "Create",
    icon: Paintbrush,
    desc: "Scroll-stopping content. Built to perform, not just look pretty.",
    tags: ["Content", "Creatives", "Campaigns"],
  },
  {
    number: "03",
    title: "Grow",
    icon: TrendingUp,
    desc: "Test. Optimize. Scale. No guessing, just results.",
    tags: ["Analytics", "Testing", "Scaling"],
  },
];

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section ref={containerRef} className="relative bg-[#151a21]" style={{ height: "250vh" }}>
      {/* Sticky container */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-16 w-full">
          {/* Header - fades out as we scroll */}
          <motion.div
            style={{
              opacity: useTransform(scrollYProgress, [0, 0.15], [1, 0]),
              y: useTransform(scrollYProgress, [0, 0.15], [0, -50])
            }}
            className="text-center mb-12"
          >
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#E5E4E2] mb-3 font-body">The Process</p>
            <h2 className="text-3xl sm:text-5xl font-semibold text-[#F8F8FF] leading-none font-heading" style={{ letterSpacing: "-0.03em" }}>
              How It Works
            </h2>
            <p className="mt-3 text-sm text-[#B8C5D6]/60 font-body">
              Three steps. Zero fluff. Real growth.
            </p>
          </motion.div>

          {/* Progress indicator */}
          <motion.div 
            className="absolute top-8 right-8 flex flex-col gap-2"
            style={{
              opacity: useTransform(scrollYProgress, [0.1, 0.2], [0, 1])
            }}
          >
            {steps.map((_, i) => {
              const isActive = useTransform(
                scrollYProgress,
                [0.2 + (i * 0.25), 0.2 + ((i + 1) * 0.25)],
                [0, 1]
              );
              
              return (
                <motion.div
                  key={i}
                  className="w-1 h-12 bg-[#1a1f26] rounded-full overflow-hidden"
                >
                  <motion.div
                    className="w-full bg-[#E5E4E2] origin-top"
                    style={{ scaleY: isActive }}
                  />
                </motion.div>
              );
            })}
          </motion.div>

          {/* Cards stack */}
          <div className="relative h-[600px] flex items-center justify-center" style={{ perspective: "2000px" }}>
            {steps.map((step, i) => {
              const Icon = step.icon;
              
              // Calculate when this card should appear
              const cardStart = 0.15 + (i * 0.15);
              
              // Card appears and STAYS visible (clamp at 1)
              const opacity = useTransform(
                scrollYProgress,
                [cardStart - 0.08, cardStart, 1],
                [0, 1, 1]
              );
              
              // Scale animation - stays at final scale
              const scale = useTransform(
                scrollYProgress,
                [cardStart - 0.08, cardStart, cardStart + 0.05, 0.85, 1],
                [0.7, 1.1, 1, 0.95, 0.95]
              );
              
              // Final positions: more spacing between cards
              const finalX = i === 0 ? -500 : i === 1 ? 0 : 500;
              
              // Move to final position and STAY there
              const x = useTransform(
                scrollYProgress,
                [
                  cardStart,           // Card appears
                  cardStart + 0.1,     // Start moving
                  0.6,                 // Mid animation
                  0.85,                // Final position
                  1                    // Stay at final
                ],
                [
                  0,                   // Start at center
                  finalX * 0.4,        // Move 40% to position
                  finalX * 0.8,        // Move 80% to position
                  finalX,              // Final position
                  finalX               // STAY at final position
                ]
              );
              
              // Y position - stays at final position
              const y = useTransform(
                scrollYProgress,
                [cardStart - 0.08, cardStart, cardStart + 0.05, 0.85, 1],
                [150, -20, 0, -40, -40]
              );
              
              // 3D Rotation Y - stays at final rotation
              const rotateY = useTransform(
                scrollYProgress,
                [cardStart, cardStart + 0.1, 0.6, 0.85, 1],
                [
                  i === 0 ? -25 : i === 1 ? 0 : 25,  // Initial tilt
                  i === 0 ? -15 : i === 1 ? 0 : 15,  // Mid tilt
                  i === 0 ? -8 : i === 1 ? 0 : 8,    // Settling
                  i === 0 ? 12 : i === 1 ? 0 : -12,  // Final tilt
                  i === 0 ? 12 : i === 1 ? 0 : -12   // STAY at final tilt
                ]
              );
              
              // 3D Rotation X - stays at final rotation
              const rotateX = useTransform(
                scrollYProgress,
                [cardStart - 0.08, cardStart, cardStart + 0.1, 0.85, 1],
                [15, -5, 0, 2, 2]
              );
              
              // Z-axis depth - stays at final depth
              const z = useTransform(
                scrollYProgress,
                [cardStart, cardStart + 0.1, 0.85, 1],
                [0, 50, i === 1 ? 30 : 0, i === 1 ? 30 : 0]
              );

              return (
                <motion.div
                  key={step.number}
                  style={{
                    scale,
                    opacity,
                    x,
                    y,
                    rotateY,
                    rotateX,
                    z,
                    transformStyle: "preserve-3d",
                    transformOrigin: "center center",
                    zIndex: i === 1 ? 20 : 10 - i, // Center card on top
                  }}
                  className="absolute"
                >
                  <div className="bg-gradient-to-br from-[#0f1419] to-[#1a1a24] p-8 sm:p-12 w-[90vw] sm:w-[520px] shadow-2xl shadow-black/60 border-2 border-[#1a1f26] relative overflow-hidden">
                    {/* Animated gradient overlay */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-br from-[#E5E4E2]/5 to-transparent opacity-0"
                      animate={{
                        opacity: [0, 0.3, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.5
                      }}
                    />
                    
                    {/* Icon and number */}
                    <div className="flex items-center gap-4 mb-6 relative z-10">
                      <motion.div 
                        className="w-16 h-16 flex items-center justify-center bg-[#1a1f26] relative"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <Icon className="w-7 h-7 text-[#E5E4E2]" />
                        {/* Glow effect */}
                        <div className="absolute inset-0 bg-[#E5E4E2]/20 blur-xl" />
                      </motion.div>
                      <div>
                        <span className="text-xs text-[#E5E4E2] font-medium tracking-[0.15em] uppercase block mb-1 font-body">
                          STEP {step.number}
                        </span>
                        <h3 className="text-3xl sm:text-4xl font-semibold text-[#F8F8FF] leading-none font-heading" style={{ letterSpacing: "-0.02em" }}>
                          {step.title}
                        </h3>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-lg sm:text-xl text-[#F8F8FF] leading-relaxed mb-6 relative z-10 font-body">
                      {step.desc}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 relative z-10">
                      {step.tags.map((tag, idx) => (
                        <motion.span
                          key={tag}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: cardStart + 0.1 + (idx * 0.1) }}
                          className="text-xs px-3 py-1.5 text-[#B8C5D6]/70 bg-[#1a1f26] tracking-wide border border-[#E5E4E2]/10 font-body"
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>

                    {/* Step counter watermark with parallax */}
                    <motion.div 
                      className="absolute -top-4 -right-4 text-[140px] font-semibold text-[#F8F8FF]/[0.02] leading-none pointer-events-none font-heading"
                      style={{
                        x: useTransform(scrollYProgress, [cardStart, 0.85, 1], [0, i === 0 ? 20 : i === 1 ? 0 : -20, i === 0 ? 20 : i === 1 ? 0 : -20]),
                        y: useTransform(scrollYProgress, [cardStart, 0.85, 1], [0, -10, -10]),
                      }}
                    >
                      {step.number}
                    </motion.div>
                    
                    {/* Corner accent */}
                    <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-[#E5E4E2]/20" />
                    <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-[#E5E4E2]/20" />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Scroll hint - shows at start */}
          <motion.div
            style={{
              opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0])
            }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <p className="text-xs text-[#B8C5D6]/50 tracking-wide">Scroll to explore</p>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-5 h-8 border border-[#B8C5D6]/30 rounded-full flex items-start justify-center p-1.5"
            >
              <div className="w-1 h-2 bg-[#E5E4E2] rounded-full" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

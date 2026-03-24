"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { WordReveal } from "@/components/ui/word-reveal";
import { ArrowRight } from "lucide-react";

const services = [
  {
    title: "Websites That\nMean Business",
    desc: "We build websites that do more than just look good. From the first click to the final conversion, every page is designed with purpose. Clean code, killer design, and a seamless user experience that keeps visitors hooked and turning into customers. Fast, responsive, and built to scale with your business.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    size: "large",
    flagship: true,
  },
  {
    title: "Product Marketing",
    desc: "Your product is great. The problem? Nobody knows it yet. We fix that.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    size: "tall", // col-span-1 row-span-2
  },
  {
    title: "Content\nCreation",
    desc: "Scroll-stopping visuals, stories that hit different, copy that converts.",
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4",
    size: "small",
  },
  {
    title: "Social Media Management",
    desc: "Your brand, always on. Real community, real engagement, real results.",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7",
    size: "small",
  },
  {
    title: "Influencer Collaborations",
    desc: "We find the ones whose audience is already your audience.",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0",
    size: "small",
  },
  {
    title: "Video\nProduction",
    desc: "Video is how brands win attention — and we make sure yours does exactly that.",
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d",
    size: "small",
  },
];

const sizeClasses: Record<string, string> = {
  large: "sm:col-span-2 sm:row-span-2",
  tall:  "sm:col-span-1 sm:row-span-2",
  wide:  "sm:col-span-2 sm:row-span-1",
  small: "sm:col-span-1 sm:row-span-1",
};

const heightClasses: Record<string, string> = {
  large: "h-72 sm:h-full",
  tall:  "h-72 sm:h-full",
  wide:  "h-56 sm:h-full",
  small: "h-56 sm:h-full",
};

const startPositions = [
  { x: -600, y: -300, rotate: -25, scale: 0.4 },
  { x: 600,  y: -400, rotate: 30,  scale: 0.3 },
  { x: -700, y: 100,  rotate: -35, scale: 0.35 },
  { x: 700,  y: 50,   rotate: 40,  scale: 0.4 },
  { x: -500, y: 500,  rotate: -30, scale: 0.35 },
  { x: 500,  y: 600,  rotate: 35,  scale: 0.3 },
];

function ServiceCard({
  title, desc, image, size, flagship, index, scrollYProgress,
}: {
  title: string;
  desc: string;
  image: string;
  size: string;
  flagship?: boolean;
  index: number;
  scrollYProgress: any;
}) {
  const [hovered, setHovered] = useState(false);
  const start = startPositions[index];
  const startProgress = 0.15 + index * 0.03;
  const endProgress   = 0.45 + index * 0.03;

  const x       = useTransform(scrollYProgress, [startProgress, endProgress], [start.x, 0]);
  const y       = useTransform(scrollYProgress, [startProgress, endProgress], [start.y, 0]);
  const rotate  = useTransform(scrollYProgress, [startProgress, endProgress], [start.rotate, 0]);
  const scale   = useTransform(scrollYProgress, [startProgress, endProgress], [start.scale, 1]);
  const opacity = useTransform(scrollYProgress, [startProgress, endProgress], [0, 1]);

  const isLarge = size === "large";

  return (
    <motion.div
      style={{ x, y, rotate, scale, opacity }}
      className={`${sizeClasses[size]} h-full`}
    >
      <div
        className={`relative ${heightClasses[size]} rounded-2xl overflow-hidden group cursor-pointer`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Background */}
        <motion.div
          className="absolute inset-0"
          animate={{
            filter: hovered ? "blur(6px) brightness(0.35)" : "blur(0px) brightness(0.55)",
            scale: hovered ? 1.05 : 1,
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-black/40 to-black/70 z-10" />
          <Image
            src={image}
            alt={title.replace(/\n/g, " ")}
            fill
            className="object-cover opacity-60"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
          />
        </motion.div>

        {/* Default state — title at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 z-20 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
          <motion.div
            animate={{ opacity: hovered ? 0 : 1, y: hovered ? 20 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {flagship && (
              <span className="inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full bg-violet-500 text-white mb-2 tracking-wider uppercase">
                Most Popular
              </span>
            )}
            <motion.p
              className="text-xs text-violet-400 font-medium tracking-widest uppercase mb-1"
            >
              {String(index + 1).padStart(2, "0")}
            </motion.p>
            <span
              className={`text-white font-black uppercase tracking-wider whitespace-pre-line ${isLarge ? "text-3xl sm:text-4xl" : "text-xl sm:text-2xl"}`}
              style={{ fontFamily: '"Righteous", sans-serif', textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
            >
              {title}
            </span>
          </motion.div>
        </div>

        {/* Hover overlay */}
        <motion.div
          className="absolute inset-0 z-30 flex flex-col justify-end p-5 sm:p-6"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.35 }}
          style={{ pointerEvents: hovered ? "auto" : "none" }}
        >
          <motion.div
            className="w-10 h-0.5 bg-violet-500 rounded-full mb-3"
            animate={{ width: hovered ? 40 : 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
          />
          <motion.h3
            className={`text-white font-bold whitespace-pre-line mb-2 ${isLarge ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl"}`}
            style={{ fontFamily: '"Righteous", sans-serif' }}
            animate={{ y: hovered ? 0 : 15, opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.35, delay: 0.05 }}
          >
            {title}
          </motion.h3>
          <motion.p
            className="text-zinc-300 text-xs sm:text-sm leading-relaxed mb-3"
            animate={{ y: hovered ? 0 : 15, opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
          >
            {desc}
          </motion.p>
          <motion.span
            className="inline-flex items-center gap-1.5 text-violet-400 text-xs font-medium"
            animate={{ y: hovered ? 0 : 15, opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.35, delay: 0.15 }}
            whileHover={{ x: 4 }}
          >
            Learn more <ArrowRight className="w-3 h-3" />
          </motion.span>
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

        {/* Bento grid — 3 cols, auto rows */}
        <div className="grid grid-cols-1 sm:grid-cols-3 sm:grid-rows-[280px_280px_280px] gap-4 sm:gap-5 px-2">
          {services.map((s, i) => (
            <ServiceCard key={s.title} {...s} flagship={s.flagship} index={i} scrollYProgress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}

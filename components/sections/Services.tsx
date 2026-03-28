"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Globe, Megaphone, Film, Users, Share2, BarChart2 } from "lucide-react";
import { useContactModal } from "@/components/providers/contact-modal";
import { SectionBackground, backgroundPresets } from "@/components/ui/section-background";

const services = [
  {
    title: "High-Impact Websites",
    desc: "Custom-engineered platforms optimized for conversion, speed, and uncompromising aesthetic polish.",
    image: "/images/web.webp",
    icon: Globe,
    span: "lg:col-span-8",
    flagship: true,
  },
  {
    title: "Social Media Scaling",
    desc: "Data-driven strategies to dominate Instagram, YouTube, and beyond.",
    image: "/images/social.webp",
    icon: Share2,
    span: "lg:col-span-4",
    accent: true,
  },
  {
    title: "Creative Directing",
    desc: "Professional video production and high-fidelity content for every platform.",
    image: "/images/video.webp",
    icon: Film,
    span: "lg:col-span-4",
  },
  {
    title: "Product Marketing",
    desc: "Go-to-market strategies that capture attention and drive sustainable growth.",
    image: "/images/product.webp",
    icon: Megaphone,
    span: "lg:col-span-8",
    wide: true,
  },
  {
    title: "Influencer Collabs",
    desc: "ROI-focused influencer campaigns with end-to-end management.",
    image: "/images/influencer.webp",
    icon: Users,
    span: "lg:col-span-6",
  },
  {
    title: "Content Creation",
    desc: "Scroll-stopping visuals, copy that converts, stories that hit different.",
    image: "/images/content.webp",
    icon: BarChart2,
    span: "lg:col-span-6",
  },
];

export default function Services() {
  const { openCalendly } = useContactModal();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  return (
    <section ref={sectionRef} id="services" className="relative py-20 sm:py-32 px-5 sm:px-8 lg:px-16 bg-[#0f1419] overflow-hidden">
      {/* Wallpaper Background */}
      <SectionBackground 
        imageUrl={backgroundPresets.services} 
        overlay="dark"
        blur={false}
      />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16"
        >
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#E5E4E2] mb-3 font-body">Services</p>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-semibold text-[#F8F8FF] leading-none tracking-[-0.04em] mb-4 font-heading">
            Our Ecosystem
          </h2>
          <p className="text-sm sm:text-base text-[#B8C5D6]/60 max-w-md leading-relaxed font-body">
            Comprehensive solutions tailored for high-growth digital brands.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {services.map((s, i) => {
            const Icon = s.icon;
            const cardY = useTransform(scrollYProgress, [0, 1], [50 * (i % 3), -50 * (i % 3)]);
            
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                style={{ y: cardY }}
                whileHover={{ scale: 1.02, rotate: 0, transition: { duration: 0.3 } }}
                className={`${s.span} group relative overflow-hidden cursor-pointer rounded-xl ${
                  s.accent ? "bg-[#E5E4E2]" : "bg-[#151a21] hover:bg-[#222531]"
                } transition-colors duration-500`}
                onClick={() => openCalendly(`Interested in: ${s.title}`)}
              >
                <div className="p-7 sm:p-10 relative z-10 flex flex-col h-full min-h-[200px] sm:min-h-[240px]">
                  <Icon className={`w-8 h-8 mb-5 ${s.accent ? "text-[#0f1419]" : "text-[#E5E4E2]"}`} />
                  <h3 className={`text-xl sm:text-2xl font-semibold mb-3 tracking-[-0.02em] leading-tight font-heading ${s.accent ? "text-[#0f1419]" : "text-[#F8F8FF]"}`}>
                    {s.title}
                    {s.flagship && (
                      <span className="ml-3 text-[9px] font-medium px-2 py-0.5 bg-[#E5E4E2] text-[#0f1419] tracking-[0.12em] uppercase align-middle font-body">
                        Most Popular
                      </span>
                    )}
                  </h3>
                  <p className={`text-sm leading-relaxed mb-6 flex-1 font-body ${s.accent ? "text-[#0f1419]/80" : "text-[#B8C5D6]/60"}`}>
                    {s.desc}
                  </p>
                  <span className={`inline-flex items-center gap-1.5 text-xs font-medium group-hover:gap-3 transition-all duration-300 font-body ${s.accent ? "text-[#0f1419]" : "text-[#E5E4E2]"}`}>
                    Learn more <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>

                {/* Background image — subtle with parallax */}
                {s.wide && (
                  <motion.div 
                    className="absolute inset-0 opacity-10 group-hover:opacity-15 transition-opacity duration-500"
                    style={{ y: useTransform(scrollYProgress, [0, 1], [0, -30]) }}
                  >
                    <Image src={s.image} alt={s.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" />
                  </motion.div>
                )}

                {/* Corner decoration for large card */}
                {s.flagship && (
                  <div className="absolute bottom-0 right-0 w-48 h-36 bg-[#222531] translate-y-6 translate-x-6 group-hover:translate-y-3 group-hover:translate-x-3 transition-transform duration-500" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

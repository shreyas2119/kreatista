"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Globe, Megaphone, Film, Users, Share2, BarChart2 } from "lucide-react";
import { useContactModal } from "@/components/providers/contact-modal";

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
  const { open: openModal } = useContactModal();

  return (
    <section id="services" className="py-20 sm:py-32 px-5 sm:px-8 lg:px-16 bg-[#13131a]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16"
        >
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#c8622a] mb-3">Services</p>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[#e4e1ec] leading-none tracking-[-0.04em] mb-4">
            Our Ecosystem
          </h2>
          <p className="text-sm sm:text-base text-[#ddc1b5]/60 max-w-md leading-relaxed">
            Comprehensive solutions tailored for high-growth digital brands.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className={`${s.span} group relative overflow-hidden cursor-pointer ${
                  s.accent ? "bg-[#c8622a]" : "bg-[#1b1b22] hover:bg-[#222531]"
                } transition-colors duration-500`}
                onClick={() => openModal(`Interested in: ${s.title}`)}
              >
                <div className="p-7 sm:p-10 relative z-10 flex flex-col h-full min-h-[200px] sm:min-h-[240px]">
                  <Icon className={`w-8 h-8 mb-5 ${s.accent ? "text-[#e4e1ec]" : "text-[#c8622a]"}`} />
                  <h3 className={`text-xl sm:text-2xl font-extrabold mb-3 tracking-[-0.02em] leading-tight ${s.accent ? "text-[#e4e1ec]" : "text-[#e4e1ec]"}`}>
                    {s.title}
                    {s.flagship && (
                      <span className="ml-3 text-[9px] font-semibold px-2 py-0.5 bg-[#c8622a] text-[#e4e1ec] tracking-[0.12em] uppercase align-middle">
                        Most Popular
                      </span>
                    )}
                  </h3>
                  <p className={`text-sm leading-relaxed mb-6 flex-1 ${s.accent ? "text-[#e4e1ec]/80" : "text-[#ddc1b5]/60"}`}>
                    {s.desc}
                  </p>
                  <span className={`inline-flex items-center gap-1.5 text-xs font-semibold group-hover:gap-3 transition-all duration-300 ${s.accent ? "text-[#e4e1ec]" : "text-[#c8622a]"}`}>
                    Learn more <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>

                {/* Background image — subtle */}
                {s.wide && (
                  <div className="absolute inset-0 opacity-10 group-hover:opacity-15 transition-opacity duration-500">
                    <Image src={s.image} alt={s.title} fill className="object-cover" />
                  </div>
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

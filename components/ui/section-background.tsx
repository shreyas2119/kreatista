"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface SectionBackgroundProps {
  imageUrl: string;
  overlay?: "light" | "medium" | "dark";
  blur?: boolean;
}

export function SectionBackground({ 
  imageUrl, 
  overlay = "dark",
  blur = false 
}: SectionBackgroundProps) {
  const overlayOpacity = {
    light: "bg-[#0f1419]/60",
    medium: "bg-[#0f1419]/75",
    dark: "bg-[#0f1419]/85"
  };

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Background Image */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <Image
          src={imageUrl}
          alt="Background"
          fill
          sizes="100vw"
          className={`object-cover ${blur ? "blur-sm" : ""}`}
          priority
          quality={90}
        />
      </motion.div>

      {/* Gradient Overlay */}
      <div className={`absolute inset-0 ${overlayOpacity[overlay]}`} />
      
      {/* Noise Texture for premium feel */}
      <div 
        className="absolute inset-0 opacity-[0.015] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}

// Preset backgrounds for different sections
export const backgroundPresets = {
  hero: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&q=80", // Team collaboration
  services: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&q=80", // Analytics dashboard
  portfolio: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&q=80", // Data charts
  team: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80", // Creative team
  cta: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1920&q=80", // Laptop workspace
  content: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1920&q=80", // Content creation
  social: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1920&q=80", // Social media
  growth: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&q=80", // Growth charts
};

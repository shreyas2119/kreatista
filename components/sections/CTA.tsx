"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useContactModal } from "@/components/providers/contact-modal";
import { SectionBackground, backgroundPresets } from "@/components/ui/section-background";

export default function CTA() {
  const { openCalendly } = useContactModal();

  return (
    <section className="relative py-20 sm:py-32 px-5 sm:px-8 lg:px-16 bg-[#0e0e15] overflow-hidden">
      {/* Background Image */}
      <SectionBackground 
        imageUrl={backgroundPresets.cta} 
        overlay="dark"
        blur={true}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-5xl sm:text-7xl lg:text-8xl font-semibold text-[#F8F8FF] leading-none tracking-[-0.04em] mb-8 font-heading">
            Ready to build your{" "}
            <span
              className="bg-clip-text text-transparent inline-block"
              style={{
                backgroundImage: "linear-gradient(135deg, #ffffff 0%, #60a5fa 25%, #a78bfa 50%, #ec4899 75%, #ffffff 100%)",
                backgroundSize: "200% 200%",
                animation: "shimmer 3s ease-in-out infinite"
              }}
            >
              Powerhouse?
            </span>
          </h2>

          <style>{`
            @keyframes shimmer {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
          `}</style>

          <p className="text-base sm:text-xl text-[#B8C5D6]/60 mb-10 max-w-xl mx-auto leading-relaxed font-body">
            Limited availability for partnerships. Let's discuss your vision before someone else does.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => openCalendly()}
              className="px-10 py-5 bg-[#E5E4E2] text-[#0f1419] text-base font-extrabold hover:bg-[#D0CFD0] hover:text-[#0f1419] transition-colors shadow-2xl shadow-[#E5E4E2]/20 rounded-lg font-heading"
            >
              Get Started
            </motion.button>
            <Link href="/portfolio">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 text-[#F8F8FF] text-base font-extrabold flex items-center justify-center gap-2 hover:bg-white/[0.05] transition-colors border border-[#F8F8FF]/10 cursor-pointer rounded-lg font-heading"
              >
                View Portfolio ↗
              </motion.span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}



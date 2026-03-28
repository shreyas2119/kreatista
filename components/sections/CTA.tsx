"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useContactModal } from "@/components/providers/contact-modal";

export default function CTA() {
  const { open: openModal } = useContactModal();

  return (
    <section className="py-20 sm:py-32 px-5 sm:px-8 lg:px-16 bg-[#0e0e15]">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold text-[#e4e1ec] leading-none tracking-[-0.04em] mb-8">
            Ready to build your{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #c8622a 0%, #e8956a 50%, #c8622a 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Powerhouse?
            </span>
          </h2>

          <p className="text-base sm:text-xl text-[#ddc1b5]/60 mb-10 max-w-xl mx-auto leading-relaxed">
            Limited availability for partnerships. Let's discuss your vision before someone else does.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => openModal()}
              className="px-10 py-5 bg-[#c8622a] text-[#e4e1ec] text-base font-bold hover:bg-[#b5561f] transition-colors shadow-2xl shadow-[#c8622a]/20"
            >
              Get Started
            </motion.button>
            <Link href="/portfolio">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 text-[#e4e1ec] text-base font-bold flex items-center justify-center gap-2 hover:bg-white/[0.05] transition-colors border border-[#e4e1ec]/10 cursor-pointer"
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


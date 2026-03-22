"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ButtonWithIcon from "@/components/ui/button-with-icon";
import { ContactFormModal } from "@/components/ui/contact-form-modal";

export default function CTA() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="py-24 px-4">
        <div className="relative max-w-3xl mx-auto">
          {/* pulsing glow ring behind card */}
          <motion.div
            className="pointer-events-none absolute -inset-1 rounded-3xl bg-violet-500/20 blur-2xl"
            animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.02, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative rounded-2xl bg-gradient-to-br from-violet-600/25 via-violet-500/10 to-zinc-900 border border-violet-500/30 p-12 text-center overflow-hidden"
          >
            {/* inner shimmer */}
            <motion.div
              className="pointer-events-none absolute inset-0"
              animate={{ backgroundPosition: ["200% 0%", "-200% 0%"] }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              style={{
                background:
                  "linear-gradient(105deg, transparent 40%, rgba(139,92,246,0.08) 50%, transparent 60%)",
                backgroundSize: "200% 100%",
              }}
            />

            <h2 className="relative text-3xl sm:text-4xl font-bold mb-4">
              Ready to Grow Your Brand?
            </h2>
            <p className="relative text-zinc-400 mb-8 text-base">
              Let&apos;s build a content engine that works while you sleep.
            </p>

            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative inline-block"
            >
              <ButtonWithIcon 
                className="bg-violet-500 hover:bg-violet-600 text-white text-base h-14"
                onClick={() => setIsModalOpen(true)}
              >
                Book a Free Strategy Call
              </ButtonWithIcon>
            </motion.div>

            <p className="relative mt-5 text-sm text-zinc-600">No commitment. Just a conversation.</p>
          </motion.div>
        </div>
      </section>

      <ContactFormModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  );
}

"use client";

import { motion } from "framer-motion";
import { useContactModal } from "@/components/providers/contact-modal";
import FaqList from "@/components/ui/faq-list";
import { homeFaqs } from "@/lib/faqs";

export default function FAQ() {
  const { openContactForm } = useContactModal();

  return (
    <section id="faq" className="py-20 sm:py-32 px-5 sm:px-8 lg:px-16 bg-[#13131a]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-16">

          {/* Left — heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2"
          >
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#E5E4E2] mb-3 font-body">FAQ</p>
            <h2 className="text-4xl sm:text-5xl font-semibold text-[#F8F8FF] tracking-[-0.03em] leading-tight mb-4 font-heading">
              Frequently Asked Questions
            </h2>
            <p className="text-[#B8C5D6]/50 text-sm leading-relaxed font-body mb-8">
              Quick answers to what most brands ask before working with us.
            </p>
            <button
              onClick={() => openContactForm()}
              className="text-sm font-medium text-[#B8C5D6]/60 hover:text-[#E5E4E2] transition-colors font-body underline underline-offset-4 decoration-[#B8C5D6]/20 hover:decoration-[#E5E4E2]/40"
            >
              Still have questions? Contact us
            </button>
          </motion.div>

          {/* Right — answers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-3"
          >
            <FaqList items={homeFaqs} />
          </motion.div>

        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";

const clients = ["LUMIN", "HYPERLINK", "FLOWSTATE", "VELOCITY", "MAVEN", "NEXUS"];

export default function LogoStrip() {
  return (
    <section className="bg-[#1b1b22] py-12 px-5 sm:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <p className="text-center text-[#ddc1b5]/30 text-[10px] font-medium tracking-[0.2em] uppercase mb-8">
          Trusted by industry leaders in D2C, SaaS &amp; Creator Economy
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-16">
          {clients.map((name, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="text-xl sm:text-2xl font-extrabold text-[#e4e1ec]/20 tracking-[-0.03em] hover:text-[#e4e1ec]/40 transition-colors duration-300 cursor-default"
            >
              {name}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

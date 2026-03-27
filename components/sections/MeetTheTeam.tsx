"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { teamPreview } from "@/lib/team";

export default function MeetTheTeam() {
  return (
    <section className="py-20 sm:py-32 px-5 sm:px-8 lg:px-16 bg-[#1b1b22]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16"
        >
          <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-[#c8622a] mb-3">
            Our Team
          </p>
          <h2
            className="text-4xl sm:text-6xl font-black tracking-[-0.04em] leading-none text-[#e4e1ec]"
            style={{ fontFamily: "var(--font-epilogue)" }}
          >
            The Minds Behind Kreatista
          </h2>
        </motion.div>

        {/* Preview cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10 sm:mb-12">
          {teamPreview.map((member, i) => (
            <motion.div
              key={member.name + i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="bg-[#13131a] p-6 group hover:bg-[#2a2931] transition-colors duration-300"
            >
              {/* Photo / initials */}
              <div className="aspect-square w-full mb-5 overflow-hidden bg-[#2a2931] group-hover:bg-[#34343c] transition-colors duration-300 relative">
                {member.photo ? (
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    className="object-cover grayscale"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span
                      className="text-4xl font-black text-[#e4e1ec]/20"
                      style={{ fontFamily: "var(--font-epilogue)" }}
                    >
                      {member.name.split(" ").map((n) => n[0]).join("").toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
              <p
                className="text-base font-black text-[#e4e1ec] tracking-[-0.02em]"
                style={{ fontFamily: "var(--font-epilogue)" }}
              >
                {member.name}
              </p>
              <p className="text-xs text-[#ddc1b5]/50 mt-1">{member.role}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center"
        >
          <Link href="/team">
            <motion.span
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#c8622a] text-[#e4e1ec] text-sm font-bold hover:bg-[#b5561f] transition-colors cursor-pointer"
              style={{ fontFamily: "var(--font-epilogue)" }}
            >
              Connect with the Team
              <ArrowRight className="w-4 h-4" />
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

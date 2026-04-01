"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

function FloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 15 * position} -${189 + i * 18}C-${380 - i * 15 * position} -${189 + i * 18} -${312 - i * 15 * position} ${216 - i * 18} ${152 - i * 15 * position} ${343 - i * 18}C${616 - i * 15 * position} ${470 - i * 18} ${684 - i * 15 * position} ${875 - i * 18} ${684 - i * 15 * position} ${875 - i * 18}`,
    width: 0.8 + i * 0.15,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg
        className="w-full h-full text-[#E5E4E2]"
        viewBox="0 0 696 316"
        fill="none"
      >
        <title>Background Paths</title>
        {paths.map((path) => (
          <path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.1 + path.id * 0.015}
            style={{
              animation: `pathPulse ${20 + (path.id % 5) * 2}s ease-in-out ${path.id * 0.3}s infinite`,
            }}
          />
        ))}
      </svg>
    </div>
  );
}

export default function MeetTheTeam() {
  const title = "The Minds Behind SocioryX";
  const words = title.split(" ");

  return (
    <section id="team" className="relative py-20 sm:py-32 px-5 sm:px-8 lg:px-16 bg-[#0a0a0f] overflow-hidden">
      {/* Wallpaper Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/images/bg/team.webp')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-[#0a0a0f]/85" />
      </div>
      
      {/* Animated background paths */}
      <div className="absolute inset-0 opacity-60 z-[1]">
        <style>{`@keyframes pathPulse { 0%,100%{opacity:0.4} 50%{opacity:0.8} }`}</style>
        <FloatingPaths position={1} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#E5E4E2] mb-6 font-body">
            Our Team
          </p>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-[-0.04em] leading-none mb-6 font-heading">
            {words.map((word, wordIndex) => (
              <span
                key={wordIndex}
                className="inline-block mr-3 last:mr-0"
              >
                {word.split("").map((letter, letterIndex) => {
                  const isLastWord = wordIndex === words.length - 1;
                  const isLastLetter = letterIndex === word.length - 1;
                  const isRedX = isLastWord && isLastLetter;
                  return (
                    <motion.span
                      key={`${wordIndex}-${letterIndex}`}
                      initial={{ y: 50, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: wordIndex * 0.1 + letterIndex * 0.02,
                        type: "spring",
                        stiffness: 150,
                        damping: 25,
                      }}
                      className={isRedX ? "inline-block text-red-500" : "inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#F8F8FF] to-[#B8C5D6]"}
                    >
                      {isRedX ? "X" : letter}
                    </motion.span>
                  );
                })}
              </span>
            ))}
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-base sm:text-lg text-[#B8C5D6] leading-relaxed max-w-2xl mx-auto font-body"
          >
            A team of strategists and creators focused on delivering meaningful digital outcomes.
We go beyond execution bringing clarity, consistency, and care to everything build.

          </motion.p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
            <Link href="/team">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#E5E4E2] text-[#0f1419] text-base font-extrabold hover:bg-[#D0CFD0] hover:text-[#0f1419] transition-colors cursor-pointer shadow-lg shadow-[#E5E4E2]/20 font-heading"
            >
              Meet the Team
              <ArrowRight className="w-5 h-5" />
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}



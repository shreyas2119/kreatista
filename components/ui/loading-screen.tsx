"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Only show once per session
    const seen = sessionStorage.getItem("socioryx_intro_seen");
    if (seen) { setVisible(false); return; }

    // Skip on slow connections or data-saver mode
    const nav = navigator as Navigator & { connection?: { effectiveType?: string; saveData?: boolean } };
    const conn = nav.connection;
    if (conn && (conn.saveData || conn.effectiveType === "slow-2g" || conn.effectiveType === "2g")) {
      setVisible(false);
      sessionStorage.setItem("socioryx_intro_seen", "1");
      return;
    }

    // Animate progress bar — dismiss immediately when it hits 100
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = p + 2;
        if (next >= 100) {
          clearInterval(interval);
          setVisible(false);
          sessionStorage.setItem("socioryx_intro_seen", "1");
          return 100;
        }
        return next;
      });
    }, 60);

    return () => { clearInterval(interval); };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] bg-[#0f1419] flex flex-col items-center justify-center"
        >
          {/* Brand name */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="text-center"
          >
            <h1 className="text-6xl sm:text-8xl font-semibold tracking-[-0.04em] text-[#F8F8FF] font-heading leading-none">
              Sociory<span className="text-red-500">X</span>
            </h1>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.55 }}
            className="mt-5 text-xs sm:text-sm tracking-[0.22em] uppercase text-[#F8F8FF] font-body italic"
          >
            Raise Yourself as an Extraordinary
          </motion.p>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.4 }}
            className="mt-14 w-48 h-px bg-[#E5E4E2]/10 overflow-hidden"
          >
            <motion.div
              className="h-full bg-[#E5E4E2]/50"
              style={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

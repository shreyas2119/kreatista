"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function Cursor() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);

  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);

  const dotX = useSpring(mx, { stiffness: 1000, damping: 50 });
  const dotY = useSpring(my, { stiffness: 1000, damping: 50 });
  const ringX = useSpring(mx, { stiffness: 120, damping: 18 });
  const ringY = useSpring(my, { stiffness: 120, damping: 18 });

  useEffect(() => {
    setMounted(true);

    const move = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      setVisible(true);
    };
    const down = () => setClicking(true);
    const up = () => setClicking(false);
    const checkHover = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      setHovering(!!el.closest("a, button, [role='button'], input, textarea, select, label"));
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mousemove", checkHover);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    window.addEventListener("mouseleave", () => setVisible(false));
    window.addEventListener("mouseenter", () => setVisible(true));

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousemove", checkHover);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, [mx, my]);

  if (!mounted) return null;

  return (
    <>
      {/* outer ring */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full border border-amber-500/60"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          boxShadow: "0 0 20px rgba(245,158,11,0.4), 0 0 40px rgba(245,158,11,0.2)",
        }}
        animate={{
          width: hovering ? 48 : clicking ? 28 : 36,
          height: hovering ? 48 : clicking ? 28 : 36,
          opacity: visible ? 1 : 0,
          borderColor: hovering ? "rgba(245,158,11,1)" : "rgba(245,158,11,0.5)",
          backgroundColor: hovering ? "rgba(245,158,11,0.12)" : "rgba(245,158,11,0)",
          boxShadow: hovering 
            ? "0 0 30px rgba(245,158,11,0.6), 0 0 60px rgba(245,158,11,0.3), 0 0 90px rgba(245,158,11,0.1)"
            : "0 0 20px rgba(245,158,11,0.4), 0 0 40px rgba(245,158,11,0.2)",
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      />

      {/* inner dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full bg-amber-500"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          boxShadow: "0 0 10px rgba(245,158,11,0.8), 0 0 20px rgba(245,158,11,0.4)",
          filter: "brightness(1.2)",
        }}
        animate={{
          width: clicking ? 6 : hovering ? 6 : 6,
          height: clicking ? 6 : hovering ? 6 : 6,
          opacity: visible ? (hovering ? 0 : 1) : 0,
          scale: clicking ? 0.5 : 1,
        }}
        transition={{ duration: 0.15, ease: "easeOut" }}
      />
    </>
  );
}

"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      className={`fixed bottom-24 right-5 sm:bottom-8 sm:right-8 z-50 w-10 h-10 rounded-full bg-[#E5E4E2]/10 border border-[#E5E4E2]/15 backdrop-blur-sm flex items-center justify-center text-[#E5E4E2]/60 hover:bg-[#E5E4E2]/20 hover:text-[#E5E4E2] transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <ArrowUp className="w-4 h-4" />
    </button>
  );
}

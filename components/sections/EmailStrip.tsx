"use client";

import { Mail } from "lucide-react";

export default function EmailStrip() {
  return (
    <section className="bg-[#0f1419] border-t border-[#F8F8FF]/[0.06] py-16 px-5 sm:px-8 lg:px-16 text-center">
      <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#B8C5D6]/50 mb-4 font-body">
        Get in touch
      </p>
      <a
        href="mailto:work@socioryx.com"
        className="group inline-flex items-center justify-center"
        aria-label="Mail us at work@socioryx.com"
      >
        <span className="text-2xl sm:text-3xl lg:text-4xl font-semibold font-heading tracking-[-0.03em] text-[#F8F8FF] group-hover:text-[#E5E4E2] transition-colors duration-300 break-all sm:break-normal">
          work@socioryx.com
        </span>
      </a>
    </section>
  );
}

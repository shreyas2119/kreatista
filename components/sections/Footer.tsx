"use client";

import { useContactModal } from "@/components/providers/contact-modal";

export default function Footer() {
  const { openContactForm } = useContactModal();
  
  const cols = [
    {
      heading: "Agency",
      links: ["Portfolio", "Services", "Careers"],
    },
    {
      heading: "Connect",
      links: ["LinkedIn", "Instagram", "X", "Newsletter"],
    },
    {
      heading: "Legal",
      links: ["Privacy", "Terms"],
    },
  ];

  return (
    <footer className="bg-[#0f1419] border-t border-[#F8F8FF]/[0.06] px-5 sm:px-8 lg:px-16 pt-16 pb-10">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <span className="text-lg font-extrabold text-[#F8F8FF] tracking-[-0.02em] block mb-3">
              SOCIO<span className="text-[#E5E4E2]">RYX</span>
            </span>
            <p className="text-xs text-[#B8C5D6]/40 leading-relaxed max-w-[180px] mb-4">
              Architecting digital dominance for the next generation of industry leaders.
            </p>
            <button
              onClick={() => openContactForm()}
              className="text-xs font-extrabold text-[#0f1419] bg-[#E5E4E2] hover:bg-[#D0CFD0] px-4 py-2 rounded transition-colors font-heading"
            >
              Contact Us
            </button>
          </div>

          {/* Link columns */}
          {cols.map((col) => (
            <div key={col.heading}>
              <p className="text-xs font-extrabold text-[#F8F8FF] tracking-[0.1em] uppercase mb-4">{col.heading}</p>
              <div className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="text-xs text-[#B8C5D6]/40 hover:text-[#F8F8FF] hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#F8F8FF]/[0.06] pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <p className="text-xs text-[#B8C5D6]/30 font-body">© 2025 Socioryx Agency. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="text-xs text-[#B8C5D6]/20 font-body">Based in India</span>
            <span className="text-xs text-[#B8C5D6]/20 font-body">Global Production</span>
          </div>
        </div>
      </div>
    </footer>
  );
}


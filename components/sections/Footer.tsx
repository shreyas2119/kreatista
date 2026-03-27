export default function Footer() {
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
    <footer className="bg-[#13131a] border-t border-[#e4e1ec]/[0.06] px-5 sm:px-8 lg:px-16 pt-16 pb-10">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <span className="text-lg font-extrabold text-[#e4e1ec] tracking-[-0.02em] block mb-3">
              SOCIO<span className="text-[#c8622a]">RYX</span>
            </span>
            <p className="text-xs text-[#ddc1b5]/40 leading-relaxed max-w-[180px]">
              Architecting digital dominance for the next generation of industry leaders.
            </p>
          </div>

          {/* Link columns */}
          {cols.map((col) => (
            <div key={col.heading}>
              <p className="text-xs font-bold text-[#e4e1ec] tracking-[0.1em] uppercase mb-4">{col.heading}</p>
              <div className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="text-xs text-[#ddc1b5]/40 hover:text-[#e4e1ec] hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#e4e1ec]/[0.06] pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <p className="text-xs text-[#ddc1b5]/30">© 2026 Socioryx Agency. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="text-xs text-[#ddc1b5]/20">Based in India</span>
            <span className="text-xs text-[#ddc1b5]/20">Global Production</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

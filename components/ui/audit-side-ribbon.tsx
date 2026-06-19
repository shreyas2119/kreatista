import Link from "next/link";
import { Sparkles } from "lucide-react";

export function AuditSideRibbon() {
  return (
    <Link
      href="/free-ai-marketing-audit"
      className="fixed right-0 top-[60%] md:top-1/2 -translate-y-1/2 z-40 group"
    >
      <div className="flex items-center gap-2 bg-[#E5E4E2] text-[#0f1419] px-2 py-4 rounded-l-lg shadow-xl shadow-black/30 hover:bg-[#D0CFD0] transition-all duration-300 hover:pr-5 hover:shadow-2xl hover:shadow-black/40 cursor-pointer animate-ribbon"
        style={{ writingMode: "vertical-rl" }}
      >
        <Sparkles className="w-4 h-4 shrink-0" style={{ writingMode: "horizontal-tb" }} />
        <span className="text-xs font-heading font-extrabold tracking-[0.15em] uppercase whitespace-nowrap">
          Free Audit
        </span>
      </div>
    </Link>
  );
}

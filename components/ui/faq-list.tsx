import { ChevronDown } from "lucide-react";
import type { Faq } from "@/lib/faqs";

// Native <details> so answers are in the server HTML for crawlers, not only after hydration.
export default function FaqList({ items }: { items: Faq[] }) {
  return (
    <div className="w-full">
      {items.map((item) => (
        <details key={item.q} className="group border-b border-[#F8F8FF]/[0.06]">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left text-base font-medium text-[#F8F8FF]/90 font-body [&::-webkit-details-marker]:hidden">
            {item.q}
            <ChevronDown className="h-4 w-4 flex-shrink-0 text-[#B8C5D6]/50 transition-transform duration-200 group-open:rotate-180" />
          </summary>
          <p className="pb-5 pr-8 text-[15px] leading-relaxed text-[#B8C5D6]/60 font-body">{item.a}</p>
        </details>
      ))}
    </div>
  );
}

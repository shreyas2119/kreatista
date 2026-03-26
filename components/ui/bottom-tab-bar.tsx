"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Briefcase, FolderOpen } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { label: "Home",      href: "/",          icon: Home },
  { label: "Services",  href: "/services",  icon: Briefcase },
  { label: "Portfolio", href: "/portfolio", icon: FolderOpen },
];

export function BottomTabBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#13131a]/90 backdrop-blur-xl border-t border-[#e4e1ec]/[0.08]">
      <div className="flex items-stretch">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = pathname === tab.href;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "flex-1 flex flex-col items-center justify-center gap-1 py-3 transition-colors duration-200",
                isActive ? "text-[#c8622a]" : "text-[#ddc1b5]/40 hover:text-[#ddc1b5]/70"
              )}
            >
              <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 1.5} />
              <span
                className="text-[10px] font-bold tracking-wide"
                style={{ fontFamily: "var(--font-epilogue)" }}
              >
                {tab.label}
              </span>
              {isActive && (
                <span className="absolute bottom-0 w-8 h-0.5 bg-[#c8622a] rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

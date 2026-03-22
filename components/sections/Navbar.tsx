"use client";

import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <span className="text-lg font-bold text-foreground tracking-tight">
          Creati<span className="text-violet-500">Social</span>
        </span>
        <Button variant="outline" size="sm">
          Book a Call
        </Button>
      </div>
    </header>
  );
}

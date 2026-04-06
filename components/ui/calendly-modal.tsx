"use client";

import { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CalendlyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialSubject?: string;
}

// Only mount iframe when modal is first opened — never preload
let iframeLoaded = false;

export function CalendlyModal({ open, onOpenChange, initialSubject }: CalendlyModalProps) {
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/your-username/30min";
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (open && !iframeLoaded) {
      iframeLoaded = true;
      setMounted(true);
    } else if (open) {
      setMounted(true);
    }
  }, [open]);

  const url = new URL(calendlyUrl);
  if (initialSubject) url.searchParams.set("a1", initialSubject);
  const finalUrl = `${url.toString()}?embed_type=Inline&hide_event_type_details=0&hide_gdpr_banner=1`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] w-[1400px] h-[90dvh] sm:h-[95vh] overflow-hidden p-0 flex flex-col">
        <DialogHeader className="px-4 sm:px-6 pt-4 sm:pt-6 pb-3 sm:pb-4 flex-shrink-0">
          <DialogTitle className="text-xl sm:text-2xl">Let&apos;s Talk</DialogTitle>
          <DialogDescription>
            {initialSubject
              ? `Let's discuss: ${initialSubject}`
              : "Choose a time that works best for you. We'll send you a calendar invite with all the details."}
          </DialogDescription>
        </DialogHeader>

        <div ref={containerRef} className="flex-1 w-full px-1 sm:px-2 pb-1 sm:pb-2 overflow-hidden">
          {mounted && (
            <iframe
              src={finalUrl}
              width="100%"
              height="100%"
              frameBorder="0"
              title="Schedule a call"
              style={{ border: "none", display: "block", height: "100%", minHeight: 0 }}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

// No-op export kept for backwards compatibility — preloading removed for performance
export function CalendlyPreloader() {
  return null;
}


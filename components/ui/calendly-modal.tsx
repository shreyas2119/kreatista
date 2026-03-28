"use client";

import { InlineWidget } from "react-calendly";
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

export function CalendlyModal({ open, onOpenChange, initialSubject }: CalendlyModalProps) {
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/your-username/30min";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] w-[1400px] h-[95vh] overflow-hidden p-0 flex flex-col">
        <DialogHeader className="px-6 pt-6 pb-4 flex-shrink-0">
          <DialogTitle className="text-2xl">Book a Call</DialogTitle>
          <DialogDescription>
            {initialSubject 
              ? `Let's discuss: ${initialSubject}` 
              : "Choose a time that works best for you. We'll send you a calendar invite with all the details."}
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 w-full px-2 pb-2 min-h-[700px]">
          <InlineWidget
            url={calendlyUrl}
            styles={{
              height: "100%",
              width: "100%",
              minHeight: "700px",
            }}
            pageSettings={{
              hideEventTypeDetails: false,
              hideLandingPageDetails: false,
            }}
            utm={{
              utmSource: "website",
              utmMedium: "modal",
            }}
            prefill={{
              customAnswers: initialSubject ? {
                a1: initialSubject,
              } : undefined,
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

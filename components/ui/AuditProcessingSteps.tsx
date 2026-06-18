"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  id: string;
  label: string;
}

interface AuditProcessingStepsProps {
  steps: Step[];
  currentStepIndex: number;
  isComplete: boolean;
  className?: string;
}

export function AuditProcessingSteps({
  steps,
  currentStepIndex,
  isComplete,
  className,
}: AuditProcessingStepsProps) {
  return (
    <div className={cn("space-y-5", className)}>
      {steps.map((step, index) => {
        const isActive = index === currentStepIndex && !isComplete;
        const isDone = index < currentStepIndex || (isComplete && index === steps.length - 1);

        return (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{
              opacity: isDone || isActive ? 1 : 0.3,
              x: 0,
            }}
            transition={{
              duration: 0.5,
              delay: isDone ? 0 : Math.min(index * 0.15, 0.6),
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex items-center gap-4"
          >
            <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
              {isDone ? (
                <motion.div
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                </motion.div>
              ) : isActive ? (
                <Loader2 className="w-5 h-5 text-[#E5E4E2] animate-spin" />
              ) : (
                <div className="w-5 h-5 rounded-full border-2 border-[#1a1f26]" />
              )}
            </div>
            <span
              className={cn(
                "text-base font-body transition-colors duration-300",
                isDone
                  ? "text-[#F8F8FF]"
                  : isActive
                    ? "text-[#E5E4E2]"
                    : "text-[#B8C5D6]/40"
              )}
            >
              {step.label}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}

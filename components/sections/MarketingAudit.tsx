"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, ArrowRight, CheckCircle2, Send, Sparkles } from "lucide-react";
import { useContactModal } from "@/components/providers/contact-modal";
import { ScoreRing, CategoryScore } from "@/components/ui/ScoreRing";
import { AuditProcessingSteps } from "@/components/ui/AuditProcessingSteps";
import { SectionBackground, backgroundPresets } from "@/components/ui/section-background";
import { cn } from "@/lib/utils";

const processingSteps = [
  { id: "crawl", label: "Crawling Website" },
  { id: "seo", label: "Analyzing SEO Structure" },
  { id: "content", label: "Evaluating Content Quality" },
  { id: "conversion", label: "Reviewing Conversion Opportunities" },
  { id: "branding", label: "Assessing Brand Positioning" },
  { id: "recommendations", label: "Generating Growth Recommendations" },
];

type AuditState = "input" | "loading" | "preview" | "capture" | "success" | "error";

interface PreviewData {
  score: number;
  scores: { seo: number; content: number; branding: number; conversion: number };
  findings: { type: "positive" | "warning"; text: string }[];
}

export default function MarketingAudit() {
  const { openCalendly } = useContactModal();
  const sectionRef = useRef<HTMLElement>(null);

  const [auditState, setAuditState] = useState<AuditState>("input");
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [preview, setPreview] = useState<PreviewData | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const TOTAL_ANIMATION_MS = 10000;
  const STEP_INTERVAL = Math.floor(TOTAL_ANIMATION_MS / processingSteps.length);

  // Simulate processing steps with even distribution
  const startProcessing = useCallback(() => {
    setAuditState("loading");
    setCurrentStep(0);
    setError("");

    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < processingSteps.length) {
        setCurrentStep(step);
      } else {
        clearInterval(interval);
      }
    }, STEP_INTERVAL);

    return interval;
  }, []);

  const fastForwardToEnd = useCallback((interval: ReturnType<typeof setInterval>) => {
    clearInterval(interval);
    setCurrentStep(processingSteps.length - 1);
  }, []);

  const handleAnalyze = useCallback(async () => {
    if (!url.trim()) {
      setError("Please enter a website URL");
      return;
    }

    const normalized = url.trim().startsWith("http") ? url.trim() : `https://${url.trim()}`;
    try {
      new URL(normalized);
    } catch {
      setError("Please enter a valid URL");
      return;
    }

    setError("");
    const interval = startProcessing();

    try {
      const response = await fetch("/api/audit/preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: normalized }),
      });

      fastForwardToEnd(interval);

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to analyze website");
      }

      const data = await response.json();
      setPreview(data.preview);
      setAuditState("preview");
    } catch (err) {
      clearInterval(interval);
      const message = err instanceof Error ? err.message : "Something went wrong";
      setError(message);
      setAuditState("error");
    }
  }, [url, startProcessing, fastForwardToEnd]);

  const handleSendReport = useCallback(() => {
    if (!name.trim() || !email.trim()) {
      setError("Please fill in all fields");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email");
      return;
    }

    setError("");

    const normalized = url.trim().startsWith("http") ? url.trim() : `https://${url.trim()}`;

    // Fire report generation in background — user sees success immediately
    fetch("/api/audit/report", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: normalized, name: name.trim(), email: email.trim() }),
    }).catch((err) => {
      console.error("Background report generation failed:", err);
    });

    setAuditState("success");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [name, email, url]);

  const handleReset = useCallback(() => {
    setAuditState("input");
    setUrl("");
    setError("");
    setPreview(null);
    setName("");
    setEmail("");
    setCurrentStep(0);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="marketing-audit"
      className="relative py-20 sm:py-32 px-5 sm:px-8 lg:px-16 bg-[#0f1419] overflow-hidden"
    >
      <SectionBackground imageUrl={backgroundPresets.services} overlay="dark" blur={false} />

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-medium tracking-[0.2em] uppercase text-[#E5E4E2] mb-3 font-body"
          >
            Free AI-Powered Analysis
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-semibold text-[#F8F8FF] leading-none tracking-[-0.04em] mb-4 font-heading"
          >
            Get Your Free AI Marketing Audit
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-base sm:text-xl text-[#B8C5D6]/60 max-w-xl mx-auto leading-relaxed font-body"
          >
            Discover your biggest growth opportunities in under 60 seconds.
          </motion.p>
        </div>

        <AnimatePresence mode="wait">
          {/* INPUT STATE */}
          {auditState === "input" && (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-2xl mx-auto"
            >
              <div className="bg-[#151a21] rounded-xl p-6 sm:p-8 border border-[#F8F8FF]/5">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#B8C5D6]/40" />
                    <input
                      type="url"
                      placeholder="https://example.com"
                      value={url}
                      onChange={(e) => { setUrl(e.target.value); setError(""); }}
                      onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
                      className="w-full pl-12 pr-4 py-4 bg-[#0f1419] border border-[#F8F8FF]/10 rounded-lg text-[#F8F8FF] placeholder-[#B8C5D6]/30 font-body text-base focus:outline-none focus:border-[#E5E4E2]/40 transition-colors"
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAnalyze}
                    className="px-8 py-4 bg-[#E5E4E2] text-[#0f1419] text-base font-heading font-extrabold hover:bg-[#D0CFD0] transition-all duration-200 flex items-center justify-center gap-2 rounded-lg whitespace-nowrap shadow-lg shadow-[#E5E4E2]/20"
                  >
                    Analyze My Website
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm font-body mt-3"
                  >
                    {error}
                  </motion.p>
                )}
              </div>
            </motion.div>
          )}

          {/* LOADING STATE */}
          {auditState === "loading" && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-lg mx-auto"
            >
              <div className="bg-[#151a21] rounded-xl p-8 sm:p-10 border border-[#F8F8FF]/5">
                <div className="flex items-center gap-3 mb-8">
                  <Sparkles className="w-5 h-5 text-[#E5E4E2]" />
                  <span className="text-sm font-body text-[#B8C5D6]/60">
                    AI analyzing{" "}
                    <span className="text-[#E5E4E2]">{url}</span>
                  </span>
                </div>
                <AuditProcessingSteps
                  steps={processingSteps}
                  currentStepIndex={currentStep}
                  isComplete={false}
                />
              </div>
            </motion.div>
          )}

          {/* PREVIEW STATE */}
          {auditState === "preview" && preview && (
            <motion.div
              key="preview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-3xl mx-auto"
            >
              <div className="bg-[#151a21] rounded-xl p-6 sm:p-10 border border-[#F8F8FF]/5">
                {/* Score */}
                <div className="flex flex-col items-center mb-10">
                  <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#B8C5D6]/40 mb-4 font-body">
                    Overall Marketing Score
                  </p>
                  <div className="relative">
                    <ScoreRing score={preview.score} size={180} strokeWidth={8} />
                  </div>
                </div>

                {/* Top Findings */}
                <div className="mb-10">
                  <h3 className="text-lg font-heading font-semibold text-[#F8F8FF] mb-4">
                    Top 3 Findings
                  </h3>
                  <div className="space-y-3">
                    {preview.findings.map((finding, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * i, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="flex items-start gap-3 p-3 rounded-lg bg-[#0f1419]"
                      >
                        <span className="flex-shrink-0 mt-0.5">
                          {finding.type === "positive" ? (
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                          ) : (
                            <span className="text-yellow-500 text-lg leading-none">⚠</span>
                          )}
                        </span>
                        <p className="text-sm font-body text-[#B8C5D6] leading-relaxed">
                          {finding.text}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Category Scores */}
                <div className="mb-10">
                  <h3 className="text-lg font-heading font-semibold text-[#F8F8FF] mb-5">
                    Category Scores
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <CategoryScore label="SEO" score={preview.scores.seo} />
                    <CategoryScore label="Content" score={preview.scores.content} />
                    <CategoryScore label="Branding" score={preview.scores.branding} />
                    <CategoryScore label="Conversion" score={preview.scores.conversion} />
                  </div>
                </div>

                {/* Lead Capture Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="bg-[#0f1419] rounded-xl p-6 sm:p-8 border border-[#F8F8FF]/10"
                >
                  <h3 className="text-2xl font-heading font-semibold text-[#F8F8FF] mb-2">
                    Where should we send your complete marketing audit?
                  </h3>
                  <p className="text-sm font-body text-[#B8C5D6]/60 mb-6 leading-relaxed">
                    Your full report includes detailed SEO insights, conversion opportunities,
                    content recommendations, branding analysis, and a 30-day growth roadmap.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 mb-4">
                    <input
                      type="text"
                      name="name"
                      autoComplete="name"
                      placeholder="Full Name"
                      value={name}
                      onChange={(e) => { setName(e.target.value); setError(""); }}
                      className="flex-1 px-4 py-3.5 bg-[#151a21] border border-[#F8F8FF]/10 rounded-lg text-[#F8F8FF] placeholder-[#B8C5D6]/30 font-body text-base focus:outline-none focus:border-[#E5E4E2]/40 transition-colors"
                    />
                    <input
                      type="email"
                      name="email"
                      autoComplete="email"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setError(""); }}
                      className="flex-1 px-4 py-3.5 bg-[#151a21] border border-[#F8F8FF]/10 rounded-lg text-[#F8F8FF] placeholder-[#B8C5D6]/30 font-body text-base focus:outline-none focus:border-[#E5E4E2]/40 transition-colors"
                    />
                  </div>

                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-sm font-body mb-3"
                    >
                      {error}
                    </motion.p>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSendReport}
                    className="w-full px-8 py-4 bg-[#E5E4E2] text-[#0f1419] text-base font-heading font-extrabold hover:bg-[#D0CFD0] transition-all duration-200 flex items-center justify-center gap-2 rounded-lg shadow-lg shadow-[#E5E4E2]/20"
                  >
                    Send My Full Report
                    <Send className="w-4 h-4" />
                  </motion.button>

                  <p className="text-xs font-body text-[#B8C5D6]/30 text-center mt-4">
                    No spam. No sales pressure. Just actionable marketing insights
                    delivered directly to your inbox.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* SUCCESS STATE */}
          {auditState === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-lg mx-auto text-center"
            >
              <div className="bg-[#151a21] rounded-xl p-10 border border-[#F8F8FF]/5">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                  className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                </motion.div>

                <h3 className="text-2xl font-heading font-semibold text-[#F8F8FF] mb-3">
                  We&apos;re Generating Your Audit!
                </h3>
                <p className="text-sm font-body text-[#B8C5D6]/60 mb-2 leading-relaxed">
                  Your comprehensive marketing audit report is being generated and will be sent to
                </p>
                <p className="text-base font-heading font-medium text-[#E5E4E2] mb-8">
                  {email}
                </p>
                <p className="text-sm font-body text-[#B8C5D6]/40 mb-10 leading-relaxed">
                  Expect it in your inbox within 2–3 minutes. Check your spam folder if it doesn&apos;t arrive.
                </p>

                <div className="space-y-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => openCalendly()}
                    className="w-full px-8 py-4 bg-[#E5E4E2] text-[#0f1419] text-base font-heading font-extrabold hover:bg-[#D0CFD0] transition-all duration-200 rounded-lg shadow-lg shadow-[#E5E4E2]/20"
                  >
                    Book a Free Strategy Call
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleReset}
                    className="w-full px-8 py-4 border border-[#F8F8FF]/10 text-[#B8C5D6] text-base font-heading font-medium hover:bg-white/[0.04] transition-all duration-200 rounded-lg"
                  >
                    Analyze Another Website
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

          {/* ERROR STATE */}
          {auditState === "error" && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-lg mx-auto text-center"
            >
              <div className="bg-[#151a21] rounded-xl p-10 border border-[#F8F8FF]/5">
                <p className="text-red-400 font-body text-sm mb-4">{error || "Something went wrong"}</p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleReset}
                  className="px-8 py-3 bg-[#E5E4E2] text-[#0f1419] text-base font-heading font-extrabold hover:bg-[#D0CFD0] transition-all duration-200 rounded-lg"
                >
                  Try Again
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Trust bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap justify-center items-center gap-6 mt-10 text-xs font-body text-[#B8C5D6]/30"
        >
          <span>✓ AI-Powered Analysis</span>
          <span className="hidden sm:inline">·</span>
          <span>✓ No Credit Card Required</span>
          <span className="hidden sm:inline">·</span>
          <span>✓ 60-Second Scan</span>
        </motion.div>
      </div>
    </section>
  );
}

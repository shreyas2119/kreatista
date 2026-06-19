"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ArrowUpRight, Lightbulb, Target, BarChart3, TrendingUp, Palette, MessageSquare, Video, Zap, type LucideIcon } from "lucide-react";
import { useContactModal } from "@/components/providers/contact-modal";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import { ScoreRing, CategoryScore } from "@/components/ui/ScoreRing";
import { cn } from "@/lib/utils";

interface AuditReport {
  executiveSummary: string;
  scores: { seo: number; content: number; branding: number; conversion: number };
  overallScore: number;
  findings: { type: string; text: string }[];
  seoAnalysis: Record<string, string>;
  conversionAnalysis: Record<string, string>;
  brandAnalysis: Record<string, string>;
  contentAnalysis: Record<string, string>;
  socialMediaPresence: string;
  videoOpportunities: string;
  quickWins: string[];
  growthRoadmap: { next7Days: string; next30Days: string; next90Days: string };
}

interface ReportData {
  id: string;
  website: string;
  report_json: AuditReport;
  score: number;
  created_at: string;
}

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const, delay },
  };
}

function SectionCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      {...fadeUp()}
      className={cn("bg-[#151a21] rounded-xl p-6 sm:p-8 border border-[#F8F8FF]/5", className)}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({ icon: Icon, title }: { icon: LucideIcon; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="w-10 h-10 bg-[#E5E4E2]/10 rounded-lg flex items-center justify-center">
        <Icon className="w-5 h-5 text-[#E5E4E2]" />
      </div>
      <h2 className="text-xl sm:text-2xl font-heading font-semibold text-[#F8F8FF] tracking-[-0.02em]">
        {title}
      </h2>
    </div>
  );
}

function AnalysisItem({ label, content }: { label: string; content: string }) {
  return (
    <div className="py-4 border-b border-[#F8F8FF]/5 last:border-b-0">
      <h4 className="text-xs font-medium tracking-[0.12em] uppercase text-[#B8C5D6]/40 mb-2 font-body">
        {label}
      </h4>
      <p className="text-sm font-body text-[#B8C5D6] leading-relaxed">{content}</p>
    </div>
  );
}

function ServiceCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="p-4 bg-[#0f1419] rounded-lg border border-[#F8F8FF]/5">
      <h4 className="text-sm font-heading font-semibold text-[#F8F8FF] mb-1">{title}</h4>
      <p className="text-xs font-body text-[#B8C5D6]/60">{desc}</p>
    </div>
  );
}

const servicesList = [
  { title: "Website Development", desc: "High-performance websites built for conversion" },
  { title: "Content Marketing", desc: "Strategy-driven content that engages and converts" },
  { title: "Social Media Management", desc: "End-to-end social presence across all platforms" },
  { title: "Video Production", desc: "Professional video content for every channel" },
  { title: "Influencer Marketing", desc: "Strategic brand-influencer collaborations" },
];

export function ReportClient({ report }: { report: ReportData }) {
  const { openCalendly, openContactForm } = useContactModal();
  const data: AuditReport = report.report_json;

  return (
    <>
      <Navbar />
      <main className="bg-[#0f1419] min-h-screen pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-16">
          {/* Header */}
          <motion.div {...fadeUp()} className="text-center mb-12">
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#E5E4E2] mb-3 font-body">
              AI Marketing Audit
            </p>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-semibold text-[#F8F8FF] leading-none tracking-[-0.04em] mb-4">
              Marketing Audit Report
            </h1>
            <p className="text-sm sm:text-base font-body text-[#B8C5D6]/60">
              Website analyzed:{" "}
              <a
                href={report.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#E5E4E2] hover:underline"
              >
                {report.website}
              </a>
            </p>
            <p className="text-xs font-body text-[#B8C5D6]/30 mt-1">
              Generated on {new Date(report.created_at).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </motion.div>

          {/* Overall Score */}
          <SectionCard className="text-center mb-6">
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#B8C5D6]/40 mb-6 font-body">
              Overall Marketing Score
            </p>
            <div className="flex justify-center">
              <div className="relative">
                <ScoreRing score={data.overallScore} size={200} strokeWidth={10} />
              </div>
            </div>
          </SectionCard>

          {/* Executive Summary */}
          <SectionCard className="mb-6">
            <SectionHeading icon={MessageSquare} title="Executive Summary" />
            <p className="text-sm sm:text-base font-body text-[#B8C5D6] leading-relaxed whitespace-pre-line">
              {data.executiveSummary}
            </p>
          </SectionCard>

          {/* Category Scores */}
          <SectionCard className="mb-6">
            <SectionHeading icon={BarChart3} title="Score Breakdown" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <CategoryScore label="SEO" score={data.scores.seo} />
              <CategoryScore label="Content" score={data.scores.content} />
              <CategoryScore label="Branding" score={data.scores.branding} />
              <CategoryScore label="Conversion" score={data.scores.conversion} />
            </div>
          </SectionCard>

          {/* Top Findings */}
          {data.findings.length > 0 && (
            <SectionCard className="mb-6">
              <SectionHeading icon={Target} title="Key Findings" />
              <div className="space-y-3">
                {data.findings.map((finding, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-[#0f1419] rounded-lg">
                    <span className="flex-shrink-0 mt-0.5">
                      {finding.type === "positive" ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      ) : (
                        <span className="text-yellow-500 text-lg leading-none">⚠</span>
                      )}
                    </span>
                    <p className="text-sm font-body text-[#B8C5D6] leading-relaxed">{finding.text}</p>
                  </div>
                ))}
              </div>
            </SectionCard>
          )}

          {/* SEO Analysis */}
          <SectionCard className="mb-6">
            <SectionHeading icon={TrendingUp} title="SEO Analysis" />
            <div className="divide-y divide-[#F8F8FF]/5">
              <AnalysisItem label="Page Title" content={data.seoAnalysis.pageTitle} />
              <AnalysisItem label="Meta Description" content={data.seoAnalysis.metaDescription} />
              <AnalysisItem label="Heading Structure" content={data.seoAnalysis.headingStructure} />
              <AnalysisItem label="Internal Linking" content={data.seoAnalysis.internalLinking} />
              <AnalysisItem label="Image Alt Tags" content={data.seoAnalysis.imageAltTags} />
              <AnalysisItem label="Content Depth" content={data.seoAnalysis.contentDepth} />
              <AnalysisItem label="Technical SEO" content={data.seoAnalysis.technicalSeo} />
            </div>
          </SectionCard>

          {/* Conversion Analysis */}
          <SectionCard className="mb-6">
            <SectionHeading icon={Zap} title="Conversion Analysis" />
            <div className="divide-y divide-[#F8F8FF]/5">
              <AnalysisItem label="CTA Placement" content={data.conversionAnalysis.ctaPlacement} />
              <AnalysisItem label="CTA Clarity" content={data.conversionAnalysis.ctaClarity} />
              <AnalysisItem label="Trust Signals" content={data.conversionAnalysis.trustSignals} />
              <AnalysisItem label="Testimonials" content={data.conversionAnalysis.testimonials} />
              <AnalysisItem label="Social Proof" content={data.conversionAnalysis.socialProof} />
              <AnalysisItem label="Contact Accessibility" content={data.conversionAnalysis.contactAccessibility} />
              <AnalysisItem label="Lead Generation" content={data.conversionAnalysis.leadGeneration} />
            </div>
          </SectionCard>

          {/* Brand Analysis */}
          <SectionCard className="mb-6">
            <SectionHeading icon={Palette} title="Brand Analysis" />
            <div className="divide-y divide-[#F8F8FF]/5">
              <AnalysisItem label="Positioning Clarity" content={data.brandAnalysis.positioningClarity} />
              <AnalysisItem label="Unique Value Proposition" content={data.brandAnalysis.uniqueValueProposition} />
              <AnalysisItem label="Messaging Consistency" content={data.brandAnalysis.messagingConsistency} />
              <AnalysisItem label="Audience Targeting" content={data.brandAnalysis.audienceTargeting} />
              <AnalysisItem label="Brand Differentiation" content={data.brandAnalysis.brandDifferentiation} />
            </div>
          </SectionCard>

          {/* Content Analysis */}
          <SectionCard className="mb-6">
            <SectionHeading icon={MessageSquare} title="Content Analysis" />
            <div className="divide-y divide-[#F8F8FF]/5">
              <AnalysisItem label="Readability" content={data.contentAnalysis.readability} />
              <AnalysisItem label="Content Quality" content={data.contentAnalysis.contentQuality} />
              <AnalysisItem label="Content Depth" content={data.contentAnalysis.contentDepth} />
              <AnalysisItem label="Engagement Potential" content={data.contentAnalysis.engagementPotential} />
              <AnalysisItem label="Audience Relevance" content={data.contentAnalysis.audienceRelevance} />
            </div>
          </SectionCard>

          {/* Social Media */}
          <SectionCard className="mb-6">
            <SectionHeading icon={Target} title="Social Media Presence" />
            <p className="text-sm font-body text-[#B8C5D6] leading-relaxed whitespace-pre-line">
              {data.socialMediaPresence}
            </p>
          </SectionCard>

          {/* Video Opportunities */}
          <SectionCard className="mb-6">
            <SectionHeading icon={Video} title="Video Content Opportunities" />
            <p className="text-sm font-body text-[#B8C5D6] leading-relaxed whitespace-pre-line">
              {data.videoOpportunities}
            </p>
          </SectionCard>

          {/* Quick Wins */}
          <SectionCard className="mb-6">
            <SectionHeading icon={Lightbulb} title="Quick Wins" />
            <ol className="space-y-3 list-decimal list-inside">
              {data.quickWins.map((win, i) => (
                <motion.li
                  key={i}
                  {...fadeUp(i * 0.05)}
                  className="text-sm font-body text-[#B8C5D6] leading-relaxed pl-2"
                >
                  {win}
                </motion.li>
              ))}
            </ol>
          </SectionCard>

          {/* Growth Roadmap */}
          <SectionCard className="mb-6">
            <SectionHeading icon={TrendingUp} title="30-Day Growth Roadmap" />
            <div className="space-y-6">
              <div>
                <h4 className="text-base font-heading font-semibold text-[#E5E4E2] mb-2">Next 7 Days</h4>
                <p className="text-sm font-body text-[#B8C5D6] leading-relaxed">{data.growthRoadmap.next7Days}</p>
              </div>
              <div>
                <h4 className="text-base font-heading font-semibold text-[#E5E4E2] mb-2">Next 30 Days</h4>
                <p className="text-sm font-body text-[#B8C5D6] leading-relaxed">{data.growthRoadmap.next30Days}</p>
              </div>
              <div>
                <h4 className="text-base font-heading font-semibold text-[#E5E4E2] mb-2">Next 90 Days</h4>
                <p className="text-sm font-body text-[#B8C5D6] leading-relaxed">{data.growthRoadmap.next90Days}</p>
              </div>
            </div>
          </SectionCard>

          {/* Final CTA */}
          <SectionCard className="text-center border-[#E5E4E2]/20">
            <motion.div {...fadeUp()}>
              <h2 className="text-2xl sm:text-3xl font-heading font-semibold text-[#F8F8FF] mb-3 tracking-[-0.02em]">
                Need help implementing these recommendations?
              </h2>
              <p className="text-sm font-body text-[#B8C5D6]/60 mb-8 max-w-lg mx-auto leading-relaxed">
                Socioryx is a full-service growth agency. We help brands turn audit
                insights into real results.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-10 text-left max-w-3xl mx-auto">
                {servicesList.map((service) => (
                  <ServiceCard key={service.title} title={service.title} desc={service.desc} />
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => openCalendly()}
                  className="px-10 py-5 bg-[#E5E4E2] text-[#0f1419] text-lg font-heading font-extrabold hover:bg-[#D0CFD0] transition-colors shadow-2xl shadow-[#E5E4E2]/20 rounded-lg"
                >
                  Book a Free Strategy Call
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => openContactForm("Marketing Audit Inquiry")}
                  className="inline-flex items-center gap-2 px-10 py-5 text-[#F8F8FF] text-lg font-heading font-extrabold hover:bg-white/[0.05] transition-colors border border-[#F8F8FF]/10 rounded-lg"
                >
                  Contact Socioryx <ArrowUpRight className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          </SectionCard>
        </div>
      </main>
      <Footer />
    </>
  );
}

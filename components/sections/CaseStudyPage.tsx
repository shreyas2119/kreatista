import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CheckCircle2 } from "lucide-react";
import type { CaseStudy } from "@/lib/case-studies";

export default function CaseStudyPage({ study }: { study: CaseStudy }) {
  return (
    <main className="bg-[#0f1419] min-h-screen">
      <section className="pt-32 pb-16 px-5 sm:px-8 lg:px-16">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm text-[#B8C5D6]/50 hover:text-[#B8C5D6] transition-colors mb-8 group font-body"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            All work
          </Link>
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#E5E4E2] mb-4 font-body">
            {study.industry}
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#F8F8FF] tracking-[-0.04em] leading-[1.05] mb-5 font-heading">
            {study.client}
          </h1>
          <p className="text-lg text-[#B8C5D6]/70 leading-relaxed font-body">{study.headline}</p>
        </div>
      </section>

      <section className="px-5 sm:px-8 lg:px-16 pb-24">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl overflow-hidden border border-[#F8F8FF]/[0.07] bg-[#151a21] mb-10">
            <img src={study.image} alt={study.alt} className="w-full h-auto" loading="lazy" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-12">
            {study.stats.map((stat) => (
              <div key={stat.label} className="bg-[#151a21] border border-[#F8F8FF]/[0.06] rounded-xl p-5">
                <p className="text-2xl font-semibold text-[#F8F8FF] font-heading">{stat.value}</p>
                <p className="text-xs text-[#B8C5D6]/50 font-body mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="space-y-12">
            <div>
              <h2 className="text-2xl font-semibold text-[#F8F8FF] tracking-[-0.03em] mb-4 font-heading">
                The problem
              </h2>
              <p className="text-[#B8C5D6]/70 leading-relaxed font-body">{study.problem}</p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-[#F8F8FF] tracking-[-0.03em] mb-4 font-heading">
                What shipped
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {study.built.map((item) => (
                  <li key={item} className="flex items-start gap-3 bg-[#151a21] border border-[#F8F8FF]/[0.06] rounded-xl p-4">
                    <CheckCircle2 className="w-4 h-4 text-[#E5E4E2] flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-[#F8F8FF]/80 font-body leading-relaxed">{item}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#151a21] border border-[#F8F8FF]/[0.07] rounded-2xl p-8">
              <p className="text-sm font-semibold text-[#F8F8FF] font-heading mb-2">See it live</p>
              <p className="text-sm text-[#B8C5D6]/55 font-body leading-relaxed mb-5">
                Built in custom code, mobile-first, and measured from launch.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={study.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-[#E5E4E2] text-[#0f1419] text-sm font-extrabold uppercase tracking-widest rounded-lg font-heading hover:bg-[#D0CFD0] transition-colors"
                >
                  Visit {study.client}
                  <ArrowUpRight className="w-4 h-4" />
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center px-5 py-3 border border-[#F8F8FF]/[0.08] text-[#B8C5D6]/60 text-sm rounded-lg font-body hover:bg-white/[0.04] hover:text-[#E5E4E2] transition-all"
                >
                  Start a project
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

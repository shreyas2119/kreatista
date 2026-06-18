import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase";
import { ReportClient } from "./ReportClient";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
}

export const revalidate = 0;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const { data: report } = await supabaseAdmin
    .from("reports")
    .select("website, score")
    .eq("id", id)
    .single();

  if (!report) return { title: "Report Not Found | Socioryx" };

  return {
    title: `Marketing Audit: ${report.website} | Socioryx`,
    description: `Marketing audit report for ${report.website} — Score: ${report.score}/100`,
    robots: { index: false, follow: true },
  };
}

export default async function ReportPage({ params }: Props) {
  const { id } = await params;

  const { data: report, error } = await supabaseAdmin
    .from("reports")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !report) {
    notFound();
  }

  return <ReportClient report={report} />;
}

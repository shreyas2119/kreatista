"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Search, Mail, RefreshCw, ChevronLeft, ChevronRight } from "lucide-react";

interface Lead {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  subject: string;
  message: string;
  status?: string;
  created_at: string;
}

const SERVICES = ["all", "Website Design & Dev", "Product Marketing", "Content Creation", "Social Media", "Influencer Collabs", "Video Production"];

const STATUS_OPTIONS = ["new", "contacted", "qualified", "closed"];
const STATUS_COLORS: Record<string, string> = {
  new:        "bg-blue-500/10 text-blue-400 border-blue-500/20",
  contacted:  "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  qualified:  "bg-green-500/10 text-green-400 border-green-500/20",
  closed:     "bg-[#1a1f26] text-[#B8C5D6]/40 border-[#F8F8FF]/[0.06]",
};

export default function LeadsDashboard() {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [service, setService] = useState("all");
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page), service });
    if (search) params.set("search", search);
    const res = await fetch(`/api/leads?${params}`);
    if (res.status === 401) { router.replace("/itachi-7x9k/login"); return; }
    const data = await res.json();
    setLeads(data.leads ?? []);
    setTotal(data.total ?? 0);
    setLoading(false);
  }, [page, service, search, router]);

  useEffect(() => { fetchLeads(); }, [fetchLeads]);

  const updateStatus = async (id: string, status: string) => {
    await fetch("/api/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    setLeads((prev) => prev.map((l) => l.id === id ? { ...l, status } : l));
  };

  const totalPages = Math.ceil(total / 20);

  return (
    <main className="min-h-screen bg-[#0f1419] px-5 sm:px-8 lg:px-16 py-16">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <Link href="/itachi-7x9k/blog" className="inline-flex items-center gap-2 text-xs text-[#B8C5D6]/40 hover:text-[#B8C5D6] transition-colors mb-3 font-body">
              <ArrowLeft className="w-3 h-3" /> Blog
            </Link>
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#E5E4E2] mb-1 font-body">Admin</p>
            <h1 className="text-3xl font-semibold text-[#F8F8FF] font-heading">Leads</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-[#B8C5D6]/40 font-body">{total} total</span>
            <button onClick={fetchLeads} className="p-2 text-[#B8C5D6]/40 hover:text-[#E5E4E2] transition-colors cursor-pointer">
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#B8C5D6]/30" />
            <input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") { setSearch(searchInput); setPage(1); } }}
              placeholder="Search name or email..."
              className="w-full bg-[#151a21] border border-[#F8F8FF]/[0.08] rounded-lg pl-9 pr-4 py-2.5 text-sm text-[#F8F8FF] placeholder:text-[#B8C5D6]/20 focus:outline-none focus:border-[#E5E4E2]/30 transition-colors font-body"
            />
          </div>
          {/* Service filter */}
          <select
            value={service}
            onChange={(e) => { setService(e.target.value); setPage(1); }}
            className="bg-[#151a21] border border-[#F8F8FF]/[0.08] rounded-lg px-4 py-2.5 text-sm text-[#F8F8FF] focus:outline-none focus:border-[#E5E4E2]/30 transition-colors font-body cursor-pointer"
          >
            {SERVICES.map((s) => (
              <option key={s} value={s}>{s === "all" ? "All Services" : s}</option>
            ))}
          </select>
        </div>

        {/* Table */}
        <div className="bg-[#151a21] border border-[#F8F8FF]/[0.06] rounded-xl overflow-hidden">
          {loading ? (
            <div className="py-20 text-center text-[#B8C5D6]/30 text-sm font-body">Loading...</div>
          ) : leads.length === 0 ? (
            <div className="py-20 text-center text-[#B8C5D6]/30 text-sm font-body">No leads found.</div>
          ) : (
            <div className="divide-y divide-[#F8F8FF]/[0.04]">
              {leads.map((lead) => (
                <div key={lead.id}>
                  {/* Row */}
                  <div
                    className="flex items-center gap-4 px-5 py-4 hover:bg-[#F8F8FF]/[0.02] transition-colors cursor-pointer"
                    onClick={() => setExpanded(expanded === lead.id ? null : lead.id)}
                  >
                    {/* Avatar */}
                    <div className="w-8 h-8 rounded-full bg-[#1a1f26] border border-[#F8F8FF]/[0.06] flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-semibold text-[#E5E4E2]/50 font-heading">
                        {lead.first_name.charAt(0).toUpperCase()}
                      </span>
                    </div>

                    {/* Name + email */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#F8F8FF] font-heading truncate">
                        {lead.first_name} {lead.last_name}
                      </p>
                      <p className="text-xs text-[#B8C5D6]/40 font-body truncate">{lead.email}</p>
                    </div>

                    {/* Service tag */}
                    <span className="hidden sm:block text-[10px] px-2 py-0.5 bg-[#1a1f26] text-[#B8C5D6]/40 rounded font-body tracking-wide uppercase flex-shrink-0">
                      {lead.subject}
                    </span>

                    {/* Status */}
                    <select
                      value={lead.status ?? "new"}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => updateStatus(lead.id, e.target.value)}
                      className={`text-[10px] px-2 py-1 rounded border font-body uppercase tracking-wide cursor-pointer focus:outline-none flex-shrink-0 ${STATUS_COLORS[lead.status ?? "new"]}`}
                      style={{ background: "transparent" }}
                    >
                      {STATUS_OPTIONS.map((s) => <option key={s} value={s} style={{ background: "#151a21", color: "#F8F8FF" }}>{s}</option>)}
                    </select>

                    {/* Date */}
                    <span className="hidden md:block text-xs text-[#B8C5D6]/25 font-body flex-shrink-0">
                      {new Date(lead.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </span>

                    {/* Email link */}
                    <a
                      href={`mailto:${lead.email}`}
                      onClick={(e) => e.stopPropagation()}
                      className="p-1.5 text-[#B8C5D6]/30 hover:text-[#E5E4E2] transition-colors flex-shrink-0"
                      title="Send email"
                    >
                      <Mail className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  {/* Expanded message */}
                  {expanded === lead.id && (
                    <div className="px-5 pb-5 pt-1 bg-[#0f1419]/40">
                      <p className="text-xs text-[#B8C5D6]/35 font-body uppercase tracking-wider mb-2">Message</p>
                      <p className="text-sm text-[#B8C5D6]/65 font-body leading-relaxed whitespace-pre-wrap">{lead.message}</p>
                      <p className="text-xs text-[#B8C5D6]/25 font-body mt-3">
                        {new Date(lead.created_at).toLocaleString("en-IN", { dateStyle: "long", timeStyle: "short" })}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6">
            <span className="text-xs text-[#B8C5D6]/30 font-body">Page {page} of {totalPages}</span>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 text-[#B8C5D6]/40 hover:text-[#E5E4E2] disabled:opacity-30 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-2 text-[#B8C5D6]/40 hover:text-[#E5E4E2] disabled:opacity-30 transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}

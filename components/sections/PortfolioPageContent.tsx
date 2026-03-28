"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, BarChart2, Video, ArrowRight } from "lucide-react";
import { useAuth } from "@/components/providers/auth-provider";
import { AuthModal } from "@/components/ui/auth-modal";
import type { User } from "firebase/auth";

const highlights = [
  {
    icon: BarChart2,
    title: "D2C Success Metrics",
    desc: "Real ROAS data and scaling strategies used for our top clients.",
  },
  {
    icon: Video,
    title: "Production Workflow",
    desc: "How we produce high-converting video assets in under 7 days.",
  },
];

// Background grid images — using your local images
const bgImages = [
  "/images/web.webp",
  "/images/social.webp",
  "/images/video.webp",
  "/images/content.webp",
];

export default function PortfolioPageContent() {
  const { user } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const openPortfolio = async (u: User) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid: u.uid, email: u.email }),
      });
      const data = await res.json();
      if (data.url) {
        window.open(data.url, "_blank", "noopener,noreferrer");
      } else {
        setError("Could not load portfolio. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAccess = () => {
    if (user) {
      openPortfolio(user);
    } else {
      setAuthOpen(true);
    }
  };

  return (
    <>
      <section className="min-h-screen pt-20 pb-16 px-5 sm:px-8 lg:px-16 flex items-center justify-center relative overflow-hidden">
        {/* Blurred background grid */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none grid grid-cols-2 md:grid-cols-4 gap-3 p-3 grayscale blur-sm">
          {bgImages.map((src, i) => (
            <div key={i} className="relative overflow-hidden rounded-xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>

        {/* Mesh gradient overlay */}
        <div className="absolute inset-0 z-[1]"
          style={{
            background: "radial-gradient(at 0% 0%, rgba(200,98,42,0.05) 0, transparent 50%), radial-gradient(at 100% 100%, rgba(200,98,42,0.04) 0, transparent 50%)",
          }}
        />

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 w-full max-w-5xl grid md:grid-cols-2 overflow-hidden shadow-2xl border border-[#F8F8FF]/[0.07]"
        >
          {/* Left — context */}
          <div className="p-10 md:p-14 flex flex-col justify-center bg-[#1f1f26]">
            <div className="mb-8">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#E5E4E2]/10 text-[#E5E4E2] text-xs font-medium tracking-widest uppercase mb-5 font-body">
                <Lock className="w-3 h-3" />
                Exclusive Access
              </span>
              <h1
                className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-[-0.04em] leading-[0.9] text-[#F8F8FF] mb-5 font-heading"
              >
                Unlock Our{" "}
                <span className="text-[#E5E4E2] italic font-accent">Portfolio</span>{" "}
                PDF
              </h1>
              <p className="text-[#B8C5D6]/60 text-base leading-relaxed max-w-md font-body">
                Sign in to access our exclusive case studies, results for D2C/SaaS brands, and a deep dive into our video production process.
              </p>
            </div>

            <div className="space-y-5">
              {highlights.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#1a1f26] flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-[#E5E4E2]" />
                    </div>
                    <div>
                      <h3 className="text-[#F8F8FF] font-medium text-sm mb-0.5 font-heading">
                        {item.title}
                      </h3>
                      <p className="text-xs text-[#B8C5D6]/50 leading-relaxed font-body">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right — access gate */}
          <div className="p-10 md:p-14 bg-[#0f1419] flex flex-col justify-center">
            {user ? (
              // Already signed in — show direct access
              <div className="text-center">
                <div className="w-14 h-14 bg-[#E5E4E2]/10 flex items-center justify-center mx-auto mb-5">
                  <Lock className="w-6 h-6 text-[#E5E4E2]" />
                </div>
                <h2 className="text-xl font-semibold text-[#F8F8FF] mb-2 font-heading">
                  Welcome back
                </h2>
                <p className="text-sm text-[#B8C5D6]/50 mb-7 font-body">
                  Signed in as <span className="text-[#F8F8FF]">{user.email}</span>
                </p>
                {error && <p className="text-red-400 text-xs mb-4 font-body">{error}</p>}
                <button
                  onClick={handleAccess}
                  disabled={loading}
                  className="w-full py-4 bg-[#E5E4E2] text-[#0f1419] font-extrabold text-sm uppercase tracking-widest hover:bg-[#D0CFD0] hover:text-[#0f1419] transition-colors disabled:opacity-50 flex items-center justify-center gap-2 group font-heading"
                >
                  {loading ? "Opening..." : "Open Portfolio"}
                  {!loading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                </button>
              </div>
            ) : (
              // Not signed in — prompt
              <div>
                <h2 className="text-2xl font-semibold text-[#F8F8FF] mb-2 tracking-[-0.02em] font-heading">
                  Gain Access
                </h2>
                <p className="text-sm text-[#B8C5D6]/50 mb-8 leading-relaxed font-body">
                  Create a free account or sign in to instantly view our portfolio deck in a new tab.
                </p>

                <div className="space-y-4 mb-8">
                  {["Real client results & case studies", "Video production breakdown", "D2C & SaaS growth playbooks"].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-xs text-[#B8C5D6]/60 font-body">
                      <div className="w-1 h-1 rounded-full bg-[#E5E4E2] flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>

                {error && <p className="text-red-400 text-xs mb-4 font-body">{error}</p>}

                <button
                  onClick={handleAccess}
                  className="w-full py-4 bg-[#E5E4E2] text-[#0f1419] font-extrabold text-sm uppercase tracking-widest hover:bg-[#D0CFD0] hover:text-[#0f1419] transition-colors flex items-center justify-center gap-2 group shadow-xl shadow-[#E5E4E2]/10 font-heading"
                >
                  Gain Access
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <p className="text-center text-xs text-[#B8C5D6]/30 mt-4 font-body">
                  By signing in, you agree to our{" "}
                  <a href="#" className="text-[#E5E4E2] hover:underline">Privacy Policy</a>.
                  We never spam.
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </section>

      <AuthModal
        open={authOpen}
        onOpenChange={setAuthOpen}
        onSuccess={(u) => {
          setAuthOpen(false);
          openPortfolio(u);
        }}
      />
    </>
  );
}




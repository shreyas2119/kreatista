"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, ArrowRight } from "lucide-react";
import { useAuth } from "@/components/providers/auth-provider";
import { AuthModal } from "@/components/ui/auth-modal";
import type { User } from "firebase/auth";
import { getIdToken } from "firebase/auth";

export default function PortfolioPageContent() {
  const { user } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const openPortfolio = async (u: User) => {
    setLoading(true);
    setError("");
    try {
      const idToken = await getIdToken(u, true);
      const res = await fetch("/api/portfolio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${idToken}`,
        },
        body: JSON.stringify({}),
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
      <section className="min-h-screen flex items-center justify-center px-5 sm:px-8 relative overflow-hidden">
        {/* subtle background glow */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(229,228,226,0.04) 0, transparent 70%)" }}
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 w-full max-w-md text-center"
        >
          {/* Lock icon */}
          <div className="w-14 h-14 bg-[#1a1f26] border border-[#F8F8FF]/[0.08] flex items-center justify-center mx-auto mb-8">
            <Lock className="w-6 h-6 text-[#E5E4E2]" />
          </div>

          <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#E5E4E2] mb-4 font-body">
            Our Work
          </p>

          <h1 className="text-4xl sm:text-5xl font-semibold tracking-[-0.04em] leading-none text-[#F8F8FF] mb-4 font-heading">
            Portfolio
          </h1>

          <p className="text-[#B8C5D6]/60 text-base leading-relaxed mb-10 font-body">
            To view our portfolio, you need to sign in first.
          </p>

          {error && <p className="text-red-400 text-xs mb-4 font-body">{error}</p>}

          {user ? (
            <div>
              <p className="text-sm text-[#B8C5D6]/50 mb-6 font-body">
                Signed in as <span className="text-[#F8F8FF]">{user.email}</span>
              </p>
              <button
                onClick={handleAccess}
                disabled={loading}
                className="w-full py-4 bg-[#E5E4E2] text-[#0f1419] font-extrabold text-sm uppercase tracking-widest hover:bg-[#D0CFD0] transition-colors disabled:opacity-50 flex items-center justify-center gap-2 group font-heading"
              >
                {loading ? "Opening..." : "Open Portfolio"}
                {!loading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
              </button>
            </div>
          ) : (
            <button
              onClick={handleAccess}
              className="w-full py-4 bg-[#E5E4E2] text-[#0f1419] font-extrabold text-sm uppercase tracking-widest hover:bg-[#D0CFD0] transition-colors flex items-center justify-center gap-2 group shadow-xl shadow-[#E5E4E2]/10 font-heading"
            >
              Sign In to View
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          )}
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

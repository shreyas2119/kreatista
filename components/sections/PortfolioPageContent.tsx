"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Unlock, ArrowRight, LogOut, FileText, Clock } from "lucide-react";
import { useAuth } from "@/components/providers/auth-provider";
import { AuthModal } from "@/components/ui/auth-modal";
import type { User } from "firebase/auth";
import { getIdToken, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

const features = [
  { icon: FileText, label: "Real Results", desc: "Campaigns with actual numbers, not just visuals" },
  { icon: Clock,    label: "Always Current", desc: "Updated regularly with our latest work" },
];

export default function PortfolioPageContent() {
  const { user } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [prefetchedUrl, setPrefetchedUrl] = useState<string | null>(null);

  // Pre-fetch the signed URL as soon as user is authenticated
  // so clicking "Open Portfolio" is instant
  useEffect(() => {
    if (!user) { setPrefetchedUrl(null); return; }
    getIdToken(user, true).then((idToken) =>
      fetch("/api/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${idToken}` },
        body: JSON.stringify({}),
      })
    ).then((r) => r.json())
     .then((data) => { if (data.url) setPrefetchedUrl(data.url); })
     .catch(() => {}); // silent — will retry on click
  }, [user]);

  const openPortfolio = async (u: User) => {
    // Use prefetched URL if available — instant open
    if (prefetchedUrl) {
      window.location.href = prefetchedUrl;
      setPrefetchedUrl(null); // clear so next open fetches fresh URL
      return;
    }

    setLoading(true);
    setError("");
    try {
      const idToken = await getIdToken(u, true);
      const res = await fetch("/api/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${idToken}` },
        body: JSON.stringify({}),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
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
    if (user) openPortfolio(user);
    else setAuthOpen(true);
  };

  return (
    <>
      <section className="min-h-screen flex items-center justify-center px-5 sm:px-8 py-32 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 50% at 50% 40%, rgba(229,228,226,0.04) 0, transparent 70%)" }} />

        <div className="relative z-10 w-full max-w-4xl mx-auto">

          {/* Two-column layout on desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Left — copy */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#E5E4E2] mb-4 font-body">
                Our Work
              </p>
              <h1 className="text-4xl sm:text-5xl font-semibold tracking-[-0.04em] leading-[1.1] text-[#F8F8FF] mb-5 font-heading">
                See What We've Built
              </h1>
              <p className="text-[#B8C5D6]/60 text-base leading-relaxed mb-10 font-body">
                Our portfolio deck covers D2C brand campaigns, SaaS content strategies, and creator growth playbooks with real numbers.
              </p>

              {/* Feature list */}
              <div className="space-y-4">
                {features.map(({ icon: Icon, label, desc }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#1a1f26] border border-[#F8F8FF]/[0.06] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon className="w-3.5 h-3.5 text-[#E5E4E2]/60" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#F8F8FF] font-heading">{label}</p>
                      <p className="text-xs text-[#B8C5D6]/45 font-body mt-0.5">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right — auth card */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            >
              <div className="bg-[#151a21] border border-[#F8F8FF]/[0.07] rounded-2xl p-8 sm:p-10">

                {/* Lock / Unlock icon — animates on auth state */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={user ? "unlocked" : "locked"}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.25 }}
                    className="w-12 h-12 rounded-xl bg-[#1a1f26] border border-[#F8F8FF]/[0.08] flex items-center justify-center mb-6"
                  >
                    {user
                      ? <Unlock className="w-5 h-5 text-[#E5E4E2]" />
                      : <Lock className="w-5 h-5 text-[#E5E4E2]/60" />
                    }
                  </motion.div>
                </AnimatePresence>

                <AnimatePresence mode="wait">
                  {user ? (
                    <motion.div
                      key="signed-in"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25 }}
                    >
                      <h2 className="text-xl font-semibold text-[#F8F8FF] font-heading mb-1">
                        Ready to view
                      </h2>
                      <p className="text-sm text-[#B8C5D6]/45 font-body mb-6">
                        Signed in as <span className="text-[#B8C5D6]/70">{user.email}</span>
                      </p>

                      {error && <p className="text-red-400 text-xs mb-4 font-body">{error}</p>}

                      <button
                        onClick={handleAccess}
                        disabled={loading}
                        className="w-full py-3.5 bg-[#E5E4E2] text-[#0f1419] font-extrabold text-sm uppercase tracking-widest hover:bg-[#D0CFD0] transition-colors disabled:opacity-50 flex items-center justify-center gap-2 group font-heading rounded-lg cursor-pointer"
                      >
                        {loading ? "Opening..." : "Open Portfolio"}
                        {!loading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                      </button>

                      <button
                        onClick={() => signOut(auth)}
                        className="mt-3 w-full py-3 border border-[#F8F8FF]/[0.07] text-[#B8C5D6]/40 hover:text-[#B8C5D6]/70 hover:border-[#F8F8FF]/[0.12] text-sm transition-colors flex items-center justify-center gap-2 font-body rounded-lg cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        Sign Out
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="signed-out"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25 }}
                    >
                      <h2 className="text-xl font-semibold text-[#F8F8FF] font-heading mb-1">
                        One step away
                      </h2>
                      <p className="text-sm text-[#B8C5D6]/45 font-body mb-6">
                        Sign in to open the deck. Takes 10 seconds.
                      </p>

                      {error && <p className="text-red-400 text-xs mb-4 font-body">{error}</p>}

                      <button
                        onClick={handleAccess}
                        className="w-full py-3.5 bg-[#E5E4E2] text-[#0f1419] font-extrabold text-sm uppercase tracking-widest hover:bg-[#D0CFD0] transition-colors flex items-center justify-center gap-2 group font-heading rounded-lg cursor-pointer"
                      >
                        Sign In to View
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>

                      <p className="text-[10px] text-[#B8C5D6]/25 font-body text-center mt-4 leading-relaxed">
                        We only use your email to log portfolio access. No spam, ever.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

          </div>
        </div>
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

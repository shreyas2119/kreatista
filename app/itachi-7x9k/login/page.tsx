"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

const MAX_CLIENT_ATTEMPTS = 5;
const LOCKOUT_MS = 15 * 60 * 1000; // 15 min — mirrors server

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [lockedUntil, setLockedUntil] = useState<number | null>(null);
  const submitRef = useRef(false);

  const isLocked = lockedUntil !== null && Date.now() < lockedUntil;
  const remaining = MAX_CLIENT_ATTEMPTS - attempts;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prevent double-submit
    if (submitRef.current || loading) return;
    if (isLocked) return;

    submitRef.current = true;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/itachi-7x9k/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.replace("/itachi-7x9k/blog");
        return;
      }

      const newAttempts = attempts + 1;
      setAttempts(newAttempts);

      if (res.status === 429 || newAttempts >= MAX_CLIENT_ATTEMPTS) {
        const until = Date.now() + LOCKOUT_MS;
        setLockedUntil(until);
        setError("Too many attempts. Try again in 15 minutes.");
      } else {
        setError(`Incorrect password. ${MAX_CLIENT_ATTEMPTS - newAttempts} attempt${MAX_CLIENT_ATTEMPTS - newAttempts === 1 ? "" : "s"} remaining.`);
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
      submitRef.current = false;
      setPassword("");
    }
  };

  return (
    <main className="min-h-screen bg-[#0f1419] flex items-center justify-center px-5">
      <div className="w-full max-w-sm">
        <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#E5E4E2] mb-4 font-body text-center">Admin</p>
        <h1 className="text-3xl font-semibold text-[#F8F8FF] font-heading text-center mb-8">Sign In</h1>

        <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
          {/* Honeypot — bots fill this, humans don't */}
          <input
            type="text"
            name="username"
            tabIndex={-1}
            aria-hidden="true"
            className="hidden"
            autoComplete="off"
          />

          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            disabled={isLocked || loading}
            maxLength={200}
            autoComplete="current-password"
            className="w-full bg-[#151a21] border border-[#F8F8FF]/[0.08] rounded-lg px-4 py-3 text-[#F8F8FF] text-sm font-body placeholder:text-[#B8C5D6]/20 focus:outline-none focus:border-[#E5E4E2]/30 transition-colors disabled:opacity-40"
          />

          {error && (
            <p className="text-red-400 text-xs font-body">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || isLocked}
            className="w-full py-3 bg-[#E5E4E2] text-[#0f1419] text-sm font-extrabold font-heading rounded-lg hover:bg-[#D0CFD0] transition-colors disabled:opacity-50"
          >
            {loading ? "Signing in..." : isLocked ? "Locked" : "Sign In"}
          </button>
        </form>
      </div>
    </main>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/itachi-7x9k/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.replace("/itachi-7x9k/blog");
    } else {
      setError("Incorrect password.");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0f1419] flex items-center justify-center px-5">
      <div className="w-full max-w-sm">
        <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#E5E4E2] mb-4 font-body text-center">Admin</p>
        <h1 className="text-3xl font-semibold text-[#F8F8FF] font-heading text-center mb-8">Sign In</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Admin password"
            className="w-full bg-[#151a21] border border-[#F8F8FF]/[0.08] rounded-lg px-4 py-3 text-[#F8F8FF] text-sm font-body placeholder:text-[#B8C5D6]/20 focus:outline-none focus:border-[#E5E4E2]/30 transition-colors"
          />

          {error && <p className="text-red-400 text-xs font-body">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#E5E4E2] text-[#0f1419] text-sm font-extrabold font-heading rounded-lg hover:bg-[#D0CFD0] transition-colors disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </main>
  );
}

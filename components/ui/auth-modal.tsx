"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  type User,
} from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { Dialog } from "@/components/ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (user: User) => void;
}

export function AuthModal({ open, onOpenChange, onSuccess }: AuthModalProps) {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const reset = () => {
    setEmail("");
    setPassword("");
    setError("");
    setLoading(false);
  };

  const handleGoogle = async () => {
    if (loading) return; // prevent double-click / second popup
    setLoading(true);
    setError("");
    try {
      const result = await signInWithPopup(auth, googleProvider);
      onSuccess(result.user);
      onOpenChange(false);
    } catch (e: any) {
      if (e.code === "auth/cancelled-popup-request" || e.code === "auth/popup-closed-by-user") {
        // User closed the popup or triggered a second one — not an error
        return;
      }
      setError(e.message ?? "Google sign-in failed");
    } finally {
      setLoading(false);
    }
  };

  const handleEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const fn =
        mode === "signin"
          ? signInWithEmailAndPassword
          : createUserWithEmailAndPassword;
      const result = await fn(auth, email, password);
      onSuccess(result.user);
      onOpenChange(false);
      reset();
    } catch (e: any) {
      const msg: Record<string, string> = {
        "auth/user-not-found": "No account found. Sign up instead?",
        "auth/wrong-password": "Wrong password.",
        "auth/email-already-in-use": "Email already in use. Sign in instead?",
        "auth/weak-password": "Password must be at least 6 characters.",
        "auth/invalid-email": "Invalid email address.",
        "auth/invalid-credential": "Wrong email or password.",
      };
      setError(msg[e.code] ?? e.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={(v) => { onOpenChange(v); if (!v) reset(); }}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" />
        <DialogPrimitive.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-[#F8F8FF]/[0.08] bg-[#0f1419] p-8 shadow-2xl focus:outline-none">
          <DialogPrimitive.Title className="sr-only">
            {mode === "signin" ? "Sign in to view portfolio" : "Create an account"}
          </DialogPrimitive.Title>
          <DialogPrimitive.Description className="sr-only">
            {mode === "signin" ? "Sign in with Google or email to access the Socioryx portfolio deck." : "Create an account to access the Socioryx portfolio deck."}
          </DialogPrimitive.Description>
          <DialogPrimitive.Close className="absolute right-4 top-4 w-9 h-9 rounded-full flex items-center justify-center bg-[#1a1f26] border border-[#F8F8FF]/[0.08] text-[#B8C5D6]/60 hover:bg-red-500 hover:border-red-500 hover:text-white transition-all duration-200 focus:outline-none">
            <X className="w-4 h-4" />
          </DialogPrimitive.Close>

          <div className="mb-6 text-center">
            <p className="text-xs text-violet-400 font-medium tracking-widest uppercase mb-1">Our Work</p>
            <h2 className="text-2xl font-bold text-white">
              {mode === "signin" ? "Sign in to view" : "Create an account"}
            </h2>
            <p className="text-zinc-500 text-sm mt-1">
              {mode === "signin"
                ? "Quick sign-in to access our portfolio deck."
                : "Takes 10 seconds. No spam, ever."}
            </p>
          </div>

          {/* Google */}
          <button
            onClick={handleGoogle}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 rounded-xl border border-[#F8F8FF]/[0.08] bg-[#1f1f26] hover:bg-white/10 text-white text-sm font-medium py-3 transition-colors disabled:opacity-50 mb-4"
          >
            <GoogleIcon />
            Continue with Google
          </button>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-[#B8C5D6]/40 text-xs">or</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Email form */}
          <form onSubmit={handleEmail} className="space-y-3">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-xl border border-[#F8F8FF]/[0.08] bg-[#1f1f26] px-4 py-3 text-sm text-white placeholder:text-[#B8C5D6]/40 focus:outline-none focus:border-[#E5E4E2] transition-colors"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full rounded-xl border border-[#F8F8FF]/[0.08] bg-[#1f1f26] px-4 py-3 text-sm text-white placeholder:text-[#B8C5D6]/40 focus:outline-none focus:border-[#E5E4E2] transition-colors"
            />

            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-red-400 text-xs px-1"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#E5E4E2] hover:bg-[#D0CFD0] hover:text-[#0f1419] text-white text-sm font-semibold py-3 transition-colors disabled:opacity-50"
            >
              {loading ? "Loading..." : mode === "signin" ? "Sign In" : "Create Account"}
            </button>
          </form>

          <p className="text-center text-[#B8C5D6]/40 text-xs mt-4">
            {mode === "signin" ? "No account?" : "Already have one?"}{" "}
            <button
              onClick={() => { setMode(mode === "signin" ? "signup" : "signin"); setError(""); }}
              className="text-[#E5E4E2] hover:text-[#de733a] transition-colors"
            >
              {mode === "signin" ? "Sign up" : "Sign in"}
            </button>
          </p>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
      <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
    </svg>
  );
}


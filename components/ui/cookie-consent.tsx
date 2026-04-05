"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Script from "next/script";

const CONSENT_KEY = "socioryx_cookie_consent";

export default function CookieConsent() {
  const [show, setShow] = useState(false);
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored === "accepted") {
      setAccepted(true);
    } else if (stored === null) {
      // Small delay so it doesn't flash immediately on load
      const t = setTimeout(() => setShow(true), 2000);
      return () => clearTimeout(t);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setAccepted(true);
    setShow(false);
  };

  const decline = () => {
    localStorage.setItem(CONSENT_KEY, "declined");
    setShow(false);
  };

  return (
    <>
      {/* Load Clarity only after consent */}
      {accepted && process.env.NEXT_PUBLIC_CLARITY_ID && (
        <Script
          id="clarity-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${process.env.NEXT_PUBLIC_CLARITY_ID}");`,
          }}
        />
      )}

      {/* Banner */}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-sm z-[9998]"
          >
            <div className="bg-[#151a21] border border-[#F8F8FF]/[0.08] rounded-xl p-5 shadow-2xl shadow-black/60">
              <p className="text-xs font-medium text-[#E5E4E2] mb-1 font-heading tracking-wide">
                We use cookies
              </p>
              <p className="text-xs text-[#B8C5D6]/60 leading-relaxed mb-4 font-body">
                We use analytics cookies (Microsoft Clarity) to understand how visitors use our site. No personal data is sold.{" "}
                <a href="/privacy" className="text-[#B8C5D6] hover:text-[#E5E4E2] underline underline-offset-2 transition-colors">
                  Privacy Policy
                </a>
              </p>
              <div className="flex gap-2">
                <button
                  onClick={accept}
                  className="flex-1 py-2 bg-[#E5E4E2] text-[#0f1419] text-xs font-extrabold font-heading rounded-lg hover:bg-[#D0CFD0] transition-colors"
                >
                  Accept
                </button>
                <button
                  onClick={decline}
                  className="flex-1 py-2 border border-[#F8F8FF]/10 text-[#B8C5D6] text-xs font-medium font-body rounded-lg hover:bg-white/[0.04] transition-colors"
                >
                  Decline
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

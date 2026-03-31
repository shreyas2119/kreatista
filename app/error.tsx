"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to console in dev — swap for an error reporting service in prod
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen bg-[#0f1419] flex flex-col items-center justify-center px-5 text-center">
      <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#E5E4E2] mb-4 font-body">Something went wrong</p>
      <h1 className="text-4xl sm:text-6xl font-semibold text-[#F8F8FF] tracking-[-0.04em] leading-none mb-4 font-heading">
        We hit a snag.
      </h1>
      <p className="text-base text-[#B8C5D6]/60 font-body max-w-md mb-10">
        Something unexpected happened on our end. Try refreshing — if it keeps happening, reach out to us.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={reset}
          className="px-8 py-4 bg-[#E5E4E2] text-[#0f1419] text-base font-extrabold hover:bg-[#D0CFD0] transition-colors rounded-lg font-heading cursor-pointer"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="px-8 py-4 border border-[#F8F8FF]/20 text-[#F8F8FF] text-base font-heading font-medium hover:bg-white/[0.04] hover:border-[#F8F8FF]/40 transition-all rounded-lg flex items-center justify-center"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}

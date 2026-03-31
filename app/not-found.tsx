import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#0f1419] flex flex-col items-center justify-center px-5 text-center">
      <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#E5E4E2] mb-4 font-body">404</p>
      <h1 className="text-4xl sm:text-6xl font-semibold text-[#F8F8FF] tracking-[-0.04em] leading-none mb-4 font-heading">
        Page not found.
      </h1>
      <p className="text-base text-[#B8C5D6]/60 font-body max-w-md mb-10">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-8 py-4 bg-[#E5E4E2] text-[#0f1419] text-base font-extrabold hover:bg-[#D0CFD0] transition-colors rounded-lg font-heading"
      >
        Back to Home
      </Link>
    </main>
  );
}

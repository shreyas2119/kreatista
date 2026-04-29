import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// Shared input class for admin forms
export const adminInputCls =
  "w-full bg-[#151a21] border border-[#F8F8FF]/[0.08] rounded-lg px-4 py-2.5 text-[#F8F8FF] text-sm font-body placeholder:text-[#B8C5D6]/20 focus:outline-none focus:border-[#E5E4E2]/30 transition-colors";

// Shared form field wrapper
export function AdminField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium tracking-wide uppercase text-[#B8C5D6]/50 font-body">
        {label}
      </label>
      {children}
    </div>
  );
}

// Shared back link for admin pages
export function AdminBackLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 text-sm text-[#B8C5D6] hover:text-[#E5E4E2] transition-colors mb-8 group font-body"
    >
      <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
      {label}
    </Link>
  );
}

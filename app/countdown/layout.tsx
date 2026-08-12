import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: { absolute: "SocioryX — Content Marketing Agency" },
  robots: { index: false, follow: true },
  alternates: { canonical: "https://socioryx.com/countdown" },
};

export default function CountdownLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
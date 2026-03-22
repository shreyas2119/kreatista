import type { Metadata } from "next";
import "./globals.css";
import { Cursor } from "@/components/ui/cursor";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll";

export const metadata: Metadata = {
  title: "CreatiSocial — From Design to Market",
  description: "Full-stack content marketing for D2C brands, SaaS startups & creators.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#09090b] text-[#fafafa] antialiased">
        <SmoothScrollProvider>
          <Cursor />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}

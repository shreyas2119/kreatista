import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Righteous, Inter } from "next/font/google";
import "./globals.css";
import { Cursor } from "@/components/ui/cursor";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll";

const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600"], variable: "--font-inter", display: "swap" });
const bebasNeue = Bebas_Neue({ subsets: ["latin"], weight: "400", variable: "--font-bebas", display: "swap" });
const righteous = Righteous({ subsets: ["latin"], weight: "400", variable: "--font-righteous", display: "swap" });

export const metadata: Metadata = {
  title: "CreatiSocial — From Design to Market",
  description: "Full-stack content marketing for D2C brands, SaaS startups & creators.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${bebasNeue.variable} ${righteous.variable}`}>
      <body className="bg-[#09090b] text-[#fafafa] antialiased">
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}

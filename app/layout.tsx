import type { Metadata, Viewport } from "next";
import { Epilogue, Inter } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll";
import { ContactModalProvider } from "@/components/providers/contact-modal";
import { AuthProvider } from "@/components/providers/auth-provider";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-inter", display: "swap" });
const epilogue = Epilogue({ subsets: ["latin"], weight: ["700", "800", "900"], variable: "--font-epilogue", display: "swap" });

export const metadata: Metadata = {
  title: "Kreatista — Full-Stack Content Marketing",
  description: "Full-stack content marketing for D2C brands, SaaS startups & creators.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${epilogue.variable}`}>
      <body className="bg-[#13131a] text-[#e4e1ec] antialiased">
        <SmoothScrollProvider>
          <AuthProvider>
            <ContactModalProvider>
              {children}
            </ContactModalProvider>
          </AuthProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}

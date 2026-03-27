import type { Metadata, Viewport } from "next";
import { Epilogue, Inter } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll";
import { ContactModalProvider } from "@/components/providers/contact-modal";
import { AuthProvider } from "@/components/providers/auth-provider";
import { BottomTabBar } from "@/components/ui/bottom-tab-bar";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-inter", display: "swap" });
const epilogue = Epilogue({ subsets: ["latin"], weight: ["700", "800", "900"], variable: "--font-epilogue", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://kreatista.in"),
  title: {
    default: "Kreatista — Full-Stack Content Marketing",
    template: "%s | Kreatista",
  },
  description: "Full-stack content marketing for D2C brands, SaaS startups & creators. Websites, video, social media, influencer collabs — all under one roof.",
  keywords: ["content marketing", "D2C marketing", "SaaS marketing", "social media agency", "video production", "influencer marketing", "India"],
  authors: [{ name: "Kreatista" }],
  creator: "Kreatista",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://kreatista.in",
    siteName: "Kreatista",
    title: "Kreatista — Full-Stack Content Marketing",
    description: "Full-stack content marketing for D2C brands, SaaS startups & creators.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kreatista — Full-Stack Content Marketing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kreatista — Full-Stack Content Marketing",
    description: "Full-stack content marketing for D2C brands, SaaS startups & creators.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${epilogue.variable}`}>
      <head>
        {/* Microsoft Clarity */}
        {process.env.NEXT_PUBLIC_CLARITY_ID && (
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${process.env.NEXT_PUBLIC_CLARITY_ID}");`,
            }}
          />
        )}
      </head>
      <body className="bg-[#13131a] text-[#e4e1ec] antialiased">
        <SmoothScrollProvider>
          <AuthProvider>
            <ContactModalProvider>
              <div className="pb-16 md:pb-0">
                {children}
              </div>
              <BottomTabBar />
            </ContactModalProvider>
          </AuthProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}

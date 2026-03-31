import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, Instrument_Serif } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll";
import { ContactModalProvider } from "@/components/providers/contact-modal";
import { AuthProvider } from "@/components/providers/auth-provider";
import { BottomTabBar } from "@/components/ui/bottom-tab-bar";
import { CalendlyPreloader } from "@/components/ui/calendly-modal";
import { ScrollProgress } from "@/components/ui/scroll-progress";

// Premium font system
const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"], 
  weight: ["400", "500", "600", "700"], 
  variable: "--font-heading", 
  display: "swap" 
});

const inter = Inter({ 
  subsets: ["latin"], 
  weight: ["300", "400", "500"], 
  variable: "--font-body", 
  display: "swap" 
});

const instrumentSerif = Instrument_Serif({ 
  subsets: ["latin"], 
  weight: ["400"], 
  variable: "--font-accent", 
  display: "swap",
  style: ["normal", "italic"]
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kreatista.in"),
  title: {
    default: "Socioryx — Full-Stack Content Marketing",
    template: "%s | Socioryx",
  },
  description: "Full-stack content marketing for D2C brands, SaaS startups & creators. Websites, video, social media, influencer collabs — all under one roof.",
  keywords: ["content marketing", "D2C marketing", "SaaS marketing", "social media agency", "video production", "influencer marketing", "India"],
  authors: [{ name: "Socioryx" }],
  creator: "Socioryx",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://kreatista.in",
    siteName: "Socioryx",
    title: "Socioryx — Full-Stack Content Marketing",
    description: "Full-stack content marketing for D2C brands, SaaS startups & creators.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Socioryx — Full-Stack Content Marketing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Socioryx — Full-Stack Content Marketing",
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
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${spaceGrotesk.variable} ${inter.variable} ${instrumentSerif.variable}`}>
      <body className="bg-[#0f1419] text-[#F8F8FF] antialiased">
        {/* Microsoft Clarity */}
        {process.env.NEXT_PUBLIC_CLARITY_ID && (
          <Script
            id="clarity-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${process.env.NEXT_PUBLIC_CLARITY_ID}");`,
            }}
          />
        )}
        
        <SmoothScrollProvider>
          <AuthProvider>
            <ContactModalProvider>
              <ScrollProgress />
              <CalendlyPreloader />
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

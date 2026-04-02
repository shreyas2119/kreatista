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
import LoadingScreen from "@/components/ui/loading-screen";

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
  metadataBase: new URL("https://socioryx.com"),
  title: {
    default: "Socioryx — Content Marketing Agency India",
    template: "%s | Socioryx",
  },
  description: "Socioryx is a full-stack content marketing agency in India helping D2C brands, SaaS startups & creators grow through video, social media, influencer marketing and web design.",
  keywords: ["content marketing agency India", "D2C marketing agency", "SaaS marketing India", "social media agency India", "video production agency", "influencer marketing India", "digital marketing agency"],
  authors: [{ name: "Socioryx" }],
  creator: "Socioryx",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://socioryx.com",
    siteName: "Socioryx",
    title: "Socioryx — Content Marketing Agency India",
    description: "Full-stack content marketing for D2C brands, SaaS startups & creators. Video, social media, influencer collabs — all under one roof.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Socioryx — Content Marketing Agency India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Socioryx — Content Marketing Agency India",
    description: "Full-stack content marketing for D2C brands, SaaS startups & creators.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://socioryx.com",
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
      <head>
        <link rel="preconnect" href="https://www.clarity.ms" />
        <link rel="preconnect" href="https://scripts.clarity.ms" />
      </head>
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
              <LoadingScreen />
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

import type { Metadata } from "next";
import { Space_Grotesk, Inter, Instrument_Serif, Lora, DM_Sans } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll";
import { ContactModalProvider } from "@/components/providers/contact-modal";
import { AuthProvider } from "@/components/providers/auth-provider";
import { BottomTabBar } from "@/components/ui/bottom-tab-bar";
import { CalendlyPreloader } from "@/components/ui/calendly-modal";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import LoadingScreen from "@/components/ui/loading-screen";
import CookieConsent from "@/components/ui/cookie-consent";
import WhatsAppButton from "@/components/ui/whatsapp-button";
import { AuditSideRibbon } from "@/components/ui/audit-side-ribbon";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';
import { GoogleAnalytics } from '@next/third-parties/google';
import Script from "next/script";

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

// Blog-specific fonts — Medium-style reading experience
const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-blog-body",
  display: "swap",
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-blog-ui",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://socioryx.com"),
  title: {
    default: "Socioryx — Content Marketing Agency India",
    template: "%s | Socioryx",
  },
  description: "Socioryx is a content marketing agency in India for D2C brands and SaaS startups. One team for websites, social media, video, and influencer marketing. Book a free strategy call.",
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
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "icon", url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { rel: "icon", url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://socioryx.com/#organization",
    name: "Socioryx",
    url: "https://socioryx.com",
    logo: "https://socioryx.com/og-image.png",
    description: "Full-stack content marketing agency in India helping D2C brands, SaaS startups and creators grow through video, social media, influencer marketing and web design.",
    foundingDate: "2024",
    address: { "@type": "PostalAddress", addressCountry: "IN" },
    sameAs: [
      "https://www.instagram.com/socioryx_network/",
      "https://www.linkedin.com/company/socioryx/",
      "https://x.com/SocioryxN79343",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "work@socioryx.com",
      url: "https://socioryx.com",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Content Marketing Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Website Design and Development", url: "https://socioryx.com/services/website-design-development" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Brand Marketing and Positioning", url: "https://socioryx.com/services/brand-marketing-positioning" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Content Creation for Social Media", url: "https://socioryx.com/services/content-creation-social-media" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Social Media Management", url: "https://socioryx.com/services/social-media-management" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Influencer Marketing for D2C Brands", url: "https://socioryx.com/services/influencer-marketing-d2c-brands" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Video Production", url: "https://socioryx.com/services/video-production" } },
      ],
    },
  };
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Socioryx",
    url: "https://socioryx.com",
    publisher: {
      "@type": "Organization",
      "@id": "https://socioryx.com/#organization",
      name: "Socioryx",
    },
  };
  return (
    <html lang="en" className={`dark ${spaceGrotesk.variable} ${inter.variable} ${instrumentSerif.variable} ${lora.variable} ${dmSans.variable}`}>
      <head>
        <Script id="org-schema" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
        <Script id="website-schema" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      </head>
      <body className="bg-[#0f1419] text-[#F8F8FF] antialiased">
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
              <CookieConsent />
              <WhatsAppButton />
              <AuditSideRibbon />
            </ContactModalProvider>
          </AuthProvider>
        </SmoothScrollProvider>
        <SpeedInsights />
        <Analytics />
        <GoogleAnalytics gaId="G-T9V5N8CLN9" />
      </body>
    </html>
  );
}

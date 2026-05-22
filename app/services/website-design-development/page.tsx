import type { Metadata } from "next";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import ServicePageLayout, { type ServicePageData } from "@/components/sections/ServicePageLayout";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Website Design and Development for D2C Brands | Socioryx",
  description: "Socioryx builds conversion-focused websites for D2C brands and SaaS startups in India. Mobile-first, SEO-ready, and designed to turn visitors into customers.",
  alternates: { canonical: "https://socioryx.com/services/website-design-development" },
  openGraph: {
    title: "Website Design and Development for D2C Brands | Socioryx",
    description: "Conversion-focused websites for D2C brands and SaaS startups in India. Mobile-first, SEO-ready, built to perform.",
    url: "https://socioryx.com/services/website-design-development",
    images: [{ url: "https://socioryx.com/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Website Design and Development for D2C Brands | Socioryx",
    description: "Conversion-focused websites for D2C brands and SaaS startups in India.",
    images: ["https://socioryx.com/og-image.png"],
  },
};

const data: ServicePageData = {
  slug: "website-design-development",
  label: "Website Design and Development",
  headline: "A Website That Turns Visitors Into Customers",
  subheadline: "Most brand websites look good and do nothing. We build sites around your conversion goal, whether that is a purchase, a demo booking, or a lead captured.",
  intro: "Your website is the first thing a potential client sees after hearing about you. If it does not immediately communicate what you do, who you do it for, and why they should trust you, they leave. We build websites that answer all three questions in the first five seconds.",
  whatWeDoTitle: "Website Design and Development for D2C Brands in India",
  whatWeDo: "We design and develop websites from scratch, starting with your business goal and working backwards to the layout, copy, and technical build. Every page has a job. Every section moves the visitor closer to taking action. We handle design, development, copywriting, and SEO setup so you launch with a site that is ready to perform from day one. We work with Next.js, React, and modern web standards to ensure your site is fast, accessible, and built to scale.",
  benefits: [
    "SEO built in from day one, not added as an afterthought",
    "Mobile-first design that works on every screen size",
    "Fast load times that reduce bounce rate and improve conversions",
    "Clear conversion paths that guide visitors toward your goal",
    "Scalable architecture that grows with your business",
    "Ongoing support and updates after launch",
  ],
  howItWorksTitle: "How We Build Your Website",
  howItWorks: [
    { step: "01", title: "Discovery", desc: "We learn your business, your audience, and your conversion goal before touching any design." },
    { step: "02", title: "Design", desc: "We create wireframes and visual designs aligned with your brand and optimised for conversion." },
    { step: "03", title: "Development", desc: "We build the site with clean code, fast performance, and SEO best practices baked in." },
    { step: "04", title: "Launch", desc: "We test across devices, set up analytics, and hand over a site that is ready to perform." },
  ],
  whoIsItForTitle: "Built for D2C Brands and SaaS Startups",
  whoIsItFor: "This service is for D2C brand founders who need a website that sells, SaaS startups that need a site that converts trial signups, and creators who need a professional online presence. If your current website is not generating leads or sales, or if you are launching a new brand and need to get it right from the start, this is for you.",
  faqs: [
    { q: "How long does it take to build a website?", a: "A standard brand website takes 3 to 6 weeks from kickoff to launch, depending on the number of pages and complexity. We give you a clear timeline at the start of the project." },
    { q: "Do you handle copywriting as well?", a: "Yes. We write the copy for your website as part of the project. Good design and weak copy is a wasted investment. We make sure both work together." },
    { q: "Will my website rank on Google?", a: "We build every site with on-page SEO best practices: proper heading structure, meta tags, fast load times, and clean code. Ranking for competitive keywords takes time and ongoing content, but your site will be technically ready from day one." },
    { q: "What platform do you build on?", a: "We primarily build on Next.js and React for performance and scalability. For simpler sites, we also work with Webflow. We recommend the right platform based on your needs and budget." },
    { q: "Do you redesign existing websites?", a: "Yes. If your current site is underperforming, we audit it, identify the problems, and rebuild it with a clear conversion strategy." },
  ],
  relatedServices: [
    { title: "Brand Marketing and Positioning", href: "/services/brand-marketing-positioning" },
    { title: "Content Creation for Social Media", href: "/services/content-creation-social-media" },
    { title: "Social Media Management", href: "/services/social-media-management" },
  ],
  ctaSubject: "Interested in: Website Design and Development",
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Website Design and Development",
  serviceType: "Web Design and Development",
  provider: { "@type": "Organization", name: "Socioryx", url: "https://socioryx.com" },
  description: data.whatWeDo,
  areaServed: { "@type": "Country", name: "India" },
  url: "https://socioryx.com/services/website-design-development",
  offers: { "@type": "Offer", availability: "https://schema.org/InStock", areaServed: "IN" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: data.faqs.map(f => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://socioryx.com" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://socioryx.com/services" },
    { "@type": "ListItem", position: 3, name: "Website Design and Development", item: "https://socioryx.com/services/website-design-development" },
  ],
};

export default function WebsiteDesignPage() {
  return (
    <>
      <Script id="service-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Navbar />
      <ServicePageLayout data={data} />
      <Footer />
    </>
  );
}

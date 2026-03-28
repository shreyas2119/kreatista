"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useContactModal } from "@/components/providers/contact-modal";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export default function ServicesPageContent() {
  const { openCalendly: openModal } = useContactModal();

  return (
    <>
      {/* ── Hero ── */}
      <section className="pt-32 pb-20 px-5 sm:px-8 lg:px-16 max-w-screen-2xl mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between gap-10">
          <div className="max-w-3xl">
            <motion.span
              {...fadeUp(0)}
              className="text-[#E5E4E2] font-medium tracking-widest uppercase text-xs sm:text-sm mb-4 block font-body"
            >
              Our Capabilities
            </motion.span>
            <motion.h1
              {...fadeUp(0.1)}
              className="text-5xl sm:text-7xl lg:text-8xl font-semibold tracking-[-0.04em] leading-[0.9] text-[#F8F8FF] font-heading"
            >
              Precision{" "}
              <span className="text-[#E5E4E2]">Tools</span>{" "}
              for Global{" "}
              <span className="italic font-light text-[#B8C5D6] font-accent">Growth.</span>
            </motion.h1>
          </div>
          <motion.div {...fadeUp(0.2)} className="pb-2 max-w-md">
            <p className="text-[#B8C5D6]/70 text-base sm:text-lg border-l-2 border-[#F8F8FF]/20 pl-5 leading-relaxed font-body">
              We don't just offer services. We build the infrastructure for market dominance through kinetic storytelling and architectural design.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── 01 Website Design & Dev ── */}
      <section className="px-5 sm:px-8 lg:px-16 py-20 bg-[#1b1b22]">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 items-stretch">
          <motion.div {...fadeUp(0)} className="md:col-span-7 flex flex-col justify-center">
            <div className="mb-5 inline-flex items-center gap-3 text-[#E5E4E2]">
              <span className="text-3xl">🌐</span>
              <span className="font-medium text-base tracking-tight" >
                01 / Digital Architecture
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-semibold text-[#F8F8FF] mb-5 tracking font-heading-[-0.03em]" >
              Website Design &amp; Dev
            </h2>
            <p className="text-[#B8C5D6]/70 text-base sm:text-lg mb-7 leading-relaxed font-body max-w-2xl">
              Your website is your most aggressive salesperson. We build high-performance digital environments that convert at scale using React, Next.js, and bespoke motion systems.
            </p>
            <ul className="space-y-3 mb-8">
              {["Performance-first Technical SEO", "Custom Motion Design & Micro-interactions", "Scalable E-commerce Architecture"].map((item) => (
                <li key={item} className="flex items-center gap-3 text-[#F8F8FF]/80 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-[#E5E4E2] flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <button
              onClick={() => openModal("Interested in: Website Design & Dev")}
              className="inline-flex items-center gap-2 text-[#E5E4E2] font-extrabold border-b border-[#E5E4E2] pb-0.5 hover:text-[#E5E4E2] hover:border-[#E5E4E2] transition-colors group text-sm"
              
            >
              Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
          <motion.div {...fadeUp(0.15)} className="md:col-span-5 relative min-h-[320px] sm:min-h-[400px] overflow-hidden">
            <Image
              src="/images/web.webp"
              alt="Website design"
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </motion.div>
        </div>
      </section>

      {/* ── 02 Product Marketing ── */}
      <section className="px-5 sm:px-8 lg:px-16 py-20 bg-[#13131a]">
        <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row-reverse gap-14 items-center">
          <motion.div {...fadeUp(0)} className="w-full md:w-1/2">
            <div className="mb-5 inline-flex items-center gap-3 text-[#E5E4E2]">
              <span className="text-3xl">🎯</span>
              <span className="font-medium text-base tracking-tight" >
                02 / Strategic Logic
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-semibold text-[#F8F8FF] mb-5 leading-tight tracking font-heading-[-0.03em]" >
              Product Marketing &amp; Positioning
            </h2>
            <p className="text-[#B8C5D6]/70 text-base sm:text-lg mb-7 leading-relaxed font-body">
              We find the "white space" in your industry. Through aggressive market research and competitive analysis, we position your brand as the only logical choice for your target audience.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {[
                { title: "GTM Strategy", desc: "Engineered launches that capture immediate market share." },
                { title: "Narrative Design", desc: "Crafting stories that make your product indispensable." },
              ].map((card) => (
                <div key={card.title} className="p-5 bg-[#1a1f26]">
                  <h4 className="text-[#F8F8FF] font-medium mb-1.5 text-sm" >{card.title}</h4>
                  <p className="text-[#B8C5D6]/50 text-xs leading-relaxed font-body">{card.desc}</p>
                </div>
              ))}
            </div>
            <button
              onClick={() => openModal("Interested in: Product Marketing & Positioning")}
              className="inline-flex items-center gap-2 text-[#E5E4E2] font-extrabold border-b border-[#E5E4E2] pb-0.5 hover:text-[#E5E4E2] hover:border-[#E5E4E2] transition-colors group text-sm"
              
            >
              Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
          <motion.div {...fadeUp(0.15)} className="w-full md:w-1/2 flex items-center justify-center">
            <div className="aspect-square w-full max-w-sm bg-[#1a1f26] rounded-full flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#E5E4E2]/10 to-[#E5E4E2]/10" />
              <div className="relative z-10 p-10 text-center">
                <Image src="/images/product.webp" alt="Product marketing" fill className="object-cover opacity-20 rounded-full" />
                <div className="relative z-10">
                  <div className="h-1.5 w-24 bg-[#E5E4E2] mx-auto mb-6" />
                  <p className="text-xl font-semibold text-[#F8F8FF] uppercase tracking-tighter" >
                    Analytical Dominance
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 03 & 04 Content + Social ── */}
      <section className="px-5 sm:px-8 lg:px-16 py-20 bg-[#1b1b22]">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          {[
            {
              num: "03 / Content Strategy",
              title: "Editorial Grade Creation",
              desc: "We treat brand content like high-fashion editorial. From whitepapers to viral threads, every word is calculated for impact and authority.",
              service: "Content Creation",
              accent: "#E5E4E2",
            },
            {
              num: "04 / Social Management",
              title: "Omnichannel Presence",
              desc: "Active community management and trend-reactive posting that keeps your brand at the center of the cultural conversation.",
              service: "Social Media Management",
              accent: "#E5E4E2",
              offset: true,
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              {...fadeUp(i * 0.1)}
              className={`bg-[#13131a] p-10 sm:p-12 relative overflow-hidden group ${item.offset ? "md:mt-20" : ""}`}
            >
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity select-none pointer-events-none">
                <span className="text-[120px] font-semibold text-[#F8F8FF]" >
                  {i === 0 ? "✍" : "📡"}
                </span>
              </div>
              <span className="text-[#E5E4E2] font-medium mb-4 block text-xs tracking-widest uppercase" >
                {item.num}
              </span>
              <h3 className="text-3xl sm:text-4xl font-semibold text-[#F8F8FF] mb-5 tracking font-heading-[-0.03em]" >
                {item.title}
              </h3>
              <p className="text-[#B8C5D6]/60 mb-7 leading-relaxed text-sm sm:text-base max-w-md">{item.desc}</p>
              <button
                onClick={() => openModal(`Interested in: ${item.service}`)}
                className="inline-flex items-center gap-2 text-[#E5E4E2] font-extrabold group/btn text-sm"
                
              >
                Learn More <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── 05 Influencer ── */}
      <section className="px-5 sm:px-8 lg:px-16 py-20 bg-[#13131a]">
        <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row gap-14 items-center">
          <motion.div {...fadeUp(0)} className="w-full md:w-1/2 overflow-hidden aspect-video relative">
            <Image src="/images/influencer.webp" alt="Influencer collaboration" fill className="object-cover" />
          </motion.div>
          <motion.div {...fadeUp(0.15)} className="w-full md:w-1/2">
            <span className="text-[#E5E4E2] font-medium mb-2 block text-xs tracking-widest uppercase" >
              05 / Collaborations
            </span>
            <h2 className="text-4xl sm:text-5xl font-semibold text-[#F8F8FF] mb-5 tracking font-heading-[-0.03em]" >
              Influencer Synergy
            </h2>
            <p className="text-[#B8C5D6]/70 text-base sm:text-lg mb-7 leading-relaxed font-body">
              We connect you with creators who don't just have "followers," but have "influence." Our vetting process ensures authentic alignment and measurable ROI.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              {["Creator Vetting", "Campaign Mgmt", "Contracting"].map((tag) => (
                <span key={tag} className="px-3 py-1.5 bg-[#1a1f26] text-xs font-medium text-[#F8F8FF] uppercase tracking-widest font-body">
                  {tag}
                </span>
              ))}
            </div>
            <button
              onClick={() => openModal("Interested in: Influencer Collaborations")}
              className="px-7 py-3.5 bg-[#E5E4E2] text-[#0f1419] font-extrabold hover:bg-[#D0CFD0] transition-colors text-sm"
              
            >
              Start Your Campaign
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── 06 Video Production ── */}
      <section className="px-5 sm:px-8 lg:px-16 py-20 bg-[#1b1b22]">
        <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row-reverse gap-14 items-center">
          <motion.div {...fadeUp(0)} className="w-full md:w-1/2 overflow-hidden aspect-video relative group">
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <span className="text-6xl">▶</span>
            </div>
            <Image src="/images/video.webp" alt="Video production" fill className="object-cover grayscale" />
          </motion.div>
          <motion.div {...fadeUp(0.15)} className="w-full md:w-1/2">
            <span className="text-[#E5E4E2] font-medium mb-2 block text-xs tracking-widest uppercase" >
              06 / Cinematography
            </span>
            <h2 className="text-4xl sm:text-5xl font-semibold text-[#F8F8FF] mb-5 tracking font-heading-[-0.03em]" >
              Video Production
            </h2>
            <p className="text-[#B8C5D6]/70 text-base sm:text-lg mb-7 leading-relaxed font-body">
              High-fidelity visual storytelling. From 15-second social hooks to full-scale brand documentaries, we produce video that demands attention in an era of distraction.
            </p>
            <div className="space-y-3 mb-8">
              {[
                ["4K Production", "Full Studio Gear"],
                ["Post-Editing", "Motion Graphics"],
                ["Sound Design", "Custom Scores"],
              ].map(([left, right]) => (
                <div key={left} className="flex justify-between border-b border-[#F8F8FF]/[0.08] pb-2.5">
                  <span className="text-[#F8F8FF] font-medium text-sm">{left}</span>
                  <span className="text-[#B8C5D6]/50 text-sm">{right}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => openModal("Interested in: Video Production")}
              className="px-7 py-3.5 bg-[#E5E4E2] text-[#0f1419] font-extrabold hover:bg-[#D0CFD0] transition-colors text-sm"
              
            >
              View Our Reel
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── CTA / Contact ── */}
      <section className="px-5 sm:px-8 lg:px-16 py-24 sm:py-32 bg-[#0e0e15] overflow-hidden">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 sm:gap-20">
          {/* Left */}
          <motion.div {...fadeUp(0)}>
            <h2 className="text-5xl sm:text-6xl font-semibold tracking-[-0.04em] text-[#F8F8FF] mb-7" >
              Ready to{" "}
              <span className="text-[#E5E4E2] underline decoration-[#E5E4E2] underline-offset-8">
                Ascend?
              </span>
            </h2>
            <p className="text-[#B8C5D6]/60 text-base sm:text-lg mb-10 leading-relaxed">
              Don't let your brand stagnate in a sea of mediocrity. Partner with an agency that understands the kinetic nature of the modern market.
            </p>
            <div className="flex gap-8 sm:gap-10">
              {[
                { stat: "98%", label: "Client Retention" },
                { stat: "14M+", label: "Total Reach" },
                { stat: "24h", label: "Response Time" },
              ].map((item, i) => (
                <div key={item.label} className="flex items-stretch gap-8 sm:gap-10">
                  {i > 0 && <div className="w-px bg-[#F8F8FF]/10" />}
                  <div>
                    <span className="block text-[#F8F8FF] font-semibold text-2xl mb-1" >{item.stat}</span>
                    <span className="text-[#B8C5D6]/40 text-xs uppercase tracking-widest">{item.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — contact form */}
          <motion.div {...fadeUp(0.15)} className="bg-[#1b1b22] p-8 sm:p-10">
            <ContactForm />
          </motion.div>
        </div>
      </section>
    </>
  );
}

function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setIsSuccess(true);
        setFormData({ firstName: "", lastName: "", email: "", subject: "", message: "" });
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-16 text-center">
        <div className="text-5xl mb-4">✓</div>
        <h3 className="text-xl font-semibold text-[#F8F8FF] mb-2" >
          Thank You!
        </h3>
        <p className="text-sm text-[#B8C5D6]/60">Your message has been submitted. We'll be in touch shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {[
          { label: "First Name", name: "firstName", type: "text", placeholder: "John" },
          { label: "Last Name",  name: "lastName",  type: "text", placeholder: "Doe" },
        ].map((f) => (
          <div key={f.name}>
            <label className="block text-xs font-medium uppercase tracking-widest text-[#B8C5D6]/50 mb-2">{f.label}</label>
            <input
              type={f.type}
              name={f.name}
              value={formData[f.name as keyof typeof formData]}
              onChange={handleChange}
              placeholder={f.placeholder}
              required
              className="w-full bg-[#1a1f26] text-[#F8F8FF] text-sm py-3 px-4 focus:outline-none focus:ring-1 focus:ring-[#E5E4E2]/50 placeholder:text-[#B8C5D6]/30 transition-all"
            />
          </div>
        ))}
      </div>
      <div>
        <label className="block text-xs font-medium uppercase tracking-widest text-[#B8C5D6]/50 mb-2">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@brand.com"
          required
          className="w-full bg-[#1a1f26] text-[#F8F8FF] text-sm py-3 px-4 focus:outline-none focus:ring-1 focus:ring-[#E5E4E2]/50 placeholder:text-[#B8C5D6]/30 transition-all"
        />
      </div>
      <div>
        <label className="block text-xs font-medium uppercase tracking-widest text-[#B8C5D6]/50 mb-2">Service of Interest</label>
        <select
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className="w-full bg-[#1a1f26] text-[#F8F8FF] text-sm py-3 px-4 focus:outline-none focus:ring-1 focus:ring-[#E5E4E2]/50 transition-all"
        >
          <option value="">Select a service...</option>
          <option>Website Design &amp; Dev</option>
          <option>Product Marketing</option>
          <option>Content Creation</option>
          <option>Social Media</option>
          <option>Influencer Collabs</option>
          <option>Video Production</option>
        </select>
      </div>
      <div>
        <label className="block text-xs font-medium uppercase tracking-widest text-[#B8C5D6]/50 mb-2">Project Brief</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          required
          placeholder="Tell us about your project..."
          className="w-full bg-[#1a1f26] text-[#F8F8FF] text-sm py-3 px-4 focus:outline-none focus:ring-1 focus:ring-[#E5E4E2]/50 placeholder:text-[#B8C5D6]/30 transition-all resize-none"
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 bg-[#E5E4E2] text-[#0f1419] font-extrabold uppercase tracking-widest text-sm hover:bg-[#D0CFD0] hover:text-[#0f1419] transition-colors disabled:opacity-50 font-heading"
      >
        {isSubmitting ? "Sending..." : "Request Strategy Session"}
      </button>
    </form>
  );
}








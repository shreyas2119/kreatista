"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight, CheckCircle2, Globe, Target, PenLine,
  Radio, Users, Play, AlertCircle,
} from "lucide-react";
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
      <section className="pt-32 pb-20 px-5 sm:px-8 lg:px-16 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between gap-10">
          <div className="max-w-3xl">
            <motion.span
              {...fadeUp(0)}
              className="text-[#E5E4E2] font-medium tracking-widest uppercase text-xs sm:text-sm mb-4 block font-body"
            >
              What We Do
            </motion.span>
            <motion.h1
              {...fadeUp(0.1)}
              className="text-5xl sm:text-7xl lg:text-8xl font-semibold tracking-[-0.04em] leading-[0.9] text-[#F8F8FF] font-heading"
            >
              Everything your{" "}
              <span className="text-[#E5E4E2]">brand</span>{" "}
              needs to{" "}
              <span className="italic font-light text-[#B8C5D6] font-accent">blow up.</span>
            </motion.h1>
          </div>
          <motion.div {...fadeUp(0.2)} className="pb-2 max-w-md">
            <p className="text-[#B8C5D6]/70 text-base sm:text-lg border-l-2 border-[#F8F8FF]/20 pl-5 leading-relaxed font-body">
              One team. Six services. No more juggling five different agencies and hoping they talk to each other.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── 01 Websites ── */}
      <section className="px-5 sm:px-8 lg:px-16 py-20 bg-[#1b1b22]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 items-stretch">
          <motion.div {...fadeUp(0)} className="md:col-span-7 flex flex-col justify-center">
            <div className="mb-5 inline-flex items-center gap-3 text-[#E5E4E2]">
              <Globe className="w-6 h-6" />
              <span className="font-medium text-base tracking-tight font-body">
                01 / Websites
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-semibold text-[#F8F8FF] mb-5 tracking-[-0.03em] font-heading">
              A website that actually converts
            </h2>
            <p className="text-[#B8C5D6]/70 text-base sm:text-lg mb-7 leading-relaxed font-body max-w-2xl">
              Most brand websites look fine and do nothing. We build sites that turn visitors into customers — fast-loading, mobile-first, and designed around how your audience actually behaves.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "SEO built in from day one, not bolted on later",
                "Smooth animations that feel premium, not gimmicky",
                "Built to scale — whether you're at 100 or 100k visitors",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-[#F8F8FF]/80 text-sm font-body">
                  <CheckCircle2 className="w-4 h-4 text-[#E5E4E2] flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <button
              onClick={() => openModal("Interested in: Website Design & Dev")}
              className="inline-flex items-center gap-2 text-[#E5E4E2] font-extrabold border-b border-[#E5E4E2] pb-0.5 hover:opacity-80 transition-opacity group text-sm cursor-pointer"
            >
              Get a free site audit <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
          <motion.div {...fadeUp(0.15)} className="md:col-span-5 relative min-h-[320px] sm:min-h-[400px] overflow-hidden">
            <Image
              src="/images/web.webp"
              alt="Website design and development"
              fill
              sizes="(max-width: 768px) 100vw, 42vw"
              className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </motion.div>
        </div>
      </section>

      {/* ── 02 Marketing & Positioning ── */}
      <section className="px-5 sm:px-8 lg:px-16 py-20 bg-[#13131a]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row-reverse gap-14 items-center">
          <motion.div {...fadeUp(0)} className="w-full md:w-1/2">
            <div className="mb-5 inline-flex items-center gap-3 text-[#E5E4E2]">
              <Target className="w-6 h-6" />
              <span className="font-medium text-base tracking-tight font-body">
                02 / Marketing &amp; Positioning
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-semibold text-[#F8F8FF] mb-5 leading-tight tracking-[-0.03em] font-heading">
              Make your brand the obvious choice
            </h2>
            <p className="text-[#B8C5D6]/70 text-base sm:text-lg mb-7 leading-relaxed font-body">
              Your competitors are louder. We make you clearer. We figure out exactly what makes you different, then build messaging that makes your audience feel like you were made for them.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {[
                { title: "Launch Strategy", desc: "Hit the ground running. We plan your GTM so you get traction from day one." },
                { title: "Brand Messaging", desc: "Words that stick. Copy and positioning your audience actually remembers." },
              ].map((card) => (
                <div key={card.title} className="p-5 bg-[#1a1f26]">
                  <h4 className="text-[#F8F8FF] font-medium mb-1.5 text-sm font-heading">{card.title}</h4>
                  <p className="text-[#B8C5D6]/50 text-xs leading-relaxed font-body">{card.desc}</p>
                </div>
              ))}
            </div>
            <button
              onClick={() => openModal("Interested in: Product Marketing & Positioning")}
              className="inline-flex items-center gap-2 text-[#E5E4E2] font-extrabold border-b border-[#E5E4E2] pb-0.5 hover:opacity-80 transition-opacity group text-sm cursor-pointer"
            >
              Let&apos;s talk positioning <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
          <motion.div {...fadeUp(0.15)} className="w-full md:w-1/2 flex items-center justify-center">
            <div className="aspect-square w-full max-w-sm bg-[#1a1f26] rounded-full flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#E5E4E2]/10 to-[#E5E4E2]/10" />
              <div className="relative z-10 p-10 text-center">
                <Image src="/images/product.webp" alt="Brand marketing and positioning" fill sizes="(max-width: 768px) 100vw, 384px" className="object-cover opacity-20 rounded-full" />
                <div className="relative z-10">
                  <div className="h-1.5 w-24 bg-[#E5E4E2] mx-auto mb-6" />
                  <p className="text-xl font-semibold text-[#F8F8FF] uppercase tracking-tighter font-heading">
                    Stand Out. Stay Relevant.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 03 & 04 Content + Social ── */}
      <section className="px-5 sm:px-8 lg:px-16 py-20 bg-[#1b1b22]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          {[
            {
              num: "03 / Content",
              title: "Content that stops the scroll",
              desc: "We create content people actually want to watch, read, and share — not just stuff that fills a calendar. Every post has a job to do.",
              service: "Content Creation",
              Icon: PenLine,
            },
            {
              num: "04 / Social Media",
              title: "Always on, always relevant",
              desc: "Posting consistently is hard when you're running a business. We handle the whole thing — strategy, creation, scheduling, and community — so you don't have to think about it.",
              service: "Social Media Management",
              Icon: Radio,
              offset: true,
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              {...fadeUp(i * 0.1)}
              className={`bg-[#13131a] p-10 sm:p-12 relative overflow-hidden group ${item.offset ? "md:mt-20" : ""}`}
            >
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity select-none pointer-events-none">
                <item.Icon className="w-28 h-28 text-[#F8F8FF]" />
              </div>
              <span className="text-[#E5E4E2] font-medium mb-4 block text-xs tracking-widest uppercase font-body">
                {item.num}
              </span>
              <h3 className="text-3xl sm:text-4xl font-semibold text-[#F8F8FF] mb-5 tracking-[-0.03em] font-heading">
                {item.title}
              </h3>
              <p className="text-[#B8C5D6]/60 mb-7 leading-relaxed text-sm sm:text-base max-w-md font-body">{item.desc}</p>
              <button
                onClick={() => openModal(`Interested in: ${item.service}`)}
                className="inline-flex items-center gap-2 text-[#E5E4E2] font-extrabold group/btn text-sm cursor-pointer"
              >
                See how it works <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── 05 Influencer ── */}
      <section className="px-5 sm:px-8 lg:px-16 py-20 bg-[#13131a]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-14 items-center">
          <motion.div {...fadeUp(0)} className="w-full md:w-1/2 overflow-hidden aspect-video relative">
            <Image src="/images/influencer.webp" alt="Influencer collaboration" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
          </motion.div>
          <motion.div {...fadeUp(0.15)} className="w-full md:w-1/2">
            <span className="text-[#E5E4E2] font-medium mb-2 block text-xs tracking-widest uppercase font-body">
              05 / Influencer Collabs
            </span>
            <h2 className="text-4xl sm:text-5xl font-semibold text-[#F8F8FF] mb-5 tracking-[-0.03em] font-heading">
              Reach that actually converts
            </h2>
            <p className="text-[#B8C5D6]/70 text-base sm:text-lg mb-7 leading-relaxed font-body">
              Follower counts are vanity. We connect you with creators whose audiences trust them — so when they talk about your brand, people actually listen and buy.
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
              className="px-7 py-3.5 bg-[#E5E4E2] text-[#0f1419] font-extrabold hover:bg-[#D0CFD0] transition-colors text-sm cursor-pointer"
            >
              Find your creators
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── 06 Video Production ── */}
      <section className="px-5 sm:px-8 lg:px-16 py-20 bg-[#1b1b22]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row-reverse gap-14 items-center">
          <motion.div {...fadeUp(0)} className="w-full md:w-1/2 overflow-hidden aspect-video relative group">
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <Play className="w-14 h-14 text-white fill-white" />
            </div>
            <Image src="/images/video.webp" alt="Video production" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover grayscale" />
          </motion.div>
          <motion.div {...fadeUp(0.15)} className="w-full md:w-1/2">
            <span className="text-[#E5E4E2] font-medium mb-2 block text-xs tracking-widest uppercase font-body">
              06 / Video
            </span>
            <h2 className="text-4xl sm:text-5xl font-semibold text-[#F8F8FF] mb-5 tracking-[-0.03em] font-heading">
              Video people don&apos;t skip
            </h2>
            <p className="text-[#B8C5D6]/70 text-base sm:text-lg mb-7 leading-relaxed font-body">
              From a 15-second hook to a full brand film — we make video that earns attention. Not just pretty visuals, but content engineered to perform on the platforms your audience actually uses.
            </p>
            <div className="space-y-3 mb-8">
              {[
                ["4K Production", "Full Studio Gear"],
                ["Post-Editing", "Motion Graphics"],
                ["Sound Design", "Custom Scores"],
              ].map(([left, right]) => (
                <div key={left} className="flex justify-between border-b border-[#F8F8FF]/[0.08] pb-2.5">
                  <span className="text-[#F8F8FF] font-medium text-sm font-heading">{left}</span>
                  <span className="text-[#B8C5D6]/50 text-sm font-body">{right}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => openModal("Interested in: Video Production")}
              className="px-7 py-3.5 bg-[#E5E4E2] text-[#0f1419] font-extrabold hover:bg-[#D0CFD0] transition-colors text-sm cursor-pointer"
            >
              See our work
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── CTA / Contact ── */}
      <section className="px-5 sm:px-8 lg:px-16 py-24 sm:py-32 bg-[#0e0e15] overflow-hidden">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 sm:gap-20">
          <motion.div {...fadeUp(0)}>
            <h2 className="text-5xl sm:text-6xl font-semibold tracking-[-0.04em] text-[#F8F8FF] mb-7 font-heading">
              Let&apos;s build{" "}
              <span className="text-[#E5E4E2] underline decoration-[#E5E4E2] underline-offset-8">
                something real.
              </span>
            </h2>
            <p className="text-[#B8C5D6]/70 text-base sm:text-lg mb-10 leading-relaxed font-body">
              We take on a limited number of new clients each month. If you&apos;re serious about growing, drop us a message and we&apos;ll get back to you within 24 hours.
            </p>
            <div className="hidden md:space-y-3 md:block mt-10">
              {[
                { step: "01", label: "Fill the form", desc: "Tell us about your brand and what you need." },
                { step: "02", label: "We review", desc: "Our team looks at your brief within 24 hours." },
                { step: "03", label: "Strategy call", desc: "We get on a call and map out the plan together." },
              ].map((s) => (
                <div key={s.step} className="flex items-center gap-5 bg-[#1a1f26] border border-[#F8F8FF]/[0.06] px-5 py-4 rounded-lg hover:border-[#E5E4E2]/20 transition-colors duration-300">
                  <span className="text-2xl font-extrabold text-[#E5E4E2]/20 font-heading w-10 flex-shrink-0">{s.step}</span>
                  <div className="w-px h-8 bg-[#E5E4E2]/10 flex-shrink-0" />
                  <div>
                    <p className="text-base font-semibold text-[#F8F8FF] font-heading">{s.label}</p>
                    <p className="text-sm text-[#B8C5D6]/60 font-body mt-0.5">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

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
  const [error, setError] = useState<string | null>(null);
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
    setError(null);
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
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-16 text-center">
        <CheckCircle2 className="w-12 h-12 text-green-400 mb-4" />
        <h3 className="text-xl font-semibold text-[#F8F8FF] mb-2 font-heading">
          We got it.
        </h3>
        <p className="text-sm text-[#B8C5D6]/60 font-body">We&apos;ll be in touch within 24 hours.</p>
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
            <label className="block text-xs font-medium uppercase tracking-widest text-[#B8C5D6]/50 mb-2 font-body">{f.label}</label>
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
        <label className="block text-xs font-medium uppercase tracking-widest text-[#B8C5D6]/50 mb-2 font-body">Email</label>
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
        <label className="block text-xs font-medium uppercase tracking-widest text-[#B8C5D6]/50 mb-2 font-body">What do you need?</label>
        <select
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className="w-full bg-[#1a1f26] text-[#F8F8FF] text-sm py-3 px-4 focus:outline-none focus:ring-1 focus:ring-[#E5E4E2]/50 transition-all"
        >
          <option value="">Pick a service...</option>
          <option>Website Design &amp; Dev</option>
          <option>Product Marketing</option>
          <option>Content Creation</option>
          <option>Social Media</option>
          <option>Influencer Collabs</option>
          <option>Video Production</option>
        </select>
      </div>
      <div>
        <label className="block text-xs font-medium uppercase tracking-widest text-[#B8C5D6]/50 mb-2 font-body">Tell us about your brand</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          required
          placeholder="What are you building? Where are you stuck?"
          className="w-full bg-[#1a1f26] text-[#F8F8FF] text-sm py-3 px-4 focus:outline-none focus:ring-1 focus:ring-[#E5E4E2]/50 placeholder:text-[#B8C5D6]/30 transition-all resize-none"
        />
      </div>

      {error && (
        <div className="flex items-center gap-2 text-sm text-red-400 bg-red-400/10 border border-red-400/20 px-3 py-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 bg-[#E5E4E2] text-[#0f1419] font-extrabold uppercase tracking-widest text-sm hover:bg-[#D0CFD0] transition-colors disabled:opacity-50 font-heading cursor-pointer"
      >
        {isSubmitting ? "Sending..." : "Let's talk"}
      </button>
    </form>
  );
}

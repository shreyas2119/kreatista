"use client";

import Link from "next/link";
import { ArrowRight, Mail, Calendar } from "lucide-react";
import { FaLinkedinIn, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { useContactModal } from "@/components/providers/contact-modal";

const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/socioryx/", icon: FaLinkedinIn },
  { label: "Instagram", href: "https://www.instagram.com/socioryx_network/", icon: FaInstagram },
  { label: "X", href: "https://x.com/SocioryxN79343", icon: FaXTwitter },
];

export default function ContactPageContent() {
  const { openContactForm, openCalendly } = useContactModal();

  return (
    <section className="pt-32 pb-28 px-5 sm:px-8 lg:px-16">
      <div className="max-w-4xl mx-auto">
        <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#E5E4E2] mb-4 font-body">Contact</p>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#F8F8FF] tracking-[-0.04em] leading-[1.05] mb-5 font-heading">
          Tell us what you are building.
        </h1>
        <p className="text-lg text-[#B8C5D6]/70 leading-relaxed font-body max-w-xl mb-10">
          Book a free 30-minute strategy call, or send a message. We reply to every enquiry within 24 hours.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-12">
          <button
            onClick={() => openCalendly("Contact page enquiry")}
            className="flex items-center justify-between gap-4 bg-[#E5E4E2] text-[#0f1419] rounded-2xl p-6 text-left hover:bg-[#D0CFD0] transition-colors"
          >
            <div>
              <p className="text-base font-extrabold uppercase tracking-widest font-heading">Book a call</p>
              <p className="text-xs text-[#0f1419]/60 font-body mt-1">Free 30-minute strategy call</p>
            </div>
            <Calendar className="w-5 h-5 flex-shrink-0" />
          </button>
          <button
            onClick={() => openContactForm()}
            className="flex items-center justify-between gap-4 bg-[#151a21] border border-[#F8F8FF]/[0.07] text-[#F8F8FF] rounded-2xl p-6 text-left hover:border-[#F8F8FF]/[0.16] transition-colors"
          >
            <div>
              <p className="text-base font-extrabold uppercase tracking-widest font-heading">Send a message</p>
              <p className="text-xs text-[#B8C5D6]/50 font-body mt-1">Email us directly</p>
            </div>
            <Mail className="w-5 h-5 flex-shrink-0 text-[#E5E4E2]" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-xs font-medium tracking-[0.2em] uppercase text-[#E5E4E2] mb-4 font-body">Direct</h2>
            <a href="mailto:work@socioryx.com" className="text-lg text-[#F8F8FF] font-heading hover:text-[#E5E4E2] transition-colors">
              work@socioryx.com
            </a>
            <p className="text-sm text-[#B8C5D6]/45 font-body mt-3">Based in India, serving clients across the country.</p>
            <p className="text-sm text-[#B8C5D6]/45 font-body mt-1">Founded 2024.</p>
          </div>

          <div>
            <h2 className="text-xs font-medium tracking-[0.2em] uppercase text-[#E5E4E2] mb-4 font-body">Elsewhere</h2>
            <ul className="space-y-2">
              {socials.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-[#B8C5D6]/60 hover:text-[#F8F8FF] transition-colors font-body"
                  >
                    <Icon className="w-4 h-4 text-[#E5E4E2]" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-[#F8F8FF]/[0.06]">
          <p className="text-sm text-[#B8C5D6]/50 font-body mb-3">Not ready to talk yet?</p>
          <Link
            href="/free-ai-marketing-audit"
            className="inline-flex items-center gap-2 text-sm text-[#E5E4E2] font-body underline underline-offset-4 decoration-[#E5E4E2]/30 hover:decoration-[#E5E4E2]/70 transition-colors"
          >
            Run the free AI marketing audit
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

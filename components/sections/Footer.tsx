'use client';

import React from 'react';
import type { ComponentProps, ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FaLinkedinIn, FaInstagram, FaXTwitter } from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';
import { useContactModal } from '@/components/providers/contact-modal';
import { useRouter, usePathname } from 'next/navigation';

interface FooterLink {
  title: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  sectionId?: string;
}

interface FooterSection {
  label: string;
  links: FooterLink[];
}

const footerLinks: FooterSection[] = [
  {
    label: 'Socials',
    links: [
      { title: 'LinkedIn',  href: 'https://www.linkedin.com/company/socioryx/', icon: FaLinkedinIn },
      { title: 'Instagram', href: 'https://www.instagram.com/droppingsoon12/', icon: FaInstagram },
      { title: 'X',         href: 'https://x.com/SocioryxN79343', icon: FaXTwitter },
      { title: 'Gmail',     href: 'mailto:work@socioryx.com',   icon: MdEmail },
    ],
  },
  {
    label: 'Agency',
    links: [
      { title: 'Portfolio', href: '/portfolio' },
      { title: 'Services',  href: '/#services', sectionId: 'services' },
      { title: 'Team',      href: '/#team',     sectionId: 'team' },
    ],
  },
  {
    label: 'Legal',
    links: [
      { title: 'Privacy Policy',   href: '/privacy' },
      { title: 'Terms of Service', href: '/terms' },
    ],
  },
];

type ViewAnimationProps = {
  delay?: number;
  className?: ComponentProps<typeof motion.div>['className'];
  children: ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
  const shouldReduceMotion = useReducedMotion();
  if (shouldReduceMotion) return <>{children}</>;
  return (
    <motion.div
      initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
      whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Footer() {
  const { openContactForm } = useContactModal();
  const router = useRouter();
  const pathname = usePathname();

  const handleLink = (e: React.MouseEvent<HTMLAnchorElement>, link: FooterLink) => {
    if (!link.sectionId) return;
    e.preventDefault();
    const scrollToSection = () => {
      const el = document.getElementById(link.sectionId!);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    };
    if (pathname === '/') {
      scrollToSection();
    } else {
      router.push('/');
      // Wait for navigation then scroll
      setTimeout(scrollToSection, 500);
    }
  };

  return (
    <footer className="relative w-full max-w-6xl mx-auto flex flex-col items-center justify-center rounded-t-3xl border-t border-[#F8F8FF]/[0.06] bg-[radial-gradient(35%_128px_at_50%_0%,rgba(229,228,226,0.06),transparent)] px-6 py-12 lg:py-16">
      <div className="absolute top-0 right-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur bg-[#E5E4E2]/30" />

      <div className="grid w-full gap-8 xl:grid-cols-3 xl:gap-8">

        {/* Brand */}
        <AnimatedContainer className="space-y-4">
          <span className="text-xl font-extrabold text-[#F8F8FF] tracking-[-0.02em] block font-heading">
            SOCIO<span className="text-[#E5E4E2]">RYX</span>
          </span>
          <p className="text-sm text-[#B8C5D6]/40 leading-relaxed max-w-[200px] font-body">
            Architecting digital dominance for the next generation of industry leaders.
          </p>
          <button
            onClick={() => openContactForm()}
            className="text-sm font-extrabold text-[#0f1419] bg-[#E5E4E2] hover:bg-[#D0CFD0] px-4 py-2 rounded transition-colors font-heading"
          >
            Contact Us
          </button>
          <p className="text-sm text-[#B8C5D6]/30 font-body pt-4">
            © {new Date().getFullYear()} Socioryx Agency. All rights reserved.
          </p>
        </AnimatedContainer>

        {/* Link columns */}
        <div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-3 xl:col-span-2 xl:mt-0">
          {footerLinks.map((section, index) => (
            <AnimatedContainer key={section.label} delay={0.1 + index * 0.1}>
              <div className="mb-10 md:mb-0">
                <h2 className="text-sm font-extrabold text-[#F8F8FF] tracking-[0.1em] uppercase font-heading">
                  {section.label}
                </h2>
                <ul className="mt-4 space-y-3">
                  {section.links.map((link) => (
                    <li key={link.title}>
                      <a
                        href={link.href}
                        onClick={(e) => handleLink(e, link)}
                        target={link.href.startsWith('http') || link.href.startsWith('mailto') ? '_blank' : undefined}
                        rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="inline-flex items-center gap-2 text-sm text-[#B8C5D6]/50 hover:text-[#F8F8FF] hover:translate-x-1 transition-all duration-200 font-body"
                      >
                        {link.icon && <link.icon className="w-4 h-4 text-[#E5E4E2] flex-shrink-0" />}
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedContainer>
          ))}
        </div>

      </div>

      {/* Bottom bar */}
      <div className="mt-12 w-full border-t border-[#F8F8FF]/[0.06] pt-8 flex flex-col gap-3">
        <p className="text-xs text-[#B8C5D6]/25 font-body leading-relaxed">
          Results from digital marketing campaigns vary. Socioryx makes no guarantee of specific outcomes.{" "}
          <a href="/terms" className="underline underline-offset-2 hover:text-[#B8C5D6]/50 transition-colors">Terms of Service</a>.
        </p>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1">
          <span className="text-sm text-[#B8C5D6]/20 font-body">Based in India</span>
          <span className="text-sm text-[#B8C5D6]/20 font-body">Global Production</span>
        </div>
      </div>
    </footer>
  );
}

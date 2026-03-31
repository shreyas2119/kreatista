'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon';
import { createPortal } from 'react-dom';
import { useContactModal } from '@/components/providers/contact-modal';
import { useAuth } from '@/components/providers/auth-provider';
import { AuthModal } from '@/components/ui/auth-modal';

const navLinks = [
  { label: "Home",      href: "/" },
  { label: "Services",  href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
];

export function Header() {
  const [open, setOpen] = React.useState(false);
  const [authOpen, setAuthOpen] = React.useState(false);
  const pathname = usePathname();
  const scrolled = useScroll(10);
  const { openCalendly } = useContactModal();
  useAuth();

  React.useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      scrolled
        ? 'bg-[#0f1419]/80 backdrop-blur-xl border-b border-[#F8F8FF]/[0.06]'
        : 'bg-transparent'
    )}>
      <nav className="mx-auto flex h-16 sm:h-20 w-full max-w-6xl items-center justify-between px-5 sm:px-8 lg:px-16">

        {/* Logo */}
        <Link
          href="/"
          className="text-2xl sm:text-3xl font-extrabold tracking-tighter text-[#F8F8FF] hover:opacity-80 transition-opacity flex-shrink-0 font-heading"
        >
          Sociory<span className="text-red-500">X</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  'px-4 py-2 text-base font-medium tracking-tight transition-all duration-200 font-heading',
                  isActive
                    ? 'text-[#E5E4E2] border-b-2 border-[#E5E4E2] pb-1.5'
                    : 'text-[#B8C5D6] hover:text-[#F8F8FF] hover:bg-white/[0.04]'
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => openCalendly()}
            className="text-base font-extrabold px-6 py-2.5 bg-[#E5E4E2] text-[#0f1419] hover:bg-[#D0CFD0] hover:text-[#0f1419] transition-colors rounded-lg font-heading"
          >
            Let&apos;s Talk
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-[#F8F8FF]"
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          <MenuToggleIcon open={open} className="size-6" duration={300} />
        </button>
      </nav>

      {/* Mobile menu */}
      <MobileMenu open={open}>
        <nav className="flex flex-col gap-1 flex-1 overflow-y-auto">
          {navLinks.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'px-3 py-3.5 text-base font-medium transition-colors font-heading',
                  isActive
                    ? 'text-[#E5E4E2] border-l-2 border-[#E5E4E2] pl-4 bg-[#E5E4E2]/[0.06]'
                    : 'text-[#F8F8FF] hover:bg-[#1a1f26]'
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex flex-col gap-2 pt-4 border-t border-[#F8F8FF]/[0.08]">
          <button
            onClick={() => { setOpen(false); openCalendly(); }}
            className="w-full py-3.5 text-base font-extrabold bg-[#E5E4E2] text-[#0f1419] hover:bg-[#D0CFD0] hover:text-[#0f1419] transition-colors rounded-lg font-heading"
          >
            Let&apos;s Talk
          </button>
        </div>
      </MobileMenu>

      <AuthModal open={authOpen} onOpenChange={setAuthOpen} onSuccess={() => setAuthOpen(false)} />
    </header>
  );
}

function MobileMenu({ open, children }: { open: boolean; children: React.ReactNode }) {
  if (!open || typeof window === 'undefined') return null;
  return createPortal(
    <div className="fixed top-14 sm:top-16 inset-x-0 bottom-0 z-40 bg-[#0f1419]/95 backdrop-blur-xl border-t border-[#F8F8FF]/[0.06] flex flex-col p-5 md:hidden">
      {children}
    </div>,
    document.body
  );
}

function useScroll(threshold: number) {
  const [scrolled, setScrolled] = React.useState(false);
  const onScroll = React.useCallback(() => setScrolled(window.scrollY > threshold), [threshold]);
  React.useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [onScroll]);
  React.useEffect(() => { onScroll(); }, [onScroll]);
  return scrolled;
}


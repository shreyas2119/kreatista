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
  const { open: openModal } = useContactModal();
  const { user } = useAuth();

  React.useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      scrolled
        ? 'bg-[#13131a]/80 backdrop-blur-xl border-b border-[#e4e1ec]/[0.06]'
        : 'bg-transparent'
    )}>
      <nav className="mx-auto flex h-14 sm:h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8 lg:px-16">

        {/* Logo — Epilogue font, all caps, bold */}
        <Link
          href="/"
          className="text-xl sm:text-2xl font-black tracking-tighter text-[#e4e1ec] uppercase hover:opacity-80 transition-opacity flex-shrink-0"
          style={{ fontFamily: 'var(--font-epilogue)' }}
        >
          SOCIORYX
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
                  'px-4 py-2 text-sm font-bold tracking-tight transition-all duration-200',
                  isActive
                    ? 'text-[#c8622a] border-b-2 border-[#c8622a] pb-1.5'
                    : 'text-[#ddc1b5]/60 hover:text-[#e4e1ec] hover:bg-white/[0.04]'
                )}
                style={{ fontFamily: 'var(--font-epilogue)' }}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => openModal()}
            className="text-sm font-bold px-5 py-2 bg-[#c8622a] text-[#e4e1ec] hover:bg-[#b5561f] transition-colors rounded-lg"
            style={{ fontFamily: 'var(--font-epilogue)' }}
          >
            Book a Call
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-[#e4e1ec]"
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          <MenuToggleIcon open={open} className="size-5" duration={300} />
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
                  'px-3 py-3.5 text-base font-bold transition-colors',
                  isActive
                    ? 'text-[#c8622a] border-l-2 border-[#c8622a] pl-4 bg-[#c8622a]/[0.06]'
                    : 'text-[#e4e1ec] hover:bg-[#2a2931]'
                )}
                style={{ fontFamily: 'var(--font-epilogue)' }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex flex-col gap-2 pt-4 border-t border-[#e4e1ec]/[0.08]">
          <button
            onClick={() => { setOpen(false); openModal(); }}
            className="w-full py-3 text-sm font-bold bg-[#c8622a] text-[#e4e1ec] hover:bg-[#b5561f] transition-colors rounded-lg"
            style={{ fontFamily: 'var(--font-epilogue)' }}
          >
            Book a Call
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
    <div className="fixed top-14 sm:top-16 inset-x-0 bottom-0 z-40 bg-[#13131a]/95 backdrop-blur-xl border-t border-[#e4e1ec]/[0.06] flex flex-col p-5 md:hidden">
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


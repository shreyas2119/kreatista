'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon';
import { createPortal } from 'react-dom';
import { useContactModal } from '@/components/providers/contact-modal';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { LucideIcon } from 'lucide-react';
import {
  VideoIcon,
  PenToolIcon,
  BarChart2Icon,
  UsersIcon,
  Share2Icon,
  TrendingUpIcon,
  InfoIcon,
  MailIcon,
  InstagramIcon,
} from 'lucide-react';

type LinkItem = {
  title: string;
  href: string;
  icon: LucideIcon;
  description?: string;
};

export function Header() {
  const [open, setOpen] = React.useState(false);
  const scrolled = useScroll(10);
  const { open: openModal } = useContactModal();

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={cn('sticky top-0 z-50 w-full border-b border-transparent', {
        'bg-background/95 supports-[backdrop-filter]:bg-background/50 border-border backdrop-blur-lg': scrolled,
      })}
    >
      <nav className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-5">
          <a href="#" className="text-lg font-bold text-foreground tracking-tight hover:opacity-80 transition-opacity">
            Krea<span className="text-violet-500">tista</span>
          </a>
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-sm">Services</NavigationMenuTrigger>
                <NavigationMenuContent className="bg-background p-1 pr-1.5">
                  <ul className="bg-popover grid w-[480px] grid-cols-2 gap-2 rounded-md border p-2 shadow">
                    {serviceLinks.map((item, i) => (
                      <li key={i}><ListItem {...item} /></li>
                    ))}
                  </ul>
                  <div className="p-2">
                    <p className="text-muted-foreground text-sm">
                      Not sure where to start?{' '}
                      <a href="#contact" className="text-foreground font-medium hover:underline">Book a free call</a>
                    </p>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-sm">Company</NavigationMenuTrigger>
                <NavigationMenuContent className="bg-background p-1 pr-1.5 pb-1.5">
                  <div className="grid w-[360px] grid-cols-2 gap-2">
                    <ul className="bg-popover space-y-2 rounded-md border p-2 shadow">
                      {companyLinks.map((item, i) => (
                        <li key={i}><ListItem {...item} /></li>
                      ))}
                    </ul>
                    <ul className="space-y-2 p-3">
                      {companyLinks2.map((item, i) => (
                        <li key={i}>
                          <NavigationMenuLink
                            href={item.href}
                            className="flex p-2 hover:bg-accent flex-row rounded-md items-center gap-x-2"
                          >
                            <item.icon className="text-foreground size-4" />
                            <span className="font-medium text-sm">{item.title}</span>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuLink className="px-4" asChild>
                <a href="#" className="hover:bg-accent rounded-md p-2 text-sm">Work</a>
              </NavigationMenuLink>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" size="sm">Sign Up</Button>
          <Button size="sm" onClick={openModal}>Book a Call</Button>
        </div>

        <Button
          size="icon"
          variant="outline"
          onClick={() => setOpen(!open)}
          className="md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label="Toggle menu"
        >
          <MenuToggleIcon open={open} className="size-5" duration={300} />
        </Button>
      </nav>

      <MobileMenu open={open} className="flex flex-col justify-between gap-2 overflow-y-auto">
        <NavigationMenu className="max-w-full">
          <div className="flex w-full flex-col gap-y-2">
            <span className="text-sm text-muted-foreground">Services</span>
            {serviceLinks.map((link) => (<ListItem key={link.title} {...link} />))}
            <span className="text-sm text-muted-foreground mt-2">Company</span>
            {companyLinks.map((link) => (<ListItem key={link.title} {...link} />))}
            {companyLinks2.map((link) => (<ListItem key={link.title} {...link} />))}
          </div>
        </NavigationMenu>
        <div className="flex flex-col gap-2">
          <Button variant="outline" className="w-full bg-transparent">Sign In</Button>
          <Button className="w-full" onClick={() => { setOpen(false); openModal(); }}>Book a Call</Button>
        </div>
      </MobileMenu>
    </header>
  );
}

type MobileMenuProps = React.ComponentProps<'div'> & { open: boolean };

function MobileMenu({ open, children, className, ...props }: MobileMenuProps) {
  if (!open || typeof window === 'undefined') return null;
  return createPortal(
    <div
      id="mobile-menu"
      className={cn(
        'bg-background/95 supports-[backdrop-filter]:bg-background/50 backdrop-blur-lg',
        'fixed top-14 right-0 bottom-0 left-0 z-40 flex flex-col overflow-hidden border-y md:hidden',
      )}
    >
      <div
        data-slot={open ? 'open' : 'closed'}
        className={cn(
          'data-[slot=open]:animate-in data-[slot=open]:zoom-in-97 ease-out',
          'size-full p-4',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}

function ListItem({
  title,
  description,
  icon: Icon,
  className,
  href,
  ...props
}: React.ComponentProps<typeof NavigationMenuLink> & LinkItem) {
  return (
    <NavigationMenuLink
      className={cn(
        'w-full flex flex-row gap-x-2 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground rounded-sm p-2',
        className
      )}
      {...props}
      asChild
    >
      <a href={href}>
        <div className="bg-background/40 flex aspect-square size-10 items-center justify-center rounded-md border shadow-sm flex-shrink-0">
          <Icon className="text-foreground size-4" />
        </div>
        <div className="flex flex-col items-start justify-center">
          <span className="font-medium text-sm">{title}</span>
          {description && <span className="text-muted-foreground text-xs">{description}</span>}
        </div>
      </a>
    </NavigationMenuLink>
  );
}

const serviceLinks: LinkItem[] = [
  { title: 'SaaS Marketing', href: '#', description: 'Data-driven growth for SaaS brands', icon: TrendingUpIcon },
  { title: 'Content Creation', href: '#', description: 'Scroll-stopping visuals & storytelling', icon: PenToolIcon },
  { title: 'Social Media', href: '#', description: 'Grow and engage your audience', icon: Share2Icon },
  { title: 'Video Production', href: '#', description: 'High-quality video for every platform', icon: VideoIcon },
  { title: 'Influencer Collabs', href: '#', description: 'ROI-focused influencer campaigns', icon: UsersIcon },
  { title: 'Analytics', href: '#', description: 'Track, measure and optimize results', icon: BarChart2Icon },
];

const companyLinks: LinkItem[] = [
  { title: 'About Us', href: '#', description: 'Our story and team', icon: InfoIcon },
  { title: 'Contact', href: '#', description: 'Get in touch with us', icon: MailIcon },
];

const companyLinks2: LinkItem[] = [
  { title: 'Instagram', href: '#', icon: InstagramIcon },
];

function useScroll(threshold: number) {
  const [scrolled, setScrolled] = React.useState(false);
  const onScroll = React.useCallback(() => {
    setScrolled(window.scrollY > threshold);
  }, [threshold]);
  React.useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [onScroll]);
  React.useEffect(() => { onScroll(); }, [onScroll]);
  return scrolled;
}

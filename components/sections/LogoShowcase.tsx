"use client";

import { GradientHeading } from "@/components/ui/gradient-heading";
import { LogoCarouselAnimated, type Logo } from "@/components/ui/logo-carousel-animated";
import {
  AppleIcon,
  SupabaseIcon,
  VercelIcon,
  StripeIcon,
  TypeScriptIcon,
  ClaudeAIIcon,
  OpenAIIcon,
  TailwindCSSIcon,
  NextjsIcon,
  UpstashIcon,
} from "@/components/ui/logo-icons";

const allLogos: Logo[] = [
  { name: "Apple", id: 1, img: AppleIcon },
  { name: "Supabase", id: 2, img: SupabaseIcon },
  { name: "Vercel", id: 3, img: VercelIcon },
  { name: "Stripe", id: 4, img: StripeIcon },
  { name: "TypeScript", id: 5, img: TypeScriptIcon },
  { name: "Claude AI", id: 6, img: ClaudeAIIcon },
  { name: "OpenAI", id: 7, img: OpenAIIcon },
  { name: "Tailwind CSS", id: 8, img: TailwindCSSIcon },
  { name: "Next.js", id: 9, img: NextjsIcon },
  { name: "Upstash", id: 10, img: UpstashIcon },
];

export default function LogoShowcase() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      <div className="space-y-8 py-24">
        <div className="mx-auto flex w-full max-w-screen-lg flex-col items-center space-y-8">
          <div className="text-center">
            <GradientHeading variant="secondary">
              The best are already here
            </GradientHeading>
            <GradientHeading size="xxl">Trusted by Industry Leaders</GradientHeading>
          </div>
          <LogoCarouselAnimated columnCount={3} logos={allLogos} />
        </div>
      </div>
    </section>
  );
}

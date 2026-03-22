"use client";

import ShaderBackground from "@/components/ui/shader-background";
import { LogoCarouselAnimated, type Logo } from "@/components/ui/logo-carousel-animated";
import {
  InstagramIcon,
  TwitterIcon,
  RedditIcon,
  LinkedInIcon,
  FacebookIcon,
  HackerNewsIcon,
} from "@/components/ui/logo-icons";

const tools: Logo[] = [
  { name: "Instagram", id: 1, img: InstagramIcon },
  { name: "X (Twitter)", id: 2, img: TwitterIcon },
  { name: "Reddit", id: 3, img: RedditIcon },
  { name: "LinkedIn", id: 4, img: LinkedInIcon },
  { name: "Facebook", id: 5, img: FacebookIcon },
  { name: "Hacker News", id: 6, img: HackerNewsIcon },
];

export default function ToolsStack() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* WebGL Shader Background - Centered */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen h-[800px] z-0 opacity-40">
        <ShaderBackground />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full py-28">
        <div className="max-w-4xl mx-auto px-4 text-center mb-14">
          <h2 className="text-3xl sm:text-5xl font-bold leading-tight text-white">
            Tools We Master
          </h2>
        </div>

        <div className="flex justify-center">
          <LogoCarouselAnimated columnCount={3} logos={tools} />
        </div>
      </div>
    </section>
  );
}

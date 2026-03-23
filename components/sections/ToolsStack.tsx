"use client";

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
      {/* CSS gradient orbs replacing WebGL shader */}
      <div
        className="absolute top-1/2 left-1/2 w-[600px] h-[600px] rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, #6d28d9, #1e1b4b)", animation: "orbFloat1 8s ease-in-out infinite", transform: "translate(-50%, -50%)" }}
      />
      <div
        className="absolute top-1/2 left-1/2 w-[400px] h-[400px] rounded-full opacity-20 blur-2xl"
        style={{ background: "radial-gradient(circle, #7c3aed, #312e81)", animation: "orbFloat2 11s ease-in-out infinite", transform: "translate(-50%, -50%)" }}
      />
      <div
        className="absolute top-1/2 left-1/2 w-[300px] h-[300px] rounded-full opacity-25 blur-2xl"
        style={{ background: "radial-gradient(circle, #4c1d95, #0f172a)", animation: "orbFloat3 14s ease-in-out infinite", transform: "translate(-50%, -50%)" }}
      />

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

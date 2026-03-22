"use client";

import { Marquee } from "@/components/shadcn-space/animations/marquee";
import { TextRoll } from "@/components/ui/text-roll";

const platformLogos = [
  "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/instagram.svg",
  "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/facebook.svg",
  "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/linkedin.svg",
  "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/x.svg",
  "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/reddit.svg",
  "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/youtube.svg",
  "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/twitter.svg",
];

const platformNames = [
  "Instagram",
  "Facebook", 
  "LinkedIn",
  "X",
  "Reddit",
  "YouTube",
  "Twitter",
];

export default function Platforms() {
  return (
    <section className="relative overflow-hidden bg-zinc-950 py-20">
      <div className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />
      
      <div className="max-w-4xl mx-auto px-4 text-center mb-12">
        <h2 className="text-3xl sm:text-5xl font-bold leading-tight">
          <TextRoll>We Post Everywhere</TextRoll>
        </h2>
      </div>

      <div className="max-w-3xl mx-auto">
        <Marquee className="[--duration:25s] p-0" pauseOnHover>
          {platformLogos.map((logo, index) => (
            <div 
              key={index} 
              className="flex items-center justify-center w-16 h-16 mr-12"
            >
              <img
                src={logo}
                alt={platformNames[index]}
                className="w-10 h-10 brightness-0 invert opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}

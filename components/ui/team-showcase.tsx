"use client";

import { useState } from "react";
import Image from "next/image";
import { FaLinkedinIn, FaTwitter, FaInstagram } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { cn } from "@/lib/utils";
import type { TeamMember } from "@/lib/team";

interface TeamShowcaseProps {
  members: TeamMember[];
}

export default function TeamShowcase({ members }: TeamShowcaseProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const col1 = members.filter((_, i) => i % 3 === 0);
  const col2 = members.filter((_, i) => i % 3 === 1);
  const col3 = members.filter((_, i) => i % 3 === 2);

  return (
    <>
      {/* Mobile — simple 2-col grid */}
      <div className="lg:hidden w-full max-w-2xl mx-auto px-5 sm:px-8 grid grid-cols-2 gap-5 py-8">
        {members.map((member, i) => (
          <div key={member.name} className="bg-[#151a21] rounded-xl overflow-hidden">
            <div className="aspect-square w-full bg-[#1a1f26] flex items-center justify-center">
              {member.photo ? (
                <img src={member.photo} alt={member.name} className="w-full h-full object-cover grayscale" />
              ) : (
                <span className="text-3xl font-semibold text-[#F8F8FF]/15 font-heading">
                  {member.name.split(" ").map((n) => n[0]).join("").toUpperCase()}
                </span>
              )}
            </div>
            <div className="p-4">
              <p className="text-base font-semibold text-[#F8F8FF] tracking-tight mb-0.5 font-heading">
                {member.name}
              </p>
              <p className="text-xs text-[#B8C5D6]/50 mb-3 font-body">{member.role}</p>
              {member.socials && (
                <div className="flex gap-2">
                  {member.socials.x && <a href={member.socials.x} target="_blank" rel="noopener noreferrer" className="text-[#B8C5D6]/40 hover:text-[#E5E4E2]"><FaTwitter size={13} /></a>}
                  {member.socials.linkedin && <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-[#B8C5D6]/40 hover:text-[#E5E4E2]"><FaLinkedinIn size={13} /></a>}
                  {member.socials.instagram && <a href={member.socials.instagram} target="_blank" rel="noopener noreferrer" className="text-[#B8C5D6]/40 hover:text-[#E5E4E2]"><FaInstagram size={13} /></a>}
                  {member.socials.email && <a href={`https://mail.google.com/mail/?view=cm&to=${member.socials.email}`} target="_blank" rel="noopener noreferrer" className="text-[#B8C5D6]/40 hover:text-[#E5E4E2]"><MdEmail size={15} /></a>}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Desktop — staggered showcase */}
      <div className="hidden lg:flex flex-row items-center justify-center gap-20 select-none w-full max-w-6xl mx-auto py-8 px-16">
        {/* Photo grid */}
        <div className="flex gap-4 flex-shrink-0">
          <div className="flex flex-col gap-4">
            {col1.map((member) => (
              <PhotoCard key={member.name} member={member} className="w-[210px] h-[240px]" hoveredId={hoveredId} onHover={setHoveredId} />
            ))}
          </div>
          <div className="flex flex-col gap-4 mt-[100px]">
            {col2.map((member) => (
              <PhotoCard key={member.name} member={member} className="w-[230px] h-[255px]" hoveredId={hoveredId} onHover={setHoveredId} />
            ))}
          </div>
          <div className="flex flex-col gap-4 mt-[50px]">
            {col3.map((member) => (
              <PhotoCard key={member.name} member={member} className="w-[218px] h-[242px]" hoveredId={hoveredId} onHover={setHoveredId} />
            ))}
          </div>
        </div>

        {/* Member list */}
        <div className="flex flex-col gap-6 pt-4 flex-1 max-w-sm">
          {members.map((member) => (
            <MemberRow key={member.name} member={member} hoveredId={hoveredId} onHover={setHoveredId} />
          ))}
        </div>
      </div>
    </>
  );
}

function PhotoCard({ member, className, hoveredId, onHover }: {
  member: TeamMember;
  className: string;
  hoveredId: string | null;
  onHover: (id: string | null) => void;
}) {
  const isActive = hoveredId === member.name;
  const isDimmed = hoveredId !== null && !isActive;

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl cursor-pointer flex-shrink-0 transition-opacity duration-300 bg-[#1a1f26]",
        className,
        isDimmed ? "opacity-40" : "opacity-100"
      )}
      onMouseEnter={() => onHover(member.name)}
      onMouseLeave={() => onHover(null)}
    >
      {member.photo ? (
        <Image
          src={member.photo}
          alt={member.name}
          width={200}
          height={220}
          className="w-full h-full object-cover transition-all duration-500"
          style={{ filter: isActive ? "grayscale(0) brightness(1)" : "grayscale(1) brightness(0.7)" }}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <span
            className={cn(
              "text-4xl font-semibold transition-colors duration-300 font-heading",
              isActive ? "text-[#F8F8FF]/40" : "text-[#F8F8FF]/10"
            )}
          >
            {member.name.split(" ").map((n) => n[0]).join("").toUpperCase()}
          </span>
        </div>
      )}
    </div>
  );
}

function MemberRow({ member, hoveredId, onHover }: {
  member: TeamMember;
  hoveredId: string | null;
  onHover: (id: string | null) => void;
}) {
  const isActive = hoveredId === member.name;
  const isDimmed = hoveredId !== null && !isActive;

  return (
    <div
      className={cn("cursor-pointer transition-opacity duration-300", isDimmed ? "opacity-30" : "opacity-100")}
      onMouseEnter={() => onHover(member.name)}
      onMouseLeave={() => onHover(null)}
    >
      <div className="flex items-center gap-3">
        {/* Active indicator */}
        <span className={cn(
          "h-2.5 rounded-full flex-shrink-0 transition-all duration-300 bg-[#E5E4E2]",
          isActive ? "w-5 opacity-100" : "w-2.5 opacity-20"
        )} />

        <span className={cn(
          "text-xl lg:text-2xl font-semibold leading-none tracking-tight transition-colors duration-300 font-heading",
          isActive ? "text-[#F8F8FF]" : "text-[#F8F8FF]/60"
        )}>
          {member.name}
        </span>

        {/* Social icons — slide in on hover */}
        {member.socials && (
          <div className={cn(
            "flex items-center gap-1.5 transition-all duration-200",
            isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2 pointer-events-none"
          )}>
            {member.socials.x && (
              <a href={member.socials.x} target="_blank" rel="noopener noreferrer"
                className="p-2 rounded text-[#B8C5D6]/50 hover:text-[#E5E4E2] hover:bg-[#E5E4E2]/10 transition-all duration-150">
                <FaTwitter size={14} />
              </a>
            )}
            {member.socials.linkedin && (
              <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer"
                className="p-2 rounded text-[#B8C5D6]/50 hover:text-[#E5E4E2] hover:bg-[#E5E4E2]/10 transition-all duration-150">
                <FaLinkedinIn size={14} />
              </a>
            )}
            {member.socials.instagram && (
              <a href={member.socials.instagram} target="_blank" rel="noopener noreferrer"
                className="p-2 rounded text-[#B8C5D6]/50 hover:text-[#E5E4E2] hover:bg-[#E5E4E2]/10 transition-all duration-150">
                <FaInstagram size={14} />
              </a>
            )}
            {member.socials.email && (
              <a href={`https://mail.google.com/mail/?view=cm&to=${member.socials.email}`}
                target="_blank" rel="noopener noreferrer"
                className="p-2 rounded text-[#B8C5D6]/50 hover:text-[#E5E4E2] hover:bg-[#E5E4E2]/10 transition-all duration-150">
                <MdEmail size={16} />
              </a>
            )}
          </div>
        )}
      </div>

      <p className="mt-1.5 pl-[22px] text-xs font-medium uppercase tracking-[0.18em] text-[#B8C5D6]/40 font-body">
        {member.role}
      </p>
    </div>
  );
}

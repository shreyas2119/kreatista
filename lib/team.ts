export interface TeamMember {
  name: string;
  role: string;
  photo: string | null;
  socials?: {
    x?: string;
    linkedin?: string;
    instagram?: string;
    email?: string; // e.g. "name@gmail.com" — will open mailto:
  };
}

export const team: TeamMember[] = [
  {
    name: "Vansh Shrivastava",
    role: "Cofounder & Managing Director",
    photo: "/images/team/vansh.webp",
    socials: { x: "https://x.com/vansh_shriv1602" , linkedin: "https://www.linkedin.com/in/vansh-shrivastava-173847260/", instagram: "https://www.instagram.com/vansh_pvtt_14/" },
  },
  {
    name: "Shreyas Choukade",
    role: "Cofounder & Executive Director",
    photo: "/images/team/shreyas.jpeg",
    socials: { x: "https://x.com/ShreyasHChouka4", linkedin: "https://www.linkedin.com/in/shreyaschoukade/", instagram: "https://www.instagram.com/shreyash_choukade/" },
  },
  {
    name: "Suryansh Kumar",
    role: "Head of Tech Operations",
    photo: "/images/team/suryansh.webp",
    socials: { linkedin: "https://www.linkedin.com/in/suryansh-kumar-569338280?utm_source=share_via&utm_content=profile&utm_medium=member_android", instagram: "https://www.instagram.com/suryanshh20?igsh=bDhmbm12cjF5Z3pm" , email: "suryanshkumar0903@gmail.com"},
  },
  {
    name: "Hitesh Yadav",
    role: "Client Acquisition Director",
    photo: "/images/team/hitesh.jpeg",
    socials: { linkedin: "https://www.linkedin.com/in/hiteshyadav95/", instagram: "https://www.instagram.com/iam_hitesh_05/" },
  },
  {
    name: "Tanay Paliwali",
    role: "Content Execution Manager",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    socials: { instagram: "https://www.instagram.com/tanaypaliwal17/" },
  },
  {
    name: "Srajan Soni",
    role: "Video Editor",
    photo: "/images/team/srajan.jpeg",
    socials: { instagram: "https://instagram.com/" },
  },
  {
    name: "Priyanshu Basediya",
    role: "Ad & Campaign Manager",
    photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop",
    socials: { linkedin: "https://linkedin.com/in/", instagram: "https://www.instagram.com/priy_yanshu09/" },
  },
  {
    name: "Sanskar Singh Bais",
    role: "Content & Script Writer",
    photo: "/images/team/sanskar.jpeg",
    socials: { instagram: "https://instagram.com/" },
  },
];

// First 3 shown on homepage preview (the two cofounders + head of tech)
export const teamPreview = team.slice(0, 3);

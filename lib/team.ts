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
    socials: { instagram: "https://www.instagram.com/vansh_pvtt_14/" },
  },
  {
    name: "Shreyas Choukade",
    role: "Cofounder & Executive Director",
    photo: "/images/team/shreyas.jpeg",
    socials: { instagram: "https://www.instagram.com/shreyash_choukade/" },
  },
  {
    name: "Suryansh Kumar",
    role: "Head of Tech Operations",
    photo: "/images/team/suryansh.webp",
    socials: { instagram: "https://www.instagram.com/suryanshh20?igsh=bDhmbm12cjF5Z3pm" },
  },
  {
    name: "Hitesh Yadav",
    role: "Client Acquisition Director",
    photo: "/images/team/hitesh.jpeg",
    socials: { instagram: "https://www.instagram.com/iam_hitesh_05/" },
  },
  {
    name: "Tanay Paliwal",
    role: "Content Execution Manager",
    photo: "/images/team/tanay.jpeg",
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
    socials: { instagram: "https://www.instagram.com/priy_yanshu09/" },
  },
  {
    name: "Sanskar Singh Bais",
    role: "Content & Script Writer",
    photo: "/images/team/sanskar.jpeg",
    socials: { instagram: "https://instagram.com/" },
  },
  {
    name: "Nehil Khare",
    role: "Content Researcher",
    photo: "/images/team/nehil.jpeg",
    socials: { instagram: "https://www.instagram.com/nehil_khare_?igsh=MWNmb2Z3OGJienZwZg==" },
  },
];

// First 3 shown on homepage preview (the two cofounders + head of tech)
export const teamPreview = team.slice(0, 3);

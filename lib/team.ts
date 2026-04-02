export interface TeamMember {
  name: string;
  role: string;
  photo: string | null;
  objectPosition?: string;
  photoScale?: number; // e.g. 1.2 for 20% zoom
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
    role: "Cofounder & Managing Lead",
    photo: "/images/team/vansh.webp",
    socials: { instagram: "https://www.instagram.com/vansh_pvtt_14/" },
  },
  {
    name: "Shreyas Choukade",
    role: "Cofounder & Executive Lead",
    photo: "/images/team/shreyas_v2.jpeg",
    photoScale: 1.25,
    socials: { instagram: "https://www.instagram.com/shreyash_choukade/" },
  },
  {
    name: "Suryansh Kumar",
    role: "Head of Tech Operations",
    photo: "/images/team/suryansh.webp",
    objectPosition: "center 50%",
    socials: { instagram: "https://www.instagram.com/suryanshh20/" },
  },
  {
    name: "Hitesh Yadav",
    role: "Client Acquisition Lead",
    photo: "/images/team/hitesh.jpeg",
    socials: { instagram: "https://www.instagram.com/iam_hitesh_05/" },
  },
  {
    name: "Tanay Paliwal",
    role: "Content Executive Lead",
    photo: "/images/team/tanay.jpeg",
    socials: { instagram: "https://www.instagram.com/tanaypaliwal17/" },
  },
  {
    name: "Srajan Soni",
    role: "Video Editor",
    photo: "/images/team/srajan_v2.jpeg",
    socials: { instagram: "https://instagram.com/" },
  },
  {
    name: "Priyanshu Basediya",
    role: "Ad & Campaign Management",
    photo: "/images/team/priyanshu.jpeg",
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
    role: "Content Research Analyst",
    photo: "/images/team/nehil.jpeg",
    socials: { instagram: "https://www.instagram.com/nehil_khare_/" },
  },
];

// First 3 shown on homepage preview (the two cofounders + head of tech)
export const teamPreview = team.slice(0, 3);

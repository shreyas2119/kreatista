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
    role: "Founder & Managing Lead",
    photo: "/images/team/vansh.webp",
    socials: { instagram: "https://www.instagram.com/vansh_pvtt_14/" },
  },
  {
    name: "Shreyas Choukade",
    role: "Operations Analyst",
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
    name: "Nehil Khare",
    role: "Content Execution Lead",
    photo: "/images/team/nehil.jpeg",
    socials: { instagram: "https://www.instagram.com/nehil_khare_/" },
  },
  // {
  //   name: "Tanay Paliwal",
  //   role: "Content Executive Lead",
  //   photo: "/images/team/tanay.jpeg",
  //   socials: { instagram: "https://www.instagram.com/tanaypaliwal17/" },
  // },
  {
    name: "Srajan Soni",
    role: "Video Editor",
    photo: "/images/team/srajan_v2.jpeg",
    socials: { instagram: "https://www.instagram.com/iam_srajan_soni/" },
  },
  {
    name: "MO Arfaj",
    role: "Content Execution Lead (LinkedIN and X)",
    photo: "/images/team/arfaj.webp",
    socials: { linkedin: "https://www.linkedin.com/in/mo-arfaj-779527380/" },
  },
  {
    name: "Sai Vyas",
    role: "Client Acquisition Lead",
    photo: "/images/team/sai.jpeg",
    socials: { instagram: "https://www.instagram.com/saivyas5013/" },
  },
  {
    name: "Sanskar Singh Bais",
    role: "Content & Script Writer",
    photo: "/images/team/sanskar.jpeg",
    socials: { instagram: "https://www.instagram.com/sanskar_s_bais/"},
  },
];

// First 3 shown on homepage preview (the two cofounders + head of tech)
export const teamPreview = team.slice(0, 3);

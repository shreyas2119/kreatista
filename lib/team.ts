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
    photo: null,
    socials: { x: "https://x.com/vansh_shriv1602" , linkedin: "https://www.linkedin.com/in/vansh-shrivastava-173847260/", instagram: "https://www.instagram.com/vansh_pvtt_14/" },
  },
  {
    name: "Shreyas Choukade",
    role: "Cofounder & Executive Director",
    photo: null,
    socials: { x: "https://x.com/ShreyasHChouka4", linkedin: "https://www.linkedin.com/in/shreyaschoukade/", instagram: "https://www.instagram.com/shreyash_choukade/" },
  },
  {
    name: "Suryansh Kumar",
    role: "Head of Tech Operations",
    photo: null,
    socials: { linkedin: "https://www.linkedin.com/in/suryansh-kumar-569338280?utm_source=share_via&utm_content=profile&utm_medium=member_android", instagram: "https://www.instagram.com/suryanshh20?igsh=bDhmbm12cjF5Z3pm" , email: "suryanshkumar0903@gmail.com"},
  },
  {
    name: "Hitesh Yadav",
    role: "Client Acquisition Director",
    photo: null,
    socials: { linkedin: "https://www.linkedin.com/in/hiteshyadav95/", instagram: "https://www.instagram.com/iam_hitesh_05/" },
  },
  {
    name: "Tanay Paliwali",
    role: "Content Execution Manager",
    photo: null,
    socials: { instagram: "https://www.instagram.com/tanaypaliwal17/" },
  },
  {
    name: "Srajan Soni",
    role: "Video Editor",
    photo: null,
    socials: { instagram: "https://instagram.com/" },
  },
  {
    name: "Priyanshu Basediya",
    role: "Ad & Campaign Manager",
    photo: null,
    socials: { linkedin: "https://linkedin.com/in/", instagram: "https://www.instagram.com/priy_yanshu09/" },
  },
  {
    name: "Sanskar Singh Bais",
    role: "Content & Script Writer",
    photo: null,
    socials: { instagram: "https://instagram.com/" },
  },
];

// First 3 shown on homepage preview (the two cofounders + head of tech)
export const teamPreview = team.slice(0, 3);

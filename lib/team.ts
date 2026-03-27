// ─── TEAM DATA ───────────────────────────────────────────────────────────────
// To add a member: add an object to the array below.
// To remove a member: delete their object.
// photo: put their image in /public/team/ and reference it here, or use null for initials placeholder.
// socials: only include the ones they have — missing keys are automatically hidden.

export interface TeamMember {
  name: string;
  role: string;
  photo: string | null; // e.g. "/team/shreyas.webp" or null
  socials?: {
    x?: string;        // full URL e.g. "https://x.com/handle"
    linkedin?: string;
    instagram?: string;
  };
}

export const team: TeamMember[] = [
  {
    name: "Vansh Shrivastava",
    role: "Social Media Manager",
    photo: null,
    socials: {
      x: "https://x.com/",
      linkedin: "https://linkedin.com/in/",
      instagram: "https://instagram.com/",
    },
  },
  {
    name: "Shreyash Choukade",
    role: "Client Relationship Manager",
    photo: null,
    socials: {
      linkedin: "https://linkedin.com/in/",
      instagram: "https://instagram.com/",
    },
  },
  {
    name: "Suryansh Kumar",
    role: "Website Developer",
    photo: null,
    socials: {
      x: "https://x.com/",
      instagram: "https://instagram.com/",
    },
  },
];

// First 3 members shown in the homepage preview
export const teamPreview = team.slice(0, 3);

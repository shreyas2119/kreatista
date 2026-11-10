export interface CaseStudy {
  slug: string;
  client: string;
  industry: string;
  liveUrl: string;
  headline: string;
  summary: string;
  problem: string;
  built: string[];
  stats: { value: string; label: string }[];
  image: string;
  alt: string;
}

// Facts below are the client's own published figures, not results attributed to Socioryx.
export const caseStudies: CaseStudy[] = [
  {
    slug: "indore-dental-hospital",
    client: "Indore Dental Hospital",
    industry: "Healthcare",
    liveUrl: "https://www.indoredental.co.in/",
    headline: "A dental hospital site built to remove fear, then book.",
    summary:
      "Conversion-focused website for a dental hospital in Indore, live since launch. Promise, doctor credentials, proof, treatment pages, and booking by treatment and time slot.",
    problem:
      "The clinic was premium and easy to miss online. An internationally trained specialist, M.D.S., with fellowships in Karnataka, the USA, and Israel, had a digital presence that did not match the room.",
    built: [
      "Doctor profile and credentials",
      "Before-and-after drag sliders",
      "Booking by treatment and time slot",
      "Treatment FAQs and patient stories",
      "Local search foundations and mobile-first build",
    ],
    stats: [
      { value: "4.9/5", label: "client's Google rating" },
      { value: "15,000+", label: "patients served" },
      { value: "3", label: "locations" },
    ],
    image: "/work/dental-desktop.jpg",
    alt: "Indore Dental Hospital homepage designed and built by Socioryx",
  },
  {
    slug: "puja-shraddha",
    client: "Puja Shraddha",
    industry: "Religious services / booking platform",
    liveUrl: "https://pujashraddha.com",
    headline: "A pan-India puja booking platform, without the friction.",
    summary:
      "Booking platform that matches families with pandits by region, language, and sampradaya, with the price shown before booking.",
    problem:
      "Booking a pandit lived on word of mouth. Three questions had to be answered before the button: is he verified, what will it cost, and does he follow our tradition.",
    built: [
      "Pujas by occasion and city",
      "Pandits matched by city and language",
      "Price shown before booking",
      "Samagri lists and same-day help",
      "Structure that accepts new cities without a redesign",
    ],
    stats: [
      { value: "10,000+", label: "families served" },
      { value: "50+", label: "cities" },
      { value: "Verified", label: "pandits only" },
    ],
    image: "/work/puja-desktop.jpg",
    alt: "Puja Shraddha booking platform designed and built by Socioryx",
  },
];

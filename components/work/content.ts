export const words = ["websites", "platforms", "landing pages", "brands"] as const;

export const steps = [
  {
    id: "step-1",
    n: "01",
    title: "We learn the one action the site must drive.",
    when: "Day 1. Thirty minutes.",
    does: "We ask about your business, your customers, and the single action the site has to earn. On Puja Shraddha that action was a booking with the right person: pandits matched by region, language, and sampradaya.",
    leave: "A named action for the site. You bring your services, your customers, and one decision-maker. The call is thirty minutes.",
  },
  {
    id: "step-2",
    n: "02",
    title: "The proposal names what ships.",
    does: "Discovery becomes a sitemap, a timeline, and a fixed list of deliverables. You get a fixed quote after the short discovery call. No hourly billing, and no surprise add-ons.",
    leave: "A scope you can accept before design starts. The published ranges for the three shapes are at the end of this page.",
  },
  {
    id: "step-3",
    n: "03",
    title: "Every section earns its place.",
    when: "Week 1.",
    does: "Wireframe to a polished interface. You review it before build. On Indore Dental, ratings and patient counts appear before any sales copy. The free consultation for Armed Forces, Police, and Seniors is a headline, not fine print.",
    leave: "A visual direction you can respond to. Proof sits before the pitch, the way the dental site is built.",
  },
  {
    id: "step-4",
    n: "04",
    title: "The site is built in custom code.",
    when: "Weeks 2 to 3.",
    does: "Next.js, mobile-first, with search structure and image optimisation. Indore Dental books a treatment and a time slot, and the page holds a doctor profile, before and after sliders, FAQs, and patient stories.",
    leave: "A working site you review before launch. Components are built so the site can extend without a redesign. Puja Shraddha is structured so a new city, puja, or pandit can slot in.",
  },
  {
    id: "step-5",
    n: "05",
    title: "Then it goes live.",
    when: "Launch.",
    does: "We check the build on phones and desktops, keep it fast, and turn analytics on from day one. Then it goes live.",
    leave: "A handover of a live site that can be measured and iterated.",
  },
  {
    id: "step-6",
    n: "06",
    title: "After launch, attention can keep coming.",
    does: "The site stays live and measured. Socioryx also runs content marketing for D2C, SaaS, and the creator economy, which can feed the site. Content, social, and search work can follow.",
    leave: "A site that is already shipping, and a path to ongoing growth if you want it.",
  },
] as const;

export const packages = [
  {
    id: "Business Website",
    time: "Typical time, 2 to 3 weeks",
    text: "The Indore Dental pattern. Trust and enquiries for clinics, consultants, and local businesses.",
    points: [
      "Custom design, 8 to 10 pages",
      "Services explorer",
      "Call, WhatsApp, and enquiry paths",
      "Local search foundations",
    ],
  },
  {
    id: "Booking Platform",
    time: "Typical time, 3 to 5 weeks",
    note: "Most requested",
    text: "The Puja Shraddha pattern. Discovery, booking, and a price shown before anyone commits.",
    points: [
      "Everything in the business website",
      "Booking flow and time slots",
      "Catalogue by city or category",
      "Lead alerts and a help form",
    ],
  },
  {
    id: "Landing Page",
    time: "Typical time, 1 week",
    text: "One offer, one page, one action. For launches and ad campaigns.",
    points: [
      "One page built to convert",
      "Promise, then proof, then the action",
      "Lead or WhatsApp capture",
      "Analytics from day one",
    ],
  },
] as const;

export const reviews = [
  {
    id: "typethink",
    brand: "TypeThink AI",
    quote:
      "We needed more than marketing. We needed direction, and Socioryx delivered exactly that. Stronger presence, better engagement, a more aligned brand.",
    name: "Yash Patidar",
    role: "Co-founder, TypeThink AI",
    placeholder: false,
  },
  {
    id: "dental",
    brand: "Indore Dental Hospital",
    // Placeholder copy: replace with the clinic's real words before this page goes live.
    quote:
      "Our clinic finally looks as premium online as it does in person. Patients see the doctor's credentials and results before they book, and booking a treatment takes a minute.",
    name: "Indore Dental Hospital",
    role: "Healthcare website",
    placeholder: true,
  },
  {
    id: "puja",
    brand: "Puja Shraddha",
    // Placeholder copy: replace with Puja Shraddha's real words before this page goes live.
    quote:
      "Families can now find a verified pandit in their city and language, and see the price before they book. It still feels like our tradition, just without the friction.",
    name: "Puja Shraddha",
    role: "Booking platform",
    placeholder: true,
  },
] as const;

export const packageChoices = [
  "Business Website",
  "Booking Platform",
  "Landing Page",
  "Not sure yet",
] as const;

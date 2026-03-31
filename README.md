# Socioryx — Full-Stack Content Marketing

A modern, production-ready website for a full-stack content marketing agency built with Next.js 16, TypeScript, Tailwind CSS 4, and Framer Motion.

## Features

- 🎨 Premium design with Space Grotesk, Inter, and Instrument Serif fonts
- 🌙 Silver Mist color palette optimized for dark themes
- 📱 Fully responsive with mobile-first design
- 📝 Dual contact system: Calendly booking + Contact form
- ✨ WebGL shader backgrounds and smooth scroll animations
- 🔐 Firebase authentication for portfolio access
- 📊 Supabase database for contact submissions and portfolio tracking
- 📧 Automated email notifications via Nodemailer
- ⚡ Optimized with Next.js App Router and dynamic imports
- 🔒 Production-ready security headers and CSP

## Tech Stack

- **Framework:** Next.js 16.2.1 (App Router)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion 12
- **UI Components:** shadcn/ui + Radix UI
- **3D Graphics:** Three.js, React Three Fiber
- **Authentication:** Firebase Auth
- **Database:** Supabase
- **Email:** Nodemailer (Gmail)
- **Scheduling:** Calendly (react-calendly)
- **Icons:** Lucide React, React Icons

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Gmail account (for email notifications)
- Firebase project (for authentication)
- Supabase project (for database)
- Calendly account (for booking)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/shreyas2119/kreatista.git
cd kreatista
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your credentials (see Environment Setup below).

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Setup

### Gmail (Nodemailer)
1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password at [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
3. Add to `.env.local`:
```env
GMAIL_USER=your@gmail.com
GMAIL_APP_PASSWORD=xxxx-xxxx-xxxx-xxxx
```

### Firebase
1. Create a project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable Google Authentication
3. Add your credentials to `.env.local`:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

### Supabase
1. Create a project at [supabase.com](https://supabase.com)
2. Create tables:
   - `contact_submissions` (first_name, last_name, email, subject, message, created_at)
   - `portfolio_access` (firebase_uid, email, accessed_at)
3. Create storage bucket: `portfolio` (upload your `deck.pdf`)
4. Add credentials to `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```

### Calendly
1. Get your scheduling link from [calendly.com/event_types](https://calendly.com/event_types)
2. Add to `.env.local`:
```env
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-username/30min
```

See `CALENDLY_SETUP.md` for detailed integration guide.

## Deployment

### Deploy to Netlify

1. Push your code to GitHub
2. Go to [Netlify](https://netlify.com) and click "Add new site"
3. Connect your GitHub repository
4. Build settings (auto-detected):
   - Build command: `npm run build`
   - Publish directory: `.next`
5. Add all environment variables from `.env.local`
6. Deploy!

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com) and import your repository
3. Vercel will auto-detect Next.js settings
4. Add all environment variables from `.env.local`
5. Deploy!

## Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
kreatista/
├── app/
│   ├── api/
│   │   ├── contact/          # Contact form API (Nodemailer + Supabase)
│   │   └── portfolio/        # Portfolio PDF access (Firebase + Supabase)
│   ├── portfolio/            # Portfolio page (auth required)
│   ├── services/             # Services page
│   ├── team/                 # Team page
│   ├── globals.css           # Global styles + font system
│   ├── layout.tsx            # Root layout with providers
│   ├── page.tsx              # Home page
│   ├── robots.ts             # SEO robots.txt
│   └── sitemap.ts            # SEO sitemap
├── components/
│   ├── sections/             # Page sections (Hero, Services, etc.)
│   ├── ui/                   # Reusable UI components
│   └── providers/            # Context providers (Auth, Modal, Scroll)
├── hooks/                    # Custom React hooks
├── lib/                      # Utility functions and configs
│   ├── firebase.ts           # Firebase auth setup
│   ├── supabase.ts           # Supabase client setup
│   ├── team.ts               # Team member data
│   └── utils.ts              # Utility functions
├── public/                   # Static assets
├── docs/                     # Documentation
├── .env.example              # Environment variables template
├── CALENDLY_SETUP.md         # Calendly integration guide
├── FONT_SYSTEM.md            # Font system documentation
└── next.config.ts            # Next.js configuration
```

## Font System

The website uses a premium three-font system:

- **Space Grotesk** (Headings) — Modern, geometric sans-serif
- **Inter** (Body) — Clean, readable sans-serif
- **Instrument Serif** (Accent) — Elegant serif for emphasis

See `FONT_SYSTEM.md` for detailed usage guidelines.

## Security Features

- Rate limiting on contact form (5 requests per 10 minutes)
- Input validation and sanitization
- Security headers (CSP, X-Frame-Options, etc.)
- Environment variable validation
- Firebase authentication for protected routes
- Supabase RLS (Row Level Security)
- Short-lived signed URLs for portfolio access

## Performance Optimizations

- Dynamic imports for below-the-fold sections
- Image optimization with Next.js Image component
- Font optimization with `display: swap`
- Aggressive caching for static assets
- Minimal JavaScript bundle size
- Smooth scroll with Lenis

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

## Author

[shreyas2119](https://github.com/shreyas2119)

## Support

For issues or questions, please open an issue on GitHub or contact us through the website.

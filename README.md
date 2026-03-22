# Creatisocial

A modern landing page for a social media management agency built with Next.js 16, TypeScript, Tailwind CSS 4, and Framer Motion.

## Features

- 🎨 Modern, animated UI with Framer Motion
- 🌙 Dark theme with violet accent colors
- 📱 Fully responsive design
- 📝 Contact form with Google Sheets integration
- ✨ WebGL shader backgrounds
- 🎭 Custom cursor with gold glow effect
- 🔄 Animated logo carousel
- ⚡ Built with Next.js App Router

## Tech Stack

- **Framework:** Next.js 16.2.1
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion
- **UI Components:** shadcn/ui + Radix UI
- **3D Graphics:** Three.js, React Three Fiber
- **Icons:** Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

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

Edit `.env.local` and add your Google Sheets URL (see Contact Form Setup below).

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Contact Form Setup

The contact form submits to Google Sheets and sends confirmation emails.

1. Create a Google Sheet with these columns: `Timestamp | First Name | Last Name | Email | Subject | Message`
2. Create a Google Apps Script (Extensions → Apps Script)
3. Deploy as Web App with "Anyone" access
4. Add the deployment URL to `.env.local`:
```
GOOGLE_SHEETS_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

## Deployment

### Deploy to Netlify

1. Push your code to GitHub
2. Go to [Netlify](https://netlify.com) and click "Add new site"
3. Connect your GitHub repository
4. Netlify will auto-detect Next.js settings
5. Add environment variables in Netlify dashboard:
   - `GOOGLE_SHEETS_URL`: Your Google Apps Script URL
6. Deploy!

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com) and import your repository
3. Vercel will auto-detect Next.js settings
4. Add environment variables:
   - `GOOGLE_SHEETS_URL`: Your Google Apps Script URL
5. Deploy!

## Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
creatisocial/
├── app/
│   ├── api/contact/      # Contact form API route
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/
│   ├── sections/         # Page sections (Hero, CTA, etc.)
│   ├── ui/              # Reusable UI components
│   └── providers/       # Context providers
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
└── public/              # Static assets
```

## License

MIT

## Author

[shreyas2119](https://github.com/shreyas2119)

# Production Deployment Checklist

## ✅ Code Quality & Build

- [x] TypeScript compilation passes without errors
- [x] Production build completes successfully
- [x] No unused imports or variables
- [x] Console logs limited to error handling only
- [x] All TODO comments resolved
- [x] ESLint configuration in place

## ✅ Environment Variables

- [x] `.env.example` documented with all required variables
- [x] Gmail credentials configured (GMAIL_USER, GMAIL_APP_PASSWORD)
- [x] Firebase credentials configured (6 variables)
- [x] Supabase credentials configured (3 variables)
- [x] Calendly URL configured (NEXT_PUBLIC_CALENDLY_URL)
- [x] Optional: Microsoft Clarity ID (NEXT_PUBLIC_CLARITY_ID)

## ✅ Security

- [x] Security headers configured in `next.config.ts`
- [x] Content Security Policy (CSP) implemented
- [x] Rate limiting on contact form (5 req/10min)
- [x] Input validation and sanitization
- [x] Email validation with regex
- [x] Firebase authentication for protected routes
- [x] Supabase RLS enabled
- [x] Service role key kept server-side only
- [x] Short-lived signed URLs (60s) for portfolio access
- [x] No hardcoded sensitive data
- [x] HTTPS enforced in production

## ✅ Performance

- [x] Dynamic imports for below-the-fold sections
- [x] Image optimization with Next.js Image
- [x] Font optimization with `display: swap`
- [x] Aggressive caching headers for static assets
- [x] WebGL shaders optimized
- [x] Smooth scroll with Lenis
- [x] Minimal bundle size

## ✅ SEO & Metadata

- [x] Meta tags configured in `app/layout.tsx`
- [x] Open Graph tags for social sharing
- [x] Twitter Card tags
- [x] `robots.txt` configured
- [x] `sitemap.xml` generated
- [x] Canonical URLs set
- [x] Alt text on all images
- [x] Semantic HTML structure

## ✅ Accessibility

- [x] Semantic HTML elements
- [x] ARIA labels where needed
- [x] Keyboard navigation support
- [x] Focus states on interactive elements
- [x] Color contrast meets WCAG AA standards
- [x] Form labels properly associated
- [x] Alt text on all images

## ✅ Functionality

- [x] Contact form submits successfully
- [x] Email notifications sent (client + internal)
- [x] Calendly modal opens and loads
- [x] Firebase authentication works
- [x] Portfolio PDF access with auth
- [x] Supabase data storage works
- [x] All navigation links functional
- [x] Mobile navigation works
- [x] Responsive design on all breakpoints
- [x] Smooth scroll animations
- [x] WebGL backgrounds render

## ✅ Database Setup (Supabase)

### Tables Required

1. **contact_submissions**
   ```sql
   CREATE TABLE contact_submissions (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     first_name TEXT NOT NULL,
     last_name TEXT NOT NULL,
     email TEXT NOT NULL,
     subject TEXT NOT NULL,
     message TEXT NOT NULL,
     created_at TIMESTAMPTZ DEFAULT NOW()
   );
   ```

2. **portfolio_access**
   ```sql
   CREATE TABLE portfolio_access (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     firebase_uid TEXT NOT NULL,
     email TEXT NOT NULL,
     accessed_at TIMESTAMPTZ DEFAULT NOW()
   );
   ```

### Storage Bucket

- Create bucket: `portfolio`
- Upload file: `deck.pdf`
- Set permissions: Private (signed URLs only)

## ✅ Firebase Setup

1. Enable Google Authentication
2. Add authorized domains (your production domain)
3. Configure OAuth consent screen
4. Add Firebase config to environment variables

## ✅ Email Setup (Gmail)

1. Enable 2-factor authentication
2. Generate App Password at [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
3. Test email delivery in production

## ✅ Calendly Setup

1. Create event type (e.g., "30 Minute Discovery Call")
2. Copy scheduling link
3. Add to environment variables
4. Test modal integration

## ✅ Pre-Deployment

- [ ] Update production domain in:
  - `app/layout.tsx` (metadataBase)
  - `app/robots.ts` (sitemap URL)
  - `app/sitemap.ts` (base URL)
  - Firebase authorized domains
- [ ] Test all environment variables in staging
- [ ] Verify email delivery works
- [ ] Test contact form submission
- [ ] Test Calendly booking flow
- [ ] Test portfolio authentication
- [ ] Check mobile responsiveness
- [ ] Test on multiple browsers
- [ ] Run Lighthouse audit
- [ ] Check console for errors

## ✅ Post-Deployment

- [ ] Verify DNS propagation
- [ ] Test SSL certificate
- [ ] Submit sitemap to Google Search Console
- [ ] Set up analytics (if using Clarity)
- [ ] Monitor error logs
- [ ] Test contact form in production
- [ ] Verify email notifications
- [ ] Check Supabase connection
- [ ] Test Firebase authentication
- [ ] Monitor performance metrics

## 🚀 Deployment Commands

### Netlify
```bash
# Build command
npm run build

# Publish directory
.next
```

### Vercel
```bash
# Vercel auto-detects Next.js
vercel --prod
```

## 📊 Monitoring

- Monitor Supabase dashboard for database activity
- Check email delivery success rate
- Monitor Firebase authentication logs
- Track Calendly booking conversions
- Use Clarity (optional) for user behavior analytics

## 🔧 Maintenance

- Regularly update dependencies: `npm update`
- Monitor security advisories: `npm audit`
- Backup Supabase database regularly
- Review and rotate API keys periodically
- Update portfolio PDF as needed
- Keep team member information current

## 📞 Support Contacts

- **Firebase:** [console.firebase.google.com](https://console.firebase.google.com)
- **Supabase:** [supabase.com/dashboard](https://supabase.com/dashboard)
- **Calendly:** [calendly.com/app](https://calendly.com/app)
- **Gmail:** [myaccount.google.com](https://myaccount.google.com)

---

**Last Updated:** March 29, 2026
**Status:** ✅ Production Ready

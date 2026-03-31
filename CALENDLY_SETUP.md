# Calendly Integration Setup Guide

## What's Been Done

✅ Installed `react-calendly` package
✅ Created `CalendlyModal` component
✅ Updated contact modal provider to use Calendly
✅ Kept old contact form intact (commented out, can be restored)
✅ Added environment variable for Calendly URL

## Setup Steps

### 1. Create Your Calendly Account

1. Go to [calendly.com](https://calendly.com) and sign up (free tier works)
2. Complete your profile setup

### 2. Create an Event Type

1. Click "Event Types" in the sidebar
2. Click "+ New Event Type"
3. Choose "One-on-One"
4. Configure your event:
   - **Name**: "Discovery Call" or "Strategy Session"
   - **Duration**: 30 minutes (recommended)
   - **Location**: Google Meet, Zoom, or Phone
   - **Description**: Brief description of what you'll discuss
   
### 3. Set Your Availability

1. Go to "Availability" in sidebar
2. Set your working hours
3. Add buffer time between meetings (15 min recommended)
4. Set timezone

### 4. Customize Questions (Optional but Recommended)

1. In your event type, go to "Questions"
2. Add custom questions like:
   - Company Name
   - Website URL
   - Project Budget Range
   - What service are you interested in?
   - Brief description of your needs

### 5. Get Your Calendly Link

1. Go to your event type
2. Click "Copy Link"
3. Your link will look like: `https://calendly.com/your-username/discovery-call`

### 6. Add to Environment Variables

1. Open `.env.local` file
2. Add your Calendly URL:
   ```
   NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-username/discovery-call
   ```
3. Save the file
4. Restart your dev server

## Testing

1. Click any "Book a Call" button on your site
2. The Calendly widget should appear in a modal
3. Try booking a test appointment
4. Check your email for confirmation

## Features

✅ **Inline Widget**: Calendly embedded directly in your site
✅ **Pre-filled Context**: When users click from a specific service, the subject is passed to Calendly
✅ **Branded Colors**: Uses your Silver Mist palette (#E5E4E2)
✅ **Responsive**: Works on mobile and desktop
✅ **Auto Reminders**: Calendly sends automatic email reminders
✅ **Calendar Sync**: Syncs with Google Calendar, Outlook, etc.

## Switching Back to Contact Form

If you want to test the old contact form:

1. Open `components/providers/contact-modal.tsx`
2. Comment out the `CalendlyModal` line
3. Uncomment the `ContactFormModal` line

## Pro Tips

1. **Set Buffer Time**: Add 15 min buffer between calls to avoid back-to-back meetings
2. **Limit Daily Bookings**: Set max bookings per day to avoid burnout
3. **Add Confirmation Page**: Customize the confirmation page in Calendly settings
4. **Enable Reminders**: Turn on email/SMS reminders to reduce no-shows
5. **Use Routing Forms**: For multiple team members, use Calendly's routing feature

## Calendly Free vs Paid

**Free Tier Includes:**
- 1 event type
- Unlimited bookings
- Email notifications
- Calendar sync
- Basic customization

**Paid Tier Adds:**
- Multiple event types
- Team scheduling
- Custom branding
- Payment collection
- Advanced integrations
- Remove Calendly branding

For your use case, the free tier should work perfectly!

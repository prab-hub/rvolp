# RevExOS Landing Page

A stunning landing page for RevExOS - Revenue & Expense Tracking platform built for agencies.

## Features

- 🎨 Modern gradient design with purple/pink theme
- 📱 Fully responsive (mobile, tablet, desktop)
- ✨ Smooth animations and hover effects
- 📧 Waitlist form with email notifications
- 🚀 Built with Next.js 15, TypeScript, and Tailwind CSS

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Email Notifications

This landing page uses [Resend](https://resend.com) for email delivery and contact management.

1. Sign up for a free account at [resend.com](https://resend.com)
2. **Verify your domain** (required for custom email addresses):
   - Go to [Domains](https://resend.com/domains)
   - Add your domain (e.g., `mail.revexos.com`)
   - Add the DNS records (TXT, CNAME, MX) to your DNS provider
   - Wait for verification (usually a few minutes)
3. **Create an Audience** for waitlist contacts:
   - Go to [Audiences](https://resend.com/audiences)
   - Click "Create Audience"
   - Name it "RevExOS Waitlist"
   - Copy the Audience ID (starts with `aud_`)
4. Get your API key from [resend.com/api-keys](https://resend.com/api-keys)
5. Add your credentials to `.env.local`:

```
RESEND_API_KEY=re_your_actual_api_key_here
RESEND_AUDIENCE_ID=aud_your_audience_id_here
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the landing page.

### 4. Test the Waitlist Form

1. Open the landing page
2. Scroll to the "Join the Waitlist" section
3. Enter an email address
4. Click "Join Now"
5. **Three things happen automatically**:
   - ✅ Contact is saved to your Resend audience
   - ✅ User receives a confirmation email from `noreply@mail.revexos.com`
   - ✅ You receive a notification at `contact@cloudifybiz.com`

## Email Configuration

**User Confirmation Email:**
- From: `RevExOS <noreply@mail.revexos.com>`
- Sent to: The person who signed up
- Contains: Welcome message and next steps

**Admin Notification Email:**
- From: `RevExOS Waitlist <waitlist@mail.revexos.com>`
- Sent to: `contact@cloudifybiz.com`
- Contains: New signup details

To change the admin email address, edit `app/api/waitlist/route.ts:105`:

```typescript
to: ["your-email@example.com"],
```

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in [Vercel](https://vercel.com)
3. Add environment variables in Vercel project settings:
   - `RESEND_API_KEY`
   - `RESEND_AUDIENCE_ID`
4. Deploy!

### Deploy to Other Platforms

Make sure to set these environment variables in your hosting platform:
- `RESEND_API_KEY` - Your Resend API key
- `RESEND_AUDIENCE_ID` - Your Resend Audience ID

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Email**: Resend API
- **Deployment**: Vercel (recommended)

## Project Structure

```
revexp-landing/
├── app/
│   ├── api/
│   │   └── waitlist/
│   │       └── route.ts          # Waitlist API endpoint
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Landing page
├── public/                       # Static assets
├── .env.local.example            # Environment variables template
└── README.md                     # This file
```

## Customization

### Colors

The landing page uses a purple/pink gradient theme. To customize colors, edit the Tailwind classes in `app/page.tsx`:

- Primary gradient: `from-purple-600 to-pink-600`
- Background: `from-slate-900 via-purple-900 to-slate-900`

### Content

All content is in `app/page.tsx`. Edit the text, features, and benefits sections directly in the file.

## Support

For questions or issues, contact: **contact@cloudifybiz.com**

## License

© 2025 RevExOS. All rights reserved.

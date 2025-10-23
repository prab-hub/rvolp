# Quick Start Guide - RevExp Landing Page

Get your landing page up and running in 5 minutes!

## Step 1: Get Resend API Key (2 minutes)

1. Go to https://resend.com/signup
2. Sign up with your email
3. Verify your email
4. Go to https://resend.com/api-keys
5. Click "Create API Key"
6. Copy the key (starts with `re_`)

## Step 2: Configure Environment (1 minute)

1. In the `revexp-landing` folder, create a file called `.env.local`
2. Add this line (replace with your actual key):
   ```
   RESEND_API_KEY=re_your_actual_key_here
   ```
3. Save the file

## Step 3: Start the Server (1 minute)

```bash
cd revexp-landing
npm run dev
```

## Step 4: View Your Landing Page (1 minute)

1. Open http://localhost:3000 in your browser
2. You should see a beautiful purple/pink landing page
3. Scroll down to test the features

## Test the Waitlist Form

1. Scroll to the "Join the Waitlist" section
2. Enter your email address
3. Click "Join Now"
4. Check your inbox at contact@cloudifybiz.com
5. You should receive a notification email!

## What's Included

✅ Hero section with gradient title
✅ 6 feature cards with icons
✅ Benefits section
✅ Waitlist form
✅ Footer with contact link
✅ Fully responsive design
✅ Email notifications to contact@cloudifybiz.com

## Next Steps

### Deploy to Production

1. Push code to GitHub
2. Connect to Vercel: https://vercel.com
3. Add `RESEND_API_KEY` in Vercel environment variables
4. Deploy!

Your landing page will be live at: `https://your-project.vercel.app`

### Customize

- **Edit content**: Open `app/page.tsx` and change any text
- **Change colors**: Search for `purple-600` and `pink-600` to update the theme
- **Update email**: Edit `app/api/waitlist/route.ts` to change where emails are sent

## Need Help?

Contact: contact@cloudifybiz.com

---

**That's it! Your landing page is ready to collect signups.** 🚀

# Deployment Guide - RevExp Landing Page

## Prerequisites

- [x] Landing page built and tested locally
- [ ] Resend API key ready
- [ ] GitHub account
- [ ] Vercel account (free)

## Step-by-Step Deployment to Vercel

### 1. Push to GitHub (5 minutes)

```bash
cd /Users/prabhulingmathad/Developer/Claude/revexp-landing

# Initialize git (if not already done)
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: RevExp landing page"

# Create a new repository on GitHub (via web interface)
# Then connect and push:
git remote add origin https://github.com/YOUR_USERNAME/revexp-landing.git
git branch -M main
git push -u origin main
```

### 2. Deploy to Vercel (3 minutes)

1. **Go to Vercel**
   - Visit https://vercel.com
   - Sign up or log in (use GitHub for easy auth)

2. **Import Repository**
   - Click "Add New Project"
   - Import your `revexp-landing` repository
   - Vercel will auto-detect it's a Next.js app

3. **Configure Environment Variables**
   - Before deploying, click "Environment Variables"
   - Add:
     ```
     Key: RESEND_API_KEY
     Value: re_your_actual_api_key_here
     ```
   - Click "Add"

4. **Deploy**
   - Click "Deploy"
   - Wait 1-2 minutes
   - Done! 🎉

### 3. Get Your Live URL

After deployment, you'll get a URL like:
```
https://revexp-landing.vercel.app
```

You can also add a custom domain:
- Go to Project Settings → Domains
- Add your custom domain (e.g., `revexp.com`)

## Alternative: Deploy to Netlify

### Option 1: Via Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build your site
npm run build

# Deploy
netlify deploy --prod

# Add environment variable
netlify env:set RESEND_API_KEY re_your_actual_api_key_here
```

### Option 2: Via Netlify Web UI

1. Build the site locally:
   ```bash
   npm run build
   ```

2. Go to https://app.netlify.com
3. Drag and drop the `.next` folder
4. Add environment variable in Site Settings

## Alternative: Deploy to Other Platforms

### Railway

1. Push to GitHub
2. Go to https://railway.app
3. "New Project" → Import from GitHub
4. Add `RESEND_API_KEY` environment variable
5. Deploy

### Render

1. Push to GitHub
2. Go to https://render.com
3. "New Web Service" → Connect GitHub
4. Add `RESEND_API_KEY` environment variable
5. Deploy

### DigitalOcean App Platform

1. Push to GitHub
2. Go to https://cloud.digitalocean.com/apps
3. Create new app from GitHub
4. Add environment variable
5. Deploy

## Post-Deployment Checklist

- [ ] Visit your live URL
- [ ] Test the landing page loads correctly
- [ ] Test the waitlist form
- [ ] Check contact@cloudifybiz.com for test email
- [ ] Verify responsive design on mobile
- [ ] Check all sections render properly
- [ ] Share the link!

## Custom Domain Setup (Optional)

### For Vercel

1. Go to your project in Vercel
2. Settings → Domains
3. Add your domain (e.g., `getrevexp.com`)
4. Update DNS records as instructed
5. Wait for DNS propagation (5-30 minutes)

### DNS Records Example

If your domain is `getrevexp.com`:

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com

Type: A
Name: @
Value: 76.76.21.21
```

## Monitoring & Analytics

### Add Google Analytics (Optional)

1. Get your GA tracking ID
2. Add to `app/layout.tsx`:

```typescript
<Script
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_MEASUREMENT_ID');
  `}
</Script>
```

### Monitor Waitlist Signups

All signups are sent to: **contact@cloudifybiz.com**

You can also:
- Set up a Google Sheet integration
- Use Airtable for signup tracking
- Store in a database (Supabase, Firebase)

## Troubleshooting

### Waitlist form not sending emails

1. Check environment variable is set in Vercel
2. Verify Resend API key is valid
3. Check Vercel deployment logs
4. Ensure `contact@cloudifybiz.com` is correct

### Build fails on Vercel

1. Check build logs in Vercel dashboard
2. Ensure all dependencies are in package.json
3. Try building locally: `npm run build`
4. Check Node.js version compatibility

### Styling looks different in production

1. Clear browser cache
2. Hard refresh (Cmd+Shift+R / Ctrl+Shift+R)
3. Check if CSS is loading properly
4. Verify Tailwind config is correct

## Performance Optimization

Your landing page is already optimized, but you can:

1. **Add Images**: Use Next.js `<Image>` component
2. **Enable Compression**: Already enabled in Next.js
3. **Add Caching**: Vercel handles this automatically
4. **Monitor Core Web Vitals**: Use Vercel Analytics

## Security

- ✅ API key stored in environment variables (not in code)
- ✅ HTTPS enabled automatically on Vercel
- ✅ Email validation on frontend and backend
- ✅ Rate limiting (can add if needed)

## Need Help?

Contact: **contact@cloudifybiz.com**

---

**Your landing page is now live!** Share it with the world! 🚀

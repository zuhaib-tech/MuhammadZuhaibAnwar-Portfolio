# Portfolio (Next.js)

This repository contains a Next.js frontend portfolio. The contact form backend is implemented inside Next.js via `pages/api/contact.js` (so you deploy only the Next app to Vercel).

## Getting started

1. Install dependencies at the root:

```bash
npm install
```

2. Create environment files:

- Copy `.env.local.example` to `.env.local` in the workspace root.

3. Start the app:

```bash
npm run dev
```

Open `http://localhost:3000` to view the portfolio.

## Environment variables

Root `.env.local` variables:

- `NEXT_PUBLIC_SITE_URL`: production site URL used for metadata and sitemap generation.
- `NEXT_PUBLIC_SENTRY_DSN`: optional Sentry DSN for frontend error monitoring.
- `SUPABASE_SERVICE_ROLE_KEY` and `NEXT_PUBLIC_SUPABASE_URL`: required for saving contact messages to Supabase (used by `pages/api/contact.js`).
- `SENDGRID_API_KEY` or SMTP settings (optional, for email notifications):
  - `CONTACT_TO_EMAIL`
  - `SENDGRID_FROM` (optional) OR `SMTP_FROM`
  - `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`

Example SMTP setup:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=you@gmail.com
SMTP_PASS=your-app-password
CONTACT_TO_EMAIL=you@gmail.com
```

## SEO and metadata

- `components/SEO.js` sets page metadata and Open Graph tags.
- `next-sitemap` generates `sitemap.xml` and `robots.txt` after `npm run build`.
- Update `NEXT_PUBLIC_SITE_URL` in `.env.local` before deploying.
- Replace `/public/og-image.png` and `/public/favicon.svg` with your own brand assets.

## Deployment (Vercel)

- Deploy the Next.js app to Vercel.
- Ensure all secrets are configured in Vercel Environment Variables:
  - Supabase credentials
  - Email provider credentials (SendGrid or SMTP)
  - (Optional) Sentry DSN

## Notes

- Update `lib/portfolioData.js` with your own project summaries, live URLs, repository links, and social profiles.
- The contact form posts to Next.js at `/api/contact`.

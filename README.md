# Portfolio (Next.js + Node.js)

This repository contains a Next.js frontend portfolio and an Express backend contact API.

## Getting started

1. Install dependencies at the root:

```bash
npm install
```

2. Install backend dependencies:

```bash
cd backend
npm install
```

3. Create environment files:

- Copy `.env.local.example` to `.env.local` in the workspace root.
- Copy `backend/.env.example` to `backend/.env`.

4. Start the backend and frontend:

```bash
cd backend
npm run dev
```

In another terminal:

```bash
npm run dev
```

Open `http://localhost:3000` to view the portfolio.

## Environment variables

Root `.env.local` variables:

- `NEXT_PUBLIC_API_BASE`: backend base URL for the contact form.
- `NEXT_PUBLIC_SITE_URL`: production site URL used for metadata and sitemap generation.
- `NEXT_PUBLIC_SENTRY_DSN`: optional Sentry DSN for frontend error monitoring.
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `CONTACT_TO_EMAIL`: optional SMTP settings for sending contact form notifications to your inbox.

Example Gmail setup:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=zuhaibanwar52@gmail.com
SMTP_PASS=your-app-password
CONTACT_TO_EMAIL=zuhaibanwar52@gmail.com
```

Backend `.env` variables:

- `PORT`: port for the Express API.
- `CONTACT_RECIPIENT`: email address that receives contact form notifications.
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`: optional SMTP settings.
- `SEND_CONFIRMATION`: set `true` to send a confirmation message back to users.
- `SENTRY_DSN`: optional Sentry DSN for backend monitoring.

## SEO and metadata

- `components/SEO.js` sets page metadata and Open Graph tags.
- `next-sitemap` generates `sitemap.xml` and `robots.txt` after `npm run build`.
- Update `NEXT_PUBLIC_SITE_URL` in `.env.local` before deploying.
- Replace `/public/og-image.png` and `/public/favicon.svg` with your own brand assets.

## Deployment

- Frontend: deploy the Next.js app to Vercel or another platform that supports Next.js.
- Backend: deploy the Express app to Render, Fly, or any container host.
- Running both with Docker Compose is supported via `docker-compose.yml`.

## Notes

- Update `lib/portfolioData.js` with your own project summaries, live URLs, repository links, and social profiles.
- The contact form posts to the backend API configured by `NEXT_PUBLIC_API_BASE`.
- Ensure production secrets are configured on your hosting provider before going live.

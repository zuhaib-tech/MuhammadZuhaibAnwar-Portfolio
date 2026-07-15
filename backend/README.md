# Backend (Express) — Deprecated (Not used on Vercel)

This repo is deployed to Vercel as a **Next.js-only** application.

The contact form backend logic is implemented in **Next.js** via:
- `pages/api/contact.js`

The Express backend in this folder is kept only for optional local/Docker setups and is **not required** for Vercel deployment.

## Run locally

```bash
cd backend
npm install
npm run dev
```

If you still run it locally, the backend listens on `PORT` and exposes:

- `GET /api/health` — health check
- `POST /api/contact` — contact form payloads

## Environment variables

Copy `backend/.env.example` to `backend/.env` and update the values.

Required variables:

- `PORT` — backend port
- `CONTACT_RECIPIENT` — email address for contact notifications

Optional SMTP settings:

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_FROM`
- `SEND_CONFIRMATION`
- `CONFIRM_SUBJECT`
- `CONFIRM_TEMPLATE`

Optional monitoring:

- `SENTRY_DSN`

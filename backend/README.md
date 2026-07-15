# Backend (Express)

This folder contains a minimal Express backend with a `POST /api/contact` endpoint.

## Run locally

```bash
cd backend
npm install
npm run dev
```

The backend listens on `PORT` and exposes:

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

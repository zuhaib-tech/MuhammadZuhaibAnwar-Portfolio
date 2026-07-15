Deployment notes
----------------

This repo includes Dockerfiles for both frontend and backend and a GitHub Actions workflow that builds and pushes images to GitHub Container Registry (GHCR).

Build & run locally with Docker Compose:

```bash
docker compose up --build
```

Images pushed by Actions will be named:
- `ghcr.io/<OWNER>/portfolio-frontend:latest`
- `ghcr.io/<OWNER>/portfolio-backend:latest`

Requirements for automatic pushes
- The workflow uses `${{ secrets.GITHUB_TOKEN }}` and requires `packages: write` permission (configured in the workflow). No extra secret is required for GHCR if your repo has package write permissions.

Deploy targets
- Frontend: Vercel (recommended for Next.js) or run the container with `docker run -p 3000:3000 ghcr.io/<OWNER>/portfolio-frontend:latest`.
- Backend: Render, Fly, or run container `docker run -p 4000:4000 ghcr.io/<OWNER>/portfolio-backend:latest`.

Add secrets / env vars
- For runtime, configure environment variables on your hosting provider (SMTP, CONTACT_RECIPIENT, SEND_CONFIRMATION, etc.).

CI / Auto deploy workflows
- Frontend to Vercel: `.github/workflows/deploy-frontend-vercel.yml` — requires the following repository secrets:
	- `VERCEL_TOKEN` (Personal Vercel token)
	- `VERCEL_ORG_ID` (Vercel organization id)
	- `VERCEL_PROJECT_ID` (Vercel project id)

- Backend to Render: `.github/workflows/trigger-render-deploy.yml` — requires:
	- `RENDER_API_KEY` (Render API key)
	- `RENDER_SERVICE_ID` (Render service id)

Add these secrets in GitHub: Repository -> Settings -> Secrets and variables -> Actions.

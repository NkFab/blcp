# BLCP Local Run Guide

This repo contains:

- `blcp-api`: the Express/TypeORM backend
- `blcp-frontend`: the Next.js frontend

To get started, the backend should run its migrations and seeders first.

You can do that manually with:

```bash
cd blcp-api
pnpm setup
```

That script runs:

```bash
pnpm migration:run
pnpm seeders:run
```

## Run with Docker

Requirements:

- Docker Desktop or Docker Engine with Compose

Start everything from the repo root:

```bash
chmod +x run.sh
./run.sh
```

The Docker startup flow already runs backend setup automatically before starting the API.

Or directly:

```bash
docker compose up --build
```

Services:

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend API: [http://localhost:3001](http://localhost:3001)
- Postgres: `localhost:5433`

## Demo Accounts

The backend seeder creates these users with password `password123`:

- Applicant: `denis.applicant@test.com`
- Reviewer: `eric.reviewer@test.com`
- Supervisor: `fabrice.supervisor@test.com`

## Notes

- The frontend proxies authentication and data requests to the backend.

- Audit log, frontend-side document upload simulation, and frontend-side user create/edit fallbacks are intentionally disabled until the backend exposes those endpoints.

## Stop the stack

```bash
docker compose down
```

To remove the Postgres volume too:

```bash
docker compose down -v
```

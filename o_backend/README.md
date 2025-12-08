# Orsa Clinic Backend (Minimal Starter)

This is a minimal Node.js + TypeScript backend for the Orsa Clinic project.

## Quick start (development)

1. Copy `.env.example` to `.env` and edit values.
2. Install dependencies:
   ```
   npm ci
   ```
3. Start local MongoDB or use Docker Compose:
   ```
   docker-compose up --build
   ```
4. Run in dev mode:
   ```
   npm run dev
   ```

APIs are rooted at `/api`. Auth endpoints: `/api/auth/register`, `/api/auth/login`.


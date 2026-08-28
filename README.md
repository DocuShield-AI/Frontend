# DocuShield — Frontend

The web dashboard for **DocuShield**, an AI co-pilot that triages legal contract risk. Users upload a contract, watch it move through the AI pipeline in real time, and review risk-flagged clauses with confidence scores.

This repo is the **Next.js dashboard**. It talks to the [DocuShield Backend](#) (NestJS gateway) for auth, uploads, and payments, and reflects live status from the AI/RAG microservice via the backend's job queue.

## Tech Stack

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **Data Fetching:** TanStack Query
- **Animation:** Framer Motion
- **Testing:** Playwright (E2E)
- **Hosting:** Vercel

## Features

- 🔐 Auth-gated dashboard (JWT/OAuth via backend)
- 📤 Contract upload with validation feedback
- 📊 Real-time job-status polling — `queued → extracting → embedding → classifying → ready`
- 🚦 Risk-level badges (Low / Medium / High) with clause-highlight animations
- ⏳ Graceful degradation UI for rate-limited / AI-pending / delayed-notification states
- 🔁 Rate-limit UX — clear countdowns and retry messaging on 429s

## Getting Started

```bash
git clone https://github.com/<org>/docushield-frontend.git
cd docushield-frontend
npm install
cp .env.example .env.local
npm run dev
```

App runs at `http://localhost:3000`.

## Environment Variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_API_URL` | Base URL of the DocuShield backend gateway |
| `NEXT_PUBLIC_STRIPE_PUBLIC_KEY` | Stripe publishable key (checkout UI) |

## Project Structure

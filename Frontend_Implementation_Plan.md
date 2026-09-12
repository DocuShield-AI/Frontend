# Frontend Implementation Plan

| | |
|---|---|
| **Project** | DocuShield — AI Co-Pilot for Legal Contract Risk Triage |
| **Scope** | Frontend (Next.js) — wired to the existing NestJS backend |
| **Status** | Planning — not started |
| **Deferred** | AI/RAG views, n8n/automation states (skeleton sections only, wired later) |
| **Auth model** | httpOnly cookies (no localStorage) — requires small backend changes, listed at the end |

---

## 1. Overview

The frontend is built in three parts:

1. **Public area** — landing page, login, register, OAuth callback.
2. **Protected dashboard area** — one shared dashboard whose components show/hide based on the caller's role (`admin`, `legal`, `viewer`). Not three separate dashboards.
3. **Infra layer** — axios instance with cookie credentials and 401 auto-refresh, TanStack Query provider, typed API hooks, reusable UI components, zod form schemas, and route middleware.

Server-state (contracts, members, job status) is owned by TanStack Query. Client/UI state (modals, sidebar) stays local or in plain Redux Toolkit slices — only if actually needed.

---

## 2. Stack Decision

| Concern | Choice | Note |
|---|---|---|
| HTTP client | `axios` | `withCredentials: true`; response interceptor retries via `/auth/refresh` on 401 |
| Server state | `@tanstack/react-query` | Cache, refetch, and job-status polling |
| Client/UI state | Plain Redux Toolkit (**optional**) | Only if UI state grows beyond local state |
| ~~RTK Query~~ | **Not used** | Overlaps TanStack Query — two cache layers for the same job |
| Forms | `react-hook-form` + `zod` (+ `@hookform/resolvers`) | Validation schemas live in `src/validations` |
| Icons | `lucide-react` | |
| Class utility | `clsx` + `tailwind-merge` | `cn()` helper |
| Animations (later) | `framer-motion` | Risk-badge / clause-highlight reveals (Dossier 2.3) |
| Toasts (later) | `sonner` | Upload/errors feedback |

Cookies, not localStorage: tokens never touch JavaScript, so XSS cannot steal a session. This requires the backend changes listed in §7.

---

## 3. Public Pages

| Route | What it contains |
|---|---|
| `/` (landing) | Hero + one-liner, feature cards, **Login / Register** buttons, primary CTA **"Analyze a contract"** — logged-out users are sent to `/login?next=/dashboard` |
| `/login` | Email + password form (`react-hook-form` + zod), Google sign-in button, honors `?next=` redirect |
| `/register` | One page, two modes: **Create workspace** (name + email + password) or **Join workspace** (invite code + email + password). Google button carries `inviteCode` when present |
| `/auth/callback` | Holding page after Google redirect — shows success/failure, redirects to dashboard (backend now sets cookies directly on this redirect) |
| `/404` (`not-found.tsx`) | Simple not-found page |

---

## 4. Dashboards — Who Gets What

One dashboard shell, role-gated via `useMe()` (calls `GET /auth/me`).

### Admin (`admin` only)
- Overview cards: total contracts, member count, current plan
- Contract list + upload button (admins may upload)
- **Members tab** — team table, role change per member (`PATCH /workspaces/me/members/:userId/role`), invite generation (`POST /workspaces/invite`) with copy-to-clipboard
- **Billing tab** — current plan + upgrade via Stripe checkout (`POST /subscriptions/checkout`), success/cancel pages

### Legal Dashboard
- Contract list + upload button
- Contract detail with **status polling** (`queued → extracting → embedding → classifying → ready`) via TanStack `refetchInterval`
- *AI phase later:* risk flags, clause highlights, RAG Q&A panel render here

### Viewer Dashboard (read-only)
- Contract list — view only
- **No upload button** (hidden, not just disabled)
- Contract detail visible; no actions

---

## 5. Folder Structure

```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   └── auth/callback/page.tsx
│   ├── (root)/
│   │   ├── page.tsx                    # landing
│   │   └── (dashboard)/
│   │       ├── layout.tsx              # sidebar + header (protected)
│   │       ├── dashboard/page.tsx      # contract list + overview
│   │       ├── upload/page.tsx
│   │       ├── contracts/[id]/page.tsx # detail + status polling
│   │       ├── members/page.tsx        # admin only
│   │       └── billing/page.tsx        # admin
│   ├── layout.tsx
│   ├── not-found.tsx
│   └── error.tsx
├── lib/
│   ├── api.ts                          # axios: baseURL, withCredentials, 401 → refresh
│   └── auth.ts                         # useMe helpers, role helpers, redirects
├── providers/
│   ├── query-provider.tsx              # TanStack QueryClientProvider
│   └── redux-provider.tsx              # optional, added later if needed
├── hooks/
│   ├── use-me.ts
│   ├── use-contracts.ts
│   ├── use-upload.ts
│   └── use-members.ts
├── components/
│   ├── ui/                             # Button, Input, Card, Badge, Table, Modal, Spinner
│   ├── layout/                         # landing-navbar, dashboard-sidebar, dashboard-header
│   └── common/                         # role-badge, status-badge, empty-state, error-state
├── types/
│   └── api.ts                          # mirrors backend DTOs/responses
├── validations/
│   ├── login.ts, register.ts, upload.ts, invite.ts   # zod schemas
└── middleware.ts                       # protected-route check (cookie presence only — server verifies)
```

---

## 6. Build Order

1. Install packages, `query-provider`, `.env.local` (`NEXT_PUBLIC_API_URL=http://localhost:4000`)
2. `lib/api.ts` — axios + 401 auto-refresh interceptor
3. Login / Register / OAuth-callback pages (cookie auth working end-to-end)
4. `middleware.ts` + dashboard layout (sidebar/header, role from `/auth/me`)
5. Dashboard contract list + upload flow
6. Members (invite + role change) and Billing (admin)
7. Landing page polish
8. AI / n8n views — placeholder sections now, wired when those services land

---

## 7. Required Backend Changes (cookie auth)

| Where | Change |
|---|---|
| `auth.service.ts` | `issueTokens()` sets tokens via `Set-Cookie` headers (httpOnly, secure, sameSite) instead of the JSON body |
| `jwt.strategy.ts` | Extract the access token from the cookie as well as the `Authorization` header |
| `/auth/refresh` | Read the refresh token from the cookie instead of the body |
| **New** `GET /auth/me` | Returns the authenticated user's id/email/role/workspaceId — the frontend cannot decode an httpOnly cookie |
| OAuth callback | Set cookies on the redirect; drop the URL-fragment handover |
| `main.ts` | CORS: explicit origin + `credentials: true`, otherwise the browser will not send cookies |

---

## 8. Out of Scope (this phase)

- AI results UI wiring (risk flags, clause highlights, RAG chat) — placeholder sections only
- n8n-facing states (notification-pending, degraded-mode banners)
- Push-based job status (SSE/WebSocket) — polling first, per Dossier Part 2.4
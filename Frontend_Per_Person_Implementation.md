# Frontend Per-Person Implementation Plan

| | |
|---|---|
| **Project** | DocuShield — AI Co-Pilot for Legal Contract Risk Triage |
| **Scope** | Frontend work split — who builds what, and how each piece links to the others |
| **Team** | Shanza · Zayyam · Annas |
| **Rule** | 4 items each, balanced across difficulty; every item names its "linked with" partner |
| **Read first** | `Frontend_Implementation_Plan.md` (pages, dashboards, packages, build order) |

---

## Part 0 — How the Split Works

- The implementation plan (5–6) is divided into **12 items**, **4 per member**.
- Each item has a **Linked With** column — two people touch the same seam, so both must understand the other's interface.
- Nobody is "just UI" or "just data": Shanza owns look/feel + resilience, Zayyam owns data + AI-facing views, Annas owns auth + polish + shipping.
- Shared seams (axios instance, role gating, cookie auth) are built by the person who owns the item and consumed by the others — no duplicate implementations.

---

## Item Table — Who Builds What

| # | Member | Item | Deliverable | Linked With / Learns |
|---|---|---|---|---|
| 1 | **Shanza** | Setup & Design System | Install all packages, `providers/query-provider.tsx`, `components/ui/*` (Button, Input, Card, Badge, Table, Modal, Spinner), Tailwind theme tokens, Low/Medium/High risk colors | Zayyam's hooks render into these components; Annas's landing reuses this system |
| 2 | **Shanza** | App Shell & Dashboard Layout | `(root)/(dashboard)/layout.tsx` — sidebar, header, **role gating** (viewer: no upload; admin: Members/Billing tabs appear), user chip + logout | Annas's `use-me` feeds it the role; Zayyam's pages render inside this shell |
| 3 | **Shanza** | Rate-Limit & Error UX | 429/retry-after handling (disabled states, countdown, clear messaging), `components/common/*` (empty-state, error-state), `not-found.tsx`, `error.tsx` | Direct mirror of the backend's two-tier rate limiter — consumes its 429 responses the same way the backend rate-limit owner tests them |
| 4 | **Shanza** | Landing Page | Hero + one-liner, feature cards, Login/Register buttons, "Analyze a contract" CTA with logged-in check (`?next=` logic) | Sits on his own design system (#1); CTA logic uses Annas's middleware/auth helpers |
| 5 | **Zayyam** | Data Layer | `lib/api.ts` (axios: `withCredentials`, 401 → auto-refresh interceptor), `types/api.ts` (mirror backend DTOs), all hooks — `use-me`, `use-contracts`, `use-upload`, `use-members` | Shanza's UI consumes these hooks; Annas's auth pages call `use-me` right after login |
| 6 | **Zayyam** | Contract List & Upload Flow | `dashboard/page.tsx` (contract table), `upload/page.tsx` (drag-drop, duplicate-upload message), wires to `POST /contracts/upload` | Backend contracts module (upload + dedupe); Annas's zod upload validation (#11) feeds this form |
| 7 | **Zayyam** | Job-Status Polling & Contract Detail | `contracts/[id]/page.tsx` — TanStack `refetchInterval` walking `queued → extracting → embedding → classifying → ready` | His closest link to the AI pipeline phase — the polling UI is exactly what the Python worker updates |
| 8 | **Zayyam** | Members & Billing (Admin) | `members/page.tsx` (team table, role-change dropdown, invite generate + copy), `billing/page.tsx` (plan, Stripe checkout redirect, success/cancel pages) | Uses his own `use-members` hook (#5); backend stripe + workspaces endpoints are the source of truth |
| 9 | **Annas** | Auth Pages | `login/page.tsx`, `register/page.tsx` (Create / Join-invite modes, Google button with `inviteCode`), `auth/callback/page.tsx` | Depends on the backend cookie changes (Set-Cookie on login/signup/refresh); `use-me` (#5) confirms the session after each |
| 10 | **Annas** | Route Protection (`middleware.ts`) | Protected-route check (cookie presence, server still verifies), `?next=` redirect preservation after login | Bookends his own auth pages (#9) and Shanza's app shell (#2) — the gate in front of both |
| 11 | **Annas** | Form Validations | `validations/*` — zod schemas: login, register (create/join), upload (type + size), invite (role + expiry), wired via `@hookform/resolvers` | Zayyam's upload flow (#6) and his own auth pages (#9) consume these schemas |
| 12 | **Annas** | Motion & Hosting | Framer Motion polish (risk-badge reveal, status transition), Vercel deploy, env vars, preview URLs for the team | Motion layers on Shanza's design system (#1); hosting is where everyone's work goes live |

---

## Per-Person Summary

| Member | Items | Focus |
|---|---|---|
| **Shanza** | 1, 2, 3, 4 | Design system, app shell, resilience UX, landing |
| **Zayyam** | 5, 6, 7, 8 | Data layer, dashboard core, polling, admin pages |
| **Annas** | 9, 10, 11, 12 | Auth flow, route protection, validations, polish + deploy |

**4-4-4 — balanced.** Difficulty differs (Zayyam's polling + interceptor is the most technical; Shanza's system is the most used by others; Annas's auth is the most fragile against the backend changes), so the *Linked With* column is what keeps everyone honest.

---

## Build Order — Who Can Start When

| Phase | Who | Blocks |
|---|---|---|
| **Phase 1** | Zayyam (#5 data layer) + Annas (#11 validations) in parallel | Nothing — pure infra |
| **Phase 2** | Shanza (#1 design system) + Annas (#9 auth pages) | #5, #11 |
| **Phase 3** | Annas (#10 middleware) + Shanza (#2 app shell) | #9 (auth working) |
| **Phase 4** | Zayyam (#6 list/upload, #7 polling, #8 admin pages) | #1, #2 |
| **Phase 5** | Shanza (#3 error UX, #4 landing) | #6 (real data to style errors against) |
| **Phase 6** | Annas (#12 motion + deploy) | Everything |

---

## Shared Responsibilities — Not One Person's

| Duty | How it splits |
|---|---|
| Types drift from backend | Whoever's page breaks first fixes `types/api.ts` and pings Zayyam (owner) |
| Cookie-auth backend changes | Annas drives them with the backend owner; Zayyam's interceptor is the first consumer to test |
| Demo script | Each member demos their own items (#1–#12 map to demo segments) |
| Judge Q&A prep | 30-min cross-brief — each member verbally explains another member's two items |

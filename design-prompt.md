# DocuShield — Complete UI/UX Design Prompt

> **IMPORTANT: You must design EVERY screen listed below. Do not skip any
> section. This is a complete SaaS app with public pages AND a role-based
> dashboard (three roles). All sections are mandatory. Deliver all of them
> as a single, complete screen set.**

---

## Your role

You are a senior product designer. Design the full UI for a B2B SaaS app.
Deliver polished, pixel-accurate SCREENS as visual mockups — not code. A dev
team will implement these later, so focus on visuals, layout, hierarchy, and
interactions only.

## Product

DocuShield — AI co-pilot for legal contract risk triage. Legal teams upload
contracts; the app extracts key clauses and flags risky terms. Three user
types exist:

- **Admin** — workspace owner, full access (contracts + upload + members +
  billing)
- **Legal** — team member, contracts + upload only (no members/billing)
- **Viewer** — read-only, contracts only (no upload, no members, no billing)

The app has two zones: public pages (anyone) and a dashboard (logged-in users
only, one shared shell with role-gated nav).

## Design rules

- **LIGHT MODE ONLY.** No dark mode.
- **No code, no framework names, no component-library names** — pure visual.
- **One design language** across every screen — same product, same fonts,
  colors, spacing, icon style.
- **WCAG AA contrast** on every text/color.
- **Consistent icons**: line style, 1.5–2px stroke, rounded caps. No mixed
  filled/outline.

## Design tokens (apply to every screen)

**Colors:**
- Brand: deep navy `#0B1424`–`#15243D` (sidebar, headings, landing hero).
- Accent: emerald/teal green (main CTA, active nav, success).
- Semantic: green = success, amber = warning, red = error, blue = in-progress,
  violet = admin/special.
- Neutrals: page background `#F7F8FA`, white surfaces, slate borders,
  slate body text, navy headings.

**Typography:** Jakarta Sans (primary), clear H1–H3 hierarchy, 15–16px body,
tiny uppercase section labels, tabular numbers for data.

**Shape:** 8px radius cards/inputs, 12px radius modals, full-pill badges,
1px borders, soft shadows.

---

# SECTION A — PUBLIC PAGES (anyone can see)

Design ALL of the following:

| # | Screen | Key elements |
|---|--------|-------------|
| A1 | **Landing page** | Sticky navbar (logo, nav links, Login ghost + "Get started" primary CTA). Hero on deep navy with subtle glow, one-line value prop, primary CTA **"Analyze a contract"**, secondary "How it works". Three feature cards (Upload & parse / AI risk triage / Team collaboration). 3-step process strip. Footer. |
| A2 | **Landing (logged-in state)** | Same navbar but with **Dashboard** button instead of Login/Register. |
| A3 | **Login** | Centered card, soft background. Email + password, submit, "Continue with Google" (official G icon), link to Register. Show default state + inline validation errors + submitting spinner. |
| A4 | **Register — Create workspace** | Tab-based. Workspace name + email + password. Google sign-in. Inline errors. |
| A5 | **Register — Join workspace** | Same page, second tab. Invite code + email + password. Google sign-in. |
| A6 | **OAuth callback** | Spinner + "Signing you in…" + failure state with "Try again". |
| A7 | **404** | Logo, "Page not found", back-home button. |

---

# SECTION B — DASHBOARD SHELL (same for all roles)

This is the shared authenticated layout. Design:

| # | Screen | Key elements |
|---|--------|-------------|
| B1 | **Sidebar (desktop)** | Logo; nav links: Contracts, Upload, Members, Billing; bottom block: user avatar, name, email, role tag, Logout. |
| B2 | **Sidebar (mobile)** | Hamburger icon opens drawer sidebar. |
| B3 | **Top bar** | Page title, breadcrumb, user menu dropdown (profile, logout). |

---

# SECTION C — ADMIN DASHBOARD (full access)

Admin sees ALL nav items. Design each screen with the Admin user's full nav:

| # | Screen | Key elements |
|---|--------|-------------|
| C1 | **Dashboard overview** | "Welcome back, <name>". Metric cards: Total contracts, In review, Ready, Members count, Current plan. Contract list below. Include empty state variant ("Upload your first contract"). |
| C2 | **Contract list** | Table: file name, uploader, status tag, uploaded date, size, view action. Hover states. "Upload contract" button in header. Mobile: stacked cards. |
| C3 | **Upload** | Drag-drop zone (dashed border, lights up on drag), file card (name, size, remove), legal note, submit button (loading state). |
| C4 | **Contract detail** | Header: name, uploader, date, status tag. 5-step stepper (queued → extracting → embedding → classifying → ready; failed = red + retry). Placeholder AI cards: Risk flags, Key clauses, Ask the contract. |
| C5 | **Members** | Member table (avatar, name, email, role tag + change-role dropdown, joined date). "Invite member" button → modal → generated code → copyable box + Copy button + success toast. |
| C6 | **Billing** | Current plan card (name, price, status). Upgrade options ("Upgrade to Pro", "Go Enterprise"). Invoice note. |

---

# SECTION D — LEGAL DASHBOARD (limited access)

Legal user has a SMALLER sidebar: **Contracts + Upload only**. No Members,
no Billing in nav. Design each screen with Legal's reduced nav:

| # | Screen | What differs from Admin |
|---|--------|------------------------|
| D1 | **Dashboard overview** | No Members/plan metric cards. Contracts + upload only. |
| D2 | **Contract list** | Same as Admin C2. Upload button visible. |
| D3 | **Upload** | Same as Admin C3. |
| D4 | **Contract detail** | Same as Admin C4. |

---

# SECTION E — VIEWER DASHBOARD (read-only)

Viewer sees **Contracts only** in sidebar. No upload button anywhere, no
Members, no Billing. Design:

| # | Screen | What differs from Admin |
|---|--------|------------------------|
| E1 | **Dashboard overview** | Contracts-only metrics. No upload button. |
| E2 | **Contract list** | Same table but **no upload button**, no view action (read-only rows). |
| E3 | **Contract detail** | Metadata + stepper visible, no action buttons. |

---

# STATUS & ROLE TAGS (same across every screen)

Contract status tags:

| Status | Color | Icon |
|--------|-------|------|
| queued | slate | clock |
| extracting | blue | pulsing progress |
| embedding | violet | pulsing progress |
| classifying | amber | pulsing progress |
| ready | green | check |
| failed | red | alert |

Role tags:

| Role | Color |
|------|-------|
| admin | violet |
| legal | amber |
| viewer | slate |

---

# USER FLOWS (sequence with arrows between screens)

1. Landing → Login → Admin Dashboard
2. Landing → Register (Create) → Admin Dashboard
3. Landing → Register (Join via code) → Viewer/Legal Dashboard (depending on invite role)
4. Login → Dashboard → Upload → Contract detail (status transitions)
5. Admin: Dashboard → Members → Invite → copy code → toast
6. Admin: Dashboard → Billing → Stripe (new tab) → back

---

# DELIVERABLES (you must produce ALL of these)

1. **Styleguide** — color palette, typography scale, buttons, inputs, tags,
   table, modal, toast, dropdown.
2. **All screens** at 1440px desktop:
   - Section A: A1–A7 (7 screens)
   - Section B: B1–B3 (3 screens)
   - Section C: C1–C6 (6 screens)
   - Section D: D1–D4 (4 screens)
   - Section E: E1–E3 (3 screens)
   - **Total: at least 23 screens.**
3. **Key mobile screens** (390px): landing, login, register, dashboard
   overview, contract list, sidebar drawer.
4. **Flows** as connected frames with arrows.
5. Brief design rationale per core screen.

> **REMINDER: Design ALL 5 sections (A–E) and ALL 23+ screens. Do not stop
> after any single section. This is a complete product — the user must see
> every page listed above.**
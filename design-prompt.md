# DocuShield — UI/UX Design Prompt (for design apps)

---

## Role

Act as a senior product designer and UX engineer. You will design the complete
UI for a B2B SaaS web app. Deliver polished, pixel-accurate SCREENS and UX
FLOWS as visual mockups (not code). A development team will later implement
these designs in their own tech stack, so focus purely on visuals, layout,
hierarchy, and interactions — never code, never framework names.

## Product

DocuShield — an AI co-pilot for legal contract risk triage. Legal teams upload
contracts; the app reads them, extracts key clauses, and flags risky terms so
lawyers can review faster. Positioning: trusted, precise, enterprise-grade
security for legal documents. Target users: workspace admins, legal
professionals, and read-only viewers.

## Design language

### Mood

- Confident, calm, enterprise-trustworthy. Think premium legal + modern
  security-tool aesthetic (Linear, Notion, Stripe-grade polish).
- Clean layouts, generous whitespace, subtle depth (soft shadows), no clutter,
  no gimmicks. Content is king; the interface recedes.
- Interactive states feel alive but restrained: subtle hover lift, smooth
  150–250ms transitions, clear focus states.

### Color palette (LIGHT MODE ONLY)

- Primary brand: deep navy/ink blue family — the "legal document" base, used
  for primary surfaces, the sidebar, headings, and the landing hero.
  Signature navy ≈ `#0B1424`–`#15243D`, with a full light-to-dark scale for
  tints and surfaces.
- Accent: emerald/teal green — the "shield + trust + success" color. Used for
  the main CTA, the active navigation state, and success indicators.
- Semantic states: green = success, amber = warning/pending attention, red =
  failure/error, blue/sky = in-progress, violet = special/high-privilege
  (admins).
- Neutrals: near-white page background (`#F7F8FA`), white surfaces, soft slate
  borders, slate body text, navy headings.
- Provide a full color system: primary scale, accent scale, semantic, and
  neutral — each named and consistent.

### Typography

- Modern geometric sans-serif (Inter / Geist style).
- Clear scale: a large display size for the hero, distinct H1/H2/H3, a
  comfortable body size (15–16px), and tiny uppercase labels for section
  headers.
- Tight letter-spacing on headings; tabular numbers for file sizes and dates.
- Strong hierarchy: users must know what to read first on every screen.

### Shape & detail

- Rounded corners: 8px for cards and inputs, 12px for modals and large
  surfaces, full-pill for badges and tags.
- 1px borders; soft, low-opacity shadows. Hover slightly darkens the border —
  never a hard jump.

## Brand & iconography

- A simple, bold shield-and-document logo mark that reads well at 16px
  (favicon) and at 120px (landing). Keep the accent color for the shield
  detail.
- Line-style icons (1.5–2px stroke, rounded caps), a single consistent weight
  and corner radius across all screens. No mixed filled/outline styles.

## Screens to design (LIGHT MODE ONLY)

### Public (logged-out)

1. **Landing page** — sticky navbar (logo, nav links, Login + "Get started");
   a hero on deep navy with a subtle glow/grid texture, a one-line value prop,
   primary CTA "Analyze a contract" and secondary "How it works"; three
   feature cards (Upload & parse, AI risk triage, Team collaboration); a
   3-step process strip; footer. Also show the same navbar in the logged-in
   state with a Dashboard button.
2. **Login** — centered card on a soft background: email + password, sign-in
   button, "Continue with Google" button (official two-tone G), link to
   register. Show the default state, inline validation errors, and the
   submitting state (spinner).
3. **Register** — one screen, TWO modes via tabs:
   - **Create workspace**: workspace/company name + email + password.
   - **Join workspace**: invite code + email + password.
   Both include Google sign-in. Show inline field errors and a basic password
   strength hint.
4. **OAuth callback** — quiet transition screen: centered spinner +
   "Signing you in…", plus its failure state (error + "Try again").
5. **404** — on-brand, logo, "Page not found", Back home.

### Dashboard (one authenticated shell, role-aware)

Shared shell: left sidebar (logo; nav: Contracts, Upload, Members, Billing;
user block at the bottom with avatar, name, email, role tag, Logout) + top
bar (page title, user menu). On mobile the sidebar becomes a hamburger
drawer.

1. **Dashboard overview** — "Welcome back, <name>", a row of metric cards
   (Total contracts, In review, Ready — plus Members and Current plan for
   admins), and below it the contract list. Include an empty state variant
   with an inviting CTA.
2. **Contract list** — table: file name, uploader, status tag, uploaded date,
   size, row actions (view). Hover states, status tags colored per the map
   below. On mobile it collapses to stacked cards.
3. **Upload** — drag-and-drop zone (dashed border that lights up on
   drag-over; accepts PDF/DOCX), a selected-file card (name, size, remove),
   an inline legal note, and a submit button with a loading state.
4. **Contract detail** — header metadata (name, uploader, date, status tag),
   a 5-step status stepper (queued → extracting → embedding → classifying →
   ready; failed shown as a red terminal step with retry), then placeholder
   sections for future AI output ("Risk flags", "Key clauses", "Ask the
   contract") styled as elegant "coming soon" cards.
5. **Members** (admin only) — member table (avatar, name, email, role tag
   with an inline change-role menu, joined date) + an "Invite member" button
   that opens a modal → generates a code → a large copyable code box with a
   Copy button and success toast.
6. **Billing** (admin only) — current plan card (name, price, status),
   upgrade options ("Upgrade to Pro", "Go Enterprise") that open Stripe
   checkout in a new tab, and a note about invoices.

## Role-based behavior (show all three variants)

- **Admin**: full nav (Contracts, Upload, Members, Billing); upload
  everywhere visible.
- **Legal**: Contracts + Upload only; Members/Billing nav hidden; upload
  visible.
- **Viewer**: read-only — NO upload button anywhere (hidden entirely, not
  greyed), no Members/Billing; everything else visible.

Mark each screen or nav bar with the role it belongs to (Admin / Legal /
Viewer / All).

## Status & role tags (fixed vocabulary — invent nothing)

Contract status → tag style:

- queued → neutral slate, subtle clock icon
- extracting → blue, pulsing progress icon
- embedding → violet, pulsing progress icon
- classifying → amber, pulsing progress icon
- ready → green, check icon
- failed → red, alert icon

Role tag style:

- admin → violet, legal → amber, viewer → slate

## User flows to sequence (arrows between screens)

1. Landing → Login → Dashboard (and Landing → Register → Create → Dashboard).
2. Register (Join workspace via invite code) → Dashboard as invited role.
3. Login → Dashboard → Upload → Contract detail (with status transitioning).
4. Admin: Dashboard → Members → Invite → copy code → success toast.
5. Admin: Dashboard → Billing → Choose plan → Stripe (new tab) → back.
6. Any page → 404; logged-out → Login when opening a protected screen.

## Deliverables

1. A STYLEGUIDE frame: color palette (all scales), typography scale, buttons
   (all variants + states), inputs (default / focus / error / disabled),
   tags, tables, modals, toasts, dropdowns.
2. The complete screen set at 1440px desktop, plus key screens at mobile
   (390px): landing, login, register, dashboard overview, contract list,
   contract detail, upload, and the mobile sidebar-drawer state.
3. The user flows as connected frames with arrows (per the list above).
4. A short design rationale note per core screen (why the layout/hierarchy
   was chosen).

## Style rules

- No code, no framework/language names, no component-library names — pure
  visual design.
- No invented statuses or roles beyond those listed.
- One consistent, minimal design language across every screen — it must feel
  like the same product, not a collection of pages.
- Contrast: text on every color passes WCAG AA.
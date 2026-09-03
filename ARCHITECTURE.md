```
frontend/
├── src/
│   ├── app/                         # Next.js App Router Pages & Routes
│   │   ├── (auth)/                  # Auth group routes (Shanza)
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   ├── (dashboard)/             # Main Dashboard routes
│   │   │   ├── layout.tsx           # Sidebar, Navigation & Rate-limit banner
│   │   │   ├── page.tsx             # Dashboard Home / File Upload Overview
│   │   │   ├── contracts/           # Contracts management
│   │   │   │   ├── page.tsx         # All contracts list
│   │   │   │   └── [id]/            # Detailed Contract Risk Analysis
│   │   │   │       └── page.tsx
│   │   │   └── settings/            # Subscription / Billing (Stripe)
│   │   ├── layout.tsx               # Root Layout with Providers
│   │   ├── globals.css              # Global styles + Tailwind setup
│   │   └── page.tsx                 # Landing / Redirect
│   │
│   ├── components/                  # UI Components
│   │   ├── ui/                      # Base Design System / Reusable UI (Shanza)
│   │   │   ├── badge.tsx            # Risk Badges (Low / Medium / High)
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   └── dialog.tsx
│   │   ├── contracts/               # Contract-specific Features
│   │   │   ├── upload-zone.tsx      # File upload validation UX
│   │   │   ├── clause-highlighter.tsx # Framer Motion clause animation (Annas)
│   │   │   ├── risk-score-card.tsx  # Animated risk score badge (Annas)
│   │   │   └── escalation-banner.tsx# Human review / Low confidence flag
│   │   ├── common/                  # System Status & UX Banners
│   │   │   ├── rate-limit-banner.tsx# 429 Retry-after Countdown UI (Shanza)
│   │   │   ├── status-tracker.tsx   # Queued → Classifying status UI (Zayyam)
│   │   │   └── system-status.tsx    # n8n / AI-pending graceful degradation (Annas)
│   │   └── layout/                  # Sidebar, Header, User Menu
│   │       ├── sidebar.tsx
│   │       └── header.tsx
│   │
│   ├── hooks/                       # Custom React Hooks
│   │   ├── use-contract-polling.ts  # Job status polling hook (Zayyam)
│   │   ├── use-rate-limit.ts        # Rate-limiting countdown hook (Shanza)
│   │   └── use-auth.ts              # JWT token & RBAC check hook
│   │
│   ├── lib/                         # API Client & Utility Functions
│   │   ├── api-client.ts            # Axios/Fetch setup for NestJS Gateway
│   │   ├── query-client.ts          # TanStack Query setup (Zayyam)
│   │   └── utils.ts                 # Class merger / helper functions
│   │
│   ├── providers/                   # React Context Providers
│   │   ├── query-provider.tsx       # TanStack Query Provider (Zayyam)
│   │   └── auth-provider.tsx        # Auth state provider
│   │
│   └── types/                       # TypeScript Definitions
│       ├── contract.ts              # Contract, Risk Level, Clause types
│       └── user.ts                  # Roles (Admin, Legal, Viewer)
│
├── public/                          # Static assets (Logos, icons)
├── tailwind.config.ts               # Custom Risk badge colors (Low/Med/High)
└── package.json
```
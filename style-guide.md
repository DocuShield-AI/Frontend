# Project Style Guide

This is the single source of truth for colors, typography, and component styling. Any agent (Claude Code, other coding agents) building UI for this project should follow this guide exactly.

---

## 1. Color Palette

Official Ultraleads brand palette — navy blue, mint green, and light blue:

| Color Name | Hex | Usage |
|---|---|---|
| **Navy Blue** | `#1E3A5F` (Primary brand identity) | Primary buttons, primary cards (e.g. Total Sales), active navigation tabs, main headings, dark surfaces. |
| **Mint Green** | `#35C1B6` (Primary accent) | Primary actions, bar charts, progress bars, speed gauge widgets, active elements, data visualization. |
| **Light Blue** | `#3395CA` (Secondary accent) | Secondary actions, filter buttons (gradient transitions), location badges, subtle UI highlights, gradients. |
| **Soft Gray** | `#EFF1F4` (Background) | App background layout, inactive cards, light containers, input fills, divider tint. |
| **Soft Pink** | `#FFB3B3` (Highlight) | Small badge highlights on statistics charts (e.g. percentage increases), active-card chart highlights. |
| **Dark Slate** | `#1F2937` (Typography) | Main text, primary numbers, values, headings on light surfaces. |
| **Pure White** | `#FFFFFF` (Surface) | Main content surfaces, card backgrounds, panels, dialogs, text on dark surfaces. |
| **Deep Light Blue** | `#1E7DB2` (Accent — accessible tint of Light Blue) | Small text on light surfaces (labels, eyebrows, links, info status pills), icons, focus rings. True `#3395CA` fails WCAG AA below 18px on white (≈3.1:1) — this tint keeps contrast ≥ 4.5:1. |
| **Muted Slate** | `#5A6B7B` | Secondary/muted text, captions, placeholder text (slate-gray derived from Navy Blue). |
| **Slate Border** | `#D8DEE4` | Input borders, table borders, card outlines, dividers on light surfaces. |
| **Success** | `#2E7D32` | Success states, confirmations. *(supplemental semantic color)* |
| **Error** | `#C0392B` | Error states, destructive actions. *(supplemental semantic color)* |
| **Warning** | `#B8860B` | Warning states. *(supplemental semantic color)* |

### Brand gradient
Navy Blue → Light Blue, used selectively (featured stat card, checkout CTA, chart fills) — never on every surface:
```css
--gradient-brand: linear-gradient(135deg, #1e3a5f 0%, #3395ca 100%);
```

### Buttons
- **Primary button**: background `#1E3A5F`, text `#FFFFFF`, hover `#1F2937`
- **Secondary button**: background transparent, border `#1E7DB2`, text `#1E7DB2`, hover fill `#3395CA` / text `#FFFFFF`
- **Disabled button**: background `#D8DEE4`, text `#7D8B99`

### Design rules
- Prefer soft shadows and surface contrast over borders. Border the minimum; use `#D8DEE4` at low prominence when structure demands it.
- Serif of the product: premium analytics SaaS — restrained color usage, generous whitespace, consistent radii, `#FFFFFF` used heavily so data breathes.
- Gradients only where highlighted (featured card, primary CTA, chart elements) — navy→light blue, never rainbow; never overused.
- Never place small Light Blue or Mint text on white/Soft Gray (insufficient contrast); use Deep Light Blue `#1E7DB2` for text instead. Mint `#35C1B6` is for fills, charts, bars and large numerals.
- Shadows inherit Navy Blue: `rgba(30, 58, 95, n)`.
- Semantic colors stay intuitive: green = success, amber = warning, red = error, Light Blue = informational.
- Don't force every element into brand colors; pink `#FFB3B3` is reserved for small stat badge highlights only.

---

## 2. Typography

**Primary font: Manrope** (Regular 400 / Medium 500 / Semibold 600 / Bold 700) — modern geometric sans, sets the visual tone across headings and body. Loaded via `next/font/google` as `--font-manrope-variable`; exposed as Tailwind utilities `font-sans`, `font-heading`, and the legacy aliases `font-plus`, `font-poppins`, `font-inter`, `font-outfit`.

> Monospace: **Space Mono** only where the product displays code, IDs, or card numbers (`--font-space-mono-variable`).

### Type scale
| Element | Size | Weight |
|---|---|---|
| H1 | 32px | 700 |
| H2 | 24px | 600 |
| H3 | 20px | 600 |
| Body | 16px | 400 |
| Small / Caption | 13px | 400 |
| Button label | 14px | 600 |

---

## 3. Design Tokens (for direct use in code)

```css
:root {
  /* Brand */
  --color-primary: #1E3A5F;   /* Light Blue */
  --color-secondary: #1F2937; /* Navy Blue */
  --color-accent: #1E7DB2;    /* Deep Light Blue (accessible small-text accent) */
  --gradient-brand: linear-gradient(135deg, #1E3A5F 0%, #3395CA 100%);

  /* Surfaces & text */
  --color-surface: #FFFFFF;
  --color-background: #EFF1F4;  /* Soft Gray */
  --color-text-primary: #1F2937;
  --color-text-secondary: #5A6B7B;
  --color-text-on-dark: #FFFFFF;

  /* Structure & feedback */
  --color-border: #D8DEE4;
  --color-success: #2E7D32;
  --color-error: #C0392B;
  --color-warning: #B8860B;

  /* Form fills */
  --color-input: #F3F2FE;
  --color-input-focus: #EAE9FB;

  /* Typography */
  --font-heading: 'Manrope', sans-serif;
  --font-body: 'Manrope', sans-serif;
  --font-space-mono-variable: 'Space Mono', monospace;

  /* Radius & spacing (baseline, adjust as needed) */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;
  --space-unit: 8px;
}
```

---

## 4. Instructions for AI Coding Agents

When generating any UI (Claude Code, other agents), follow these rules:
1. Always pull colors from the tokens above — never invent new hex values (semantic success/error/warning feedback excepted).
2. Use `--font-heading` for all headings, Manrope for everything else.
3. Primary actions use Mint Green (or the navy→light-blue gradient); destructive actions use `--color-error`; informational emphasis uses Deep Light Blue.
4. Maintain sufficient contrast: Navy Blue text on `#EFF1F4`/`#FFFFFF`, Pure White text on Navy Blue/Light Blue surfaces. Use `--color-accent` (never `#3395CA` or `#35C1B6`) for small colored text on light surfaces.
5. Keep border radius and spacing consistent with the tokens above unless a specific component spec overrides it.

---

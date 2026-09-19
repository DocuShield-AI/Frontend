# Project Style Guide

This is the single source of truth for colors, typography, and component styling. Any agent (Claude Code, other coding agents) building UI for this project should follow this guide exactly.

---

## 1. Color Palette

Source: [Color Hunt – #0C2B4E, #1A3D64, #1D546C, #F4F4F4](https://colorhunt.co/palette/0c2b4e1a3d641d546cf4f4f4)


| Role | Hex | Usage |
|---|---|---|
| **Primary** | `#0C2B4E` (Deep Navy) | Main brand color. Navbars, headers, primary buttons, sidebar background, footer. |
| **Secondary** | `#1A3D64` (Navy Blue) | Secondary surfaces. Cards, panel backgrounds, secondary buttons, hover state for primary elements. |
| **Accent** | `#1D546C` (Teal Blue) | Highlights and interactive elements. Links, active states, icons, progress bars, focus rings, chips/tags. |
| **Background** | `#F4F4F4` (Light Gray) | Page background (light mode), input field backgrounds, dividers. |
| **Surface (White)** | `#FFFFFF` | Cards and content surfaces sitting on top of the light gray background. |
| **Text Primary** | `#0C2B4E` | Headings and primary body text on light backgrounds. |
| **Text Secondary** | `#5A6B7B` | Muted/secondary text, captions, placeholder text. |
| **Text on Dark** | `#F4F4F4` | Body/label text on navy or teal backgrounds. |
| **Border/Divider** | `#D6DCE2` | Input borders, table borders, dividers on light surfaces. |
| **Success** | `#2E7D32` | Success states, confirmations. *(supplemental — not from source palette)* |
| **Error** | `#C0392B` | Error states, destructive actions. *(supplemental — not from source palette)* |
| **Warning** | `#B8860B` | Warning states. *(supplemental — not from source palette)* |

### Buttons
- **Primary button**: background `#0C2B4E`, text `#F4F4F4`, hover `#1A3D64`
- **Secondary button**: background transparent, border `#1D546C`, text `#1D546C`, hover fill `#1D546C` / text `#F4F4F4`
- **Disabled button**: background `#D6DCE2`, text `#8A94A0`

### Dark mode (optional, if needed later)
- Background: `#0C2B4E` → Surface: `#1A3D64` → Text: `#F4F4F4` → Accent stays `#1D546C`

---

## 2. Typography

**Use 2 fonts:**

| Font | Purpose |
|---|---|
| **Heading / Display font** | Titles, section headers, hero text, navbar brand — sets visual tone. |
| **Body / UI font** | Paragraphs, labels, buttons, form fields, table data — optimized for readability at small sizes. |

> Add a 3rd, monospace font only if the product displays code, IDs, logs, or tabular numeric data.

**Final pairing:**
- Heading: **Poppins** (Semibold/Bold) — geometric, confident, pairs well with a navy/teal palette
- Body: **Inter** (Regular/Medium) — highly legible UI font, wide language/weight support

Both are free on Google Fonts:
```html
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
```

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
  /* Colors */
  --color-primary: #0C2B4E;
  --color-secondary: #1A3D64;
  --color-accent: #1D546C;
  --color-background: #F4F4F4;
  --color-surface: #FFFFFF;
  --color-text-primary: #0C2B4E;
  --color-text-secondary: #5A6B7B;
  --color-text-on-dark: #F4F4F4;
  --color-border: #D6DCE2;
  --color-success: #2E7D32;
  --color-error: #C0392B;
  --color-warning: #B8860B;

  /* Typography */
  --font-heading: 'Poppins', sans-serif;
  --font-body: 'Inter', sans-serif;

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
1. Always pull colors from the tokens above — never invent new hex values.
2. Use `--font-heading` for all headings, `--font-body` for everything else.
3. Primary actions use the primary/accent color; destructive actions use `--color-error`.
4. Maintain sufficient contrast: dark navy text on `#F4F4F4`/`#FFFFFF`, light `#F4F4F4` text on navy/teal surfaces.
5. Keep border radius and spacing consistent with the tokens above unless a specific component spec overrides it.

---

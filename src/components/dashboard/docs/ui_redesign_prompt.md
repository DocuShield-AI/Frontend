Act as a Lead Product Designer, Senior UI/UX Engineer, and Senior Frontend Developer.

I want to completely transform the existing Ultraleads application's visual identity using the new brand color palette provided below. This is a complete application-wide redesign of the UI and color theme, **not** a redesign of the product's backend functionality or business logic.

### 1. Official Brand Palette
Use these exact brand colors via CSS variables/design tokens:

*   **Primary Dark (Navy Blue):** `#1E3A5F` — Primary brand identity, primary cards (like Total Sales), active navigation tabs, main headings.
*   **Primary Accent (Mint Green/Cyan):** `#35C1B6` — Primary actions, bar charts, progress bars, speed gauge widgets, active elements.
*   **Secondary Accent (Light Blue):** `#3395CA` — Secondary actions, filter buttons (gradient transitions), location badges, subtle UI highlights.
*   **Background Soft (Light Gray):** `#EFF1F4` — App background layout, inactive cards, light containers, borders.
*   **Highlight (Soft Pink):** `#FFB3B3` — Small badge highlights on statistics charts (e.g., percentage increases).
*   **Typography (Dark Slate):** `#1F2937` — Main text, primary numbers, and values for enhanced readability.
*   **Pure White:** `#FFFFFF` — Main content surfaces, main card backgrounds.

### 2. Design Direction & Vibe
Ultraleads is a modern Sales and Analytics Dashboard. 
The visual identity must communicate:
*   Data clarity and professional analytics.
*   A premium, modern SaaS experience.
*   Clean visual hierarchy prioritizing readability of metrics and charts.

### 3. The "Do's and Don'ts" Ruleset

**DO:**
*   **Do** establish centralized design tokens (e.g., CSS variables or Tailwind config) for the new palette before styling.
*   **Do** apply the theme consistently across all pages: sales overview, analytics, invoices, products, and calendars.
*   **Do** maintain standard semantic colors for system states (e.g., Green for Success, Red for Error) unless they clash heavily with the primary accent.
*   **Do** use subtle shadows and clean border-radii for a modern, elevated card look against the `#EFF1F4` background.
*   **Do** ensure high WCAG contrast ratios, particularly for the `#1F2937` text on lighter backgrounds.

**DON'T:**
*   **Don't** use scattered, hardcoded hex values across different components or CSS files.
*   **Don't** modify backend APIs, database schemas, or core component logic.
*   **Don't** overuse gradients; reserve them specifically for chart elements (like the customer volume gauge) and primary buttons.
*   **Don't** force every single UI element into the brand colors; utilize `#FFFFFF` heavily to let the data breathe.
*   **Don't** leave any existing page or edge-case state with the old color scheme.

### 4. Color Application Strategy
*   **Primary Brand:** Use `#1E3A5F` for overarching containers and `#35C1B6` for data visualization to draw the eye to key metrics.
*   **Backgrounds:** Use `#EFF1F4` to create a clean visual environment that makes the `#FFFFFF` data cards pop.
*   **Typography:** Strict adherence to `#1F2937` for text to avoid the harshness of pure black while maintaining perfect legibility.

### 5. Technical Implementation & Verification
1.  **Inspect:** Analyze the current frontend architecture to locate existing color variables and shared components.
2.  **Plan:** Update the theme architecture (CSS/SCSS variables, styled-components, or Tailwind config).
3.  **Implement:** Roll out the changes systematically without breaking responsive layouts.
4.  **Verify:** Check all interactive states (hover/focus/disabled), review the charts/graphs for color accuracy, run linting, and fix any styling regressions.

**Final Design Goal:** Transform the Ultraleads platform into a highly readable, premium sales dashboard. Inspect → Plan → Implement → Verify.
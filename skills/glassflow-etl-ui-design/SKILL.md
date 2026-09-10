---
name: glassflow-etl-ui-design
description: LEGACY design system of GlassFlow's first product, the ClickHouse ETL UI (glassflow-ui) — dark warm-glass theme, Archivo + Inter, #ffa24b accent, 4px grid, spring motion. Use ONLY for that product family or when a task explicitly asks for the ETL UI's look. NOT for Rius or Tares — those use the `glassflow-paper-design` skill (cream paper, brown ink, mono labels, square geometry).
---

# glassflow-ui Design System (legacy — ClickHouse ETL UI)

> **Scope.** This is the design system of GlassFlow's *first* product, the ClickHouse ETL UI
> (`glassflow-ui`), extracted by skillui in 2026. It is kept because the system is good and
> reusable for that product family. It is **not** the system of the current products: **Rius**
> (AI-agent observability console, `argus-ui`) and **Tares** run on the paper direction described
> in the `glassflow-paper-design` skill. If the task is for Rius, Tares, `argus-ui`, or any project
> whose `.impeccable.md` names the paper direction, stop and load that skill instead.

You are building UI for **glassflow-ui**. Dark-themed, warm palette, sans-serif typography (Archivo), compact density on a 4px grid, expressive motion.

## Design Philosophy

- **Layered depth** — use shadow tokens to create a sense of physical layering. Each elevation level has a specific shadow.
- **Gradient accents** — gradients are used thoughtfully for emphasis, not decoration.
- **Type pairing** — Archivo for body/UI text, Inter for headings/display. Never introduce a third typeface.
- **compact density** — 4px base grid. Every dimension is a multiple of 4.
- **warm palette** — the color temperature runs warm, matching the sans-serif typography.
- **Restrained accent** — `#ffa24b` is the only pop of color. Used exclusively for CTAs, links, focus rings, and active states.
- **Expressive motion** — animations are an integral part of the experience. Use spring physics and layout animations.

## Color System

### Core Palette

| Role | Token | Hex | Use |
|------|-------|-----|-----|
| Background | `--background` | `#121214` | Page/app background |
| Surface | `--surface` | `#332010` | Cards, panels, modals |
| Text Primary | `--text-primary` | `#fef2f2` | Headings, body text |
| Accent | `--accent` | `#ffa24b` | CTAs, links, focus rings |

### Status Colors

| Status | Hex | Use |
|--------|-----|-----|
| Success | `#13271e` | Confirmations, positive trends |
| Warning | `#f99c00` | Caution states, pending items |
| Danger | `#fb2c36` | Errors, destructive actions |

### Extended Palette

- **tw-ring-offset-color:** `#ffffff` — Light surface or highlight color
- **color-slate-200:** `#e2e8f0` — Light surface or highlight color
- **color-black:** `#000000` — Deep background layer or shadow color
- **color-green-50:** `#f0fdf4` — Light surface or highlight color
- **color-gray-800:** `#1e2939`
- **color-gray-900:** `#101828` — Deep background layer or shadow color
- **color-red-200:** `#ffcaca` — Light surface or highlight color
- **color-red-900:** `#82181a`

### CSS Variable Tokens

```css
--border-width: 1px;
--z-index-popover: 1050;
--button-primary-padding-x: var(--unit-x2);
--button-primary-padding-y: var(--unit-x3);
--button-primary-font-family: var(--font-family-body);
--button-primary-font-size: var(--font-size-body-3);
--button-primary-font-weight: var(--font-weight-medium);
--button-primary-line-height: var(--line-height-body-3);
--button-primary-letter-spacing: var(--letter-spacing-body-3);
--button-primary-border-radius: var(--radius-md);
--button-secondary-padding-x: var(--unit-x2);
--button-secondary-padding-y: var(--unit-x3);
--button-secondary-font-family: var(--font-family-body);
--button-secondary-font-size: var(--font-size-body-3);
--button-secondary-font-weight: var(--font-weight-medium);
--button-secondary-line-height: var(--line-height-body-3);
--button-secondary-letter-spacing: var(--letter-spacing-body-3);
--button-secondary-border-radius: var(--radius-md);
--button-tertiary-border-radius: var(--radius-md);
--button-ghost-border-radius: var(--radius-md);
```

## Typography

### Font Stack

- **Archivo** — Heading 1, Heading 2, Heading 3
- **Inter** — Body, Caption
- **SFMono-Regular** — Code

### Font Sources

```css
@font-face {
  font-family: "Inter";
  src: url("fonts/Inter-Bold.ttf") format("truetype");
  font-weight: 700;
}
@font-face {
  font-family: "Inter";
  src: url("fonts/Inter-Regular.ttf") format("truetype");
  font-weight: 400;
}
@font-face {
  font-family: "Archivo";
  src: url("fonts/Archivo-Bold.ttf") format("truetype");
  font-weight: 700;
}
@font-face {
  font-family: "Archivo";
  src: url("fonts/Archivo-Regular.ttf") format("truetype");
  font-weight: 400;
}
```

### Type Scale

| Role | Family | Size | Weight |
|------|--------|------|--------|
| Heading 1 | Archivo | 24px | 700 |
| Heading 2 | Archivo | 16px | 700 |
| Heading 3 | Archivo | .8rem | 700 |
| Body | Inter | 10px | 400 |
| Caption | Inter | inherit | 400 |
| Code | SFMono-Regular | 14px | 400 |

### Typography Rules

- Body/UI: **Archivo**, Headings: **Inter** — these are the only display fonts
- Max 3-4 font sizes per screen
- Headings: weight 600-700, body: weight 400
- Use color and opacity for text hierarchy, not additional font sizes
- Line height: 1.5 for body, 1.2 for headings

## Spacing & Layout

### Base Grid: 4px

Every dimension (margin, padding, gap, width, height) must be a multiple of **4px**.

### Spacing Scale

`2, 4, 6, 8, 16, 24, 32, 44` px

### Spacing as Meaning

| Spacing | Use |
|---------|-----|
| 4-8px | Tight: related items (icon + label, avatar + name) |
| 12-16px | Medium: between groups within a section |
| 24-32px | Wide: between distinct sections |
| 48px+ | Vast: major page section breaks |

### Border Radius

Scale: `.25rem, 1px, 2px, 4px, inherit, 6px, 14px`
Default: `4px`

### Container

Max-width: `1024px`, centered with auto margins.

### Breakpoints

| Name | Value |
|------|-------|
| sm | 40rem |
| md | 48rem |
| lg | 64rem |
| xl | 80rem |
| 2xl | 96rem |
| sm | 640px |
| md | 768px |
| lg | 1024px |
| xl | 1280px |
| 2xl | 1563px |

Mobile-first: design for small screens, layer on responsive overrides.

## Component Patterns

### Card

```css
.card {
  background: #332010;
  border-radius: 4px;
  padding: 16px;
  box-shadow: var(--control-shadow-focus);
}
```

```html
<div class="card">
  <h3>Card Title</h3>
  <p>Card content goes here.</p>
</div>
```

### Button

```css
/* Primary */
.btn-primary {
  background: #ffa24b;
  color: #fef2f2;
  border-radius: 4px;
  padding: 8px 16px;
  font-weight: 500;
  transition: opacity 150ms ease;
}
.btn-primary:hover { opacity: 0.9; }

/* Ghost */
.btn-ghost {
  background: transparent;
  border: 1px solid #444444;
  color: #fef2f2;
  border-radius: 4px;
  padding: 8px 16px;
}
```

```html
<button class="btn-primary">Get Started</button>
<button class="btn-ghost">Learn More</button>
```

### Input

```css
.input {
  background: #121214;
  border: 1px solid #444444;
  border-radius: 4px;
  padding: 8px 8px;
  color: #fef2f2;
  font-size: 14px;
}
.input:focus { border-color: #ffa24b; outline: none; }
```

```html
<input class="input" type="text" placeholder="Search..." />
```

### Badge / Chip

```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 8px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 500;
  background: #332010;
  color: #8c8585;
}
```

```html
<span class="badge">New</span>
<span class="badge">Beta</span>
```

### Modal / Dialog

```css
.modal-backdrop { background: rgba(0, 0, 0, 0.6); }
.modal {
  background: #332010;
  border-radius: 14px;
  padding: 24px;
  max-width: 480px;
  width: 90vw;
  box-shadow: var(--card-content-shadow-hover);
}
```

```html
<div class="modal-backdrop">
  <div class="modal">
    <h2>Dialog Title</h2>
    <p>Dialog content.</p>
    <button class="btn-primary">Confirm</button>
    <button class="btn-ghost">Cancel</button>
  </div>
</div>
```

### Table

```css
.table { width: 100%; border-collapse: collapse; }
.table th {
  text-align: left;
  padding: 8px 8px;
  font-weight: 500;
  font-size: 12px;
  color: #8c8585;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid #444444;
}
.table td {
  padding: 8px;
  border-bottom: 1px solid #444444;
}
```

```html
<table class="table">
  <thead><tr><th>Name</th><th>Status</th><th>Date</th></tr></thead>
  <tbody>
    <tr><td>Item One</td><td>Active</td><td>Jan 1</td></tr>
    <tr><td>Item Two</td><td>Pending</td><td>Jan 2</td></tr>
  </tbody>
</table>
```

### Navigation

```css
.nav {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
}
.nav-link {
  color: #8c8585;
  padding: 8px 8px;
  border-radius: 4px;
  transition: color 150ms;
}
.nav-link:hover { color: #fef2f2; }
.nav-link.active { color: #ffa24b; }
```

```html
<nav class="nav">
  <a href="/" class="nav-link active">Home</a>
  <a href="/about" class="nav-link">About</a>
  <a href="/pricing" class="nav-link">Pricing</a>
  <button class="btn-primary" style="margin-left: auto">Get Started</button>
</nav>
```

### Extracted Components

These components were found in the codebase:

**Button** (`html`)

**Card** (`html`)
- Variants: `border)]`

**Navigation** (`html`)

**Footer** (`html`)

## Page Structure

The following page sections were detected:

- **Navigation** — Top navigation bar (2 items)
- **Footer** — Page footer with links and info
- **Hero** — Hero section (detected from heading structure)
- **Cards** — Grid of 5 card elements (5 items)

When building pages, follow this section order and structure.

### Conversion Rules (marketing & landing pages)

These apply whenever a page's job is to persuade (homepage, landing page, pricing page) — not to app UI:

- **Hero = complete pitch.** The first screen must contain all four: headline (what it is), context (who it's for / why it matters), proof (logos, metric, or quote), and one primary CTA — all visible without scrolling. Test: could a visitor decide from the first screen alone?
- **Proof at the point of doubt.** Place reassurance exactly where hesitation lives, never on a separate testimonials section alone: customer logos in the hero, a testimonial beside the pricing, the metric or review next to the claim it backs, a trust signal next to the signup form. Test: for each CTA and each bold claim, what sits within one glance that makes it believable?

This project uses **expressive motion**. Animations are part of the design language.

### CSS Animations

- `fadeIn`
- `fadeInOpacity`
- `slideDown`
- `slideDownFade`
- `pulse`

### Motion Tokens

- **Duration scale:** `.15s`, `.2s`, `.3s`, `.5s`, `.7s`, `.75s`, `300ms`
- **Easing functions:** `cubic-bezier(.4,0,.2,1)`
- **Animated properties:** `background-color`

### Motion Guidelines

- **Duration:** Use values from the duration scale above. Short (.15s) for micro-interactions, long (300ms) for page transitions
- **Easing:** Use `cubic-bezier(.4,0,.2,1)` as the default easing curve
- **Direction:** Elements enter from bottom/right, exit to top/left
- **Reduced motion:** Always respect `prefers-reduced-motion` — disable animations when set

## Depth & Elevation

### Shadow Tokens

- Raised (cards, buttons): `var(--control-shadow-focus)`
- Raised (cards, buttons): `var(--shadow-overlay)`
- Raised (cards, buttons): `var(--button-card-shadow)`
- Raised (cards, buttons): `var(--btn-shadow-hover)`
- Raised (cards, buttons): `var(--shadow-raised)`
- Raised (cards, buttons): `var(--button-card-secondary-shadow)`

### Z-Index Scale

`0, 10, 20, 40, 50, 100, 110, 200`

Use these exact values — never invent z-index values.

## Anti-Patterns (Never Do)

- **No blur effects** — no backdrop-blur, no filter: blur()
- **No zebra striping** — tables and lists use borders for separation
- **No invented colors** — every hex value must come from the palette above
- **No arbitrary spacing** — every dimension is a multiple of 4px
- **No extra fonts** — only Archivo and Inter and SFMono-Regular are allowed
- **No arbitrary border-radius** — use the scale: .25rem, 1px, 2px, 4px, 6px, 14px
- **No opacity for disabled states** — use muted colors instead

## Workflow

1. **Read** `references/DESIGN.md` before writing any UI code
2. **Pick colors** from the Color System section — never invent new ones
3. **Set typography** — Archivo, Inter, SFMono-Regular only, using the type scale
4. **Build layout** on the 4px grid — check every margin, padding, gap
5. **Match components** to patterns above before creating new ones
6. **Apply elevation** — use shadow tokens
7. **Validate** — every value traces back to a design token. No magic numbers.

## Brand Spec

- **Favicon:** `/favicon.svg`
- **Site URL:** `http://localhost:8080`
- **Brand color:** `#ffa24b`
- **Brand typeface:** Archivo

## Quick Reference

```
Background:     #121214
Surface:        #332010
Text:           #fef2f2 / (not extracted)
Accent:         #ffa24b
Border:         (not extracted)
Font:           Archivo
Spacing:        4px grid
Radius:         4px
Components:     5 detected
```

## When to Trigger

Activate this skill when:
- Creating new components, pages, or visual elements for the ClickHouse ETL UI (`glassflow-ui`)
- The user mentions the "ETL UI", "glassflow-ui", or the "old / dark glass" GlassFlow theme
- A task explicitly asks to reuse the ETL UI's dark warm-glass look on another product
- Reviewing ETL UI code for design consistency

Do NOT activate for Rius, Tares, `argus-ui`, or the paper / field-manual direction — that is
`glassflow-paper-design`.

---

# Full Reference Files

> Every output file is embedded below. Claude has full design system context from /skills alone.

## Design System Tokens (DESIGN.md)

# glassflow-ui DESIGN.md

> Auto-generated design system — reverse-engineered via static analysis by skillui.
> Frameworks: None detected
> Colors: 20 · Fonts: 3 · Components: 5
> Icon library: not detected · State: not detected
> Primary theme: dark · Dark mode toggle: no · Motion: expressive

---

## 1. Visual Theme & Atmosphere

This is a **dark-themed** interface with a warm tone. Depth is expressed through layered shadows and subtle surface color variation. Typography pairs **Inter** for display/headings with **Archivo** for body text, creating clear visual hierarchy through type contrast. Spacing follows a **4px base grid** (compact density), with scale: 2, 4, 6, 8, 16, 24, 32, 44px. The accent color **#ffa24b** anchors interactive elements (buttons, links, focus rings). Motion is expressive — spring physics, layout animations, and staggered reveals are part of the visual language.

---

## 2. Color Palette & Roles

| Token | Hex | Role | Use |
|---|---|---|---|
| color-gray-dark-800 | `#121214` | background | Page background, darkest surface |
| color-brown-800 | `#332010` | surface | Card and panel backgrounds |
| color-red-50 | `#fef2f2` | text-primary | Headings and body text |
| color-orange-300 | `#ffa24b` | accent | CTAs, links, focus rings, active states |
| color-red-500 | `#fb2c36` | danger | Error states, destructive actions |
| color-green-750 | `#13271e` | success | Success states, positive indicators |
| color-amber-500 | `#f99c00` | warning | Warning states, caution indicators |
| color-slate-200 | `#e2e8f0` | info | Informational highlights |
| tw-ring-offset-color | `#ffffff` | unknown | Palette color |
| color-black | `#000000` | unknown | Palette color |
| color-green-50 | `#f0fdf4` | unknown | Palette color |
| color-gray-800 | `#1e2939` | unknown | Palette color |
| color-gray-900 | `#101828` | unknown | Palette color |
| color-red-200 | `#ffcaca` | unknown | Palette color |
| color-red-900 | `#82181a` | unknown | Palette color |
| color-orange-200 | `#ffd7a8` | unknown | Palette color |
| color-orange-400 | `#ff8b1a` | unknown | Palette color |
| color-amber-400 | `#fcbb00` | unknown | Palette color |
| color-yellow-200 | `#fff085` | unknown | Palette color |
| color-green-400 | `#05df72` | unknown | Palette color |

### CSS Variable Tokens

```css
--tw-border-style: solid;
--tw-border-style: dashed;
--tw-border-style: none;
--tw-border-style: solid;
--border-width: 1px;
--z-index-popover: 1050;
--button-primary-padding-x: var(--unit-x2);
--button-primary-padding-y: var(--unit-x3);
--button-primary-font-family: var(--font-family-body);
--button-primary-font-size: var(--font-size-body-3);
--button-primary-font-weight: var(--font-weight-medium);
--button-primary-line-height: var(--line-height-body-3);
--button-primary-letter-spacing: var(--letter-spacing-body-3);
--button-primary-border-radius: var(--radius-md);
--button-secondary-padding-x: var(--unit-x2);
--button-secondary-padding-y: var(--unit-x3);
--button-secondary-font-family: var(--font-family-body);
--button-secondary-font-size: var(--font-size-body-3);
--button-secondary-font-weight: var(--font-weight-medium);
--button-secondary-line-height: var(--line-height-body-3);
```


---

## 3. Typography Rules

**Font Stack:**
- **Archivo** — Heading 1, Heading 2, Heading 3
- **Inter** — Body, Caption
- **SFMono-Regular** — Code

**Font Sources:**

```css
@font-face {
  font-family: "Inter";
  src: url("fonts/Inter-Bold.ttf") format("truetype");
  font-weight: 700;
}
@font-face {
  font-family: "Inter";
  src: url("fonts/Inter-Regular.ttf") format("truetype");
  font-weight: 400;
}
@font-face {
  font-family: "Archivo";
  src: url("fonts/Archivo-Bold.ttf") format("truetype");
  font-weight: 700;
}
@font-face {
  font-family: "Archivo";
  src: url("fonts/Archivo-Regular.ttf") format("truetype");
  font-weight: 400;
}
```

| Role | Font | Size | Weight |
|---|---|---|---|
| Heading 1 | Archivo | 24px | 700 |
| Heading 2 | Archivo | 16px | 700 |
| Heading 3 | Archivo | .8rem | 700 |
| Body | Inter | 10px | 400 |
| Caption | Inter | inherit | 400 |
| Code | SFMono-Regular | 14px | 400 |

**Typographic Rules:**
- Limit to 3 font families max per screen
- Use **Archivo** for body/UI text, **Inter** for display/headings
- Maintain consistent hierarchy: no more than 3-4 font sizes per screen
- Headings use bold (600-700), body uses regular (400)
- Line height: 1.5 for body text, 1.2 for headings
- Use color and opacity for secondary hierarchy, not additional font sizes


---

## 4. Component Stylings

### Layout (1)

**Footer** — `html`

### Navigation (1)

**Navigation** — `html`

### Data Display (1)

**Card** — `html`
- Variants: `border)]`

### Data Input (1)

**Button** — `html`
- Animation: 

### Media (1)

**Image** — `html`



---

## 5. Layout Principles

- **Base spacing unit:** 4px
- **Spacing scale:** 2, 4, 6, 8, 16, 24, 32, 44
- **Border radius:** .25rem, 1px, 2px, 4px, inherit, 6px, 14px
- **Max content width:** 1024px

**Spacing as Meaning:**
| Spacing | Use |
|---|---|
| 4-8px | Tight: related items within a group |
| 12-16px | Medium: between groups |
| 24-32px | Wide: between sections |
| 48px+ | Vast: major section breaks |


---

## 6. Depth & Elevation

### Raised — cards, buttons, interactive elements

- `var(--control-shadow-focus)`
- `var(--shadow-overlay)`
- `var(--button-card-shadow)`

### Z-Index Scale

`0, 10, 20, 40, 50, 100, 110, 200`



---

## 7. Animation & Motion

This project uses **expressive motion**. Animations are an integral part of the experience.

### CSS Animations

- `@keyframes fadeIn`
- `@keyframes fadeInOpacity`
- `@keyframes slideDown`
- `@keyframes slideDownFade`
- `@keyframes pulse`
- `@keyframes slideUpFade`
- `@keyframes feedbackEntrance`
- `@keyframes fadeInUp`

### Animated Components

- **Button**: 

### Motion Guidelines

- Duration: 150-300ms for micro-interactions, 300-500ms for page transitions
- Easing: `ease-out` for enters, `ease-in` for exits
- Always respect `prefers-reduced-motion`


---

## 8. Do's and Don'ts

### Do's

- Use `#ffa24b` for interactive elements (buttons, links, focus rings)
- Use `#121214` as the primary page background
- Pair **Archivo** (body) with **Inter** (display) — these are the only allowed fonts
- Follow the **4px** spacing grid for all margins, padding, and gaps
- Use the defined shadow tokens for elevation — see Section 6
- Use border-radius from the scale: .25rem, 1px, 2px, 4px, inherit
- Reuse existing components from Section 4 before creating new ones

### Don'ts

- Don't introduce colors outside this palette — extend the design tokens first
- Don't introduce additional font families beyond Archivo and Inter and SFMono-Regular
- Don't use arbitrary spacing values — stick to multiples of 4px
- Don't create custom box-shadow values outside the system tokens
- Don't use arbitrary border-radius values — pick from the defined scale
- Don't duplicate component patterns — check Section 4 first
- Don't use backdrop-blur or blur effects

### Anti-Patterns (detected from codebase)

- No blur or backdrop-blur effects
- No zebra striping on tables/lists


---

## 9. Responsive Behavior

| Name | Value | Source |
|---|---|---|
| sm | 40rem | css |
| md | 48rem | css |
| lg | 64rem | css |
| xl | 80rem | css |
| 2xl | 96rem | css |
| sm | 640px | css |
| md | 768px | css |
| lg | 1024px | css |
| xl | 1280px | css |
| 2xl | 1563px | css |

**Approach:** Use `@media (min-width: ...)` queries matching the breakpoints above.


---

## 10. Agent Prompt Guide

Use these as starting points when building new UI:

### Build a Card

```
Background: #332010
Border: 1px solid var(--border)
Radius: 4px
Padding: 16px
Font: Archivo
Use shadow tokens from Section 6.
```

### Build a Button

```
Primary: bg #ffa24b, text white
Ghost: bg transparent, border var(--border)
Padding: 8px 16px
Radius: 4px
Hover: opacity 0.9 or lighter shade
Focus: ring with #ffa24b
```

### Build a Page Layout

```
Background: #121214
Max-width: 1024px, centered
Grid: 4px base
Responsive: mobile-first, breakpoints from Section 9
```

### Build a Stats Card

```
Surface: #332010
Label: var(--text-muted) (muted, 12px, uppercase)
Value: #fef2f2 (primary, 24-32px, bold)
Status: use success/warning/danger from Section 2
```

### Build a Form

```
Input bg: #121214
Input border: 1px solid var(--border)
Focus: border-color #ffa24b
Label: var(--text-muted) 12px
Spacing: 16px between fields
Radius: 4px
```

### General Component

```
1. Read DESIGN.md Sections 2-6 for tokens
2. Colors: only from palette
3. Font: Archivo, type scale from Section 3
4. Spacing: 4px grid
5. Components: match patterns from Section 4
6. Elevation: shadow tokens
```

## Bundled Fonts (fonts/)

The following font files are bundled in the `fonts/` directory:

- `fonts/Archivo-Black.ttf`
- `fonts/Archivo-Bold.ttf`
- `fonts/Archivo-ExtraBold.ttf`
- `fonts/Archivo-ExtraLight.ttf`
- `fonts/Archivo-Light.ttf`
- `fonts/Archivo-Medium.ttf`
- `fonts/Archivo-Regular.ttf`
- `fonts/Archivo-SemiBold.ttf`
- `fonts/Archivo-Thin.ttf`
- `fonts/Inter-Black.ttf`
- `fonts/Inter-Bold.ttf`
- `fonts/Inter-ExtraBold.ttf`
- `fonts/Inter-ExtraLight.ttf`
- `fonts/Inter-Light.ttf`
- `fonts/Inter-Medium.ttf`
- `fonts/Inter-Regular.ttf`
- `fonts/Inter-SemiBold.ttf`
- `fonts/Inter-Thin.ttf`

Use these local font files in `@font-face` declarations instead of fetching from Google Fonts.


# glassflow-ui DESIGN.md (legacy — ClickHouse ETL UI; Rius/Tares use glassflow-paper-design)

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

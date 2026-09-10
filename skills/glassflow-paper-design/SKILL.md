---
name: glassflow-paper-design
description: Design system for GlassFlow's current products — Rius (the AI-agent observability console, repo argus-ui) and its sister product Tares. The "paper" / field-manual direction — cream paper, brown ink, Space Sand amber for action only, Inter + Geist Mono + Doto, square geometry, 1px rules instead of cards, numbered figures, typeset states, one time grammar. Activate for any UI work on Rius, Tares, argus-ui, the Rius portal or docs, or a project whose .impeccable.md names the paper direction. Read the project's .impeccable.md first; seed it from references/impeccable-template.md if missing.
---

# GlassFlow paper design (Rius · Tares)

**Three words: instrument, not costume.** A printed standards manual with live data on it: NASA / EPA
graphics standards, Swiss grid, Tufte. Calm competence during an incident. Nothing shouts, so the one
thing that does (a failure) is unmissable.

Product = **Rius** (company: GlassFlow). Sister product = **Tares**. Reference implementation =
`argus-ui` (`src/app/theme.css` tokens, `src/app/base.css` dress, `src/components/common/*` primitives,
`docs/design/2026-09-07-treatment-b-field-manual.md` decision log). When this skill and the app disagree,
the app is newer: read the app, then fix this skill.

The old dark warm-glass system (Archivo, `#ffa24b`) belongs to the ClickHouse ETL UI and lives in the
`glassflow-etl-ui-design` skill. Never mix the two.

## Read order

1. The project's `.impeccable.md` (root). It carries users, brand, direction, principles. If absent, copy
   `references/impeccable-template.md` there and adapt only the **Users** block.
2. This file.
3. `references/tokens.css` (the token layer), `references/dress.css` (the class hooks) — when bootstrapping
   a new consumer or checking a value. In `argus-ui` read `theme.css` / `base.css` directly instead.

## Principles (in priority order)

1. **Edit before you design.** The biggest wins are cuts: fewer figures, fewer columns, one grammar per
   concept. Add a component only when no existing dress fits.
2. **One convention per concept.** Time, table heads, title size, state words, link grammar: pick once,
   apply everywhere, write it down (`.impeccable.md` short form, field manual long form) in the same PR.
3. **Colour means trouble or selection.** If amber or rose is on screen, the reader can say why in one clause.
4. **Keep the instrument live.** The named risk of paper is reading as a static document. Every filter,
   sort, poll indicator and action stays where it is and stays reachable by keyboard.
5. **Numbers come with their caveat.** Capped lists, sample data, partial windows: say so beside the number,
   in the same mono voice, not in a banner.

## Tokens (the contract)

- Every colour is an **HSL triplet** consumed as `hsl(var(--token))` / `hsl(var(--token) / a)` or a mapped
  Tailwind utility (`bg-background`, `text-status-error`, `border-rule`). No literals in components: an
  ESLint gate (`token-contract`) fails hex, `rgb()`, and raw Tailwind colour utilities outside `theme.css`.
- **Two layers.** `--agency-*` = the design agency's HeroUI Kit V3 Figma variables, verbatim. Components
  never reference them. Semantic tokens alias them: `--background` (cream #f0efe2), `--foreground` (ink
  #1e0f00), `--rule` (hairline #d8d5bc) and `--rule-strong` (#b3ad92, section rule), `--brand` / `--primary`
  (Space Sand amber #ffac00, ink text on it), `--ring` (= amber), `--field` (white, borderless).
- **Status** (text-safe 700 steps on cream): `--status-error` rose, `--status-warning` coral,
  `--status-running` jade, `--status-degraded` a Rius derivation between coral and rose. `--metric-positive`
  / `--metric-negative` track jade / rose. Soft tints = status hue at 0.15 alpha with a paired
  `*-soft-foreground`.
- **Charts** encode quantity: `--chart-1..5` is an amber **monochrome** lightness ramp; default fills are ink.
  Hue as identity lives only in `--kind-*` (agent ink, llm amber, tool teal, retriever slate, embedding red)
  for span kinds, and `--failure-*` for the failure taxonomy.
- **Radius is 0.** Everything square; only true pills / avatars use `rounded-full`. Never `rounded-md`.
- **Dark** is a warm-brown ladder (`.dark` on `<html>`; `.venus-chrome` scopes the same mapping to the
  sidebar / topbar): canvas #2b1600 < surface #492400 < field-focus < default #663b11 < segment #783e06 <
  separator #895523. Rules must stay visible; chrome and content must not share one brown; product
  colours lift into the 55–68% lightness band. Light is the primary theme.

## Type

Three faces, loaded by the consumer as `--font-inter`, `--font-geist-mono`, `--font-doto` (argus-ui:
`next/font/google` in `layout.tsx`, mapped to `--font-sans` / `--font-mono` / `--font-pixel`).

| Role | Face | Size / style |
|---|---|---|
| Operational labels, table heads, captions, state words, IDs, stamps | Geist Mono | `.readout-label`: 11px, uppercase, 0.1em tracking, ink at 72%, tabular |
| Body, cells, controls | Inter | 13 / 14px |
| Section heads | Inter | 20px |
| Page title | Inter 500 | 30px, `tracking-[-0.02em]`, `leading-none` — one size, every page |
| Specimen title (trace / agent detail) | Inter | 28px |
| Readout value | Inter 500 | 24px, tabular, -0.015em |
| The hero numeral | Doto 900 | 76px (`.hero-value`); **one per page**, never in tables |

Scale in one line: 11 mono / 13 / 14 / 20 / 28–30 / 76 display. Never introduce a fourth face.
Identity note: Inter + Geist Mono is the median dev-tool stack; the identity rests on Doto and the paper.
A typography pass (RIUS-476) may change the sans; do not pre-empt it.

## Layout: paper, not panels

- Content column `.manual-column`: `clamp(1280px, 86%, 1600px)`, centred; gutters `px-5 sm:px-10`.
- **Regions are separated by 1px rules and whitespace, never by bordered cards, shadows, glass or
  gradients.** `.plate` = a rule above (`--rule-strong`) and air below, no background. `.plate-grid` = figures
  side by side, `gap: 2rem 3rem`, one rule above the row. Lists get the rule above; rows carry their own
  hairline (`--rule`).
- Density: 40px table rows, 30px tree rows, no zebra. Fields are borderless white on cream.
- Dialogs and popovers keep a surface because they float, with a hairline edge and no shadow. Prefer a page
  over a modal whenever the content has a URL-worthy identity (a firing, an agent, a rule).
- Mobile (≤640px): nothing amputated on the on-call path (alert link → firing → failing span).

## Page anatomy

Every page opens the same way, top to bottom:

1. **Running head** (eyebrow, `.readout-label`): `SECTION · WINDOW · UTC`, e.g. `OVERVIEW · JUN 26, 2026 –
   JUL 2, 2026 · 7D · UTC`. On tabbed explorers the eyebrow carries the window (`7d · UTC`) above the tabs
   that name the section. (`PageHeader` `eyebrow` prop; `ExplorerTabs` `caption`.)
2. **Title**, 30px. Or the tab bar, on explorers — never both.
3. **Lede**: one sentence computed from the data ("2,260 traces across 5 agents; 8.4% of spans errored (was
   12%); $44.57 spent."), links inline to the pages that answer it. Only rendered when the numbers exist.
4. **Figures**: every chart, grid or table is a numbered figure in reading order with a mono caption:
   `FIG. 01 — TRACE VOLUME · 7D`. `FigureTitle` + the `.fig` CSS counter (scoped by `.manual`, restarts per
   page). Three consecutive figures of the same thing is a report, not an instrument: cut.

## States are typographic

`StatusBadge` / `StaleWord` render `.state`: a mono uppercase word with a 1px underline in the state colour.
No pills, no coloured squares in registers and tables (the standalone `.sq-*` 6px glyphs exist only for the
span tree's error mark and the inspector callout).

| Word | Tone | Ink | Underline |
|---|---|---|---|
| completed | default | ink 85% | ink 35% |
| failed | `.state-failed` | rose | rose |
| recovered | `.state-recovered` | jade (soft-fg) | jade |
| degraded | `.state-degraded` | coral | coral |
| live / running | `.state-live` | ink | amber, 2px |
| stale | `.state-stale` | ink 55% | dashed |
| stopped | `.state-stopped` | ink 50% | plain |
| absent (never seen) | `.state-absent` | ink 50% | ink 20% |

State is always text, never colour alone. Keep the word and the test id when re-dressing.

## Colour budget ("dark cockpit")

- **Amber** = the one primary action (`Button` primary), the selected / hovered row's 2px inset left edge
  (`.register-row`), the active nav item's 2px edge, and "live" (the running trace's latency bar, the live
  underline). Nothing else.
- **Rose** = failure: the failed word, the error callout's two 1px rules, a rule's name while it has open
  firings, the error-rate figure.
- Charts default to ink; series separate by lightness. Bars are print logic: a 2px rule on a hairline track
  (`.hairline-track` / `.hairline-fill`), never a filled block.
- Anti-references: Datadog / Grafana dark cockpits with glowing accents; icon-topped card grids; side-stripe
  callouts; gradient text; sparklines as decoration; glass, blur, glow; modals where a page would do.

## Time: two grammars, no more

- **An instant** is a UTC stamp in mono, in the cell: `2026-07-03 11:57Z`. Seconds on a trace header,
  milliseconds in the span inspector. The relative phrase ("2mo ago", "in 27d") lives in its tooltip only.
- **A calendar day** is `Jun 26, 2026` — running heads, the range picker, billing.
- Never a locale-dependent string (`toLocaleString`, `Intl` with the user locale), never a relative phrase
  in a cell, never three forms of one instant.
- API: `lib/time.ts` — `formatStampUTC(iso, 'minute' | 'second' | 'ms')`, `formatRelative`, `formatUntil`,
  `formatDistance`; component `common/Timestamp` (`<time dateTime>` mono, tooltip = the phrase; `useNow`
  ticks every 30s). The Time column is 136px (8.5rem) for 17ch of 12px mono; lists name it "Time".

## Tables, registers, ledgers

- Heads: `.readout-label` everywhere — `ui/table`'s `TableHead`, `VirtualizedTable` head cells,
  `RegisterHead`. A sortable head is a `<button>` with the chevron, `uppercase` set explicitly (the preflight
  resets `text-transform` on buttons), `role="columnheader"` + `aria-sort`. Nothing else looks sortable, and
  never offer a sort the API cannot do.
- Outcome-first column order on traces: time, outcome word, name, id (fixed 12ch mono), spans, errors,
  tokens, cost, latency bar scaled to the visible max. Counts right-aligned. IDs copyable (`CopyButton`).
- Registers (rules) and ledgers (firings) are tables with mono key first: `ID · ALERT · CONDITION ·
  FIRINGS · STATE`; ledger rows open with the stamp.
- Health / summary strips are one mono line: `2,260 traces · error rate 1.2% · p50 4.18s · p95 7.82s`.
- Meta on a detail page is spec-sheet cells (mono key above value) under a rule. Errors are typeset
  callouts between two 1px rose rules, traceback mono on the paper.

## Motion

Glance surfaces (Home, readouts) may animate; work surfaces (lists, detail) snap. Motion carries
information, never choreography: the count-up (`TickValue`), the new-row blip (amber, decays in
`steps(8)`), meter fills in discrete blocks (`--motion-blocks: steps(8, jump-end)`), sheet slides. Every
animation has a `prefers-reduced-motion` off-switch. No springs, no staggered card entrances.

## Primitives to reuse before adding anything (argus-ui `src/components`)

`common/`: `Timestamp`, `RegisterHead`, `FigureTitle`, `StatusBadge` + `StaleWord`, `RecoveredBadge`,
`TickValue`, `DataTable`, `VirtualizedTable`, `EmptyState`, `CopyButton`, `JsonViewer`, `Markdown`
(Rendered / Source), `RefreshErrorNotice`, `DateRangeControl` + `CustomRangePicker`, `charts/*` (ink,
ruler ticks, hairline grid). `ui/`: shadcn-on-Radix `button`, `dialog`, `sheet`, `select`, `popover`,
`tabs`, `tooltip`, `table`, `input`, `textarea`, `command`, `skeleton` — all re-dressed square and
hairline. Layout: `PageHeader` (eyebrow / title / description), `ExplorerTabs`, `.manual-column`.

## Guardrails

Mechanical (CI in argus-ui; port to every consumer): `token-contract` ESLint (no colour literals),
`boundaries` (dependency-cruiser), `bundle-budget`, e2e in mock mode. Review-time, until they are lint
rules: no `toLocaleString` / relative time outside `lib/time.ts`; every table head through the head
primitive; no new `rounded-*`; no new dialog for URL-worthy content; a caveat beside every capped or
sampled number; focus visible on every control; state as text.

Process: a convention change lands with its codification. `.impeccable.md` is the short form (update
when the direction moves), the field manual is the long form (per-surface decisions and gate results),
`docs/audits/<date>-design-critique.md` is the scorecard. Loop: `/critique` → priority list → one
convention per PR → gates → write it down.

## Tares

Tares shares the token layer (same Figma kit, same cream / ink / amber, squared) and the principles.
Known divergences to respect, not erase: Tares uses a pixel font for display numerals where Rius uses
Doto; Tares's mono scope is broader (16 label / badge / header roles) where Rius keeps mono to
`.readout-label` and state words, buttons stay sans. When a decision is made for one product, note it
in that product's `.impeccable.md` and flag it to the other. The Rius ↔ Tares seam (alert firing + RCA
report → Tares investigates) is where the two must read as one instrument.

## Vestigial names in argus-ui (do not copy into a new consumer)

Kept for churn reasons, re-based to the paper look, used in ~50 files; a rename rides a later pass:
`.glass-panel` / `.glass-tile` / `.ambient-glow` and `bg-glass`, `border-glass-border`,
`glass-highlight`; `--elevation-*` and `shadow-surface` / `shadow-overlay` (only `shadow-field` on
Input / Select / Textarea is live); `--card`, `--input`; the seed `.title-*` / `.body-*` / `.caption-*`
scale; `.card-enter`; the segmented `.venus-meter` gradient (now a 2px rule); `--wordmark-*` (a logo
asset, not a palette). `.venus-chrome` and `.venus-label` are live names.

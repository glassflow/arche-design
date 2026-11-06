# <Product> — design context (`.impeccable.md` seed)

Copy this file to the project root as `.impeccable.md`. The `impeccable` family of design skills
(`/polish`, `/distill`, `/critique`, …) and the `glassflow-paper-design` skill read it before any
design work. Replace the **Users** block for the product at hand (the Rius one is below as the
worked example); keep **Brand Personality**, **Aesthetic Direction** and **Design Principles** —
they are the shared GlassFlow paper direction and should only change when the direction moves.
Update this file when the direction moves, not per PR.

## Design Context

### Users

AI engineers who run agents in production and are paged when those agents fail. The v0 story every
decision serves: "my agent failed, I have no idea where or why; I open the console, find the trace, see
which span failed and why, and fix it, in under two seconds per interaction." Four recurring situations:

- **On call, at a desk** (the power user). Lives in the Traces list and the trace detail; wants keyboard
  reach, copyable IDs, sortable columns, and no undo surprises on Ack / Resolve.
- **Mid-incident, on a phone**, arriving from a Slack alert link. Needs the firing, then the failing span,
  with nothing amputated below 640px.
- **Keyboard / screen-reader user.** State must be text, not colour; focus must be visible on every control.
- **Agency operator** watching five client agents. Reads the Agents register to answer "which of mine is
  unhealthy" and reports numbers upward, so every number needs a plain caveat.

Jobs to be done, in order: find the failing trace → understand the failing span → know what needs me now
(Home) → set up alerting that fires on the failure pattern → connect Claude Code over MCP.

### Brand Personality

Product is **Rius** (company: GlassFlow). Three words: **instrument, not costume.** Warm, mechanical,
opinionated. The console should feel like a printed standards manual with live data on it: NASA / EPA
graphics standards, Swiss grid, Tufte. Confidence comes from restraint; nothing shouts, so the one thing
that does (a failure) is unmissable. Emotional goal: calm competence during an incident.

### Aesthetic Direction

- **Paper, not panels.** Cream ground with brown ink; content sits directly on the paper. Regions are
  separated by 1px rules and whitespace, never by bordered cards, shadows, glass, or gradients.
- **Type carries hierarchy.** Inter for UI text, Geist Mono for operational labels and table heads, Doto
  (dot-matrix) for display numerals. Scale: 11 mono / 13 / 14 / 20 / 28–30 / 76 display. Page titles are
  30px Inter 500, tight tracking. Square geometry, no rounded pills.
- **Figures, not widgets.** Every chart or grid is a numbered figure in reading order with a mono caption
  ("FIG. 01 — TRACE VOLUME · 7D"); each page opens with a running head (section · window) and one sentence
  computed from the data.
- **States are typographic.** A mono word with a 1px coloured underline: completed plain, recovered jade,
  failed rose, degraded coral; live amber, stale dashed grey. Tokens live in `src/app/theme.css`
  (`--kind-*`, `--rule`, `--rule-strong`, the `--agency-*` ramp).
- **Colour budget ("dark cockpit").** Amber (Space Sand) is the one primary action and the selected row's
  2px edge. Rose means failure. Colour appears only when something is wrong or selected; charts default to
  ink.
- **Time.** Two grammars, no more. An instant is a UTC stamp, `2026-07-03 11:57Z` (seconds on a trace
  header, milliseconds in the span inspector), set in mono; "2mo ago" / "in 27d" lives in its tooltip. A
  calendar day (running heads, the range picker, billing) is `Jun 26, 2026`. In a narrow ledger column
  the stamp may stack, date over clock (`Timestamp stacked`), still one string. Never a locale-dependent
  string, never a relative phrase in a cell. `lib/time.ts` (`formatStampUTC`, `formatDayUTC`, the tooltip
  phrases) + `common/Timestamp`; gated by `design-contract` (time · heads · radius). (Chosen 2026-09-10.)
- **Table heads.** One style everywhere: `.readout-label` (11px mono, uppercase, 0.1em tracking). A
  sortable head is a button with the chevron; nothing else looks sortable. Lists call the time column "Time".
- **Ledger columns.** One identity column per row: the name on the first line, the one secondary fact the
  name does not already carry on a second 11px mono line (Firings' identity cell is the reference). Never a
  column that repeats a fact the name states — the Spans Model column went this way. IDs stay 12ch mono
  with copy. (Chosen 2026-09-10.) An id is never the only thing a control says: a button, link or chip
  names what it opens and keeps the id in its `title` or copy affordance. (Chosen 2026-11-06.)
- **Theme.** Light is the primary theme (paper). Dark exists and must keep the frame: chrome and content
  must not share one brown, rules must stay visible.
- **Motion.** Glance surfaces (Home, readouts) may animate; work surfaces (lists, detail) snap.
- **Anti-references.** Datadog / Grafana dark cockpits with glowing accents; icon-topped card grids;
  side-stripe callouts; gradient text; sparklines as decoration; modals where a page would do.

### Design Principles

1. **Edit before you design.** The biggest wins are cuts: fewer figures, fewer columns, one grammar per
   concept. Add a component only when no existing dress fits.
2. **One convention per concept.** Time, table heads, title size, state words, link grammars: pick once,
   apply everywhere, write it down in the field manual.
3. **Colour means trouble or selection.** If amber or rose is on screen, the reader should be able to say
   why in one clause.
4. **Keep the instrument live.** The named risk of this direction is reading as a static document. Every
   filter, sort, poll indicator and action stays where it is and stays reachable by keyboard.
5. **Numbers come with their caveat.** Capped lists, sample data, partial windows: say so beside the number,
   in the same mono voice, not in a banner.

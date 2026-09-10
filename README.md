# arche-design

GlassFlow's design systems as Claude Code skills. One skill per visual language; each is self-contained
(`SKILL.md` + `references/`) and installs by symlink, so the checkout is the single versioned source.

| Skill | Products | Direction |
|---|---|---|
| [`skills/glassflow-paper-design`](./skills/glassflow-paper-design/SKILL.md) | **Rius** (`argus-ui`), **Tares**, new GlassFlow surfaces | Paper, not panels: cream paper, brown ink, Space Sand amber for action only, Inter + Geist Mono + Doto, square geometry, 1px rules, numbered figures, typeset states, one time grammar. |
| [`skills/glassflow-etl-ui-design`](./skills/glassflow-etl-ui-design/SKILL.md) | ClickHouse ETL UI (`glassflow-ui`) — legacy | Dark warm glass, Archivo + Inter, `#ffa24b` accent, 4px grid, spring motion. Kept because it is good and reusable for that product family; not for Rius or Tares. |

The sibling repo [`arche-ui`](https://github.com/glassflow/arche-ui) holds the product-agnostic
frontend architecture (tokens contract, guardrails, proxy routes, …) — its doc 18 *Design governance*
is the method these skills plug into (`.impeccable.md`, field manual, critique, the `design-contract` gate). This repo holds what a product
*looks* like; a fork of arche-ui picks one skill from here.

## Install

```bash
git clone git@github.com:glassflow/arche-design.git ~/Documents/code/glassflow/arche-design
./arche-design/scripts/install.sh            # symlinks every skill into ~/.claude/skills
```

Per project instead of globally: symlink into the project's `.claude/skills/` the same way.
Skills are discovered by the `name:` in their frontmatter; keep it equal to the directory name.

## How the paper skill is kept true

`argus-ui` is the source of truth for the paper direction: `src/app/theme.css` (tokens),
`src/app/base.css` (dress), `.impeccable.md` (canonical short form), and
`docs/design/2026-09-07-treatment-b-field-manual.md` (decision log). The skill's
`references/tokens.css` and `references/dress.css` are dated copies for bootstrapping a new consumer —
re-copy them when the app moves, never hand-edit. A convention change in the app lands with its
codification (`.impeccable.md` + field manual) in the same PR; this repo follows.

## Layout

```
skills/
  glassflow-paper-design/      SKILL.md, references/{tokens.css, dress.css, impeccable-template.md}
  glassflow-etl-ui-design/     SKILL.md, DESIGN.md, CLAUDE.md, references/DESIGN.md, fonts/ (Archivo, Inter — OFL)
scripts/install.sh             symlink installer
```

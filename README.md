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

**arche-design is the source** of the paper tokens. Apps (the Tares console, the desktop app, and
`argus-ui` later) vendor a tagged copy with `npm run paper:sync` and never edit it by hand. A vendored
file carries a first-line comment naming the tag and commit it came from.

### Tags

| Tag | Covers |
|---|---|
| `paper-tokens-vN` | three files under `skills/glassflow-paper-design/references/`: `tokens.css` (the tokens), `paper-theme.css` (the role layer) and `paper-motion.css` (the motion classes). `dress.css` is not covered by a tag |
| `paper-kit-vN` | `packages/paper-kit/` |

`N` counts up from 1 for each scheme. A tag is never moved or deleted: a mistake is fixed by the next `N`.

### Changing a token

1. Change it here, in a PR. State in the PR how you checked it in a consumer (there is no CI in this
   repo): copy the changed files into the consumer's vendored place, or run its `paper:sync` against your
   branch, and run the consumer's own gate.
2. After the merge, tag the merge commit (`git fetch origin && git tag paper-tokens-vN <merge sha> &&
   git push origin paper-tokens-vN`, one tag by name) and check it with
   `git ls-remote --tags origin paper-tokens-vN`.
3. Each app runs `npm run paper:sync -- --tokens paper-tokens-vN` in its own PR. That PR is where the
   change is reviewed in the app.

Until `argus-ui` follows as a consumer, its `src/app/theme.css` and `src/app/base.css` stay the
reference for the dress (`references/dress.css`), which is a dated copy for bootstrapping a new consumer:
re-copy it when the app moves, never hand-edit. A convention change lands with its codification
(`.impeccable.md` + field manual) in the same PR.

## Layout

```
skills/
  glassflow-paper-design/      SKILL.md, references/{tokens.css, dress.css, impeccable-template.md}
  glassflow-etl-ui-design/     SKILL.md, DESIGN.md, CLAUDE.md, references/DESIGN.md, fonts/ (Archivo, Inter — OFL)
scripts/install.sh             symlink installer
```

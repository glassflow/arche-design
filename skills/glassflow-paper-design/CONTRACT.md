# The paper look-and-feel contract

What every GlassFlow surface built on paper must follow, which check enforces each rule, and how an
app takes the shared tokens and kit. [`SKILL.md`](./SKILL.md) says what paper looks like and why; this
page says what an app must hold to, and how it knows it does.

The contract is written once, here. An app's own `AGENTS.md` points at this page and holds only what is
specific to the app: its folders, its registers and baselines, the exact commands of its gate.

Two surfaces follow it today: the Tares console and the Tares desktop app. Rius's console joins later
(TR-1561). Where a surface is not under a rule yet, the page says so and names the ticket that brings it
there, as it does for embedded mode and the drift workflow.

## Tokens

The source is this repository, `skills/glassflow-paper-design/references/`:

| File | Holds |
|---|---|
| `tokens.css` | the `--agency-*` colour triplets. A reference the other files are checked against; an app never imports it |
| `paper-theme.css` | the role layer an app imports: `--kit-*` values, the palette, the semantic roles, the dark block and the `@theme inline` map that turns roles into utilities (`bg-background`, `text-ok`, `border-border`) |
| `paper-motion.css` | the motion tokens (`--dur-*`, `--ease-*`) and the `motion-*` classes |

An app never edits these and never copies them by hand. It vendors a tagged copy:

```
npm run paper:sync -- --tokens paper-tokens-vN --paper-kit paper-kit-vN
```

Either flag may be left out; the part it names is then left as it is. The script refuses a dirty tree
or an unknown tag, copies each code file with a first line naming the tag and the commit it came from, and
writes `VENDORED.json` with the hash of every file. Only the sync touches the network; a build or a
check never does.

An app imports `paper-theme.css` and `paper-motion.css`, never `tokens.css` beside them: they define
28 of the same names in incompatible forms and the later import wins silently.

## Kit

`packages/paper-kit/` is the code half, vendored the same way (`paper-kit-vN`):

- `src/`: Button, Dialog, Tabs, StatusLabel and StatusDot, the field controls (Input, Textarea, Select,
  Checkbox, Switch) and their helpers, the shared status words, and `cn`.
- `eslint/`: the factories that run the rules below, `designContract(options)` and
  `tokenContract(options)`, and the two rules they carry, `kit-only` and `one-time`.

The app takes the kit with the steps in [`packages/paper-kit/README.md`](../../packages/paper-kit/README.md),
"Consumer setup". In short:

- **The peers.** The app installs the kit's peer dependencies itself, at the exact versions the README
  lists. This repository has no `package.json` and installs nothing.
- **The alias.** `@paper-kit` points at the vendored `src`, in `tsconfig` `paths` and in the bundler.
  Screens import from `@paper-kit`, never from a file inside it.
- **`@source`.** The app's main stylesheet has `@source "<path to the vendored src>";`, so Tailwind
  generates the classes the components carry.
- **Strict types.** The kit type-checks under `strict`, `noUncheckedIndexedAccess`, target ES2023,
  `jsx` `react-jsx` and `moduleResolution` `bundler`. An app compiles the vendored folder under the same
  or looser settings of its own; it does not have to be as strict as the kit's check.
- **The app's part.** Its own bare element rules (`button`, `input`) go in a cascade layer, and it
  supplies one global `:focus-visible` rule, because the kit's controls carry no focus ring of their own.

Checks that the vendored copy is the tagged copy: the console's `npm run test:paper`, and the desktop's
`npm run check`, whose unit tests run `paper-vendored`. A hand edit, a missing file or an unlisted file
fails. Checks that the app's `--kit-*` values still equal the shared tokens: the console's
`npm run test:tokens`, and the desktop's `paper-parity`, also run by `npm run check`.

## Rules

Nine rules. Each says what is true, then the check that fails when it is not. The rule checks are the
factories in `packages/paper-kit/eslint/`, so they read the same in every app; what an app decides is
where they run, its registers and its baselines. Each check runs on the app's `.ts` and `.tsx` files.

| # | Rule | The check |
|---|---|---|
| 1 | **Colour comes from the semantic utilities.** `bg-background`, `bg-card`, `text-foreground`, `text-muted-foreground`, `border-border`, `bg-primary`, `text-ok`, `text-warn`, `text-err` and the other roles `paper-theme.css` maps. No hex, no `rgb()`, no stock Tailwind palette colour (`text-red-500`), and no arbitrary value (`text-[color:var(--err)]`, `text-(--err)`) for a token that has a utility. | `tokenContract`. It reads the utility names from `@theme inline` in the app's `paper-theme.css`, and throws if it reads fewer than 20 so an emptied theme file cannot switch it off. Console: `npm run token-contract`. Desktop: `npm run contract`. |
| 2 | **Corners are square.** No `rounded-*` other than `rounded-full`, which is for dots and switches. | The radius selector of `designContract`. Console: `npm run design-contract`. Desktop: `npm run contract`. |
| 3 | **No shadow on anything in the page.** A panel is a 1px border, not a card. Only a floating layer (sheet, menu, popover) casts one, and it is `var(--sheet-shadow)`. | The shadow selector of `designContract`: stock `shadow-xs` to `shadow-2xl`, any other `shadow-[..]` and `boxShadow` in a style object fail. Same commands as rule 2. |
| 4 | **The selected item is an inset bar in the accent**, `shadow-[inset_3px_0_0_var(--accent)]`, never a left or inline-start border wider than 1px. | The stripe selector of `designContract`. It reads classes and style objects in TSX; a stripe written in a CSS file is not seen and is caught in review. Same commands as rule 2. |
| 5 | **Controls come from the kit.** In the app's own screens, no raw `<button>`, `<input>`, `<select>` or `<textarea>`, and no inline `style`. | The `kit-only` rule. A screen may break it only while it is in the app's register with a reason and its count is in the baseline. The check also reports a register entry whose file is clean and a baseline above the true count, so both only go down. Console: `npm run lint` and `npm run design-contract`. Desktop: `npm run contract`. |
| 6 | **Time has one grammar.** An instant is a UTC stamp, a day is `Nov 12, 2026`, a length is in words, and a number with a group separator comes from the number module. No locale-dependent string. | The `one-time` rule: no `toLocale*String` call and no `Intl.DateTimeFormat`, `RelativeTimeFormat` or `NumberFormat` outside the app's time and number modules, with a baseline count for a legacy file. Console: `npm run design-contract`. Desktop: `npm run contract`. |
| 7 | **Motion comes from the tokens.** `duration-(--dur-2)`, `ease-out` or a `motion-*` class. No `duration-150`, `duration-[..]`, `delay-150`, `delay-[..]`, `ease-[..]` or `animate-[..]`, and no raw time in a style object's `transition` or `animation`. | The motion selector of `designContract`. The console also checks its CSS files with `npm run motion-contract` (a raw time or curve in `transition` or `animation`, and its script-driven timings against the tokens). The desktop's CSS has no such check yet. Same commands as rule 2. |
| 8 | **No em dash** in any text a person reads. | The voice selector of `designContract`: an em dash in a string or in JSX text fails, except a lone one standing for no value, with no space on both sides of it. Same commands as rule 2. The console's `npm run test:words` reads every string in its screens for it too. Text outside TSX (CSS, Markdown) is caught in review. |
| 9 | **A state is said with the shared words.** `STATUS[key]` gives the `word` and the `tone`, and a screen renders it with `StatusLabel`. The app maps the states of its API onto the keys with `satisfies Record<ApiUnion, StatusKey>`. A state whose word or tone differs from the table keeps its own, beside that map, with the reason. | The compiler: a state added to the API later fails `tsc` until it is mapped or left out on purpose. No lint rule reads a status word out of a screen, so a hand-typed word is caught in review. Desktop: every crew and station state goes through `StatusWord`. Console: the tones read `STATUS` where the table agrees, and two entries keep their own tone (`source.starting`, `resource.waiting`). |

What no check sees (type voices, where amber may appear, figures, empty and loading states, tables) is
in [`SKILL.md`](./SKILL.md) and is a matter for review.

## Exceptions

An exception goes in the app's register with its reason, and the reason names the ticket that removes it
(or says why it stays). It never goes in an `eslint-disable` comment: inline config is off in the
contracts, so such a comment exempts nothing and the gate still fails.

A register is not a way round a rule. A new entry needs a reason a reviewer accepts. A baseline only
goes down: a count is lowered when a file improves, and raising one needs the reason in the PR.

## Embedded mode

Planned in TR-1553 (the console) and TR-1554 (the desktop app). Neither is on `main` yet, and TR-1553
is cancelled if the look at the desktop's rail (TR-1552) finds no doubled chrome. The contract it
will set:

- The desktop opens the console in a frame at `?embed=desktop`, and may add `&theme=light` or
  `&theme=dark`.
- With `embed=desktop` the console does not draw its own header, main menu or drawer, because the
  desktop's rail already gives the person that. The page content, the toasts and every route stay as
  they are, so the rail can link to any of them. Any other value of `embed` is ignored.
- The mode lasts for the tab session: the console keeps it in `sessionStorage` (key `tares.embed`), so
  a navigation that drops the query keeps it.
- A `theme` passed this way wins over the saved one and is not saved as the person's choice.
- Without the parameter the console is unchanged.

The check is the console's own end-to-end suite for it (`ui/tests/embedded.e2e.cjs`, from TR-1553). A
contract change to this mode is a change to this page in the same PR.

## Releasing a change

1. Change the file here, in a PR. This repository has no CI, so the PR says how it was checked in an
   app: the changed files copied into the app's vendored place (or the app's `paper:sync` run against
   the branch), and the app's own gate run.
2. After the merge, tag the merge commit: `paper-tokens-vN` for a change under `references/`,
   `paper-kit-vN` for a change under `packages/paper-kit/`. Push one tag by name, never `--tags`, and
   check it with `git ls-remote --tags origin <tag>`. A tag is never moved or deleted: a mistake is
   fixed by the next `N`.
3. Each app runs `npm run paper:sync -- --tokens paper-tokens-vN` or `--paper-kit paper-kit-vN` in its
   own PR. That PR is where the change is reviewed in the app, and where its pixels are checked: the
   console's `npm run test:visual`, and the desktop's visual snapshots (from TR-1560).
4. An app that has fallen behind the latest tags is reported by a workflow the app runs by hand: the
   desktop's `paper-drift` (from TR-1559). The console has none yet.

A convention change lands with its codification in the same PR: this page, `SKILL.md` and the app's
`.impeccable.md`, and the check that enforces it when there is one.

---
name: The Prompt Folio
description: A dark editorial folio that writes one still or motion prompt at a time.
colors:
  paper: "#0a0a0a"
  paper-2: "#151515"
  ink: "#f2ede4"
  ink-2: "#c9c3b9"
  ink-3: "#a39e94"
  bone: "#f2ede4"
  terra: "#e0532a"
  block: "#121212"
  rule: "#2c2c2c"
  clay: "#e0532a"
  indigo: "#6f86d6"
  moss: "#7fa877"
  danger: "#a32a22"
  danger-ink: "#fff6f2"
  light-paper: "#ece7dd"
  light-ink: "#0d0d0d"
typography:
  prompt:
    fontFamily: "Lora, Georgia, Palatino Linotype, Palatino, serif"
    fontStyle: italic
    fontWeight: 400
    fontSize: "clamp(1.6rem, 0.9rem + 1.8vw, 3.1rem)"
    lineHeight: 1.3
  display:
    fontFamily: "Anton, Impact, Arial Narrow, sans-serif"
    fontWeight: 400
    letterSpacing: "-0.01em"
  ui:
    fontFamily: "Raleway, Segoe UI, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.4
  label:
    fontFamily: "Raleway, Segoe UI, system-ui, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 700
    letterSpacing: "0.28em"
rounded:
  none: "0"
spacing:
  page: "clamp(18px, 4vw, 64px)"
  gap: "clamp(14px, 2vw, 28px)"
components:
  button-primary:
    backgroundColor: "{colors.terra}"
    textColor: "#0a0a0a"
    shadow: "7px 7px 0 var(--paper), 7px 7px 0 1px var(--ink)"
  issue-stripe:
    backgroundColor: "{colors.dye}"
    width: "10px"
  detail:
    width: "50%"
    narrowHeight: "50%"
---

## Overview

The Prompt Folio is an Operate surface in the Noir Broadsheet: black and bone, one terracotta accent, a 12-column editorial grid. The prompt is a Lora italic pull-quote. The issue numeral, the quotation mark, Contents, and the library numbers are Anton. Everything you touch is Raleway.

Clay, Indigo, and Moss are not tile fills. They colour the issue block’s left stripe and the dye tab on the rule above Generate. The page opens dark. Light is a secondary theme. The noren photograph is off unless the gear slider is raised.

Tokens are custom properties in `css/styles.css`. `data-theme` is `dark` or `light`. `data-grade` is `clay`, `indigo`, or `moss`.

## Colors

Bone `#f2ede4` on `#0a0a0a` is the reading pair. Terracotta `#e0532a` is Generate, the active dye marker, starred items, open library numbers, and focus. Black `#0a0a0a` on `#e0532a` is the Generate label.

Dyes: Clay `#e0532a`, Indigo `#6f86d6`, Moss `#7fa877`. They set `--dye` only.

Light mode uses paper `#ece7dd` and ink `#0d0d0d`. The issue block and the detail panel stay black with bone type. The keyword field stays black in both themes. Error toasts are `#a32a22` with `#fff6f2`.

Small labels use `--ink-3` (`#a39e94` in the dark theme, `#3f3b35` in light), kept at or above 4.5:1 on the surface behind them.

## Typography

Anton for display: the folio word, the issue numeral, the quotation mark, Contents, and the contents numbers. Impact and Arial Narrow sit behind it.

Lora italic 400 for the hero prompt, about 1.6–3.1rem at a 1.3 line, and for the keyword field. Georgia sits behind it.

Raleway 400–800 for controls, menus, toasts, and labels. Labels may be 11px uppercase with wide tracking. Body is 16px.

## Layout

Twelve columns, max width 1320px. The issue block is columns 1–4. The pull-quote and deck are columns 5–12. Keywords are columns 1–8. The three dye bars are columns 9–12.

The issue numeral increments once per successful Generate and is kept in `moap.issue`. Library row numbers are list indexes, padded to two digits, and are separate from the issue numeral.

At 760px and under, including 540px, the page is one column: bar, issue row, quote, prompt, icon actions, Generate, keywords, dyes, Contents. The detail panel is the right half from 860px wide and a bottom sheet at half the height below that.

## Elevation and depth

Dark pages use a radial ground and an inset edge vignette. Rules are 10px charcoal `#2c2c2c` on black. Generate, menus, and toasts use a hard offset shadow. The deck rule carries a 72px dye tab.

Motion is 240–800ms on `cubic-bezier(0.22, 1, 0.36, 1)`. A new prompt wipes in. A copied plate stamps a terracotta ring. `prefers-reduced-motion` removes transitions and animations, including smooth scrolling.

## Shapes

Corners are square. Icon hits are 44px (40px on a contents row). Icons are 1.5px strokes at 20px, except the filled star and the leaf’s filled blades.

## Components

**Issue block.** Huge Anton numeral, “Issue” in the active dye, and Background or Animation along the bottom rule.

**Prompt.** Lora italic pull-quote under an Anton quotation mark. Copy, star, animate, and delete sit on the deck, left of Generate.

**Generate.** Terracotta block, black type, hard shadow. Press shifts it into the shadow.

**Dyes.** Three bars. The active bar grows and shows a small square. `V` cycles Clay, Indigo, Moss.

**Contents.** Favourites and History are numbered rows, one line until opened. Click waits so a double-click can copy without expanding and without leaving a word selection. Enter or Space toggles the focused row. `E` expands or collapses the visible shelf. Copy, star, animate, and delete appear on hover, focus, or when the row is open. A starred row keeps its actions visible. Open state is not stored.

**Gear.** Keyword mode, describe-instead, include-negative, the Noren slider (off at 0), and a closed Seed row. No text-size or panel-size sliders.

**Empty.** A single faint icon, no sentence, except the hero’s “Press Generate.”

## Do's and Don'ts

Do keep one card per Generate, the three dye ids, and the shortcut list.

Do not paint dyes across tiles, do not put the noren behind the page by default, and do not add a fourth dye, a masthead, batch counts, seed numbers on plates, or size sliders.

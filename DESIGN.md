---
name: The Prompt Folio
description: A calm notebook that writes one still or motion prompt at a time.
colors:
  paper: "#f3ecdf"
  paper-deep: "#e6d9c6"
  paper-raised: "#fbf7ef"
  ink: "#2a2622"
  ink-soft: "#5e564c"
  cream: "#f3eadb"
  on-accent: "#fffaf6"
  terracotta: "#c15f45"
  pressed: "#8f4332"
  focus: "#f0a090"
  clay-deep: "#2a1610"
  clay-light: "#8a3a22"
  clay-panel-a: "#3e261e"
  clay-panel-b: "#6a3c2a"
  indigo-deep: "#101a33"
  indigo-light: "#2c4f8f"
  indigo-panel-a: "#1c2c4e"
  indigo-panel-b: "#2a4578"
  moss-deep: "#0f1f16"
  moss-light: "#2f6a45"
  moss-panel-a: "#1a2e22"
  moss-panel-b: "#2a5c40"
  danger: "#8f2d2d"
  danger-ink: "#fff8f4"
typography:
  prompt:
    fontFamily: "Lora, Georgia, Palatino Linotype, Palatino, serif"
    fontSize: "clamp(1.4rem, 0.55vw + 1.15rem, 1.8rem)"
    fontWeight: 500
    lineHeight: 1.6
    letterSpacing: "normal"
  heading:
    fontFamily: "Lora, Georgia, Palatino Linotype, Palatino, serif"
    fontSize: "clamp(1.55rem, 2.4vw, 2rem)"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Raleway, Segoe UI, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  label:
    fontFamily: "Raleway, Segoe UI, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.12em"
  ui:
    fontFamily: "Raleway, Segoe UI, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.01em"
rounded:
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "20px"
  2xl: "24px"
  pill: "999px"
spacing:
  1: "4px"
  2: "8px"
  3: "12px"
  4: "16px"
  5: "20px"
  6: "24px"
  8: "32px"
  10: "40px"
components:
  button-primary:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "14px 18px"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.pressed}"
    textColor: "{colors.on-accent}"
  button-icon:
    backgroundColor: "{colors.paper-raised}"
    textColor: "{colors.cream}"
    rounded: "{rounded.lg}"
    size: "44px"
  tile:
    backgroundColor: "{colors.clay-panel-a}"
    textColor: "{colors.cream}"
    rounded: "{rounded.2xl}"
    padding: "24px"
  prompt:
    typography: "{typography.prompt}"
    textColor: "{colors.cream}"
---

## Overview

The Prompt Folio is an Operate surface: keywords, one Generate, one plate. Wellness Calm sets the voice — Lora for the words being written, Raleway for everything you touch. Clay, Indigo, and Moss dye the glass tiles. A noren photograph sits behind them, held back by a vignette so the prompt stays the centrepiece.

Tokens live as custom properties in `css/styles.css`. Colour roles change with `data-theme` and `data-grade`. Do not invent a fourth dye or a second primary button.

## Colors

Cream `#f3eadb` is the text on every dye tile. It stays at or above 4.5:1 on the lightest stop of each dye (Clay `#8a3a22`, Indigo `#2c4f8f`, Moss `#2f6a45`).

Each dye has two roles:

- **Hero** uses the deeper pair (`--g-a` to `--g-b`): Clay `#2a1610` → `#8a3a22`, Indigo `#101a33` → `#2c4f8f`, Moss `#0f1f16` → `#2f6a45`.
- **Panels** (keywords, library, tools, dialogs) use the lighter pair (`--p-a` to `--p-b`) in the same hue.

Sol & Shadow mixes those stops toward black. It does not swap the hue. Parchment (`--paper`, `--ink`) is for the page and for the gear popover, which sits outside the tiles. Pressed actions use `#8f4332` with `#fffaf6` type. Focus is the ring `#f0a090`.

## Typography

Lora 400–700, with Georgia behind it. Raleway 300–700, with Segoe UI / system-ui behind it. Both load with `font-display: swap`.

The hero prompt is Lora 500 at about 1.4–1.8rem and a 1.6 line. Headings and library tabs are Lora. Controls, menus, toasts, and fields are Raleway. Body is 16px. Labels may be 12px uppercase; they are not body copy.

## Layout

A 4px rhythm: 4, 8, 12, 16, 20, 24, 32, 40. The bento gap is 20px. Tiles pad at 20–24px.

Wide pages (from 1100px) are four columns: hero across the top, then keywords, the section switch, and tools, then the library, then Advanced. From 601px the same bands collapse to two columns. At 600px and under the order is hero, keywords, library, switch, tools, Advanced. The detail panel is the right half from 860px and a bottom sheet at half height below that.

## Elevation & Depth

Three levels, all offset and soft:

- **1** — a short lift for the primary button at rest.
- **2** — tiles and menus: 10px offset, 28px blur, plus a 1px inner highlight.
- **3** — toasts.

Tiles are translucent dye gradients with a 16px blur and a faint grain overlay. A radial vignette and a parchment veil keep the noren from competing with type. Shadows do not use a hard offset.

Motion is 160ms, 240ms, or 280ms, on `cubic-bezier(0.22, 1, 0.36, 1)`. A new prompt fades and unblurs in 280ms. `prefers-reduced-motion` removes transitions and animations.

## Shapes

Corners are 8, 12, 16, 20, or 24px. Generate, toasts, and tabs are pills. Icon buttons are 16px rounded squares at a 44px hit (40px on a collapsed library row). Dye dots stay circles, with padding so the hit is larger than the dot. Icons are 1.5px strokes at 20px, except the filled star and the leaf’s filled blades.

## Components

**Hero.** The prompt is the only large type. Generate is the only primary action. Press scales it to 0.97. A new prompt crossfades in.

**Library.** Plates start at two lines with a still or motion mark, the star, and a chevron. Copy, animate, and delete appear on hover, focus, or expand. Open state is not stored.

**Gear.** Keyword mode, describe-instead, include-negative, backdrop, and the closed Seed row. No text-size or panel-size sliders.

**Empty.** A single faint icon, no sentence, except the hero’s “Press Generate.”

## Do's and Don'ts

Do keep one card per Generate, the three dyes, the noren, and the shortcut list.

Do not add a fourth dye, a masthead, batch counts, seed numbers on plates, or size sliders.

Do not let the photograph show through type. If a new surface needs text, put it on a dye tile or the parchment popover.

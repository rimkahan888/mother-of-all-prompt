---
name: The Prompt Folio
description: A cream glass bento that writes one still or motion prompt at a time.
colors:
  page: "#f3ecdf"
  page-2: "#1c1916"
  popover: "#221f1b"
  ink: "#f2ece1"
  ink-2: "#b8b0a2"
  ink-3: "#857e72"
  terracotta: "#d97258"
  sage: "#6b826b"
  clay: "#9a3e28"
  indigo: "#1c3058"
  moss: "#24442c"
  danger: "#a83226"
  danger-ink: "#ffffff"
  light-page: "#f3ecdf"
  light-ink: "#2a2622"
  light-terracotta: "#c15f45"
typography:
  prompt:
    fontFamily: "Lora, Georgia, Times New Roman, serif"
    fontWeight: 400
    fontSize: "1.5rem"
    lineHeight: 1.55
  ui:
    fontFamily: "Raleway, Segoe UI, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.4
  label:
    fontFamily: "Raleway, Segoe UI, system-ui, sans-serif"
    fontSize: "0.72rem"
    fontWeight: 700
    letterSpacing: "0.08em"
rounded:
  tile: "22px"
  button: "12px"
  pill: "9999px"
spacing:
  page: "24px 20px 48px"
  gap: "20px"
components:
  tile:
    backgroundColor: "{colors.clay}"
    rounded: "{rounded.tile}"
    backdropBlur: "16px"
  detail:
    width: "50vw"
    narrowHeight: "50vh"
---

## Overview

The Prompt Folio is a glass bento. A first visit opens on parchment `#f3ecdf` with a faint linen weave and a soft edge. Dark `#151311` is the other theme. Tiles are frosted dye gradients with a 22px radius, a gentle shadow, and a 16px backdrop blur. Lora sets the prompt. Raleway sets everything you touch.

Clay, Indigo, and Moss recolour every tile. `V` cycles them. A stored dye other than Indigo or Moss opens as Clay. `data-theme` is `dark` or `light`. `data-dye` is `clay`, `indigo`, or `moss`.

Tokens are custom properties in `style.css`.

## Colors

Dark reading pair: ink `#f2ece1` on page `#151311`. Terracotta `#d97258` is the accent and the focus ring. Popovers use `#221f1b`.

Light reading pair: ink `#2a2622` on parchment `#f3ecdf`. Terracotta is `#c15f45`. Sage `#6b826b` appears in the favicon sprig.

Dye gradients, dark: Clay from `#782a1a` toward `#9a3e28`, Indigo from `#12203c` toward `#1c3058`, Moss from `#183020` toward `#24442c`. Light dyes are the same families, lighter. Error toasts and a failed copy badge are `#a83226` with white type.

Muted ink `#857e72` stays on popovers and on the dark page at a quiet contrast. Tile type is cream `#fcf9f2`.

## Typography

Lora for the hero prompt, library lines, and the detail panel. Georgia and Times New Roman sit behind it.

Raleway for controls, menus, toasts, and labels. Body is 16px.

## Layout

The bento is at most 1360px wide. From 1100px it is four columns: the hero spans the row, keywords span two, the section switch and the tools tile take one each, and the library spans three beside Advanced. From 601px to 1099px it is two columns. At 600px and under, including a 540px side panel, it is one column in this order: hero, keywords, library, switch, tools, Advanced.

The detail panel is the right half (`50vw`, full height) from 860px wide, and a bottom sheet at half the height (`50vh`, full width) below that. There is no size slider.

## Elevation and depth

Tiles use a soft shadow plus a 1px inset highlight. The hero shadow is dyed. Popovers and the detail panel use a deeper shadow. The vignette is a radial gradient, `multiply` in light and a darker veil in dark.

Motion is 160–240ms on `cubic-bezier(0.22, 1, 0.36, 1)`. A new prompt fades and unblurs. `prefers-reduced-motion` removes transitions and animations, including smooth scrolling.

## Shapes

Tiles are 22px. Icon buttons are 12px and 44px square. Generate is a pill. Icons are 1.5px strokes at 20px, except the filled star.

## Components

**Hero.** A section chip, icon actions (copy, star, animate, delete), the prompt, and a cream Generate pill. One Generate replaces the plate.

**Library.** Favourites and History start collapsed to two lines. Click waits so a double-click can copy without expanding and without leaving a word selected. A tick and a toast confirm the copy. A failed copy turns the badge red and shows a red toast. Enter or Space toggles the focused row. `E` expands or collapses the visible shelf. Copy, animate, and delete appear on hover, focus, or when the row is open. The star stays visible.

**Gear.** Keyword mode, describe-instead, include-negative, and a closed Seed row. No backdrop control and no text-size or panel-size sliders.

**Empty.** A faint icon in the library. The hero reads “Press Generate.”

## Do's and Don'ts

Do keep one card per Generate, the three dyes, the shortcut list, and the half-page detail panel.

Do not put a photograph or a noren behind the page, do not show timestamps on plates, and do not add a fourth dye, batch counts, seed numbers on plates, or size sliders.

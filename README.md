# The Prompt Folio

A single tall page that writes still-image backgrounds and short animation prompts in full sentences. Open `index.html` in a browser. There is no build step and no server. The word banks live in `js/banks.js`, so the page also works when you open the file directly (`file://`).

The look is a calm wellness notebook: warm paper, terracotta and sage, Lora for the prompts and headings, and Raleway for the controls. The tokens for that system live in `DESIGN.md`. Behind the page is a cream noren printed with sage bamboo, a calico cat in the doorway. The **Backdrop** slider, inside the gear menu, fades that photograph from hidden to full; it opens near forty. The page is a bento of rounded tiles over the noren. The large tile is the prompt, with its icon actions and Generate. Keywords sit in a small tile, Backgrounds and Animation in another, and Favourites and History in a wider one. Dye dots, Sol & Shadow, the gear, and the shortcut key share a small tile. On a tall screen the hero stays on top across two to four columns. At about 540px the tiles stack: prompt, keywords, then the library. Three dyes — Clay, Indigo, and Moss — tint every tile. `V` cycles them. A saved Lacquer or Flat choice opens as Clay. A **Sol & Shadow** theme keeps the same photograph, dimmed, and the same dyes a shade deeper. The folio opens on the light parchment theme with Clay.

## Sections

1. **Backgrounds** — type keywords if you want, press Generate, and one prompt replaces the plate. Earlier prompts stay in History. World is the keyword mode unless you change it in the gear menu. Several comma-separated keywords take turns, one per generation. The link icon keeps one keyword line for Animation too. Copy with the copy icon or a double-click, star it, or send a still to Animation.
2. **Animation** — the same flow, for a moving picture. Locks and the starting scene sit under Advanced, closed until you open them.
3. **Favourites** — a star tab and a clock tab. Each shows a count. A plate starts as one or two lines, with a still or motion icon and its star. Click to open the full prompt. Search is the magnifier. Export, import, and clear sit in the ··· menu. Clear asks first.

Each Generate draws the next prompt from a seed kept in this browser. The same seed and the same step rebuild that prompt. Reuse sits under Seed in the gear menu, closed until you open it. The dice there starts a new seed.

The gear holds keyword mode (World, Blend, Exact), “Describe instead of naming”, “Include negative prompt”, and the backdrop slider. The detail panel is the right half of a wide page. In a narrow window, including a side panel around 540px, it becomes a bottom sheet at half the height. Double-click any plate to copy its prompt.

Place, weather, light, motion, and camera are chosen so they agree: a desert stays dry, underwater stays with the water, a walking figure is followed rather than orbited. If you pin a combination that disagrees, the prompt is still written and the mismatch is kept quietly. Copy stays on the prompt alone unless **Include negative prompt** is on. Jumps between sections scroll smoothly, and they stay instant when the browser asks for reduced motion.

## Keyboard shortcuts

Shortcuts pause while the cursor is in a text field, a menu, or a slider.

| Key | Action |
| --- | --- |
| `G` | Replace the plate in the section you are reading |
| `J` | Next plate in Favourites or History |
| `Shift` `J` | Previous plate in Favourites or History |
| `K` | Focus the keyword field |
| `C` | Copy the focused plate |
| `A` | In Favourites, copy the plates on screen |
| `S` | Star the focused plate |
| `Enter` | Open the detail panel. On a library plate, expand or collapse it |
| `Space` | Expand or collapse the focused library plate |
| `E` | Expand or collapse every plate in Favourites or History |
| `Esc` | Leave a field, or close search, menus, settings, the panel, or the shortcut list |
| `B` | Jump to Backgrounds |
| `N` | Jump to Animation |
| `F` | Jump to Favourites |
| `T` | Toggle parchment / Sol & Shadow |
| `V` | Cycle the card dye: Clay, Indigo, Moss |
| `?` | Show or hide the shortcut list |

## Publish

The workflow in `.github/workflows/pages.yml` publishes the static files on `main`. Pages is set to build from GitHub Actions. The live folio is at <https://rimkahan888.github.io/mother-of-all-prompt/>.

## Privacy

Favourites, history, theme, the card dye, keywords and the last ten keyword lines, the backdrop slider, seeds, and locks stay in `localStorage` on this browser. Nothing is sent to a server. Export JSON if you want a copy you can move.

## License

MIT. See [LICENSE](LICENSE).

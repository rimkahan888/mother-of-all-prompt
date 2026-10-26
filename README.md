# The Prompt Folio

A single tall page that writes still-image backgrounds and short animation prompts in full sentences. Open `index.html` in a browser. There is no build step and no server. The page, the stylesheet, and the script sit together at the root (`index.html`, `style.css`, `app.js`), so the folio also works when you open the file directly (`file://`) and when GitHub Pages serves the project.

The look is a calm glass bento on cream parchment. Tiles are frosted and rounded, dyed Clay, Indigo, or Moss, with cream type and a white Generate pill. Lora italic carries the prompt at a reading size. The card opens on the newest history prompt, or writes one when history is empty. Raleway carries the controls. The page opens light. Dark is the other theme, switched with the moon and sun icon or `T`, and that choice is remembered. A terrace painting covers the bottom half of the window and fades into the cream ground above it. The gear menu can turn it off. `V` cycles the three dyes, and each one tints every card. A saved dye other than Indigo or Moss opens as Clay.

## Sections

1. **Backgrounds** — type keywords if you want, press Generate, and one prompt replaces the plate. Earlier prompts stay in History. World is the keyword mode unless you change it in the gear menu. Several comma-separated keywords take turns, one per generation. The link icon keeps one keyword line for Animation too. Copy with the copy icon or a double-click, star it, or send a still to Animation.
2. **Animation** — the same flow, for a moving picture. Locks and the starting scene sit under Advanced, closed until you open them.
3. **Favourites and History** — a star tab and a clock tab, each with a count. A card starts collapsed to two lines. Click to open the full prompt. Double-click copies it as plain text, shows a tick and a toast, and does not leave a word selected. If the clipboard refuses, the card shows a red error and a red toast. Search is the magnifier. Export, import, and clear sit in the ··· menu. Clear asks first.

Each Generate draws the next prompt from a seed kept in this browser. The same seed and the same step rebuild that prompt. Reuse sits under Seed in the gear menu, closed until you open it. The dice there starts a new seed.

The gear holds keyword mode (World, Blend, Exact), “Describe instead of naming”, “Include negative prompt”, and Seed. The detail panel is the right half of a wide page. In a narrow window, including a side panel around 540px, it becomes a bottom sheet at half the height. There are no size sliders.

Place, weather, light, motion, and camera are chosen so they agree: a desert stays dry, underwater stays with the water, a walking figure is followed rather than orbited. If you pin a combination that disagrees, the prompt is still written and the mismatch is noted in the detail panel. Copy stays on the prompt alone unless **Include negative prompt** is on. Jumps between sections scroll smoothly, and they stay instant when the browser asks for reduced motion.

## Keyboard shortcuts

Shortcuts pause while the cursor is in a text field or a menu.

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
| `T` | Toggle light and dark |
| `V` | Cycle the card dye: Clay, Indigo, Moss |
| `?` | Show or hide the shortcut list |

## Publish

The workflow in `.github/workflows/pages.yml` publishes `index.html`, `style.css`, and `app.js` on `main`. Pages is set to build from GitHub Actions. The live folio is at <https://rimkahan888.github.io/mother-of-all-prompt/>. Styles and the script are loaded with relative paths (`./style.css`, `./app.js`).

## Privacy

Favourites, history, theme, the dye, keywords and the last ten keyword lines, and seeds stay in `localStorage` on this browser. Nothing is sent to a server. Export JSON if you want a copy you can move.

## License

MIT. See [LICENSE](LICENSE).

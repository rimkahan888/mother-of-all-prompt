# The Prompt Folio

A single tall page that writes still-image backgrounds and short animation prompts in full sentences. Open `index.html` in a browser. There is no build step and no server. The word banks live in `js/banks.js`, so the page also works when you open the file directly (`file://`).

The look is an earthy editorial notebook: warm paper, terracotta and sage, a serif for the prompts, and a handwritten note for the small asides. Behind the page is a cream noren printed with sage bamboo, a calico cat in the doorway. The **Backdrop** slider (remembered here) fades that photograph from hidden to full; it opens near forty. The plates, and the section panels a step lighter than the plates, are dyed a dark lacquer so the noren still ghosts through. Four dyes — Ink & Clay, Indigo Noren, Moss, and Lacquer — plus a flat charcoal sit as swatches in the top bar. That choice is remembered here, and `V` cycles it. A **Sol & Shadow** theme keeps the same photograph, dimmed, and the same dyes a shade deeper. The folio opens on the light parchment theme with Ink & Clay. The choice is remembered in this browser.

## Sections

1. **Backgrounds** — one prompt for an image generator. Press Generate and the plate is replaced; earlier prompts stay in History. Each control starts on Any. The lock keeps that choice for the next prompt. **Your keywords** sits at the top: World makes those words the setting, Blend weaves them through a random theme, and Exact puts them at the front as typed. Several comma-separated keywords take turns, one per generation. A shared line can feed Animation too. Clean background and a negative line are optional. Copy, star, or send the plate to Animation.
2. **Animation** — prompts for tools such as Runway, Kling, Pika, Luma, or a Sora-like generator. The coloured words are the anatomy: subject, motion, camera, style, timing. Camera moves include a plain-language explanation.
3. **Favourites** — starred prompts, plus the last hundred generations. Search, copy, delete, clear (it asks first), and export or import JSON.

Each Generate draws the next prompt from the seed. The same seed and the same step rebuild that prompt. The dice starts a new seed.

The top bar is a slim row of icons: Backgrounds, Animation, Favourites, the backdrop slider, the dye swatches, Sol & Shadow, and the shortcut key. On a wide screen the detail panel is the right half of the page. In a narrow window, including a side panel around 540px, it becomes a bottom sheet at half the height. Double-click any plate to copy its prompt.

Place, weather, light, motion, and camera are chosen so they agree: a desert stays dry, underwater stays with the water, a walking figure is followed rather than orbited. If you pin a combination that disagrees, it is still generated, and the plate carries a small note. Copy stays on the prompt alone unless **Include negative prompt** is on. That switch is remembered in this browser. Jumps between sections scroll smoothly, and they stay instant when the browser asks for reduced motion.

## Keyboard shortcuts

Shortcuts pause while the cursor is in a text field, a menu, or a slider.

| Key | Action |
| --- | --- |
| `G` | Replace the plate in the section you are reading |
| `J` | Next plate in Favourites or History |
| `Shift` `J` | Previous plate in Favourites or History |
| `K` | Focus Your keywords |
| `C` | Copy the focused plate |
| `A` | In Favourites, copy the plates on screen |
| `S` | Star the focused plate |
| `Enter` | Open the detail panel |
| `Esc` | Leave the keyword field, or close the panel or the shortcut help |
| `B` | Jump to Backgrounds |
| `N` | Jump to Animation |
| `F` | Jump to Favourites |
| `T` | Toggle parchment / Sol & Shadow |
| `V` | Cycle the card dye: Ink & Clay, Indigo Noren, Moss, Lacquer, Flat |
| `?` | Show or hide the shortcut list |

## Publish

The workflow in `.github/workflows/pages.yml` publishes the static files on `main`. Pages is set to build from GitHub Actions. The live folio is at <https://rimkahan888.github.io/mother-of-all-prompt/>.

## Privacy

Favourites, history, theme, the card dye, keywords and the last ten keyword lines, the backdrop slider, seeds, and locks stay in `localStorage` on this browser. Nothing is sent to a server. Export JSON if you want a copy you can move.

## License

MIT. See [LICENSE](LICENSE).

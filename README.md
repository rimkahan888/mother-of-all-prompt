# The Prompt Folio

A single tall page that writes still-image backgrounds and short animation prompts in full sentences. Open `index.html` in a browser. There is no build step and no server. The word banks live in `js/banks.js`, so the page also works when you open the file directly (`file://`).

The look is an earthy editorial notebook: warm paper, terracotta and sage, a serif for the prompts, and a handwritten note for the small asides. Behind the page is a cream noren printed with sage bamboo, a calico cat in the doorway. The **Backdrop** slider (remembered here) fades that photograph from hidden to full; it opens near forty. A **Sol & Shadow** theme (charcoal and terracotta) keeps the same photograph, dimmed. The folio opens on the light parchment theme. The choice is remembered in this browser.

## Sections

1. **Backgrounds** — prompts for an image generator. Set quantity to 1, 10, or 30, then Generate. Each control starts on Any. The lock keeps that choice fixed for the batch. Clean background and a negative line are optional. Copy, star, or send a plate to Animation.
2. **Animation** — prompts for tools such as Runway, Kling, Pika, Luma, or a Sora-like generator. The coloured words are the anatomy: subject, motion, camera, style, timing. Camera moves include a plain-language explanation.
3. **Favourites** — starred prompts, plus the last hundred generations. Search, copy, delete, clear (it asks first), and export or import JSON.

The same seed and the same settings rebuild the same batch. The dice only rolls a new seed.

Text size and the detail-panel size are the two sliders in the top bar. They are remembered here too. On a wide screen the detail panel is the right half of the page. In a narrow window, including a side panel around 540px, it becomes a bottom sheet at half the height. Double-click any plate to copy its prompt.

Place, weather, light, motion, and camera are chosen so they agree: a desert stays dry, underwater stays with the water, a walking figure is followed rather than orbited. If you pin a combination that disagrees, it is still generated, and the plate carries a small note. Copy and Copy all stay on the prompt alone unless **Include negative prompt** is on. That switch is remembered in this browser. Jumps between sections scroll smoothly, and they stay instant when the browser asks for reduced motion.

## Keyboard shortcuts

Shortcuts pause while the cursor is in a text field, a menu, or a slider.

| Key | Action |
| --- | --- |
| `G` | Generate in the section you are reading |
| `1` `2` `3` | Quantity 1, 10, or 30 |
| `J` / `K` | Next / previous card |
| `C` | Copy the focused card |
| `A` | Copy all in this section, one prompt per line |
| `S` | Star the focused card |
| `Enter` | Open the detail panel |
| `Esc` | Close the panel or the shortcut help |
| `B` | Jump to Backgrounds |
| `N` | Jump to Animation |
| `F` | Jump to Favourites |
| `T` | Toggle parchment / Sol & Shadow |
| `?` | Show or hide the shortcut list |

## Publish

The workflow in `.github/workflows/pages.yml` publishes the static files on `main`. Pages is set to build from GitHub Actions. The live folio is at <https://rimkahan888.github.io/mother-of-all-prompt/>.

## Privacy

Favourites, history, theme, the backdrop slider, seeds, locks, and the other slider positions stay in `localStorage` on this browser. Nothing is sent to a server. Export JSON if you want a copy you can move.

## License

MIT. See [LICENSE](LICENSE).

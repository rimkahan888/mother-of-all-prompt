/* Syntax and standing-requirement checks. Run with: node tests/fit.test.js */
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const root = path.join(__dirname, "..");
let failed = 0;

function assert(cond, message) {
  if (cond) return;
  failed += 1;
  console.error("FAIL: " + message);
}

execFileSync(process.execPath, ["--check", path.join(root, "app.js")], { stdio: "inherit" });

const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const css = fs.readFileSync(path.join(root, "style.css"), "utf8");
const app = fs.readFileSync(path.join(root, "app.js"), "utf8");

assert(html.includes('href="./style.css"'), "stylesheet is a relative path");
assert(html.includes('src="./app.js"'), "script is a relative path");
assert(html.includes("image/svg+xml"), "inline svg favicon");
assert(!html.includes("bg-noren") && !css.includes("bg-noren"), "noren artwork is gone");
assert(!html.includes("backdrop-slider") && !app.includes("backdrop-slider"), "backdrop slider is gone");
assert(!app.includes("setBackdropOpacity") && !app.includes("State.bgPhoto"), "backdrop state is gone");
assert(html.includes("pick === 'dark' ? 'dark' : 'light'"), "first visit defaults to light");
assert(app.includes("themePick") && app.includes("=== 'dark' ? 'dark' : 'light'"), "a saved dark choice stays dark");
assert(html.includes('id="shortcuts-modal"'), "shortcut overlay remains");
assert(css.includes("width: 50vw") && css.includes("height: 50vh"), "detail panel stays half the page");
assert(!html.includes('type="range"'), "no size or backdrop sliders");
assert(app.includes("e.detail > 1") && app.includes("clearSelection"), "double-click does not leave a selection");
assert(css.includes(".copied-badge.error"), "failed copy can show on the card");
assert(!app.includes("title=\"${escapeHTML(entry.created)}\""), "plates do not title themselves with a timestamp");
assert(!html.includes("Press Generate") && !app.includes("Press Generate"), "the hero does not show a placeholder");
assert(css.includes("clamp(1rem, 0.9rem + 0.42vw, 1.25rem)") && css.includes("font-style: italic"), "the prompt is italic and moderately sized");
assert(app.includes("if (State.currentHeroEntry)") && app.includes("generatePrompt();"), "an empty history writes one prompt on load");

if (failed) {
  console.error(failed + " check(s) failed");
  process.exit(1);
}
console.log("ok");

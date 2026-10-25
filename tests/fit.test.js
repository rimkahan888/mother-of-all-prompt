/* Compatibility checks for The Prompt Folio. Run with: node tests/fit.test.js */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.join(__dirname, "..");
const context = { console: console };
vm.createContext(context);
["js/banks.js", "js/fit.js", "js/app.js"].forEach(function (file) {
  vm.runInContext(fs.readFileSync(path.join(root, file), "utf8"), context, { filename: file });
});

const BANKS = context.MOAP_BANKS;
const FIT = context.MOAP_FIT;
const MOAP = context.MOAP;
let failed = 0;

function assert(cond, message) {
  if (cond) return;
  failed += 1;
  console.error("FAIL: " + message);
}

function indexOf(list, label) {
  const index = list.findIndex(function (item) { return item.label === label; });
  if (index < 0) throw new Error("missing " + label);
  return index;
}

function fields(overrides) {
  const base = {};
  ["scene", "style", "lighting", "palette", "mood", "time", "composition", "aspect", "camera", "motion", "speed", "duration", "film"].forEach(function (key) {
    base[key] = { value: "any", locked: false };
  });
  Object.keys(overrides || {}).forEach(function (key) {
    base[key] = overrides[key];
  });
  return base;
}

function background(seed, sceneIndex, extra) {
  return MOAP.buildBatch("background", {
    seed: String(seed),
    qty: 1,
    clean: true,
    negativeOn: false,
    negativeText: "",
    fields: fields(Object.assign({
      scene: { value: String(sceneIndex), locked: true }
    }, extra || {}))
  })[0];
}

function animation(seed, extraSettings) {
  const settings = Object.assign({
    seed: String(seed),
    qty: 1,
    sceneText: "",
    sceneLocked: false,
    loop: false,
    fields: fields()
  }, extraSettings || {});
  return MOAP.buildBatch("animation", settings)[0];
}

const desertIndexes = BANKS.scenes
  .map(function (scene, index) { return FIT.placeOf(scene) === "desert" ? index : -1; })
  .filter(function (index) { return index >= 0; });
const underwaterIndexes = BANKS.scenes
  .map(function (scene, index) { return FIT.placeOf(scene) === "underwater" ? index : -1; })
  .filter(function (index) { return index >= 0; });

assert(desertIndexes.length >= 6, "expected several desert scenes");
assert(underwaterIndexes.length >= 4, "expected several underwater scenes");

const wetTime = /light rain|just rained|drizzle|thunder far|sun shower|blue hour|falling snow|fresh snow|frost|clearing storm/i;
const wetLight = /after rain|snow bounce|storm break|lightning far/i;
const wetWord = /\brain\b|\bsnow\b|\bsnowflake|\bdrizzle\b|\bfrost\b/i;

for (let n = 0; n < 500; n += 1) {
  const sceneIndex = desertIndexes[n % desertIndexes.length];
  const plate = background("desert-" + n, sceneIndex);
  assert(plate.meta.place === "desert", "desert place " + n);
  assert(!wetTime.test(plate.meta.time), "desert time " + plate.meta.time + " seed " + n);
  assert(!wetLight.test(plate.meta.lighting), "desert light " + plate.meta.lighting + " seed " + n);
  assert(!wetWord.test(plate.text), "desert text contained weather: " + plate.text);
  assert(!plate.warnings.length, "unexpected desert warning " + plate.warnings.join(" "));
}

const windMotion = /swaying grass|leaves|wheat|curtains|laundry|pollen|pages|breath of powder|dry wind|gusts/i;
const windWord = /\bwind\b|\bbreeze\b|\bgust/i;
for (let n = 0; n < 500; n += 1) {
  const sceneIndex = underwaterIndexes[n % underwaterIndexes.length];
  const plate = background("water-" + n, sceneIndex);
  assert(plate.meta.place === "underwater", "underwater place");
  assert(!windWord.test(plate.meta.time), "underwater time " + plate.meta.time);
  assert(!windMotion.test(plate.meta.mood), "underwater mood " + plate.meta.mood);
  assert(!windWord.test(plate.text), "underwater text contained wind: " + plate.text);
}

for (let n = 0; n < 200; n += 1) {
  const sceneIndex = underwaterIndexes[n % underwaterIndexes.length];
  const plate = animation("uw-motion-" + n, {
    fields: fields({ scene: { value: "any", locked: false } }),
    sceneText: BANKS.scenes[sceneIndex].text,
    sceneLocked: true
  });
  assert(!windMotion.test(plate.meta.motion), "underwater motion " + plate.meta.motion + " seed " + n);
  assert(!windWord.test(plate.text), "underwater motion text had wind: " + plate.text);
  assert(!/drone/i.test(plate.meta.camera), "underwater drone " + plate.meta.camera);
}

const rainIndex = indexOf(BANKS.times, "Light rain");
const clash = background("clash", desertIndexes[0], {
  time: { value: String(rainIndex), locked: true }
});
assert(/\brain\b/i.test(clash.text), "locked rain should remain in the prompt");
assert(clash.warnings.length === 1, "locked desert + rain should warn");
assert(/disagree/i.test(clash.warnings[0]), "warning copy");
assert(/desert with light rain/i.test(clash.warnings[0]), "warning names the clash: " + clash.warnings[0]);

const walkIndex = indexOf(BANKS.motions, "Character walking");
const orbitIndex = indexOf(BANKS.cameras, "Slow orbit");
const walked = animation("walk-orbit", {
  fields: fields({
    motion: { value: String(walkIndex), locked: true },
    camera: { value: String(orbitIndex), locked: true }
  })
});
assert(/walks/i.test(walked.text), "locked walk remains");
assert(/orbits/i.test(walked.text), "locked orbit remains");
assert(/walking figure with slow orbit/i.test(walked.warnings.join(" ")), "walk + orbit warns");

for (let n = 0; n < 80; n += 1) {
  const plate = animation("walk-free-" + n, {
    fields: fields({ motion: { value: String(walkIndex), locked: true } })
  });
  const camera = BANKS.cameras.find(function (item) { return item.label === plate.meta.camera; });
  const tags = (camera && camera.tags) || [];
  assert(tags.indexOf("track") >= 0 || tags.indexOf("push") >= 0 || tags.indexOf("handheld") >= 0, "walk camera " + plate.meta.camera);
  assert(tags.indexOf("orbit") < 0 && tags.indexOf("drone") < 0, "walk avoided orbit/drone: " + plate.meta.camera);
  assert(!plate.warnings.length, "free walk should not warn");
}

const lapseIndex = indexOf(BANKS.films, "Timelapse");
for (let n = 0; n < 60; n += 1) {
  const plate = animation("lapse-" + n, {
    sceneText: BANKS.scenes[indexOf(BANKS.scenes, "Wild meadow")].text,
    fields: fields({ film: { value: String(lapseIndex), locked: true } })
  });
  const motion = BANKS.motions.find(function (item) { return item.label === plate.meta.motion; });
  assert(motion && motion.tags.some(function (tag) { return tag === "lapse" || tag === "clouds" || tag === "trails" || tag === "shadow"; }), "timelapse motion " + plate.meta.motion);
  assert(!/light trails|neon|train/i.test(plate.meta.motion), "nature timelapse avoided traffic: " + plate.meta.motion);
}

const cityIndex = indexOf(BANKS.scenes, "Night kiosk");
let cityTrails = 0;
for (let n = 0; n < 40; n += 1) {
  const plate = animation("city-" + n, {
    sceneText: BANKS.scenes[cityIndex].text,
    fields: fields()
  });
  if (/light trails|flickering neon|city blink|passing train/i.test(plate.meta.motion)) cityTrails += 1;
  assert(!/kelp|bubble|caustic|fish school/i.test(plate.meta.motion), "city motion " + plate.meta.motion);
}
assert(cityTrails > 0, "city scenes sometimes get traffic or light trails");

const batch = MOAP.buildBatch("background", {
  seed: "1847",
  qty: 30,
  clean: true,
  negativeOn: true,
  negativeText: "people",
  fields: fields()
});
assert(batch.length === 30, "qty 30");
assert(new Set(batch.map(function (plate) { return plate.text; })).size === 30, "30 prompts are unique");
const again = MOAP.buildBatch("background", {
  seed: "1847",
  qty: 30,
  clean: true,
  negativeOn: true,
  negativeText: "people",
  fields: fields()
});
assert(batch.map(function (plate) { return plate.text; }).join("\n") === again.map(function (plate) { return plate.text; }).join("\n"), "same seed reproduces");
const ten = MOAP.buildBatch("background", {
  seed: "1847",
  qty: 10,
  clean: true,
  negativeOn: true,
  negativeText: "people",
  fields: fields()
});
assert(ten.map(function (plate) { return plate.text; }).join("\n") === batch.slice(0, 10).map(function (plate) { return plate.text; }).join("\n"), "first 10 of 30 match");

function countPhrase(text, phrase) {
  const hay = String(text || "").toLowerCase();
  const needle = phrase.toLowerCase();
  let count = 0;
  let from = 0;
  while (from <= hay.length) {
    const at = hay.indexOf(needle, from);
    if (at < 0) break;
    count += 1;
    from = at + needle.length;
  }
  return count;
}

function keywordBatch(kind, keywords, extra) {
  const settings = Object.assign({
    seed: "1847",
    qty: 10,
    clean: false,
    negativeOn: false,
    negativeText: "",
    sceneText: "",
    sceneLocked: false,
    loop: false,
    keywords: keywords,
    keywordMode: "world",
    keywordDescribe: false,
    fields: fields()
  }, extra || {});
  return MOAP.buildBatch(kind, settings);
}

const pokemon = keywordBatch("background", "pokemon world");
assert(pokemon.length === 10, "pokemon batch is 10");
pokemon.forEach(function (plate) {
  assert(countPhrase(plate.text, "pokemon world") === 1, "pokemon world once: " + plate.text);
  assert(/^[A-Z]/.test(plate.text), "pokemon sentence starts with a capital: " + plate.text);
  assert(/[.!?]$/.test(plate.text), "pokemon sentence ends: " + plate.text);
  assert(!/pokemon world\s*,\s*pokemon world/i.test(plate.text), "pokemon world is not repeated as a list");
  assert(/\b(a|the) pokemon world\b|\bpokemon world\b/i.test(plate.text), "pokemon world sits in a sentence");
});
const pokemonAgain = keywordBatch("background", "pokemon world");
assert(pokemon.map(function (plate) { return plate.text; }).join("\n") === pokemonAgain.map(function (plate) { return plate.text; }).join("\n"), "same keywords and seed reproduce the batch");
const pokemonAnim = keywordBatch("animation", "pokemon world");
pokemonAnim.forEach(function (plate) {
  assert(countPhrase(plate.text, "pokemon world") === 1, "animation pokemon world once: " + plate.text);
  assert(/^[A-Z]/.test(plate.text) && /[.!?]$/.test(plate.text), "animation pokemon reads as a sentence");
});

const wetUnder = /\brain\b|\bsnow\b|\bwind\b|\bdrizzle\b|\bfrost\b|\bstorm\b/i;
for (let n = 0; n < 20; n += 1) {
  keywordBatch("background", "underwater kingdom", { seed: "sea-" + n, qty: 1 }).forEach(function (plate) {
    assert(!wetUnder.test(plate.text), "underwater kingdom background stayed with the water: " + plate.text);
    assert(!wetUnder.test(plate.meta.time + " " + plate.meta.lighting + " " + plate.meta.mood), "underwater kingdom weather " + plate.meta.time);
  });
  keywordBatch("animation", "underwater kingdom", { seed: "sea-anim-" + n, qty: 1 }).forEach(function (plate) {
    assert(!wetUnder.test(plate.text), "underwater kingdom animation stayed with the water: " + plate.text);
    assert(!/\bwind\b|\brain\b|\bdrone\b/i.test(plate.meta.motion + " " + plate.meta.camera), "underwater kingdom motion " + plate.meta.motion);
  });
}

const mixed = keywordBatch("background", "cyberpunk tokyo, rainy night", { qty: 10, seed: "mix" });
const sawTokyo = mixed.some(function (plate) { return /cyberpunk tokyo/i.test(plate.text); });
const sawNight = mixed.some(function (plate) { return /rainy night/i.test(plate.text); });
assert(sawTokyo && sawNight, "several keywords are shared across the batch");
mixed.forEach(function (plate) {
  assert(countPhrase(plate.text, "cyberpunk tokyo") <= 1, "tokyo once in a plate");
  assert(countPhrase(plate.text, "rainy night") <= 1, "rainy night once in a plate");
});

["desert", "underwater", "space", "interior", "nature", "city"].forEach(function (place) {
  const motions = BANKS.motions.filter(function (item) {
    return FIT.allows(item, "motion", { place: place });
  });
  assert(motions.length >= 6, place + " motions " + motions.length);
});

if (failed) {
  console.error(failed + " failed");
  process.exit(1);
}
console.log("fit tests ok");

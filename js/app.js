/* The Prompt Folio — generator, library, and keyboard. Classic script, no build. */
(function () {
  const BANKS = globalThis.MOAP_BANKS;
  const FIT = globalThis.MOAP_FIT;
  const BG_KEYS = ["scene", "style", "lighting", "palette", "mood", "time", "composition", "aspect"];
  const ANIM_KEYS = ["camera", "motion", "speed", "duration", "film"];
  const BANK_OF = {
    scene: "scenes",
    style: "styles",
    lighting: "lighting",
    palette: "palettes",
    mood: "moods",
    time: "times",
    composition: "compositions",
    aspect: "aspects",
    camera: "cameras",
    motion: "motions",
    speed: "speeds",
    duration: "durations",
    film: "films"
  };

  const state = {
    active: "backgrounds",
    shelf: "fav",
    currentCard: null,
    panelId: null,
    bgBatch: [],
    animBatch: [],
    toastTimer: null
  };

  function period(value) {
    const text = String(value || "").trim();
    if (!text) return "";
    return /[.!?]$/.test(text) ? text : text + ".";
  }

  function phrase(value) {
    return String(value || "").trim().replace(/[.!?]+$/, "");
  }

  function hashSeed(str) {
    let h = 2166136261;
    for (let i = 0; i < str.length; i += 1) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  function mulberry32(seed) {
    let a = seed >>> 0;
    return function rng() {
      a |= 0;
      a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function pick(rng, list) {
    return list[Math.floor(rng() * list.length)];
  }

  function bankFor(key) {
    return BANKS[BANK_OF[key]];
  }

  const FRANCHISE = [
    { test: /\bstar wars\b/i, phrase: "a worn space-opera of desert planets and ancient ships" },
    { test: /\bharry potter\b/i, phrase: "a candlelit school of moving staircases and stone corridors" },
    { test: /\bpok[eé]mon\b/i, phrase: "a colourful world of cute pocket monsters" },
    { test: /\bghibli\b/i, phrase: "a hand-painted landscape in the manner of a gentle animated film" },
    { test: /\bzelda\b/i, phrase: "a legendary kingdom of ruins, forests, and quiet adventure" },
    { test: /\bmario\b/i, phrase: "a bright cartoon kingdom of pipes, hills, and mushrooms" },
    { test: /\bmarvel\b/i, phrase: "a comic-book city of heroes and towering glass" },
    { test: /\bdisney\b/i, phrase: "a storybook kingdom of castles and woodland" },
    { test: /\bminecraft\b/i, phrase: "a blocky crafted world of lanterns and cubes" }
  ];

  function splitKeywords(raw) {
    return String(raw || "").split(",").map(function (part) { return part.trim(); }).filter(Boolean);
  }

  function describePhrase(phrase) {
    const text = String(phrase || "");
    for (let i = 0; i < FRANCHISE.length; i += 1) {
      if (FRANCHISE[i].test.test(text)) return FRANCHISE[i].phrase;
    }
    return text;
  }

  function keywordPlace(text) {
    const lower = String(text || "").toLowerCase();
    if (/\bstar wars\b/.test(lower)) return "space";
    if (/\bmarvel\b/.test(lower)) return "city";
    const inferred = FIT.inferPlace(text);
    if (inferred) return inferred;
    if (/\bunderwater\b|\bunder water\b|\bcoral\b|\bkelp\b/.test(lower)) return "underwater";
    if (/\bdesert\b|\bdunes?\b/.test(lower)) return "desert";
    if (/\bspace\b|\borbit\b|\bstarfield\b|\bspaceship\b/.test(lower)) return "space";
    if (/\bcity\b|\burban\b|\bcyberpunk\b/.test(lower)) return "city";
    if (/\bforest\b|\bmeadow\b|\bwoods\b|\bmountain\b/.test(lower)) return "nature";
    return "";
  }

  function keywordsImplyPlace(raw) {
    const list = splitKeywords(raw);
    for (let i = 0; i < list.length; i += 1) {
      if (keywordPlace(list[i])) return true;
    }
    return false;
  }

  function articleFor(phrase) {
    const text = String(phrase || "").trim();
    if (!text) return "";
    if (/^(a|an|the)\b/i.test(text)) return text;
    if (/^(tokyo|paris|london|kyoto|rome|venice|osaka|berlin|new york|cyberpunk tokyo)\b/i.test(text)) return text;
    return (/^[aeiou]/i.test(text) ? "an " : "a ") + text;
  }

  function keywordModeOf(settings) {
    const mode = settings && settings.keywordMode;
    if (mode === "blend" || mode === "exact" || mode === "world") return mode;
    return "world";
  }

  function worldLead(phrase, rng) {
    const articulated = articleFor(phrase);
    const options = [
      "A sweeping view of " + articulated + ".",
      "The setting is " + articulated + ".",
      "The frame opens onto " + articulated + "."
    ];
    return options[Math.floor(rng() * options.length)];
  }

  function blendLine(phrase, rng) {
    const articulated = articleFor(phrase);
    const options = [
      "Woven through the picture is " + articulated + ".",
      "A quiet flavour of " + articulated + " sits inside the scene.",
      "The theme stays, with a thread of " + articulated + " running through it."
    ];
    return options[Math.floor(rng() * options.length)];
  }

  function exactPrefix(phrase) {
    const text = String(phrase || "").trim();
    if (!text) return "";
    return /[.!?]$/.test(text) ? text : text + ".";
  }

  function dedupeKeywordItems(items) {
    const seen = {};
    const out = [];
    items.forEach(function (item) {
      const key = item.text.toLowerCase();
      if (seen[key]) {
        if (!seen[key].place && item.place) seen[key].place = item.place;
        return;
      }
      seen[key] = item;
      out.push(item);
    });
    return out;
  }

  function keywordTurn(settings) {
    const n = Number(settings && settings.turn);
    if (!isFinite(n) || n < 0) return 0;
    return Math.floor(n);
  }

  function planKeywords(settings) {
    const raw = splitKeywords(settings.keywords);
    if (!raw.length) return null;
    const items = dedupeKeywordItems(raw.map(function (phrase) {
      return { text: phrase, place: keywordPlace(phrase) };
    }));
    if (!items.length) return null;
    const order = items.slice();
    const rng = mulberry32(hashSeed(JSON.stringify({
      seed: String(settings.seed || "1847"),
      keywords: order.map(function (item) { return item.text; }).join("\n")
    })));
    for (let i = order.length - 1; i > 0; i -= 1) {
      const j = Math.floor(rng() * (i + 1));
      const swap = order[i];
      order[i] = order[j];
      order[j] = swap;
    }
    const chosen = order[keywordTurn(settings) % order.length];
    return {
      mode: keywordModeOf(settings),
      slots: [{
        text: settings.keywordDescribe ? describePhrase(chosen.text) : chosen.text,
        place: chosen.place
      }]
    };
  }

  function syntheticScene(place) {
    const group = {
      nature: "Nature",
      coast: "Coast",
      desert: "Desert",
      city: "City",
      interior: "Interior",
      fantasy: "Fantasy",
      underwater: "Underwater",
      space: "Space",
      abstract: "Abstract",
      yard: "Workshop"
    }[place] || "";
    return { label: "From keywords", text: "", group: group, tags: place ? [place] : [] };
  }

  function pickSceneInPlace(rng, place, ctx) {
    const pool = BANKS.scenes.filter(function (item) { return FIT.placeOf(item) === place; });
    return FIT.pick(rng, pool.length ? pool : BANKS.scenes, "scene", ctx).item;
  }

  function applyKeywordVoice(parts, phrase, mode, rng) {
    const spoken = String(phrase || "").trim();
    if (!spoken) return parts;
    const next = parts.filter(function (part) { return part && String(part.text || "").trim(); });
    if (mode === "world") {
      const without = next.filter(function (part) { return part.key !== "scene" && part.key !== "subject"; });
      without.unshift({ key: "scene", label: "Scene", text: worldLead(spoken, rng) });
      return without;
    }
    if (mode === "blend") {
      next.push({ key: "keyword", label: "Keywords", text: blendLine(spoken, rng) });
      return next;
    }
    next.unshift({ key: "keyword", label: "Keywords", text: exactPrefix(spoken) });
    return next;
  }

  function seedKeyFor(kind, settings) {
    const keys = kind === "background" ? BG_KEYS : ANIM_KEYS;
    const fields = {};
    keys.forEach(function (key) {
      const field = (settings.fields && settings.fields[key]) || { value: "any", locked: false };
      fields[key] = { value: String(field.value), locked: !!field.locked };
    });
    return JSON.stringify({
      v: 2,
      kind: kind,
      seed: settings.seed || "1847",
      turn: keywordTurn(settings),
      clean: !!settings.clean,
      negativeOn: !!settings.negativeOn,
      negativeText: settings.negativeOn ? settings.negativeText || "" : "",
      sceneText: String(settings.sceneText || "").trim(),
      sceneLocked: !!settings.sceneLocked,
      loop: !!settings.loop,
      keywords: String(settings.keywords || "").trim(),
      keywordMode: String(settings.keywords || "").trim() ? keywordModeOf(settings) : "",
      keywordDescribe: !!(String(settings.keywords || "").trim() && settings.keywordDescribe),
      fields: fields
    });
  }

  function forcedMap(kind, settings) {
    const map = {};
    const keys = kind === "background" ? BG_KEYS : ANIM_KEYS;
    keys.forEach(function (key) {
      const field = (settings.fields && settings.fields[key]) || { value: "any", locked: false };
      if (String(field.value) !== "any") map[key] = true;
    });
    if (kind === "animation" && String(settings.sceneText || "").trim()) map.sceneText = true;
    return map;
  }

  function resolveShared(kind, seedKey, settings) {
    const shared = {};
    const keys = kind === "background" ? BG_KEYS : ANIM_KEYS;
    keys.forEach(function (key) {
      const field = (settings.fields && settings.fields[key]) || { value: "any", locked: false };
      if (field.value !== "any" && field.value !== "keywords") {
        const item = bankFor(key)[Number(field.value)];
        if (item) shared[key] = item;
      }
    });
    if (kind === "animation" && settings.sceneLocked && !String(settings.sceneText || "").trim()) {
      const rng = mulberry32(hashSeed(seedKey + "|lock|scene"));
      const ctx = FIT.context({ shared: shared, settings: settings, partial: {} });
      shared.scene = FIT.pick(rng, BANKS.scenes, "scene", ctx).item;
    }
    const order = kind === "background"
      ? ["scene", "time", "lighting", "mood", "style", "palette", "composition", "aspect"]
      : ["motion", "camera", "film", "speed", "duration"];
    order.forEach(function (key) {
      if (shared[key]) return;
      const field = (settings.fields && settings.fields[key]) || { value: "any", locked: false };
      if (!field.locked) return;
      const rng = mulberry32(hashSeed(seedKey + "|lock|" + key));
      const ctx = FIT.context({ shared: shared, settings: settings, partial: {} });
      shared[key] = FIT.pick(rng, bankFor(key), key, ctx).item;
    });
    return shared;
  }

  function drawField(rng, shared, settings, partial, key) {
    if (shared[key]) {
      partial[key] = shared[key];
      return shared[key];
    }
    const ctx = FIT.context({ shared: shared, settings: settings, partial: partial });
    const picked = FIT.pick(rng, bankFor(key), key, ctx);
    partial[key] = picked.item;
    return picked.item;
  }

  function makeBackground(rng, shared, settings, forced) {
    const spoken = String(settings.keywordPhrase || "").trim();
    const mode = spoken ? (settings.keywordMode || "world") : "";
    const cardPlace = spoken ? String(settings.keywordPlace || "") : "";
    const partial = {};
    let scene;
    if (spoken && mode === "world") {
      scene = cardPlace ? syntheticScene(cardPlace) : null;
      if (scene) partial.scene = scene;
    } else if (spoken && cardPlace && (!shared.scene || FIT.placeOf(shared.scene) !== cardPlace)) {
      const ctx = FIT.context({ shared: shared, settings: settings, partial: partial });
      scene = pickSceneInPlace(rng, cardPlace, ctx);
      partial.scene = scene;
    } else {
      scene = drawField(rng, shared, settings, partial, "scene");
    }
    const time = drawField(rng, shared, settings, partial, "time");
    const lighting = drawField(rng, shared, settings, partial, "lighting");
    const mood = drawField(rng, shared, settings, partial, "mood");
    const style = drawField(rng, shared, settings, partial, "style");
    const palette = drawField(rng, shared, settings, partial, "palette");
    const composition = drawField(rng, shared, settings, partial, "composition");
    const aspect = drawField(rng, shared, settings, partial, "aspect");
    const blocks = {
      scene: scene && String(scene.text || "").trim()
        ? { key: "scene", label: "Scene", text: period(scene.text) }
        : null,
      style: { key: "style", label: "Style", text: period(style.text) },
      lighting: { key: "lighting", label: "Lighting", text: period(lighting.text) },
      time: { key: "time", label: "Time & weather", text: period("It is " + phrase(time.text)) },
      palette: { key: "palette", label: "Palette", text: period("The palette is " + phrase(palette.text)) },
      mood: { key: "mood", label: "Mood", text: period("The mood is " + phrase(mood.text)) },
      composition: { key: "composition", label: "Composition", text: period(composition.text) },
      aspect: { key: "aspect", label: "Aspect", text: period(aspect.text) }
    };
    if (settings.clean) {
      blocks.clean = {
        key: "clean",
        label: "Clean background",
        text: "The scene stays empty of people, lettering, logos, and watermarks."
      };
    }
    const orders = [
      ["scene", "style", "lighting", "time", "palette", "mood", "composition", "aspect", "clean"],
      ["composition", "scene", "lighting", "style", "mood", "time", "palette", "aspect", "clean"],
      ["scene", "mood", "lighting", "style", "time", "palette", "composition", "aspect", "clean"],
      ["scene", "style", "mood", "lighting", "palette", "time", "composition", "aspect", "clean"]
    ];
    const order = orders[Math.floor(rng() * orders.length)];
    let parts = order.map(function (key) { return blocks[key]; }).filter(Boolean);
    parts = applyKeywordVoice(parts, spoken, mode, rng);
    const place = (scene && FIT.placeOf(scene)) || cardPlace;
    const warnings = FIT.warnings({
      place: place,
      scene: scene,
      time: time,
      lighting: lighting,
      mood: mood
    }, forced);
    return {
      text: parts.map(function (part) { return part.text; }).join(" ").replace(/\s+/g, " ").trim(),
      parts: parts,
      stamp: aspect.stamp || aspect.label,
      stamp2: style.label,
      warnings: warnings,
      meta: {
        place: place,
        time: time.label,
        lighting: lighting.label,
        mood: mood.label
      }
    };
  }

  function makeAnimation(rng, shared, settings, forced) {
    const spoken = String(settings.keywordPhrase || "").trim();
    const mode = spoken ? (settings.keywordMode || "world") : "";
    const cardPlace = spoken ? String(settings.keywordPlace || "") : "";
    const typed = String(settings.sceneText || "").trim();
    const partial = {};
    let subject = "";
    let filledScene = "";
    if (spoken && mode === "world") {
      if (cardPlace) partial.scene = syntheticScene(cardPlace);
    } else if (spoken && cardPlace) {
      const ctx = FIT.context({ shared: shared, settings: settings, partial: partial });
      partial.scene = pickSceneInPlace(rng, cardPlace, ctx);
      subject = period(partial.scene.text);
      filledScene = subject;
    } else if (typed) {
      subject = period(typed);
      const known = FIT.matchScene(typed);
      if (known) partial.scene = known;
    } else if (shared.scene) {
      partial.scene = shared.scene;
      subject = period(shared.scene.text);
      filledScene = subject;
    } else {
      const ctx = FIT.context({ shared: shared, settings: settings, partial: partial });
      partial.scene = FIT.pick(rng, BANKS.scenes, "scene", ctx).item;
      subject = period(partial.scene.text);
    }
    const motion = drawField(rng, shared, settings, partial, "motion");
    const camera = drawField(rng, shared, settings, partial, "camera");
    const film = drawField(rng, shared, settings, partial, "film");
    const speed = drawField(rng, shared, settings, partial, "speed");
    const duration = drawField(rng, shared, settings, partial, "duration");
    const loopText = settings.loop
      ? "The clip is a seamless loop, with the ending made to match the beginning."
      : "The clip plays once, with a clear beginning and end.";
    if (spoken && mode === "world") subject = worldLead(spoken, rng);
    else if (spoken && mode === "blend") subject = (subject ? subject + " " : "") + blendLine(spoken, rng);
    else if (spoken && mode === "exact") subject = exactPrefix(spoken) + (subject ? " " + subject : "");
    const parts = [
      { key: "subject", label: "Subject", text: subject },
      { key: "motion", label: "Motion", text: period(motion.text) },
      { key: "camera", label: "Camera", text: period(camera.text) },
      { key: "style", label: "Style", text: period(film.text) },
      { key: "timing", label: "Timing", text: [period(speed.text), period(duration.text), loopText].join(" ") }
    ];
    const view = FIT.context({ shared: shared, settings: settings, partial: partial });
    const warnings = FIT.warnings({
      place: view.place,
      scene: partial.scene,
      motion: motion,
      camera: camera,
      film: film
    }, forced);
    return {
      text: parts.map(function (part) { return part.text; }).join(" ").replace(/\s+/g, " ").trim(),
      parts: parts,
      stamp: duration.stamp || duration.label,
      stamp2: film.label,
      tip: camera.tip || "",
      cameraLabel: camera.label,
      filledScene: filledScene,
      warnings: warnings,
      meta: {
        place: view.place,
        motion: motion.label,
        camera: camera.label,
        film: film.label
      }
    };
  }

  function buildBatch(kind, settings) {
    const seedKey = seedKeyFor(kind, settings);
    const shared = resolveShared(kind, seedKey, settings);
    const forced = forcedMap(kind, settings);
    const planned = planKeywords(settings);
    const cardSettings = {};
    Object.keys(settings).forEach(function (key) { cardSettings[key] = settings[key]; });
    const slot = planned ? planned.slots[0] : null;
    cardSettings.keywordPhrase = slot ? slot.text : "";
    cardSettings.keywordPlace = slot ? slot.place : "";
    cardSettings.keywordMode = slot ? planned.mode : "";
    const rng = mulberry32(hashSeed(seedKey + "|card"));
    const built = kind === "background"
      ? makeBackground(rng, shared, cardSettings, forced)
      : makeAnimation(rng, shared, cardSettings, forced);
    const prompts = [built];
    prompts.filledScene = built.filledScene || "";
    return prompts;
  }

  function esc(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
    });
  }

  function makeId() {
    return Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 8);
  }

  function toast(message, isError) {
    const el = document.getElementById("toast");
    if (!el) return;
    el.hidden = false;
    el.textContent = message;
    el.classList.toggle("is-error", !!isError);
    el.setAttribute("role", isError ? "alert" : "status");
    clearTimeout(state.toastTimer);
    state.toastTimer = setTimeout(function () { el.hidden = true; }, isError ? 3800 : 2200);
  }

  function storageGet(key) {
    try { return localStorage.getItem(key); } catch (err) { return null; }
  }

  function storageSet(key, value) {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (err) {
      toast("Could not save. Browser storage is full or blocked.", true);
      return false;
    }
  }

  function loadLibrary() {
    try {
      const raw = storageGet("moap.library");
      if (!raw) return { favourites: [], history: [] };
      const data = JSON.parse(raw);
      return {
        favourites: Array.isArray(data.favourites) ? data.favourites : [],
        history: Array.isArray(data.history) ? data.history : []
      };
    } catch (err) {
      return { favourites: [], history: [] };
    }
  }

  function saveLibrary(lib) {
    return storageSet("moap.library", JSON.stringify(lib));
  }

  function findEntry(id) {
    const live = state.bgBatch.concat(state.animBatch).find(function (entry) { return entry.id === id; });
    if (live) return live;
    const lib = loadLibrary();
    return lib.favourites.find(function (entry) { return entry.id === id; })
      || lib.history.find(function (entry) { return entry.id === id; })
      || null;
  }

  function formatWhen(iso) {
    try {
      return new Date(iso).toLocaleString(undefined, {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    } catch (err) {
      return "";
    }
  }

  function partsHTML(parts) {
    return (parts || []).map(function (part) {
      return '<span class="part part-' + esc(part.key) + '">' + esc(part.text) + "</span>";
    }).join(" ");
  }

  function starIcons() {
    return '<svg class="icon icon-off" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-star"></use></svg>'
      + '<svg class="icon icon-on" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-star-fill"></use></svg>';
  }

  function svgUse(id) {
    return '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><use href="#' + id + '"></use></svg>';
  }

  function cardMetaTitle(entry) {
    const kind = entry.kind === "animation" ? "Animation" : "Background";
    const when = entry.created ? formatWhen(entry.created) : "";
    return when ? kind + " · " + when : kind;
  }

  function cardHTML(entry, opts) {
    const library = opts.library || "";
    const starred = !!entry.starred;
    const animate = entry.kind === "background"
      ? '<button type="button" class="icon-btn" data-act="animate" aria-label="Animate this" title="Animate this">' + svgUse("i-play") + "</button>"
      : "";
    const del = library
      ? '<button type="button" class="icon-btn" data-act="delete" data-where="' + esc(library) + '" aria-label="Delete" title="Delete">' + svgUse("i-trash") + "</button>"
      : "";
    return '<article class="card' + (library ? " compact" : "") + '" tabindex="0" data-id="' + esc(entry.id) + '" data-kind="' + esc(entry.kind) + '" title="' + esc(cardMetaTitle(entry)) + '">'
      + '<span class="copied-badge">Copied</span>'
      + '<p class="prompt">' + esc(entry.text) + "</p>"
      + '<div class="card-actions">'
      + '<button type="button" class="icon-btn" data-act="copy" aria-label="Copy" title="Copy">' + svgUse("i-copy") + "</button>"
      + '<button type="button" class="icon-btn star' + (starred ? " is-on" : "") + '" data-act="star" aria-pressed="' + (starred ? "true" : "false") + '" aria-label="' + (starred ? "Remove from favourites" : "Add to favourites") + '" title="' + (starred ? "Remove from favourites" : "Add to favourites") + '">' + starIcons() + "</button>"
      + animate
      + del
      + "</div></article>";
  }

  function emptyHTML(which) {
    if (which === "background" || which === "animation") return '<p class="empty">Press Generate.</p>';
    if (which === "fav") return '<p class="empty empty-mark" aria-label="No favourites">' + svgUse("i-star") + "</p>";
    if (which === "hist") return '<p class="empty empty-mark" aria-label="No history">' + svgUse("i-clock") + "</p>";
    if (which === "search") return '<p class="empty empty-mark" aria-label="Nothing matches">' + svgUse("i-search") + "</p>";
    return '<p class="empty empty-mark">' + svgUse("i-star") + "</p>";
  }

  function showTick(card) {
    if (!card) return;
    card.classList.add("is-copied");
    clearTimeout(card._tick);
    card._tick = setTimeout(function () { card.classList.remove("is-copied"); }, 1600);
  }

  function flash(el) {
    if (!el) return;
    el.classList.remove("is-flash", "is-fail");
    void el.offsetWidth;
    el.classList.add("is-flash");
  }

  function failFlash(el) {
    if (!el) return;
    el.classList.remove("is-flash", "is-fail");
    void el.offsetWidth;
    el.classList.add("is-fail");
  }

  async function writeClipboard(text) {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch (err) {
      /* Fall through to the selection fallback for file:// and blocked permissions. */
    }
    try {
      const area = document.createElement("textarea");
      area.value = text;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.top = "0";
      area.style.left = "0";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.focus();
      area.select();
      area.setSelectionRange(0, text.length);
      const ok = document.execCommand("copy");
      area.remove();
      return !!ok;
    } catch (err) {
      return false;
    }
  }

  async function copyText(text, card, okMessage, control) {
    const ok = await writeClipboard(text);
    if (!ok) {
      failFlash(control);
      toast("Clipboard blocked. Select the prompt text and copy it manually.", true);
      return false;
    }
    showTick(card);
    flash(control);
    toast(okMessage || "Copied");
    return true;
  }

  function copyNegativeOn() {
    return storageGet("moap.copyNegative") === "1";
  }

  function entryCopyText(entry, includeNegative) {
    if (!entry) return "";
    if (!includeNegative || !entry.negative) return entry.text;
    return entry.text + "\n\nNegative: " + entry.negative;
  }

  function copyEntry(entry, card, control) {
    if (!entry) return;
    const withNegative = copyNegativeOn() && !!entry.negative;
    const button = control || (card && card.querySelector('[data-act="copy"]'));
    copyText(entryCopyText(entry, withNegative), card, withNegative ? "Copied with negative prompt" : "Copied", button);
  }

  function setCurrent(card, opts) {
    const options = opts || {};
    document.querySelectorAll(".card.is-current").forEach(function (el) { el.classList.remove("is-current"); });
    if (!card) {
      state.currentCard = null;
      return;
    }
    card.classList.add("is-current");
    state.currentCard = card;
    if (options.focus !== false) card.focus({ preventScroll: true });
    card.scrollIntoView({ block: "nearest", inline: "nearest" });
  }

  function bindCard(card) {
    let timer = null;
    card.addEventListener("click", function (event) {
      if (event.target.closest("button")) return;
      clearTimeout(timer);
      timer = setTimeout(function () {
        timer = null;
        const entry = findEntry(card.dataset.id);
        setCurrent(card);
        if (entry) openPanel(entry);
      }, 220);
    });
    card.addEventListener("dblclick", function (event) {
      if (event.target.closest("button")) return;
      clearTimeout(timer);
      timer = null;
      const entry = findEntry(card.dataset.id);
      if (entry) copyEntry(entry, card);
    });
    card.addEventListener("focus", function () {
      if (state.currentCard !== card) setCurrent(card, { focus: false });
    });
    card.querySelectorAll("button").forEach(function (btn) {
      btn.addEventListener("click", function (event) {
        event.stopPropagation();
        const entry = findEntry(card.dataset.id);
        const act = btn.dataset.act;
        if (!entry && act !== "delete") return;
        if (act === "copy") copyEntry(entry, card, btn);
        if (act === "star") setStar(card.dataset.id, btn.getAttribute("aria-pressed") !== "true", btn);
        if (act === "animate" && entry) sendToAnimation(entry, btn);
        if (act === "delete") deleteEntry(card.dataset.id, btn.dataset.where, btn);
      });
    });
  }

  function renderCards(container, entries, opts) {
    if (!entries.length) {
      container.innerHTML = emptyHTML(opts.empty || "library");
      return;
    }
    container.innerHTML = entries.map(function (entry, index) {
      return cardHTML(entry, { library: opts.library || "", index: index + 1 });
    }).join("");
    container.querySelectorAll(".card").forEach(bindCard);
  }

  function renderBatch(kind) {
    const output = document.getElementById(kind === "background" ? "bg-output" : "anim-output");
    const entries = kind === "background" ? state.bgBatch : state.animBatch;
    renderCards(output, entries, { empty: kind === "background" ? "background" : "animation" });
    if (state.currentCard && !state.currentCard.isConnected) state.currentCard = null;
  }

  function entryMatches(entry, query) {
    if (!query) return true;
    const hay = [entry.text, entry.negative, entry.stamp, entry.stamp2, entry.kind, entry.cameraLabel]
      .concat((entry.parts || []).map(function (part) { return part.text + " " + part.label; }))
      .join(" ")
      .toLowerCase();
    return hay.indexOf(query) >= 0;
  }

  function renderLibrary() {
    const query = (document.getElementById("search").value || "").trim().toLowerCase();
    const lib = loadLibrary();
    const fav = lib.favourites.filter(function (entry) { return entryMatches(entry, query); });
    const hist = lib.history.filter(function (entry) { return entryMatches(entry, query); });
    const favList = document.getElementById("fav-list");
    const histList = document.getElementById("hist-list");
    if (query && !fav.length) renderCards(favList, [], { empty: "search" });
    else renderCards(favList, fav, { library: "fav", empty: "fav" });
    if (query && !hist.length) renderCards(histList, [], { empty: "search" });
    else renderCards(histList, hist, { library: "hist", empty: "hist" });
    const favCount = document.getElementById("fav-count");
    const histCount = document.getElementById("hist-count");
    if (favCount) favCount.textContent = String(lib.favourites.length);
    if (histCount) histCount.textContent = String(lib.history.length);
    const favTab = document.getElementById("tab-fav");
    const histTab = document.getElementById("tab-hist");
    if (favTab) favTab.setAttribute("aria-label", "Favourites, " + lib.favourites.length);
    if (histTab) histTab.setAttribute("aria-label", "History, " + lib.history.length);
    setShelf(state.shelf);
    if (state.currentCard && !state.currentCard.isConnected) state.currentCard = null;
  }

  function syncStarDom(id, on) {
    document.querySelectorAll('.card[data-id="' + (window.CSS && CSS.escape ? CSS.escape(id) : id) + '"] .star').forEach(function (btn) {
      btn.setAttribute("aria-pressed", on ? "true" : "false");
      btn.classList.toggle("is-on", on);
      const name = on ? "Remove from favourites" : "Add to favourites";
      btn.setAttribute("aria-label", name);
      btn.setAttribute("title", name);
    });
  }

  function starButtons(id) {
    const safe = window.CSS && CSS.escape ? CSS.escape(id) : id;
    return document.querySelectorAll('.card[data-id="' + safe + '"] .star, #detail-star');
  }

  function setStar(id, on, control) {
    const lib = loadLibrary();
    lib.history.forEach(function (entry) {
      if (entry.id === id) entry.starred = on;
    });
    if (on) {
      if (!lib.favourites.some(function (entry) { return entry.id === id; })) {
        const source = lib.history.find(function (entry) { return entry.id === id; }) || findEntry(id);
        if (!source) {
          failFlash(control);
          toast("Could not star that plate.", true);
          return;
        }
        const copy = JSON.parse(JSON.stringify(source));
        copy.starred = true;
        lib.favourites.unshift(copy);
        if (lib.favourites.length > 400) lib.favourites.length = 400;
      }
    } else {
      lib.favourites = lib.favourites.filter(function (entry) { return entry.id !== id; });
    }
    if (!saveLibrary(lib)) {
      failFlash(control);
      return;
    }
    const live = state.bgBatch.concat(state.animBatch).find(function (entry) { return entry.id === id; });
    if (live) live.starred = on;
    syncStarDom(id, on);
    const focusId = document.activeElement && document.activeElement.closest
      ? (document.activeElement.closest(".card") || {}).dataset
      : null;
    renderLibrary();
    if (focusId && focusId.id) {
      const again = document.querySelector('#fav-list .card[data-id="' + focusId.id + '"], #hist-list .card[data-id="' + focusId.id + '"]');
      if (again && !again.closest("[hidden]")) again.focus();
    }
    if (state.panelId === id) {
      const fresh = findEntry(id);
      if (fresh) fillPanel(fresh);
    }
    starButtons(id).forEach(flash);
    if (control && control.isConnected) flash(control);
    toast(on ? "Saved to favourites" : "Removed from favourites");
  }

  function deleteEntry(id, where, control) {
    if (control && control.dataset.busy === "1") return;
    if (control) {
      control.dataset.busy = "1";
      flash(control);
    }
    window.setTimeout(function () {
    const lib = loadLibrary();
    if (where === "fav") {
      lib.favourites = lib.favourites.filter(function (entry) { return entry.id !== id; });
      lib.history.forEach(function (entry) {
        if (entry.id === id) entry.starred = false;
      });
      const live = state.bgBatch.concat(state.animBatch).find(function (entry) { return entry.id === id; });
      if (live) live.starred = false;
      syncStarDom(id, false);
    } else {
      lib.history = lib.history.filter(function (entry) { return entry.id !== id; });
    }
    if (!saveLibrary(lib)) {
      if (control) delete control.dataset.busy;
      failFlash(control);
      return;
    }
    renderLibrary();
    const still = findEntry(id);
    if (state.panelId === id && !still) closePanel();
    toast("Deleted");
    }, 160);
  }

  function remember(entries) {
    const lib = loadLibrary();
    const copies = entries.map(function (entry) { return JSON.parse(JSON.stringify(entry)); });
    lib.history = copies.concat(lib.history).slice(0, 100);
    saveLibrary(lib);
  }

  function toEntry(kind, built, settings) {
    return {
      id: makeId(),
      kind: kind,
      text: built.text,
      parts: built.parts,
      negative: kind === "background" && settings.negativeOn ? (settings.negativeText || "") : "",
      stamp: built.stamp || "",
      stamp2: built.stamp2 || "",
      tip: built.tip || "",
      cameraLabel: built.cameraLabel || "",
      warnings: built.warnings || [],
      created: new Date().toISOString(),
      starred: false
    };
  }

  function readFields(prefix, keys) {
    const fields = {};
    keys.forEach(function (key) {
      const select = document.getElementById(prefix + "-" + key);
      const lock = document.getElementById("lock-" + prefix + "-" + key);
      let value = select ? select.value : "any";
      let locked = !!(lock && lock.getAttribute("aria-pressed") === "true");
      if (value === "keywords") {
        value = keywordHold.background.value || "any";
        locked = !!keywordHold.background.locked;
      }
      fields[key] = {
        value: value,
        locked: locked
      };
    });
    return fields;
  }

  function turnKey(kind) {
    return kind === "background" ? "moap.bgTurn" : "moap.animTurn";
  }

  function storedTurn(kind) {
    const n = Number(storageGet(turnKey(kind)));
    if (!isFinite(n) || n < 0) return 0;
    return Math.floor(n);
  }

  function setTurn(kind, n) {
    storageSet(turnKey(kind), String(n));
  }

  function readSettings(kind) {
    if (kind === "background") {
      return {
        seed: document.getElementById("bg-seed").value.trim(),
        turn: storedTurn(kind),
        clean: document.getElementById("bg-clean").checked,
        negativeOn: document.getElementById("bg-neg-on").checked,
        negativeText: document.getElementById("bg-neg").value.trim(),
        keywords: keywordBox("bg").text.trim(),
        keywordMode: keywordBox("bg").mode,
        keywordDescribe: keywordBox("bg").describe,
        fields: readFields("bg", BG_KEYS)
      };
    }
    const animWords = keywordBox("anim");
    return {
      seed: document.getElementById("anim-seed").value.trim(),
      turn: storedTurn(kind),
      sceneText: document.getElementById("anim-scene").value.trim(),
      sceneLocked: keywordHold.animation.held
        ? !!keywordHold.animation.locked
        : document.getElementById("lock-anim-scene").getAttribute("aria-pressed") === "true",
      loop: document.getElementById("anim-loop").checked,
      keywords: animWords.text.trim(),
      keywordMode: animWords.mode,
      keywordDescribe: animWords.describe,
      fields: readFields("anim", ANIM_KEYS)
    };
  }

  function saveSettings(kind) {
    storageSet(kind === "background" ? "moap.bg" : "moap.anim", JSON.stringify(readSettings(kind)));
  }

  function applyLockState(button, on) {
    button.setAttribute("aria-pressed", on ? "true" : "false");
    const control = button.closest(".control");
    if (control) control.classList.toggle("is-locked", on);
  }

  function restoreSettings(kind) {
    let saved = null;
    try { saved = JSON.parse(storageGet(kind === "background" ? "moap.bg" : "moap.anim") || "null"); }
    catch (err) { saved = null; }
    if (!saved) return;
    const prefix = kind === "background" ? "bg" : "anim";
    if (saved.seed) document.getElementById(prefix + "-seed").value = saved.seed;
    const keys = kind === "background" ? BG_KEYS : ANIM_KEYS;
    keys.forEach(function (key) {
      const field = saved.fields && saved.fields[key];
      if (!field) return;
      const select = document.getElementById(prefix + "-" + key);
      if (select && field.value) {
        select.value = field.value;
        if (select.value !== String(field.value)) select.value = "any";
      }
      const lock = document.getElementById("lock-" + prefix + "-" + key);
      if (lock) applyLockState(lock, !!field.locked);
    });
    if (kind === "background") {
      document.getElementById("bg-clean").checked = saved.clean !== false;
      document.getElementById("bg-neg-on").checked = !!saved.negativeOn;
      if (typeof saved.negativeText === "string") document.getElementById("bg-neg").value = saved.negativeText;
      syncNeg();
    } else {
      if (typeof saved.sceneText === "string") document.getElementById("anim-scene").value = saved.sceneText;
      applyLockState(document.getElementById("lock-anim-scene"), !!saved.sceneLocked);
      document.getElementById("anim-loop").checked = !!saved.loop;
      updateSceneHint();
      updateCameraTip();
    }
  }

  function generate(kind, opts) {
    const options = opts || {};
    const settings = readSettings(kind);
    const seedInput = document.getElementById(kind === "background" ? "bg-seed" : "anim-seed");
    if (!settings.seed) {
      settings.seed = "1847";
      seedInput.value = "1847";
      saveSettings(kind);
    }
    const previous = (kind === "background" ? state.bgBatch : state.animBatch)[0] || null;
    settings.turn = storedTurn(kind) + 1;
    setTurn(kind, settings.turn);
    let built;
    try {
      built = buildBatch(kind, settings);
    } catch (err) {
      failFlash(document.getElementById(kind === "background" ? "bg-generate" : "anim-generate"));
      toast("Could not write that prompt.", true);
      return;
    }
    const entry = toEntry(kind, built[0], settings);
    if (kind === "background") state.bgBatch = [entry];
    else state.animBatch = [entry];
    if (kind === "animation") {
      state.lastPinnedScene = built.filledScene || "";
      updateSceneHint(built.filledScene || "");
    }
    remember([entry]);
    if (settings.keywords) rememberKeyword(settings.keywords);
    renderBatch(kind);
    renderLibrary();
    toast("Prompt ready");
    flash(document.getElementById(kind === "background" ? "bg-generate" : "anim-generate"));
    const card = document.querySelector("#" + (kind === "background" ? "bg-output" : "anim-output") + " .card");
    if (options.focusFirst && card) setCurrent(card);
    if (previous && state.panelId === previous.id && card) openPanel(entry);
  }

  function promptsText(entries) {
    const includeNegative = copyNegativeOn() && entries.some(function (entry) { return !!entry.negative; });
    const sep = includeNegative ? "\n\n" : "\n";
    return entries.map(function (entry) { return entryCopyText(entry, includeNegative); }).join(sep);
  }

  function downloadText(filename, text, control) {
    try {
      const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(function () { URL.revokeObjectURL(url); }, 1500);
      flash(control);
      toast("Downloaded " + filename);
    } catch (err) {
      failFlash(control);
      toast("Could not download that file.", true);
    }
  }

  function sendToAnimation(entry, control) {
    const area = document.getElementById("anim-scene");
    if (!entry || !entry.text || !area) {
      failFlash(control);
      toast("Could not send that prompt.", true);
      return;
    }
    area.value = entry.text;
    applyLockState(document.getElementById("lock-anim-scene"), true);
    saveSettings("animation");
    updateSceneHint();
    closePanel();
    setActive("animation", { scroll: true });
    flash(control);
    flash(area);
    toast("Scene set.");
  }

  function updateSceneHint() {}

  function updateCameraTip() {}

  function fillPanel(entry) {
    state.panelId = entry.id;
    const meta = cardMetaTitle(entry);
    document.getElementById("detail-kicker").textContent = meta;
    document.getElementById("detail").title = meta;
    const animate = entry.kind === "background"
      ? '<button type="button" class="icon-btn" id="detail-animate" aria-label="Animate this" title="Animate this">' + svgUse("i-play") + "</button>"
      : "";
    const body = document.getElementById("detail-body");
    body.innerHTML = '<p class="prompt">' + esc(entry.text) + "</p>"
      + '<div class="detail-actions">'
      + '<button type="button" class="icon-btn" id="detail-copy" aria-label="Copy" title="Copy">' + svgUse("i-copy") + "</button>"
      + '<button type="button" class="icon-btn star' + (entry.starred ? " is-on" : "") + '" id="detail-star" aria-pressed="' + (entry.starred ? "true" : "false") + '" aria-label="' + (entry.starred ? "Remove from favourites" : "Add to favourites") + '" title="' + (entry.starred ? "Remove from favourites" : "Add to favourites") + '">' + starIcons() + "</button>"
      + animate
      + "</div>";
    body.querySelector("#detail-copy").addEventListener("click", function (event) {
      const live = findEntry(entry.id) || entry;
      const card = document.querySelector('.card[data-id="' + (window.CSS && CSS.escape ? CSS.escape(entry.id) : entry.id) + '"]');
      copyEntry(live, card, event.currentTarget);
    });
    body.querySelector("#detail-star").addEventListener("click", function (event) {
      const live = findEntry(entry.id) || entry;
      setStar(entry.id, !live.starred, event.currentTarget);
    });
    const animateButton = body.querySelector("#detail-animate");
    if (animateButton) {
      animateButton.addEventListener("click", function (event) {
        const live = findEntry(entry.id) || entry;
        sendToAnimation(live, event.currentTarget);
      });
    }
  }

  function openPanel(entry) {
    fillPanel(entry);
    const panel = document.getElementById("detail");
    panel.hidden = false;
    document.body.classList.add("panel-open");
  }

  function closePanel() {
    document.getElementById("detail").hidden = true;
    document.body.classList.remove("panel-open");
    state.panelId = null;
  }

  function setActive(id, opts) {
    const options = opts || {};
    if (!id) return;
    state.active = id;
    document.querySelectorAll("[data-jump]").forEach(function (link) {
      const on = link.dataset.jump === id;
      link.classList.toggle("is-active", on);
      if (on) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });
    if (options.scroll) {
      const el = document.getElementById(id);
      if (!el) return;
      const navH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--nav-h")) || 0;
      const top = Math.max(0, el.getBoundingClientRect().top + window.scrollY - navH - 6);
      const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: top, behavior: reduce ? "auto" : "smooth" });
    }
  }

  function cardsInActive() {
    const id = state.active === "animation" ? "anim-output" : state.active === "favourites" ? (state.shelf === "hist" ? "hist-list" : "fav-list") : "bg-output";
    const root = document.getElementById(id);
    if (!root) return [];
    return Array.prototype.slice.call(root.querySelectorAll(".card"));
  }

  function setShelf(which) {
    state.shelf = which === "hist" ? "hist" : "fav";
    const favOn = state.shelf === "fav";
    const favList = document.getElementById("fav-list");
    const histList = document.getElementById("hist-list");
    const favTab = document.getElementById("tab-fav");
    const histTab = document.getElementById("tab-hist");
    if (favList) favList.hidden = !favOn;
    if (histList) histList.hidden = favOn;
    if (favTab) {
      favTab.classList.toggle("is-on", favOn);
      favTab.setAttribute("aria-selected", favOn ? "true" : "false");
    }
    if (histTab) {
      histTab.classList.toggle("is-on", !favOn);
      histTab.setAttribute("aria-selected", favOn ? "false" : "true");
    }
  }

  function setSearchOpen(on) {
    const wrap = document.getElementById("search-pop");
    const input = document.getElementById("search");
    const button = document.getElementById("search-open");
    if (!wrap || !input) return;
    wrap.classList.toggle("is-open", !!on);
    input.tabIndex = on ? 0 : -1;
    if (button) button.setAttribute("aria-expanded", on ? "true" : "false");
    if (on) input.focus();
  }

  function closeLibraryMenu() {
    const menu = document.getElementById("library-menu");
    const button = document.getElementById("library-more");
    if (!menu || menu.hidden) return;
    menu.hidden = true;
    if (button) button.setAttribute("aria-expanded", "false");
  }

  function toggleLibraryMenu() {
    const menu = document.getElementById("library-menu");
    const button = document.getElementById("library-more");
    if (!menu) return;
    const open = menu.hidden;
    menu.hidden = !open;
    if (button) button.setAttribute("aria-expanded", open ? "true" : "false");
  }

  function moveCard(dir) {
    const cards = cardsInActive();
    if (!cards.length) {
      toast("No cards here yet. Press G to generate.", true);
      return;
    }
    let index = cards.indexOf(state.currentCard);
    if (index < 0) index = dir > 0 ? -1 : 0;
    const next = cards[(index + dir + cards.length) % cards.length];
    setCurrent(next);
    if (state.panelId) {
      const entry = findEntry(next.dataset.id);
      if (entry) openPanel(entry);
    }
  }

  function currentEntry() {
    if (!state.currentCard || !state.currentCard.isConnected) return null;
    return findEntry(state.currentCard.dataset.id);
  }

  function typingTarget(el) {
    if (!el || !el.tagName) return false;
    const tag = el.tagName;
    return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || el.isContentEditable;
  }

  function setModalInert(on) {
    ["nav", "page", "detail"].forEach(function (id) {
      const el = document.getElementById(id);
      if (el) el.inert = on;
    });
  }

  function settingsOpen() {
    const pop = document.getElementById("settings-pop");
    return !!(pop && !pop.hidden);
  }

  function openSettings() {
    const pop = document.getElementById("settings-pop");
    const button = document.getElementById("settings-open");
    if (!pop) return;
    pop.hidden = false;
    if (button) button.setAttribute("aria-expanded", "true");
  }

  function closeSettings() {
    const pop = document.getElementById("settings-pop");
    const button = document.getElementById("settings-open");
    if (!pop || pop.hidden) return;
    pop.hidden = true;
    if (button) button.setAttribute("aria-expanded", "false");
  }

  function openHelp() {
    closeSettings();
    document.getElementById("help").hidden = false;
    setModalInert(true);
    document.getElementById("help-close").focus();
  }

  function closeHelp() {
    document.getElementById("help").hidden = true;
    setModalInert(false);
  }

  let confirmResolver = null;
  function askConfirm(title, text, yesLabel) {
    return new Promise(function (resolve) {
      confirmResolver = resolve;
      document.getElementById("confirm-title").textContent = title;
      document.getElementById("confirm-text").textContent = text;
      document.getElementById("confirm-yes").textContent = yesLabel || "Clear";
      document.getElementById("confirm").hidden = false;
      setModalInert(true);
      document.getElementById("confirm-no").focus();
    });
  }

  function closeConfirm(result) {
    document.getElementById("confirm").hidden = true;
    setModalInert(false);
    if (confirmResolver) confirmResolver(!!result);
    confirmResolver = null;
  }

  function rollSeed(input, kind) {
    const next = String(1000 + Math.floor(Math.random() * 9000));
    input.value = next;
    setTurn(kind, 0);
    flash(input);
    saveSettings(kind);
    toast("New seed " + next + ". Generate to use it.");
  }

  function syncNeg() {
    const on = document.getElementById("bg-neg-on").checked;
    document.getElementById("bg-neg-wrap").classList.toggle("is-off", !on);
  }

  function syncCopyNeg(on) {
    document.querySelectorAll(".copy-neg-toggle").forEach(function (box) {
      box.checked = !!on;
    });
  }

  function bindCopyNeg() {
    syncCopyNeg(storageGet("moap.copyNegative") === "1");
    document.querySelectorAll(".copy-neg-toggle").forEach(function (box) {
      box.addEventListener("change", function () {
        const next = !!box.checked;
        storageSet("moap.copyNegative", next ? "1" : "0");
        syncCopyNeg(next);
        toast(next ? "Copy will include the negative prompt" : "Copy is the prompt only");
      });
    });
  }

  const GRADES = [
    { id: "clay", name: "Clay" },
    { id: "indigo", name: "Indigo" },
    { id: "moss", name: "Moss" }
  ];

  function gradeById(id) {
    for (let i = 0; i < GRADES.length; i += 1) {
      if (GRADES[i].id === id) return GRADES[i];
    }
    return GRADES[0];
  }

  function applyGrade(id, save) {
    const grade = gradeById(id);
    document.documentElement.setAttribute("data-grade", grade.id);
    const stored = storageGet("moap.cardGrade");
    if (save || (stored && stored !== grade.id)) storageSet("moap.cardGrade", grade.id);
    document.querySelectorAll(".grade-swatch").forEach(function (btn) {
      const on = btn.getAttribute("data-grade") === grade.id;
      btn.setAttribute("aria-pressed", on ? "true" : "false");
    });
    return grade;
  }

  function cycleGrade() {
    const current = document.documentElement.getAttribute("data-grade") || "clay";
    const index = GRADES.findIndex(function (grade) { return grade.id === current; });
    const next = GRADES[(index + 1) % GRADES.length];
    applyGrade(next.id, true);
    toast(next.name);
  }

  function toggleTheme() {
    const dark = document.documentElement.getAttribute("data-theme") === "dark";
    if (dark) {
      document.documentElement.removeAttribute("data-theme");
      storageSet("moap.theme", "light");
      toast("Parchment");
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      storageSet("moap.theme", "dark");
      toast("Sol & Shadow");
    }
    const btn = document.getElementById("theme-toggle");
    const nowDark = document.documentElement.getAttribute("data-theme") === "dark";
    btn.setAttribute("aria-pressed", nowDark ? "true" : "false");
    btn.setAttribute("aria-label", nowDark ? "Switch to parchment theme" : "Switch to Sol and Shadow");
  }

  function bindSlider(id, valueId, key, cssVar, map) {
    const input = document.getElementById(id);
    if (!input) return;
    const label = document.getElementById(valueId);
    function apply(raw, save) {
      const number = Number(raw);
      if (!Number.isFinite(number)) return;
      input.value = String(number);
      if (label) label.textContent = String(number);
      document.documentElement.style.setProperty(cssVar, map(number));
      if (save) storageSet(key, String(number));
    }
    const saved = storageGet(key);
    apply(saved || input.value, false);
    input.addEventListener("input", function () { apply(input.value, true); });
  }

  function fillSelect(select, items) {
    select.replaceChildren();
    const any = document.createElement("option");
    any.value = "any";
    any.textContent = "Any";
    select.appendChild(any);
    let groupName = null;
    let group = null;
    items.forEach(function (item, index) {
      const option = document.createElement("option");
      option.value = String(index);
      option.textContent = item.label;
      if (item.tip) option.title = item.tip;
      if (item.group) {
        if (item.group !== groupName) {
          groupName = item.group;
          group = document.createElement("optgroup");
          group.label = item.group;
          select.appendChild(group);
        }
        group.appendChild(option);
      } else {
        select.appendChild(option);
      }
    });
  }

  function measureNav() {
    const nav = document.getElementById("nav");
    document.documentElement.style.setProperty("--nav-h", nav.offsetHeight + "px");
  }

  function cleanImported(list, fallbackKind) {
    if (!Array.isArray(list)) return [];
    const out = [];
    list.forEach(function (item) {
      if (!item || typeof item.text !== "string" || !item.text.trim()) return;
      const kind = item.kind === "animation" || item.kind === "background" ? item.kind : fallbackKind;
      const parts = Array.isArray(item.parts)
        ? item.parts.filter(function (part) { return part && typeof part.text === "string"; }).map(function (part) {
          return { key: String(part.key || "note"), label: String(part.label || "Note"), text: part.text };
        })
        : [{ key: "subject", label: "Prompt", text: item.text }];
      out.push({
        id: typeof item.id === "string" && item.id ? item.id : makeId(),
        kind: kind,
        text: item.text,
        parts: parts,
        negative: typeof item.negative === "string" ? item.negative : "",
        stamp: typeof item.stamp === "string" ? item.stamp : "",
        stamp2: typeof item.stamp2 === "string" ? item.stamp2 : "",
        tip: typeof item.tip === "string" ? item.tip : "",
        cameraLabel: typeof item.cameraLabel === "string" ? item.cameraLabel : "",
        created: typeof item.created === "string" ? item.created : new Date().toISOString(),
        starred: !!item.starred
      });
    });
    return out;
  }

  function mergeImport(data) {
    if (Array.isArray(data)) data = { history: data, favourites: [] };
    if (!data || typeof data !== "object" || (!Array.isArray(data.history) && !Array.isArray(data.favourites) && !Array.isArray(data.favorites))) {
      throw new Error("unrecognized");
    }
    const incomingFav = cleanImported(data.favourites || data.favorites || [], "background");
    const incomingHist = cleanImported(data.history || [], "background");
    const lib = loadLibrary();
    let favAdded = 0;
    let histAdded = 0;
    incomingFav.forEach(function (entry) {
      entry.starred = true;
      if (!lib.favourites.some(function (have) { return have.id === entry.id; })) {
        lib.favourites.unshift(entry);
        favAdded += 1;
      }
    });
    incomingHist.forEach(function (entry) {
      if (!lib.history.some(function (have) { return have.id === entry.id; })) {
        lib.history.unshift(entry);
        histAdded += 1;
      }
    });
    lib.favourites = lib.favourites.slice(0, 400);
    lib.history = lib.history.slice(0, 100);
    if (!saveLibrary(lib)) throw new Error("save");
    return { fav: favAdded, hist: histAdded };
  }

  function copyVisibleLibrary() {
    const cards = cardsInActive();
    const entries = cards.map(function (card) { return findEntry(card.dataset.id); }).filter(Boolean);
    if (!entries.length) {
      toast("Nothing to copy in Favourites yet.", true);
      return;
    }
    copyText(promptsText(entries), null, "Copied " + entries.length + (entries.length === 1 ? " prompt" : " prompts"));
  }

  function onKey(event) {
    const helpOpen = !document.getElementById("help").hidden;
    const confirmOpen = !document.getElementById("confirm").hidden;
    if (confirmOpen) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeConfirm(false);
      }
      return;
    }
    if (helpOpen) {
      if (event.key === "Escape" || event.key === "?") {
        event.preventDefault();
        closeHelp();
      }
      return;
    }
    if (event.key === "Escape") {
      if (event.target && event.target.classList && event.target.classList.contains("keyword-input")) {
        event.preventDefault();
        closeRecentMenus();
        event.target.blur();
        return;
      }
      if (document.querySelector(".recent-toggle[aria-expanded='true']")) {
        event.preventDefault();
        closeRecentMenus();
        return;
      }
      if (event.target && event.target.id === "search") {
        event.preventDefault();
        event.target.value = "";
        renderLibrary();
        setSearchOpen(false);
        event.target.blur();
        return;
      }
      const libraryMenu = document.getElementById("library-menu");
      if (libraryMenu && !libraryMenu.hidden) {
        event.preventDefault();
        closeLibraryMenu();
        return;
      }
      const settings = document.getElementById("settings-pop");
      if (settings && !settings.hidden) {
        event.preventDefault();
        closeSettings();
        return;
      }
      if (state.panelId) {
        event.preventDefault();
        closePanel();
      }
      return;
    }
    if (typingTarget(event.target)) return;
    if (event.metaKey || event.ctrlKey || event.altKey) return;
    const key = event.key;
    if (key === "?") { event.preventDefault(); openHelp(); return; }
    if (key === "t" || key === "T") { event.preventDefault(); toggleTheme(); return; }
    if (key === "v" || key === "V") { event.preventDefault(); cycleGrade(); return; }
    if (key === "b" || key === "B") { event.preventDefault(); setActive("backgrounds", { scroll: true }); return; }
    if (key === "n" || key === "N") { event.preventDefault(); setActive("animation", { scroll: true }); return; }
    if (key === "f" || key === "F") { event.preventDefault(); setActive("favourites", { scroll: true }); return; }
    if (key === "g" || key === "G") {
      event.preventDefault();
      if (state.active === "favourites") {
        toast("Favourites keeps what you already made. Press B or N to generate.");
        return;
      }
      generate(state.active === "animation" ? "animation" : "background", { focusFirst: true });
      return;
    }
    if ((key === "j" || key === "J") && event.shiftKey) { event.preventDefault(); moveCard(-1); return; }
    if (key === "j" || key === "J") { event.preventDefault(); moveCard(1); return; }
    if (key === "k" || key === "K") { event.preventDefault(); focusKeywords(); return; }
    if (key === "c" || key === "C") {
      event.preventDefault();
      const entry = currentEntry();
      if (!entry) {
        toast(state.active === "favourites" ? "Press J to land on a plate first." : "Generate a prompt first.", true);
        return;
      }
      copyEntry(entry, state.currentCard);
      return;
    }
    if ((key === "a" || key === "A") && state.active === "favourites") {
      event.preventDefault();
      copyVisibleLibrary();
      return;
    }
    if (key === "s" || key === "S") {
      event.preventDefault();
      const entry = currentEntry();
      if (!entry) {
        toast(state.active === "favourites" ? "Press J to land on a plate first." : "Generate a prompt first.", true);
        return;
      }
      setStar(entry.id, !entry.starred);
      return;
    }
    if (key === "Enter") {
      if (event.target.closest && event.target.closest("button, a")) return;
      const entry = currentEntry();
      if (!entry) return;
      event.preventDefault();
      openPanel(entry);
    }
  }

  function bindLocks() {
    document.querySelectorAll(".lock").forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (btn.disabled || (btn.closest(".control") && btn.closest(".control").classList.contains("is-from-keywords"))) return;
        const on = btn.getAttribute("aria-pressed") !== "true";
        applyLockState(btn, on);
        flash(btn);
        const name = btn.dataset.name || "Setting";
        toast(on ? name + " pinned" : name + " can vary");
        saveSettings(btn.dataset.kind);
        if (btn.id === "lock-anim-scene") updateSceneHint(state.lastPinnedScene || "");
      });
    });
  }

  const keywordHold = {
    background: { value: "any", locked: false, held: false },
    animation: { locked: false, held: false }
  };

  function keywordModeState() {
    const modeRoot = document.getElementById("keyword-mode");
    const pressed = modeRoot ? modeRoot.querySelector('button[aria-pressed="true"]') : null;
    const describe = document.getElementById("keyword-describe");
    return {
      mode: pressed && pressed.dataset.mode ? pressed.dataset.mode : "world",
      describe: !!(describe && describe.checked)
    };
  }

  function setKeywordMode(mode, describe) {
    const modeRoot = document.getElementById("keyword-mode");
    if (modeRoot) {
      modeRoot.querySelectorAll("button").forEach(function (button) {
        button.setAttribute("aria-pressed", button.dataset.mode === mode ? "true" : "false");
      });
    }
    const box = document.getElementById("keyword-describe");
    if (box && typeof describe === "boolean") box.checked = describe;
  }

  function keywordBox(prefix) {
    const input = document.getElementById(prefix + "-keyword");
    const mode = keywordModeState();
    return {
      text: input ? input.value : "",
      mode: mode.mode,
      describe: mode.describe
    };
  }

  function keywordShared() {
    const button = document.getElementById("bg-keyword-share");
    return !button || button.getAttribute("aria-pressed") !== "false";
  }

  function setSharePressed(on) {
    document.querySelectorAll(".keyword-share").forEach(function (button) {
      button.setAttribute("aria-pressed", on ? "true" : "false");
    });
  }

  function applyKeywordBox(prefix, box, quiet) {
    const input = document.getElementById(prefix + "-keyword");
    if (input && input.value !== box.text) input.value = box.text;
    if (!quiet) setKeywordMode(box.mode || "world", !!box.describe);
    if (!quiet && keywordShared()) {
      const other = prefix === "bg" ? "anim" : "bg";
      applyKeywordBox(other, box, true);
    }
  }

  function saveKeywordMemory() {
    const bg = keywordBox("bg");
    const anim = keywordShared() ? bg : keywordBox("anim");
    storageSet("moap.keywords", JSON.stringify({ share: keywordShared(), bg: bg, anim: anim }));
  }

  function recentKeywordList() {
    try {
      const list = JSON.parse(storageGet("moap.keywordRecent") || "[]");
      if (!Array.isArray(list)) return [];
      return list.filter(function (item) { return typeof item === "string" && item.trim(); }).slice(0, 10);
    } catch (err) {
      return [];
    }
  }

  function closeRecentMenus() {
    document.querySelectorAll(".recent-toggle").forEach(function (toggle) {
      toggle.setAttribute("aria-expanded", "false");
      const menu = document.getElementById(toggle.getAttribute("aria-controls"));
      if (menu) menu.hidden = true;
    });
  }

  function renderRecentKeywords() {
    const list = recentKeywordList();
    ["bg", "anim"].forEach(function (prefix) {
      const toggle = document.getElementById(prefix + "-keyword-recent");
      const menu = document.getElementById(prefix + "-keyword-recent-list");
      if (!toggle || !menu) return;
      const open = toggle.getAttribute("aria-expanded") === "true" && list.length > 0;
      menu.replaceChildren();
      toggle.disabled = list.length === 0;
      toggle.setAttribute("aria-label", list.length ? "Recent keywords" : "No recent keywords");
      list.forEach(function (item) {
        const li = document.createElement("li");
        li.setAttribute("role", "presentation");
        const button = document.createElement("button");
        button.type = "button";
        button.className = "recent-item";
        button.setAttribute("role", "option");
        button.textContent = item;
        button.title = "Double-click to copy";
        button.addEventListener("click", function () {
          const input = document.getElementById(prefix + "-keyword");
          input.value = item;
          if (keywordShared()) {
            document.getElementById(prefix === "bg" ? "anim-keyword" : "bg-keyword").value = item;
          }
          saveKeywordMemory();
          refreshKeywordLocks();
        });
        button.addEventListener("dblclick", function (event) {
          event.preventDefault();
          copyText(item, null, "Copied keyword");
          closeRecentMenus();
        });
        li.appendChild(button);
        menu.appendChild(li);
      });
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      menu.hidden = !open;
    });
  }

  function rememberKeyword(text) {
    const value = String(text || "").trim();
    if (!value) return;
    const list = recentKeywordList().filter(function (item) { return item.toLowerCase() !== value.toLowerCase(); });
    list.unshift(value);
    storageSet("moap.keywordRecent", JSON.stringify(list.slice(0, 10)));
    renderRecentKeywords();
  }

  function lockThemeFromKeywords(on) {
    const select = document.getElementById("bg-scene");
    const lock = document.getElementById("lock-bg-scene");
    const control = lock.closest(".control");
    if (on) {
      if (!keywordHold.background.held) {
        keywordHold.background.value = select.value === "keywords" ? "any" : select.value;
        keywordHold.background.locked = lock.getAttribute("aria-pressed") === "true";
        keywordHold.background.held = true;
      }
      let option = select.querySelector('option[value="keywords"]');
      if (!option) {
        option = document.createElement("option");
        option.value = "keywords";
        option.textContent = "From keywords";
        select.insertBefore(option, select.firstChild);
      }
      select.value = "keywords";
      select.disabled = true;
      lock.disabled = true;
      applyLockState(lock, true);
      control.classList.add("is-from-keywords");
      return;
    }
    if (!keywordHold.background.held && select.value !== "keywords") return;
    select.disabled = false;
    lock.disabled = false;
    control.classList.remove("is-from-keywords");
    const option = select.querySelector('option[value="keywords"]');
    if (option) option.remove();
    select.value = keywordHold.background.value || "any";
    if (!select.value || select.value === "keywords") select.value = "any";
    applyLockState(lock, keywordHold.background.locked);
    keywordHold.background.held = false;
  }

  function lockSceneFromKeywords(on) {
    const area = document.getElementById("anim-scene");
    const lock = document.getElementById("lock-anim-scene");
    const control = lock.closest(".control");
    if (on) {
      if (!keywordHold.animation.held) {
        keywordHold.animation.locked = lock.getAttribute("aria-pressed") === "true";
        keywordHold.animation.held = true;
      }
      area.disabled = true;
      lock.disabled = true;
      applyLockState(lock, true);
      control.classList.add("is-from-keywords");
      return;
    }
    if (!keywordHold.animation.held) return;
    area.disabled = false;
    lock.disabled = false;
    control.classList.remove("is-from-keywords");
    applyLockState(lock, keywordHold.animation.locked);
    keywordHold.animation.held = false;
    updateSceneHint(state.lastPinnedScene || "");
  }

  function refreshKeywordLocks() {
    lockThemeFromKeywords(keywordsImplyPlace(keywordBox("bg").text));
    lockSceneFromKeywords(keywordsImplyPlace(keywordBox("anim").text));
  }

  function restoreKeywordMemory() {
    let saved = null;
    try { saved = JSON.parse(storageGet("moap.keywords") || "null"); } catch (err) { saved = null; }
    const share = !saved || saved.share !== false;
    const bg = saved && saved.bg ? saved.bg : { text: "", mode: "world", describe: false };
    const anim = share ? bg : (saved && saved.anim ? saved.anim : { text: "", mode: "world", describe: false });
    const mode = (bg && bg.mode) || (anim && anim.mode) || "world";
    const describe = !!(bg && bg.describe);
    setSharePressed(share);
    setKeywordMode(mode, describe);
    applyKeywordBox("bg", { text: String(bg.text || ""), mode: mode, describe: describe }, true);
    applyKeywordBox("anim", { text: String(anim.text || ""), mode: mode, describe: describe }, true);
    renderRecentKeywords();
    refreshKeywordLocks();
  }

  function focusKeywords() {
    if (state.active === "favourites") setActive("backgrounds");
    const id = state.active === "animation" ? "anim-keyword" : "bg-keyword";
    const input = document.getElementById(id);
    if (!input) return;
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    input.scrollIntoView({ block: "center", behavior: reduce ? "auto" : "smooth" });
    input.focus({ preventScroll: true });
  }

  function bindKeywords() {
    ["bg", "anim"].forEach(function (prefix) {
      const input = document.getElementById(prefix + "-keyword");
      input.addEventListener("input", function () {
        if (keywordShared()) {
          document.getElementById(prefix === "bg" ? "anim-keyword" : "bg-keyword").value = input.value;
        }
        saveKeywordMemory();
        refreshKeywordLocks();
      });
      const recent = document.getElementById(prefix + "-keyword-recent");
      recent.addEventListener("click", function () {
        const open = recent.getAttribute("aria-expanded") === "true";
        closeRecentMenus();
        if (open || recent.disabled) return;
        recent.setAttribute("aria-expanded", "true");
        document.getElementById(prefix + "-keyword-recent-list").hidden = false;
      });
    });
    const describeBox = document.getElementById("keyword-describe");
    if (describeBox) {
      describeBox.addEventListener("change", function () {
        saveKeywordMemory();
        toast(this.checked ? "Brand names will be described" : "Keywords stay as written");
      });
    }
    const modeRoot = document.getElementById("keyword-mode");
    if (modeRoot) {
      modeRoot.addEventListener("click", function (event) {
        const button = event.target.closest("button");
        if (!button || !button.dataset.mode) return;
        setKeywordMode(button.dataset.mode, !!(describeBox && describeBox.checked));
        saveKeywordMemory();
        const names = { world: "World", blend: "Blend", exact: "Exact" };
        toast(names[button.dataset.mode] || "World");
      });
    }
    document.addEventListener("click", function (event) {
      if (!event.target.closest(".recent-menu")) closeRecentMenus();
      if (!event.target.closest("#settings-pop, #settings-open")) closeSettings();
      if (!event.target.closest(".overflow-menu")) closeLibraryMenu();
      const searchPop = document.getElementById("search-pop");
      const search = document.getElementById("search");
      if (searchPop && search && !event.target.closest("#search-pop") && !search.value.trim()) setSearchOpen(false);
    });
    document.querySelectorAll(".keyword-share").forEach(function (button) {
      button.addEventListener("click", function () {
        const next = button.getAttribute("aria-pressed") !== "true";
        setSharePressed(next);
        if (next) {
          const bg = keywordBox("bg");
          applyKeywordBox("anim", bg, true);
        }
        saveKeywordMemory();
        refreshKeywordLocks();
        toast(next ? "Keywords are shared" : "Each section keeps its own keywords");
      });
    });
  }

  function init() {
    if (!BANKS) {
      toast("Word banks failed to load.", true);
      return;
    }
    BG_KEYS.forEach(function (key) { fillSelect(document.getElementById("bg-" + key), bankFor(key)); });
    ANIM_KEYS.forEach(function (key) { fillSelect(document.getElementById("anim-" + key), bankFor(key)); });
    restoreSettings("background");
    restoreSettings("animation");
    restoreKeywordMemory();
    bindKeywords();
    if (!storageGet("moap.bg")) syncNeg();
    updateCameraTip();
    updateSceneHint();
    renderLibrary();
    setActive("backgrounds");

    bindLocks();
    bindCopyNeg();

    document.getElementById("bg-generate").addEventListener("click", function () { generate("background"); });
    document.getElementById("anim-generate").addEventListener("click", function () { generate("animation"); });
    document.getElementById("bg-dice").addEventListener("click", function () { rollSeed(document.getElementById("bg-seed"), "background"); });
    document.getElementById("anim-dice").addEventListener("click", function () { rollSeed(document.getElementById("anim-seed"), "animation"); });
    document.getElementById("bg-clean").addEventListener("change", function () { saveSettings("background"); toast(this.checked ? "Clean background on" : "Clean background off"); });
    document.getElementById("bg-neg-on").addEventListener("change", function () {
      syncNeg();
      saveSettings("background");
      toast(this.checked ? "Negative prompt will be included" : "Negative prompt hidden");
    });
    document.getElementById("bg-neg").addEventListener("input", function () { saveSettings("background"); });
    document.getElementById("anim-loop").addEventListener("change", function () {
      saveSettings("animation");
      toast(this.checked ? "Seamless loop on" : "Seamless loop off");
    });
    document.getElementById("anim-scene").addEventListener("input", function () {
      saveSettings("animation");
      updateSceneHint();
    });
    document.getElementById("anim-scene-clear").addEventListener("click", function () {
      const area = document.getElementById("anim-scene");
      area.value = "";
      applyLockState(document.getElementById("lock-anim-scene"), false);
      state.lastPinnedScene = "";
      saveSettings("animation");
      updateSceneHint();
      flash(document.getElementById("anim-scene-clear"));
      flash(area);
      toast("Scene cleared.");
    });
    document.getElementById("anim-camera").addEventListener("change", function () {
      updateCameraTip();
      saveSettings("animation");
    });

    ["bg", "anim"].forEach(function (prefix) {
      const keys = prefix === "bg" ? BG_KEYS : ANIM_KEYS;
      keys.forEach(function (key) {
        const select = document.getElementById(prefix + "-" + key);
        select.addEventListener("change", function () { saveSettings(prefix === "bg" ? "background" : "animation"); });
      });
      document.getElementById(prefix + "-seed").addEventListener("change", function () {
        const kind = prefix === "bg" ? "background" : "animation";
        setTurn(kind, 0);
        saveSettings(kind);
      });
    });

    document.getElementById("theme-toggle").addEventListener("click", toggleTheme);
    applyGrade(document.documentElement.getAttribute("data-grade") || storageGet("moap.cardGrade") || "clay", false);
    document.querySelectorAll(".grade-swatch").forEach(function (btn) {
      btn.addEventListener("click", function () {
        const grade = applyGrade(btn.getAttribute("data-grade"), true);
        toast(grade.name);
      });
    });
    document.getElementById("settings-open").addEventListener("click", function () {
      if (settingsOpen()) closeSettings();
      else openSettings();
    });
    document.getElementById("help-open").addEventListener("click", openHelp);
    document.getElementById("help-close").addEventListener("click", closeHelp);
    document.getElementById("help").addEventListener("click", function (event) {
      if (event.target.id === "help") closeHelp();
    });
    document.getElementById("confirm-yes").addEventListener("click", function () { closeConfirm(true); });
    document.getElementById("confirm-no").addEventListener("click", function () { closeConfirm(false); });
    document.getElementById("detail-close").addEventListener("click", closePanel);
    document.querySelectorAll("[data-jump]").forEach(function (link) {
      link.addEventListener("click", function () { setActive(link.dataset.jump); });
    });

    document.getElementById("tab-fav").addEventListener("click", function () { setShelf("fav"); });
    document.getElementById("tab-hist").addEventListener("click", function () { setShelf("hist"); });
    document.getElementById("search-open").addEventListener("click", function () {
      const open = document.getElementById("search-pop").classList.contains("is-open");
      setSearchOpen(!open);
    });
    document.getElementById("search").addEventListener("input", renderLibrary);
    document.getElementById("library-more").addEventListener("click", function () { toggleLibraryMenu(); });
    document.getElementById("export").addEventListener("click", function () {
      const lib = loadLibrary();
      const payload = {
        version: 1,
        exported: new Date().toISOString(),
        favourites: lib.favourites,
        history: lib.history
      };
      closeLibraryMenu();
      downloadText("prompt-folio-library.json", JSON.stringify(payload, null, 2), document.getElementById("library-more"));
    });
    document.getElementById("import-btn").addEventListener("click", function () {
      closeLibraryMenu();
      document.getElementById("import-file").click();
    });
    document.getElementById("import-file").addEventListener("change", function (event) {
      const file = event.target.files && event.target.files[0];
      event.target.value = "";
      if (!file) return;
      const reader = new FileReader();
      reader.onerror = function () {
        failFlash(document.getElementById("library-more"));
        toast("Could not read that file.", true);
      };
      reader.onload = function () {
        try {
          const result = mergeImport(JSON.parse(String(reader.result)));
          renderLibrary();
          flash(document.getElementById("library-more"));
          toast("Imported " + result.fav + " favourites and " + result.hist + " history notes.");
        } catch (err) {
          failFlash(document.getElementById("library-more"));
          toast("Import failed. Choose a JSON file exported from this folio.", true);
        }
      };
      reader.readAsText(file);
    });

    document.getElementById("library-clear").addEventListener("click", async function () {
      closeLibraryMenu();
      const more = document.getElementById("library-more");
      if (state.shelf === "hist") {
        const ok = await askConfirm("Clear history?", "This removes the generations kept in this browser. Favourites stay.", "Clear history");
        if (!ok) { toast("History kept"); return; }
        const lib = loadLibrary();
        lib.history = [];
        if (!saveLibrary(lib)) { failFlash(more); return; }
        renderLibrary();
        flash(more);
        toast("History cleared");
        return;
      }
      const ok = await askConfirm("Clear favourites?", "Stars are removed. History stays. This cannot be undone.", "Clear favourites");
      if (!ok) { toast("Favourites kept"); return; }
      const lib = loadLibrary();
      const ids = lib.favourites.map(function (entry) { return entry.id; });
      lib.favourites = [];
      lib.history.forEach(function (entry) { entry.starred = false; });
      if (!saveLibrary(lib)) { failFlash(more); return; }
      state.bgBatch.concat(state.animBatch).forEach(function (entry) {
        if (ids.indexOf(entry.id) >= 0) entry.starred = false;
      });
      ids.forEach(function (id) { syncStarDom(id, false); });
      renderLibrary();
      flash(more);
      toast("Favourites cleared");
    });

    bindSlider("text-size", "text-size-val", "moap.textScale", "--text-scale", function (n) { return String(n / 100); });
    bindSlider("panel-size", "panel-size-val", "moap.panel", "--panel", function (n) { return String(n); });
    bindSlider("bg-photo", "bg-photo-val", "moap.bgPhoto", "--bg-photo", function (n) { return String(n); });

    const dark = document.documentElement.getAttribute("data-theme") === "dark";
    const themeBtn = document.getElementById("theme-toggle");
    themeBtn.setAttribute("aria-pressed", dark ? "true" : "false");
    themeBtn.setAttribute("aria-label", dark ? "Switch to parchment theme" : "Switch to Sol and Shadow");

    document.addEventListener("keydown", onKey);
    measureNav();
    if (window.ResizeObserver) {
      const observer = new ResizeObserver(measureNav);
      observer.observe(document.getElementById("nav"));
    } else {
      window.addEventListener("resize", measureNav);
    }
    const sections = ["backgrounds", "animation", "favourites"].map(function (id) { return document.getElementById(id); });
    if (window.IntersectionObserver) {
      const watcher = new IntersectionObserver(function (entries) {
        const visible = entries.filter(function (entry) { return entry.isIntersecting; });
        if (!visible.length) return;
        visible.sort(function (a, b) { return b.intersectionRatio - a.intersectionRatio; });
        setActive(visible[0].target.id);
      }, { rootMargin: "-18% 0px -55% 0px", threshold: [0.1, 0.25, 0.5] });
      sections.forEach(function (section) { watcher.observe(section); });
    }
  }

  globalThis.MOAP = {
    buildBatch: buildBatch,
    hashSeed: hashSeed,
    mulberry32: mulberry32,
    period: period
  };

  if (typeof document !== "undefined") {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
    else init();
  }
})();

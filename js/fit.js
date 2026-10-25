/* Compatibility for The Prompt Folio.
   Tags live here so the word banks stay readable.
   Locked or chosen values are kept; everything else is filtered to agree.
   A contradictory pair still generates, and warnings() names it. */
(function () {
  const TIME_TAGS = {
    "Blue hour": ["rain"],
    "Light rain": ["rain"],
    "Just rained": ["rain"],
    "Drizzle": ["rain"],
    "Thunder far": ["rain", "storm"],
    "Sun shower": ["rain"],
    "Morning fog": ["fog", "clouds"],
    "Sea mist": ["fog", "clouds"],
    "Low cloud": ["fog", "clouds"],
    "Dry wind": ["wind"],
    "Gusts": ["wind"],
    "Calm": ["calm"],
    "Falling snow": ["snow"],
    "Fresh snow": ["snow"],
    "Frost": ["snow"],
    "Heat shimmer": ["heat", "dust"],
    "Humid": ["heat"],
    "Dry heat": ["heat", "dust"],
    "Clearing storm": ["storm"],
    "Eclipse dim": ["clouds"]
  };

  const LIGHT_TAGS = {
    "Fog diffusion": ["fog", "clouds"],
    "Overcast sea": ["clouds", "maritime"],
    "Late sun": ["dust"],
    "Backlit dust": ["dust"],
    "Storm break": ["storm", "clouds"],
    "Lightning far": ["storm"],
    "Underwater shafts": ["caustic", "underwater"],
    "After rain": ["rain"],
    "Snow bounce": ["snow"],
    "Heat haze": ["heat", "dust"]
  };

  const MOOD_TAGS = {
    "Windswept": ["wind"],
    "Breezy": ["wind"]
  };

  const MOTION_TAGS = {
    "Drifting clouds": ["clouds", "lapse"],
    "Cloud shadows": ["clouds", "shadow", "lapse"],
    "Fog bank": ["clouds", "fog", "lapse"],
    "Heat shimmer": ["heat", "dust"],
    "Flowing water": ["water"],
    "Falling rain": ["rain"],
    "Puddle rings": ["rain"],
    "Waves": ["water"],
    "River surface": ["water"],
    "Waterfall mist": ["water"],
    "Falling snow": ["snow"],
    "Snow on glass": ["snow"],
    "Breath of powder": ["snow", "wind"],
    "Swaying grass": ["wind", "lush"],
    "Leaves": ["wind", "lush"],
    "Wheat": ["wind", "lush"],
    "Curtains": ["wind", "interior"],
    "Laundry": ["wind", "city"],
    "Dust particles": ["dust", "particles"],
    "Pollen": ["wind", "lush"],
    "Steam": ["interior"],
    "Smoke": ["interior"],
    "Embers": ["interior"],
    "Light trails": ["trails", "city", "lapse"],
    "Flickering neon": ["city", "trails"],
    "Candle": ["interior"],
    "Sunbeam shift": ["shadow", "lapse", "interior"],
    "Shadow branches": ["shadow", "lapse"],
    "City blink": ["city", "trails", "lapse"],
    "Character walking": ["walk"],
    "Birds crossing": ["sky"],
    "Butterflies": ["nature"],
    "Fish school": ["fish"],
    "Distant herd": ["nature"],
    "Pages": ["wind", "interior"],
    "Ink bloom": ["interior"],
    "Wheel": ["interior"],
    "Mobile": ["interior"],
    "Pouring": ["interior"],
    "Passing train": ["city"],
    "Boat wake": ["water", "boat"],
    "Stars wheeling": ["stars", "lapse"],
    "Aurora": ["sky"],
    "Fireflies": ["nature"],
    "Rising bubbles": ["bubbles", "underwater"],
    "Bubble curtain": ["bubbles", "underwater"],
    "Caustic shimmer": ["caustic", "underwater", "lapse"],
    "Drifting particulate": ["particles", "underwater"],
    "Silt curtain": ["particles", "underwater"],
    "Kelp sway": ["underwater"],
    "Shaft wander": ["caustic", "underwater", "shadow", "lapse"],
    "Jelly pulse": ["underwater"],
    "Dust plume": ["dust", "space", "particles"],
    "Panel blink": ["space"],
    "Ring shadow crawl": ["space", "shadow", "lapse"],
    "Starfield drift": ["stars", "space", "lapse"]
  };

  function has(item, tag) {
    return !!(item && item.tags && item.tags.indexOf(tag) >= 0);
  }

  function any(item, tags) {
    if (!item || !item.tags) return false;
    for (let i = 0; i < tags.length; i += 1) {
      if (item.tags.indexOf(tags[i]) >= 0) return true;
    }
    return false;
  }

  function placeOf(scene) {
    if (!scene) return "";
    if (scene.label === "Glass house") return "interior";
    if (scene.label === "Kiln yard" || scene.label === "Dye vats") return "yard";
    if (scene.group === "Workshop") return "interior";
    const map = {
      Nature: "nature",
      Coast: "coast",
      Desert: "desert",
      City: "city",
      Interior: "interior",
      Fantasy: "fantasy",
      Underwater: "underwater",
      Space: "space",
      Abstract: "abstract",
      Workshop: "interior"
    };
    return map[scene.group] || "";
  }

  function tagList(map, item) {
    return (map[item.label] || []).slice();
  }

  function cameraTags(item) {
    const tags = [];
    if (item.group === "Drone") tags.push("drone");
    if (item.group === "Orbit") tags.push("orbit");
    if (item.group === "Push") tags.push("push");
    if (item.group === "Handheld") tags.push("handheld");
    if (item.label === "Follow pan" || item.label === "Shoulder follow" || item.label === "Walking handheld") {
      tags.push("track");
    }
    return tags;
  }

  function filmTags(item) {
    if (item.label === "Timelapse" || item.label === "Day-to-night lapse") return ["timelapse"];
    return [];
  }

  function annotate(banks) {
    if (!banks) return;
    (banks.scenes || []).forEach(function (item) {
      item.place = placeOf(item);
      item.tags = item.place ? [item.place] : [];
    });
    (banks.times || []).forEach(function (item) { item.tags = tagList(TIME_TAGS, item); });
    (banks.lighting || []).forEach(function (item) { item.tags = tagList(LIGHT_TAGS, item); });
    (banks.moods || []).forEach(function (item) { item.tags = tagList(MOOD_TAGS, item); });
    (banks.motions || []).forEach(function (item) { item.tags = tagList(MOTION_TAGS, item); });
    (banks.cameras || []).forEach(function (item) { item.tags = cameraTags(item); });
    (banks.films || []).forEach(function (item) { item.tags = filmTags(item); });
  }

  function matchScene(text) {
    const banks = globalThis.MOAP_BANKS;
    if (!text || !banks) return null;
    const lower = String(text).toLowerCase();
    const scenes = banks.scenes || [];
    for (let i = 0; i < scenes.length; i += 1) {
      const sentence = String(scenes[i].text || "").toLowerCase();
      if (sentence && lower.indexOf(sentence) >= 0) return scenes[i];
    }
    return null;
  }

  function inferPlace(text) {
    const known = matchScene(text);
    if (known) return placeOf(known);
    const lower = String(text || "").toLowerCase();
    if (!lower) return "";
    const rules = [
      ["underwater", /underwater|kelp forest|coral|seagrass|sunken courtyard|drop-off/],
      ["space", /quiet orbit|gas giant|moon rock|rust-coloured planet|starfield|spacecraft/],
      ["desert", /\bdesert\b|\bdunes?\b|\bmesas?\b|\bcanyon\b|\badobe\b|dry riverbed|date palms/],
      ["interior", /\broom\b|potter|reading nook|hearth|weaving loft|archive desk|bath room|beeswax/],
      ["city", /\bstreet\b|\bboulevard\b|rooftops|cafe chairs|tiled stair|\bkiosk\b/],
      ["coast", /\bcove\b|\bbeach\b|\bharbour\b|\btide\b|driftwood|cliff edge/],
      ["nature", /olive grove|cedar forest|meadow|birch|marsh|orchard|\bravine\b/]
    ];
    for (let i = 0; i < rules.length; i += 1) {
      if (rules[i][1].test(lower)) return rules[i][0];
    }
    return "";
  }

  function context(args) {
    const shared = (args && args.shared) || {};
    const partial = (args && args.partial) || {};
    const settings = (args && args.settings) || {};
    const scene = partial.scene || shared.scene || null;
    const motion = partial.motion || shared.motion || null;
    const camera = partial.camera || shared.camera || null;
    const film = partial.film || shared.film || null;
    const time = partial.time || shared.time || null;
    const lighting = partial.lighting || shared.lighting || null;
    let place = scene ? placeOf(scene) : "";
    if (!place && settings.sceneText) place = inferPlace(settings.sceneText);
    return {
      place: place,
      scene: scene,
      motion: motion,
      camera: camera,
      film: film,
      time: time,
      lighting: lighting,
      walk: !!(motion && has(motion, "walk")),
      timelapse: !!(film && has(film, "timelapse"))
    };
  }

  function placeRejectsTime(place, item) {
    if (!place || !item || place === "abstract") return false;
    const bad = {
      desert: ["rain", "snow", "storm"],
      space: ["rain", "snow", "storm", "wind", "fog", "clouds"],
      underwater: ["rain", "snow", "storm", "wind", "fog", "clouds"],
      interior: ["rain", "snow", "storm", "wind"]
    }[place];
    return !!(bad && any(item, bad));
  }

  function placeRejectsLighting(place, item) {
    if (!place || !item || place === "abstract") return false;
    const bad = {
      desert: ["rain", "snow", "storm", "maritime"],
      space: ["rain", "snow", "storm", "fog", "clouds", "underwater", "caustic", "maritime"],
      underwater: ["rain", "snow", "storm", "heat", "dust", "fog", "clouds", "maritime"],
      interior: ["rain", "snow", "storm", "heat", "maritime"]
    }[place];
    return !!(bad && any(item, bad));
  }

  function placeRejectsMood(place, item) {
    if (!place || !item) return false;
    if ((place === "underwater" || place === "space" || place === "interior") && has(item, "wind")) return true;
    return false;
  }

  function outdoorIndoorOnly(place, item) {
    if (!has(item, "interior") || has(item, "shadow") || has(item, "lapse")) return false;
    return place !== "interior" && place !== "city" && place !== "fantasy" && place !== "yard" && place !== "abstract";
  }

  function placeRejectsMotion(place, item) {
    if (!place || !item || place === "abstract") return false;
    if (place !== "space" && has(item, "space")) return true;
    if (place !== "underwater" && any(item, ["underwater", "bubbles", "caustic"])) return true;
    if (outdoorIndoorOnly(place, item)) return true;
    if (place === "desert") {
      return any(item, ["rain", "snow", "storm", "water", "fish", "city", "trails", "boat", "lush"]);
    }
    if (place === "space") {
      if (!any(item, ["dust", "heat", "stars", "space", "particles"])) return true;
      return any(item, ["rain", "snow", "wind", "water", "clouds", "walk", "city", "fish", "boat", "lush"]);
    }
    if (place === "underwater") {
      if (!any(item, ["underwater", "fish", "bubbles", "caustic", "particles"])) return true;
      return any(item, ["wind", "clouds", "rain", "snow", "walk", "city", "water", "boat", "dust", "lush"]);
    }
    if (place === "interior") {
      if (any(item, ["rain", "snow", "storm", "clouds", "water", "city", "trails", "fish", "sky", "stars", "nature", "wind", "heat", "boat", "lush"])) {
        return !has(item, "interior");
      }
      return false;
    }
    if (place === "nature") return any(item, ["city", "trails", "boat", "fish"]);
    if (place === "fantasy") return any(item, ["city", "trails"]);
    if (place === "coast") return any(item, ["city", "trails", "space"]);
    if (place === "city") return any(item, ["fish", "lush", "space"]);
    if (place === "yard") return any(item, ["fish", "city", "trails", "boat", "space"]);
    return false;
  }

  function placeRejectsCamera(place, camera) {
    if (!place || !camera) return false;
    if ((place === "interior" || place === "underwater") && has(camera, "drone")) return true;
    return false;
  }

  function pairsWithWalk(camera) {
    return has(camera, "track") || has(camera, "push") || has(camera, "handheld");
  }

  function motionRejectsCamera(motion, camera) {
    if (!motion || !camera || !has(motion, "walk")) return false;
    if (has(camera, "orbit") || has(camera, "drone")) return true;
    return !pairsWithWalk(camera);
  }

  function isLapseMotion(motion) {
    return any(motion, ["lapse", "clouds", "trails", "shadow"]);
  }

  function sceneOk(scene, ctx) {
    const place = placeOf(scene);
    if (ctx.time && placeRejectsTime(place, ctx.time)) return false;
    if (ctx.lighting && placeRejectsLighting(place, ctx.lighting)) return false;
    if (ctx.motion && placeRejectsMotion(place, ctx.motion)) return false;
    if (ctx.camera && placeRejectsCamera(place, ctx.camera)) return false;
    return true;
  }

  function allows(item, key, ctx) {
    const here = ctx || {};
    if (key === "scene") return sceneOk(item, here);
    if (key === "time") return !placeRejectsTime(here.place, item);
    if (key === "lighting") return !placeRejectsLighting(here.place, item);
    if (key === "mood") return !placeRejectsMood(here.place, item);
    if (key === "motion") {
      if (here.place && placeRejectsMotion(here.place, item)) return false;
      if (here.timelapse && !isLapseMotion(item)) return false;
      if (here.camera && motionRejectsCamera(item, here.camera)) return false;
      return true;
    }
    if (key === "camera") {
      if (here.place && placeRejectsCamera(here.place, item)) return false;
      if (here.walk && motionRejectsCamera({ tags: ["walk"] }, item)) return false;
      return true;
    }
    if (key === "film") {
      if (!has(item, "timelapse") || !here.motion) return true;
      return isLapseMotion(here.motion);
    }
    return true;
  }

  function preferred(list, key, ctx) {
    let items = null;
    let chance = 0;
    if (key === "time" && ctx.place === "desert") {
      items = list.filter(function (item) { return any(item, ["heat", "dust"]); });
      chance = 0.45;
    } else if (key === "lighting" && ctx.place === "underwater") {
      items = list.filter(function (item) { return has(item, "caustic"); });
      chance = 0.4;
    } else if (key === "motion" && ctx.place === "underwater") {
      items = list.filter(function (item) { return any(item, ["bubbles", "caustic", "particles"]); });
      chance = 0.62;
    } else if (key === "motion" && ctx.place === "desert") {
      items = list.filter(function (item) { return any(item, ["dust", "heat"]); });
      chance = 0.42;
    } else if (key === "motion" && ctx.place === "city") {
      items = list.filter(function (item) { return any(item, ["trails", "city"]); });
      chance = 0.34;
    }
    if (!items || !items.length || items.length >= list.length) return null;
    return { items: items, chance: chance };
  }

  function pickFrom(rng, list) {
    return list[Math.floor(rng() * list.length)];
  }

  function pick(rng, pool, key, ctx) {
    const here = ctx || {};
    const list = (pool || []).filter(function (item) { return allows(item, key, here); });
    const source = list.length ? list : (pool || []);
    const prefer = preferred(source, key, here);
    if (prefer && rng() < prefer.chance) {
      return { item: pickFrom(rng, prefer.items), forced: !list.length };
    }
    return { item: pickFrom(rng, source), forced: !list.length };
  }

  function nicePlace(place) {
    return {
      desert: "desert",
      space: "space",
      underwater: "underwater",
      interior: "an interior",
      nature: "deep nature",
      coast: "the coast",
      city: "the city",
      yard: "the yard",
      fantasy: "this place",
      abstract: "this place"
    }[place] || "this place";
  }

  function niceItem(item) {
    return String((item && item.label) || "this choice").toLowerCase();
  }

  function warnings(chosen, forced) {
    const item = chosen || {};
    const user = forced || {};
    const place = item.place || (item.scene ? placeOf(item.scene) : "");
    const where = nicePlace(place);
    const notes = [];
    function wanted(keys) {
      for (let i = 0; i < keys.length; i += 1) {
        if (user[keys[i]]) return true;
      }
      return false;
    }
    if (item.time && placeRejectsTime(place, item.time) && wanted(["scene", "sceneText", "time"])) {
      notes.push(where + " with " + niceItem(item.time));
    }
    if (item.lighting && placeRejectsLighting(place, item.lighting) && wanted(["scene", "sceneText", "lighting"])) {
      notes.push(where + " with " + niceItem(item.lighting));
    }
    if (item.mood && placeRejectsMood(place, item.mood) && wanted(["scene", "sceneText", "mood"])) {
      notes.push(where + " with " + niceItem(item.mood));
    }
    if (item.motion && placeRejectsMotion(place, item.motion) && wanted(["scene", "sceneText", "motion"])) {
      notes.push(where + " with " + niceItem(item.motion));
    }
    if (item.camera && placeRejectsCamera(place, item.camera) && wanted(["scene", "sceneText", "camera"])) {
      notes.push(where + " with " + niceItem(item.camera));
    }
    if (item.motion && item.camera && motionRejectsCamera(item.motion, item.camera) && wanted(["motion", "camera"])) {
      notes.push("a walking figure with " + niceItem(item.camera));
    }
    if (item.film && item.motion && has(item.film, "timelapse") && !isLapseMotion(item.motion) && wanted(["film", "motion"])) {
      notes.push("timelapse with " + niceItem(item.motion));
    }
    if (!notes.length) return [];
    return ["These locked choices disagree: " + notes.join("; ") + "."];
  }

  annotate(globalThis.MOAP_BANKS);

  globalThis.MOAP_FIT = {
    annotate: annotate,
    pick: pick,
    allows: allows,
    context: context,
    warnings: warnings,
    placeOf: placeOf,
    inferPlace: inferPlace,
    matchScene: matchScene
  };
})();

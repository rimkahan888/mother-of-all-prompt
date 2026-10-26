/**
 * The Prompt Folio - Application Core (Vanilla JS)
 * Premium, calm prompt-writing notebook for background images & animations
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. WORD BANKS
     ========================================================================== */
  const BANKS = {
    scenes: [
      // Nature (10)
      { group: 'Nature', label: 'Olive terraces', text: 'Old olive terraces step down a sunlit hill with stone retaining walls.', place: 'nature', tags: ['lush', 'hill', 'earth'] },
      { group: 'Nature', label: 'Cedar lake', text: 'A still mountain lake holds the dark reflection of a dense cedar forest.', place: 'nature', tags: ['water', 'trees', 'quiet'] },
      { group: 'Nature', label: 'Moss ravine', text: 'A narrow ravine is carpeted in thick moss, with ferns crowding a thin stream.', place: 'nature', tags: ['lush', 'water', 'shade'] },
      { group: 'Nature', label: 'Birch mist', text: 'Slender white birch trees rise in quiet succession through a field of heather.', place: 'nature', tags: ['trees', 'mist', 'hollow'] },
      { group: 'Nature', label: 'Reed marsh', text: 'Tall reeds bend over quiet marsh water where dragonflies skim the surface.', place: 'nature', tags: ['water', 'reeds', 'open'] },
      { group: 'Nature', label: 'Pine ridge', text: 'Wind-bent pines stand sentinel along an exposed granite ridge.', place: 'nature', tags: ['rock', 'trees', 'high'] },
      { group: 'Nature', label: 'Fern hollow', text: 'A secluded hollow under ancient oaks is densely filled with spreading fiddlehead ferns.', place: 'nature', tags: ['lush', 'shade', 'earth'] },
      { group: 'Nature', label: 'Highland heather', text: 'Rolling moorland swells into the distance under low slopes of purple heather.', place: 'nature', tags: ['open', 'hill', 'windswept'] },
      { group: 'Nature', label: 'Willow bank', text: 'Weeping willow branches trail their green tips into a slow-winding meadow river.', place: 'nature', tags: ['water', 'trees', 'peaceful'] },
      { group: 'Nature', label: 'Wildflower meadow', text: 'An untended field of wildflowers and long grasses ripples across a gentle decline.', place: 'nature', tags: ['open', 'flowers', 'pastoral'] },

      // Coast (8)
      { group: 'Coast', label: 'Linen cove', text: 'A sheltered cove of pale sand meets pale turquoise water between low chalk bluffs.', place: 'coast', tags: ['water', 'sand', 'coastal'] },
      { group: 'Coast', label: 'Tide rocks', text: 'Dark tide pools on a shelf of basalt reflect small patches of open sky.', place: 'coast', tags: ['water', 'rock', 'coastal'] },
      { group: 'Coast', label: 'Wooden harbour', text: 'Weathered cedar pilings and narrow floating piers rest along a quiet fishing bay.', place: 'coast', tags: ['water', 'wood', 'coastal'] },
      { group: 'Coast', label: 'Salt mirror', text: 'A thin sheet of ocean backwash turns the wet beach into an unbroken mirror.', place: 'coast', tags: ['water', 'sand', 'reflection'] },
      { group: 'Coast', label: 'Pebble strand', text: 'Smooth, grey sea-polished stones form a curved embankment against calm surf.', place: 'coast', tags: ['rock', 'coastal', 'shore'] },
      { group: 'Coast', label: 'Driftwood bluff', text: 'Weathered roots of cedar and sea-bleached driftwood rest above a quiet breaker line.', place: 'coast', tags: ['wood', 'sand', 'coastal'] },
      { group: 'Coast', label: 'Lighthouse headland', text: 'A steep headland of sea thrift and craggy bluffs overlooks deep ocean swell.', place: 'coast', tags: ['rock', 'ocean', 'coastal'] },
      { group: 'Coast', label: 'Dune grass shore', text: 'Pale sand dunes topped with tufts of marram grass roll down to a foaming shore.', place: 'coast', tags: ['sand', 'grass', 'coastal'] },

      // Desert (8)
      { group: 'Desert', label: 'Clay canyon', text: 'Deep ochre clay canyon walls rise sheer above an arid wash of dry gravel.', place: 'desert', tags: ['earth', 'canyon', 'arid'] },
      { group: 'Desert', label: 'Red mesas', text: 'Flat-topped sandstone mesas cast sharp, elongated shadows across an iron-red plain.', place: 'desert', tags: ['rock', 'heat', 'arid'] },
      { group: 'Desert', label: 'Oasis pool', text: 'A small palm-shaded waterhole rests within an expansive hollow of wind-ridged dunes.', place: 'desert', tags: ['water', 'sand', 'palm'] },
      { group: 'Desert', label: 'Night dunes', text: 'Sweeping crescent dunes of fine sand stretch out in silent, rippled curves.', place: 'desert', tags: ['sand', 'dunes', 'arid'] },
      { group: 'Desert', label: 'Adobe ruins', text: 'Sun-baked adobe walls and crumbling arches stand amidst dry desert sagebrush.', place: 'desert', tags: ['ruins', 'earth', 'arid'] },
      { group: 'Desert', label: 'Wind-carved sandstone', text: 'Swirling layers of red and apricot sandstone form undulating desert arches.', place: 'desert', tags: ['rock', 'sand', 'arid'] },
      { group: 'Desert', label: 'Silt pan', text: 'A stark, cracked mud playa extends toward a shimmering, heat-trembling horizon.', place: 'desert', tags: ['earth', 'dry', 'arid'] },
      { group: 'Desert', label: 'Bleached scrub', text: 'Clusters of silver desert sage and prickly pear dot a wide expanse of pale sand.', place: 'desert', tags: ['scrub', 'arid', 'sand'] },

      // City (8)
      { group: 'City', label: 'Plaster lanes', text: 'Narrow, whitewashed pedestrian alleys wind between low stone doorways and clay pots.', place: 'city', tags: ['streets', 'urban', 'architecture'] },
      { group: 'City', label: 'Rain street', text: 'Wet asphalt and smooth paving stones mirror the glow of warm shop windows.', place: 'city', tags: ['streets', 'wet', 'city'] },
      { group: 'City', label: 'Roof laundry', text: 'White cotton sheets hang drying on a terracotta rooftop above quiet residential terraces.', place: 'city', tags: ['rooftop', 'urban', 'quiet'] },
      { group: 'City', label: 'Night kiosk', text: 'A small wooden corner newspaper kiosk glows under the awning of a stone apartment block.', place: 'city', tags: ['kiosk', 'night', 'city'] },
      { group: 'City', label: 'Tile stair', text: 'A public outdoor flight of decorative ceramic steps ascends past flowering jasmine vines.', place: 'city', tags: ['steps', 'urban', 'stone'] },
      { group: 'City', label: 'Canal bridge', text: 'An arched limestone footbridge spans a quiet canal flanked by shuttered townhomes.', place: 'city', tags: ['water', 'bridge', 'city'] },
      { group: 'City', label: 'Stone arcade', text: 'A deep vaulted colonnade of pale granite casts rhythmic shadows across the pavement.', place: 'city', tags: ['arcade', 'columns', 'city'] },
      { group: 'City', label: 'Tram crossing', text: 'Polished steel tram tracks curve through a tree-lined cobblestone boulevard.', place: 'city', tags: ['tracks', 'urban', 'boulevard'] },

      // Interior (8)
      { group: 'Interior', label: 'Potter studio', text: 'Clay-dusted wooden worktables hold drying ceramic bowls and spinning kick-wheels.', place: 'interior', tags: ['craft', 'clay', 'workshop'] },
      { group: 'Interior', label: 'Reading nook', text: 'A deep window seat with woven linen cushions overlooks an overgrown cottage garden.', place: 'interior', tags: ['window', 'books', 'quiet'] },
      { group: 'Interior', label: 'Kitchen hearth', text: 'A blackened iron kettle rests on the stones of an open hearth inside a farmhouse kitchen.', place: 'interior', tags: ['hearth', 'stone', 'home'] },
      { group: 'Interior', label: 'Weaving loft', text: 'A timber floor attic houses an upright timber loom strung with unbleached linen yarn.', place: 'interior', tags: ['craft', 'wood', 'loft'] },
      { group: 'Interior', label: 'Tea chamber', text: 'Tatami straw mats and paper shoji screens frame a clean low cedar tea table.', place: 'interior', tags: ['tea', 'minimal', 'wood'] },
      { group: 'Interior', label: 'Conservatory corner', text: 'Curved glass panes shelter potted citrus trees and terra-cotta planters in potting soil.', place: 'interior', tags: ['plants', 'glass', 'garden'] },
      { group: 'Interior', label: 'Wooden library', text: 'Tall floor-to-ceiling shelves of calfskin volumes line a quiet, wood-panelled study.', place: 'interior', tags: ['books', 'wood', 'study'] },
      { group: 'Interior', label: 'Carpenter bench', text: 'A solid maple workbench is littered with wood curls, gouges, and hand planes.', place: 'interior', tags: ['craft', 'wood', 'tools'] },

      // Fantasy (8)
      { group: 'Fantasy', label: 'Moon gate', text: 'A circular stone doorway set into a lichen-covered moss garden wall reveals a misted bamboo grove.', place: 'fantasy', tags: ['magic', 'garden', 'stone'] },
      { group: 'Fantasy', label: 'Lantern forest', text: 'Weathered stone lanterns overgrown with ivy stand along an ancient forest path.', place: 'fantasy', tags: ['trees', 'lanterns', 'ancient'] },
      { group: 'Fantasy', label: 'Cloud monastery', text: 'Carved timber shrines perch along the sheer spine of a mountain above rolling sea clouds.', place: 'fantasy', tags: ['high', 'shrines', 'clouds'] },
      { group: 'Fantasy', label: 'Glass house', text: 'An abandoned botanical glass pavilion in the deep woods is invaded by creeping wild briars.', place: 'fantasy', tags: ['glass', 'ruin', 'forest'] },
      { group: 'Fantasy', label: 'Herb boats', text: 'Flat-bottomed cedar skiffs laden with bundles of drying chamomile drift along a quiet canal.', place: 'fantasy', tags: ['water', 'herbs', 'idyllic'] },
      { group: 'Fantasy', label: 'Ancient dolmen', text: 'Three upright megaliths support a colossal flat slab across an undisturbed meadow.', place: 'fantasy', tags: ['megalith', 'stone', 'ancient'] },
      { group: 'Fantasy', label: 'Sunken obelisk', text: 'A moss-carved stone obelisk leans partially submerged in a forest lily pond.', place: 'fantasy', tags: ['ruin', 'water', 'mystery'] },
      { group: 'Fantasy', label: 'Floating belfry', text: 'A delicate bell tower rests on a miniature island adrift in an elevated mountain lake.', place: 'fantasy', tags: ['tower', 'lake', 'sacred'] },

      // Underwater (6)
      { group: 'Underwater', label: 'Kelp cathedral', text: 'Towering fronds of golden kelp rise thirty feet toward the shimmering ocean surface.', place: 'underwater', tags: ['kelp', 'ocean', 'green'] },
      { group: 'Underwater', label: 'Coral alley', text: 'Delicate formations of table and brain coral flank a pristine channel of white sand.', place: 'underwater', tags: ['coral', 'sand', 'reef'] },
      { group: 'Underwater', label: 'Sunken court', text: 'Carved marble balustrades and mosaic flagstones rest silently on the sea floor.', place: 'underwater', tags: ['ruins', 'ocean', 'marble'] },
      { group: 'Underwater', label: 'Pearl shelf', text: 'A shallow submerged limestone ledge is colonized by sea fans and violet anemones.', place: 'underwater', tags: ['reef', 'limestone', 'shallow'] },
      { group: 'Underwater', label: 'Deep hydrothermal spire', text: 'Mineral chimneys rise from the dark seabed, surrounded by ethereal mineral clouds.', place: 'underwater', tags: ['deep', 'vent', 'rock'] },
      { group: 'Underwater', label: 'Silt seabed', text: 'Ripples of pale seabed sediment lie undisturbed under soft luminous ocean depth.', place: 'underwater', tags: ['sand', 'deep', 'still'] },

      // Space (7)
      { group: 'Space', label: 'Quiet orbit', text: 'A sweeping planetary horizon curves below into deep indigo space with glittering starfields.', place: 'space', tags: ['planet', 'orbit', 'stars'] },
      { group: 'Space', label: 'Ring shadow', text: 'The sharp razor-edge of a gas giant ring casts a dark band across pastel clouds.', place: 'space', tags: ['rings', 'gas-giant', 'void'] },
      { group: 'Space', label: 'Moon ridge', text: 'The sharp basalt crest of an impact crater overlooks an endless grey regolith plain.', place: 'space', tags: ['crater', 'moon', 'rock'] },
      { group: 'Space', label: 'Solar sail expanse', text: 'Gossamer facets of an unrolled reflective solar array catch pale distant starlight.', place: 'space', tags: ['sail', 'tech', 'silent'] },
      { group: 'Space', label: 'Asteroid basin', text: 'Pitted nickel-iron boulders and micro-cratered dust drift in silent suspension.', place: 'space', tags: ['asteroid', 'void', 'dust'] },
      { group: 'Space', label: 'Nebula threshold', text: 'Veils of interstellar hydrogen gas glow faintly in magenta and deep plum across the abyss.', place: 'space', tags: ['nebula', 'gas', 'deep'] },
      { group: 'Space', label: 'Orbital dock exterior', text: 'Quiet docking moorings and communication trusses hang silhouetted against Earth light.', place: 'space', tags: ['station', 'metal', 'orbit'] },

      // Abstract (6)
      { group: 'Abstract', label: 'Torn paper', text: 'Layered sheets of handmade deckle-edge washi paper overlap in tactile relief.', place: 'abstract', tags: ['paper', 'texture', 'minimal'] },
      { group: 'Abstract', label: 'Pigment pools', text: 'Diluted rings of raw indigo and walnut ink dry into soft concentric water-marks.', place: 'abstract', tags: ['pigment', 'ink', 'organic'] },
      { group: 'Abstract', label: 'Ink in water', text: 'Plumes of black sumi ink disperse through crystal clear water in slow feathering curls.', place: 'abstract', tags: ['ink', 'water', 'fluid'] },
      { group: 'Abstract', label: 'Thread map', text: 'Taut strands of unspun raw linen and hemp thread intersect over a chalk ground.', place: 'abstract', tags: ['thread', 'textile', 'geometry'] },
      { group: 'Abstract', label: 'Layered wax', text: 'Translucent layers of beeswax and dammar resin form an encaustic surface of soft depth.', place: 'abstract', tags: ['wax', 'resin', 'tactile'] },
      { group: 'Abstract', label: 'Raw textile fold', text: 'Heavy natural cotton canvas falls in sweeping, sculptural drapery folds.', place: 'abstract', tags: ['fabric', 'drape', 'calm'] },

      // Workshop (6)
      { group: 'Workshop', label: 'Kiln yard', text: 'Sheltered stacks of split pine cordwood surround an adobe anagama wood-fired kiln.', place: 'yard', tags: ['wood', 'kiln', 'craft'] },
      { group: 'Workshop', label: 'Dye vats', text: 'Earthenware vats of fermented indigo brew beneath a low open-sided cedar shelter.', place: 'yard', tags: ['vats', 'indigo', 'textile'] },
      { group: 'Workshop', label: 'Candle workshop', text: 'Drying beeswax tapers hang from circular wheel frames over zinc dipping trays.', place: 'yard', tags: ['wax', 'workshop', 'craft'] },
      { group: 'Workshop', label: 'Timber drying shed', text: 'Slotted vertical stacks of sawn cedar and white oak cure under open slatted walls.', place: 'yard', tags: ['wood', 'shed', 'craft'] },
      { group: 'Workshop', label: 'Stonecutter terrace', text: 'Chiseled limestone blocks, mallet heads, and stone dust litter an open hillside terrace.', place: 'yard', tags: ['stone', 'tools', 'terrace'] },
      { group: 'Workshop', label: 'Glassblower floor', text: 'Punties and blowpipes lean against the annealing furnace on a cast-iron shop floor.', place: 'yard', tags: ['glass', 'furnace', 'fire'] },
    ],

    styles: [
      { group: 'Camera', label: 'Large-format photo', text: 'The image is a large-format view camera photograph with deep tonal depth and lifelike texture.' },
      { group: 'Camera', label: '35mm film', text: 'The image is a 35mm film photograph with fine organic grain and warm, gentle halation.' },
      { group: 'Camera', label: 'Photoreal', text: 'The image is a crisp photorealistic capture with natural skin, cloth, and stone textures.' },
      { group: 'Camera', label: 'Polaroid', text: 'The image is an instant film print with soft square edges, creamy highlights, and muted blacks.' },
      { group: 'Camera', label: 'Macro study', text: 'The image is a detailed macro photograph with paper-thin depth of field and revealed tactile fibers.' },
      { group: 'Camera', label: 'Tilt-shift', text: 'The image is a tilt-shift photograph with selective focus plane and charming miniature scale.' },
      { group: 'Paint', label: 'Oil painting', text: 'The image is an oil painting with visible bristles and patient, layered colour.' },
      { group: 'Paint', label: 'Loose watercolor', text: 'The image is a loose watercolour on cold-press paper with soft bleeds and pooling pigments.' },
      { group: 'Paint', label: 'Gouache', text: 'The image is an opaque gouache painting with velvety flat planes and chalky finishes.' },
      { group: 'Paint', label: 'Fresco', text: 'The image is an ancient lime plaster fresco with weathered mineral pigments and soft crazing.' },
      { group: 'Paint', label: 'Ink wash', text: 'The image is a traditional sumi-e ink wash painting with expressive wet brushwork and breathing empty space.' },
      { group: 'Paint', label: 'Egg tempera', text: 'The image is an egg tempera panel painting with fine cross-hatched brushstrokes and jewel-like translucence.' },
      { group: 'Draw', label: 'Charcoal sketch', text: 'The image is a soft vine charcoal drawing with velvety smudges and confident erased highlights.' },
      { group: 'Draw', label: 'Chalk pastel', text: 'The image is a chalk pastel drawing on textured toned paper with dry, powdery blends.' },
      { group: 'Draw', label: 'Graphite drawing', text: 'The image is a graphite pencil study on heavy vellum with delicate tonal gradations.' },
      { group: 'Draw', label: 'Silverpoint', text: 'The image is a delicate silverpoint drawing on gesso ground with pale, shimmering cross-hatching.' },
      { group: 'Draw', label: 'Conte crayon', text: 'The image is a sepia and terracotta conte crayon study with crisp, expressive outlines.' },
      { group: 'Print', label: 'Linocut', text: 'The image is a linocut relief print with bold carved silhouettes and ink transfer grain.' },
      { group: 'Print', label: 'Woodcut', text: 'The image is a traditional woodblock print showing organic woodgrain impressions and chiselled marks.' },
      { group: 'Print', label: 'Risograph', text: 'The image is a two-tone risograph print with tactile ink stippling and charming slight registration misalignments.' },
      { group: 'Print', label: 'Cyanotype', text: 'The image is a Prussian blue cyanotype sun print with delicate botanical silhouettes and bleached highlights.' },
      { group: 'Print', label: 'Etching', text: 'The image is a fine copperplate intaglio etching with dense, ink-bitten crosshatching and embossed plate margins.' },
      { group: 'Print', label: 'Botanical plate', text: 'The image is a hand-coloured 18th-century botanical engraving with precise anatomical pen lines.' },
      { group: 'Digital', label: 'Anime background', text: 'The image is a hand-painted anime landscape background in the manner of classic Japanese animation studios.' },
      { group: 'Digital', label: 'Cel painting', text: 'The image is a crisp cel-style animation still with clean ink lines and hand-brushed gouache grounds.' },
      { group: 'Digital', label: 'Clay render', text: 'The image is a minimal monochromatic clay render with soft ambient occlusion and matte finishes.' },
      { group: 'Digital', label: 'Isometric vector', text: 'The image is an architectural isometric illustration with crisp orthographic planes and restrained palettes.' },
      { group: 'Digital', label: 'Low poly craft', text: 'The image is a faceted low-polygon geometric model styled like folded paper sculptures.' },
      { group: 'Poster', label: 'Ukiyo-e', text: 'The image is an Edo-period ukiyo-e woodcut with graceful curving outlines and flat mineral pigments.' },
      { group: 'Poster', label: 'Art nouveau', text: 'The image is an Art Nouveau decorative panel with sinuous whiplash curves and stylised organic flora.' },
      { group: 'Poster', label: 'Travel poster', text: 'The image is a mid-century travel lithograph with flat colour blocking and stately architectural composition.' },
      { group: 'Poster', label: 'Bauhaus constructivist', text: 'The image is a modernist poster with rigorous geometric grids, clean diagonal tension, and primary shapes.' },
      { group: 'Poster', label: 'Collage', text: 'The image is a mixed-media paper collage with cut edges, torn fibers, and layered typographic fragments.' },
      { group: 'Craft', label: 'Embroidery', text: 'The image is a textile piece of dense silk thread embroidery on unbleached raw linen.' },
      { group: 'Craft', label: 'Tapestry weave', text: 'The image is a hand-woven wool tapestry with visible weft ridges and heathered dye variations.' },
      { group: 'Craft', label: 'Papercut', text: 'The image is an intricate hand-cut silhouette papercraft layered over contrasting handmade paper.' },
      { group: 'Craft', label: 'Batik', text: 'The image is a wax-resist dyed batik textile with fine crackle lines and indigo seepage.' },
      { group: 'Craft', label: 'Ceramic tile', text: 'The image is an assemblage of hand-glazed terracotta tiles with craquelure glaze and earthen edges.' },
      { group: 'Set', label: 'Stop-motion set', text: 'The image is a miniature stop-motion set handcrafted from painted balsa wood, felt, and modelling clay.' },
      { group: 'Set', label: 'Diorama box', text: 'The image is a glass-fronted natural history diorama box with layered paper cutouts and specimen shelves.' },
      { group: 'Set', label: 'Matte painting', text: 'The image is a classic cinema matte painting on glass with atmospheric aerial perspective.' },
      { group: 'Set', label: 'Shadow theater', text: 'The image is a backlit shadow puppetry scene with pierced leather silhouettes behind translucent silk.' },
    ],

    lighting: [
      { group: 'Soft', label: 'Overcast wrap', text: 'Soft overcast light wraps the whole view without a hard edge.', tags: ['soft', 'diffuse'] },
      { group: 'Soft', label: 'North window', text: 'Cool, steady north-facing window light spills softly across the interior surfaces.', tags: ['soft', 'window', 'interior'] },
      { group: 'Soft', label: 'Open shade', text: 'Gentle open shade provides clear, even illumination without direct sun glare.', tags: ['soft', 'shade'] },
      { group: 'Soft', label: 'Fog diffusion', text: 'Dense morning fog diffuses the daylight into an enveloping, luminous pearl sheen.', tags: ['soft', 'fog', 'weather'] },
      { group: 'Soft', label: 'Silk scrim', text: 'Diffused studio light filtered through a large natural linen scrim softens all contours.', tags: ['soft', 'studio'] },
      { group: 'Soft', label: 'Cloud canopy', text: 'An unbroken ceiling of thin pale clouds acts as an immense softbox over the landscape.', tags: ['soft', 'cloud'] },
      { group: 'Warm', label: 'Golden rim', text: 'Low golden hour sunlight strikes the subject from behind, drawing a luminous amber rim.', tags: ['warm', 'sun'] },
      { group: 'Warm', label: 'Low sidelight', text: 'Warm, horizontal late-afternoon sunlight skims across surfaces, highlighting every tiny texture.', tags: ['warm', 'sun', 'side'] },
      { group: 'Warm', label: 'Firelight', text: 'The warm, flickering ember glow of a wood hearth washes the lower scene in rust and gold.', tags: ['warm', 'fire', 'interior'] },
      { group: 'Warm', label: 'Beeswax candle', text: 'A single beeswax candle illuminates a small circle of warm honeyed light against deep shadows.', tags: ['warm', 'candle', 'interior'] },
      { group: 'Warm', label: 'Ochre bounce', text: 'Sunlight bouncing off sun-baked adobe walls fills the shadows with rich terracotta warmth.', tags: ['warm', 'bounce', 'desert'] },
      { group: 'Warm', label: 'Amber lantern', text: 'The soft amber beam of a paper lantern casts gentle radiating pools of warmth.', tags: ['warm', 'lantern'] },
      { group: 'Cool', label: 'Blue hour', text: 'Deep lapis blue hour light suffuses the scene just after sunset with quiet coolness.', tags: ['cool', 'twilight'] },
      { group: 'Cool', label: 'Moon wash', text: 'Pale silvery moonlight washes over the landscape with quiet, monochromatic serenity.', tags: ['cool', 'night', 'moon'] },
      { group: 'Cool', label: 'Dawn chill', text: 'The brittle, steel-blue chill of first light glimmers along frosty edges before sunrise.', tags: ['cool', 'dawn'] },
      { group: 'Cool', label: 'Snow bounce', text: 'Soft, luminous white light bounces upward from a fresh snowpack into every recess.', tags: ['cool', 'snow', 'bright'] },
      { group: 'Cool', label: 'Starlight', text: 'Faint starlight and celestial nebular dust provide subtle, unearthly ambient exposure.', tags: ['cool', 'stars', 'night'] },
      { group: 'Hard', label: 'Hard noon', text: 'Steep midday sunlight carves razor-sharp ink-black shadows directly beneath every form.', tags: ['hard', 'sun'] },
      { group: 'Hard', label: 'Slatted light', text: 'Crisp parallel ribbons of sunlight cut through window blinds onto the quiet floor.', tags: ['hard', 'shadows', 'interior'] },
      { group: 'Hard', label: 'Rembrandt chiaroscuro', text: 'Dramatic directional lighting from a high side angle creates a classic triangular highlight on the shadowed side.', tags: ['hard', 'dramatic'] },
      { group: 'Hard', label: 'Chasm shaft', text: 'A single theatrical column of direct sunlight pierces down between sheer cliff faces.', tags: ['hard', 'shaft'] },
      { group: 'Hard', label: 'Raking dawn', text: 'Extreme low-angle grazing sunlight turns small surface ripples into stark graphic relief.', tags: ['hard', 'rake'] },
      { group: 'Hard', label: 'Split light', text: 'Direct light illuminates exactly one half of the scene while the other remains in velvety shade.', tags: ['hard', 'split'] },
      { group: 'Volume', label: 'God rays', text: 'Beams of crepuscular light fan down through a mountain forest canopy like cathedral pillars.', tags: ['volume', 'rays'] },
      { group: 'Volume', label: 'Backlit dust', text: 'Fine motes of airborne workshop dust catch the sun, turning the atmosphere into a golden suspension.', tags: ['volume', 'dust'] },
      { group: 'Volume', label: 'Storm break', text: 'A sudden rent in dark purple storm clouds casts a brilliant theatrical spotlight onto the earth.', tags: ['volume', 'storm'] },
      { group: 'Volume', label: 'Underwater shafts', text: 'Shimmering caustic shafts of sunlight refract down through clear aqua water onto the sands.', tags: ['volume', 'underwater', 'caustic'] },
      { group: 'Volume', label: 'Mist dispersion', text: 'Sunlight filtering through morning sea spray creates an ethereal iridescent fog haze.', tags: ['volume', 'mist'] },
      { group: 'Volume', label: 'Heat haze shimmer', text: 'Intense thermal shimmer trembles in the air above the sun-baked stones.', tags: ['volume', 'heat', 'desert'] },
      { group: 'Night', label: 'Sodium street', text: 'The muted amber glow of a distant sodium streetlamp reflects quietly on damp flagstones.', tags: ['night', 'street', 'city'] },
      { group: 'Night', label: 'Neon spill', text: 'Subdued emerald and vermilion neon light spills softly from a shop window into a dark lane.', tags: ['night', 'neon', 'city'] },
      { group: 'Night', label: 'Starlight void', text: 'Unfiltered stellar brilliance pierces the black vacuum of space without atmospheric scatter.', tags: ['night', 'space'] },
      { group: 'Night', label: 'Paper lantern row', text: 'A string of low rice-paper lanterns casts gentle, overlapping orbs of quiet illumination.', tags: ['night', 'lantern'] },
      { group: 'Night', label: 'Bioluminescent glow', text: 'Ethereal pale cyan bioluminescence glows along water eddies and tide lines.', tags: ['night', 'underwater', 'magic'] },
      { group: 'Night', label: 'Window beacon', text: 'A warm, solitary lighted square window glows like a welcoming beacon against a dark hillside.', tags: ['night', 'window'] },
      { group: 'Studio', label: 'High key', text: 'Luminous high-key illumination renders all values bright, clean, and weightless.', tags: ['studio', 'bright'] },
      { group: 'Studio', label: 'Low key', text: 'Moody low-key illumination keeps ninety percent of the frame submerged in rich, dark shadow.', tags: ['studio', 'dark'] },
      { group: 'Studio', label: 'Top daylight', text: 'Neutral overhead daylight from a roof glass lantern bathes the floor in balanced clarity.', tags: ['studio', 'top'] },
      { group: 'Studio', label: 'After rain reflection', text: 'Diffused sky light bounces up from rain-sheened slate flagstones, filling shadow crevices.', tags: ['weather', 'wet'] },
      { group: 'Studio', label: 'Rim silhouette', text: 'A sharp, narrow halo of backlight outlines dark foreground contours against a bright horizon.', tags: ['dramatic', 'rim'] },
      { group: 'Studio', label: 'Soft ambient fill', text: 'Gentle wraparound ambient bounce fills the frame with even, shadow-free balance.', tags: ['soft'] },
      { group: 'Warm', label: 'Copper sunset wash', text: 'A wash of burnished copper evening light saturates textured surfaces in rich warmth.', tags: ['warm', 'sunset'] },
    ],

    palettes: [
      { group: 'Earth', label: 'Clay & Sage', text: 'warm clay, sage green, and cream' },
      { group: 'Earth', label: 'Umber & Linen', text: 'raw umber, weathered linen, and dried oats' },
      { group: 'Earth', label: 'Terracotta & Thyme', text: 'sunbaked terracotta, dried thyme, and bone white' },
      { group: 'Earth', label: 'Walnut & Ochre', text: 'dark walnut, raw sienna, and wheat' },
      { group: 'Earth', label: 'Moss & Granite', text: 'deep moss green, wet granite grey, and pale lichen' },
      { group: 'Earth', label: 'Cedar & Pine', text: 'cured cedar, dark pine needle, and bark brown' },
      { group: 'Sea', label: 'Weathered Blue', text: 'weathered blue, rope tan, and gull grey' },
      { group: 'Sea', label: 'Indigo & Salt', text: 'deep sea indigo, pale sea salt, and kelp amber' },
      { group: 'Sea', label: 'Driftwood & Foam', text: 'driftwood silver, seafoam green, and mist white' },
      { group: 'Sea', label: 'Tidepool & Slate', text: 'tidepool teal, wet slate charcoal, and mussel violet' },
      { group: 'Sea', label: 'Chalk & Aquamarine', text: 'chalk cliff white, pale aquamarine, and pebble grey' },
      { group: 'Pigment', label: 'Sumi & Rice Paper', text: 'sumi ink, rice paper, and a single moss green' },
      { group: 'Pigment', label: 'Tea & Walnut', text: 'tea-stained paper, walnut, and faded rose' },
      { group: 'Pigment', label: 'Cobalt & Gesso', text: 'pure cobalt blue, raw gesso, and graphite' },
      { group: 'Pigment', label: 'Cinnabar & Charcoal', text: 'burnt cinnabar red, soft charcoal, and parchment' },
      { group: 'Pigment', label: 'Ochre & Woad', text: 'yellow ochre, ancient woad blue, and bleached hemp' },
      { group: 'Night', label: 'Lapis & Ember', text: 'midnight lapis, charcoal, and embers of copper' },
      { group: 'Night', label: 'Moonlight & Silver', text: 'lunar silver, shadowy indigo, and frosted blue' },
      { group: 'Night', label: 'Obsidian & Starlight', text: 'obsidian black, starfield pearl, and faint nebula violet' },
      { group: 'Night', label: 'Smoky Teal & Ash', text: 'deep smoky teal, ash grey, and muted brass' },
      { group: 'Night', label: 'Night Dune & Violet', text: 'dune beige, shadow violet, and bleached bone' },
      { group: 'Desert', label: 'Sandstone & Apricot', text: 'sandstone red, desert apricot, and gypsum white' },
      { group: 'Desert', label: 'Adobe & Turquoise', text: 'sun-dried adobe, dusty turquoise, and scorched sand' },
      { group: 'Desert', label: 'Basalt & Ochre', text: 'dark volcanic basalt, raw ochre, and pale dry straw' },
      { group: 'Desert', label: 'Canyon Rose & Sand', text: 'canyon rose, warm river silt, and dry sage' },
      { group: 'Desert', label: 'Saffron & Dune', text: 'saffron gold, dune shadow plum, and salt crust white' },
      { group: 'Light', label: 'Chalk & Alabaster', text: 'chalk, warm alabaster, and washed sand' },
      { group: 'Light', label: 'Mist & Pearl', text: 'morning mist grey, pearl lustre, and unbleached silk' },
      { group: 'Light', label: 'Pale Straw & Butter', text: 'pale straw, sweet butter, and faint porcelain blue' },
      { group: 'Light', label: 'Linen & Bleach', text: 'unrefined linen, bleached cotton, and soft riverstone' },
      { group: 'Light', label: 'Dawn Rose & Frost', text: 'dawn rose, frosted glass, and pale birch bark' },
      { group: 'Soft', label: 'Washed Rose & Thyme', text: 'washed garden rose, dried thyme, and aged parchment' },
      { group: 'Soft', label: 'Plum & Birch', text: 'smoky plum, birch cream, and dried lavender' },
      { group: 'Soft', label: 'Olive & Beeswax', text: 'pale olive, warm yellow beeswax, and linen grey' },
      { group: 'Soft', label: 'Eucalyptus & Bark', text: 'eucalyptus green, silvery bark, and soft chalk' },
      { group: 'Soft', label: 'Heather & Peat', text: 'wild heather mauve, rich peat brown, and morning rain grey' },
      { group: 'Fantasy', label: 'Emerald & Gold leaf', text: 'deep forest emerald, patinated gold leaf, and vellum' },
      { group: 'Fantasy', label: 'Bioluminescent Cyan', text: 'bioluminescent cyan, dark ocean navy, and pearl' },
      { group: 'Fantasy', label: 'Amber & Iron', text: 'fossil amber, blackened wrought iron, and raw fleece' },
      { group: 'Fantasy', label: 'Celestial Silver & Copper', text: 'celestial silver, dark void violet, and warm copper' },
      { group: 'Earth', label: 'Chestnut & Reed', text: 'rich chestnut, dried reed gold, and soft moss' },
      { group: 'Soft', label: 'Almond & Sage', text: 'blanched almond, pale sage, and soft river clay' },
    ],

    moods: [
      { group: 'Quiet', label: 'Quiet & contemplative', text: 'quiet and contemplative' },
      { group: 'Quiet', label: 'Meditative and spare', text: 'meditative and spare' },
      { group: 'Quiet', label: 'Quiet and slightly sacred', text: 'quiet and slightly sacred' },
      { group: 'Quiet', label: 'Hushed and undisturbed', text: 'hushed and undisturbed' },
      { group: 'Quiet', label: 'Solitary and restful', text: 'solitary and restful' },
      { group: 'Quiet', label: 'Silent and poised', text: 'silent and poised on the brink of morning' },
      { group: 'Air', label: 'Windswept & romantic', text: 'windswept and a little romantic' },
      { group: 'Air', label: 'Airy and expansive', text: 'airy, spacious, and unhurried' },
      { group: 'Air', label: 'Ethereal and floating', text: 'ethereal, soft-focused, and weightless' },
      { group: 'Air', label: 'Gentle and nostalgic', text: 'gently nostalgic without sorrow' },
      { group: 'Air', label: 'Lyrical and pastoral', text: 'lyrical, tender, and pastoral' },
      { group: 'Air', label: 'Breezy and lighthearted', text: 'breezy and unburdened by haste' },
      { group: 'Warmth', label: 'Ripe late-summer', text: 'ripe, late-summer, and full' },
      { group: 'Warmth', label: 'Domestic and sheltered', text: 'domestic, sheltered, and deeply peaceful' },
      { group: 'Warmth', label: 'Hearthside calm', text: 'hearthside calm and tactile comfort' },
      { group: 'Warmth', label: 'Grounded and slow', text: 'grounded, slow, and tactile' },
      { group: 'Warmth', label: 'Tender and intimate', text: 'tender, close, and gently sheltered' },
      { group: 'Edge', label: 'Gently uneasy', text: 'gently uneasy, never horrific' },
      { group: 'Edge', label: 'Nocturne mystery', text: 'veiled in nocturne mystery and quiet reserve' },
      { group: 'Edge', label: 'Liminal and waiting', text: 'liminal and waiting between two hours' },
      { group: 'Edge', label: 'Weathered endurance', text: 'marked by weathered, patient endurance' },
      { group: 'Edge', label: 'Austere and monastic', text: 'austere, monastic, and stripped of ornament' },
      { group: 'Craft', label: 'Handmade and tactile', text: 'handmade, honest, and tactile' },
      { group: 'Craft', label: 'Studious and focused', text: 'studious, quiet, and deeply focused' },
      { group: 'Craft', label: 'Patient and deliberate', text: 'patient, deliberate, and craft-rooted' },
      { group: 'Craft', label: 'Botanical curiosity', text: 'filled with quiet botanical curiosity' },
      { group: 'Craft', label: 'Archival stillness', text: 'steeped in archival stillness and preservation' },
      { group: 'Joy', label: 'Modest celebration', text: 'celebratory in a modest, gentle way' },
      { group: 'Joy', label: 'Playful and bright', text: 'subtly playful and full of simple charm' },
      { group: 'Joy', label: 'Abundant and fertile', text: 'abundant, green, and quietly fertile' },
      { group: 'Joy', label: 'Storybook wonder', text: 'touched with quiet storybook wonder' },
      { group: 'Joy', label: 'Serene gratitude', text: 'suffused with serene, unhurried gratitude' },
      { group: 'Wild', label: 'Elemental and vast', text: 'elemental, raw, and humbling' },
      { group: 'Wild', label: 'Ancient and timeless', text: 'ancient, enduring, and timeless' },
      { group: 'Wild', label: 'Oceanic weight', text: 'deep, buoyant, and oceanic' },
      { group: 'Wild', label: 'High mountain solitary', text: 'bracing, solitary, and crystal clear' },
      { group: 'Wild', label: 'Desert stillness', text: 'held in sun-baked desert stillness' },
      { group: 'Season', label: 'Autumnal gathering', text: 'autumnal, reflective, and mellowing' },
      { group: 'Season', label: 'Winter hibernation', text: 'quietly dormant in deep winter calm' },
      { group: 'Season', label: 'Spring awakening', text: 'fresh with the crisp expectancy of early spring' },
      { group: 'Season', label: 'Midsummer drowsy', text: 'drowsy, warm, and suspended in midsummer shade' },
      { group: 'Quiet', label: 'Tea-house hush', text: 'held in the reverent, unhurried hush of a tea room' },
    ],

    times: [
      { group: 'Day', label: 'Bright midday', text: 'a bright, dry midday', tags: ['day', 'clear'] },
      { group: 'Day', label: 'High summer noon', text: 'high summer noon with leaves dark and full', tags: ['day', 'summer', 'sun'] },
      { group: 'Day', label: 'Crisp morning', text: 'a cold, clear morning just after cockcrow', tags: ['day', 'morning'] },
      { group: 'Day', label: 'Filtered afternoon', text: 'a calm, sun-dappled afternoon under a light breeze', tags: ['day', 'afternoon'] },
      { group: 'Day', label: 'Late spring day', text: 'a gentle late spring morning with clean air', tags: ['day', 'spring'] },
      { group: 'Dawn', label: 'First light', text: 'the quiet moment of first light before the sun crests the ridge', tags: ['dawn'] },
      { group: 'Dawn', label: 'Golden hour', text: 'the rich amber glow of late golden hour', tags: ['golden', 'sun'] },
      { group: 'Dawn', label: 'Rosy dawn', text: 'a pale rose and apricot dawn over still water', tags: ['dawn', 'soft'] },
      { group: 'Dawn', label: 'Morning frost', text: 'a frosty autumn dawn with breath misting in the air', tags: ['dawn', 'frost'] },
      { group: 'Dawn', label: 'Sunbreak', text: 'a golden sunbreak cutting through parting mist', tags: ['dawn', 'mist'] },
      { group: 'Dusk', label: 'Blue hour', text: 'the silent blue hour just as street lamps begin to glow', tags: ['dusk', 'blue-hour'] },
      { group: 'Dusk', label: 'Afterglow', text: 'the lingering copper afterglow of a completed sunset', tags: ['dusk'] },
      { group: 'Dusk', label: 'Quiet dusk', text: 'a cool, quiet dusk settling across the landscape', tags: ['dusk'] },
      { group: 'Dusk', label: 'Autumn twilight', text: 'a crisp autumn twilight with still, smoke-tinged air', tags: ['dusk', 'autumn'] },
      { group: 'Dusk', label: 'Purple gloaming', text: 'the deep violet gloaming between sunset and stars', tags: ['dusk'] },
      { group: 'Night', label: 'Moonlit night', text: 'a moonlit night with soft silver visibility', tags: ['night', 'moon'] },
      { group: 'Night', label: 'Clear starfield', text: 'a dark, cloudless night brilliant with celestial constellations', tags: ['night', 'stars'] },
      { group: 'Night', label: 'Quiet midnight', text: 'the deepest hour of midnight with resting streets', tags: ['night'] },
      { group: 'Night', label: 'Crescent moon eve', text: 'a crisp night beneath the slender horn of a new moon', tags: ['night', 'moon'] },
      { group: 'Night', label: 'Deep space void', text: 'the timeless, airless blackness of interplanetary space', tags: ['space', 'night'] },
      { group: 'Rain', label: 'Sun shower', text: 'a sun shower, rain and brightness together', tags: ['rain', 'day'] },
      { group: 'Rain', label: 'Steady rain', text: 'a steady, rhythmic rainfall tapping on foliage and stone', tags: ['rain'] },
      { group: 'Rain', label: 'After the rain', text: 'the fresh, clean calm immediately after a rainstorm', tags: ['rain', 'fresh'] },
      { group: 'Rain', label: 'Clearing storm', text: 'a dramatic clearing storm with wet ground and broken sky', tags: ['rain', 'storm'] },
      { group: 'Rain', label: 'Soft drizzle', text: 'a fine, drifting drizzle that dampens every surface without puddling', tags: ['rain'] },
      { group: 'Fog', label: 'Morning fog', text: 'thick morning ground fog hovering a few feet above the earth', tags: ['fog'] },
      { group: 'Fog', label: 'Sea mist', text: 'a cool sea mist rolling inland across the cliffs', tags: ['fog', 'coast'] },
      { group: 'Fog', label: 'Valley vapor', text: 'dense valley vapor rising lazily as the sun warms the hillside', tags: ['fog'] },
      { group: 'Fog', label: 'High mountain cloud', text: 'a passing mountain cloud that temporarily envelops the ridge', tags: ['fog', 'cloud'] },
      { group: 'Fog', label: 'Forest haze', text: 'a quiet, blue-tinted haze suspended between ancient trees', tags: ['fog', 'trees'] },
      { group: 'Snow', label: 'Quiet snowfall', text: 'a quiet fall of large, slow-drifting snowflakes', tags: ['snow'] },
      { group: 'Snow', label: 'Fresh powder', text: 'a pristine morning after an unbroken heavy snowfall', tags: ['snow', 'clear'] },
      { group: 'Snow', label: 'Winter thaw', text: 'a gentle winter thaw with snow melting from sunny branches', tags: ['snow', 'thaw'] },
      { group: 'Snow', label: 'Subzero calm', text: 'a bitter, crystal-clear freeze with frost flowers on stone', tags: ['snow', 'frost'] },
      { group: 'Snow', label: 'Passing flurries', text: 'light, swirling snow flurries dancing on the wind', tags: ['snow', 'wind'] },
      { group: 'Heat', label: 'Heat shimmer noon', text: 'scorching desert midday with intense thermal shimmer', tags: ['heat', 'desert'] },
      { group: 'Heat', label: 'Dry sirocco', text: 'a warm, dry desert wind carrying the faint scent of baked clay', tags: ['heat', 'wind', 'desert'] },
      { group: 'Heat', label: 'Dusty gusts', text: 'sporadic gusts of wind lifting fine dust into golden sunbeams', tags: ['wind', 'dust'] },
      { group: 'Heat', label: 'Salt breeze', text: 'a brisk, invigorating coastal breeze smelling of salt and kelp', tags: ['wind', 'coast'] },
      { group: 'Heat', label: 'Still calm', text: 'an absolute dead calm where not a single leaf stirs', tags: ['calm'] },
      { group: 'Special', label: 'Sunlit shallows', text: 'a bright midday beneath the waves where light dances on the sand', tags: ['underwater', 'sun'] },
      { group: 'Special', label: 'Eclipse dim', text: 'the eerie, silvery dimming of a midday solar eclipse', tags: ['eclipse', 'dim'] },
      { group: 'Special', label: 'Deep sea twilight', text: 'the perpetual twilight of deep ocean water beneath the photic zone', tags: ['underwater', 'dim'] },
      { group: 'Special', label: 'Harvest dusk', text: 'a warm harvest evening illuminated by a giant low amber moon', tags: ['dusk', 'moon'] },
    ],

    compositions: [
      { group: 'Wide', label: 'Rule of thirds', text: 'The subject sits on a third, with the rest of the frame left open.' },
      { group: 'Wide', label: 'Low horizon', text: 'A low horizon placed in the lower third gives vast breathing space to the sky.' },
      { group: 'Wide', label: 'Expansive panorama', text: 'A sweeping horizontal vista unfolds layered ridgelines into the deep distance.' },
      { group: 'Wide', label: 'Centered symmetry', text: 'The subject rests precisely centered with calm, formal bilateral symmetry.' },
      { group: 'Wide', label: 'Negative space', text: 'Generous negative space surrounds the focal element with monastic simplicity.' },
      { group: 'Wide', label: 'High horizon', text: 'A high horizon fills the upper frame, emphasizing the tactile ground plane.' },
      { group: 'Near', label: 'Intimate close-up', text: 'An intimate close-up isolates fine surface textures within a shallow depth of field.' },
      { group: 'Near', label: 'Flat lay', text: 'A calm, deliberate top-down flat lay arranges tools and materials across a flat ground.' },
      { group: 'Near', label: 'Threshold view', text: 'Looking across a threshold, the foreground doorway frames the illuminated space beyond.' },
      { group: 'Near', label: 'Selective focus', text: 'A single crisp focal plane emerges from soft foreground and background blur.' },
      { group: 'Near', label: 'Still life grouping', text: 'A quiet tabletop grouping of objects balances mass, silhouette, and empty space.' },
      { group: 'Near', label: 'Cut-off vignette', text: 'The subject extends beyond the frame edges, suggesting an expansive world continuing outside.' },
      { group: 'Angle', label: 'Low angle', text: 'A gentle low-angle perspective lends grounded dignity and stature to the scene.' },
      { group: 'Angle', label: 'Eye level calm', text: 'An honest, unhurried eye-level perspective records the view as if standing quietly in place.' },
      { group: 'Angle', label: 'Overhead planar', text: 'A high overhead perspective flattens the landscape into an abstract geometric tapestry.' },
      { group: 'Angle', label: 'Worm’s-eye look', text: 'Looking up from ground level among the grasses reveals tall trunks against the sky.' },
      { group: 'Angle', label: 'Three-quarter oblique', text: 'A three-quarter isometric vantage reveals two perpendicular planes in balanced depth.' },
      { group: 'Angle', label: 'Bird’s glide', text: 'A gently elevated perspective looks down at a soft angle over tree canopies.' },
      { group: 'Frame', label: 'Frame in frame', text: 'An archway of weathered timber creates a natural frame within the composition.' },
      { group: 'Frame', label: 'Layered foreground', text: 'Softly blurred foreground leaves establish deep atmospheric perspective into the scene.' },
      { group: 'Frame', label: 'Leading line', text: 'A curving path of worn flagstones leads the eye deliberately from foreground to distance.' },
      { group: 'Frame', label: 'Diagonal tension', text: 'A strong diagonal division balances dark shadow on one side against sunlit stone on the other.' },
      { group: 'Frame', label: 'Looking through', text: 'Viewing through a textured, translucent screen gives the background an ethereal mystery.' },
      { group: 'Frame', label: 'Split field', text: 'A split field perspective captures detail both immediately at hand and far on the horizon.' },
      { group: 'Balance', label: 'Golden spiral', text: 'Elements curl along an organic logarithmic spiral, drawing focus toward a quiet resting point.' },
      { group: 'Balance', label: 'Rhythmic repetition', text: 'A gentle repetition of vertical tree trunks creates musical rhythm across the horizontal plane.' },
      { group: 'Balance', label: 'Counterweight balance', text: 'A small, intense focal object balances a large, quiet expanse of empty paper ground.' },
      { group: 'Balance', label: 'Triangular anchor', text: 'Three key masses form a grounded, stable triangle that anchors the composition.' },
      { group: 'Balance', label: 'Off-center tension', text: 'The focal point is placed near the extreme perimeter, creating dynamic compositional pull.' },
      { group: 'Balance', label: 'Layered horizontal bands', text: 'Stacked horizontal strata of foreground, water, and distant mountains organize the frame.' },
      { group: 'Lens', label: 'Compressed telephoto', text: 'A long telephoto focal length compresses distance, stacking mountain ridges into silhouetted layers.' },
      { group: 'Lens', label: 'Natural 50mm view', text: 'A classic normal focal length presents spatial proportions with human, undistorted naturalness.' },
      { group: 'Lens', label: 'Wide environmental', text: 'A gentle wide focal length captures the subject comfortably within its broader context.' },
      { group: 'Lens', label: 'Shallow bokeh wash', text: 'A razor-thin focus point dissolves the background into creamy, circular light disks.' },
      { group: 'Lens', label: 'Pin-sharp infinity', text: 'Hyperfocal sharpness renders every pebble in the foreground and every distant cloud in crisp focus.' },
      { group: 'Lens', label: 'Atmospheric drop-off', text: 'Contrast and saturation fall away steadily with each successive layer of distance.' },
      { group: 'Place', label: 'Water reflection', text: 'The calm surface of still water mirrors the top half of the composition with dreamy symmetry.' },
      { group: 'Place', label: 'Architectural grid', text: 'Clean rectilinear architectural lines divide the image into balanced proportions.' },
      { group: 'Place', label: 'Silhouetted mass', text: 'A dark, textured silhouette in the foreground stands out boldly against a luminous sky.' },
      { group: 'Place', label: 'Organic wandering', text: 'Meandering natural contours guide the gaze lazily across the canvas.' },
      { group: 'Wide', label: 'Stepped terraces', text: 'Ascending stone terraces form rhythmic horizontal lines climbing the frame.' },
      { group: 'Near', label: 'Surface relief', text: 'Extreme raking angle emphasizes the physical topography and raised texture of materials.' },
    ],

    aspects: [
      { group: 'Aspect', label: '16:9 widescreen', text: 'Compose the image for a 16:9 widescreen landscape frame.' },
      { group: 'Aspect', label: '9:16 portrait', text: 'Compose the image for a tall 9:16 portrait frame.' },
      { group: 'Aspect', label: '1:1 square', text: 'Compose the image for a balanced 1:1 square frame.' },
      { group: 'Aspect', label: '21:9 ultrawide', text: 'Compose the image for an expansive 21:9 ultrawide cinematic frame.' },
    ],

    cameras: [
      { group: 'Static', label: 'Static tripod', text: 'The camera is locked on a heavy tripod, perfectly level and motionless.', tip: 'The camera does not budge. Only the life within the scene moves.', tags: ['static'] },
      { group: 'Static', label: 'Static with a breath', text: 'The camera rests on a tripod with the subtlest organic breathing motion.', tip: 'Near-still shot. A micro-breath in the framing keeps it from looking frozen.', tags: ['static'] },
      { group: 'Static', label: 'Locked wide', text: 'A wide locked-off camera observes the entire environment without repositioning.', tip: 'Wide, stationary frame. Viewers explore the scene with their own eyes.', tags: ['static'] },
      { group: 'Static', label: 'Fixed high angle', text: 'The camera remains fixed in an elevated corner, looking down with quiet surveillance.', tip: 'High unmoving viewpoint watching action unfold below.', tags: ['static'] },
      { group: 'Static', label: 'Low ground lock', text: 'The camera sits resting directly on the ground stones, motionless.', tip: 'Pavement or ground level still shot looking straight ahead.', tags: ['static'] },
      { group: 'Push', label: 'Slow push-in', text: 'The camera slowly glides forward on a smooth tracking rail.', tip: 'A straight, measured move in. Things in the center grow gently larger.', tags: ['push'] },
      { group: 'Push', label: 'Push to a detail', text: 'The camera glides inward, narrowing its focus toward a single delicate detail.', tip: 'Slow advance toward a specific feature, drawing curiosity.', tags: ['push'] },
      { group: 'Push', label: 'Creeping push', text: 'The camera creeps forward at an almost imperceptible, meditative crawl.', tip: 'Barely moving in. Builds quiet intimacy without drawing notice to the lens.', tags: ['push'] },
      { group: 'Push', label: 'Rising push-in', text: 'The camera tracks forward while simultaneously rising gently on a jib arm.', tip: 'Moves in and floats upward in one graceful arc.', tags: ['push'] },
      { group: 'Push', label: 'Low glide push', text: 'The camera skims forward just inches above the ground plane.', tip: 'Low-slung forward slide showing texture and terrain rushing gently underneath.', tags: ['push'] },
      { group: 'Pull', label: 'Slow pull-out', text: 'The camera glides backwards on rails, gradually widening the scope of the view.', tip: 'Slow retreat backwards. Reveals surrounding context step by step.', tags: ['pull'] },
      { group: 'Pull', label: 'Reveal pull', text: 'The camera draws back from behind an obstruction, revealing the open vista.', tip: 'Pulls back past an edge, unveiling the broader picture.', tags: ['pull'] },
      { group: 'Pull', label: 'Elevating pull-out', text: 'The camera floats backward and upward, letting the scene recede into the landscape.', tip: 'Backs away and ascends, creating a sense of departure or farewell.', tags: ['pull'] },
      { group: 'Pull', label: 'Threshold pull', text: 'The camera retreats backward through a doorway into a darker interior room.', tip: 'Draws back through an entryway, framing the outdoor scene inside.', tags: ['pull'] },
      { group: 'Pull', label: 'Decelerating pull', text: 'The camera pulls back smoothly, coming to a soft, cushioned rest.', tip: 'Smooth backward movement that gently glides to a stop.', tags: ['pull'] },
      { group: 'Pan', label: 'Pan left', text: 'The camera pivots smoothly from right to left on a fluid head.', tip: 'Horizontal rotation to the left. The tripod stays rooted in one place.', tags: ['pan'] },
      { group: 'Pan', label: 'Pan right', text: 'The camera pivots smoothly from left to right across the horizon.', tip: 'Horizontal rotation to the right, scanning the scene like a turning head.', tags: ['pan'] },
      { group: 'Pan', label: 'Gentle sweep', text: 'The camera performs a gentle, sweeping 60-degree panoramic turn.', tip: 'Wide, patient turn across the landscape.', tags: ['pan'] },
      { group: 'Pan', label: 'Follow pan', text: 'The camera pivots smoothly in place to follow subject motion across the space.', tip: 'The camera body stays stationary while rotating to track action.', tags: ['pan', 'follow'] },
      { group: 'Pan', label: 'Whip-soft pan', text: 'The camera swivels sideways and eases softly into a new framed composition.', tip: 'A brisk turn that lands smoothly on a new target.', tags: ['pan'] },
      { group: 'Tilt', label: 'Tilt up', text: 'The camera tilts smoothly upward from the ground toward the canopy and sky.', tip: 'Pivots vertically up. Starts at ground level and lifts eyes to the sky.', tags: ['tilt'] },
      { group: 'Tilt', label: 'Tilt down', text: 'The camera tilts down from the open sky to settle on the earth below.', tip: 'Pivots vertically down, descending from light to ground.', tags: ['tilt'] },
      { group: 'Tilt', label: 'Pedestal rise', text: 'The camera elevates straight upward vertically without changing its tilt angle.', tip: 'The entire camera lifts straight up like an elevator. Angle stays level.', tags: ['pedestal'] },
      { group: 'Tilt', label: 'Crane down', text: 'The camera descends gracefully on a mechanical jib arm from high overhead.', tip: 'Floats down from high vantage to eye level.', tags: ['crane'] },
      { group: 'Tilt', label: 'Diagonal rise', text: 'The camera tracks upward and diagonally across the facade in one smooth vector.', tip: 'Floats upward and across at an angle.', tags: ['crane'] },
      { group: 'Slide', label: 'Lateral slide', text: 'The camera slides sideways without turning, like looking from a slow train.', tip: 'A straight side move. The camera does not pan. Near things pass faster than far things.', tags: ['slide'] },
      { group: 'Slide', label: 'Tracking slide', text: 'The camera tracks horizontally along a fence line on a smooth slider.', tip: 'Parallels a straight line, keeping distance uniform.', tags: ['slide'] },
      { group: 'Slide', label: 'Slow dolly right', text: 'The camera glides rightward across foreground foliage, shifting visual layers.', tip: 'Moves sideways to let foreground branches drift across the background.', tags: ['slide'] },
      { group: 'Slide', label: 'Creeping lateral', text: 'The camera inches sideways with microscopic smoothness.', tip: 'A barely perceptible sideways drift that animates perspective.', tags: ['slide'] },
      { group: 'Handheld', label: 'Gentle handheld', text: 'The camera is handheld, with a soft human unsteadiness.', tip: 'A person is holding it. The frame breathes a little. It does not shake wildly.', tags: ['handheld'] },
      { group: 'Handheld', label: 'Walking handheld', text: 'The camera moves at an easy walking pace with natural organic footsteps.', tip: 'A person walks with the camera. Soft stepping motion without violent bumps.', tags: ['handheld', 'follow'] },
      { group: 'Handheld', label: 'Shoulder follow', text: 'The camera tracks gently behind a moving subject from just over the shoulder.', tip: 'Follows just behind a moving figure, keeping their direction in view.', tags: ['handheld', 'follow'] },
      { group: 'Handheld', label: 'Side walk along', text: 'The camera matches the stride of a subject from alongside on the path.', tip: 'Walks alongside the subject, maintaining side profile pace.', tags: ['follow'] },
      { group: 'Handheld', label: 'Floating steadicam', text: 'The camera floats effortlessly on an active gimbal stabilizer.', tip: 'Completely smooth moving shot without footstep thumps or bumps.', tags: ['steadicam', 'follow'] },
      { group: 'Orbit', label: 'Slow orbit', text: 'The camera slowly circles 45 degrees around the central focal point.', tip: 'Circles around the subject. Background shifts while subject stays centered.', tags: ['orbit'] },
      { group: 'Orbit', label: 'Half orbit', text: 'The camera tracks in a wide semi-circular arc around the scene.', tip: 'Carves a 180-degree half-ring around the subject.', tags: ['orbit'] },
      { group: 'Orbit', label: 'Overhead arc', text: 'A high overhead camera rotates slowly around a central vertical axis.', tip: 'Top-down turntable rotation above the subject.', tags: ['orbit'] },
      { group: 'Orbit', label: 'Gentle arc in', text: 'The camera curves inward along a shallow spiraling arc toward the center.', tip: 'Combines a push-in with a sideways sweep.', tags: ['orbit'] },
      { group: 'Drone', label: 'Drone fly-over', text: 'An elevated camera glides forward from a high vantage point.', tip: 'High aerial view sailing steadily above the landscape.', tags: ['drone'] },
      { group: 'Drone', label: 'Drone rise', text: 'The aerial camera ascends vertically into the sky, expanding the horizon.', tip: 'Rises straight up into the clouds like an elevator in the sky.', tags: ['drone'] },
      { group: 'Drone', label: 'Low fly along', text: 'A drone skims along just above tree height following the valley contours.', tip: 'Fast, smooth flight skimming over treetops or waves.', tags: ['drone'] },
      { group: 'Drone', label: 'Drifting aerial', text: 'A high camera drifts gently on high-altitude wind currents.', tip: 'Slow, floating high-altitude survey.', tags: ['drone'] },
      { group: 'Special', label: 'Dolly zoom vertigo', text: 'The camera dollies backward while smoothly zooming in, warping background perspective.', tip: 'Classic vertigo effect. The subject size stays constant while the background rushes in.', tags: ['special'] },
      { group: 'Special', label: 'Focus drift', text: 'The camera remains still while the focus plane racks gently from foreground to background.', tip: 'The camera never moves. Sharp focus shifts from near to far.', tags: ['special'] },
    ],

    motions: [
      { group: 'Sky', label: 'Drifting clouds', text: 'Thin clouds drift lazily across the upper sky.', tags: ['sky', 'clouds'] },
      { group: 'Sky', label: 'Cloud shadows', text: 'Patches of soft cloud shadows glide across open fields below.', tags: ['sky', 'shadows', 'lapse'] },
      { group: 'Sky', label: 'Fog bank roll', text: 'A low shelf of morning fog curls slowly around tree bases.', tags: ['sky', 'fog'] },
      { group: 'Sky', label: 'Heat shimmer', text: 'Gentle waves of heat shimmer ripple the air above sunlit stones.', tags: ['heat', 'desert'] },
      { group: 'Sky', label: 'Sky color fade', text: 'The sky subtly shifts in gradient from soft gold to deep twilight blue.', tags: ['sky', 'lapse'] },
      { group: 'Sky', label: 'Morning mist disperse', text: 'Wisps of dawn mist burn away and vanish into warming sunlight.', tags: ['sky', 'fog', 'lapse'] },
      { group: 'Water', label: 'Flowing water', text: 'Clear water ripples over smooth riverstones in an unbroken stream.', tags: ['water'] },
      { group: 'Water', label: 'Falling rain', text: 'Fine vertical raindrops streak down, disturbing small puddles on the ground.', tags: ['water', 'rain'] },
      { group: 'Water', label: 'Puddle rings', text: 'Concentric rings expand across the surface of calm puddles under gentle drops.', tags: ['water', 'rain'] },
      { group: 'Water', label: 'Gentle waves', text: 'Quiet coastal waves roll in and slide up the sand in foaming lace.', tags: ['water', 'coast'] },
      { group: 'Water', label: 'Waterfall mist', text: 'A distant waterfall drops in white lace with a plume of fine rising spray.', tags: ['water'] },
      { group: 'Water', label: 'Still reflection pulse', text: 'A calm lake surface flexes in slow, glassy undulations without breaking.', tags: ['water', 'quiet'] },
      { group: 'Snow', label: 'Falling snow', text: 'Fat, silent snowflakes drift down at varying leisurely speeds.', tags: ['snow'] },
      { group: 'Snow', label: 'Wind-swirled powder', text: 'Gusts of dry powdered snow whisk across the frozen crust.', tags: ['snow', 'wind'] },
      { group: 'Snow', label: 'Melting drip', text: 'Clear droplets drip rhythmically from icicle tips into soft snow beneath.', tags: ['snow', 'water'] },
      { group: 'Snow', label: 'Breath in chill', text: 'Plumes of white condensed breath billow and dissolve in the frosty air.', tags: ['snow', 'chill'] },
      { group: 'Plants', label: 'Swaying grass', text: 'Tall meadow grasses lean and ripple in soft, synchronized waves.', tags: ['plants', 'wind'] },
      { group: 'Plants', label: 'Trembling leaves', text: 'Delicate aspen leaves flutter and shimmer on their slender stems.', tags: ['plants', 'trees'] },
      { group: 'Plants', label: 'Bowing bamboo', text: 'Slender bamboo culms creak and bow gently in the wind.', tags: ['plants', 'wind'] },
      { group: 'Plants', label: 'Falling autumn leaves', text: 'Golden dry leaves detach and spin in wandering spirals to the earth.', tags: ['plants', 'wind'] },
      { group: 'Plants', label: 'Wheat ripples', text: 'A golden wheat field heaves in sweeping gusts like a vast amber ocean.', tags: ['plants', 'wind'] },
      { group: 'Plants', label: 'Creeping ivy shadow', text: 'Shadows of ivy leaves tremble across sunlit stucco walls.', tags: ['plants', 'shadows'] },
      { group: 'Air', label: 'Fluttering curtains', text: 'Light linen curtains billow gently inward from an open window.', tags: ['interior', 'wind', 'cloth'] },
      { group: 'Air', label: 'Hanging laundry', text: 'White cotton sheets flap and swell lazily on a rooftop clothesline.', tags: ['city', 'cloth', 'wind'] },
      { group: 'Air', label: 'Floating dust motes', text: 'Tiny specks of sunlit dust dance and turn in a warm interior shaft of light.', tags: ['interior', 'dust'] },
      { group: 'Air', label: 'Rising steam', text: 'A thin spiral of hot steam curls upward from a tea cup and diffuses.', tags: ['interior', 'steam'] },
      { group: 'Air', label: 'Hanging banner flutter', text: 'Woven fabric banners ripple softly outside an ancient stone pavilion.', tags: ['cloth', 'wind'] },
      { group: 'Light', label: 'Flickering candle', text: 'A solitary candle flame bends and wavers softly in the draft.', tags: ['interior', 'fire'] },
      { group: 'Light', label: 'Glowing embers', text: 'Dying embers in a stone hearth pulse with rhythmic orange warmth.', tags: ['interior', 'fire'] },
      { group: 'Light', label: 'Sunbeam track', text: 'A beam of sunlight creeps across the floorboards as time passes.', tags: ['interior', 'lapse', 'light'] },
      { group: 'Light', label: 'Shadow branches', text: 'Silhouettes of swaying tree branches dance across the drawn paper shoji screen.', tags: ['interior', 'shadows'] },
      { group: 'Light', label: 'Blinking city light', text: 'Distant windows and street lanterns blink on one by one at dusk.', tags: ['city', 'night', 'lapse'] },
      { group: 'Life', label: 'Character walking', text: 'A solitary figure walks steadily away along the stone path.', tags: ['walk', 'figure'] },
      { group: 'Life', label: 'Birds crossing', text: 'A small flock of swallows darts and sweeps across the open sky.', tags: ['sky', 'birds'] },
      { group: 'Life', label: 'Hovering fireflies', text: 'Green bioluminescent fireflies pulse and wander over the evening grass.', tags: ['night', 'fireflies'] },
      { group: 'Life', label: 'Gliding fish school', text: 'A coordinated school of tiny silver fish darts and turns in unison.', tags: ['underwater', 'fish'] },
      { group: 'Life', label: 'Turning pages', text: 'Pages of an open ledger flutter and turn over one by one in the breeze.', tags: ['interior', 'wind'] },
      { group: 'Life', label: 'Sleeping cat breath', text: 'A curled cat sleeps peacefully, its flanks rising and falling in slow breaths.', tags: ['interior', 'quiet'] },
      { group: 'Craft', label: 'Potter wheel spin', text: 'A potter’s kick-wheel spins steadily while clay forms take shape.', tags: ['craft', 'workshop'] },
      { group: 'Craft', label: 'Ink bloom', text: 'A drop of black ink hits wet parchment and blossoms outward in feathery veins.', tags: ['craft', 'ink'] },
      { group: 'Craft', label: 'Waterwheel turn', text: 'A mossy wooden waterwheel turns ponderously, spilling splashing sheets of water.', tags: ['craft', 'water'] },
      { group: 'Craft', label: 'Poured liquid', text: 'Warm amber tea pours smoothly from a spout into an earthenware bowl.', tags: ['interior', 'tea'] },
      { group: 'City', label: 'Light trails', text: 'Distant headlights blur into smooth red and gold trails through the city grid.', tags: ['city', 'trails', 'lapse'] },
      { group: 'City', label: 'Gliding tram', text: 'A vintage electric tram slides smoothly across a cobbled square.', tags: ['city', 'tram'] },
      { group: 'City', label: 'Passing skiff', text: 'A low cedar wooden boat glides down the canal, leaving trailing ripples.', tags: ['water', 'boat'] },
      { group: 'City', label: 'Puddle glow tremor', text: 'Reflections of city lanterns tremble on wet asphalt as gentle raindrops fall.', tags: ['city', 'rain'] },
      { group: 'City', label: 'Steam vent plume', text: 'Puffs of white underground street steam curl upward into cold night air.', tags: ['city', 'steam'] },
      { group: 'Underwater', label: 'Rising bubbles', text: 'Strings of tiny translucent air bubbles rise steadily through clear blue water.', tags: ['underwater', 'bubbles'] },
      { group: 'Underwater', label: 'Caustic shimmer', text: 'Refracted golden light caustics web and dance across the ocean bottom.', tags: ['underwater', 'caustic'] },
      { group: 'Underwater', label: 'Kelp sway', text: 'Towering amber kelp blades sway in long, rhythmic ocean surges.', tags: ['underwater', 'kelp'] },
      { group: 'Underwater', label: 'Jelly pulse', text: 'A translucent bell jellyfish contracts and glides softly upward.', tags: ['underwater', 'jelly'] },
      { group: 'Underwater', label: 'Drifting silt', text: 'Fine suspended seabed particulate drifts through quiet deep blue currents.', tags: ['underwater', 'dust'] },
      { group: 'Space', label: 'Stars wheeling', text: 'The grand wheel of the Milky Way rotates slowly across the vault of night.', tags: ['space', 'stars', 'lapse'] },
      { group: 'Space', label: 'Starfield drift', text: 'Distant pinpricks of bright stellar light drift slowly past the silent viewport.', tags: ['space', 'stars'] },
      { group: 'Space', label: 'Ring shadow crawl', text: 'The sharp shadow of planetary rings creeps slowly across swirling cloud decks.', tags: ['space', 'lapse'] },
      { group: 'Space', label: 'Dust grain float', text: 'Weightless micro-meteorite particles tumble silently in vacuum.', tags: ['space', 'dust'] },
    ],

    speeds: [
      { group: 'Very slow', label: 'Glacial', text: 'What moves in the scene does so at a glacial pace, almost still.' },
      { group: 'Very slow', label: 'Imperceptible whisper', text: 'What moves in the scene drifts at an imperceptible, meditative whisper.' },
      { group: 'Very slow', label: 'Geological patience', text: 'What moves in the scene unfurls with unhurried geological patience.' },
      { group: 'Very slow', label: 'Frozen in amber', text: 'What moves in the scene feels almost caught in amber, suspended in time.' },
      { group: 'Very slow', label: 'Hushed crawl', text: 'What moves in the scene creeps with hushed, breath-like delicacy.' },
      { group: 'Very slow', label: 'Microscopic drift', text: 'What moves in the scene shifts only with microscopic, lingering subtlety.' },
      { group: 'Very slow', label: 'Sleeping pulse', text: 'What moves in the scene breathes with the slow, deep cadence of sleep.' },
      { group: 'Very slow', label: 'Stilled water', text: 'What moves in the scene carries the faint, lingering drift of pond water.' },
      { group: 'Slow', label: 'Soft and slow', text: 'What moves in the scene stays soft and slow.' },
      { group: 'Slow', label: 'Measured grace', text: 'What moves in the scene glides with calm, measured grace.' },
      { group: 'Slow', label: 'Gentle eddy', text: 'What moves in the scene turns with the lazy drift of an autumn leaf on water.' },
      { group: 'Slow', label: 'Unhurried cadence', text: 'What moves in the scene maintains a restful, contemplative cadence.' },
      { group: 'Slow', label: 'Peaceful stroll', text: 'What moves in the scene matches the gentle pace of a slow garden stroll.' },
      { group: 'Slow', label: 'Floating thistle', text: 'What moves in the scene sails softly like airborne thistle down.' },
      { group: 'Slow', label: 'Quiet undulation', text: 'What moves in the scene swells and recedes with quiet, patient rhythm.' },
      { group: 'Slow', label: 'Gentle breeze', text: 'What moves in the scene answers only to a faint, intermittent summer draft.' },
      { group: 'Natural', label: 'Natural walking pace', text: 'What moves in the scene moves about as fast as a person walking.' },
      { group: 'Natural', label: 'Real-world tempo', text: 'What moves in the scene moves at a natural, unforced real-world tempo.' },
      { group: 'Natural', label: 'Rhythmic breath', text: 'What moves in the scene keeps an easy, natural human rhythm.' },
      { group: 'Natural', label: 'Steady stream', text: 'What moves in the scene flows with the constant, relaxed speed of a brook.' },
      { group: 'Natural', label: 'Everyday life', text: 'What moves in the scene progresses with the grounded tempo of daily existence.' },
      { group: 'Natural', label: 'Comfortable stride', text: 'What moves in the scene proceeds with a balanced, comfortable stride.' },
      { group: 'Natural', label: 'Flowing conversation', text: 'What moves in the scene unfolds with the organic rhythm of quiet speech.' },
      { group: 'Natural', label: 'Garden work', text: 'What moves in the scene moves with the steady, measured motion of hand craft.' },
      { group: 'Natural', label: 'Wandering path', text: 'What moves in the scene follows its natural course without rush or pause.' },
      { group: 'Brisk', label: 'Purposeful momentum', text: 'What moves in the scene steps with a crisp, purposeful momentum.' },
      { group: 'Brisk', label: 'Energetic cadence', text: 'What moves in the scene flows with a brisk, lively cadence.' },
      { group: 'Brisk', label: 'Spring freshet', text: 'What moves in the scene tumbles forward like a brisk mountain stream.' },
      { group: 'Brisk', label: 'Swift passage', text: 'What moves in the scene sweeps across the frame with alert vitality.' },
      { group: 'Brisk', label: 'Morning commute', text: 'What moves in the scene carries the brisk, active stride of daybreak.' },
      { group: 'Brisk', label: 'Fluttering wing', text: 'What moves in the scene darts with lively, nimble agility.' },
      { group: 'Brisk', label: 'Passing squall', text: 'What moves in the scene rushes with the clean energy of a sudden wind.' },
      { group: 'Brisk', label: 'Galloping rhythm', text: 'What moves in the scene travels with an eager, brisk forward pulse.' },
      { group: 'Fast', label: 'Edge of blur', text: 'What moves in the scene races, with energy at the edge of blur.' },
      { group: 'Fast', label: 'Swift rush', text: 'What moves in the scene sweeps by in a swift, exhilarating rush of motion.' },
      { group: 'Fast', label: 'Darting flash', text: 'What moves in the scene streaks across the visual field in vivid flashes.' },
      { group: 'Fast', label: 'Whipping wind', text: 'What moves in the scene tears along like gale-force gusts.' },
      { group: 'Fast', label: 'Rapid torrent', text: 'What moves in the scene charges like a swollen river in spring flood.' },
      { group: 'Fast', label: 'Furious swirl', text: 'What moves in the scene spins in a rapid, vortex-like velocity.' },
      { group: 'Fast', label: 'Timelapse flight', text: 'What moves in the scene speeds past in accelerated timelapse velocity.' },
      { group: 'Fast', label: 'Fleet runner', text: 'What moves in the scene sprints forward with breathless speed.' },
      { group: 'Fast', label: 'Meteor arc', text: 'What moves in the scene flashes and fades with the sudden speed of a shooting star.' },
    ],

    durations: [
      { group: 'Duration', label: '3 seconds', text: 'The shot lasts 3 seconds.' },
      { group: 'Duration', label: '5 seconds', text: 'The shot lasts 5 seconds.' },
      { group: 'Duration', label: '10 seconds', text: 'The shot lasts 10 seconds.' },
    ],

    films: [
      { group: 'Cinematic', label: 'Cinematic 24fps', text: 'The footage looks like a cinematic film at 24 frames per second, with fine grain and natural motion.' },
      { group: 'Cinematic', label: 'Anamorphic widescreen', text: 'The clip carries the subtle oval bokeh and gentle horizontal blue flaring of classic anamorphic lenses.' },
      { group: 'Cinematic', label: 'Noir high-contrast', text: 'The footage is graded in deep monochrome with rich inky shadows and luminous silver highlights.' },
      { group: 'Cinematic', label: 'Technicolor 3-strip', text: 'The colors gleam with the rich, saturated warmth and dye stability of vintage 1950s Technicolor.' },
      { group: 'Cinematic', label: 'Arri Alexa modern', text: 'The footage displays pristine dynamic range, natural skin tonality, and soft highlight rolloff.' },
      { group: 'Cinematic', label: 'Bleach bypass', text: 'The visuals have a gritty, desaturated palette with harsh silver contrast from bleach-bypass processing.' },
      { group: 'Time', label: 'Daylight timelapse', text: 'The sequence is captured as an ultra-smooth daylight timelapse where clouds and shadows glide across the landscape.', tags: ['lapse'] },
      { group: 'Time', label: 'Day-to-night lapse', text: 'The clip is graded as a day-to-night timelapse capturing subtle shifts in sky hue and twilight lights.', tags: ['lapse'] },
      { group: 'Time', label: 'Slow motion 120fps', text: 'The motion is recorded at 120 frames per second, stretching time into silky, weightless elegance.' },
      { group: 'Time', label: 'Extreme high-speed', text: 'Shot at 1000 frames per second, every micro-droplet and fiber impact is frozen in crystal clarity.' },
      { group: 'Time', label: 'Stop-motion shutter', text: 'The movement exhibits the tactile step-frame jitter and handcrafted charm of stop-motion puppets.' },
      { group: 'Anime', label: 'Anime background film', text: 'The footage has the soft, luminous painted cel quality of classic Japanese animation masterworks.' },
      { group: 'Anime', label: 'Ink wash motion', text: 'The imagery flows like an animated sumi-e ink painting, with wet edges expanding into paper.' },
      { group: 'Anime', label: 'Watercolor animation', text: 'The scene looks like hand-painted watercolours brought to life with gentle organic washes.' },
      { group: 'Anime', label: 'Paper cutout animation', text: 'The scene animates with the crisp silhouettes and multi-plane depth of silhouette paper animation.' },
      { group: 'Anime', label: 'Claymation patina', text: 'Surfaces reveal thumbprint impressions and the warm, physical lighting of armature clay animation.' },
      { group: 'Stock', label: '16mm celluloid', text: 'The footage carries the warm halation and visible organic grain of 16mm celluloid film.' },
      { group: 'Stock', label: 'Super 8 home film', text: 'The footage has the soft nostalgia, subtle gate weave, and warm amber color of Super 8 film.' },
      { group: 'Stock', label: 'Archival 35mm', text: 'The clip presents the dignity of well-preserved 1930s nitrate film with faint dust and steady pacing.' },
      { group: 'Stock', label: 'Kodachrome 64', text: 'The image has the iconic rich reds, vivid yellow greens, and clean archival contrast of Kodachrome.' },
      { group: 'Stock', label: 'Fujichrome Velvia', text: 'Colors pop with the intense saturation, deep black floor, and emerald greens of Velvia reversal stock.' },
      { group: 'Stock', label: 'Tri-X Black & White', text: 'The sequence is rendered in high-grain, punchy black-and-white reminiscent of classic photojournalism.' },
      { group: 'Video', label: 'Documentary cinema', text: 'The clip carries the patient, observational dignity of a BBC natural history documentary.' },
      { group: 'Video', label: 'VHS memory', text: 'The footage has the soft magnetic tracking lines, color bleed, and nostalgic warmth of analog videotape.' },
      { group: 'Video', label: 'Broadcast 1970s', text: 'The visuals display the soft scanlines, CRT phosphors, and warm tube-camera glow of 1970s broadcast.' },
      { group: 'Video', label: 'Digital cinema raw', text: 'The footage is graded from flat log cinema raw into an organic, print-film emulation profile.' },
      { group: 'Video', label: 'Security monitor', text: 'The video appears through the quiet, desaturated monochrome of a high-resolution surveillance lens.' },
      { group: 'Art', label: 'Pastel dream grade', text: 'The palette is washed in muted pastel hues with glowing highlights and low, gentle contrast.' },
      { group: 'Art', label: 'Moonlit grade', text: 'The clip is color-timed for deep silver-cyan nocturnal moonlight with velvety shadow detail.' },
      { group: 'Art', label: 'Morning clarity', text: 'The grade is crisp, luminous, and cool, capturing the pristine purity of early morning air.' },
      { group: 'Art', label: 'Golden hour warmth', text: 'Every frame is saturated with radiant honey tones and soft flare from a low setting sun.' },
      { group: 'Art', label: 'Dusk twilight glow', text: 'Graded in dusty plum and indigo, with warm lantern sparks floating in the gathering dark.' },
      { group: 'Art', label: 'Diorama miniature look', text: 'A selective tilt-shift optical plane transforms the scene into an enchanting living diorama.' },
      { group: 'Lens', label: 'Dream diffusion', text: 'The footage carries a vintage pro-mist diffusion creating soft halation around highlights and gentle bloom.' },
      { group: 'Lens', label: 'Pinhole lens', text: 'Soft edge vignetting and infinite depth of field evoke an ancient wooden pinhole camera.' },
      { group: 'Lens', label: 'Infrared film', text: 'Foliage glows with chalky white luminosity against inky black skies in classic wood-effect infrared.' },
      { group: 'Lens', label: 'Cross-processed', text: 'Cross-processing color reversal film in negative chemistry produces shifted cyans and yellow highlights.' },
      { group: 'Lens', label: 'Double exposure', text: 'A secondary layer of botanical textures is delicately ghosted and double-exposed into the frame.' },
      { group: 'Lens', label: 'Solarized Sabbatier', text: 'Tonal values partially invert along high-contrast lines, creating an ethereal silver outline.' },
      { group: 'Lens', label: 'Petzval swirly bokeh', text: 'The image has the pronounced swirly peripheral bokeh and sharp central sweet spot of a brass 19th-century Petzval lens.' },
      { group: 'Lens', label: 'CCTV surveillance', text: 'The video captures the quiet observational detachment of a low-noise monochrome surveillance sensor.' },
    ],
  };

  /* ==========================================================================
     2. DETERMINISTIC HASH & RNG
     ========================================================================== */
  function fnv1a(str) {
    let hash = 2166136261 >>> 0;
    for (let i = 0; i < str.length; i++) {
      hash ^= str.charCodeAt(i);
      hash = Math.imul(hash, 16777619) >>> 0;
    }
    return hash >>> 0;
  }

  function mulberry32(a) {
    let state = a >>> 0;
    return function () {
      let t = (state += 0x6d2b79f5);
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  /* ==========================================================================
     3. UTILITIES & STRING PARSING
     ========================================================================== */
  function escapeHTML(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function capitalize(s) {
    if (!s) return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  function cleanSentence(s) {
    let trimmed = String(s || '').trim();
    if (!trimmed) return '';
    if (!/[.!?]$/.test(trimmed)) {
      trimmed += '.';
    }
    return capitalize(trimmed);
  }

  const FRANCHISE_MAP = {
    'star wars': 'a worn space-opera of desert planets and ancient ships',
    'harry potter': 'a candlelit school of moving staircases and stone corridors',
    'pokémon': 'a colourful world of cute pocket monsters',
    'pokemon': 'a colourful world of cute pocket monsters',
    'ghibli': 'a hand-painted landscape in the manner of a gentle animated film',
    'studio ghibli': 'a hand-painted landscape in the manner of a gentle animated film',
    'zelda': 'a mythic kingdom of verdant ruins, ancient guardians, and forgotten shrines',
    'the legend of zelda': 'a mythic kingdom of verdant ruins, ancient guardians, and forgotten shrines',
    'mario': 'a whimsical kingdom of rolling green hills, brick arches, and playful mushrooms',
    'super mario': 'a whimsical kingdom of rolling green hills, brick arches, and playful mushrooms',
    'marvel': 'a sprawling comic universe of cosmic heroes, high technology, and vibrant conflicts',
    'disney': 'a fairytale realm of storybook castles, enchanted woodlands, and warm wonder',
    'minecraft': 'a blocky, voxel landscape of square mountains, pixelated pine forests, and quiet waters',
  };

  function applyFranchiseReplacement(text, enabled) {
    if (!enabled || !text) return text;
    let result = text;
    for (const [key, replacement] of Object.entries(FRANCHISE_MAP)) {
      const regex = new RegExp(`\\b${key}\\b`, 'gi');
      if (regex.test(result)) {
        result = result.replace(regex, replacement);
      }
    }
    return result;
  }

  function detectPlaceFromKeyword(kw) {
    const lower = String(kw || '').toLowerCase();
    if (/\b(desert|dune|dunes|sahara|mesa|canyon|arid)\b/i.test(lower)) return 'desert';
    if (/\b(underwater|coral|kelp|sea floor|ocean floor|reef|abyss|submerged)\b/i.test(lower)) return 'underwater';
    if (/\b(space|orbit|starfield|cosmos|galaxy|asteroid|nebula|planetary)\b/i.test(lower)) return 'space';
    if (/\b(city|urban|cyberpunk|street|metropolis|alley|downtown|plaza)\b/i.test(lower)) return 'city';
    if (/\b(forest|meadow|mountain|woods|pine|valley|lake|marsh|grove|nature)\b/i.test(lower)) return 'nature';
    if (/\b(beach|cove|harbour|harbor|coast|shore|tidepool|cliff)\b/i.test(lower)) return 'coast';
    if (/\b(room|studio|interior|hearth|kitchen|loft|library|workshop)\b/i.test(lower)) return 'interior';
    return null;
  }

  function getActiveKeyword(keywordLine, seed, turn) {
    if (!keywordLine || !keywordLine.trim()) return '';
    const tokens = keywordLine.split(',').map((s) => s.trim()).filter(Boolean);
    if (tokens.length === 0) return '';
    if (tokens.length === 1) return tokens[0];

    const rng = mulberry32(fnv1a(seed + ':keywords'));
    const shuffled = [...tokens];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    const index = Math.abs(turn) % shuffled.length;
    return shuffled[index];
  }

  function isProperPlaceName(s) {
    return /^(kyoto|tokyo|paris|rome|london|new york|berlin|osaka|venice|cairo|athens)\b/i.test(s.trim());
  }

  function formatWorldKeyword(keyword, rng) {
    const kw = keyword.trim();
    const lower = kw.toLowerCase();
    let noun = kw;

    if (!/^(a|an|the)\b/i.test(lower) && !isProperPlaceName(kw)) {
      const startsWithVowel = /^[aeiou]/i.test(lower);
      noun = (startsWithVowel ? 'an ' : 'a ') + kw;
    }

    const leads = [
      `A sweeping view of ${noun}.`,
      `The setting is ${noun}.`,
      `The frame opens onto ${noun}.`,
    ];
    return cleanSentence(leads[Math.floor(rng() * leads.length)]);
  }

  function formatBlendKeyword(keyword, rng) {
    const kw = keyword.trim();
    const templates = [
      `Woven through the picture is a sense of ${kw}.`,
      `A quiet flavour of ${kw} sits inside the scene.`,
      `The theme stays, with a thread of ${kw} running through it.`,
    ];
    return cleanSentence(templates[Math.floor(rng() * templates.length)]);
  }

  function filterCoherentEntries(bank, place, kind, rng) {
    let filtered = [...bank];

    if (kind === 'time') {
      if (place === 'desert') {
        filtered = filtered.filter((e) => {
          const t = e.tags || [];
          return !t.includes('rain') && !t.includes('snow') && !t.includes('storm');
        });
        if (rng() < 0.45) {
          const heatItems = filtered.filter((e) => (e.tags || []).includes('heat') || (e.tags || []).includes('dust'));
          if (heatItems.length > 0) return heatItems;
        }
      } else if (place === 'underwater') {
        filtered = filtered.filter((e) => {
          const t = e.tags || [];
          return !t.includes('wind') && !t.includes('rain') && !t.includes('snow') && !t.includes('fog') && !t.includes('clouds');
        });
        const uw = filtered.filter((e) => (e.tags || []).includes('underwater'));
        if (uw.length > 0) return uw;
      } else if (place === 'space') {
        const sp = filtered.filter((e) => (e.tags || []).includes('space'));
        if (sp.length > 0) return sp;
      } else if (place === 'interior') {
        filtered = filtered.filter((e) => {
          const t = e.tags || [];
          return !t.includes('storm') && !t.includes('snow');
        });
      }
    } else if (kind === 'lighting') {
      if (place === 'underwater') {
        if (rng() < 0.7) {
          const caustics = filtered.filter((e) => (e.tags || []).includes('caustic') || (e.tags || []).includes('underwater'));
          if (caustics.length > 0) return caustics;
        }
      } else if (place === 'space') {
        const sp = filtered.filter((e) => (e.tags || []).includes('space') || (e.tags || []).includes('stars'));
        if (sp.length > 0) return sp;
      }
    } else if (kind === 'motion') {
      if (place === 'desert') {
        filtered = filtered.filter((e) => {
          const t = e.tags || [];
          return !t.includes('rain') && !t.includes('snow') && !t.includes('water');
        });
      } else if (place === 'underwater') {
        filtered = filtered.filter((e) => (e.tags || []).includes('underwater'));
      } else if (place === 'space') {
        filtered = filtered.filter((e) => (e.tags || []).includes('space'));
      } else if (place === 'interior') {
        filtered = filtered.filter((e) => {
          const t = e.tags || [];
          return t.includes('interior') || t.includes('craft') || t.includes('shadows');
        });
      } else if (place === 'nature' || place === 'coast') {
        filtered = filtered.filter((e) => !(e.tags || []).includes('city'));
      } else if (place === 'city') {
        if (rng() < 0.33) {
          const cityTr = filtered.filter((e) => (e.tags || []).includes('city') || (e.tags || []).includes('trails'));
          if (cityTr.length > 0) return cityTr;
        }
      }
    } else if (kind === 'camera') {
      if (place === 'underwater' || place === 'interior') {
        filtered = filtered.filter((e) => !(e.tags || []).includes('drone'));
      }
    }

    return filtered.length > 0 ? filtered : bank;
  }

  /* ==========================================================================
     4. STORAGE MANAGER
     ========================================================================== */
  const Storage = {
    get(key, defaultValue) {
      try {
        const val = localStorage.getItem(key);
        if (val === null || val === undefined) return defaultValue;
        return JSON.parse(val);
      } catch (e) {
        return defaultValue;
      }
    },
    set(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
      } catch (e) {
        showToast('Could not save. Browser storage is full or blocked.', 'error');
        return false;
      }
    },
    getString(key, defaultValue) {
      try {
        const val = localStorage.getItem(key);
        return val !== null ? val : defaultValue;
      } catch (e) {
        return defaultValue;
      }
    },
    setString(key, value) {
      try {
        localStorage.setItem(key, String(value));
        return true;
      } catch (e) {
        showToast('Could not save. Browser storage is full or blocked.', 'error');
        return false;
      }
    },
  };

  /* ==========================================================================
     5. APPLICATION STATE
     ========================================================================== */
  const DEFAULT_NEG = 'people, faces, hands, text, letters, logos, watermark, signature, blurry, low quality, distorted anatomy, extra limbs';

  const State = {
    section: 'bg', // 'bg' | 'anim'
    theme: Storage.getString('moap.themePick', '') === 'dark' ? 'dark' : 'light',
    dye: (function () {
      const stored = Storage.getString('moap.cardGrade', 'clay');
      return stored === 'indigo' || stored === 'moss' ? stored : 'clay';
    })(),
    copyNegative: Storage.getString('moap.copyNegative', '0') === '1',

    keywords: Storage.get('moap.keywords', {
      share: true,
      bg: { text: '', mode: 'world', describe: false },
      anim: { text: '', mode: 'world', describe: false },
    }),

    keywordRecent: Storage.get('moap.keywordRecent', []),

    bg: Storage.get('moap.bg', {
      seed: '1847',
      clean: true,
      negToggle: true,
      negText: DEFAULT_NEG,
      values: {},
      locks: {},
    }),

    anim: Storage.get('moap.anim', {
      seed: '1847',
      startingScene: '',
      startingSceneLocked: false,
      loop: false,
      values: {},
      locks: {},
    }),

    bgTurn: Number(Storage.getString('moap.bgTurn', '0')),
    animTurn: Number(Storage.getString('moap.animTurn', '0')),

    library: Storage.get('moap.library', {
      favourites: [],
      history: [],
    }),

    activeTab: 'history', // 'favourites' | 'history'
    searchQuery: '',
    currentHeroEntry: null,
    focusedPlateId: null,
  };

  // Restore current hero entry from latest history if available
  if (State.library.history.length > 0) {
    State.currentHeroEntry = State.library.history[0];
  }

  /* ==========================================================================
     6. GENERATOR LOGIC
     ========================================================================== */
  function generatePrompt() {
    const isBg = State.section === 'bg';
    let entry;

    if (isBg) {
      const kw = State.keywords.share ? State.keywords.bg.text : State.keywords.bg.text;
      const kwMode = State.keywords.bg.mode || 'world';
      const descr = State.keywords.bg.describe || false;

      const seedKey = JSON.stringify({
        kind: 'background',
        seed: State.bg.seed,
        turn: State.bgTurn,
        keywordText: kw,
        keywordMode: kwMode,
        describeInstead: descr,
        values: State.bg.values,
        locks: State.bg.locks,
        clean: State.bg.clean,
        negToggle: State.bg.negToggle,
      });

      const hash = fnv1a(seedKey);
      const rng = mulberry32(hash);

      const warnings = [];
      const parts = [];

      let activeKw = getActiveKeyword(kw, State.bg.seed, State.bgTurn);
      if (descr && activeKw) {
        activeKw = applyFranchiseReplacement(activeKw, true);
      }
      const kwPlace = activeKw ? detectPlaceFromKeyword(activeKw) : null;

      // Theme / scene
      let sceneEntry;
      if (State.bg.locks['scene'] && State.bg.values['scene']) {
        sceneEntry = BANKS.scenes.find((s) => s.label === State.bg.values['scene']) || BANKS.scenes[0];
      } else if (State.bg.values['scene'] && State.bg.values['scene'] !== 'Any' && State.bg.values['scene'] !== '__from_keywords__') {
        sceneEntry = BANKS.scenes.find((s) => s.label === State.bg.values['scene']) || BANKS.scenes[0];
      } else {
        let candidates = BANKS.scenes;
        if (kwPlace) {
          const placeCand = candidates.filter((s) => s.place === kwPlace);
          if (placeCand.length > 0) candidates = placeCand;
        }
        sceneEntry = candidates[Math.floor(rng() * candidates.length)];
      }

      const activePlace = kwPlace || sceneEntry.place || 'nature';
      let sceneSentence = sceneEntry.text;
      if (activeKw && kwMode === 'world') {
        sceneSentence = formatWorldKeyword(activeKw, rng);
      }
      parts.push({ key: 'scene', label: 'Theme / scene', text: sceneSentence });

      // Time & weather
      let timeEntry;
      if (State.bg.locks['time'] && State.bg.values['time']) {
        timeEntry = BANKS.times.find((t) => t.label === State.bg.values['time']) || BANKS.times[0];
      } else if (State.bg.values['time'] && State.bg.values['time'] !== 'Any') {
        timeEntry = BANKS.times.find((t) => t.label === State.bg.values['time']) || BANKS.times[0];
      } else {
        const candidates = filterCoherentEntries(BANKS.times, activePlace, 'time', rng);
        timeEntry = candidates[Math.floor(rng() * candidates.length)];
      }

      if (activePlace === 'desert') {
        const tags = timeEntry.tags || [];
        if (tags.includes('rain') || tags.includes('snow') || tags.includes('storm')) {
          warnings.push(`These locked choices disagree: desert with ${timeEntry.label.toLowerCase()}.`);
        }
      }
      const timeSentence = `It is ${timeEntry.text}.`;
      parts.push({ key: 'time', label: 'Time & weather', text: timeSentence });

      // Lighting
      let lightEntry;
      if (State.bg.locks['lighting'] && State.bg.values['lighting']) {
        lightEntry = BANKS.lighting.find((l) => l.label === State.bg.values['lighting']) || BANKS.lighting[0];
      } else if (State.bg.values['lighting'] && State.bg.values['lighting'] !== 'Any') {
        lightEntry = BANKS.lighting.find((l) => l.label === State.bg.values['lighting']) || BANKS.lighting[0];
      } else {
        const candidates = filterCoherentEntries(BANKS.lighting, activePlace, 'lighting', rng);
        lightEntry = candidates[Math.floor(rng() * candidates.length)];
      }
      const lightSentence = lightEntry.text;
      parts.push({ key: 'lighting', label: 'Lighting', text: lightSentence });

      // Mood
      let moodEntry;
      if (State.bg.locks['mood'] && State.bg.values['mood']) {
        moodEntry = BANKS.moods.find((m) => m.label === State.bg.values['mood']) || BANKS.moods[0];
      } else if (State.bg.values['mood'] && State.bg.values['mood'] !== 'Any') {
        moodEntry = BANKS.moods.find((m) => m.label === State.bg.values['mood']) || BANKS.moods[0];
      } else {
        moodEntry = BANKS.moods[Math.floor(rng() * BANKS.moods.length)];
      }
      const moodSentence = `The mood is ${moodEntry.text}.`;
      parts.push({ key: 'mood', label: 'Mood', text: moodSentence });

      // Style
      let styleEntry;
      if (State.bg.locks['style'] && State.bg.values['style']) {
        styleEntry = BANKS.styles.find((s) => s.label === State.bg.values['style']) || BANKS.styles[0];
      } else if (State.bg.values['style'] && State.bg.values['style'] !== 'Any') {
        styleEntry = BANKS.styles.find((s) => s.label === State.bg.values['style']) || BANKS.styles[0];
      } else {
        styleEntry = BANKS.styles[Math.floor(rng() * BANKS.styles.length)];
      }
      const styleSentence = styleEntry.text;
      parts.push({ key: 'style', label: 'Art style', text: styleSentence });

      // Palette
      let palEntry;
      if (State.bg.locks['palette'] && State.bg.values['palette']) {
        palEntry = BANKS.palettes.find((p) => p.label === State.bg.values['palette']) || BANKS.palettes[0];
      } else if (State.bg.values['palette'] && State.bg.values['palette'] !== 'Any') {
        palEntry = BANKS.palettes.find((p) => p.label === State.bg.values['palette']) || BANKS.palettes[0];
      } else {
        palEntry = BANKS.palettes[Math.floor(rng() * BANKS.palettes.length)];
      }
      const palSentence = `The palette is ${palEntry.text}.`;
      parts.push({ key: 'palette', label: 'Colour palette', text: palSentence });

      // Composition
      let compEntry;
      if (State.bg.locks['composition'] && State.bg.values['composition']) {
        compEntry = BANKS.compositions.find((c) => c.label === State.bg.values['composition']) || BANKS.compositions[0];
      } else if (State.bg.values['composition'] && State.bg.values['composition'] !== 'Any') {
        compEntry = BANKS.compositions.find((c) => c.label === State.bg.values['composition']) || BANKS.compositions[0];
      } else {
        compEntry = BANKS.compositions[Math.floor(rng() * BANKS.compositions.length)];
      }
      const compSentence = compEntry.text;
      parts.push({ key: 'composition', label: 'Composition', text: compSentence });

      // Aspect
      let aspectEntry;
      if (State.bg.locks['aspect'] && State.bg.values['aspect']) {
        aspectEntry = BANKS.aspects.find((a) => a.label === State.bg.values['aspect']) || BANKS.aspects[1];
      } else if (State.bg.values['aspect'] && State.bg.values['aspect'] !== 'Any') {
        aspectEntry = BANKS.aspects.find((a) => a.label === State.bg.values['aspect']) || BANKS.aspects[1];
      } else {
        aspectEntry = BANKS.aspects[Math.floor(rng() * BANKS.aspects.length)];
      }
      const aspectSentence = aspectEntry.text;
      parts.push({ key: 'aspect', label: 'Aspect ratio', text: aspectSentence });

      // Clean background
      const cleanBgOn = State.bg.clean !== false;
      const cleanBackgroundSentence = cleanBgOn ? 'The scene stays empty of people, lettering, logos, and watermarks.' : '';
      if (cleanBackgroundSentence) {
        parts.push({ key: 'clean', label: 'Clean background', text: cleanBackgroundSentence });
      }

      // Ordering variation
      const orderIdx = Math.floor(rng() * 4);
      let mainSentences;
      switch (orderIdx) {
        case 1:
          mainSentences = [compSentence, sceneSentence, lightSentence, styleSentence, moodSentence, timeSentence, palSentence];
          break;
        case 2:
          mainSentences = [sceneSentence, timeSentence, lightSentence, moodSentence, styleSentence, palSentence, compSentence];
          break;
        case 3:
          mainSentences = [styleSentence, sceneSentence, lightSentence, palSentence, timeSentence, moodSentence, compSentence];
          break;
        default:
          mainSentences = [sceneSentence, styleSentence, lightSentence, timeSentence, palSentence, moodSentence, compSentence];
          break;
      }

      if (activeKw) {
        if (kwMode === 'exact') {
          mainSentences.unshift(cleanSentence(activeKw));
        } else if (kwMode === 'blend') {
          const blendSentence = formatBlendKeyword(activeKw, rng);
          mainSentences.splice(2, 0, blendSentence);
          parts.push({ key: 'keyword', label: 'Keyword blend', text: blendSentence });
        }
      }

      const allSentences = [...mainSentences, aspectSentence];
      if (cleanBackgroundSentence) {
        allSentences.push(cleanBackgroundSentence);
      }

      const fullText = allSentences
        .map((s) => cleanSentence(s))
        .filter(Boolean)
        .join(' ')
        .replace(/\s+/g, ' ');

      const negative = State.bg.negToggle !== false ? (State.bg.negText?.trim() || DEFAULT_NEG) : '';

      entry = {
        id: 'bg_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 6),
        kind: 'background',
        text: fullText,
        parts,
        negative,
        stamp: sceneEntry.label,
        stamp2: styleEntry.label,
        warnings,
        created: new Date().toISOString(),
        starred: false,
      };

      State.bgTurn += 1;
      Storage.setString('moap.bgTurn', State.bgTurn);
    } else {
      // ANIMATION
      const kw = State.keywords.share ? State.keywords.bg.text : State.keywords.anim.text;
      const kwMode = State.keywords.anim.mode || 'world';
      const descr = State.keywords.anim.describe || false;

      const seedKey = JSON.stringify({
        kind: 'animation',
        seed: State.anim.seed,
        turn: State.animTurn,
        keywordText: kw,
        keywordMode: kwMode,
        describeInstead: descr,
        values: State.anim.values,
        locks: State.anim.locks,
        startingScene: State.anim.startingScene,
        startingSceneLocked: State.anim.startingSceneLocked,
        loop: State.anim.loop,
      });

      const hash = fnv1a(seedKey);
      const rng = mulberry32(hash);

      const warnings = [];
      const parts = [];

      let activeKw = getActiveKeyword(kw, State.anim.seed, State.animTurn);
      if (descr && activeKw) {
        activeKw = applyFranchiseReplacement(activeKw, true);
      }
      const kwPlace = activeKw ? detectPlaceFromKeyword(activeKw) : null;

      // 1. Subject / scene
      let sceneText = '';
      let scenePlace = kwPlace || 'nature';
      let startingSceneLabel = 'Scene';

      if (State.anim.startingScene && State.anim.startingScene.trim()) {
        sceneText = cleanSentence(State.anim.startingScene.trim());
        startingSceneLabel = 'Custom scene';
        const detected = detectPlaceFromKeyword(sceneText);
        if (detected) scenePlace = detected;
      } else {
        let candidates = BANKS.scenes;
        if (kwPlace) {
          const placeCand = candidates.filter((s) => s.place === kwPlace);
          if (placeCand.length > 0) candidates = placeCand;
        }
        const pickedScene = candidates[Math.floor(rng() * candidates.length)];
        scenePlace = pickedScene.place || 'nature';
        startingSceneLabel = pickedScene.label;

        if (activeKw && kwMode === 'world') {
          sceneText = formatWorldKeyword(activeKw, rng);
        } else {
          sceneText = pickedScene.text;
        }
      }
      parts.push({ key: 'scene', label: 'Subject / scene', text: sceneText });

      // 2. Motion
      let motionEntry;
      if (State.anim.locks['motion'] && State.anim.values['motion']) {
        motionEntry = BANKS.motions.find((m) => m.label === State.anim.values['motion']) || BANKS.motions[0];
      } else if (State.anim.values['motion'] && State.anim.values['motion'] !== 'Any') {
        motionEntry = BANKS.motions.find((m) => m.label === State.anim.values['motion']) || BANKS.motions[0];
      } else {
        const candidates = filterCoherentEntries(BANKS.motions, scenePlace, 'motion', rng);
        motionEntry = candidates[Math.floor(rng() * candidates.length)];
      }
      const motionSentence = cleanSentence(motionEntry.text);
      parts.push({ key: 'motion', label: 'Scene motion', text: motionSentence });

      // 3. Camera
      let cameraEntry;
      const isWalkingMotion = (motionEntry.tags || []).includes('walk');
      if (State.anim.locks['camera'] && State.anim.values['camera']) {
        cameraEntry = BANKS.cameras.find((c) => c.label === State.anim.values['camera']) || BANKS.cameras[0];
      } else if (State.anim.values['camera'] && State.anim.values['camera'] !== 'Any') {
        cameraEntry = BANKS.cameras.find((c) => c.label === State.anim.values['camera']) || BANKS.cameras[0];
      } else {
        let candidates = filterCoherentEntries(BANKS.cameras, scenePlace, 'camera', rng);
        if (isWalkingMotion) {
          const followOptions = candidates.filter((c) => {
            const t = c.tags || [];
            return (t.includes('follow') || t.includes('push') || t.includes('handheld')) && !t.includes('orbit') && !t.includes('drone');
          });
          if (followOptions.length > 0) candidates = followOptions;
        }
        cameraEntry = candidates[Math.floor(rng() * candidates.length)];
      }

      if (isWalkingMotion) {
        const cTags = cameraEntry.tags || [];
        if (cTags.includes('orbit') || cTags.includes('drone')) {
          warnings.push(`These locked choices disagree: walking figure with ${cameraEntry.label.toLowerCase()}.`);
        }
      }
      if (scenePlace === 'underwater' && (cameraEntry.tags || []).includes('drone')) {
        warnings.push('These locked choices disagree: underwater scene with aerial drone.');
      }
      const cameraSentence = cleanSentence(cameraEntry.text);
      parts.push({ key: 'camera', label: 'Camera movement', text: cameraSentence });

      // 4. Film look
      let filmEntry;
      if (State.anim.locks['film'] && State.anim.values['film']) {
        filmEntry = BANKS.films.find((f) => f.label === State.anim.values['film']) || BANKS.films[0];
      } else if (State.anim.values['film'] && State.anim.values['film'] !== 'Any') {
        filmEntry = BANKS.films.find((f) => f.label === State.anim.values['film']) || BANKS.films[0];
      } else {
        const isLapseMotion = (motionEntry.tags || []).includes('lapse');
        let candidates = [...BANKS.films];
        if (isLapseMotion && rng() < 0.6) {
          const lapseFilms = candidates.filter((f) => (f.tags || []).includes('lapse'));
          if (lapseFilms.length > 0) candidates = lapseFilms;
        } else if (!isLapseMotion) {
          candidates = candidates.filter((f) => !(f.tags || []).includes('lapse'));
        }
        filmEntry = candidates[Math.floor(rng() * candidates.length)];
      }

      if ((filmEntry.tags || []).includes('lapse') && !(motionEntry.tags || []).includes('lapse')) {
        warnings.push('These locked choices disagree: timelapse look paired with non-timelapse motion.');
      }
      const filmSentence = cleanSentence(filmEntry.text);
      parts.push({ key: 'film', label: 'Film look', text: filmSentence });

      // 5. Timing
      let speedEntry;
      if (State.anim.locks['speed'] && State.anim.values['speed']) {
        speedEntry = BANKS.speeds.find((s) => s.label === State.anim.values['speed']) || BANKS.speeds[8];
      } else if (State.anim.values['speed'] && State.anim.values['speed'] !== 'Any') {
        speedEntry = BANKS.speeds.find((s) => s.label === State.anim.values['speed']) || BANKS.speeds[8];
      } else {
        speedEntry = BANKS.speeds[Math.floor(rng() * BANKS.speeds.length)];
      }
      const speedSentence = cleanSentence(speedEntry.text);

      let durationEntry;
      if (State.anim.locks['duration'] && State.anim.values['duration']) {
        durationEntry = BANKS.durations.find((d) => d.label === State.anim.values['duration']) || BANKS.durations[1];
      } else if (State.anim.values['duration'] && State.anim.values['duration'] !== 'Any') {
        durationEntry = BANKS.durations.find((d) => d.label === State.anim.values['duration']) || BANKS.durations[1];
      } else {
        durationEntry = BANKS.durations[Math.floor(rng() * BANKS.durations.length)];
      }
      const durationSentence = cleanSentence(durationEntry.text);

      const loopSentence = State.anim.loop
        ? 'The clip is a seamless loop, with the ending made to match the beginning.'
        : 'The clip plays once, with a clear beginning and end.';

      const timingSentence = `${speedSentence} ${durationSentence} ${loopSentence}`;
      parts.push({ key: 'timing', label: 'Timing', text: timingSentence });

      const fullText = [sceneText, motionSentence, cameraSentence, filmSentence, speedSentence, durationSentence, loopSentence]
        .map((s) => cleanSentence(s))
        .filter(Boolean)
        .join(' ')
        .replace(/\s+/g, ' ');

      entry = {
        id: 'anim_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 6),
        kind: 'animation',
        text: fullText,
        parts,
        negative: '',
        stamp: startingSceneLabel,
        stamp2: cameraEntry.label,
        tip: cameraEntry.tip,
        cameraLabel: cameraEntry.label,
        warnings,
        created: new Date().toISOString(),
        starred: false,
      };

      State.animTurn += 1;
      Storage.setString('moap.animTurn', State.animTurn);
    }

    // Save active keyword to recent
    const currentKwLine = (State.keywords.share || State.section === 'bg') ? State.keywords.bg.text : State.keywords.anim.text;
    if (currentKwLine && currentKwLine.trim()) {
      addRecentKeyword(currentKwLine.trim());
    }

    // Add to top of History (max 100)
    State.library.history.unshift(entry);
    if (State.library.history.length > 100) {
      State.library.history = State.library.history.slice(0, 100);
    }
    Storage.set('moap.library', State.library);

    // Set as hero entry
    State.currentHeroEntry = entry;
    State.focusedPlateId = entry.id;

    // Render hero plate with unblur animation
    renderHeroPlate(true);
    renderLibrary();
    closeDetailPanel();
    showToast('Prompt ready', 'status');
  }

  function addRecentKeyword(kwLine) {
    const list = State.keywordRecent.filter((item) => item.toLowerCase() !== kwLine.toLowerCase());
    list.unshift(kwLine);
    State.keywordRecent = list.slice(0, 10);
    Storage.set('moap.keywordRecent', State.keywordRecent);
    renderRecentKeywordsDropdown();
  }

  /* ==========================================================================
     7. CLIPBOARD & COPYING
     ========================================================================== */
  function clearSelection() {
    const sel = window.getSelection && window.getSelection();
    if (sel && typeof sel.removeAllRanges === 'function') sel.removeAllRanges();
  }

  async function copyText(text, badgeElement, withNegative = false, negativeText) {
    let success = false;
    let textToCopy = text;
    const negative = negativeText != null ? negativeText : State.currentHeroEntry?.negative;

    if (withNegative && negative) {
      textToCopy = `${text}\n\nNegative: ${negative}`;
    }

    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(textToCopy);
        success = true;
      } catch (e) {
        success = false;
      }
    }

    if (!success) {
      try {
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        textarea.style.position = 'fixed';
        textarea.style.left = '-9999px';
        textarea.style.top = '0';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        success = document.execCommand('copy');
        document.body.removeChild(textarea);
      } catch (err) {
        success = false;
      }
    }

    const label = badgeElement ? badgeElement.querySelector('span') : null;
    if (success) {
      if (badgeElement) {
        if (label) label.textContent = 'Copied';
        badgeElement.classList.remove('error');
        badgeElement.classList.add('visible');
        setTimeout(() => badgeElement.classList.remove('visible'), 1600);
      }
      if (withNegative) {
        showToast('Copied with negative prompt', 'status');
      } else {
        showToast('Copied', 'status');
      }
    } else {
      if (badgeElement) {
        if (label) label.textContent = 'Error';
        badgeElement.classList.remove('visible');
        badgeElement.classList.add('error');
        setTimeout(() => {
          badgeElement.classList.remove('error');
          if (label) label.textContent = 'Copied';
        }, 1600);
      }
      showToast('Clipboard blocked. Select the prompt text and copy it manually.', 'error');
    }
    clearSelection();
    return success;
  }

  /* ==========================================================================
     8. TOAST NOTIFICATIONS
     ========================================================================== */
  function showToast(message, type = 'status') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.setAttribute('role', type === 'error' ? 'alert' : 'status');
    toast.textContent = message;
    container.appendChild(toast);

    const duration = type === 'error' ? 3800 : 2200;
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(8px)';
      toast.style.transition = 'opacity 180ms ease, transform 180ms ease';
      setTimeout(() => {
        if (toast.parentNode) {
          container.removeChild(toast);
        }
      }, 200);
    }, duration);
  }

  /* ==========================================================================
     9. UI RENDERING & DOM UPDATES
     ========================================================================== */
  function applyTheme(theme) {
    State.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    Storage.setString('moap.theme', theme);

    const btnTheme = document.getElementById('btn-theme-toggle');
    if (btnTheme) {
      btnTheme.innerHTML = theme === 'dark'
        ? `<svg><use href="#icon-sun"></use></svg>`
        : `<svg><use href="#icon-moon"></use></svg>`;
      btnTheme.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
      btnTheme.setAttribute('title', theme === 'dark' ? 'Switch to light theme (T)' : 'Switch to dark theme (T)');
    }
  }

  function applyDye(dye) {
    State.dye = dye;
    document.documentElement.setAttribute('data-dye', dye);
    Storage.setString('moap.cardGrade', dye);

    document.querySelectorAll('.swatch-dot').forEach((dot) => {
      dot.classList.toggle('active', dot.getAttribute('data-dye') === dye);
    });
  }

  function cycleDye() {
    const dyes = ['clay', 'indigo', 'moss'];
    const nextIdx = (dyes.indexOf(State.dye) + 1) % dyes.length;
    applyDye(dyes[nextIdx]);
  }

  function switchSection(sec) {
    State.section = sec;
    document.querySelectorAll('.btn-switch-section').forEach((btn) => {
      const match = btn.getAttribute('data-section') === sec;
      btn.classList.toggle('active', match);
      btn.setAttribute('aria-pressed', match ? 'true' : 'false');
    });

    // Update section indicator in hero
    const ind = document.getElementById('hero-section-indicator');
    if (ind) {
      ind.innerHTML = sec === 'bg'
        ? `<svg><use href="#icon-leaf"></use></svg><span>Background</span>`
        : `<svg><use href="#icon-film"></use></svg><span>Animation</span>`;
    }

    // Toggle animate button visibility in hero
    const btnAnimateHero = document.getElementById('btn-hero-animate');
    if (btnAnimateHero) {
      btnAnimateHero.style.display = sec === 'bg' ? 'inline-flex' : 'none';
    }

    // Keywords field synchronization
    const kwInput = document.getElementById('keywords-input');
    if (kwInput) {
      kwInput.value = State.keywords.share ? State.keywords.bg.text : (sec === 'bg' ? State.keywords.bg.text : State.keywords.anim.text);
    }

    renderAdvancedOptions();
    checkKeywordPlaceCoherence();
  }

  function renderHeroPlate(animate = false) {
    const textElem = document.getElementById('hero-prompt-text');
    const plateElem = document.getElementById('hero-plate');
    if (!textElem || !plateElem) return;

    if (!State.currentHeroEntry) {
      textElem.className = 'prompt-text-placeholder';
      textElem.textContent = 'Press Generate.';
      return;
    }

    textElem.className = 'prompt-text-hero';
    textElem.textContent = State.currentHeroEntry.text;

    // Star icon state
    const btnStar = document.getElementById('btn-hero-star');
    if (btnStar) {
      const isStarred = State.currentHeroEntry.starred;
      btnStar.innerHTML = isStarred
        ? `<svg><use href="#icon-star-filled"></use></svg>`
        : `<svg><use href="#icon-star"></use></svg>`;
      btnStar.setAttribute('aria-label', isStarred ? 'Remove from favourites' : 'Save to favourites');
      btnStar.setAttribute('title', isStarred ? 'Remove from favourites (S)' : 'Save to favourites (S)');
    }

    if (animate) {
      plateElem.classList.remove('prompt-animating');
      void plateElem.offsetWidth; // trigger reflow
      plateElem.classList.add('prompt-animating');
    }
  }

  function renderLibrary() {
    const list = document.getElementById('library-items-list');
    const countFavourites = document.getElementById('count-favourites');
    const countHistory = document.getElementById('count-history');
    if (!list) return;

    // Counts
    if (countFavourites) countFavourites.textContent = State.library.favourites.length;
    if (countHistory) countHistory.textContent = State.library.history.length;

    const source = State.activeTab === 'favourites' ? State.library.favourites : State.library.history;
    const query = State.searchQuery.trim().toLowerCase();

    const items = query
      ? source.filter((item) => {
          return item.text.toLowerCase().includes(query) || (item.stamp && item.stamp.toLowerCase().includes(query));
        })
      : source;

    if (items.length === 0) {
      list.innerHTML = `
        <div class="library-empty-state">
          <svg><use href="#icon-${State.activeTab === 'favourites' ? 'star' : 'clock'}"></use></svg>
        </div>
      `;
      return;
    }

    list.innerHTML = items
      .map((entry) => {
        const isAnim = entry.kind === 'animation';
        return `
          <div class="library-plate" id="plate-${entry.id}" data-id="${entry.id}" tabindex="0" role="button" aria-expanded="false" title="${isAnim ? 'Animation' : 'Background'}">
            <div class="copied-badge" id="badge-${entry.id}">
              <svg style="width:14px;height:14px;stroke:currentColor;fill:none;stroke-width:2;"><use href="#icon-check"></use></svg>
              <span>Copied</span>
            </div>
            <div class="library-plate-header">
              <div class="library-kind-icon">
                <svg><use href="#icon-${isAnim ? 'film' : 'leaf'}"></use></svg>
              </div>
              <div class="library-plate-content">
                <p class="library-prompt-text">${escapeHTML(entry.text)}</p>
              </div>
              <div class="library-plate-actions">
                <div class="plate-extra-actions">
                  <button type="button" class="btn-icon btn-plate-copy" data-id="${entry.id}" aria-label="Copy prompt" title="Copy prompt">
                    <svg><use href="#icon-copy"></use></svg>
                  </button>
                  ${!isAnim ? `
                    <button type="button" class="btn-icon btn-plate-animate" data-id="${entry.id}" aria-label="Animate this" title="Animate this">
                      <svg><use href="#icon-play"></use></svg>
                    </button>
                  ` : ''}
                  <button type="button" class="btn-icon btn-plate-delete" data-id="${entry.id}" aria-label="Delete" title="Delete">
                    <svg><use href="#icon-trash"></use></svg>
                  </button>
                </div>
                <button type="button" class="btn-icon btn-plate-star" data-id="${entry.id}" aria-label="${entry.starred ? 'Remove star' : 'Star'}" title="${entry.starred ? 'Remove star' : 'Star'}">
                  <svg><use href="#icon-${entry.starred ? 'star-filled' : 'star'}"></use></svg>
                </button>
                <button type="button" class="plate-chevron" data-id="${entry.id}" aria-label="Toggle expand" title="Toggle expand">
                  <svg style="width:18px;height:18px;"><use href="#icon-chevron"></use></svg>
                </button>
              </div>
            </div>
          </div>
        `;
      })
      .join('');
  }

  function renderAdvancedOptions() {
    const isBg = State.section === 'bg';
    const bgContainer = document.getElementById('advanced-bg-controls');
    const animContainer = document.getElementById('advanced-anim-controls');
    if (bgContainer) bgContainer.style.display = isBg ? 'flex' : 'none';
    if (animContainer) animContainer.style.display = isBg ? 'none' : 'flex';
  }

  function renderRecentKeywordsDropdown() {
    const dropdown = document.getElementById('recent-keywords-dropdown');
    const chevron = document.getElementById('btn-recent-chevron');
    if (!dropdown || !chevron) return;

    if (State.keywordRecent.length === 0) {
      chevron.disabled = true;
      dropdown.classList.remove('open');
      return;
    }

    chevron.disabled = false;
    dropdown.innerHTML = State.keywordRecent
      .map((kw) => `<div class="recent-item" data-value="${escapeHTML(kw)}" title="Click to use, double-click to copy">${escapeHTML(kw)}</div>`)
      .join('');
  }

  function checkKeywordPlaceCoherence() {
    const kwText = State.keywords.share ? State.keywords.bg.text : (State.section === 'bg' ? State.keywords.bg.text : State.keywords.anim.text);
    const place = detectPlaceFromKeyword(kwText);
    const sceneSelect = document.getElementById('select-bg-scene');

    if (sceneSelect) {
      let opt = sceneSelect.querySelector('option[value="__from_keywords__"]');
      if (place) {
        if (!opt) {
          opt = document.createElement('option');
          opt.value = '__from_keywords__';
          opt.textContent = 'From keywords';
          sceneSelect.insertBefore(opt, sceneSelect.firstChild);
        }
        opt.disabled = true;
        opt.selected = true;
        sceneSelect.disabled = true;
      } else {
        if (opt) {
          opt.remove();
        }
        sceneSelect.disabled = false;
        sceneSelect.value = State.bg.values['scene'] || 'Any';
      }
    }
  }

  /* ==========================================================================
     10. DETAIL PANEL & DIALOGS
     ========================================================================== */
  function openDetailPanel(entry) {
    const panel = document.getElementById('detail-panel');
    if (!panel || !entry) return;

    const fullText = document.getElementById('detail-prompt-full');
    const tipBox = document.getElementById('detail-tip-box');
    const warningBox = document.getElementById('detail-warning-box');
    const btnStar = document.getElementById('btn-detail-star');
    const btnAnimate = document.getElementById('btn-detail-animate');

    if (fullText) fullText.textContent = entry.text;

    if (tipBox) {
      if (entry.tip) {
        tipBox.style.display = 'block';
        tipBox.textContent = entry.tip;
      } else {
        tipBox.style.display = 'none';
      }
    }

    if (warningBox) {
      if (entry.warnings && entry.warnings.length > 0) {
        warningBox.style.display = 'block';
        warningBox.textContent = entry.warnings.join(' ');
      } else {
        warningBox.style.display = 'none';
      }
    }

    if (btnStar) {
      btnStar.innerHTML = entry.starred
        ? `<svg><use href="#icon-star-filled"></use></svg>`
        : `<svg><use href="#icon-star"></use></svg>`;
    }

    if (btnAnimate) {
      btnAnimate.style.display = entry.kind === 'background' ? 'inline-flex' : 'none';
    }

    panel.classList.add('open');
    panel.setAttribute('aria-hidden', 'false');
    panel.focus();
  }

  function closeDetailPanel() {
    const panel = document.getElementById('detail-panel');
    if (panel && panel.classList.contains('open')) {
      panel.classList.remove('open');
      panel.setAttribute('aria-hidden', 'true');
      const heroPlate = document.getElementById('hero-plate');
      if (heroPlate) heroPlate.focus();
    }
  }

  /* Star item helper */
  function toggleStar(entryId) {
    let target = null;
    if (State.currentHeroEntry && State.currentHeroEntry.id === entryId) {
      target = State.currentHeroEntry;
    }
    if (!target) {
      target = State.library.history.find((e) => e.id === entryId) || State.library.favourites.find((e) => e.id === entryId);
    }
    if (!target) return;

    target.starred = !target.starred;

    // Sync in history
    const histItem = State.library.history.find((e) => e.id === entryId);
    if (histItem) histItem.starred = target.starred;

    if (target.starred) {
      if (!State.library.favourites.some((e) => e.id === entryId)) {
        State.library.favourites.unshift({ ...target });
        if (State.library.favourites.length > 400) {
          State.library.favourites = State.library.favourites.slice(0, 400);
        }
      }
      showToast('Saved to favourites', 'status');
    } else {
      State.library.favourites = State.library.favourites.filter((e) => e.id !== entryId);
      showToast('Removed from favourites', 'status');
    }

    Storage.set('moap.library', State.library);
    renderHeroPlate(false);
    renderLibrary();

    const detailPanel = document.getElementById('detail-panel');
    if (detailPanel && detailPanel.classList.contains('open') && State.currentHeroEntry?.id === entryId) {
      const btnStar = document.getElementById('btn-detail-star');
      if (btnStar) {
        btnStar.innerHTML = target.starred
          ? `<svg><use href="#icon-star-filled"></use></svg>`
          : `<svg><use href="#icon-star"></use></svg>`;
      }
    }
  }

  /* Delete item */
  function deleteItem(entryId) {
    State.library.history = State.library.history.filter((e) => e.id !== entryId);
    State.library.favourites = State.library.favourites.filter((e) => e.id !== entryId);
    Storage.set('moap.library', State.library);

    if (State.currentHeroEntry && State.currentHeroEntry.id === entryId) {
      State.currentHeroEntry = State.library.history[0] || null;
      renderHeroPlate(false);
    }
    renderLibrary();
    closeDetailPanel();
    showToast('Deleted', 'status');
  }

  /* Animate action */
  function animateThisPrompt(text) {
    State.anim.startingScene = text;
    State.anim.startingSceneLocked = true;
    Storage.set('moap.anim', State.anim);

    const animTextarea = document.getElementById('starting-scene-input');
    if (animTextarea) animTextarea.value = text;

    const lockBtn = document.getElementById('btn-lock-starting-scene');
    if (lockBtn) lockBtn.setAttribute('aria-pressed', 'true');

    switchSection('anim');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('Scene set.', 'status');
  }

  /* ==========================================================================
     11. EVENT LISTENERS SETUP
     ========================================================================== */
  function setupEventListeners() {
    // Primary Generate Button & Key G
    const btnGenerate = document.getElementById('btn-generate');
    if (btnGenerate) {
      btnGenerate.addEventListener('click', () => {
        generatePrompt();
      });
    }

    // Hero Plate Single Click vs Double Click handling
    let heroClickTimer = null;
    const heroPlate = document.getElementById('hero-plate');
    if (heroPlate) {
      heroPlate.addEventListener('mousedown', (e) => {
        if (e.detail > 1) e.preventDefault();
      }, true);
      heroPlate.addEventListener('click', (e) => {
        if (heroClickTimer) {
          clearTimeout(heroClickTimer);
          heroClickTimer = null;
          // Double click: copy
          if (State.currentHeroEntry) {
            const badge = document.getElementById('badge-hero');
            clearSelection();
            copyText(State.currentHeroEntry.text, badge, State.copyNegative);
          }
        } else {
          heroClickTimer = setTimeout(() => {
            heroClickTimer = null;
            // Single click: open detail panel
            if (State.currentHeroEntry) {
              openDetailPanel(State.currentHeroEntry);
            }
          }, 280);
        }
      });
    }

    // Hero Actions
    const btnHeroCopy = document.getElementById('btn-hero-copy');
    if (btnHeroCopy) {
      btnHeroCopy.addEventListener('click', (e) => {
        e.stopPropagation();
        if (State.currentHeroEntry) {
          const badge = document.getElementById('badge-hero');
          copyText(State.currentHeroEntry.text, badge, State.copyNegative);
        }
      });
    }

    const btnHeroStar = document.getElementById('btn-hero-star');
    if (btnHeroStar) {
      btnHeroStar.addEventListener('click', (e) => {
        e.stopPropagation();
        if (State.currentHeroEntry) {
          toggleStar(State.currentHeroEntry.id);
        }
      });
    }

    const btnHeroAnimate = document.getElementById('btn-hero-animate');
    if (btnHeroAnimate) {
      btnHeroAnimate.addEventListener('click', (e) => {
        e.stopPropagation();
        if (State.currentHeroEntry) {
          animateThisPrompt(State.currentHeroEntry.text);
        }
      });
    }

    const btnHeroDelete = document.getElementById('btn-hero-delete');
    if (btnHeroDelete) {
      btnHeroDelete.addEventListener('click', (e) => {
        e.stopPropagation();
        if (State.currentHeroEntry) {
          deleteItem(State.currentHeroEntry.id);
        }
      });
    }

    // Section Switch
    document.querySelectorAll('.btn-switch-section').forEach((btn) => {
      btn.addEventListener('click', () => {
        switchSection(btn.getAttribute('data-section'));
      });
    });

    // Theme Toggle
    const btnTheme = document.getElementById('btn-theme-toggle');
    if (btnTheme) {
      btnTheme.addEventListener('click', () => {
        const next = State.theme === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        Storage.setString('moap.themePick', next);
      });
    }

    // Swatches
    document.querySelectorAll('.swatch-dot').forEach((dot) => {
      dot.addEventListener('click', () => {
        applyDye(dot.getAttribute('data-dye'));
      });
    });

    // Keywords Input & Link
    const kwInput = document.getElementById('keywords-input');
    const btnLink = document.getElementById('btn-link-toggle');
    if (kwInput) {
      kwInput.addEventListener('input', (e) => {
        const val = e.target.value;
        if (State.keywords.share) {
          State.keywords.bg.text = val;
          State.keywords.anim.text = val;
        } else {
          if (State.section === 'bg') State.keywords.bg.text = val;
          else State.keywords.anim.text = val;
        }
        Storage.set('moap.keywords', State.keywords);
        checkKeywordPlaceCoherence();
      });
    }

    if (btnLink) {
      btnLink.addEventListener('click', () => {
        State.keywords.share = !State.keywords.share;
        btnLink.setAttribute('aria-pressed', State.keywords.share ? 'true' : 'false');
        if (State.keywords.share) {
          State.keywords.anim.text = State.keywords.bg.text;
        }
        Storage.set('moap.keywords', State.keywords);
        showToast(State.keywords.share ? 'Keywords linked' : 'Keywords separate', 'status');
      });
    }

    // Recent Keywords Dropdown Toggle
    const btnRecentChevron = document.getElementById('btn-recent-chevron');
    const recentDropdown = document.getElementById('recent-keywords-dropdown');
    if (btnRecentChevron && recentDropdown) {
      btnRecentChevron.addEventListener('click', (e) => {
        e.stopPropagation();
        recentDropdown.classList.toggle('open');
      });

      let recentClickTimer = null;
      recentDropdown.addEventListener('click', (e) => {
        const item = e.target.closest('.recent-item');
        if (!item) return;
        const val = item.getAttribute('data-value');

        if (recentClickTimer) {
          clearTimeout(recentClickTimer);
          recentClickTimer = null;
          // Double click: copy
          copyText(val, null, false);
          showToast('Copied keyword', 'status');
          recentDropdown.classList.remove('open');
        } else {
          recentClickTimer = setTimeout(() => {
            recentClickTimer = null;
            // Single click: fill field
            if (kwInput) kwInput.value = val;
            if (State.keywords.share) {
              State.keywords.bg.text = val;
              State.keywords.anim.text = val;
            } else {
              if (State.section === 'bg') State.keywords.bg.text = val;
              else State.keywords.anim.text = val;
            }
            Storage.set('moap.keywords', State.keywords);
            checkKeywordPlaceCoherence();
            recentDropdown.classList.remove('open');
          }, 280);
        }
      });
    }

    // Gear Popover Toggle & Controls
    const btnGear = document.getElementById('btn-gear-toggle');
    const gearPopover = document.getElementById('gear-popover');
    if (btnGear && gearPopover) {
      btnGear.addEventListener('click', (e) => {
        e.stopPropagation();
        const rect = btnGear.getBoundingClientRect();
        gearPopover.style.top = Math.min(window.innerHeight - 280, rect.bottom + 8) + 'px';
        gearPopover.style.right = Math.max(16, window.innerWidth - rect.right) + 'px';
        gearPopover.classList.toggle('open');
      });

      // Keyword mode segmented
      document.querySelectorAll('.gear-segment-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          const mode = btn.getAttribute('data-mode');
          document.querySelectorAll('.gear-segment-btn').forEach((b) => b.classList.remove('active'));
          btn.classList.add('active');
          if (State.section === 'bg') State.keywords.bg.mode = mode;
          else State.keywords.anim.mode = mode;
          Storage.set('moap.keywords', State.keywords);
        });
      });

      // Describe toggle
      const chkDescribe = document.getElementById('chk-describe-franchises');
      if (chkDescribe) {
        chkDescribe.checked = State.section === 'bg' ? State.keywords.bg.describe : State.keywords.anim.describe;
        chkDescribe.addEventListener('change', (e) => {
          if (State.section === 'bg') State.keywords.bg.describe = e.target.checked;
          else State.keywords.anim.describe = e.target.checked;
          Storage.set('moap.keywords', State.keywords);
        });
      }

      // Negative in copy toggle
      const chkCopyNeg = document.getElementById('chk-copy-negative');
      if (chkCopyNeg) {
        chkCopyNeg.checked = State.copyNegative;
        chkCopyNeg.addEventListener('change', (e) => {
          State.copyNegative = e.target.checked;
          Storage.setString('moap.copyNegative', State.copyNegative ? '1' : '0');
        });
      }

      // Seed input & dice
      const seedInput = document.getElementById('seed-input');
      const btnDice = document.getElementById('btn-roll-seed');
      if (seedInput) {
        seedInput.value = State.section === 'bg' ? State.bg.seed : State.anim.seed;
        seedInput.addEventListener('change', (e) => {
          if (State.section === 'bg') {
            State.bg.seed = e.target.value.trim() || '1847';
            Storage.set('moap.bg', State.bg);
          } else {
            State.anim.seed = e.target.value.trim() || '1847';
            Storage.set('moap.anim', State.anim);
          }
        });
      }

      if (btnDice) {
        btnDice.addEventListener('click', () => {
          const newSeed = Math.floor(Math.random() * 90000 + 1000).toString();
          if (seedInput) seedInput.value = newSeed;
          if (State.section === 'bg') {
            State.bg.seed = newSeed;
            Storage.set('moap.bg', State.bg);
          } else {
            State.anim.seed = newSeed;
            Storage.set('moap.anim', State.anim);
          }
          showToast('New seed rolled', 'status');
        });
      }
    }

    // Shortcuts Modal Toggle (?)
    const btnShortcuts = document.getElementById('btn-shortcuts-toggle');
    const shortcutsModal = document.getElementById('shortcuts-modal');
    const btnCloseShortcuts = document.getElementById('btn-close-shortcuts');
    if (btnShortcuts && shortcutsModal) {
      btnShortcuts.addEventListener('click', () => {
        shortcutsModal.classList.add('open');
      });
    }
    if (btnCloseShortcuts && shortcutsModal) {
      btnCloseShortcuts.addEventListener('click', () => {
        shortcutsModal.classList.remove('open');
      });
    }

    // Detail Panel Close and Actions
    const btnCloseDetail = document.getElementById('btn-close-detail');
    if (btnCloseDetail) {
      btnCloseDetail.addEventListener('click', () => {
        closeDetailPanel();
      });
    }

    const btnDetailCopy = document.getElementById('btn-detail-copy');
    if (btnDetailCopy) {
      btnDetailCopy.addEventListener('click', () => {
        if (State.currentHeroEntry) {
          copyText(State.currentHeroEntry.text, null, State.copyNegative);
        }
      });
    }

    const btnDetailStar = document.getElementById('btn-detail-star');
    if (btnDetailStar) {
      btnDetailStar.addEventListener('click', () => {
        if (State.currentHeroEntry) {
          toggleStar(State.currentHeroEntry.id);
        }
      });
    }

    const btnDetailAnimate = document.getElementById('btn-detail-animate');
    if (btnDetailAnimate) {
      btnDetailAnimate.addEventListener('click', () => {
        if (State.currentHeroEntry) {
          animateThisPrompt(State.currentHeroEntry.text);
        }
      });
    }

    // Library Tabs
    document.querySelectorAll('.tab-btn').forEach((tab) => {
      tab.addEventListener('click', () => {
        const targetTab = tab.getAttribute('data-tab');
        State.activeTab = targetTab;
        document.querySelectorAll('.tab-btn').forEach((t) => {
          const match = t.getAttribute('data-tab') === targetTab;
          t.setAttribute('aria-selected', match ? 'true' : 'false');
        });
        renderLibrary();
      });
    });

    // Library Live Search
    const btnSearchToggle = document.getElementById('btn-search-toggle');
    const searchInput = document.getElementById('library-search-input');
    if (btnSearchToggle && searchInput) {
      btnSearchToggle.addEventListener('click', () => {
        searchInput.classList.toggle('expanded');
        if (searchInput.classList.contains('expanded')) {
          searchInput.focus();
        } else {
          searchInput.value = '';
          State.searchQuery = '';
          renderLibrary();
        }
      });

      searchInput.addEventListener('input', (e) => {
        State.searchQuery = e.target.value;
        renderLibrary();
      });

      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          searchInput.value = '';
          State.searchQuery = '';
          searchInput.classList.remove('expanded');
          renderLibrary();
        }
      });
    }

    // Library Overflow Menu (Export / Import / Clear)
    const btnOverflow = document.getElementById('btn-library-overflow');
    const overflowDropdown = document.getElementById('library-overflow-dropdown');
    if (btnOverflow && overflowDropdown) {
      btnOverflow.addEventListener('click', (e) => {
        e.stopPropagation();
        overflowDropdown.classList.toggle('open');
      });

      // Export
      const btnExport = document.getElementById('btn-export-library');
      if (btnExport) {
        btnExport.addEventListener('click', () => {
          const exportData = {
            version: 1,
            exported: new Date().toISOString(),
            favourites: State.library.favourites,
            history: State.library.history,
          };
          const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'prompt-folio-library.json';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          overflowDropdown.classList.remove('open');
          showToast('Library exported', 'status');
        });
      }

      // Import
      const btnImport = document.getElementById('btn-import-library');
      const fileInput = document.getElementById('import-file-input');
      if (btnImport && fileInput) {
        btnImport.addEventListener('click', () => {
          fileInput.click();
          overflowDropdown.classList.remove('open');
        });

        fileInput.addEventListener('change', (e) => {
          const file = e.target.files?.[0];
          if (!file) return;

          const reader = new FileReader();
          reader.onload = (event) => {
            try {
              const data = JSON.parse(event.target.result);
              let importedFavs = [];
              let importedHist = [];

              if (Array.isArray(data)) {
                importedHist = data;
              } else if (typeof data === 'object' && data !== null) {
                importedFavs = data.favourites || data.favorites || [];
                importedHist = data.history || [];
              } else {
                throw new Error('Invalid format');
              }

              // Merge by id
              let addedFavs = 0;
              let addedHist = 0;

              importedFavs.forEach((item) => {
                if (item && item.id && !State.library.favourites.some((e) => e.id === item.id)) {
                  State.library.favourites.push(item);
                  addedFavs++;
                }
              });

              importedHist.forEach((item) => {
                if (item && item.id && !State.library.history.some((e) => e.id === item.id)) {
                  State.library.history.push(item);
                  addedHist++;
                }
              });

              // Apply caps
              if (State.library.favourites.length > 400) State.library.favourites = State.library.favourites.slice(0, 400);
              if (State.library.history.length > 100) State.library.history = State.library.history.slice(0, 100);

              Storage.set('moap.library', State.library);
              renderLibrary();
              showToast(`Imported ${addedFavs} favourites and ${addedHist} history notes.`, 'status');
            } catch (err) {
              showToast('Import failed. Invalid JSON library file.', 'error');
            }
          };
          reader.readAsText(file);
          fileInput.value = '';
        });
      }

      // Clear with confirmation dialog
      const btnClear = document.getElementById('btn-clear-tab');
      const confirmDialog = document.getElementById('confirm-dialog');
      const confirmText = document.getElementById('confirm-dialog-text');
      const btnConfirmClear = document.getElementById('btn-confirm-clear');
      const btnCancelClear = document.getElementById('btn-cancel-clear');

      if (btnClear && confirmDialog) {
        btnClear.addEventListener('click', () => {
          overflowDropdown.classList.remove('open');
          const isFav = State.activeTab === 'favourites';
          confirmText.textContent = isFav ? 'Clear favourites?' : 'Clear history?';
          confirmDialog.classList.add('open');
        });

        btnConfirmClear.addEventListener('click', () => {
          if (State.activeTab === 'favourites') {
            State.library.favourites = [];
            // Unstar matching history items
            State.library.history.forEach((h) => { h.starred = false; });
          } else {
            State.library.history = [];
          }
          Storage.set('moap.library', State.library);
          renderHeroPlate(false);
          renderLibrary();
          confirmDialog.classList.remove('open');
          showToast(State.activeTab === 'favourites' ? 'Favourites cleared' : 'History cleared', 'status');
        });

        btnCancelClear.addEventListener('click', () => {
          confirmDialog.classList.remove('open');
        });
      }
    }

    // Library List Delegation for Plates
    const libraryList = document.getElementById('library-items-list');
    let libClickTimer = null;
    if (libraryList) {
      libraryList.addEventListener('mousedown', (e) => {
        if (e.detail > 1) e.preventDefault();
      }, true);
      libraryList.addEventListener('click', (e) => {
        const starBtn = e.target.closest('.btn-plate-star');
        if (starBtn) {
          e.stopPropagation();
          toggleStar(starBtn.getAttribute('data-id'));
          return;
        }

        const copyBtn = e.target.closest('.btn-plate-copy');
        if (copyBtn) {
          e.stopPropagation();
          const id = copyBtn.getAttribute('data-id');
          const item = State.library.history.find((x) => x.id === id) || State.library.favourites.find((x) => x.id === id);
          if (item) {
            const badge = document.getElementById('badge-' + id);
            copyText(item.text, badge, State.copyNegative, item.negative);
          }
          return;
        }

        const animBtn = e.target.closest('.btn-plate-animate');
        if (animBtn) {
          e.stopPropagation();
          const id = animBtn.getAttribute('data-id');
          const item = State.library.history.find((x) => x.id === id) || State.library.favourites.find((x) => x.id === id);
          if (item) animateThisPrompt(item.text);
          return;
        }

        const delBtn = e.target.closest('.btn-plate-delete');
        if (delBtn) {
          e.stopPropagation();
          deleteItem(delBtn.getAttribute('data-id'));
          return;
        }

        const plate = e.target.closest('.library-plate');
        if (!plate) return;

        const id = plate.getAttribute('data-id');
        State.focusedPlateId = id;

        if (libClickTimer) {
          clearTimeout(libClickTimer);
          libClickTimer = null;
          // Double-click: copy
          const item = State.library.history.find((x) => x.id === id) || State.library.favourites.find((x) => x.id === id);
          if (item) {
            const badge = document.getElementById('badge-' + id);
            clearSelection();
            copyText(item.text, badge, State.copyNegative, item.negative);
          }
        } else {
          libClickTimer = setTimeout(() => {
            libClickTimer = null;
            // Single-click: expand / collapse
            plate.classList.toggle('expanded');
            plate.setAttribute('aria-expanded', plate.classList.contains('expanded') ? 'true' : 'false');
          }, 280);
        }
      });
    }

    // Advanced Controls Listeners
    setupAdvancedControls();

    // Global Document Click for closing dropdowns & popovers
    document.addEventListener('click', (e) => {
      if (recentDropdown && !e.target.closest('#keywords-tile')) {
        recentDropdown.classList.remove('open');
      }
      if (gearPopover && !e.target.closest('#gear-popover') && !e.target.closest('#btn-gear-toggle')) {
        gearPopover.classList.remove('open');
      }
      if (overflowDropdown && !e.target.closest('.overflow-menu-wrapper')) {
        overflowDropdown.classList.remove('open');
      }
    });

    // Keyboard Shortcuts
    setupKeyboardShortcuts();
  }

  function setupAdvancedControls() {
    // Background Advanced Selects and Locks
    const bgFields = [
      { id: 'select-bg-scene', key: 'scene', name: 'Theme / scene' },
      { id: 'select-bg-style', key: 'style', name: 'Art style' },
      { id: 'select-bg-lighting', key: 'lighting', name: 'Lighting' },
      { id: 'select-bg-time', key: 'time', name: 'Time & weather' },
      { id: 'select-bg-palette', key: 'palette', name: 'Colour palette' },
      { id: 'select-bg-mood', key: 'mood', name: 'Mood' },
      { id: 'select-bg-composition', key: 'composition', name: 'Composition' },
      { id: 'select-bg-aspect', key: 'aspect', name: 'Aspect ratio' },
    ];

    bgFields.forEach(({ id, key, name }) => {
      const select = document.getElementById(id);
      const lock = document.getElementById(`btn-lock-bg-${key}`);

      if (select) {
        select.value = State.bg.values[key] || 'Any';
        select.addEventListener('change', (e) => {
          State.bg.values[key] = e.target.value;
          Storage.set('moap.bg', State.bg);
        });
      }

      if (lock) {
        const isLocked = Boolean(State.bg.locks[key]);
        lock.setAttribute('aria-pressed', isLocked ? 'true' : 'false');
        lock.innerHTML = `<svg><use href="#icon-${isLocked ? 'lock' : 'unlock'}"></use></svg>`;

        lock.addEventListener('click', () => {
          const nowLocked = !State.bg.locks[key];
          State.bg.locks[key] = nowLocked;
          lock.setAttribute('aria-pressed', nowLocked ? 'true' : 'false');
          lock.innerHTML = `<svg><use href="#icon-${nowLocked ? 'lock' : 'unlock'}"></use></svg>`;
          Storage.set('moap.bg', State.bg);
          showToast(nowLocked ? `${name} pinned` : `${name} can vary`, 'status');
        });
      }
    });

    // Clean background toggle
    const chkClean = document.getElementById('chk-bg-clean');
    if (chkClean) {
      chkClean.checked = State.bg.clean !== false;
      chkClean.addEventListener('change', (e) => {
        State.bg.clean = e.target.checked;
        Storage.set('moap.bg', State.bg);
      });
    }

    // Negative prompt toggle & textarea
    const chkNeg = document.getElementById('chk-bg-neg');
    const txtNeg = document.getElementById('txt-bg-neg');
    if (chkNeg && txtNeg) {
      chkNeg.checked = State.bg.negToggle !== false;
      txtNeg.value = State.bg.negText || DEFAULT_NEG;

      chkNeg.addEventListener('change', (e) => {
        State.bg.negToggle = e.target.checked;
        Storage.set('moap.bg', State.bg);
      });

      txtNeg.addEventListener('input', (e) => {
        State.bg.negText = e.target.value;
        Storage.set('moap.bg', State.bg);
      });
    }

    // Animation Advanced Fields
    const animFields = [
      { id: 'select-anim-camera', key: 'camera', name: 'Camera movement' },
      { id: 'select-anim-motion', key: 'motion', name: 'Scene motion' },
      { id: 'select-anim-speed', key: 'speed', name: 'Speed' },
      { id: 'select-anim-duration', key: 'duration', name: 'Duration' },
      { id: 'select-anim-film', key: 'film', name: 'Film look' },
    ];

    animFields.forEach(({ id, key, name }) => {
      const select = document.getElementById(id);
      const lock = document.getElementById(`btn-lock-anim-${key}`);

      if (select) {
        select.value = State.anim.values[key] || 'Any';
        select.addEventListener('change', (e) => {
          State.anim.values[key] = e.target.value;
          Storage.set('moap.anim', State.anim);
        });
      }

      if (lock) {
        const isLocked = Boolean(State.anim.locks[key]);
        lock.setAttribute('aria-pressed', isLocked ? 'true' : 'false');
        lock.innerHTML = `<svg><use href="#icon-${isLocked ? 'lock' : 'unlock'}"></use></svg>`;

        lock.addEventListener('click', () => {
          const nowLocked = !State.anim.locks[key];
          State.anim.locks[key] = nowLocked;
          lock.setAttribute('aria-pressed', nowLocked ? 'true' : 'false');
          lock.innerHTML = `<svg><use href="#icon-${nowLocked ? 'lock' : 'unlock'}"></use></svg>`;
          Storage.set('moap.anim', State.anim);
          showToast(nowLocked ? `${name} pinned` : `${name} can vary`, 'status');
        });
      }
    });

    // Animation Starting Scene
    const animStartingScene = document.getElementById('starting-scene-input');
    const btnClearScene = document.getElementById('btn-clear-starting-scene');
    const btnLockScene = document.getElementById('btn-lock-starting-scene');

    if (animStartingScene) {
      animStartingScene.value = State.anim.startingScene || '';
      animStartingScene.addEventListener('input', (e) => {
        State.anim.startingScene = e.target.value;
        Storage.set('moap.anim', State.anim);
      });
    }

    if (btnClearScene && animStartingScene) {
      btnClearScene.addEventListener('click', () => {
        animStartingScene.value = '';
        State.anim.startingScene = '';
        Storage.set('moap.anim', State.anim);
        showToast('Scene cleared', 'status');
      });
    }

    if (btnLockScene) {
      const isLocked = Boolean(State.anim.startingSceneLocked);
      btnLockScene.setAttribute('aria-pressed', isLocked ? 'true' : 'false');
      btnLockScene.innerHTML = `<svg><use href="#icon-${isLocked ? 'lock' : 'unlock'}"></use></svg>`;

      btnLockScene.addEventListener('click', () => {
        const nowLocked = !State.anim.startingSceneLocked;
        State.anim.startingSceneLocked = nowLocked;
        btnLockScene.setAttribute('aria-pressed', nowLocked ? 'true' : 'false');
        btnLockScene.innerHTML = `<svg><use href="#icon-${nowLocked ? 'lock' : 'unlock'}"></use></svg>`;
        Storage.set('moap.anim', State.anim);
        showToast(nowLocked ? 'Starting scene pinned' : 'Starting scene can vary', 'status');
      });
    }

    // Seamless loop toggle
    const chkLoop = document.getElementById('chk-anim-loop');
    if (chkLoop) {
      chkLoop.checked = Boolean(State.anim.loop);
      chkLoop.addEventListener('change', (e) => {
        State.anim.loop = e.target.checked;
        Storage.set('moap.anim', State.anim);
      });
    }
  }

  function setupKeyboardShortcuts() {
    window.addEventListener('keydown', (e) => {
      // Pause while typing in an input, textarea, select or slider
      if (e.target.matches('input, textarea, select, [contenteditable="true"]')) {
        return;
      }
      // Ignore Ctrl, Cmd and Alt combos
      if (e.ctrlKey || e.metaKey || e.altKey) {
        return;
      }

      const key = e.key;

      if (key === 'G' || key === 'g') {
        e.preventDefault();
        generatePrompt();
        const heroPlate = document.getElementById('hero-plate');
        if (heroPlate) heroPlate.focus();
        return;
      }

      if (key === 'J' || key === 'j') {
        e.preventDefault();
        const plates = Array.from(document.querySelectorAll('.library-plate'));
        if (plates.length === 0) {
          showToast('No plates in library yet.', 'error');
          return;
        }
        let currentIndex = plates.findIndex((p) => p.getAttribute('data-id') === State.focusedPlateId);
        if (e.shiftKey) {
          // Previous plate
          currentIndex = currentIndex > 0 ? currentIndex - 1 : plates.length - 1;
        } else {
          // Next plate
          currentIndex = currentIndex < plates.length - 1 ? currentIndex + 1 : 0;
        }
        const nextPlate = plates[currentIndex];
        State.focusedPlateId = nextPlate.getAttribute('data-id');
        nextPlate.focus();
        nextPlate.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        return;
      }

      if (key === 'K' || key === 'k') {
        e.preventDefault();
        const kwInput = document.getElementById('keywords-input');
        if (kwInput) kwInput.focus();
        return;
      }

      if (key === 'C' || key === 'c') {
        e.preventDefault();
        let targetEntry = null;
        if (State.focusedPlateId) {
          targetEntry = State.library.history.find((x) => x.id === State.focusedPlateId) || State.library.favourites.find((x) => x.id === State.focusedPlateId);
        }
        if (!targetEntry) targetEntry = State.currentHeroEntry;

        if (targetEntry) {
          const badge = document.getElementById('badge-' + targetEntry.id) || document.getElementById('badge-hero');
          copyText(targetEntry.text, badge, State.copyNegative, targetEntry.negative);
        } else {
          showToast('Generate a prompt first.', 'error');
        }
        return;
      }

      if (key === 'A' || key === 'a') {
        e.preventDefault();
        if (State.activeTab === 'favourites') {
          if (State.library.favourites.length === 0) {
            showToast('No favourites saved yet.', 'error');
            return;
          }
          const allFavs = State.library.favourites.map((f) => f.text).join('\n');
          copyText(allFavs, null, false);
          showToast('Copied all favourites', 'status');
        }
        return;
      }

      if (key === 'S' || key === 's') {
        e.preventDefault();
        const targetId = State.focusedPlateId || State.currentHeroEntry?.id;
        if (targetId) {
          toggleStar(targetId);
        } else {
          showToast('Generate a prompt first.', 'error');
        }
        return;
      }

      if (key === 'Enter') {
        // If focused on library plate, expand/collapse; else open detail panel
        const focusedPlate = document.activeElement?.closest('.library-plate');
        if (focusedPlate) {
          e.preventDefault();
          focusedPlate.classList.toggle('expanded');
          focusedPlate.setAttribute('aria-expanded', focusedPlate.classList.contains('expanded') ? 'true' : 'false');
        } else if (State.currentHeroEntry) {
          e.preventDefault();
          openDetailPanel(State.currentHeroEntry);
        }
        return;
      }

      if (key === ' ') {
        const focusedPlate = document.activeElement?.closest('.library-plate');
        if (focusedPlate) {
          e.preventDefault();
          focusedPlate.classList.toggle('expanded');
          focusedPlate.setAttribute('aria-expanded', focusedPlate.classList.contains('expanded') ? 'true' : 'false');
        }
        return;
      }

      if (key === 'E' || key === 'e') {
        e.preventDefault();
        const plates = Array.from(document.querySelectorAll('.library-plate'));
        if (plates.length === 0) return;
        const allExpanded = plates.every((p) => p.classList.contains('expanded'));
        plates.forEach((p) => {
          p.classList.toggle('expanded', !allExpanded);
          p.setAttribute('aria-expanded', !allExpanded ? 'true' : 'false');
        });
        return;
      }

      if (key === 'Escape') {
        e.preventDefault();
        // Close search, menus, settings, the panel or the shortcut list, in that order
        const searchInput = document.getElementById('library-search-input');
        if (searchInput && searchInput.classList.contains('expanded')) {
          searchInput.value = '';
          State.searchQuery = '';
          searchInput.classList.remove('expanded');
          renderLibrary();
          return;
        }

        const recentDropdown = document.getElementById('recent-keywords-dropdown');
        if (recentDropdown && recentDropdown.classList.contains('open')) {
          recentDropdown.classList.remove('open');
          return;
        }

        const overflowDropdown = document.getElementById('library-overflow-dropdown');
        if (overflowDropdown && overflowDropdown.classList.contains('open')) {
          overflowDropdown.classList.remove('open');
          return;
        }

        const gearPopover = document.getElementById('gear-popover');
        if (gearPopover && gearPopover.classList.contains('open')) {
          gearPopover.classList.remove('open');
          return;
        }

        const detailPanel = document.getElementById('detail-panel');
        if (detailPanel && detailPanel.classList.contains('open')) {
          closeDetailPanel();
          return;
        }

        const shortcutsModal = document.getElementById('shortcuts-modal');
        if (shortcutsModal && shortcutsModal.classList.contains('open')) {
          shortcutsModal.classList.remove('open');
          return;
        }

        const confirmDialog = document.getElementById('confirm-dialog');
        if (confirmDialog && confirmDialog.classList.contains('open')) {
          confirmDialog.classList.remove('open');
          return;
        }
        return;
      }

      if (key === 'B' || key === 'b') {
        e.preventDefault();
        switchSection('bg');
        document.getElementById('tile-hero')?.scrollIntoView({ behavior: 'smooth' });
        return;
      }

      if (key === 'N' || key === 'n') {
        e.preventDefault();
        switchSection('anim');
        document.getElementById('tile-hero')?.scrollIntoView({ behavior: 'smooth' });
        return;
      }

      if (key === 'F' || key === 'f') {
        e.preventDefault();
        State.activeTab = 'favourites';
        document.querySelectorAll('.tab-btn').forEach((t) => {
          t.setAttribute('aria-selected', t.getAttribute('data-tab') === 'favourites' ? 'true' : 'false');
        });
        renderLibrary();
        document.getElementById('tile-library')?.scrollIntoView({ behavior: 'smooth' });
        return;
      }

      if (key === 'T' || key === 't') {
        e.preventDefault();
        const next = State.theme === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        Storage.setString('moap.themePick', next);
        return;
      }

      if (key === 'V' || key === 'v') {
        e.preventDefault();
        cycleDye();
        return;
      }

      if (key === '?') {
        e.preventDefault();
        const modal = document.getElementById('shortcuts-modal');
        if (modal) modal.classList.toggle('open');
        return;
      }
    });
  }

  /* ==========================================================================
     12. INITIALIZATION
     ========================================================================== */
  function populateSelectOptions() {
    function fillSelect(selectId, entries) {
      const select = document.getElementById(selectId);
      if (!select) return;

      select.innerHTML = '<option value="Any">Any</option>';
      const groups = {};
      entries.forEach((entry) => {
        if (!groups[entry.group]) groups[entry.group] = [];
        groups[entry.group].push(entry);
      });

      for (const [groupName, groupEntries] of Object.entries(groups)) {
        const optgroup = document.createElement('optgroup');
        optgroup.label = groupName;
        groupEntries.forEach((e) => {
          const opt = document.createElement('option');
          opt.value = e.label;
          opt.textContent = e.label;
          optgroup.appendChild(opt);
        });
        select.appendChild(optgroup);
      }
    }

    fillSelect('select-bg-scene', BANKS.scenes);
    fillSelect('select-bg-style', BANKS.styles);
    fillSelect('select-bg-lighting', BANKS.lighting);
    fillSelect('select-bg-time', BANKS.times);
    fillSelect('select-bg-palette', BANKS.palettes);
    fillSelect('select-bg-mood', BANKS.moods);
    fillSelect('select-bg-composition', BANKS.compositions);
    fillSelect('select-bg-aspect', BANKS.aspects);

    fillSelect('select-anim-camera', BANKS.cameras);
    fillSelect('select-anim-motion', BANKS.motions);
    fillSelect('select-anim-speed', BANKS.speeds);
    fillSelect('select-anim-duration', BANKS.durations);
    fillSelect('select-anim-film', BANKS.films);
  }

  function init() {
    try { localStorage.removeItem('moap.bgPhoto'); } catch (e) {}
    applyTheme(State.theme);
    applyDye(State.dye);

    populateSelectOptions();
    setupEventListeners();

    switchSection(State.section);
    renderHeroPlate(false);
    renderLibrary();
    renderRecentKeywordsDropdown();
  }

  // Initialize once DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

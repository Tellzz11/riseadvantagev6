# Rise Advantage v6 — Imagery Upgrade Specs (3 assets)

Author: Creative Director (propose-only)
Date: 2026-06-10
Status: **SPEC ONLY — nothing generated.** Direction pre-approved by Theo; generation runs after these specs land.
Build target: `websites/riseadvantage-v6/`
Palette law: **BD-005** (`src/app/globals.css` lines 7–112). Deep-teal "atelier", cream alternation, **lime = conversion CTAs only**, dark-only, film-grain finish.
Sibling spec (read for material/lighting/grade DNA): `docs/research/hero-specs-2026-06-10.md` — the new hero is glass/brass fragments assembling into the rising-arrow mark on a teal field with one lime glint. **All three assets here must read as the same visual world.**

House rule (HARD, per `operational-constraints.md` + HR-1/SCR-9): **real work only.** AI set-dressing (device scenes, surfaces, light) is fine; the WORK shown on any screen must be real. No fabricated client brands. No staged-data headlines presented as real client results.

---

## 0. Component → asset map (the brief named components loosely; these are the real targets)

| Brief area | Actual component | Actual asset(s) on screen | Verdict |
|---|---|---|---|
| 1. "At the edge of dawn" interstitial | `src/components/sections/CinematicBreak.tsx` | `public/dawn-cinematic.{webm,mp4}` + `dawn-cinematic-poster.jpg` | Off-palette brutalist-concrete corridor. **Replace cinematic.** |
| 2a. Phone Meta-ad tile | `src/components/sections/HeroCollage.tsx` (NOT SelectedWork) | `public/images/collage/tile-1-meta-ad.png` | Shows fabricated **"The Heritage Garden Co."** — HR-1 violation. **Replace.** |
| 2b. iPad GHL pipeline tile | `src/components/sections/HeroCollage.tsx` | `public/images/collage/tile-3-ipad-crm.png` | Generic empty cream "CRM Pipeline" baked into screen. **Replace.** |
| 3. WhatYouTakeWithYou MacBooks | `src/components/sections/WhatYouTakeWithYou.tsx` | `public/images/real-work/dashboard-mb.png` + `workflow-mb.png` on `#0A1628` navy surface | Off-palette navy surface + blue/grey GHL-default screens. **Re-token surface + replace imagery.** |

> Note for the build agent: the brief said the phone/iPad tiles live in `SelectedWork.tsx`. They do not — `SelectedWork.tsx` is the £21.60→£6.88 case study and is fine as-is. The flagged device tiles are in `HeroCollage.tsx`. Asset paths from Theo's screenshots confirm this. Spec against `HeroCollage.tsx`.

> **Important asset discovery:** `public/images/real-work/dashboard.webp` and `workflow.webp` ALREADY exist as fully BD-005-correct full-bleed compositions (deep-teal field, cream-tinted MacBook screen, off-white serif headline, lime hairline, mono eyebrow, corner radial motif) — far better than the `-mb.png` versions currently wired into `WhatYouTakeWithYou.tsx`. They carry a **"Sample dashboard, demo data populated for illustration"** disclaimer. See Asset 3 + Open Question Q3 — there may be a near-zero-cost win here before any generation.

---

# ASSET 1 — "At the edge of dawn" cinematic (`CinematicBreak.tsx`)

## Purpose
Full-bleed background behind the manifesto quote *"Most marketing is reactive. The compounding happens for the teams who build it like infrastructure."* Must read as brand-owned, belong to the new hero's world (teal field, glass/brass material, light-as-growth), and stay **quiet enough that centred type reads** — this is a backdrop, not a hero. The current brutalist corridor is cold, off-palette, and looks like stock.

## Creative intent (one sentence)
A slow, near-still teal void in which **threads of light gather and rise** — the compounding made visual — quiet, premium, never competing with the quote.

## Scene
- The **same atelier void as the hero** (`hero-specs §1.1`): `--canvas-deep` `#061715` at centre falling to `--canvas` `#0A211F` at edges via a large soft radial vignette, exponential low-density fog for depth, NO floor / horizon / reflective ground.
- A single soft **volumetric light-shaft** enters from upper-camera-right (same key direction as hero), but here it is the SUBJECT, not a rim light. Fine motes drift slowly up the shaft.
- Floating in the void, **out of focus and sparse**, sit 3–5 of the hero's material shards — brushed-brass slivers + frosted-glass chips (NO legible UI plates here; this is the abstract, ambient cousin of the hero, not a second assembly). They catch the shaft faintly and drift upward on slow parallax. They never converge into the mark (that's the hero's job) — here they simply **rise**, embodying "compounding" as continuous gentle ascent.
- Composition keeps the **centre band calm and dark** (where the headline sits) — brightness lives top-right (shaft origin) and the shards drift through the upper third and edges, never across centre.

## Motion (this is video — explicit beats, no static scene)
Total loop: **8.0s, 24fps** (slow, cinematic; 24fps suits the drifty motion and is light to encode). Seamless loop, bookend-identical (frame 0 == final frame).

| t (s) | Beat | What happens |
|------:|------|---|
| 0.0–2.0 | Drift-in | Shards float slowly upward into frame from lower edges; light-shaft breathes up ~3% intensity. Motes rise. |
| 2.0–5.0 | Rise / gather | Shards continue a slow vertical parallax ascent; the brightest shard catches the shaft for one quiet beat (no lime here — lime is conversion-reserved; this scene has none). Camera does a ~3° clockwise drift + 2% dolly-in. |
| 5.0–7.0 | Settle | Ascent decelerates (`easeOutQuad`); shards thin toward the top of frame and fog-desaturate. |
| 7.0–8.0 | Loop return | Camera + shard positions ease back to the t=0 home pose; motes reset on a divisible grain cycle. Frame returns to == 0.0 for an invisible seam. |

- **No fast action, no convergence, no UI.** If it ever competes with the quote, it's wrong — pull shard count / brightness down.
- Camera drift never fully stops (a frozen camera is the "animated still" failure) but is slow enough to feel like a held breath.

## Materials / grade (inherit from hero spec verbatim — `hero-specs §1.3 + §1.5`)
- Frosted glass chips: transmission, IOR 1.45, roughness 0.18, faint `--eucalyptus` `#8FB0A4` internal tint ~8%, bright `--accent` `#F7F9F2` edge rim.
- Brushed brass slivers: metallic, roughness 0.34, desaturated aged-brass `#B79A6A` (NOT yellow gold), anisotropic highlight along long axis.
- BD-005 grade: lift shadows toward teal (never pure-black crush), highlights under clipping with soft rolloff, brass desaturated ~10%, mild high-threshold bloom on rims only, teal-in-shadow / warm-in-highlight split-tone.
- **Film-grain pass LAST** (`hero-specs §1.7`): monochromatic, ~3–4%, fine, animated, also dithers the radial vignette + fog so the dark teal does NOT band (banding is the #1 cheap-look tell on a dark field — matters most here because the frame is mostly dark).

## Tool + model
- **Video:** Kling 2.6 via Higgsfield CLI (house default per `feedback_higgsfield_video_models.md`). **Do NOT use DOP endpoints** — `generate_video_dop` 422s (`feedback_higgsfield_dop_broken.md`).
- Prefer text→video. If motion-control needed, image→video off a Higgsfield Soul still of the rest frame.
- Apply BD-005 grade + grain as a **post pass in `video-studio/` (Remotion/ffmpeg)**, not baked by Kling — Kling's grade won't hit BD-005 cleanly. Generate clean, grade in post (same pattern as hero spec).

### Kling 2.6 prompt (copy-paste ready)
```
Abstract cinematic atmosphere, very slow and quiet. A deep teal-green void
(#061715 at centre, #0A211F at edges), soft radial vignette, thin volumetric
haze for depth. A single soft shaft of pale light enters from the upper right,
fine dust motes drifting slowly upward inside it. A few small abstract floating
fragments — thin brushed aged-brass slivers and frosted translucent glass chips
with bright crisp rims — drift gently UPWARD through the upper third and edges
of the frame, catching the light faintly, sparse and out of focus. The centre
of the frame stays calm and dark. Slow clockwise camera drift with a tiny push
in. Premium, meditative, monochromatic teal-green palette, aged brass the only
warm accent. Soft cinematic depth of field, focus on the rising fragments.
Looping ambient motion, no text, no logos, no people, no buildings, no UI.
Negative prompt: concrete, stone, brutalist architecture, corridor, walls,
columns, grey, blue, cold tones, bright saturated colours, neon, lime green,
text, watermark, UI screens, fast motion, camera shake, static frozen frame,
people, hands, gold yellow, busy composition, high contrast centre.
```

## Dimensions / encode (match existing `CinematicBreak`/`Hero` playback)
The component renders `<video object-cover>` full-bleed with a centred radial vignette already (`CinematicBreak.tsx` lines 31–38). Match the hero's encode discipline (`hero-specs §2.2`):

| Asset | Codec | Container | Budget | Notes |
|---|---|---|---|---|
| Desktop loop | AV1 | `.webm` | **< 1.2 MB** | Dark + slow compresses well; 8s should land well under. |
| Desktop fallback | H.264 high | `.mp4` | < 1.8 MB | Safari/older. |
| Poster | AVIF + WebP + JPG | — | < 120 KB | The calm rest frame (== loop seam). Reduced-motion + pre-autoplay users see this; must be a quiet, on-palette frame. |

- File names (keep existing convention so wiring is a source swap): `dawn-cinematic.webm` / `.mp4` / `dawn-cinematic-poster.{avif,webp,jpg}`. Overwrite the brutalist assets in `public/`.
- Encode: 2-pass, `-g` = full loop length, CRF ~32–36 (grain hides artefacts), QA the **encoded** file looping 3× watching for a seam pop, never just the render.

## Text-contrast scrim rule
The component ALREADY ships a radial vignette (centre 55%→25%→0% `--canvas-deep`, `CinematicBreak.tsx` line 34) sized so the centred headline reads while top/bottom edges stay visible. Because this new cinematic is **deliberately dark-at-centre by composition**, the existing vignette is sufficient — **keep it as-is.** Do NOT strengthen it (that would kill the cinematic). After render, run a contrast check on the actual centre-band pixels under the headline: `--text-strong` `#F0F3E8` must hit **≥ 4.5:1** over the rendered+vignetted centre. If it fails, the fix is to dim the cinematic's centre band in the render (push shards/shaft further to top-right), NOT to crank the scrim. Eyebrow stays `--text-muted` per current component.

## BD-005 token mapping
| Element | Token | Hex |
|---|---|---|
| Void centre | `--canvas-deep` | `#061715` |
| Void edge | `--canvas` | `#0A211F` |
| Glass rim | `--accent` | `#F7F9F2` |
| Glass tint | `--eucalyptus` | `#8FB0A4` |
| Brass | hero brass | `#B79A6A` |
| Shaft fill (shadow side) | `--moss` | `#4F756E` |
| Scrim | `--canvas-deep` (existing vignette) | `#061715` |
| Lime | — | **NONE in this scene** (conversion-reserved) |

## Acceptance criteria
- [ ] Reads as the same world as the new hero (teal void, glass/brass, light-as-growth). A viewer should feel it's the hero's quiet sibling.
- [ ] Centre band stays calm + dark; headline contrast ≥ 4.5:1 verified on final render.
- [ ] Zero UI, zero text, zero buildings, zero people, zero lime.
- [ ] Loop seam invisible on the encoded file (QA looped 3×).
- [ ] No banding in the dark teal (grain dither verified).
- [ ] Desktop `.webm` < 1.2 MB.
- [ ] Motion is genuine upward drift — NOT a static still with a grain wobble.

---

# ASSET 2a — Phone Meta-ad tile (`HeroCollage.tsx`, `tile-1-meta-ad.png`)

## Purpose
Right-column phone tile in the "The work" bento. Must show **a real H&O Gardening ad creative** on the phone screen (current image shows fabricated "The Heritage Garden Co." — direct HR-1 violation and must go). Device scene stays in the established family (deep-teal linen, directional light, Pantone chip, of-a-piece with the MacBook composites).

## Real work to composite (FOUND in repo — no capture step needed)
Two real, square (1:1), already-branded H&O before/after ad creatives exist:
- **`websites/h-and-o-gardening/hando-before-after-ad.jpg`** — patio/furniture transformation, "H&O GARDENING · NORTH LONDON" bar.
- **`websites/riseadvantage-v5/public/hando-ad6-creative.jpg`** — **RECOMMENDED.** Stronger frame: dramatic front-garden transformation (rubble → blooming roses + striped lawn), terraced-house backdrop, clean "H&O GARDENING — NORTH LONDON" bar. Reads instantly as real performance creative.

> Use `hando-ad6-creative.jpg`. It is real client work Rise actually ran (ties to the £21.60→£6.88 case study elsewhere on the page — coherent story). Copy it into `public/images/real-work/hando-ad-creative.jpg` so the v6 repo owns its asset.

## Compositing recipe (two-step: generate device scene → map real screenshot onto display)
This is the established recipe for the family. **Generate the device + scene EMPTY (black/placeholder screen), then composite the real ad onto the screen** — never ask the model to render the ad, or it will fabricate a brand again.

**Step 1 — generate the device scene (Nano Banana Pro), empty screen:**
```
Photorealistic product shot: a modern smartphone lying at a gentle three-quarter
angle on a deep teal-green linen tablecloth (#0A211F), soft directional window
light from the upper left casting a long soft shadow to the lower right. Shallow
depth of field, premium editorial styling. Out-of-focus background props: the
corner of a stack of linen-bound notebooks upper left, a matte dark ceramic mug
upper right, a small Pantone-style colour swatch card reading the teal hex lower
right. The phone screen is a FLAT PURE BLACK rectangle (empty, switched off) —
no UI, no image on screen. Calm, expensive, monochromatic teal palette, warm-neutral
tones. Vertical-ish phone, screen clearly visible and unobstructed.
Negative prompt: any image or text or app on the phone screen, gardens, plants,
people, bright colours, neon, lime green, cluttered background, logos.
```
- This intentionally regenerates the SAME scene as the current `tile-1-meta-ad.png` (teal linen, notebooks, mug, Pantone chip) so it stays in-family — only the screen content changes from fake-brand to real-ad. The build agent may alternatively reuse the existing scene if it can cleanly mask + replace the screen region (cheaper — see Generation Plan).

**Step 2 — composite the real ad onto the screen:**
- Perspective-warp `hando-ad-creative.jpg` (1:1) onto the phone's screen quad. The ad is square; the phone screen is portrait — place the square ad in an IG-feed frame (image square + a thin top bar + bottom action row) OR letterbox the square within a dark IG UI so it reads as a real Instagram ad in-feed. Keep it subtle; the tile is small.
- Add a faint screen reflection/glare consistent with the upper-left key light (~6% white gradient) so the composite doesn't look pasted.
- Match screen luminance to scene (the ad is bright daylight; knock it back ~8% and warm it 3% toward scene temp so it sits in the teal room).
- Re-apply the BD-005 film grain over the FINAL composite so device + screen share one grain field.

## Tool + model
- Device scene: **Nano Banana Pro** (Gemini image gen via `image-generation` skill / Gemini API, `reference_gemini_api_key.md`).
- Compositing: programmatic (Remotion/ffmpeg/Sharp perspective transform in `video-studio/`) or a precise image-edit pass. **Do not** let the generative model invent the screen content.

## Dimensions / encode
- Output: **1200×1200 PNG** (tile renders in a `~3/2`→`md:col-span-5` figure at `object-cover`, `HeroCollage.tsx` lines 92, 128–143; square master crops cleanly to the card). Match the existing tile's resolution/ratio so layout is untouched.
- Save as `public/images/collage/tile-1-meta-ad.png` (overwrite) so zero code change is needed — OR new filename + one `src` edit. Overwrite preferred.

## BD-005 token mapping
| Element | Token | Hex |
|---|---|---|
| Linen surface | `--canvas` | `#0A211F` |
| Shadow | `--canvas-deep` | `#061715` |
| Pantone chip text | teal hex label | `#0A211F` |
| Screen content | REAL H&O ad (its own colours) | — |
| Card bg behind tile | `--canvas-deep` (in component) | `#061715` |

## Acceptance criteria
- [ ] Screen shows the **real H&O ad** — recognisable H&O brand bar, real garden transformation. Zero fabricated brands anywhere.
- [ ] Device scene is of-a-family with the iPad tile + MacBook composites (teal linen, directional light, Pantone chip).
- [ ] Screen content reads as a real in-feed ad, luminance-matched to the room, faint glare, shared grain — not pasted.
- [ ] No lime in the scene (the ad's own greens are fine; no brand-lime set-dressing).
- [ ] Crops cleanly in the `col-span-5` card at `object-cover`; caption gradient still legible.

---

# ASSET 2b — iPad GHL pipeline tile (`HeroCollage.tsx`, `tile-3-ipad-crm.png`)

## Purpose
Right-column iPad tile, "GHL · PIPELINES — Lifecycle pipelines built to read." Current image bakes a generic empty cream "CRM Pipeline" into the screen (not real, reads fake). Replace with the **same iPad-on-velvet scene** but with a **real, sanitised GHL pipeline screenshot** composited on the display.

## Real work to composite (capture step REQUIRED — flagged)
**No standalone sanitised GHL pipeline (kanban/opportunities) screenshot exists in the repo.** The closest real GHL assets are the dashboard/workflow `.webp`s (those are dashboard + workflow-builder views, not the kanban pipeline). So:

> **CAPTURE STEP (flagged, needs operator/CRM action):** capture a real GHL **Opportunities kanban** view from Rise's own GHL sub-account (`operational-constraints.md`: Rise's own sub-account is operational and available for Rise's own use — use Rise's own pipeline, NOT a client's, to sidestep all client-PII questions). Sanitise before compositing:
> - Real stage columns are fine (New Lead → Contacted → Qualified → Proposal → Won — these are structure, not secrets).
> - **Blur/replace contact names + avatars + phone/email on cards** (PII).
> - **No real £ deal values shown as headline metrics** (staged-data / fabrication risk per HR-1). Either blur card values or use Rise's genuine own-pipeline values and don't elevate any number into a hero stat.
> - At iPad-tile size most card text is sub-legible anyway — the read is "a real, populated, well-structured pipeline," not specific data. Lean into that: a populated kanban that reads as real at a glance, with nothing legible enough to leak.

If capture is blocked, **fallback:** reuse the existing `public/images/real-work/dashboard.webp` GHL dashboard view (already sanitised, demo-labelled) re-cropped to the iPad — but the kanban capture is strongly preferred because "pipelines built to read" wants an actual pipeline. Flag to Theo either way.

## Compositing recipe (same two-step as 2a)
**Step 1 — iPad device scene (Nano Banana Pro), empty screen:**
```
Photorealistic product shot: a modern tablet resting at a three-quarter angle on
a deep teal-green velvet surface (#0A211F) with soft folds, a sheer curtain softly
out of focus in the background catching pale window light from the right. Soft
directional light, shallow depth of field, premium editorial styling, calm and
expensive. The tablet screen is a FLAT PURE BLACK rectangle (empty, switched off) —
no UI, no app. Monochromatic teal-green palette, warm-neutral, single soft light
source. Tablet screen clearly visible and unobstructed.
Negative prompt: any UI or app or text on the screen, charts, bright colours,
neon, lime green, people, hands, logos, cluttered background.
```
- This regenerates the SAME velvet/curtain scene as the current `tile-3-ipad-crm.png` to stay in-family — only the screen changes from baked-fake to real-sanitised.

**Step 2 — composite the sanitised GHL kanban onto the iPad screen:**
- Perspective-warp the sanitised pipeline screenshot onto the iPad screen quad.
- GHL default UI is bright/white — **knock screen luminance back ~10% and warm it slightly** so it doesn't glare against the teal velvet (the current tile's cream screen is actually the right instinct; keep that warmth, just with real content).
- Faint screen glare from the right-side key, ~6%.
- BD-005 film grain over the final composite.

## Tool + model
- Device scene: **Nano Banana Pro**.
- Sanitised screenshot: real GHL capture (operator/CRM) + blur/redaction pass.
- Compositing: programmatic perspective transform in `video-studio/`.

## Dimensions / encode
- **1200×1200 PNG**, `public/images/collage/tile-3-ipad-crm.png` (overwrite, zero code change).

## BD-005 token mapping
| Element | Token | Hex |
|---|---|---|
| Velvet surface | `--canvas` | `#0A211F` |
| Folds/shadow | `--canvas-deep` | `#061715` |
| Curtain highlight | `--sage` | `#C7D2BE` |
| Screen content | real sanitised GHL (warmed back) | — |

## Acceptance criteria
- [ ] Screen shows a **real, populated, sanitised GHL pipeline** — no PII, no headline £ metric.
- [ ] Same velvet/curtain family as the current tile + the phone tile + MacBook composites.
- [ ] Screen luminance knocked back so it sits in the teal room, not glaring; faint glare + shared grain.
- [ ] Capture provenance logged (Rise's own sub-account, sanitised) so anti-fabrication is defensible.
- [ ] No lime, no fabricated data.

---

# ASSET 3 — WhatYouTakeWithYou MacBooks (`WhatYouTakeWithYou.tsx`)

Two problems, two fixes: **(a) re-token the off-palette navy surface**, **(b) replace the two weak MacBook composites.**

## 3a — Surface re-token (off-palette midnight-navy → BD-005 deep-teal)

The component hardcodes a midnight-navy surface that ignores BD-005 entirely:
```
// WhatYouTakeWithYou.tsx lines 10–11
const BLUE_SURFACE = "#0A1628";  // off-palette
const BLUE_INSET   = "#0D2035";  // off-palette
```
This `#0A1628` navy is a cold blue from the old v2 brief (line 5–8 comment confirms a 2026-05-21 "flip to midnight blue") and clashes with the BD-005 teal page. It also makes the dashboard's blue/grey GHL charts blend into a wash of blue.

**Recommended fix — retire the hardcoded navy, use BD-005 tokens:**
| Constant | Old (off-palette) | New (BD-005) | Token rationale |
|---|---|---|---|
| `BLUE_SURFACE` | `#0A1628` | `#061715` | = `--canvas-deep`. Matches the hero + the dark sections; the page already uses canvas-deep as its darkest surface. |
| `BLUE_INSET` | `#0D2035` | `#0E2725` | = `--canvas-soft` (`#0E2725`). The "dark + 1 step" inset, on-palette. |

- Also swap the figcaption pill bg `color-mix(... #0A1628 70% ...)` (lines 55, 92) → `var(--canvas-deep)`.
- The `--sage` status dot (lines 68, 105) is already on-palette — keep.
- Net: the section becomes a deep-teal dark surface consistent with the rest of the page, and the cream-tinted MacBook screens (see 3b) pop warmly against it instead of disappearing into navy.

> This is a **CSS/token edit, not generation** — cheapest fix on the page, do it first regardless of imagery decision.

## 3b — Replacement imagery (real screenshots, BD-005-sympathetic composites)

### The near-free win (do this BEFORE generating anything)
The repo ALREADY contains `public/images/real-work/dashboard.webp` and `workflow.webp` — full-bleed BD-005-correct compositions (deep-teal field, cream-tinted MacBook screen showing the **real Rise GHL dashboard / Client Status Workflow**, off-white PP-Editorial headline, lime hairline, mono eyebrow, corner radial motif). These are dramatically better than the `-mb.png` files currently wired in (`WhatYouTakeWithYou.tsx` lines 45, 83), which sit as plain transparent MacBooks on the navy.

**Two integration options for the build agent (cheapest-first):**

- **Option A (near-zero cost, RECOMMENDED first):** these `.webp`s are *full sections* (they bake in their own headline + eyebrow), so they can't drop straight into the current two-figure layout. But the **MacBook + screen composite inside them** is exactly what's wanted. Crop each `.webp` to just the MacBook composite (transparent/teal bg), export at the component's `1.517:1` aspect, and swap into the two `<figure>`s. Keeps the component's own HTML headline/caption; just upgrades the device images to the warm cream-screen versions. Combined with the 3a re-token, this likely resolves the whole section with **no generation at all.**

- **Option B (if crops look awkward / Theo wants fresh):** re-shoot the two real screenshots into new MacBook composites matching the SelectedWork/HeroCollage treatment (device on a deep-teal surface, directional light). Recipe below.

### Compositing recipe for Option B (same two-step pattern)
**Step 1 — MacBook device scene (Nano Banana Pro), empty screen:**
```
Photorealistic product shot: an open modern laptop at a slight three-quarter
angle on a deep teal-green surface (#061715), soft directional studio light from
upper left, long soft shadow, shallow depth of field, premium editorial styling,
calm and expensive. The laptop screen is a FLAT PURE BLACK rectangle (empty,
switched off). Monochromatic deep teal-green palette, warm-neutral, single soft
key light. Screen clearly visible, unobstructed, facing camera.
Negative prompt: any UI or charts or text on screen, bright colours, neon, lime
green, people, hands, logos, cluttered desk, blue tones.
```
**Step 2 — composite the REAL sanitised screenshots:**
- **Dashboard:** source the real GHL dashboard already shown in `dashboard.webp` (Opportunity Status / Value / Conversion / Funnel / Stage Distribution). **Sanitisation note:** the existing `dashboard.webp` labels its data *"Sample dashboard, demo data populated for illustration"* — meaning the £121K / 18.75% figures are demo, not a real client result. That disclaimer is the anti-fabrication-safe path (honest: it's a real Rise dashboard with demo data). **Keep that posture** — if any £ figure appears legibly, it must remain demo-labelled OR be Rise's own real pipeline; never a client's real numbers dressed as a result. The GHL default blue/grey charts are acceptable as REAL product UI (we don't fake the product's chart colours) — the BD-005 cohesion comes from the device scene + surface + warm screen knock-back, not from recolouring GHL's charts.
- **Workflow:** source the real "002 Client Status Workflow" GHL builder view (as in `workflow.webp`). Same sanitisation: no real client names in node labels (Rise's own workflow is fine), demo-labelled if any data shows.
- Knock screen luminance back ~10%, warm ~3% toward scene temp, faint glare, BD-005 grain over final composite.

## Tool + model
- Option A: image crop only (Sharp/ffmpeg) — no model.
- Option B device scene: **Nano Banana Pro**; screenshots real + sanitised; composite programmatic.

## Dimensions / encode
- The component expects `1.517:1` figures (`WhatYouTakeWithYou.tsx` lines 40, 78). Output **2× → ~2200×1450 PNG** each.
- File names: overwrite `public/images/real-work/dashboard-mb.png` + `workflow-mb.png` (zero code change), OR new names + two `src` edits.

## BD-005 token mapping
| Element | Token | Hex |
|---|---|---|
| Section surface (re-token) | `--canvas-deep` | `#061715` |
| Inset / tiles (re-token) | `--canvas-soft` | `#0E2725` |
| Device surface | `--canvas-deep` | `#061715` |
| Key light fill | `--moss` | `#4F756E` |
| Cream screen tint | `--canvas-light` warmth | `#F2EFE6`-ish |
| Status dot (keep) | `--sage` | `#C7D2BE` |
| Deliverable body text (keep) | `--eucalyptus` | `#8FB0A4` |

## Acceptance criteria
- [ ] Section surface re-tokened to BD-005 deep-teal family (no `#0A1628` navy anywhere in the component).
- [ ] MacBook screens show **real Rise GHL dashboard + workflow**, sanitised (no client PII; any £ figure is demo-labelled or Rise's own — never a client result presented as real).
- [ ] Device composites match the SelectedWork/HeroCollage family (teal surface, directional light, warm cream screen).
- [ ] Cream screens pop against the deep-teal surface (the disappearing-into-navy problem is gone).
- [ ] No lime, no fabricated data, no recolouring GHL's real chart UI (real product = real product).
- [ ] If Option A used: crops sit cleanly at `1.517:1` with no baked headline bleeding in.

---

# ORDERED GENERATION PLAN (cheapest-first)

| # | Action | Cost | Generation? | Notes |
|---|---|---|---|---|
| 1 | **Asset 3a** — re-token `WhatYouTakeWithYou.tsx` navy → BD-005 deep-teal (`#061715`/`#0E2725`) | ~free | No (code edit) | Do first. Independent of all imagery. |
| 2 | **Asset 3b Option A** — crop existing `dashboard.webp`/`workflow.webp` MacBook composites, swap into the two figures | ~free | No (image crop) | May fully resolve Asset 3. Try before generating. |
| 3 | **Asset 2a** — copy real `hando-ad6-creative.jpg` in; reuse existing phone scene if screen-region replace is clean, else regen scene (Nano Banana Pro) + composite | low | Maybe 1 image | Real ad already in repo — highest-value, lowest-risk real-work fix. |
| 4 | **Asset 2b** — capture + sanitise real GHL kanban (operator/CRM step), regen iPad scene if needed, composite | low–med | Maybe 1 image + capture | Gated on the capture step — flag to Theo. |
| 5 | **Asset 3b Option B** — only if Option A crops are unusable | med | 2 images | Skip if step 2 lands. |
| 6 | **Asset 1** — Kling 2.6 cinematic + Remotion grade/grain post | highest | 1 video + post | Most expensive (video + grade pipeline). Do last. |

Rationale: 3 of 6 steps are free/near-free code-and-crop wins that may resolve two of the three areas. Generation spend concentrates on the cinematic (genuinely needs it) and at most 2 device stills.

---

# OPEN QUESTIONS (for Theo / build team)

1. **GHL kanban capture (Asset 2b).** No sanitised pipeline screenshot exists in the repo. Recommend capturing **Rise's own** GHL Opportunities kanban (not a client's) to sidestep PII entirely, then redacting card names/values. Confirm that's the source, or point me at an approved existing capture. This is the only true blocker — flagged.

2. **"Real work" vs "demo data" tension (Assets 2b + 3b).** The existing GHL screenshots carry a *"demo data populated for illustration"* disclaimer. That's the anti-fabrication-safe posture (honest: real product, demo numbers). The brief says "real work." These reconcile cleanly **if** we show the real Rise GHL product with either (a) demo data, labelled, or (b) Rise's own real pipeline numbers — never a client's real results dressed as a metric. Confirm posture (a) is acceptable, or supply Rise's own real pipeline for posture (b). The phone tile (2a) is unambiguous real client work — no tension there.

3. **Asset 3 may need zero generation.** Strong recommendation to try 3a re-token + 3b Option A (crop the existing superior `.webp`s) first — it likely resolves the whole section for free. Confirm I should spec the build agent to attempt that before any Nano Banana spend.

4. **Brass in the cinematic (Asset 1).** Inherits the hero's aged-brass shards. This is the one non-palette hue, same open question as the hero spec (Q1 there). If Theo strips brass from the hero, strip it here too (use `--sage` frosted-metal shards instead) so the two stay consistent. Decision should be made once, for both.

5. **Phone-tile ad choice (Asset 2a).** Recommended `hando-ad6-creative.jpg` (front-garden roses transformation) over `hando-before-after-ad.jpg` (patio) — stronger, more dramatic, ties to the £21.60→£6.88 case study. Confirm or swap.

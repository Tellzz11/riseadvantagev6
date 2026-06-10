# Rise Advantage v6 — Hero Direction Specs (A vs B)

Author: Creative Director (propose-only)
Date: 2026-06-10
Status: SPEC ONLY — nothing rendered. Two directions for Theo to pick one via Telegram preview.
Build target: `websites/riseadvantage-v6/`. Replaces the current silk-drape hero in `src/components/sections/Hero.tsx`.
Pipeline: in-house Remotion + React-Three-Fiber (same proven stack as the Rise-Hype video).

> **Core decision baked into this spec:** ONE R3F scene, TWO delivery modes. Direction A pre-renders that scene to a looping video; Direction B runs the same scene live in WebGL. The art direction, object set, materials, lighting rig, camera, and BD-005 grade are SHARED and defined once below. The two direction sections only specify what differs (encode + scrim for A; interactivity + degradation + perf for B). Build the scene once in `video-studio/`, point both deliverables at it.

---

## 0. Creative intent (the one sentence everything serves)

The hero must say **"separate parts becoming a compounding system."** Not "we use AI", not "we're a cool agency" — the literal deliverables Rise ships (a Meta ad, a CRM pipeline card, a workflow node) drift in as loose fragments and **assemble into the rising-arrow brand mark**. The motion IS the positioning: parts → system → growth. When it settles, the mark holds and breathes. That's the whole idea. Don't over-decorate it.

Voice anchor (from `brand-assets/rise-advantage/voice-profile.md` + `positioning.md`): confident, evidence-led, no fluff. Website hero positioning line is locked: **"Marketing that compounds — campaigns today, capability tomorrow."** The current headline copy (`Campaigns today. Capability tomorrow.`) stays; this spec changes only the background, not the type.

---

## 1. SHARED SCENE DEFINITION (build once, both directions consume)

### 1.1 The field (environment)

- Background: deep-teal "atelier" void using BD-005 `--canvas-deep` `#061715` at scene centre, falling off to `--canvas` `#0A211F` at the edges via a large soft radial vignette. No literal gradient banding — dither the falloff (see grain, §1.7).
- A single soft volumetric light-shaft enters from upper-camera-right (matches the existing hero's light language and the silk-drape direction it replaces), giving the floating fragments a consistent key direction.
- No floor, no horizon, no reflective ground plane. The fragments float in negative space. Depth is read through fog + DoF, not a stage.
- Thin atmospheric fog (exponential, very low density) so distant fragments desaturate slightly toward `--canvas`. Sells depth and helps the loop seam (far objects are already low-contrast).

### 1.2 The objects (the actual deliverables — 3 hero fragments + supporting shards)

Three **named hero fragments**, each an abstracted, instantly-readable plate of a real Rise deliverable. Abstract them to silhouette + one or two signal details — NOT legible UI (legible UI dates fast and fails at small sizes / on mobile). Reference the existing collage tiles for what each deliverable looks like so they read as the same product:

1. **Meta ad tile** — a rounded-rect plate (~4:5 portrait, the IG feed ratio). Signal detail: a single image band on top, two stacked text bars + one lime CTA pill at the bottom. Reference `public/images/collage/tile-1-meta-ad.png`.
2. **CRM pipeline card** — a landscape plate with 3–4 vertical "lane" divisions and 2 small floating record chips. Reads as a kanban/pipeline. Reference `public/images/collage/tile-3-ipad-crm.png`.
3. **Workflow node** — a small rounded node with one input port (left) and one output port (right), and a short bezier connector stub trailing off it. The automation/agent signal.

Plus **6–9 supporting shards**: thin brushed-brass slivers and small frosted-glass chips with no UI, used as connective tissue and to seed the brushstroke texture of the final mark. These are the "particles" that let the assembly read as a brushstroke rather than three tiles snapping together.

**Convergence target:** all fragments + shards travel to and compose the **brushstroke rising-arrow mark** (`brand-assets/rise-advantage/logos/v6-brushstroke/logo-mark-dark.png` is the silhouette of record — a two-stroke ascending zigzag resolving into an arrowhead, upper-right). The three hero fragments seat at the three "peaks" of the zigzag; the brass shards become the rising stroke + arrowhead; the glass chips fill the brushstroke's spatter/texture. The mark is NOT a flat decal — it's assembled out of the fragments in shallow 3D, then the final 0.5s does a micro-flatten so the silhouette reads cleanly.

### 1.3 Materials (locked — same in A and B; B uses baked approximations, see §3.4)

- **Frosted glass** (the UI plates: Meta tile, CRM card, workflow node):
  - Transmission material. IOR `1.45`, transmission `0.92`, roughness `0.18` (frosted, not clear — clear glass reads as cheap and refracts the void into noise), thickness `0.4`.
  - Subtle edge bevel (`~1.5px` at render res) catching a bright `--accent` `#F7F9F2` rim. The rim is what makes glass legible on a dark field — do not skip it.
  - Tint: glass carries a faint `--eucalyptus` `#8FB0A4` internal tint at ~8% so it belongs to the palette and isn't a cold blue.
  - The one signal detail per plate (CTA pill, lane lines, ports) is an emissive inlay at low intensity — the lime CTA pill on the Meta tile is the ONLY place `--accent-lime` `#D8FF85` appears in the scene, and it's tiny. Lime is conversion-reserved per BD-005; one glint is on-brand, a lime wash is a violation.
- **Brushed brass** (the connective shards + the rising stroke of the final mark):
  - Metallic `1.0`, roughness `0.34` (brushed, anisotropic feel — directional roughness along the stroke if the renderer supports it), base colour a desaturated warm brass `#B79A6A` pulled toward the palette (NOT yellow gold — it must sit against teal without clashing; think aged brass instrument).
  - Anisotropic highlight running along each shard's long axis sells "brushstroke" and ties to the brand mark's hand-painted origin.
- **Shared:** everything gets the upper-right key + a soft `--moss` `#4F756E` fill from lower-left so shadow sides don't go pure black. Mild Fresnel rim on all objects in `--sage` `#C7D2BE` to lift silhouettes off the void.

### 1.4 Camera

- Single virtual camera, ~35mm equivalent (gentle perspective, not wide — wide distorts the plates and looks gamey).
- Move: a slow continuous **clockwise orbital drift** of ~6–8° total around the assembly's vertical axis, paired with a tiny dolly-in (~4%) across the loop, easing OUT at the hold. The drift never fully stops — a frozen camera is the "animated still" failure. It's slow enough to feel like a held breath, not a turntable.
- DoF: shallow-ish. Focus plane sits on the assembling mark. Incoming fragments rack slightly into focus as they arrive (far = soft, seated = sharp). This focus pull is a free motion cue and reads as intentional cinematography.
- Framing: assembly sits **right-of-centre and slightly high**, leaving the **lower-left third open and dark** for the headline/eyebrow. This is non-negotiable and it's what fixes the contrast problem (see §1.6, §2.4). The current hero already washes lower-left dark via gradient; here we earn it in-frame so the scrim can be lighter.

### 1.5 BD-005 grade (finishing — applied in both A's render and B's post FX)

- Grade toward the palette: lift shadows slightly toward `--canvas` teal (never pure black crush — atelier, not noir), keep highlights just under clipping with a soft rolloff, desaturate the brass ~10% so nothing reads as gold-yellow.
- Very mild bloom on the `--accent` glass rims + the single lime pill glint only. Bloom threshold high — only the brightest rim pixels bloom. No hazy global glow.
- Slight teal-in-shadow / warm-in-highlight split-tone (the brass highlights warm, the void shadows cool) — this is the "one continuous piece" cohesion BD-005 wants.

### 1.6 Headline / type relationship (shared rule, fixes the known contrast bug)

The current eyebrow had a real contrast failure: `--moss` sat at ~3.7:1 over the bright silk-video region, and the fix was bumping the eyebrow to `--sage` (see `Hero.tsx` line 75–79 comment). **We do NOT repeat that.** The fix here is structural, not a colour patch:

1. **Composition keeps the lower-left third dark by design** (§1.4 framing). The bright assembly lives upper-right, away from the type. So the type sits on near-`--canvas-deep` void, not on a bright moving region.
2. A **fixed contrast scrim** still backs the type as a guarantee, but lighter than before because composition does most of the work. See A §2.4 and B §3.x for the exact scrim — it's the SAME scrim spec in both, so the type looks identical whichever direction wins.
3. Hard rule: **the brightest fragment must never travel through the headline's text box.** Choreograph fragment entry paths to arrive from the right and top, converging up-and-right. Nothing bright crosses the lower-left text safe-area. This is a scene-authoring constraint, not a post fix.

### 1.7 Grain / film finish (shared)

- Final film-grain pass per BD-005, applied LAST (over grade, over scrim-free render). Monochromatic grain, low intensity (~3–4% opacity equivalent), fine grain size, animated (per-frame) so it doesn't read as static dirt. In A it's baked into the encode; in B it's a full-screen post shader (see §3.5).
- Grain also dithers the radial vignette + fog falloff so we get no 8-bit banding in the dark teal — banding in dark gradients is the #1 thing that makes a premium dark hero look cheap. This matters more than usual because the field is mostly dark teal.

### 1.8 Timing skeleton (the beat sheet — A renders this exactly; B maps it to scroll, see §3.2)

Total loop: **7.0s** (inside the 6–8s brief; 7.0s divides cleanly for seam math and is long enough to breathe, short enough to keep file size down).

| t (s) | Beat | What happens |
|------:|------|--------------|
| 0.00–0.40 | **Seam / rest state** | Mark fully assembled, holding, breathing (the loop's "home" pose). Camera mid-drift. This frame == the last frame (see seam strategy §2.5). |
| 0.40–1.20 | **Dissolution** | The assembled mark gently de-coheres: the 3 hero fragments + shards drift OUTWARD and back into the void, decelerating as they spread. Brass shards lead, glass plates follow. Fog swallows the furthest ones. |
| 1.20–3.40 | **Drift / float** | Fragments float loosely in the field, slow parallax, gentle rotation. This is the "scattered parts" state — the visual thesis of the problem Rise solves. Camera continues its orbital drift. |
| 3.40–5.60 | **Convergence** | Fragments accelerate inward on eased paths (all arriving from right/top per §1.6), rotating to their seat orientation. The 3 hero plates lock to the 3 zigzag peaks first; brass shards stream in to form the rising stroke + arrowhead; glass chips fill the spatter. Arrival staggered, not synchronised (synchronised = mechanical; staggered = organic). |
| 5.60–6.30 | **Lock + micro-flatten** | Last shard seats. The single lime CTA-pill glint catches the light for one beat (the only lime moment). Assembly does a subtle settle-flatten so the brushstroke silhouette reads clean. A whisper of bloom on the rims. |
| 6.30–7.00 | **Settle to rest** | Camera eases its drift toward the home pose; the mark does one slow "breath" (±1.5% scale, barely perceptible). Frame returns to == 0.00 for the seam. |

Easing: convergence uses an overshoot-free `easeInOutCubic`-ish curve with tiny per-fragment delay offsets. Dissolution uses `easeOutQuad` (fast release, slow spread). No bounces — bounce reads as toy, this is premium.

---

## 2. DIRECTION A — "The system assembling" (pre-rendered cinematic loop)

The shared scene (§1) rendered out of Remotion/R3F to a seamless looping video, served exactly like the current hero (`<video autoplay muted loop playsinline>` in `Hero.tsx`). Lowest-risk, highest-fidelity, zero runtime GPU cost, identical on every device.

### 2.1 Render targets

- Render the §1.8 beat sheet at **7.0s, 30fps** (210 frames). 30fps is enough for slow drifty motion and halves file size vs 60; the motion has no fast action that needs 60.
- Master render: 2× the largest display size. Hero displays up to `--layout-max` 1920px wide and ~90vh tall. Render master at **2560×1440** (covers 1440p displays at object-cover; downscales cleanly). Render with 16-bit/linear + the full material/lighting/DoF, grade in §1.5, grain in §1.7 baked LAST.
- Also render a **mobile-cropped variant** at **1080×1350** (4:5-ish portrait safe-crop centred on the assembly) so phones don't get a letterboxed wide frame with the mark tiny. The hero `<video>` swaps source by media query (or we ship one 2560×1440 and rely on object-cover — decide at build; mobile-crop strongly preferred for the mark to read).

### 2.2 Encode targets (hard budgets)

| Asset | Codec | Container | Budget | Notes |
|---|---|---|---|---|
| Primary loop (desktop) | AV1 | `.webm` | **< 1.0 MB** | Brief ceiling. Dark teal + slow motion compresses very well; 7s at 2560×1440 AV1 should land 600–900 KB. |
| Fallback loop (desktop) | H.264 high | `.mp4` | < 1.6 MB | Safari/older support. Matches current `hero-sphere.mp4` pattern. |
| Mobile loop | AV1 `.webm` + H.264 `.mp4` | both | < 600 KB each | Smaller frame, tighter budget. |
| Poster frame | AVIF + WebP + JPG | — | < 120 KB | THE rest-state assembled-mark frame (== loop seam frame). This is what reduced-motion + slow-connection + pre-autoplay users see, so it must be the "answer" frame (system assembled), not a scattered mid-frame. |

- File names follow the existing convention: `hero-assemble.webm` / `.mp4`, `hero-assemble-mobile.webm` / `.mp4`, `hero-assemble-poster.{avif,webp,jpg}` in `public/`.
- Encode notes for hitting < 1MB AV1: 2-pass, target the budget as a hard `-b:v` cap with CRF as guide (~CRF 32–36 acceptable here because grain hides artefacts), `-g` (keyframe interval) = full loop length so we don't waste bits on extra keyframes, `tune` for the low-motion content. The animated grain raises bitrate slightly — if over budget, drop grain intensity to ~2.5% before dropping resolution.

### 2.3 Playback wiring (matches existing Hero.tsx)

- Keep the existing `<video autoPlay muted loop playsInline preload="metadata" poster=...>` structure. Swap sources to the new assets.
- Keep the existing subtle scroll-parallax (`translate3d` up at 0.3× scroll, `scale(1.05)`) — it already respects `prefers-reduced-motion` and adds depth cheaply. The `scale(1.05)` overscan also hides any 1px edge wobble from the parallax transform.
- Reduced-motion: video does not autoplay; poster frame (the assembled mark) shows. Already handled by the existing reduced-motion guard pattern — verify it pauses the video, not just the parallax.

### 2.4 Headline scrim over A (the locked contrast rule — identical in B)

Because the assembly lives upper-right (§1.4), the type's lower-left zone is already dark. The scrim is a guarantee layer, lighter than the current hero's:

```
/* Fixed scrim behind hero type — angled, lower-left weighted.
   Lighter than current hero (current goes to 78% canvas-deep) because
   composition keeps this region dark already. */
background: linear-gradient(
  100deg,
  color-mix(in oklab, var(--canvas-deep) 62%, transparent) 0%,
  color-mix(in oklab, var(--canvas-deep) 28%, transparent) 42%,
  transparent 66%
);
```

- Eyebrow can return to spec `--moss` `#4F756E` IF a contrast check passes at ≥ 4.5:1 over the rendered hero's actual lower-left pixels. If it fails, fall back to `--sage` `#C7D2BE` (the current proven fix). **Build team must run the contrast check against the final render, not assume.** This is the explicit gate that prevents repeating the 3.7:1 bug.
- Headline `--text-strong` `#F0F3E8` and body `--text-body` `#DDE1D2` are already high-contrast; they only need the void behind them, which the composition + scrim guarantee.

### 2.5 Loop seam strategy (must be invisible)

- **Bookend identity:** author the scene so frame 0 == frame 210 exactly — same camera pose, same assembled mark, same grain seed reset. The §1.8 beat sheet is built around this: it opens AND closes on the rest state.
- **Camera continuity:** the orbital drift is the seam risk (a continuously rotating camera won't match start↔end). Solution: the camera's drift completes a closed path over the 7s — it eases back toward the home pose in the 6.30–7.00 settle beat so its position + velocity at t=7.0 match t=0.0. Author it as a single looping curve, not a one-way pan.
- **Motion at the cut:** at the seam the only motion is the ~1.5% breath, which is symmetric and slow — even a 1-frame mismatch is imperceptible. The fast convergence happens in the MIDDLE of the loop, far from the cut.
- **Grain seam:** animated grain must loop or reseed cleanly at the cut. Either bake a grain cycle that divides into 210 frames, or use a grain whose per-frame randomness has no temporal correlation (so the cut isn't visible). Verify by playing the encoded loop 3× and watching ONLY the bottom-left corner for a pop.
- **Encode seam:** confirm the encoder isn't inserting a keyframe-driven brightness pop at the loop boundary (the `-g` = loop-length note in §2.2 addresses this). Always QA the final encoded file looping, never just the render — encoders introduce seam pops the raw frames don't have.

---

## 3. DIRECTION B — Live WebGL (same scene, interactive)

The identical §1 scene running real-time in-browser via R3F (`@react-three/fiber` + `drei`), reacting to cursor and scroll. Higher wow, higher risk, strict perf budget. Direction A's video is B's own fallback (see §3.3), so building B means building A anyway — A is never wasted work.

### 3.1 Interactivity model

- **Cursor parallax (depth):** pointer position maps to a small camera offset on X/Y, max **±2.2° rotation** and **±14px** equivalent translation, **damped** (lerp factor ~0.06 — heavy smoothing so it feels like inertia, not a cursor leash). Fragments at different depths move at different parallax rates (near shards move more than the seated mark) for true depth. Limits are deliberately tight: this is a premium agency site, not a game — the effect should be felt more than seen.
- **Scroll-linked formation:** the §1.8 timeline is **driven by scroll progress over the hero's height**, not by a clock. At scroll = 0 (page load, hero fully in view) the mark is **assembled** (the rest/answer state — first impression must be the resolved system, never scattered). As the user scrolls the hero out (0 → 1 over ~1 viewport height), the mark **gently de-coheres and the fragments drift apart** — i.e. scrolling away "explodes" the system into parts, which then live in the collage sections below. Scrolling back re-converges it. This makes the assembly idea tactile and ties the hero to the "the work" section beneath it.
  - Idle micro-loop on top of scroll: even at a fixed scroll position, the breath (±1.5% scale) + slow camera drift continue so a still user never sees a dead frame.
- **Idle state:** if no pointer + no scroll for ~6s, the camera does its slow autonomous orbital drift (the §1.4 move) so the scene is always alive. First pointer/scroll input damps back to interactive control.
- **Click/tap:** none. The hero CTAs are HTML buttons over the canvas; the canvas itself is `pointer-events: none` for clicks (parallax reads pointer via a window listener, not canvas hit-testing) so it never steals taps from the CTA pills.

### 3.2 Scroll ↔ timeline mapping

- Reuse the §1.8 beats but reorder for scroll semantics: **scroll 0 = assembled (beat "rest")**, scroll increasing = play the dissolution→drift beats in reverse-from-rest so scrolling away scatters. Convergence on scroll-back. The clock-driven version (A) plays dissolution→drift→convergence→rest; B is the scrubbable version of the same keyframes.
- Map with a damped scroll progress (lerp the raw scroll value) so flicky trackpad scroll doesn't make fragments jitter.

### 3.3 Degradation ladder (ordered — first match wins)

1. **`prefers-reduced-motion: reduce`** → render the **poster frame** (Direction A's assembled-mark poster). No canvas mounted at all. Static, accessible, instant.
2. **Weak GPU / low-power detected** → mount **Direction A's video loop** instead of the live canvas. Same visual, zero GPU cost. Detection (run before mounting canvas, see §3.6):
   - `navigator.hardwareConcurrency <= 4` OR `navigator.deviceMemory <= 4` (where available) → video.
   - WebGL renderer string sniff (via `WEBGL_debug_renderer_info`) for known weak/software renderers (SwiftShader, llvmpipe, basic Intel HD) → video.
   - `navigator.connection.saveData === true` → poster only (don't even load video).
   - A runtime **FPS watchdog**: if median FPS over the first ~90 frames < 45, unmount the canvas and swap to the video. Fail gracefully, don't stutter.
3. **Mobile (coarse pointer / ≤ 768px)** → **video loop** (Direction A's mobile-cropped variant), NOT live WebGL. Rationale: no cursor to parallax (so half the interactivity is moot), battery/thermal cost is real, and mobile GPUs vary wildly. Scroll-formation is nice but not worth the risk on the most-trafficked device class. Keep a tiny scroll-parallax translate on the video (the existing Hero.tsx parallax) for a hint of life.
4. **Capable desktop** → the full live WebGL scene.

> Net: live WebGL is a **progressive enhancement for capable desktops only.** Everyone else gets A's video or poster. This caps the risk surface hard and means the brief's "honest fallback" is literally Direction A.

### 3.4 What changes vs A's art direction (to hit real-time)

The look must read as the same scene as A; these are the allowable performance compromises:

- **Lighting baked, not real-time:** no real-time GI/area lights. Bake the §1.3 lighting into the materials via an **HDRI environment map** (a custom teal-void EXR built to match §1.1) + baked AO on the plates. The brass anisotropy + glass rims come from the env map reflections, not live lights. This is the single biggest perf win.
- **Glass approximation:** `MeshTransmissionMaterial` (drei) is expensive (it does buffer resampling). Budget **only the 3 hero plates** as true transmission, and even those at reduced samples (`samples: 4`, `resolution: 256` on the transmission buffer). The small glass chips use a **cheap faked-glass**: a `MeshPhysicalMaterial` with low roughness + env reflection + a fresnel-driven opacity, no real transmission. At their size the difference is invisible.
- **Instancing for shards:** all brass shards + glass chips rendered as **two `InstancedMesh` batches** (one brass, one glass-chip), driven by per-instance matrices animated on the CPU from the scroll/clock timeline. This collapses the shard count to 2 draw calls.
- **Particle/shard count cap:** ≤ **40 instanced shards total** (the brushstroke spatter can be sold with 40 well-placed instances; don't push to hundreds). The 3 hero plates + 40 instances + arrow-stroke geometry = the whole scene.
- **DoF:** A's render-quality DoF is too costly live. Use a cheap post DoF (drei `Bokeh` at low quality) OR — preferred — fake it by pre-blurring far instances via per-instance scale-into-focus + a mild full-screen vignette-blur. Don't ship expensive multi-pass bokeh.
- **No real-time bloom on everything:** single cheap `Bloom` pass (postprocessing `EffectComposer`), high threshold so only the rims + lime glint bloom (same as A's intent, cheaper impl).

### 3.5 Post FX (live)

- One `EffectComposer` chain: cheap Bloom (high threshold) → grade LUT (bake the §1.5 BD-005 grade into a 3D LUT texture, apply via a LUT effect — far cheaper than live colour math) → animated film grain shader (§1.7) → vignette. Keep the chain to ≤ 4 effects; each effect is a full-screen pass and they add up.
- Grain + vignette dither handles the dark-teal banding live (same concern as §1.7).

### 3.6 Perf budget (hard ceilings)

| Metric | Ceiling | Notes |
|---|---|---|
| Incremental JS bundle (R3F + drei + postprocessing + scene) | **< 180 KB gzipped** added to route | Lazy-load the canvas (dynamic import, `ssr: false`) so it NEVER blocks first paint or LCP. The HTML headline + poster paint first; canvas hydrates after. |
| Target frame rate | **60fps** capable desktop; degrade to video below 45fps median (§3.3) | |
| Draw calls | **≤ 12** total | 3 plates + 2 instanced batches + arrow geo + env + ≤4 post passes. |
| Triangles | **≤ ~120k** | Plates are low-poly rounded rects; arrow is extruded brushstroke geo decimated; shards are simple. |
| Transmission buffers | **3 max**, low-res (§3.4) | The main GPU cost — capped. |
| Texture memory | env HDRI ≤ 1K resolution, LUT 32³, no large textures | |
| Time-to-interactive impact | **~0** | Canvas is post-LCP, lazy, and gated behind capability detection that runs cheaply (no canvas spin-up to detect — use the navigator/WebGL-info checks first, only create a probe context if needed). |
| Mobile | canvas **never mounts** (§3.3 → video) | So mobile perf == Direction A. |

- LCP element must remain the HTML headline, not the canvas. Verify LCP doesn't regress vs current hero.
- Memory: dispose the canvas (geometries, materials, env, composer targets) on unmount (when degraded to video, or when hero scrolls fully out of view — optional unmount-when-offscreen to free GPU for the rest of the page).

---

## 4. PREVIEW PLAN (for Theo's Telegram pick — honestly comparable)

Both previews are **video files** (Telegram-friendly, viewable on phone). The point is to let Theo judge the SAME scene under each delivery mode, so the only honest difference shown is **"fixed cinematic loop" vs "reacts to the user."**

### 4.1 Preview A — the loop, as it'll ship

- Render the §1.8 beat sheet at **720×1280 portrait** (Telegram-on-phone friendly; the mark reads at this size) — OR 1280×720 if Theo views landscape; pick portrait for parity with phone viewing. Low-res test render is fine: this is a look + motion check, not final encode.
- **Duration: show 2 full loops back-to-back (14s)** so the loop seam is visible/judged — if the seam pops, Theo sees it now, not in production. Add a 0.5s hold on the assembled poster frame at the very start so the thumbnail is the "answer" frame.
- Headline + eyebrow + CTA composited over it (use the real §2.4 scrim + real copy) so Theo judges the whole hero, not a bare render. THIS IS IMPORTANT — a bare render isn't comparable to B's, and doesn't show the contrast solution.

### 4.2 Preview B — the live scene, shown via a SIMULATED interaction pass

B is interactive, so a passive video can't show it honestly. Render the live scene to video **driven by a scripted "ghost" input track** so the interactivity reads on a flat video:

- A scripted **cursor-drift path**: a smooth simulated pointer moving in a slow figure-8 / drift across the frame for the first ~5s, so the camera parallax + per-depth fragment response is clearly visible. Show a faint cursor dot or a subtle "(simulated cursor)" caption so Theo knows the motion is input-driven, not baked.
- Then a scripted **scroll-response pass** (~next 5s): simulate scrolling the hero out — the mark de-coheres / fragments drift apart — then scroll back — fragments re-converge. A small "(simulated scroll)" caption during this beat.
- Same 720×1280 portrait, same headline/eyebrow/CTA composite, same scrim, same grade/grain so A and B differ ONLY in behaviour, not in look or framing. ~10–12s total.
- Render this from the actual B code path (the real R3F scene with scripted inputs piped in), not a faked mock — otherwise the preview lies about what B will feel like.

### 4.3 What Theo is actually choosing between

State this plainly in the Telegram message accompanying the previews:

- **A** = fixed cinematic loop. Identical on every device. Zero runtime cost. The motion is the same every visit. Lowest risk. Ships fastest (just render + encode).
- **B** = same scene, but it reacts to the cursor and to scroll on capable desktops; everyone else gets A's loop anyway. More wow, more build + QA, small perf risk managed by the degradation ladder. **Choosing B includes building A** (it's the fallback), so B is the superset — A can ship first and B layer on later if we want to stage it.

---

## 5. OPEN QUESTIONS (for Theo / build team)

1. **Brass colour vs palette.** BD-005 is a monochromatic teal/cream atelier with lime reserved for CTAs. Introducing brushed brass (`#B79A6A`) is a deliberate metallic accent that ties to the hand-painted brand mark, but it's the one non-palette hue in the scene. Approve brass as a hero-only material, or render the connective shards in `--sage`/`--accent` frosted-metal instead (cooler, more palette-pure, but loses the "brushstroke" warmth)? My recommendation: keep brass, restrained and desaturated — it's what makes the assembled mark feel hand-made rather than CGI.
2. **Lime in the scene.** Spec uses exactly ONE tiny lime glint (the Meta-tile CTA pill at the lock beat). That's a defensible reading of "lime = conversion" since the Meta tile literally is conversion creative. Confirm that single glint is acceptable, or strip lime from the scene entirely and keep it 100% on the HTML CTA pills only.
3. **Stage A then B, or commit to one?** Because B contains A, the lowest-risk path is: ship A now, build B as a follow-on enhancement behind capability detection. Does Theo want one final answer from the preview, or an A-now / B-later sequence? (Doesn't change either spec — just delivery order.)
4. **Mobile crop.** A's mobile variant is a 4:5 centre-crop on the assembly. Confirm the mark reading clearly on phone matters more than showing the full wide field (I've assumed yes — the mark is the message).
5. **Headline copy.** Spec preserves the current locked hero copy (`Campaigns today. Capability tomorrow.`). If Theo wants the background change to come with a copy revisit, that's a separate ask — flag it and I'll spec the type beat too.

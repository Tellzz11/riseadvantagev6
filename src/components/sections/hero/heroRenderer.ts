// ════════════════════════════════════════════════════════════════════════════
// RISE v6 HERO (live WebGL) — the scene, ported from the approved Remotion
// build (video-studio/src/heroV6/HeroScene.tsx) with the spec §3.4 real-time
// compromises applied:
//
//   • all 30 brass shards → ONE InstancedMesh; all 8 glass chips → ONE
//     InstancedMesh (2 draw calls for 38 shards)
//   • per-plate detail inlays (backing, bands, lanes, ports, connector) merged
//     into ONE vertex-coloured unlit mesh per plate (emissive look preserved
//     by summing base+emissive in linear space — they were emissive-dominated
//     standard materials in the render)
//   • lighting fully baked into the PMREM environment (no real-time punctual
//     lights) — the Remotion scene's key directional + moss point fill are
//     baked in as HDR emissive cards in the env scene
//   • transmission kept ONLY on the 3 hero plates (the §3.4 budget), at half
//     resolution via renderer.transmissionResolutionScale
//   • DoF: none — fog-based depth cueing (pre-approved deviation, matches the
//     rendered preview exactly)
//   • bloom: additive glint sprite only (pre-approved deviation — same pixels
//     as the approved preview, zero post passes)
//
// VANILLA THREE, NOT @react-three/fiber: fiber's <Canvas> calls extend(THREE)
// on the full namespace, which makes three un-tree-shakable — the lazy chunk
// measured 238KB gzip vs the §3.6 hard 180KB budget. Named imports here let
// the bundler strip everything the scene doesn't touch. The per-frame math is
// IDENTICAL to the fiber port (same useFrame body, now in the rAF loop).
//
// Draw-call ledger (scene pass): 3 glass plates + 3 merged detail meshes +
// 1 lime CTA pill + 1 brass IM + 1 chip IM + 1 glint sprite + 1 shaft sprite
// = 11 ≤ 12 (§3.6). The 3 transmission materials trigger one extra internal
// scene pass into the (half-res) transmission buffer — that's the capped
// "3 transmission buffers" cost the spec budgets, not extra scene draws.
// ════════════════════════════════════════════════════════════════════════════

import {
  ACESFilmicToneMapping,
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  BoxGeometry,
  CanvasTexture,
  Color,
  CylinderGeometry,
  DoubleSide,
  Euler,
  ExtrudeGeometry,
  FogExp2,
  Group,
  InstancedMesh,
  Matrix4,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  PMREMGenerator,
  QuadraticBezierCurve3,
  Quaternion,
  Scene,
  Shape,
  ShapeGeometry,
  Sprite,
  SpriteMaterial,
  SRGBColorSpace,
  TubeGeometry,
  Vector3,
  WebGLRenderer,
  type ColorRepresentation,
  type Material,
  type MeshPhysicalMaterialParameters,
} from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
import { T, smoothstep, lerp, clamp01, flattenOfP, breathOfTheta, LOOP_SECONDS } from "./heroMath";
import {
  ASSEMBLY_POS,
  ASSEMBLY_SCALE,
  CAM_FOV,
  CAM_R,
  buildFragments,
  fragPose,
  type Frag,
  type FragPose,
} from "./heroFragments";

// ── the mutable input bag (written by HeroCanvas listeners, read per frame) ──
export type HeroInput = {
  targetPx: number; // cursor x, −1..1 (left..right)
  targetPy: number; // cursor y, −1..1 (top..bottom)
  targetScroll: number; // scrollY / viewport-height (0 = top = assembled)
  lastInput: number; // clock-seconds of last user input (drives idle drift)
  clock: number; // accumulated scene seconds (theta source)
  onFrame?: (dtRaw: number) => void;
};

export type HeroRendererHandle = {
  setSize: (w: number, h: number) => void;
  start: () => void;
  stop: () => void;
  dispose: () => void;
  info: () => { calls: number; triangles: number; geometries: number; textures: number };
};

// ── geometry helpers (verbatim port) ─────────────────────────────────────────
function roundedRectShape(w: number, h: number, rad: number) {
  const s = new Shape();
  const x = -w / 2;
  const y = -h / 2;
  s.moveTo(x + rad, y);
  s.lineTo(x + w - rad, y);
  s.quadraticCurveTo(x + w, y, x + w, y + rad);
  s.lineTo(x + w, y + h - rad);
  s.quadraticCurveTo(x + w, y + h, x + w - rad, y + h);
  s.lineTo(x + rad, y + h);
  s.quadraticCurveTo(x, y + h, x, y + h - rad);
  s.lineTo(x, y + rad);
  s.quadraticCurveTo(x, y, x + rad, y);
  return s;
}

const plateGeo = (w: number, h: number, rad: number) => {
  const g = new ExtrudeGeometry(roundedRectShape(w, h, rad), {
    depth: 0.03,
    bevelEnabled: true,
    bevelThickness: 0.008, // §1.3 — the edge bevel that catches the accent rim
    bevelSize: 0.008,
    bevelSegments: 3,
    curveSegments: 16,
  });
  g.translate(0, 0, -0.015);
  return g;
};

// Effective unlit colour for an emissive-dominated detail: base + emissive·i
// summed in linear working space (matches how the lit render reads — the
// near-black bases contribute almost nothing).
function emissiveMix(base: string, emissive: string, intensity: number): Color {
  const c = new Color(base);
  const e = new Color(emissive);
  c.r = Math.min(1, c.r + e.r * intensity);
  c.g = Math.min(1, c.g + e.g * intensity);
  c.b = Math.min(1, c.b + e.b * intensity);
  return c;
}

// Stamp a uniform vertex-colour attribute + bake a translation/rotation into
// a part geometry so it can merge into the plate's single detail mesh.
function part(
  geo: BufferGeometry,
  color: Color,
  pos: [number, number, number],
  rotX = 0,
): BufferGeometry {
  if (rotX !== 0) geo.rotateX(rotX);
  geo.translate(...pos);
  const n = geo.getAttribute("position").count;
  const colors = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  }
  geo.setAttribute("color", new BufferAttribute(colors, 3));
  // drop uv/normal mismatches for merge: keep position+color only (unlit)
  geo.deleteAttribute("uv");
  geo.deleteAttribute("normal");
  return geo;
}

const Z_IN = 0.026; // inlays just proud of the glass face
const BACKING = emissiveMix("#11302B", T.eucalyptus, 0.2);
const BASE = "#0B1E1B";

// ── materials (spec §1.3 — locked; env-lit only) ────────────────────────────
const GLASS_PROPS: MeshPhysicalMaterialParameters = {
  transmission: 0.92,
  ior: 1.45,
  roughness: 0.18,
  thickness: 0.4,
  metalness: 0,
  color: "#EDF3F0",
  attenuationColor: new Color(T.eucalyptus),
  attenuationDistance: 2.2,
  sheen: 0.85,
  sheenColor: new Color(T.sage),
  sheenRoughness: 0.45,
  clearcoat: 0.5,
  clearcoatRoughness: 0.25,
  envMapIntensity: 1.5,
};

const BRASS_PROPS: MeshPhysicalMaterialParameters = {
  metalness: 1.0,
  roughness: 0.34,
  color: new Color(T.brass),
  anisotropy: 0.6,
  sheen: 0.25,
  sheenColor: new Color(T.sage),
  sheenRoughness: 0.6,
  emissive: new Color("#6B5638"),
  emissiveIntensity: 0.22,
};

const CHIP_PROPS: MeshPhysicalMaterialParameters = {
  metalness: 0,
  roughness: 0.22,
  color: "#C8D6CF",
  transparent: true,
  opacity: 0.5,
  sheen: 0.6,
  sheenColor: new Color(T.sage),
  sheenRoughness: 0.5,
  envMapIntensity: 1.2,
};

// ── soft additive glow sprite texture (lime glint + light shaft) ────────────
function makeGlowTexture(): CanvasTexture {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const g = c.getContext("2d")!;
  const grd = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  grd.addColorStop(0, "rgba(255,255,255,1)");
  grd.addColorStop(0.3, "rgba(255,255,255,0.5)");
  grd.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = grd;
  g.fillRect(0, 0, 128, 128);
  const tex = new CanvasTexture(c);
  tex.colorSpace = SRGBColorSpace;
  return tex;
}

// ── environment: teal-void studio env (PMREM) with the punctual lights baked
// in as HDR cards (§3.4 "lighting baked, not real-time") ────────────────────
function bakeEnvironment(renderer: WebGLRenderer, scene: Scene) {
  const env = new Scene();
  env.background = new Color(T.canvasDeep);
  const add = (w: number, h: number, color: ColorRepresentation, pos: [number, number, number]) => {
    const m = new Mesh(new PlaneGeometry(w, h), new MeshBasicMaterial({ color, side: DoubleSide }));
    m.position.set(...pos);
    m.lookAt(0, 0, 0);
    env.add(m);
  };
  // original PMREM cards (same as the Remotion scene)
  add(5, 3.2, "#E8E3CE", [5, 6, 4]); // key — upper camera-right (warm-white)
  add(11, 2.6, "#E0BE82", [2, 4.5, -6]); // warm strip → brass highlights
  add(8, 2, "#C9A86B", [-1, -2, 6]); // warm front bounce (brass underside)
  add(7, 5, T.moss, [-5, -5, 3]); // moss fill — lower-left
  add(5, 3, "#11302C", [-4, 3, -5]); // cool bounce
  // baked replacements for the render's punctual lights:
  //   directional key 1.5 #EFE9D5 @ [4.5,5.5,3.5] → HDR card same direction.
  //   WIDE (9×6), not bright-and-small: a directional light gives cream
  //   specular to every front-facing brass normal; only a broad solid angle
  //   reproduces that — a narrow card let the warm strips dominate and pushed
  //   the brass orange vs the approved Direction A frames.
  add(9, 6, new Color("#EFE9D5").multiplyScalar(2.1), [4.5, 5.5, 3.5]);
  //   moss point fill 14 @ [-4,-3,2.5] → boosted moss card same direction
  add(6, 4, new Color(T.moss).multiplyScalar(1.7), [-4, -3, 2.5]);
  const pmrem = new PMREMGenerator(renderer);
  const rt = pmrem.fromScene(env, 0.3);
  pmrem.dispose();
  env.traverse((o) => {
    if (o instanceof Mesh) {
      o.geometry.dispose();
      (o.material as Material).dispose();
    }
  });
  scene.environment = rt.texture;
  // The render ran env at default 1.0 PLUS the punctual lights; the punctuals
  // are baked into the two HDR comp cards above, so the env itself stays at
  // 1.0 (0.85 under-lit the brass vs the approved Direction A frames).
  scene.environmentIntensity = 1.0;
  return rt;
}

// ── merged plate detail geometries ───────────────────────────────────────────
function buildMetaDetails(): BufferGeometry {
  return mergeGeometries([
    part(new ShapeGeometry(roundedRectShape(0.6, 0.76, 0.07), 12), BACKING, [0, 0, -0.024]),
    part(new PlaneGeometry(0.5, 0.3), emissiveMix(BASE, T.eucalyptus, 0.5), [0, 0.16, Z_IN]),
    part(new PlaneGeometry(0.4, 0.042), emissiveMix(BASE, T.accent, 0.65), [-0.05, -0.07, Z_IN]),
    part(new PlaneGeometry(0.28, 0.042), emissiveMix(BASE, T.accent, 0.5), [-0.11, -0.155, Z_IN]),
  ])!;
}

function buildCrmDetails(): BufferGeometry {
  const parts: BufferGeometry[] = [
    part(new ShapeGeometry(roundedRectShape(0.84, 0.5, 0.06), 12), BACKING, [0, 0, -0.024]),
  ];
  for (const x of [-0.215, 0, 0.215]) {
    parts.push(part(new PlaneGeometry(0.008, 0.38), emissiveMix(BASE, T.accent, 0.6), [x, 0, Z_IN]));
  }
  parts.push(
    part(new ShapeGeometry(roundedRectShape(0.15, 0.08, 0.02), 8), emissiveMix(BASE, T.eucalyptus, 0.8), [-0.32, 0.1, Z_IN]),
    part(new ShapeGeometry(roundedRectShape(0.15, 0.08, 0.02), 8), emissiveMix(BASE, T.eucalyptus, 0.65), [-0.105, -0.06, Z_IN]),
  );
  return mergeGeometries(parts)!;
}

function buildNodeDetails(): BufferGeometry {
  const parts: BufferGeometry[] = [
    part(new ShapeGeometry(roundedRectShape(0.28, 0.22, 0.06), 12), BACKING, [0, 0, -0.024]),
  ];
  for (const x of [-0.15, 0.15]) {
    parts.push(
      part(new CylinderGeometry(0.022, 0.022, 0.012, 16), emissiveMix(BASE, T.accent, 0.9), [x, 0, 0.018], Math.PI / 2),
    );
  }
  const curve = new QuadraticBezierCurve3(
    new Vector3(0.15, 0, 0.005),
    new Vector3(0.32, 0.07, 0.005),
    new Vector3(0.46, -0.07, 0.005),
  );
  parts.push(part(new TubeGeometry(curve, 20, 0.0075, 8), emissiveMix(BASE, T.accent, 0.7), [0, 0, 0]));
  return mergeGeometries(parts)!;
}

// ════════════════════════════════════════════════════════════════════════════
export function createHeroRenderer(canvas: HTMLCanvasElement, input: HeroInput): HeroRendererHandle {
  const renderer = new WebGLRenderer({
    canvas,
    antialias: true,
    alpha: false,
    stencil: false,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  // match the fiber/@remotion-three default the approved render used
  renderer.toneMapping = ACESFilmicToneMapping;
  // §3.4 — half-res transmission pass; the frosted plates read identically at
  // 0.5 and the fill-rate saving is the single biggest GPU win
  renderer.transmissionResolutionScale = 0.5;

  const camera = new PerspectiveCamera(CAM_FOV, 1, 0.1, 60);
  camera.position.set(0, 0.3, 8);

  const scene = new Scene();
  // fog + background (fog-based depth cueing — §1.1)
  scene.background = new Color(T.canvasDeep);
  scene.fog = new FogExp2(T.canvas, 0.052);
  const envRT = bakeEnvironment(renderer, scene);

  // ── static resources ───────────────────────────────────────────────────────
  const frags = buildFragments();
  const brassFrags = frags.filter((f) => f.kind === "brass");
  const chipFrags = frags.filter((f) => f.kind === "chip");
  const plateFrags = {
    meta: frags.find((f) => f.kind === "meta")!,
    crm: frags.find((f) => f.kind === "crm")!,
    node: frags.find((f) => f.kind === "node")!,
  };

  const box = new BoxGeometry(1, 1, 1);
  const metaGeo = plateGeo(0.62, 0.78, 0.07);
  const crmGeo = plateGeo(0.86, 0.52, 0.06);
  const nodeGeo = plateGeo(0.3, 0.24, 0.06);
  const metaDetails = buildMetaDetails();
  const crmDetails = buildCrmDetails();
  const nodeDetails = buildNodeDetails();
  const pillGeo = new ShapeGeometry(roundedRectShape(0.2, 0.075, 0.0375), 12);
  const glass = new MeshPhysicalMaterial(GLASS_PROPS);
  const brass = new MeshPhysicalMaterial(BRASS_PROPS);
  const chip = new MeshPhysicalMaterial(CHIP_PROPS);
  const details = new MeshBasicMaterial({ vertexColors: true });
  const pillMat = new MeshBasicMaterial({ color: emissiveMix(BASE, T.accentLime, 0.9) });
  const glowTex = makeGlowTexture();

  // ── object graph ───────────────────────────────────────────────────────────
  const assembly = new Group();
  scene.add(assembly);

  // brass shards + arrowhead — ONE instanced draw
  const brassIM = new InstancedMesh(box, brass, brassFrags.length);
  brassIM.frustumCulled = false;
  assembly.add(brassIM);
  // frosted chips — ONE instanced draw
  const chipIM = new InstancedMesh(box, chip, chipFrags.length);
  chipIM.frustumCulled = false;
  assembly.add(chipIM);

  // Meta ad tile
  const metaGroup = new Group();
  metaGroup.add(new Mesh(metaGeo, glass), new Mesh(metaDetails, details));
  const pill = new Mesh(pillGeo, pillMat);
  pill.position.set(-0.15, -0.28, Z_IN);
  metaGroup.add(pill);
  const glintMat = new SpriteMaterial({
    map: glowTex,
    color: T.accentLime,
    blending: AdditiveBlending,
    transparent: true,
    depthWrite: false,
    opacity: 0,
  });
  glintMat.toneMapped = false;
  const glintSprite = new Sprite(glintMat);
  glintSprite.position.set(-0.15, -0.28, 0.06);
  glintSprite.scale.set(0.5, 0.32, 1);
  glintSprite.visible = false;
  metaGroup.add(glintSprite);
  assembly.add(metaGroup);

  // CRM pipeline card
  const crmGroup = new Group();
  crmGroup.add(new Mesh(crmGeo, glass), new Mesh(crmDetails, details));
  assembly.add(crmGroup);

  // Workflow node
  const nodeGroup = new Group();
  nodeGroup.add(new Mesh(nodeGeo, glass), new Mesh(nodeDetails, details));
  assembly.add(nodeGroup);

  // faked volumetric shaft — stretched additive sprite, very faint.
  const shaftMat = new SpriteMaterial({
    map: glowTex,
    color: T.accent,
    blending: AdditiveBlending,
    transparent: true,
    depthWrite: false,
    opacity: 0.05,
    rotation: -0.55,
  });
  shaftMat.toneMapped = false;
  const shaft = new Sprite(shaftMat);
  shaft.position.set(0.2, 1.9, -2.3);
  shaft.scale.set(3.3, 9, 1);
  assembly.add(shaft);

  // ── damped runtime state + scratch (no per-frame allocation) ───────────────
  const s = {
    px: 0,
    py: 0,
    scroll: 0, // damped scroll progress 0..1
    glintAt: 1.4, // first lock-glint shortly after mount
    glintArmed: false,
    idleK: 0, // 0 = interactive, 1 = idle (ramps after 6s without input)
  };
  const pose: FragPose = { x: 0, y: 0, z: 0, rx: 0, ry: 0, rz: 0 };
  const m = new Matrix4();
  const q = new Quaternion();
  const e = new Euler();
  const v = new Vector3();
  const sc = new Vector3();
  const lime = new Color(T.accentLime);
  const baseC = new Color(BASE);

  const writeInstances = (
    im: InstancedMesh,
    list: Frag[],
    p: number,
    theta: number,
    flatten: number,
    isChip: boolean,
  ) => {
    for (let i = 0; i < list.length; i++) {
      const f = list[i];
      fragPose(f, p, theta, flatten, s.px, s.py, pose, smoothstep, lerp);
      e.set(pose.rx, pose.ry, pose.rz);
      q.setFromEuler(e);
      v.set(pose.x, pose.y, pose.z);
      if (isChip) sc.set(f.len, f.len * 0.85, f.len * 0.3);
      else sc.set(f.len, f.thick, 0.022);
      m.compose(v, q, sc);
      im.setMatrixAt(i, m);
    }
    im.instanceMatrix.needsUpdate = true;
  };

  const placePlate = (g: Group, f: Frag, p: number, theta: number, flatten: number) => {
    fragPose(f, p, theta, flatten, s.px, s.py, pose, smoothstep, lerp);
    g.position.set(pose.x, pose.y, pose.z);
    g.rotation.set(pose.rx, pose.ry, pose.rz);
  };

  // ── the frame (identical math to the approved Remotion scene) ──────────────
  let last = -1;
  const frame = (nowMs: number) => {
    const dtRaw = last < 0 ? 1 / 60 : Math.max(0.0001, (nowMs - last) / 1000);
    last = nowMs;
    const dt = Math.min(dtRaw, 0.1); // clamp tab-switch jumps
    const t = input.clock;

    // damped inputs (§3.1 lerp ~0.06 @60fps, framerate-normalised)
    const k = 1 - Math.pow(1 - 0.06, dt * 60);
    s.px += (input.targetPx - s.px) * k;
    s.py += (input.targetPy - s.py) * k;
    const ks = 1 - Math.pow(1 - 0.08, dt * 60);
    s.scroll += (input.targetScroll - s.scroll) * ks;

    // idle blend — after 6s without input the autonomous drift ramps up (§3.1)
    const idle = t - input.lastInput > 6 ? 1 : 0;
    s.idleK += (idle - s.idleK) * (1 - Math.pow(1 - 0.02, dt * 60));

    // scroll → formation (§3.2): scroll 0 = assembled
    const p = 1 - clamp01(s.scroll);
    const theta = ((t % LOOP_SECONDS) / LOOP_SECONDS) * Math.PI * 2;
    const flatten = flattenOfP(p);
    const breath = breathOfTheta(theta);

    // lock-glint: re-arm when de-cohered, fire on re-lock (the ONE lime beat)
    if (p < 0.6) s.glintArmed = true;
    if (s.glintArmed && p > 0.97) {
      s.glintArmed = false;
      s.glintAt = t + 0.25;
    }
    const glint = Math.exp(-Math.pow((t - s.glintAt) / 0.22, 2));

    // camera — idle = the §1.4 orbital drift; interactive = subtler drift.
    const ampl = lerp(1.4, 3.5, s.idleK);
    const orbit = ((ampl * Math.PI) / 180) * Math.sin((2 * Math.PI * t) / 10);
    const dolly = s.idleK * ((1 - Math.cos(theta)) / 2);
    const bob = s.idleK * 0.05 * Math.sin(theta);
    const r = CAM_R * (1 - 0.04 * dolly);
    const az = orbit + s.px * ((2.2 * Math.PI) / 180);
    const el = 0.04 + bob * 0.012 - s.py * 0.012;
    camera.position.set(
      Math.sin(az) * r + s.px * 0.06,
      Math.sin(el) * r * 0.5 + bob - s.py * 0.05,
      Math.cos(az) * r,
    );
    camera.lookAt(0, 0, 0);

    // assembly group
    assembly.position.set(...ASSEMBLY_POS);
    assembly.scale.setScalar(ASSEMBLY_SCALE * breath);

    // instanced shards
    writeInstances(brassIM, brassFrags, p, theta, flatten, false);
    writeInstances(chipIM, chipFrags, p, theta, flatten, true);

    // hero plates
    placePlate(metaGroup, plateFrags.meta, p, theta, flatten);
    placePlate(crmGroup, plateFrags.crm, p, theta, flatten);
    placePlate(nodeGroup, plateFrags.node, p, theta, flatten);

    // the single lime moment — pill brightens + sprite glint blooms
    pillMat.color.set(baseC).add(lime.set(T.accentLime).multiplyScalar(0.9 + glint * 3.2));
    glintMat.opacity = glint * 0.55;
    glintSprite.visible = glint > 0.004;

    renderer.render(scene, camera);
    input.onFrame?.(dtRaw);
  };

  return {
    setSize(w: number, h: number) {
      camera.aspect = w / Math.max(1, h);
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    },
    start() {
      last = -1; // re-baseline dt so a paused interval doesn't register
      renderer.setAnimationLoop(frame);
    },
    stop() {
      renderer.setAnimationLoop(null);
    },
    dispose() {
      renderer.setAnimationLoop(null);
      for (const g of [box, metaGeo, crmGeo, nodeGeo, metaDetails, crmDetails, nodeDetails, pillGeo])
        g.dispose();
      for (const mat of [glass, brass, chip, details, pillMat, glintMat, shaftMat]) mat.dispose();
      glowTex.dispose();
      envRT.dispose();
      renderer.dispose();
    },
    info() {
      const i = renderer.info;
      return {
        calls: i.render.calls,
        triangles: i.render.triangles,
        geometries: i.memory.geometries,
        textures: i.memory.textures,
      };
    },
  };
}

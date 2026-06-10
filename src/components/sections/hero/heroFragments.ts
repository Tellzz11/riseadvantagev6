// ════════════════════════════════════════════════════════════════════════════
// RISE v6 HERO (live WebGL) — the fragment field, ported 1:1 from the approved
// Remotion scene (video-studio/src/heroV6/HeroScene.tsx). Same seeded rng,
// same paths, same stagger windows → the live field is geometrically identical
// to the Direction A fallback video, so a watchdog swap doesn't "jump".
//
// Instanced-shard budget (spec §3.4): step 0.45 lays 30 brass (incl. the two
// arrowhead wings) + 8 glass chips = 38 ≤ 40.
// ════════════════════════════════════════════════════════════════════════════
import { Euler, Vector2, Vector3 } from "three";
import { rng } from "./heroMath";

// §1.4 framing — desktop master framing, locked to the Direction A render
// (video-studio/src/heroV6/Final.tsx FinalDesktop). Assembly right-of-centre
// + slightly high; lower-left third stays open and dark for the type.
export const ASSEMBLY_POS: [number, number, number] = [1.45, 0.7, 0];
export const ASSEMBLY_SCALE = 0.78;
export const CAM_R = 8;
export const CAM_FOV = 40;

// ── the brushstroke mark (silhouette of record: logo-mark-dark.png) ──────────
type P2 = [number, number];
const MAIN_PATH: P2[] = [
  [-2.1, -1.05],
  [-1.35, 0.15], // peak 1 ← Meta ad tile seats here
  [-0.65, -0.75],
  [0.1, 0.45], // peak 2 ← workflow node seats here
  [0.75, -0.45],
  [1.55, 0.75], // the rise
  [2.0, 1.25], // arrow tip
];
const LOWER_PATH: P2[] = [
  [-2.3, -1.6],
  [-1.5, -0.45],
  [-0.8, -1.35],
  [-0.05, -0.2], // lower peak ← CRM card seats here
  [0.6, -1.05],
  [1.1, -0.35],
];

export type FragKind = "meta" | "crm" | "node" | "brass" | "chip";
export type Frag = {
  kind: FragKind;
  seat: Vector3;
  seatRot: Euler;
  scatter: Vector3;
  scatterRot: Euler;
  len: number;
  thick: number;
  d: number; // stagger window start in p-space
  w: number; // stagger window width
  seed: number;
  parallaxF: number; // per-depth cursor-parallax factor (§3.1)
};

// Scatter direction: away from the lower-left anchor → fragments always live
// (and travel) up-and-right of their seats. §1.6.3 hard rule: nothing bright
// ever crosses the lower-left headline third.
const SCATTER_ANCHOR = new Vector3(-2.8, -2.4, 0);

function makeScatter(seat: Vector3, r: () => number): Vector3 {
  const dir = seat.clone().sub(SCATTER_ANCHOR);
  dir.x += (r() - 0.3) * 1.2; // jitter, biased right
  dir.y += (r() - 0.3) * 1.4; // jitter, biased up
  dir.z = 0;
  dir.normalize();
  const dist = 1.4 + r() * 2.0;
  const out = seat.clone().addScaledVector(dir, dist);
  out.z = seat.z - (1.6 + r() * 3.2); // back into the fog
  return out;
}

export function buildFragments(): Frag[] {
  const r = rng(20260610);
  const frags: Frag[] = [];

  // 3 hero plates — lock first on convergence (lowest d)
  const plates: { kind: FragKind; at: P2; z: number; d: number }[] = [
    { kind: "meta", at: MAIN_PATH[1], z: 0.18, d: 0.02 },
    { kind: "crm", at: LOWER_PATH[3], z: 0.15, d: 0.08 },
    { kind: "node", at: [1.32, 0.28], z: 0.2, d: 0.14 },
  ];
  for (const pl of plates) {
    const seat = new Vector3(pl.at[0], pl.at[1], pl.z);
    frags.push({
      kind: pl.kind,
      seat,
      seatRot: new Euler((r() - 0.5) * 0.1, 0.24 + (r() - 0.5) * 0.12, (r() - 0.5) * 0.08),
      scatter: makeScatter(seat, r),
      scatterRot: new Euler((r() - 0.5) * 1.2, (r() - 0.5) * 1.4, (r() - 0.5) * 0.9),
      len: 1,
      thick: 1,
      d: pl.d,
      w: 0.55,
      seed: r() * 1000,
      parallaxF: 0.55,
    });
  }

  // Brass shards along both strokes — they ARE the stroke.
  const layStroke = (path: P2[], thick: number, dBase: number, dSpan: number) => {
    let total = 0;
    const segs: { a: Vector2; b: Vector2; start: number }[] = [];
    for (let i = 0; i < path.length - 1; i++) {
      const a = new Vector2(...path[i]);
      const b = new Vector2(...path[i + 1]);
      segs.push({ a, b, start: total });
      total += a.distanceTo(b);
    }
    const step = 0.45; // ≤40-instance budget — matches the Direction A render
    for (const seg of segs) {
      const segLen = seg.a.distanceTo(seg.b);
      const n = Math.max(1, Math.round(segLen / step));
      for (let i = 0; i < n; i++) {
        const t0 = (i + 0.5) / n;
        const at = total === 0 ? 0 : (seg.start + t0 * segLen) / total;
        const pos2 = seg.a.clone().lerp(seg.b, t0);
        const ang = Math.atan2(seg.b.y - seg.a.y, seg.b.x - seg.a.x);
        const seat = new Vector3(
          pos2.x + (r() - 0.5) * 0.035,
          pos2.y + (r() - 0.5) * 0.035,
          (r() - 0.5) * 0.05,
        );
        frags.push({
          kind: "brass",
          seat,
          seatRot: new Euler((r() - 0.5) * 0.3, (r() - 0.5) * 0.25, ang + (r() - 0.5) * 0.08),
          scatter: makeScatter(seat, r),
          scatterRot: new Euler((r() - 0.5) * 1.6, (r() - 0.5) * 1.6, ang + (r() - 0.5) * 1.2),
          len: step * (1.3 + r() * 0.4),
          thick,
          d: dBase + at * dSpan + r() * 0.04,
          w: 0.42,
          seed: r() * 1000,
          parallaxF: 0.8 + r() * 0.5,
        });
      }
    }
  };
  layStroke(MAIN_PATH, 0.075, 0.2, 0.3);
  layStroke(LOWER_PATH, 0.06, 0.24, 0.26);

  // Arrowhead — two brass wings converging on the tip.
  const tip = new Vector2(...MAIN_PATH[6]);
  const riseAng = Math.atan2(1.25 - 0.75, 2.0 - 1.55);
  for (const side of [-1, 1]) {
    const ang = riseAng + Math.PI + side * 0.52;
    const mid = tip.clone().add(new Vector2(Math.cos(ang), Math.sin(ang)).multiplyScalar(0.24));
    const seat = new Vector3(mid.x, mid.y, 0.01 * side);
    frags.push({
      kind: "brass",
      seat,
      seatRot: new Euler(0, (r() - 0.5) * 0.2, ang + Math.PI),
      scatter: makeScatter(seat, r),
      scatterRot: new Euler((r() - 0.5) * 1.5, (r() - 0.5) * 1.5, ang),
      len: 0.48,
      thick: 0.085,
      d: 0.5 + r() * 0.04,
      w: 0.42,
      seed: r() * 1000,
      parallaxF: 0.9 + r() * 0.4,
    });
  }

  // Frosted glass chips — the brushstroke spatter. Seat LAST (fill texture).
  const spatterNear: P2[] = [
    [-1.7, 0.5], [-0.95, -1.05], [-0.2, 0.85], [0.5, -0.85],
    [1.0, 0.15], [1.75, 1.5], [-2.45, -1.3], [0.95, -1.3],
  ];
  for (const sp of spatterNear) {
    const seat = new Vector3(sp[0] + (r() - 0.5) * 0.2, sp[1] + (r() - 0.5) * 0.2, (r() - 0.5) * 0.4);
    frags.push({
      kind: "chip",
      seat,
      seatRot: new Euler(r() * 0.8, r() * 0.8, r() * Math.PI),
      scatter: makeScatter(seat, r),
      scatterRot: new Euler(r() * 2, r() * 2, r() * 2),
      len: 0.07 + r() * 0.07,
      thick: 1,
      d: 0.52 + r() * 0.08,
      w: 0.36,
      seed: r() * 1000,
      parallaxF: 1.2 + r() * 0.5,
    });
  }

  return frags;
}

// Per-frame fragment pose — the FragmentView math from the Remotion scene,
// extracted so the live loop can write it into instanced matrices.
export type FragPose = {
  x: number; y: number; z: number;
  rx: number; ry: number; rz: number;
};

export function fragPose(
  frag: Frag,
  p: number,
  theta: number,
  flatten: number,
  px: number,
  py: number,
  out: FragPose,
  smoothstepFn: (a: number, b: number, x: number) => number,
  lerpFn: (a: number, b: number, t: number) => number,
): number {
  const a = smoothstepFn(frag.d, Math.min(frag.d + frag.w, 1), p);
  const loose = 1 - a;

  const s = frag.seed;
  const ox = Math.sin(theta * 2 + s) * 0.16 * loose + Math.sin(theta * 3 + s * 2) * 0.05 * loose;
  const oy = Math.cos(theta * 2 + s * 1.3) * 0.2 * loose + Math.sin(theta * 4 + s) * 0.04 * loose;
  const oz = Math.sin(theta * 1 + s * 0.7) * 0.18 * loose;
  const mf = Math.sin(theta * 2 + s * 3) * 0.008;

  out.x = lerpFn(frag.scatter.x, frag.seat.x, a) + ox + px * frag.parallaxF * 0.055;
  out.y = lerpFn(frag.scatter.y, frag.seat.y, a) + oy + mf + py * frag.parallaxF * 0.055;
  let z = lerpFn(frag.scatter.z, frag.seat.z, a) + oz;
  z = lerpFn(z, z * 0.45, flatten * a);
  out.z = z;

  out.rx = lerpFn(frag.scatterRot.x, frag.seatRot.x * (1 - 0.7 * flatten), a) + Math.sin(theta * 2 + s) * 0.18 * loose;
  out.ry = lerpFn(frag.scatterRot.y, frag.seatRot.y * (1 - 0.7 * flatten), a) + Math.cos(theta * 3 + s) * 0.15 * loose;
  out.rz = lerpFn(frag.scatterRot.z, frag.seatRot.z, a);

  return a;
}

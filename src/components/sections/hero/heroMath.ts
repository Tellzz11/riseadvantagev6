// ════════════════════════════════════════════════════════════════════════════
// RISE v6 HERO (live WebGL) — shared math, ported verbatim from the approved
// Remotion scene at video-studio/src/heroV6/timeline.ts + palette.ts.
// Direction A renders this math on a clock; this live port drives the same
// curves from scroll + cursor (spec §3.2). DO NOT tweak constants here without
// re-rendering Direction A — the video fallback must stay pixel-coherent.
// ════════════════════════════════════════════════════════════════════════════

// BD-005 tokens (verbatim from globals.css — hex needed inside WebGL where
// CSS vars don't reach)
export const T = {
  canvas: "#0A211F",
  canvasSoft: "#0E2725",
  canvasDeep: "#061715",
  moss: "#4F756E",
  sage: "#C7D2BE",
  eucalyptus: "#8FB0A4",
  accent: "#F7F9F2",
  accentLime: "#D8FF85",
  // spec §1.3 — desaturated warm brass (aged instrument, not gold)
  brass: "#B79A6A",
} as const;

// ── easings ──────────────────────────────────────────────────────────────────
export const smoothstep = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const clamp01 = (x: number) => Math.min(1, Math.max(0, x));

// ── deterministic seeded rng — MUST match the Remotion scene so the live
// fragment field is identical to the rendered fallback video ────────────────
export function rng(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

// §1.2/§1.8 micro-flatten — rides the top of p (1 at rest, 0 de-cohered).
export const flattenOfP = (p: number) => smoothstep(0.96, 1, p);

// §1.8 settle breath — ±1.5% scale, periodic.
export const breathOfTheta = (theta: number) => 1 + 0.015 * Math.sin(theta);

// 7.0s ambient loop period (theta drives all idle oscillators).
export const LOOP_SECONDS = 7.0;

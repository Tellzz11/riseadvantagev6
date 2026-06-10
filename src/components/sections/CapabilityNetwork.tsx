"use client";

import Image from "next/image";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import Container from "./_Container";
import {
  PenLine,
  Search,
  Target,
  Film,
  Sparkles,
  Megaphone,
  Layers,
  Mic,
} from "lucide-react";

// CapabilityNetwork — services grid (v3 brief).
//
// What changed in v3:
//   • Connectors now attach to actual pill edges via ref-measured layout —
//     no floating lines. Every line has a clear pill-edge start point and
//     a corresponding pill-edge end point (left pill → centre, centre →
//     right pill). Recomputed on resize via ResizeObserver.
//   • Outcomes distributed evenly across the full right-column height
//     using flex space-between, so the right side mirrors the left's
//     spatial density.
//   • Centre mark scaled down from 200×140 to 84×60 — it acts as a
//     connecting node, not the diagram's hero.
//   • Line treatment refined to Superside-tight dotted SVG: stroke 1,
//     dash 1.6/4.6, round linecap, sage→moss-soft colour, low opacity.
//
// Rise v6 tokens only. No Superside palette or class survives.

// ──────────────────────────────────────────────────────────────────────────
// Pill treatments.
// ──────────────────────────────────────────────────────────────────────────
type PillKind = "darkFilled" | "limeFilled" | "ghost" | "sageFilled";

const pillStyles: Record<PillKind, React.CSSProperties> = {
  darkFilled: {
    background: "var(--pine)",
    color: "var(--text-strong)",
    border: "1px solid color-mix(in oklab, var(--moss-soft) 28%, transparent)",
  },
  limeFilled: {
    background: "var(--accent-lime)",
    color: "var(--canvas)",
    border: "1px solid color-mix(in oklab, var(--accent-lime) 70%, var(--canvas))",
  },
  ghost: {
    background: "transparent",
    color: "var(--text-body)",
    border: "1px solid var(--moss-soft)",
  },
  sageFilled: {
    background: "var(--canvas-sage)",
    color: "var(--canvas)",
    border: "1px solid color-mix(in oklab, var(--canvas-sage) 70%, var(--canvas))",
  },
};

// ──────────────────────────────────────────────────────────────────────────
// Brand glyphs.
// ──────────────────────────────────────────────────────────────────────────
function MetaGlyph() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden>
      <defs>
        <linearGradient id="metaG" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0081FB" />
          <stop offset="50%" stopColor="#0064E1" />
          <stop offset="100%" stopColor="#7B45EE" />
        </linearGradient>
      </defs>
      <path
        fill="url(#metaG)"
        d="M12 5.4c-2 0-3.1 1.3-4.2 3.1L6 11.6c-1.4 2.3-2.4 3.1-3.4 3.1-1 0-1.6-.9-1.6-2.5 0-2.4 1.2-5 2.6-5 .8 0 1.5.3 2.3 1.2.3-.3.6-.7 1-1.1C5.8 6.1 4.7 5.4 3.6 5.4 1.4 5.4 0 8.6 0 12.4c0 3.1 1.4 4.7 3.4 4.7 1.5 0 2.6-.7 4.4-3.6l1.4-2.3c.7-1.2 1.4-1.9 2.5-1.9 1.4 0 2.4 1.1 2.4 3.6 0 1.7-.5 2.7-1.4 2.7-.7 0-1.2-.4-1.7-1.1l-.6 1.3c.6.9 1.5 1.6 2.7 1.6 2 0 3.1-1.6 3.1-4.5 0-3.4-1.7-5.5-4.2-5.5z"
      />
    </svg>
  );
}
function GoogleGlyph() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden>
      <path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.55-.2-2.27H12v4.51h6.45c-.28 1.5-1.12 2.78-2.39 3.63v3.02h3.86c2.26-2.08 3.57-5.15 3.57-8.89z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.92l-3.86-3.02c-1.07.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.95H1.29v3.11C3.26 21.3 7.31 24 12 24z" />
      <path fill="#FBBC05" d="M5.27 14.27a7.21 7.21 0 0 1 0-4.54V6.62H1.29a12 12 0 0 0 0 10.76l3.98-3.11z" />
      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.18 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.11C6.22 6.86 8.87 4.75 12 4.75z" />
    </svg>
  );
}
function TikTokGlyph() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden>
      <path fill="#25F4EE" d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.94 2.94 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.1z" />
      <path fill="#FE2C55" d="M17.4 6.69a4.83 4.83 0 0 1-3.77-4.25V2H10.18v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.94 2.94 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05 6.33 6.33 0 0 0-3.56 11.5 6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52V7.54a4.85 4.85 0 0 1-1.84-.85z" />
      <path fill="#FFF" d="M18.4 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.94 2.94 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05 6.33 6.33 0 0 0-3.56 11.5 6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.1z" />
    </svg>
  );
}
function GhlGlyph() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden>
      <circle cx="12" cy="12" r="11" fill="#FFC629" />
      <text x="12" y="15.6" textAnchor="middle" fontFamily="system-ui, -apple-system, Helvetica, Arial, sans-serif" fontWeight="800" fontSize="8" fill="#0E1011">
        GHL
      </text>
    </svg>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Pill component — forwards ref so the parent can measure its bbox.
// ──────────────────────────────────────────────────────────────────────────
type PillProps = {
  kind: PillKind;
  icon?: React.ReactNode;
  label: string;
  size?: "sm" | "md" | "lg";
  innerRef?: (el: HTMLSpanElement | null) => void;
};
function Pill({ kind, icon, label, size = "md", innerRef }: PillProps) {
  const padX = size === "lg" ? 18 : size === "sm" ? 11 : 14;
  const padY = size === "lg" ? 10 : size === "sm" ? 6 : 8;
  const fontSize = size === "lg" ? 14 : size === "sm" ? 12 : 13;
  return (
    <span
      ref={innerRef}
      style={{
        ...pillStyles[kind],
        display: "inline-flex",
        alignItems: "center",
        gap: icon ? 8 : 0,
        padding: `${padY}px ${padX}px`,
        borderRadius: 999,
        fontFamily: "var(--font-sans)",
        fontSize,
        fontWeight: kind === "limeFilled" || kind === "sageFilled" ? 500 : 400,
        letterSpacing: "0.005em",
        lineHeight: 1,
        whiteSpace: "nowrap",
      }}
    >
      {icon && (
        <span aria-hidden style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 18, height: 18 }}>
          {icon}
        </span>
      )}
      {label}
    </span>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Data.
// ──────────────────────────────────────────────────────────────────────────
type Service = { label: string; icon: React.ReactNode; kind: PillKind; size?: "sm" | "md" | "lg" };
const SERVICES: Service[] = [
  { label: "Meta ads",              icon: <MetaGlyph />,   kind: "darkFilled", size: "lg" },
  { label: "Performance creative",  icon: <Sparkles size={15} strokeWidth={1.6} />, kind: "limeFilled" },
  { label: "Google ads",            icon: <GoogleGlyph />, kind: "darkFilled" },
  { label: "Landing pages",         icon: <Layers size={15} strokeWidth={1.6} />, kind: "ghost" },
  { label: "TikTok ads",            icon: <TikTokGlyph />, kind: "darkFilled" },
  { label: "AI cinematics",         icon: <Film size={15} strokeWidth={1.6} />, kind: "sageFilled" },
  { label: "GHL pipelines",         icon: <GhlGlyph />,    kind: "darkFilled" },
  { label: "Lead scoring",          icon: <Target size={15} strokeWidth={1.6} />, kind: "ghost" },
  { label: "SEO content",           icon: <Search size={15} strokeWidth={1.6} />, kind: "ghost" },
  { label: "Campaign development",  icon: <Megaphone size={15} strokeWidth={1.6} />, kind: "darkFilled" },
  { label: "Brand strategy",        icon: <PenLine size={15} strokeWidth={1.6} />, kind: "ghost" },
  { label: "Voice agents",          icon: <Mic size={15} strokeWidth={1.6} />, kind: "sageFilled" },
  { label: "…and more",             icon: null,            kind: "ghost", size: "sm" },
];

type Outcome = { label: string; size: "sm" | "md" | "lg"; emphasis?: boolean };
const OUTCOMES: Outcome[] = [
  { label: "Lead cost",              size: "md" },
  { label: "Cost per lead",          size: "sm" },
  { label: "Lead volume",            size: "lg", emphasis: true },
  { label: "Qualified leads / week", size: "sm" },
  { label: "CAC",                    size: "md" },
  { label: "LTV",                    size: "md" },
  { label: "Conversion rate",        size: "lg" },
  { label: "Pipeline velocity",      size: "md" },
  { label: "Pipeline value",         size: "sm" },
  { label: "Revenue",                size: "lg", emphasis: true },
];

// ──────────────────────────────────────────────────────────────────────────
// Section.
// ──────────────────────────────────────────────────────────────────────────
export default function CapabilityNetwork() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const centreRef    = useRef<HTMLDivElement | null>(null);
  const leftRefs     = useRef<(HTMLSpanElement | null)[]>([]);
  const rightRefs    = useRef<(HTMLSpanElement | null)[]>([]);

  const [paths, setPaths] = useState<{ left: string[]; right: string[]; box: { w: number; h: number } }>({
    left: [],
    right: [],
    box: { w: 0, h: 0 },
  });

  // Compute connector paths from current measured positions. Each path
  // starts at a pill's edge midpoint and ends at the centre mark's edge
  // midpoint. Cubic bezier with horizontal pull control points so the
  // curve flows naturally toward the hub.
  const recompute = useCallback(() => {
    const ctn = containerRef.current;
    const ctr = centreRef.current;
    if (!ctn || !ctr) return;

    const ctnBox = ctn.getBoundingClientRect();
    const ctrBox = ctr.getBoundingClientRect();

    const cLeft   = ctrBox.left   - ctnBox.left;
    const cRight  = ctrBox.right  - ctnBox.left;
    const cMidY   = (ctrBox.top + ctrBox.bottom) / 2 - ctnBox.top;

    const leftPaths: string[] = [];
    for (const el of leftRefs.current) {
      if (!el) continue;
      const b = el.getBoundingClientRect();
      const x1 = b.right - ctnBox.left - 2;             // pull 2px inside the pill edge
      const y1 = (b.top + b.bottom) / 2 - ctnBox.top;
      const x2 = cLeft + 2;                              // 2px inside centre mark
      const y2 = cMidY;
      const cp1x = x1 + Math.max(40, (x2 - x1) * 0.45);
      const cp2x = x2 - Math.max(40, (x2 - x1) * 0.45);
      leftPaths.push(`M ${x1} ${y1} C ${cp1x} ${y1}, ${cp2x} ${y2}, ${x2} ${y2}`);
    }

    const rightPaths: string[] = [];
    for (const el of rightRefs.current) {
      if (!el) continue;
      const b = el.getBoundingClientRect();
      const x2 = b.left  - ctnBox.left + 2;
      const y2 = (b.top + b.bottom) / 2 - ctnBox.top;
      const x1 = cRight - 2;
      const y1 = cMidY;
      const cp1x = x1 + Math.max(40, (x2 - x1) * 0.45);
      const cp2x = x2 - Math.max(40, (x2 - x1) * 0.45);
      rightPaths.push(`M ${x1} ${y1} C ${cp1x} ${y1}, ${cp2x} ${y2}, ${x2} ${y2}`);
    }

    setPaths({ left: leftPaths, right: rightPaths, box: { w: ctnBox.width, h: ctnBox.height } });
  }, []);

  useLayoutEffect(() => {
    recompute();
  }, [recompute]);

  useEffect(() => {
    const ctn = containerRef.current;
    if (!ctn || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => recompute());
    ro.observe(ctn);
    return () => ro.disconnect();
  }, [recompute]);

  // Wire each pill ref into the matching slot of the refs array.
  const leftCb = useMemo(
    () => SERVICES.map((_, i) => (el: HTMLSpanElement | null) => { leftRefs.current[i] = el; }),
    []
  );
  const rightCb = useMemo(
    () => OUTCOMES.map((_, i) => (el: HTMLSpanElement | null) => { rightRefs.current[i] = el; }),
    []
  );

  return (
    <section
      id="what-we-do"
      style={{ background: "var(--canvas)", paddingBlock: "var(--gap-10xl)" }}
    >
      {/* Headline column — standard container width. */}
      <Container>
        <p className="eyebrow mb-6">What we do</p>
        <h2
          className="font-sans text-text-strong text-balance max-w-3xl"
          style={{
            fontSize: "clamp(32px, 4.5vw, 60px)",
            lineHeight: 1.1,
            fontWeight: 400,
            letterSpacing: "-0.01em",
          }}
        >
          Capabilities to <em style={{ color: "var(--sage)" }}>outcomes</em>.{" "}
          Every line is a number we move.
        </h2>
      </Container>

      {/* Diagram — wider wrapper to anchor pills near the section edges. */}
      <div
        ref={containerRef}
        className="relative mt-16 hidden md:block mx-auto"
        style={{ maxWidth: "min(1760px, calc(100vw - 32px))", height: 680 }}
      >
        {/* SVG layer — paths are computed from measured pill positions. */}
        <svg
          width={paths.box.w || "100%"}
          height={paths.box.h || "100%"}
          className="absolute inset-0 pointer-events-none"
          aria-hidden
        >
          <defs>
            <radialGradient id="cnCentreHalo" cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor="var(--sage)" stopOpacity="0.36" />
              <stop offset="40%"  stopColor="var(--moss)" stopOpacity="0.16" />
              <stop offset="100%" stopColor="var(--canvas)" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="cnInnerHalo" cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor="var(--sage)" stopOpacity="0.5" />
              <stop offset="60%"  stopColor="var(--moss)" stopOpacity="0.16" />
              <stop offset="100%" stopColor="var(--canvas)" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Halo behind the centre mark — computed from container box */}
          {paths.box.w > 0 && (
            <>
              <circle cx={paths.box.w / 2} cy={paths.box.h / 2} r={Math.min(260, paths.box.w * 0.16)} fill="url(#cnCentreHalo)" />
              <circle cx={paths.box.w / 2} cy={paths.box.h / 2} r={Math.min(110, paths.box.w * 0.07)} fill="url(#cnInnerHalo)" />
            </>
          )}

          {/* Left connectors */}
          {paths.left.map((d, i) => (
            <path
              key={`L${i}`}
              d={d}
              fill="none"
              stroke="var(--moss-soft)"
              strokeWidth="1"
              strokeLinecap="round"
              strokeDasharray="1.6 4.6"
              strokeOpacity="0.55"
              style={{ animation: `cn-dash 2.4s linear ${i * 0.08}s infinite` }}
            />
          ))}

          {/* Right connectors */}
          {paths.right.map((d, i) => (
            <path
              key={`R${i}`}
              d={d}
              fill="none"
              stroke="var(--sage)"
              strokeWidth="1"
              strokeLinecap="round"
              strokeDasharray="1.6 4.6"
              strokeOpacity="0.55"
              style={{ animation: `cn-dash 2.2s linear ${i * 0.09 + 0.3}s infinite` }}
            />
          ))}
        </svg>

        {/* Pill grid — three columns with centre fixed. The left column is
            flex-wrap (organic shape, varied widths). The right column is
            a flex column with space-between so outcomes spread evenly
            top-to-bottom across the full container height. */}
        <div
          className="relative grid h-full"
          style={{
            gridTemplateColumns: "minmax(380px, 1fr) minmax(140px, 200px) minmax(320px, 1fr)",
            gap: 32,
            paddingInline: 16,
            alignItems: "stretch",
          }}
        >
          {/* LEFT */}
          <div
            className="flex flex-wrap content-center"
            style={{
              gap: "12px 10px",
              justifyContent: "flex-end",
              paddingRight: 12,
            }}
          >
            {SERVICES.map((s, i) => (
              <Pill key={s.label} {...s} innerRef={leftCb[i]} />
            ))}
          </div>

          {/* CENTRE — small node, no border / no card chrome. */}
          <div className="flex items-center justify-center">
            <div ref={centreRef} className="relative" style={{ width: 96, height: 68 }}>
              <Image
                src="/brand/logo-mark-on-dark.png"
                alt=""
                fill
                priority
                sizes="96px"
                className="object-contain"
                style={{
                  filter:
                    "drop-shadow(0 6px 22px color-mix(in oklab, var(--sage) 30%, transparent))",
                }}
              />
            </div>
          </div>

          {/* RIGHT — evenly distributed top-to-bottom, fanned outward
              horizontally so the column mirrors the left's organic spread.
              Pills closest to the vertical middle stay near the centre
              mark; pills further from middle reach toward the section's
              right edge. Connectors update automatically because the
              measured-path effect re-runs when any pill moves. */}
          <div
            className="flex flex-col h-full"
            style={{
              alignItems: "stretch",
              justifyContent: "space-between",
              paddingLeft: 12,
              paddingBlock: 8,
            }}
          >
            {OUTCOMES.map((o, i) => {
              const mid = (OUTCOMES.length - 1) / 2;
              // Normalised 0..1 distance from the vertical middle.
              const t = Math.abs(i - mid) / mid;
              // Light easing so the fan opens earlier — a pow < 1 curve.
              const eased = Math.pow(t, 0.75);
              // Cap the fan width; the connector layer follows the pills.
              // Rounded so server + client render an identical px value
              // (avoids React hydration mismatch on float precision).
              const offset = Math.round(eased * 260);
              return (
                <div
                  key={o.label}
                  className="flex"
                  style={{
                    paddingLeft: `${offset}px`,
                    transition: "padding-left 0.4s ease",
                  }}
                >
                  <Pill
                    kind={o.emphasis ? "sageFilled" : "ghost"}
                    label={o.label}
                    size={o.size}
                    innerRef={rightCb[i]}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile fallback */}
      <Container>
        <div className="mt-12 md:hidden">
          <p className="eyebrow mb-4" style={{ color: "var(--text-muted)" }}>Capabilities</p>
          <div className="flex flex-wrap" style={{ gap: 8 }}>
            {SERVICES.map((s) => (
              <Pill key={s.label} {...s} />
            ))}
          </div>

          <p className="eyebrow mt-10 mb-4" style={{ color: "var(--sage)" }}>Outcomes we move</p>
          <div className="flex flex-wrap" style={{ gap: 8 }}>
            {OUTCOMES.map((o) => (
              <Pill
                key={o.label}
                kind={o.emphasis ? "sageFilled" : "ghost"}
                label={o.label}
                size={o.size}
              />
            ))}
          </div>
        </div>
      </Container>

      <style>{`
        @keyframes cn-dash {
          to { stroke-dashoffset: -18; }
        }
        @media (prefers-reduced-motion: reduce) {
          svg path { animation: none !important; }
        }
      `}</style>
    </section>
  );
}

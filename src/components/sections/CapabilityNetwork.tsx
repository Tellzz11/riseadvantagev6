import Container from "./_Container";

// CapabilityNetwork — replaces the WhatWeDo card grid with a "systems
// not cards" diagram (audit SUPERSIDE-AUDIT §1.4). Left: capability
// tags. Centre: Rise node anchored by a slow radial glow. Right:
// outcome metrics. Connectors are SVG cubic Béziers with animated
// stroke-dashoffset for flowing-data effect.
//
// All implementation is fresh Rise — BD-005 palette (deep teal +
// off-white + sage), Rise capability/outcome content, custom curve
// geometry. Pattern is the reference; nothing copied.

const CAPABILITIES: string[] = [
  "Meta ads",
  "Google ads",
  "TikTok ads",
  "Landing pages",
  "SEO content",
  "GHL pipelines",
  "Lead scoring",
  "Voice agents",
  "AI cinematics",
  "Brand strategy",
];

const OUTCOMES: string[] = [
  "Lead cost",
  "Lead volume",
  "CAC",
  "LTV",
  "Conversion rate",
  "Pipeline velocity",
];

// Layout constants for the SVG composition.
const VIEW_W = 1200;
const VIEW_H = 720;
const CENTRE_X = 600;
const CENTRE_Y = 360;
const CENTRE_HALF = 48; // half-side of centre badge
const TAG_W = 160;
const TAG_H = 38;
const OUTCOME_W = 144;
const OUTCOME_H = 38;
const LEFT_X = 60;
const RIGHT_X = VIEW_W - 60 - OUTCOME_W;

// Compute y positions evenly across the column with a small horizontal
// jitter so the column doesn't look mechanically straight.
function positions(count: number, top: number, bottom: number, jitterPx = 18) {
  const step = (bottom - top) / Math.max(count - 1, 1);
  return Array.from({ length: count }, (_, i) => ({
    y: top + step * i,
    dx: i % 2 === 0 ? -jitterPx : jitterPx,
  }));
}

const LEFT_POS = positions(CAPABILITIES.length, 40, 660, 20);
const RIGHT_POS = positions(OUTCOMES.length, 90, 600, 14);

// Build a cubic-Bezier path from a source (right edge of tag) to centre
// (left edge of centre badge). Same logic mirrored for centre → outcome.
function pathLeft(srcX: number, srcY: number) {
  const tgtX = CENTRE_X - CENTRE_HALF;
  const tgtY = CENTRE_Y;
  const midX = (srcX + tgtX) / 2;
  return `M ${srcX} ${srcY} C ${midX} ${srcY}, ${midX} ${tgtY}, ${tgtX} ${tgtY}`;
}
function pathRight(tgtX: number, tgtY: number) {
  const srcX = CENTRE_X + CENTRE_HALF;
  const srcY = CENTRE_Y;
  const midX = (srcX + tgtX) / 2;
  return `M ${srcX} ${srcY} C ${midX} ${srcY}, ${midX} ${tgtY}, ${tgtX} ${tgtY}`;
}

export default function CapabilityNetwork() {
  return (
    <section
      id="what-we-do"
      className="bg-canvas"
      style={{ paddingBlock: "var(--gap-10xl)" }}
    >
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

        {/* Desktop: full SVG diagram */}
        <div className="mt-16 hidden md:block">
          <svg
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            preserveAspectRatio="xMidYMid meet"
            className="w-full h-auto"
            aria-hidden
          >
            <defs>
              {/* Conic-gradient glow approximation via SVG radial+linear */}
              <radialGradient id="centreGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="var(--sage)" stopOpacity="0.42" />
                <stop offset="40%" stopColor="var(--moss)" stopOpacity="0.18" />
                <stop offset="100%" stopColor="var(--canvas)" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="rayBeam" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="var(--sage)" stopOpacity="0" />
                <stop offset="50%" stopColor="var(--sage)" stopOpacity="0.32" />
                <stop offset="100%" stopColor="var(--sage)" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Radial glow halo behind centre — the diagram's anchor */}
            <g transform={`translate(${CENTRE_X} ${CENTRE_Y})`}>
              <circle r="260" fill="url(#centreGlow)" />
              {/* Rotating ray beams as a subtle behind-centre accent.
                  Six beams, mask-faded at edges via opacity gradient.
                  Animated via CSS keyframes on the parent <g>. */}
              <g className="ra-rays">
                {[0, 60, 120, 180, 240, 300].map((deg) => (
                  <rect
                    key={deg}
                    x="-300"
                    y="-30"
                    width="600"
                    height="60"
                    fill="url(#rayBeam)"
                    opacity="0.55"
                    transform={`rotate(${deg})`}
                  />
                ))}
              </g>
            </g>

            {/* Connectors — left tags → centre */}
            <g className="ra-connectors">
              {LEFT_POS.map((p, i) => {
                const srcX = LEFT_X + TAG_W + p.dx;
                const srcY = p.y + TAG_H / 2;
                return (
                  <path
                    key={`L${i}`}
                    d={pathLeft(srcX, srcY)}
                    fill="none"
                    stroke="var(--sage)"
                    strokeWidth="1"
                    strokeDasharray="3 8"
                    style={{
                      animation: `ra-dash 1.6s linear ${i * 0.12}s infinite`,
                    }}
                    opacity="0.7"
                  />
                );
              })}
              {RIGHT_POS.map((p, i) => {
                const tgtX = RIGHT_X + p.dx;
                const tgtY = p.y + OUTCOME_H / 2;
                return (
                  <path
                    key={`R${i}`}
                    d={pathRight(tgtX, tgtY)}
                    fill="none"
                    stroke="var(--sage)"
                    strokeWidth="1"
                    strokeDasharray="3 8"
                    style={{
                      animation: `ra-dash 1.4s linear ${i * 0.18 + 0.4}s infinite`,
                    }}
                    opacity="0.75"
                  />
                );
              })}
            </g>

            {/* Left column — capability tags */}
            <g className="ra-tags">
              {CAPABILITIES.map((label, i) => {
                const p = LEFT_POS[i];
                const x = LEFT_X + p.dx;
                return (
                  <g key={label} transform={`translate(${x} ${p.y})`}>
                    <rect
                      width={TAG_W}
                      height={TAG_H}
                      rx={TAG_H / 2}
                      fill="var(--pine)"
                      stroke="var(--moss-soft)"
                      strokeOpacity="0.45"
                    />
                    <text
                      x={TAG_W / 2}
                      y={TAG_H / 2 + 4.5}
                      textAnchor="middle"
                      fill="var(--text-strong)"
                      style={{ fontFamily: "var(--font-sans)", fontSize: 13 }}
                    >
                      {label}
                    </text>
                  </g>
                );
              })}
            </g>

            {/* Right column — outcome bubbles (slightly more circular feel) */}
            <g className="ra-outcomes">
              {OUTCOMES.map((label, i) => {
                const p = RIGHT_POS[i];
                const x = RIGHT_X + p.dx;
                return (
                  <g key={label} transform={`translate(${x} ${p.y})`}>
                    <rect
                      width={OUTCOME_W}
                      height={OUTCOME_H}
                      rx={OUTCOME_H / 2}
                      fill="var(--canvas-soft)"
                      stroke="var(--sage)"
                      strokeOpacity="0.6"
                    />
                    <text
                      x={OUTCOME_W / 2}
                      y={OUTCOME_H / 2 + 4.5}
                      textAnchor="middle"
                      fill="var(--sage)"
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: 13,
                        letterSpacing: "0.05em",
                      }}
                    >
                      {label}
                    </text>
                  </g>
                );
              })}
            </g>

            {/* Centre node — Rise */}
            <g transform={`translate(${CENTRE_X - CENTRE_HALF} ${CENTRE_Y - CENTRE_HALF})`}>
              <rect
                width={CENTRE_HALF * 2}
                height={CENTRE_HALF * 2}
                rx="20"
                fill="var(--canvas-deep)"
                stroke="var(--sage)"
                strokeOpacity="0.7"
              />
              <text
                x={CENTRE_HALF}
                y={CENTRE_HALF + 8}
                textAnchor="middle"
                fill="var(--accent)"
                style={{
                  fontFamily: "var(--font-display)",
                  fontStyle: "italic",
                  fontSize: 42,
                  fontWeight: 400,
                }}
              >
                R
              </text>
            </g>
          </svg>
        </div>

        {/* Mobile fallback: simple 2-column flat list, no SVG */}
        <div className="mt-12 grid grid-cols-2 gap-px md:hidden" style={{ background: "var(--border-default)" }}>
          <div className="bg-canvas p-6">
            <p className="eyebrow mb-4">Capabilities</p>
            <ul className="space-y-2">
              {CAPABILITIES.map((c) => (
                <li key={c} className="text-text-strong text-sm">{c}</li>
              ))}
            </ul>
          </div>
          <div className="bg-canvas-soft p-6">
            <p className="eyebrow mb-4" style={{ color: "var(--sage)" }}>Outcomes</p>
            <ul className="space-y-2">
              {OUTCOMES.map((o) => (
                <li key={o} className="text-sm" style={{ color: "var(--sage)" }}>{o}</li>
              ))}
            </ul>
          </div>
        </div>
      </Container>

      {/* Local keyframes scoped to this section via a style tag. Keeping it
          inline so we don't pollute globals.css with one-off animations. */}
      <style>{`
        @keyframes ra-dash {
          to { stroke-dashoffset: -11; }
        }
        @keyframes ra-rays-rotate {
          to { transform: rotate(360deg); }
        }
        .ra-rays {
          transform-origin: center;
          animation: ra-rays-rotate 90s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .ra-connectors path { animation: none !important; }
          .ra-rays { animation: none !important; }
        }
      `}</style>
    </section>
  );
}

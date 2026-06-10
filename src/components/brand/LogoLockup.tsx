import Image from "next/image";

// LogoLockup — unified Rise Advantage brand mark.
//
// Composition: brushstroke chart-arrow mark sits left of a single-word
// wordmark "RiseAdvantage" where "Rise" is set in Fraunces italic and
// "Advantage" in Space Grotesk regular. Optical alignment is tuned so
// the two type styles share a baseline and read as one designed unit.
//
// Two surface variants:
//   - "on-dark"  : mark + type in --text-strong (#F0F3E8)   (nav, footer on canvas)
//   - "on-light" : mark + type in --canvas (#0A211F)        (cream surfaces)
//
// The mark file already carries the correct fill colour — no further
// tinting needed at runtime. Type colour is set via inline style so it
// always sits next to the mark on whatever background is in use.

type Variant = "on-dark" | "on-light";

interface LogoLockupProps {
  variant?: Variant;
  /** Mark height in px. Wordmark scales optically relative to this. */
  size?: number;
  className?: string;
  /** Accessible label. Default reads as a wordmark. */
  ariaLabel?: string;
}

export default function LogoLockup({
  variant = "on-dark",
  size = 28,
  className,
  ariaLabel = "Rise Advantage",
}: LogoLockupProps) {
  const color = variant === "on-dark" ? "var(--text-strong)" : "var(--canvas)";
  const markSrc =
    variant === "on-dark"
      ? "/brand/logo-mark-on-dark.png"
      : "/brand/logo-mark-on-light.png";

  // Mark intrinsic aspect — measured from the cropped PNG (760×527 ≈ 1.442:1)
  const markAspect = 760 / 527;
  const markW = Math.round(size * markAspect);

  // Type sizes — Fraunces sits slightly larger than Space Grotesk so the
  // italic doesn't appear visually shorter than the upright. Numbers
  // calibrated for 28px mark; scales proportionally with size.
  const typeUnit = size;
  const riseSize = typeUnit * 1.08;
  const advantageSize = typeUnit * 0.92;

  return (
    <span
      className={["inline-flex items-center", className ?? ""].join(" ").trim()}
      aria-label={ariaLabel}
      role="img"
      style={{
        // Mark-to-type gap — tight enough to read as one unit, not crowded.
        gap: `${Math.round(size * 0.34)}px`,
        color,
      }}
    >
      <Image
        src={markSrc}
        alt=""
        width={markW}
        height={size}
        priority
        style={{
          width: `${markW}px`,
          height: `${size}px`,
          display: "block",
          // Optical lift so the mark's visual centre aligns with the type
          // baseline (the arrowhead pulls the mass upward).
          transform: "translateY(-3%)",
        }}
      />
      <span
        style={{
          display: "inline-flex",
          alignItems: "baseline",
          // Negative letter-spacing on the join makes Rise+Advantage read
          // as one word rather than two adjacent ones.
          letterSpacing: "-0.01em",
          lineHeight: 1,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-fraunces), Georgia, serif",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: `${riseSize}px`,
            lineHeight: 1,
            // Pull the italic's right edge inward to kiss the upright "A".
            marginRight: "-0.04em",
            color,
          }}
        >
          Rise
        </span>
        <span
          style={{
            fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
            fontWeight: 400,
            fontSize: `${advantageSize}px`,
            lineHeight: 1,
            color,
            // Slight optical kerning so "Advantage" starts where the
            // italic terminal of "e" lands, not where its box ends.
            letterSpacing: "-0.005em",
          }}
        >
          Advantage
        </span>
      </span>
    </span>
  );
}

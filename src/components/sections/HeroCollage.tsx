import Image from "next/image";
import Container from "./_Container";
import VoiceAgentCard from "./VoiceAgentCard";

// HeroCollage — Cinema / "The work" grid. Pre-text MacBook composites are
// used for the real-work tiles so all card copy renders as live HTML over
// a dark gradient fade — never baked into the image. Workflow lives in
// the "What you take with you" section now; the right column here is the
// phone tile + the iPad CRM tile.
//
// Layout:
//   Row 1: [ H&O landing (cs:7 rs:2)  | Phone meta ad   (cs:5) ]
//                                     | iPad CRM        (cs:5)
//   Row 2: [ Laptop landing  (cs:12) ]

type CardKind = "realWork" | "render";

interface Tile {
  src: string;
  alt: string;
  eyebrow: string;
  caption: string;
  span: string;
  priority?: boolean;
  fit: "cover" | "contain";
  kind: CardKind;
}

const TILES_TOP: Tile[] = [
  {
    src: "/images/real-work/hando-landing-mb.png",
    alt: "MacBook on a transparent background showing the H&O Gardening landing page — built and shipped by Rise Advantage.",
    eyebrow: "H&O GARDENING · LONDON",
    caption: "A site built to convert. Theirs to keep.",
    span: "md:col-span-7 md:row-span-2",
    priority: true,
    fit: "contain",
    kind: "realWork",
  },
  {
    src: "/images/collage/tile-1-meta-ad.png",
    alt: "Phone on a deep teal linen surface showing a real H&O Gardening before-and-after Meta ad creative.",
    eyebrow: "META · GOOGLE · TIKTOK",
    caption: "Brand-led performance creative.",
    span: "md:col-span-5",
    fit: "cover",
    kind: "render",
  },
  {
    src: "/images/collage/tile-3-ipad-crm.png",
    alt: "iPad on velvet surface showing a clean off-white CRM pipeline visualisation.",
    eyebrow: "GHL · PIPELINES",
    caption: "Lifecycle pipelines built to read.",
    span: "md:col-span-5",
    fit: "cover",
    kind: "render",
  },
];

export default function HeroCollage() {
  return (
    <section
      id="work-collage"
      style={{ background: "var(--canvas-light)", paddingBlock: "var(--gap-10xl)" }}
    >
      <Container>
        <div className="flex items-end justify-between mb-12">
          <div>
            <p
              className="eyebrow mb-6"
              style={{ color: "var(--text-on-light-muted)" }}
            >
              The work
            </p>
            <h2
              className="font-sans text-balance max-w-3xl"
              style={{
                fontSize: "clamp(32px, 4.5vw, 60px)",
                lineHeight: 1.1,
                fontWeight: 400,
                letterSpacing: "-0.01em",
                color: "var(--text-on-light)",
              }}
            >
              Cinema for the part of marketing nobody sees. <em>Until they do.</em>
            </h2>
          </div>
        </div>

        {/* Row 1 — bento. Row height calibrated so 1.5:1 MacBook composites
            sit with breathing room on the canvas-deep card surface. */}
        <div className="grid gap-6 md:grid-cols-12 md:auto-rows-[320px]">
          {TILES_TOP.map((t) => (
            <TileCard key={t.src} {...t} />
          ))}
        </div>

        {/* Row 2 — voice-agent transcript card (replaces the old wide
            "Sites that convert" laptop tile per v3 brief). */}
        <div className="mt-6">
          <VoiceAgentCard />
        </div>
      </Container>
    </section>
  );
}

function TileCard({
  src,
  alt,
  eyebrow,
  caption,
  span,
  wide,
  priority,
  fit,
}: Tile & { wide?: boolean }) {
  return (
    <figure
      className={[
        "group relative overflow-hidden rounded-2xl border border-border bg-canvas-deep",
        "transition-transform duration-500 ease-out hover:-translate-y-1",
        // Mobile sizing fix: non-wide tiles only carry md: span classes,
        // which collapse to 0 height on small screens. Force a sensible
        // mobile aspect so all cards render as single-column stack.
        wide
          ? "w-full aspect-[16/6] md:aspect-[21/6]"
          : `w-full aspect-[3/2] md:aspect-auto ${span}`,
      ]
        .join(" ")
        .trim()}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={wide ? "100vw" : "(min-width: 1024px) 50vw, 100vw"}
        className={[
          fit === "contain" ? "object-contain" : "object-cover",
          "transition-transform duration-[1.4s] ease-out group-hover:scale-[1.03]",
        ].join(" ")}
        priority={priority}
      />

      {/* Bottom gradient fade — strong enough to seat live text over any
          underlying composition. Keeps the upper 50% of the asset fully
          visible. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, color-mix(in oklab, var(--canvas-deep) 30%, transparent) 35%, color-mix(in oklab, var(--canvas-deep) 88%, transparent) 100%)",
        }}
      />

      <figcaption className="absolute inset-x-0 bottom-0 p-6 md:p-7">
        <p
          className="eyebrow"
          style={{
            color: "var(--text-strong)",
            opacity: 0.78,
            fontFamily: "var(--font-mono), ui-monospace, monospace",
            letterSpacing: "0.18em",
          }}
        >
          {eyebrow}
        </p>
        <p
          className="mt-2 text-balance max-w-md"
          style={{
            color: "var(--text-strong)",
            fontFamily: "var(--font-space-grotesk), var(--font-sans), system-ui, sans-serif",
            fontSize: "clamp(15px, 1.2vw, 18px)",
            lineHeight: 1.4,
          }}
        >
          {caption}
        </p>
      </figcaption>
    </figure>
  );
}

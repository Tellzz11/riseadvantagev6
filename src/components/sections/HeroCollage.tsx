import Image from "next/image";
import Container from "./_Container";

// HeroCollage — bento grid of the AI-generated tiles. Mixed-ratio per
// CARRY-OVER §2. Layout:
//   Row 1: [ Agent Flow (cs:7 rs:2) | Phone (cs:5) ]
//                                   | iPad (cs:5)
//   Row 2: [ Laptop landing page (cs:12) ]
// Audit ref: SUPERSIDE-AUDIT §1.4 (read as systems, not card grids).

const TILES_TOP = [
  {
    src: "/images/collage/tile-4-agent-flow.png",
    alt: "Abstract data sculpture in architectural gallery — luminous off-white filaments suspended in deep teal-green space.",
    label: "Agent-augmented production",
    caption: "We build the systems that compound. AI does the multiplying — humans set the brief.",
    span: "md:col-span-7 md:row-span-2",
    priority: true,
  },
  {
    src: "/images/collage/tile-1-meta-ad.png",
    alt: "Phone showing a branded gardening-company Instagram ad on a deep teal linen surface.",
    label: "Meta · Google · TikTok",
    caption: "Brand-led performance creative.",
    span: "md:col-span-5",
    priority: false,
  },
  {
    src: "/images/collage/tile-3-ipad-crm.png",
    alt: "iPad on velvet surface showing a clean off-white CRM pipeline visualisation.",
    label: "GHL · automation",
    caption: "Lifecycle pipelines built to read.",
    span: "md:col-span-5",
    priority: false,
  },
];

const TILE_WIDE = {
  src: "/images/collage/tile-2-laptop-web.png",
  alt: "Silver laptop on deep teal surface showing a minimalist off-white landing page.",
  label: "Sites that convert",
  caption: "Next.js + Vercel marketing sites and landing pages — performance budgets met, no Webflow drag-and-drop.",
};

export default function HeroCollage() {
  return (
    <section
      id="work-collage"
      className="bg-canvas-soft"
      style={{ paddingBlock: "var(--gap-10xl)" }}
    >
      <Container>
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="eyebrow text-text-muted mb-6">The work</p>
            <h2
              className="font-sans text-text-strong text-balance max-w-3xl"
              style={{ fontSize: "clamp(32px, 4.5vw, 60px)", lineHeight: 1.1, fontWeight: 400, letterSpacing: "-0.01em" }}
            >
              Cinema for the part of marketing nobody sees. <em>Until they do.</em>
            </h2>
          </div>
        </div>

        {/* Row 1 — bento */}
        <div className="grid gap-6 md:grid-cols-12 md:auto-rows-[280px]">
          {TILES_TOP.map((t) => (
            <Tile key={t.src} {...t} />
          ))}
        </div>

        {/* Row 2 — wide */}
        <div className="mt-6">
          <Tile
            src={TILE_WIDE.src}
            alt={TILE_WIDE.alt}
            label={TILE_WIDE.label}
            caption={TILE_WIDE.caption}
            wide
          />
        </div>
      </Container>
    </section>
  );
}

function Tile({
  src,
  alt,
  label,
  caption,
  span,
  wide,
  priority,
}: {
  src: string;
  alt: string;
  label: string;
  caption: string;
  span?: string;
  wide?: boolean;
  priority?: boolean;
}) {
  return (
    <figure
      className={[
        "group relative overflow-hidden rounded-2xl border border-border bg-canvas",
        "transition-transform duration-500 ease-out hover:-translate-y-1",
        wide ? "w-full aspect-[16/6] md:aspect-[21/6]" : span ?? "",
      ].join(" ").trim()}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={wide ? "100vw" : "(min-width: 1024px) 50vw, 100vw"}
        className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.05]"
        priority={priority}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, transparent 55%, color-mix(in oklab, var(--canvas-deep) 80%, transparent) 100%)",
        }}
      />
      <figcaption className="absolute inset-x-0 bottom-0 p-6 md:p-7">
        <p className="eyebrow text-text-muted">{label}</p>
        <p className="mt-2 text-text-strong text-balance max-w-md" style={{ fontSize: "clamp(15px, 1.2vw, 18px)", lineHeight: 1.4 }}>
          {caption}
        </p>
      </figcaption>
    </figure>
  );
}

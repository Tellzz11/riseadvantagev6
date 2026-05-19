import Image from "next/image";
import Container from "./_Container";

// HeroCollage — bento grid of the four AI-generated tiles. Sits beneath
// the Hero section. Asymmetric mixed-ratio per CARRY-OVER §2 ("3rd answer:
// tile + bento + mixed ratios"). Audit ref: SUPERSIDE-AUDIT §1.4 (read
// as systems, not card grids — strokes via order + scale, not borders).

const TILES = [
  {
    src: "/images/collage/tile-4-agent-flow.png",
    alt: "Abstract data sculpture in architectural gallery — luminous off-white filaments suspended in deep teal-green space.",
    label: "Agent-augmented production",
    caption: "We build the systems that compound. AI does the multiplying — humans set the brief.",
    aspect: "aspect-[4/5]",
    span: "md:col-span-7 md:row-span-2",
  },
  {
    src: "/images/collage/tile-1-meta-ad.png",
    alt: "Phone showing a branded gardening-company Instagram ad on a deep teal linen surface.",
    label: "Meta · Google · TikTok",
    caption: "Brand-led performance creative.",
    aspect: "aspect-square",
    span: "md:col-span-5",
  },
  {
    src: "/images/collage/tile-3-ipad-crm.png",
    alt: "iPad on velvet surface showing a clean off-white CRM pipeline visualisation.",
    label: "GHL · automation",
    caption: "Lifecycle pipelines built to read.",
    aspect: "aspect-square",
    span: "md:col-span-5",
  },
];

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

        <div className="grid gap-6 md:grid-cols-12 md:auto-rows-[280px]">
          {TILES.map((t) => (
            <figure
              key={t.src}
              className={[
                "relative overflow-hidden rounded-2xl border border-border bg-canvas",
                t.span,
              ].join(" ")}
            >
              <Image
                src={t.src}
                alt={t.alt}
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover"
                priority={t.label === "Agent-augmented production"}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 60%, color-mix(in oklab, var(--canvas-deep) 75%, transparent) 100%)",
                }}
              />
              <figcaption className="absolute inset-x-0 bottom-0 p-6 md:p-7">
                <p className="eyebrow text-text-muted">{t.label}</p>
                <p className="mt-2 text-text-strong text-balance" style={{ fontSize: "clamp(15px, 1.2vw, 18px)", lineHeight: 1.4 }}>
                  {t.caption}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}

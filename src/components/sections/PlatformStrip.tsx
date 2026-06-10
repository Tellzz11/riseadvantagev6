import Container from "./_Container";

// PlatformStrip — flipped to CREAM (2026-05-19) to break the Hero-dark →
// strip-dark adjacency Theo flagged. Logos render as native black SVG on
// cream (no invert filter), with eyebrow in text-on-light-muted.

const PLATFORMS: { name: string; svg: string; height?: number }[] = [
  { name: "Meta", svg: "/partners/meta.svg" },
  { name: "Google Ads", svg: "/partners/googleads.svg" },
  { name: "GoHighLevel", svg: "/partners/gohighlevel.svg" },
  { name: "Stripe", svg: "/partners/stripe.svg" },
  { name: "Vercel", svg: "/partners/vercel.svg" },
  { name: "Anthropic", svg: "/partners/anthropic.svg" },
];

export default function PlatformStrip() {
  return (
    <section
      style={{ background: "var(--canvas-light)", paddingBlock: "var(--gap-6xl)" }}
    >
      <Container>
        <p
          className="eyebrow text-center mb-10"
          style={{ color: "var(--text-on-light-muted)" }}
        >
          Built on
        </p>

        <ul className="flex flex-wrap items-center justify-center gap-x-14 gap-y-8">
          {PLATFORMS.map((p) => (
            <li key={p.name} className="flex items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.svg}
                alt={p.name}
                style={{
                  height: `${p.height ?? 22}px`,
                  width: "auto",
                  filter: "brightness(0.18)",
                  opacity: 0.7,
                  transition: "opacity 0.2s ease",
                }}
                className="hover:!opacity-100"
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

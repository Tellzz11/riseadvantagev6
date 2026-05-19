import Container from "./_Container";

// PlatformStrip — a thin strip listing the actual platforms the work runs
// on. Sits just under the Hero (above LogoMarquee) to anchor credibility
// before scrolling. Real platform marks from Simple Icons (CC0 — public
// domain). Logos are black SVGs by default — we render with CSS
// `filter: invert` so they pick up the off-white muted tone.

const PLATFORMS: { name: string; svg: string; height?: number }[] = [
  { name: "Meta", svg: "/partners/meta.svg" },
  { name: "Google Ads", svg: "/partners/googleads.svg" },
  { name: "GoHighLevel", svg: "/partners/gohighlevel.svg", height: 18 },
  { name: "Stripe", svg: "/partners/stripe.svg" },
  { name: "Vercel", svg: "/partners/vercel.svg" },
  { name: "Anthropic", svg: "/partners/anthropic.svg" },
];

export default function PlatformStrip() {
  return (
    <section className="bg-canvas" style={{ paddingBlock: "var(--gap-6xl)" }}>
      <Container>
        <p className="eyebrow text-text-muted text-center mb-10">Built on</p>

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
                  // Simple Icons ship black SVGs — invert to off-white + soften
                  filter: "invert(1) brightness(0.88) sepia(0) saturate(0)",
                  opacity: 0.72,
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

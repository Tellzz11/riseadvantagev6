import Container from "./_Container";

// PlatformStrip — a thin strip listing the actual platforms the work runs
// on. Sits just under the Hero (above LogoMarquee) to anchor credibility
// before scrolling. Real platform marks from Simple Icons (CC0 — public
// domain). Logos render at currentColor so they pick up the off-white
// muted tone of the surrounding text.

const PLATFORMS: { name: string; svg: string }[] = [
  { name: "Meta", svg: "/partners/meta.svg" },
  { name: "Google Ads", svg: "/partners/googleads.svg" },
  { name: "GoHighLevel", svg: "/partners/gohighlevel.svg" },
  { name: "Stripe", svg: "/partners/stripe.svg" },
  { name: "Vercel", svg: "/partners/vercel.svg" },
  { name: "Anthropic", svg: "/partners/anthropic.svg" },
];

export default function PlatformStrip() {
  return (
    <section className="bg-canvas" style={{ paddingBlock: "var(--gap-6xl)" }}>
      <Container>
        <p className="eyebrow text-text-muted text-center mb-8">Built on</p>

        <ul className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-70 hover:opacity-100 transition-opacity">
          {PLATFORMS.map((p) => (
            <li key={p.name} className="flex items-center text-text-muted" aria-label={p.name}>
              {/* Inline SVG so it picks up currentColor */}
              <object
                data={p.svg}
                type="image/svg+xml"
                className="h-6 w-auto pointer-events-none"
                aria-hidden
              />
              <span className="sr-only">{p.name}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

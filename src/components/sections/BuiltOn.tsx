import Container from "./_Container";

// BuiltOn — renamed from CertifiedPartners (2026-06-10 audit). Rise holds
// NO platform certifications, so the section claims only what is true:
// these are the platforms we build and run client work on. Meta + GHL +
// Google ONLY per CARRY-OVER §2 + §6 Q4. Real Simple Icons SVG marks
// (CC0 public domain), darkened via CSS filter to sit on cream.
// NB: PlatformStrip (under the hero) carries the "Built on" eyebrow for
// the wider tooling strip — copy here is kept distinct so the page
// doesn't say "built on" twice.

const PLATFORMS: { name: string; note: string; logo: string; logoHeight: number }[] = [
  { name: "Meta", note: "Facebook + Instagram ads", logo: "/partners/meta.svg", logoHeight: 36 },
  { name: "GoHighLevel", note: "Pipelines + automations", logo: "/partners/gohighlevel.svg", logoHeight: 24 },
  { name: "Google Ads", note: "Search + PMax + YouTube", logo: "/partners/googleads.svg", logoHeight: 36 },
];

export default function BuiltOn() {
  return (
    <section
      style={{ background: "var(--canvas-light)", paddingBlock: "var(--gap-9xl)" }}
    >
      <Container>
        <p
          className="eyebrow mb-4 text-center"
          style={{ color: "var(--text-on-light-muted)" }}
        >
          The stack we run on
        </p>
        <p
          className="mb-12 text-center mx-auto max-w-md"
          style={{ color: "var(--text-on-light)", fontSize: "clamp(18px, 1.5vw, 22px)", lineHeight: 1.35 }}
        >
          The platforms client work runs on, daily.
        </p>
        <ul
          className="grid grid-cols-1 md:grid-cols-3 max-w-4xl mx-auto gap-px rounded-2xl overflow-hidden"
          style={{ background: "rgba(10,33,31,0.1)" }}
        >
          {PLATFORMS.map((p) => (
            <li
              key={p.name}
              className="p-10 flex flex-col items-center text-center"
              style={{ background: "var(--canvas-light-soft)" }}
            >
              <div
                className="flex items-center justify-center mb-6"
                style={{ height: "44px" }}
                aria-hidden
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.logo}
                  alt=""
                  style={{
                    height: `${p.logoHeight}px`,
                    width: "auto",
                    filter: "brightness(0.18)",
                  }}
                />
              </div>
              <p
                className="font-sans"
                style={{
                  fontSize: "clamp(16px, 1.2vw, 18px)",
                  lineHeight: 1.3,
                  color: "var(--text-on-light)",
                }}
              >
                {p.name}
              </p>
              <p
                className="mt-2 text-xs uppercase tracking-[0.15em]"
                style={{ color: "var(--text-on-light-muted)" }}
              >
                {p.note}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

import Container from "./_Container";

// CertifiedPartners — locked v3 carry-over. Per CARRY-OVER §2 + §6 Q4:
// Meta + GHL + Google ONLY. Real Simple Icons SVG marks (CC0 public
// domain). SVGs are black by default — inverted via CSS to match off-white.

const PARTNERS: { name: string; note: string; logo: string; logoHeight: number }[] = [
  { name: "Meta Business Partner", note: "Facebook + Instagram", logo: "/partners/meta.svg", logoHeight: 36 },
  { name: "GoHighLevel Certified", note: "GHL Pipelines + Automations", logo: "/partners/gohighlevel.svg", logoHeight: 24 },
  { name: "Google Ads Partner", note: "Search + PMax + YouTube", logo: "/partners/googleads.svg", logoHeight: 36 },
];

export default function CertifiedPartners() {
  return (
    <section className="bg-canvas-soft" style={{ paddingBlock: "var(--gap-9xl)" }}>
      <Container>
        <p className="eyebrow text-text-muted mb-12 text-center">Certified across</p>
        <ul className="grid grid-cols-1 md:grid-cols-3 max-w-4xl mx-auto gap-px bg-border rounded-2xl overflow-hidden">
          {PARTNERS.map((p) => (
            <li
              key={p.name}
              className="bg-canvas-soft p-10 flex flex-col items-center text-center"
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
                    filter: "invert(1) brightness(0.95) sepia(0) saturate(0)",
                  }}
                />
              </div>
              <p className="font-sans text-text-strong" style={{ fontSize: "clamp(16px, 1.2vw, 18px)", lineHeight: 1.3 }}>
                {p.name}
              </p>
              <p className="mt-2 text-text-muted text-xs uppercase tracking-[0.15em]">{p.note}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

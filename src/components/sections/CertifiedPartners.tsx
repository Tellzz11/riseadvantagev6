import Container from "./_Container";

// CertifiedPartners — locked v3 carry-over. Per CARRY-OVER §2 + §6 Q4:
// Facebook + GHL + Google ONLY. Now uses real Simple Icons SVG logos
// (CC0 public-domain marks) instead of italic wordmarks.

const PARTNERS = [
  { name: "Meta Business Partner", note: "Facebook + Instagram", logo: "/partners/meta.svg" },
  { name: "GoHighLevel Certified", note: "GHL Pipelines + Automations", logo: "/partners/gohighlevel.svg" },
  { name: "Google Ads Partner", note: "Search + PMax + YouTube", logo: "/partners/googleads.svg" },
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
                className="h-12 w-auto text-text-strong flex items-center justify-center mb-6"
                style={{ minWidth: "120px" }}
                aria-hidden
              >
                {/* Inline-render via object so SVG currentColor applies */}
                <object data={p.logo} type="image/svg+xml" className="h-10 w-auto pointer-events-none" />
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

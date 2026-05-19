import Container from "./_Container";

// CertifiedPartners — locked v3 carry-over. Per CARRY-OVER §2 + §6 Q4:
// Facebook + GHL + Google ONLY. No RapidXAI.

const PARTNERS = [
  { name: "Facebook", note: "Meta Business Partner" },
  { name: "GHL", note: "GoHighLevel Certified" },
  { name: "Google", note: "Google Ads Partner" },
];

export default function CertifiedPartners() {
  return (
    <section className="bg-canvas-soft" style={{ paddingBlock: "var(--gap-9xl)" }}>
      <Container>
        <p className="eyebrow text-text-muted mb-8 text-center">Certified across</p>
        <ul className="grid grid-cols-3 max-w-3xl mx-auto gap-px bg-border rounded-lg overflow-hidden">
          {PARTNERS.map((p) => (
            <li
              key={p.name}
              className="bg-canvas-soft p-8 text-center"
            >
              <p className="font-display italic text-text-strong" style={{ fontSize: "clamp(22px, 2vw, 28px)" }}>
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

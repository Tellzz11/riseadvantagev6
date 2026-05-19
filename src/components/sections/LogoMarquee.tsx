import Container from "./_Container";

// LogoMarquee — locked v3 carry-over per CARRY-OVER §2. H&O + Adams Blinds
// ONLY. No RapidXAI. Two-up grid (not a CSS-keyframes marquee — we only
// have 2 clients in production worth showing). Renamed in spirit.

const CLIENTS: Array<{ name: string; tagline: string }> = [
  { name: "H&O Gardening", tagline: "London · gardening + landscaping" },
  { name: "Adams Blinds", tagline: "Made-to-measure window dressing" },
];

export default function LogoMarquee() {
  return (
    <section className="bg-canvas border-y border-border-faint" style={{ paddingBlock: "var(--gap-7xl)" }}>
      <Container>
        <p className="eyebrow text-text-muted mb-8 text-center">In production</p>
        <ul className="grid grid-cols-2 gap-6 max-w-2xl mx-auto">
          {CLIENTS.map((c) => (
            <li
              key={c.name}
              className="rounded-lg border border-border bg-canvas-soft p-6 text-center"
            >
              <p className="text-text-strong font-medium text-lg">{c.name}</p>
              <p className="text-text-muted text-sm mt-1">{c.tagline}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

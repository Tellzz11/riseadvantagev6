import Container from "./_Container";

// WhatWeDo — the four service categories. Atelier card grid: thin border,
// no shadow, canvas-soft surface, hover lifts to canvas-soft-hover.
// Audit ref: SUPERSIDE-AUDIT §1.4 (systems-not-cards).

const SERVICES: Array<{ label: string; title: string; body: string }> = [
  {
    label: "Paid",
    title: "Meta · Google · TikTok",
    body:
      "Brand-led campaigns that don't look like ads. Creative iteration, audience research, the unsexy budget discipline.",
  },
  {
    label: "Web",
    title: "Sites that convert",
    body:
      "Next.js + Vercel marketing sites and landing pages. Performance budgets met, accessibility kept, no Webflow drag-and-drop.",
  },
  {
    label: "CRM",
    title: "Lifecycle + automation",
    body:
      "GoHighLevel pipelines, lead scoring, nurture sequences, attribution. Wired so you can actually read it.",
  },
  {
    label: "AI",
    title: "Agent-augmented production",
    body:
      "We use AI to ship more, not to ship slop. Editorial copy, post-graded cinematics, voice agents that don't sound robotic.",
  },
];

export default function WhatWeDo() {
  return (
    <section id="what-we-do" className="bg-canvas-soft" style={{ paddingBlock: "var(--gap-10xl)" }}>
      <Container>
        <p className="eyebrow text-text-muted mb-6">What we do</p>
        <h2
          className="font-sans text-text-strong text-balance max-w-3xl"
          style={{ fontSize: "clamp(32px, 4.5vw, 60px)", lineHeight: 1.1, fontWeight: 400 }}
        >
          Four practices, <em>one team</em>, one ledger.
        </h2>

        <div className="mt-14 grid gap-px bg-border md:grid-cols-2">
          {SERVICES.map((s) => (
            <article
              key={s.label}
              className="bg-canvas-soft p-8 md:p-10 transition-colors hover:bg-[color:var(--surface)]"
            >
              <p className="eyebrow text-text-muted">{s.label}</p>
              <h3 className="mt-4 text-text-strong" style={{ fontSize: "clamp(22px, 2vw, 28px)", lineHeight: 1.2, fontWeight: 400 }}>
                {s.title}
              </h3>
              <p className="mt-4 text-text-body max-w-md">{s.body}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

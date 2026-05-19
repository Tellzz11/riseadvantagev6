import Container from "./_Container";

// WhatWeDo — flipped to CREAM section per Superside audit §1.1.
// True dark↔light alternation is what creates the "one continuous piece"
// feel. Cream surface, deep-teal text. Sits between dark HeroCollage and
// dark HowWeWork to create a sharp cut.

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
    <section
      id="what-we-do"
      style={{
        background: "var(--canvas-light)",
        color: "var(--text-on-light)",
        paddingBlock: "var(--gap-10xl)",
      }}
    >
      <Container>
        <p
          className="eyebrow mb-6"
          style={{ color: "var(--text-on-light-muted)" }}
        >
          What we do
        </p>
        <h2
          className="font-sans text-balance max-w-3xl"
          style={{
            fontSize: "clamp(32px, 4.5vw, 60px)",
            lineHeight: 1.1,
            fontWeight: 400,
            color: "var(--text-on-light)",
          }}
        >
          Four practices, <em>one team</em>, one ledger.
        </h2>

        <div
          className="mt-14 grid gap-px md:grid-cols-2"
          style={{ background: "var(--text-on-light-faint)" }}
        >
          {SERVICES.map((s) => (
            <article
              key={s.label}
              className="p-8 md:p-10 transition-colors"
              style={{ background: "var(--canvas-light)" }}
            >
              <p
                className="eyebrow"
                style={{ color: "var(--text-on-light-muted)" }}
              >
                {s.label}
              </p>
              <h3
                className="mt-4"
                style={{
                  fontSize: "clamp(22px, 2vw, 28px)",
                  lineHeight: 1.2,
                  fontWeight: 400,
                  color: "var(--text-on-light)",
                }}
              >
                {s.title}
              </h3>
              <p
                className="mt-4 max-w-md"
                style={{ color: "var(--text-on-light)" }}
              >
                {s.body}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

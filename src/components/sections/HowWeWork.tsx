import Container from "./_Container";

// HowWeWork — cream section, part of the light alternation block per
// Superside §1.1. (WhatWeDo, its former pair, was cut from the page and
// the unimported file deleted 2026-06-10.)
// Audit ref: SUPERSIDE-AUDIT alternation pattern — blocks of 2-3 per colour.

const STEPS: Array<{ n: string; title: string; outcome: string; body: string }> = [
  {
    n: "01",
    title: "Diagnose",
    outcome: "Honest read on where the leverage actually is",
    body:
      "Two-week intake. We look at the account health, the offer, the funnel, the team. If the work isn't worth doing we say so — fewer agencies should.",
  },
  {
    n: "02",
    title: "Run",
    outcome: "Campaigns, sites, automations — shipped weekly",
    body:
      "Founder-led pods. Daily ownership. Weekly numbers in your inbox. You see the work before it ships and after it lands.",
  },
  {
    n: "03",
    title: "Compound",
    outcome: "Systems you keep — even if we stop",
    body:
      "Every engagement leaves you with the workflows, dashboards and AI agents we built for you. You own it at the end of the engagement, not us.",
  },
];

export default function HowWeWork() {
  return (
    <section
      id="how-we-work"
      style={{
        background: "var(--canvas-light)",
        paddingBlock: "var(--gap-10xl)",
      }}
    >
      <Container>
        <p className="eyebrow mb-6" style={{ color: "var(--text-on-light-muted)" }}>How we work</p>
        <h2
          className="font-sans max-w-3xl text-balance"
          style={{
            fontSize: "clamp(32px, 4.5vw, 60px)",
            lineHeight: 1.1,
            fontWeight: 400,
            color: "var(--text-on-light)",
          }}
        >
          Three steps. <em>Outcome-based</em>, not theatre.
        </h2>

        <ol className="mt-16 grid gap-12 md:grid-cols-3">
          {STEPS.map((s) => (
            <li key={s.n} className="relative">
              <p
                className="font-display italic"
                style={{
                  fontSize: "clamp(48px, 5vw, 72px)",
                  lineHeight: 1,
                  color: "var(--text-on-light-faint)",
                }}
              >
                {s.n}
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
                className="mt-3 text-sm uppercase tracking-[0.12em]"
                style={{ color: "var(--text-on-light-muted)" }}
              >
                {s.outcome}
              </p>
              <p className="mt-4" style={{ color: "var(--text-on-light)" }}>{s.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

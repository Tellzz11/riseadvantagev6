import Container from "./_Container";

// HowWeWork / Process explainer — locked v3 carry-over per §2.
// Outcome-based subtitles, three steps. No marketing-funnel cliches.

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
      className="bg-canvas"
      style={{ paddingBlock: "var(--gap-10xl)" }}
    >
      <Container>
        <p className="eyebrow text-text-muted mb-6">How we work</p>
        <h2
          className="font-sans text-text-strong max-w-3xl text-balance"
          style={{ fontSize: "clamp(32px, 4.5vw, 60px)", lineHeight: 1.1, fontWeight: 400 }}
        >
          Three steps. <em>Outcome-based</em>, not theatre.
        </h2>

        <ol className="mt-16 grid gap-12 md:grid-cols-3">
          {STEPS.map((s) => (
            <li key={s.n} className="relative">
              <p
                className="font-display italic text-text-faint"
                style={{ fontSize: "clamp(48px, 5vw, 72px)", lineHeight: 1 }}
              >
                {s.n}
              </p>
              <h3 className="mt-4 text-text-strong" style={{ fontSize: "clamp(22px, 2vw, 28px)", lineHeight: 1.2, fontWeight: 400 }}>
                {s.title}
              </h3>
              <p className="mt-3 text-text-muted text-sm uppercase tracking-[0.12em]">{s.outcome}</p>
              <p className="mt-4 text-text-body">{s.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

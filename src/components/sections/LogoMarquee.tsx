import Container from "./_Container";

// LogoMarquee — reshaped 2026-06-10 (audit): Adams Blinds removed, it is
// not a live client. One client in production = one honest proof line
// pointing at the case study, not a two-tile wall pretending to be a
// roster. Re-expand to a grid only when there are real names to put in it.

export default function LogoMarquee() {
  return (
    <section className="bg-canvas border-y border-border-faint" style={{ paddingBlock: "var(--gap-7xl)" }}>
      <Container>
        <p className="eyebrow text-text-muted mb-5 text-center">In production</p>
        <p
          className="text-center text-text-body mx-auto max-w-2xl"
          style={{ fontSize: "clamp(17px, 1.4vw, 21px)", lineHeight: 1.5 }}
        >
          <span className="text-text-strong font-medium">H&amp;O Gardening</span>, London —
          funnel, Meta + Google ads, and a lead tracker on the owner&rsquo;s phone.{" "}
          <a
            href="#selected-work"
            className="underline underline-offset-4 decoration-border-strong hover:text-text-strong transition-colors"
          >
            See the numbers
          </a>
        </p>
      </Container>
    </section>
  );
}

import Container from "./_Container";

// AnchorPhilosophy — locked v5 carry-over ("How we think about marketing").
// Operator-protected per CARRY-OVER §2: NO redesign, accent-sweep only.
// 2026-05-19: GSAP reveals removed. Per SUPERSIDE-AUDIT §1.5 — Superside
// itself ships zero scroll-bound reveals; content just IS there. Audit
// finding: that's what produces the "one continuous piece" feel, NOT
// staged entrances. We follow.

export default function AnchorPhilosophy() {
  return (
    <section
      id="anchor"
      className="bg-canvas-deep"
      style={{ paddingBlock: "var(--gap-11xl)" }}
    >
      <Container>
        <p className="eyebrow text-text-muted mb-8">How we think about marketing</p>

        <div className="grid md:grid-cols-12 gap-10">
          <h2
            className="md:col-span-7 font-sans text-text-strong text-balance"
            style={{ fontSize: "clamp(36px, 5vw, 72px)", lineHeight: 1.05, fontWeight: 400, letterSpacing: "-0.01em" }}
          >
            Most agencies sell campaigns.{" "}
            <em>We sell the gap between what your account is doing and what it could.</em>
          </h2>

          <div className="md:col-span-5 md:col-start-8 space-y-6 text-text-body">
            <p>
              Every brief starts the same way: a quiet read of the numbers, the
              creative, the offer. Half the time the first answer is &ldquo;don&rsquo;t
              run ads yet&rdquo; — fix the page first.
            </p>
            <p>
              The rest of the time we run. Hard. Daily. With work you see
              before it ships and after it lands. No reporting theatre.
            </p>
            <p className="text-text-strong">
              You own everything we build for you at the end of the engagement.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

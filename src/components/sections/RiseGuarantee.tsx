import Container from "./_Container";

// RiseGuarantee — locked v3 carry-over. Single column statement, no card.
// Reads as a paragraph contract.

export default function RiseGuarantee() {
  return (
    <section className="bg-canvas" style={{ paddingBlock: "var(--gap-10xl)" }}>
      <Container className="max-w-3xl mx-auto">
        <p className="eyebrow text-text-muted mb-8">The Rise guarantee</p>

        <h2
          className="font-sans text-text-strong text-balance"
          style={{ fontSize: "clamp(32px, 4vw, 52px)", lineHeight: 1.1, fontWeight: 400, letterSpacing: "-0.01em" }}
        >
          If we don&rsquo;t move a number you can <em>see</em> in 90 days, we
          keep working until we do — at our cost.
        </h2>

        <p className="mt-8 text-text-body">
          Not a refund clause. We don&rsquo;t do retainers we&rsquo;d be
          embarrassed by. The number we&rsquo;re moving gets agreed in the
          intake call — cost per lead, qualified leads per week, revenue per
          campaign — whichever is the bottleneck. We hit it or we don&rsquo;t
          stop.
        </p>
      </Container>
    </section>
  );
}

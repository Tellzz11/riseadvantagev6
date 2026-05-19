import Container from "./_Container";

// RiseGuarantee — flipped to CREAM. Pairs with OrlaTestimonial to form a
// 2-section cream "social proof + promise" block per Superside §1.1.

export default function RiseGuarantee() {
  return (
    <section
      style={{
        background: "var(--canvas-light)",
        paddingBlock: "var(--gap-10xl)",
      }}
    >
      <Container className="max-w-3xl mx-auto">
        <p className="eyebrow mb-8" style={{ color: "var(--text-on-light-muted)" }}>
          The Rise guarantee
        </p>

        <h2
          className="font-sans text-balance"
          style={{
            fontSize: "clamp(32px, 4vw, 52px)",
            lineHeight: 1.1,
            fontWeight: 400,
            letterSpacing: "-0.01em",
            color: "var(--text-on-light)",
          }}
        >
          If we don&rsquo;t move a number you can <em>see</em> in 90 days, we
          keep working until we do — at our cost.
        </h2>

        <p className="mt-8" style={{ color: "var(--text-on-light)" }}>
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

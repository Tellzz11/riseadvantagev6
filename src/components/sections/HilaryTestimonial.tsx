import Container from "./_Container";

// HilaryTestimonial — flipped to SAGE-CREAM #E6ECD6 (Superside testimonials
// section parallel, 2026-05-19). Sits between dark SelectedWork + dark
// RiseGuarantee to keep the surface alternation. Hilary is H&O Gardening's
// lead operator — name corrected from earlier draft (was Orla).

export default function HilaryTestimonial() {
  return (
    <section
      style={{
        background: "var(--canvas-sage)",
        paddingBlock: "var(--gap-10xl)",
      }}
    >
      <Container className="text-center">
        <p
          className="eyebrow mb-10"
          style={{ color: "var(--text-on-light-muted)" }}
        >
          Client said
        </p>

        <blockquote
          className="mx-auto max-w-3xl font-display italic text-balance"
          style={{
            fontSize: "clamp(28px, 3.4vw, 44px)",
            lineHeight: 1.2,
            color: "var(--text-on-light)",
          }}
        >
          &ldquo;They didn&rsquo;t just run ads. They built the part of the
          business we never had time to build.&rdquo;
        </blockquote>

        <footer
          className="mt-8 text-sm"
          style={{ color: "var(--text-on-light-muted)" }}
        >
          Hilary — H&amp;O Gardening
        </footer>
      </Container>
    </section>
  );
}

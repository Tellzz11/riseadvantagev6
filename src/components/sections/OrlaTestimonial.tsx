import Container from "./_Container";

// OrlaTestimonial — flipped to CREAM. Sits between dark SelectedWork +
// dark RiseGuarantee to create another cut per the Superside alternation.

export default function OrlaTestimonial() {
  return (
    <section
      style={{
        background: "var(--canvas-light)",
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
          Orla — H&amp;O Gardening
        </footer>
      </Container>
    </section>
  );
}

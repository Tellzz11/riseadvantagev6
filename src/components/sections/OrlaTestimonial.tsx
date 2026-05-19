import Container from "./_Container";

// OrlaTestimonial — locked v3 carry-over. Single quote, no logos. Sits
// on canvas-soft to bleed into the SelectedWork canvas without a divider.

export default function OrlaTestimonial() {
  return (
    <section className="bg-canvas-soft" style={{ paddingBlock: "var(--gap-10xl)" }}>
      <Container className="text-center">
        <p className="eyebrow text-text-muted mb-10">Client said</p>

        <blockquote
          className="mx-auto max-w-3xl font-display italic text-text-strong text-balance"
          style={{ fontSize: "clamp(28px, 3.4vw, 44px)", lineHeight: 1.2 }}
        >
          &ldquo;They didn&rsquo;t just run ads. They built the part of the
          business we never had time to build.&rdquo;
        </blockquote>

        <footer className="mt-8 text-text-muted text-sm">
          Orla — H&amp;O Gardening
        </footer>
      </Container>
    </section>
  );
}

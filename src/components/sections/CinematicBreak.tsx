// CinematicBreak — locked v5 carry-over ("At the edge of dawn").
// Operator-protected per CARRY-OVER §2. The dawn cinematic asset
// (CS 3.0 1080p) lives at public/scroll-cinematic.{mp4,webm}.
// Layered text over the video, no overlay logic, no scroll-scrub.

import Container from "./_Container";

export default function CinematicBreak() {
  return (
    <section
      id="cinematic-break"
      className="relative isolate overflow-hidden bg-canvas-deep"
      style={{ paddingBlock: "var(--gap-11xl)" }}
    >
      <video
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-90"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/scroll-cinematic-poster.jpg"
        aria-hidden
      >
        <source src="/scroll-cinematic.webm" type="video/webm" />
        <source src="/scroll-cinematic.mp4" type="video/mp4" />
      </video>

      {/* Radial vignette so the centred headline reads, but the cinematic
          stays fully visible at top + bottom edges. */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, color-mix(in oklab, var(--canvas-deep) 55%, transparent) 0%, color-mix(in oklab, var(--canvas-deep) 25%, transparent) 50%, transparent 100%)",
        }}
        aria-hidden
      />

      <Container className="relative z-10 text-center">
        <p className="eyebrow text-text-muted mb-6">At the edge of dawn</p>
        <h2
          className="font-sans text-text-strong text-balance mx-auto max-w-4xl"
          style={{ fontSize: "clamp(32px, 4.5vw, 60px)", lineHeight: 1.1, fontWeight: 400, letterSpacing: "-0.01em" }}
        >
          Most marketing is reactive. <em>The compounding</em> happens for the
          teams who build it like infrastructure.
        </h2>
      </Container>
    </section>
  );
}

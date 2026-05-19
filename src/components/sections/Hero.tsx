// Hero — locked v5 carry-over (3D crystal prism). v6 keeps the cinematic
// backdrop hook (mp4/webm) but re-themed to BD-005 surfaces. For now the
// `<video>` slot renders the v5 source if present; falls back to canvas-deep
// gradient so the page reads correctly while we re-render the asset under
// the new palette.

import Container from "./_Container";

export default function Hero() {
  return (
    <section
      className="relative isolate overflow-hidden bg-canvas-deep"
      style={{ paddingBlock: "var(--gap-11xl)" }}
    >
      {/* Backdrop video — slot is wired, source comes from public/hero.{mp4,webm}.
          Will be re-rendered through Higgsfield CLI under BD-005 lighting later. */}
      <video
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-50"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/hero-poster.jpg"
        aria-hidden
      >
        <source src="/hero.webm" type="video/webm" />
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      {/* Soft floor wash so the headline reads against the video */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, color-mix(in oklab, var(--canvas-deep) 65%, transparent) 0%, color-mix(in oklab, var(--canvas-deep) 35%, transparent) 50%, var(--canvas-deep) 100%)",
        }}
        aria-hidden
      />

      <Container className="relative z-10">
        <p className="eyebrow text-text-muted mb-6">A UK marketing agency</p>

        <h1 className="font-sans text-text-strong text-balance" style={{ fontSize: "clamp(40px, 6.2vw, 88px)", lineHeight: 1.05, fontWeight: 400, letterSpacing: "-0.01em" }}>
          Campaigns today.{" "}
          <em>Capability tomorrow.</em>
        </h1>

        <p className="mt-8 max-w-2xl text-text-body" style={{ fontSize: "clamp(16px, 1.4vw, 20px)", lineHeight: 1.5 }}>
          We run the work and build the system that compounds it. Founder-led,
          agent-augmented, no fluff.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full px-7 py-3 bg-accent text-canvas font-medium hover:bg-accent/90 transition-colors"
          >
            Talk to us <span aria-hidden>→</span>
          </a>
          <a
            href="#how-we-work"
            className="inline-flex items-center gap-2 rounded-full px-7 py-3 border border-border-strong text-text-strong hover:bg-canvas-soft transition-colors"
          >
            How it works
          </a>
        </div>
      </Container>
    </section>
  );
}

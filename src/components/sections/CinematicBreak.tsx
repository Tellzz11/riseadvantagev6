"use client";

// CinematicBreak — "At the edge of dawn" manifesto interstitial.
// 2026-06-10: brutalist-concrete corridor replaced with the BD-005 teal-void
// cinematic (Kling 2.6 + graded/grained in post — see
// docs/research/imagery-specs-2026-06-10.md, Asset 1). Loading now matches
// the hero's poster-first discipline: the poster paints immediately via a
// raw <picture> (AVIF/WebP/JPG), and the <video> only mounts when the
// section approaches the viewport — it's below the fold, so it must never
// compete with the hero for bandwidth. Reduced-motion / Save-Data users
// stay on the poster. Radial vignette is unchanged (contrast verified
// 12.5:1 worst-case against it — do not strengthen).

import { useEffect, useRef, useState } from "react";
import Container from "./_Container";

export default function CinematicBreak() {
  const sectionRef = useRef<HTMLElement>(null);
  const [videoMounted, setVideoMounted] = useState(false);
  const [videoOn, setVideoOn] = useState(false); // fades in on canplay

  useEffect(() => {
    // Poster-only for reduced-motion / Save-Data — same gates as the hero.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    if (nav.connection?.saveData) return;

    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVideoMounted(true);
          io.disconnect();
        }
      },
      // Start fetching one viewport ahead so playback is ready on arrival.
      { rootMargin: "100% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="cinematic-break"
      className="relative isolate overflow-hidden bg-canvas-deep"
      style={{ paddingBlock: "var(--gap-11xl)" }}
    >
      {/* Poster layer — always painted, and the rest state for users who
          never get the video. */}
      <picture>
        <source type="image/avif" srcSet="/dawn-cinematic-poster.avif" />
        <source type="image/webp" srcSet="/dawn-cinematic-poster.webp" />
        <img
          src="/dawn-cinematic-poster.jpg"
          alt=""
          loading="lazy"
          decoding="async"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-90"
          aria-hidden
        />
      </picture>

      {videoMounted && (
        <video
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-90"
          style={{
            opacity: videoOn ? 0.9 : 0,
            transition: "opacity 600ms ease",
          }}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/dawn-cinematic-poster.jpg"
          onCanPlay={() => setVideoOn(true)}
          aria-hidden
        >
          <source src="/dawn-cinematic.webm" type="video/webm" />
          <source src="/dawn-cinematic.mp4" type="video/mp4" />
        </video>
      )}

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

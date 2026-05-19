"use client";

// Hero — locked v5 carry-over (3D crystal prism / atelier form). v6
// re-rendered under BD-005 (Kling 3.0 silk-drape on deep teal field).
// Subtle scroll parallax: video translates up slowly as you scroll,
// creating depth without big animation. Respects reduced-motion.

import { useEffect, useRef } from "react";
import Container from "./_Container";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const video = videoRef.current;
    if (!video) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        // Translate video up at ~30% scroll speed for parallax depth.
        const y = window.scrollY;
        const max = window.innerHeight;
        const offset = Math.min(y * 0.3, max * 0.3);
        video.style.transform = `translate3d(0, -${offset}px, 0) scale(1.05)`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      className="relative isolate overflow-hidden bg-canvas-deep"
      style={{ paddingBlock: "var(--gap-11xl)", minHeight: "90vh" }}
    >
      <video
        ref={videoRef}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-95"
        style={{ willChange: "transform" }}
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

      {/* Soft headline wash — left + bottom only, video stays visible right/top */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(105deg, color-mix(in oklab, var(--canvas-deep) 78%, transparent) 0%, color-mix(in oklab, var(--canvas-deep) 35%, transparent) 45%, transparent 70%)",
        }}
        aria-hidden
      />

      <Container className="relative z-10">
        <p className="eyebrow mb-6">A UK marketing agency</p>

        <h1
          className="font-sans text-text-strong text-balance"
          style={{ fontSize: "clamp(40px, 6.2vw, 88px)", lineHeight: 1.05, fontWeight: 400, letterSpacing: "-0.01em" }}
        >
          Campaigns today. <em>Capability tomorrow.</em>
        </h1>

        <p
          className="mt-8 max-w-2xl text-text-body"
          style={{ fontSize: "clamp(16px, 1.4vw, 20px)", lineHeight: 1.5 }}
        >
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

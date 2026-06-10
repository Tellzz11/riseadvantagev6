"use client";

// BriefFlow — Superside "One intelligent system" pattern (2026-05-19).
// Green-blurred organic backdrop + glassy white card with vertical stepper.
// Current step has a spinner — auto-advances on a 3.2s loop so the page feels
// alive without scroll/click. 2026-06-10: completed steps are deep-teal fills
// (not lime) — lime is reserved for conversion CTAs sitewide, per audit.

import { useEffect, useState } from "react";
import Container from "./_Container";

const STEPS = [
  "Brief in",
  "Account audit",
  "Drafting",
  "Live",
] as const;

export default function BriefFlow() {
  const [current, setCurrent] = useState(1); // 0..STEPS.length

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % (STEPS.length + 1));
    }, 3200);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="brief-flow"
      className="relative overflow-hidden"
      style={{
        background: "var(--canvas)",
        paddingBlock: "var(--gap-10xl)",
      }}
    >
      <Container>
        <p className="eyebrow mb-6">How work ships</p>
        <div className="grid md:grid-cols-12 gap-10 items-end mb-14">
          <h2
            className="md:col-span-7 font-sans text-text-strong text-balance max-w-[15ch]"
            style={{ fontSize: "clamp(36px, 4.5vw, 60px)", lineHeight: 1.1, fontWeight: 400, letterSpacing: "-0.005em" }}
          >
            One intelligent system, from brief to live.
          </h2>
          <p
            className="md:col-span-5 text-text-body max-w-md"
            style={{ fontSize: "clamp(15px, 1.1vw, 17px)", lineHeight: 1.6 }}
          >
            No matter what you brief us on, the path is the same — read the
            account, draft the work, ship it. No theatre.
          </p>
        </div>

        <div
          // Mobile gets a generous min-height so all four steps fit;
          // desktop keeps the 16:7.5 letterbox aspect.
          className="relative rounded-3xl overflow-hidden border min-h-[640px] md:min-h-0 md:aspect-[16/7.5]"
          style={{
            borderColor: "var(--border-strong)",
          }}
        >
          {/* Animated green-blurred backdrop — pure CSS gradients drifting.
              No external image, no IP risk. Three radial blobs orbit slowly
              behind a strong blur to mimic Superside's painterly green field. */}
          <div className="absolute inset-0" aria-hidden>
            <div className="ra-bg-blob ra-bg-blob-1" />
            <div className="ra-bg-blob ra-bg-blob-2" />
            <div className="ra-bg-blob ra-bg-blob-3" />
            <div className="absolute inset-0 backdrop-blur-3xl" />
          </div>

          {/* Card with stepper */}
          <div className="absolute inset-0 grid place-items-center">
            <div
              className="rounded-2xl p-7 lg:p-8 shadow-2xl"
              style={{
                background: "var(--canvas-light)",
                color: "var(--text-on-light)",
                width: "min(420px, 80%)",
              }}
            >
              <ol className="space-y-3">
                {STEPS.map((label, i) => {
                  const isDone = i < current;
                  const isActive = i === current;
                  return (
                    <li
                      key={label}
                      className="flex items-center gap-3 rounded-xl px-4 py-3 transition-all"
                      style={{
                        background: isDone
                          ? "var(--text-on-light)"
                          : isActive
                          ? "rgba(10, 33, 31, 0.08)"
                          : "var(--canvas-light-soft)",
                        border: isActive
                          ? "1px solid rgba(10, 33, 31, 0.18)"
                          : "1px solid transparent",
                        color: isDone ? "var(--canvas-light)" : "var(--text-on-light)",
                      }}
                    >
                      <span
                        className="inline-flex h-5 w-5 items-center justify-center rounded-full"
                        style={{
                          background: isDone ? "var(--canvas-light)" : "transparent",
                          border: isDone ? "none" : "1.5px solid var(--text-on-light-muted)",
                          color: "var(--text-on-light)",
                          fontSize: 11,
                        }}
                        aria-hidden
                      >
                        {isDone ? "✓" : isActive ? (
                          <span className="block h-3 w-3 rounded-full border-2 border-text-on-light border-t-transparent animate-spin" style={{ borderColor: "var(--text-on-light)", borderTopColor: "transparent" }} />
                        ) : null}
                      </span>
                      <span style={{ fontWeight: isActive || isDone ? 500 : 400 }}>{label}</span>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <a href="#contact" className="pill-cta-lime">
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

      <style>{`
        .ra-bg-blob {
          position: absolute;
          width: 60%;
          aspect-ratio: 1;
          border-radius: 50%;
          filter: blur(60px);
          opacity: 0.85;
        }
        .ra-bg-blob-1 {
          background: radial-gradient(circle at 30% 30%, #6EA85F 0%, transparent 60%);
          top: -10%;
          left: -10%;
          animation: ra-blob-1 18s ease-in-out infinite alternate;
        }
        .ra-bg-blob-2 {
          background: radial-gradient(circle at 60% 50%, #C7D2BE 0%, transparent 65%);
          top: 20%;
          right: -15%;
          animation: ra-blob-2 22s ease-in-out infinite alternate;
        }
        .ra-bg-blob-3 {
          background: radial-gradient(circle at 50% 50%, #2A4E45 0%, transparent 70%);
          bottom: -20%;
          left: 30%;
          animation: ra-blob-3 26s ease-in-out infinite alternate;
        }
        @keyframes ra-blob-1 { to { transform: translate(20%, 15%) scale(1.1); } }
        @keyframes ra-blob-2 { to { transform: translate(-15%, -10%) scale(1.15); } }
        @keyframes ra-blob-3 { to { transform: translate(-10%, -20%) scale(1.2); } }
        @media (prefers-reduced-motion: reduce) {
          .ra-bg-blob { animation: none !important; }
        }
      `}</style>
    </section>
  );
}

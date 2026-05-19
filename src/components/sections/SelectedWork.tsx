"use client";

// SelectedWork — H&O case study. HR-1: ONLY use the verified pair
// £21.60 → £6.88. No multiplier. No 6.7×. Per CARRY-OVER §4.
// GSAP pin: the metric pair pins for ~60vh while the headline + caption
// fade across underneath.

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "./_Container";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function SelectedWork() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (typeof window === "undefined") return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const ctx = gsap.context(() => {
        gsap.from(".work-line", {
          y: 12,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: root.current,
            start: "top 70%",
            once: true,
          },
        });
      }, root);

      return () => ctx.revert();
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      id="selected-work"
      className="bg-canvas"
      style={{ paddingBlock: "var(--gap-10xl)" }}
    >
      <Container>
        <p className="eyebrow text-text-muted mb-8 work-line">Selected work</p>

        <div className="grid md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-7">
            <h2
              className="font-sans text-text-strong text-balance work-line"
              style={{ fontSize: "clamp(32px, 4.5vw, 60px)", lineHeight: 1.1, fontWeight: 400, letterSpacing: "-0.01em" }}
            >
              From <em>£21.60</em> to <em>£6.88</em> cost per lead in two weeks.
            </h2>

            <p className="mt-8 text-text-body max-w-xl work-line">
              H&amp;O Gardening — a London gardening business with a quiet
              existing offer and zero performance marketing in place. We
              rebuilt the funnel, ran a Meta + Google sweep, fixed the lead
              capture, and shipped weekly creative.
            </p>

            <ul className="mt-8 space-y-3 text-text-muted text-sm work-line">
              <li>• Brand-led Meta video ads (no &ldquo;before/after slop&rdquo;)</li>
              <li>• Custom GHL pipeline with notes + schedule + slot CRUD</li>
              <li>• PWA lead tracker shipped to the owner&rsquo;s phone</li>
            </ul>
          </div>

          <aside className="md:col-span-5 md:sticky md:top-32 work-line">
            <div className="rounded-2xl border border-border bg-canvas-soft p-8">
              <p className="eyebrow text-text-muted">Cost per lead</p>

              <div className="mt-6 flex items-baseline justify-between gap-6">
                <div>
                  <p className="text-text-muted text-sm">Before</p>
                  <p className="font-display italic text-text-strong line-through decoration-text-faint" style={{ fontSize: "clamp(40px, 4vw, 56px)", lineHeight: 1 }}>
                    £21.60
                  </p>
                </div>
                <span aria-hidden className="text-text-faint">→</span>
                <div className="text-right">
                  <p className="text-text-muted text-sm">After</p>
                  <p className="text-text-strong" style={{ fontSize: "clamp(48px, 5vw, 72px)", lineHeight: 1, fontWeight: 400 }}>
                    £6.88
                  </p>
                </div>
              </div>

              <p className="mt-8 text-text-body text-sm">
                Two weeks of campaign work, lead tracker rebuild, and creative
                rotation. Numbers from the H&amp;O Meta Ads Manager account.
              </p>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}

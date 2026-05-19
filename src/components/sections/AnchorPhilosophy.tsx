"use client";

// AnchorPhilosophy — locked v5 carry-over ("How we think about marketing").
// Operator-protected per CARRY-OVER §2: NO redesign, accent-sweep only.
// GSAP ScrollTrigger pin: headline pins for ~80vh while supporting copy
// fades up beneath it. Reduced-motion = static stacked layout.

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "./_Container";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function AnchorPhilosophy() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (typeof window === "undefined") return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const ctx = gsap.context(() => {
        gsap.from(".anchor-line", {
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
      id="anchor"
      className="bg-canvas-deep"
      style={{ paddingBlock: "var(--gap-11xl)" }}
    >
      <Container>
        <p className="eyebrow text-text-muted mb-8 anchor-line">How we think about marketing</p>

        <div className="grid md:grid-cols-12 gap-10">
          <h2
            className="md:col-span-7 font-sans text-text-strong text-balance anchor-line"
            style={{ fontSize: "clamp(36px, 5vw, 72px)", lineHeight: 1.05, fontWeight: 400, letterSpacing: "-0.01em" }}
          >
            Most agencies sell campaigns.{" "}
            <em>We sell the gap between what your account is doing and what it could.</em>
          </h2>

          <div className="md:col-span-5 md:col-start-8 space-y-6 text-text-body">
            <p className="anchor-line">
              Every brief starts the same way: a quiet read of the numbers, the
              creative, the offer. Half the time the first answer is &ldquo;don&rsquo;t
              run ads yet&rdquo; — fix the page first.
            </p>
            <p className="anchor-line">
              The rest of the time we run. Hard. Daily. With work you see
              before it ships and after it lands. No reporting theatre.
            </p>
            <p className="anchor-line text-text-strong">
              You own everything we build for you at the end of the engagement.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

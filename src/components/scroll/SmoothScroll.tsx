"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "lenis";

// Lenis smooth scroll on a plain rAF loop. GSAP was removed in the hero perf
// pass (audit B2): the only thing it did here was tick Lenis and call
// ScrollTrigger.update — and nothing in the site uses ScrollTrigger. A direct
// requestAnimationFrame wire is byte-for-byte equivalent behaviour minus
// ~70KB of dead library weight.

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Respect operator's reduced-motion preference — skip Lenis entirely.
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      lerp: 0.1,
      smoothWheel: true,
      syncTouch: false,
    });

    let raf = 0;
    const onFrame = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(onFrame);
    };
    raf = requestAnimationFrame(onFrame);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}

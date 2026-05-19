"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// Zero-nav per v6 carry-over §2. Logo left, one sticky CTA right, nothing
// in the middle. CTA scrolls to #contact (form-only, no Calendly).
export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "fixed top-0 left-0 right-0 z-40 transition-colors duration-300",
        scrolled
          ? "bg-[color:var(--canvas)]/85 backdrop-blur-sm border-b border-border"
          : "bg-transparent",
      ].join(" ")}
      style={{ height: "var(--header-height)" }}
    >
      <div className="mx-auto h-full flex items-center justify-between"
           style={{ maxWidth: "var(--container-max)", paddingInline: "var(--container-margin)" }}>
        <Link href="/" className="font-display italic text-text-strong text-xl tracking-tight" aria-label="Rise Advantage home">
          Rise<span className="not-italic font-sans text-text-muted"> · </span>Advantage
        </Link>

        <a
          href="#contact"
          className="inline-flex items-center gap-2 rounded-full px-5 py-2 bg-accent text-canvas text-sm font-medium hover:bg-accent/90 transition-colors"
        >
          Talk to us
          <span aria-hidden>→</span>
        </a>
      </div>
    </header>
  );
}

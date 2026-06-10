"use client";

// ════════════════════════════════════════════════════════════════════════════
// Hero — Direction B (live WebGL fragment-assembly) with the full §3.3
// degradation ladder. Poster-first: the assembled "answer" frame is the LCP
// element (fetchpriority=high); everything heavier hydrates AFTER load+idle.
//
// Ladder (first match wins):
//   1. ?hero=poster|video|webgl   — dev override
//   2. prefers-reduced-motion     → static poster
//   3. Save-Data                  → static poster
//   4. coarse pointer / ≤768px    → Direction A video (mobile encode)
//   5. weak CPU/GPU heuristics    → Direction A video (desktop encode)
//   6. WebGL probe fails / software renderer → Direction A video
//   7. else                       → live WebGL (Direction B)
// Plus the runtime FPS watchdog inside HeroCanvas: sustained sub-floor frame
// rate swaps to the A video. Same seeded scene → the swap doesn't "jump".
//
// Copy is VERBATIM from the approved v5 hero. Eyebrow stays --sage: the §2.4
// contrast gate was RUN against rendered pixels (scripts/check-hero-contrast
// .mjs, 2026-06-10): moss = 2.84:1 FAIL, sage = 9.28:1 PASS.
// ════════════════════════════════════════════════════════════════════════════

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Container from "./_Container";

const HeroCanvas = dynamic(() => import("./hero/HeroCanvas"), { ssr: false });

type HeroMode = "poster" | "video" | "webgl";
type Layer = { mode: HeroMode; mobile: boolean };

// §3.3 ladder — runs once, post-load, on the client.
function decideMode(): Layer {
  const q = new URLSearchParams(window.location.search).get("hero");
  const mobile =
    window.matchMedia("(pointer: coarse)").matches || window.innerWidth <= 768;
  if (q === "poster" || q === "video" || q === "webgl") return { mode: q, mobile };

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    return { mode: "poster", mobile };

  const nav = navigator as Navigator & {
    connection?: { saveData?: boolean };
    deviceMemory?: number;
  };
  if (nav.connection?.saveData) return { mode: "poster", mobile };

  if (mobile) return { mode: "video", mobile };

  if ((nav.hardwareConcurrency ?? 8) <= 4 || (nav.deviceMemory ?? 8) <= 4)
    return { mode: "video", mobile };

  // WebGL probe — refuse software / caveat renderers
  try {
    const c = document.createElement("canvas");
    const gl = (c.getContext("webgl2", { failIfMajorPerformanceCaveat: true }) ||
      c.getContext("webgl", {
        failIfMajorPerformanceCaveat: true,
      })) as WebGLRenderingContext | null;
    if (!gl) return { mode: "video", mobile };
    const dbg = gl.getExtension("WEBGL_debug_renderer_info");
    if (dbg) {
      const renderer = String(gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) ?? "");
      if (/swiftshader|llvmpipe|software|microsoft basic render/i.test(renderer))
        return { mode: "video", mobile };
    }
  } catch {
    return { mode: "video", mobile };
  }

  return { mode: "webgl", mobile };
}

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [layer, setLayer] = useState<Layer>({ mode: "poster", mobile: false });
  const [videoOn, setVideoOn] = useState(false); // fades in on canplay
  const [glOn, setGlOn] = useState(false); // fades in on first WebGL frame

  // ── enhancement scheduling: poster paints first (it IS the LCP), the
  // ladder + heavy layer mount only after window load + an idle slot ────────
  useEffect(() => {
    let cancelled = false;
    let idleId: number | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const enhance = () => {
      if (!cancelled) setLayer(decideMode());
    };
    const schedule = () => {
      if (cancelled) return;
      if ("requestIdleCallback" in window) {
        idleId = window.requestIdleCallback(enhance, { timeout: 1500 });
      } else {
        timer = setTimeout(enhance, 350);
      }
    };
    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });
    return () => {
      cancelled = true;
      window.removeEventListener("load", schedule);
      if (idleId !== undefined && "cancelIdleCallback" in window)
        window.cancelIdleCallback(idleId);
      if (timer !== undefined) clearTimeout(timer);
    };
  }, []);

  // ── video-mode scroll parallax (§2.3 carry-over; reduced-motion never
  // reaches video mode, the ladder returns poster first) ────────────────────
  useEffect(() => {
    if (layer.mode !== "video") return;
    const video = videoRef.current;
    if (!video) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
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
  }, [layer.mode]);

  const vidBase = layer.mobile ? "/hero-assemble-mobile" : "/hero-assemble";
  const posterJpg = layer.mobile
    ? "/hero-assemble-poster-mobile.jpg"
    : "/hero-assemble-poster.jpg";

  return (
    <section
      className="relative isolate overflow-hidden bg-canvas-deep"
      style={{
        paddingTop: "calc(var(--header-height) + var(--gap-9xl))",
        paddingBottom: "var(--gap-11xl)",
        minHeight: "90vh",
      }}
    >
      {/* ── LCP layer: the assembled poster frame, always painted first ──── */}
      <picture>
        <source media="(max-width: 768px)" type="image/avif" srcSet="/hero-assemble-poster-mobile.avif" />
        <source media="(max-width: 768px)" type="image/webp" srcSet="/hero-assemble-poster-mobile.webp" />
        <source media="(max-width: 768px)" srcSet="/hero-assemble-poster-mobile.jpg" />
        <source type="image/avif" srcSet="/hero-assemble-poster.avif" />
        <source type="image/webp" srcSet="/hero-assemble-poster.webp" />
        {/* raw <picture>, not next/image: media-typed AVIF/WebP sources +
            fetchpriority control make this the LCP element; next/image would
            lazy-wrap and delay it */}
        <img
          src="/hero-assemble-poster.jpg"
          alt=""
          fetchPriority="high"
          decoding="async"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          aria-hidden
        />
      </picture>

      {/* ── Direction A video (mobile / weak-GPU / watchdog fallback) ────── */}
      {layer.mode === "video" && (
        <video
          ref={videoRef}
          key={vidBase}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          style={{
            willChange: "transform",
            opacity: videoOn ? 1 : 0,
            transition: "opacity 600ms ease",
          }}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={posterJpg}
          onCanPlay={() => setVideoOn(true)}
          aria-hidden
        >
          <source src={`${vidBase}.webm`} type="video/webm" />
          <source src={`${vidBase}.mp4`} type="video/mp4" />
        </video>
      )}

      {/* ── Direction B: live WebGL + DOM grade/grain (baked into A's encode,
             composited here so both modes carry the same BD-005 finish) ──── */}
      {layer.mode === "webgl" && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            opacity: glOn ? 1 : 0,
            transition: "opacity 700ms ease",
          }}
          aria-hidden
        >
          {/* §1.5 mild global desat (brass −10%) + gentle contrast */}
          <div className="absolute inset-0" style={{ filter: "saturate(0.94) contrast(1.02)" }}>
            <HeroCanvas
              onReady={() => setGlOn(true)}
              onDegrade={() => setLayer((l) => ({ ...l, mode: "video" }))}
            />
          </div>
          {/* §1.5 grade — teal shadow lift / warm-highlight split-tone / edge falloff */}
          <div
            className="absolute inset-0"
            style={{ background: "var(--canvas)", opacity: 0.09, mixBlendMode: "screen" }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(75% 55% at 66% 28%, rgba(216,196,154,0.12), transparent 70%)",
              mixBlendMode: "soft-light",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(115% 90% at 50% 42%, transparent 52%, #0A211F66 100%)",
              mixBlendMode: "screen",
            }}
          />
          {/* §1.7 animated film grain (CSS-stepped, see globals.css) */}
          <div className="hero-grain absolute inset-0" />
        </div>
      )}

      {/* ── §2.4 locked contrast scrim — lighter than v5 (62% vs 78%) because
             the composition keeps the lower-left text third dark in-frame ── */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(100deg, color-mix(in oklab, var(--canvas-deep) 62%, transparent) 0%, color-mix(in oklab, var(--canvas-deep) 28%, transparent) 42%, transparent 66%)",
        }}
        aria-hidden
      />

      <Container className="relative z-10">
        {/* Eyebrow locked to sage — §2.4 gate run against rendered pixels:
            moss 2.84:1 FAIL (can't reach 4.5:1 on this field), sage 9.28:1 PASS. */}
        <p className="eyebrow mb-6" style={{ color: "var(--sage)" }}>
          A UK marketing agency
        </p>

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
    </section>
  );
}

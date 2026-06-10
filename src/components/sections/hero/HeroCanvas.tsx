"use client";

// ════════════════════════════════════════════════════════════════════════════
// RISE v6 HERO (live WebGL) — the canvas shell. Owns:
//   • the mutable HeroInput bag (window pointermove/scroll → damped in-scene)
//   • the FPS watchdog (spec §3.3): median of first ~90 clean frames < 45fps
//     OR two consecutive 90-frame windows < 30fps → onDegrade() (Hero.tsx
//     swaps to the Direction A video; geometrically identical, no jump)
//   • render-loop pause when the hero scrolls offscreen (perf §3.6)
//   • dev flags: ?heroFps=fail forces a degrade ~2s in; ?heroDebug=1 logs
//     renderer.info (draw calls / triangles) once warm
//
// pointer-events: none — parallax listens on window, the canvas never eats
// clicks on the CTAs above it (spec §3.1). Everything mounts in ONE effect:
// no render-time ref access, nothing for React to re-render.
// ════════════════════════════════════════════════════════════════════════════
import { useEffect, useRef } from "react";
import { createHeroRenderer, type HeroInput } from "./heroRenderer";

export type { HeroInput };

const median = (xs: number[]) => {
  const s = [...xs].sort((a, b) => a - b);
  return s[s.length >> 1];
};

export default function HeroCanvas({
  onDegrade,
  onReady,
}: {
  onDegrade?: () => void;
  onReady?: () => void;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const cbRef = useRef({ onDegrade, onReady });
  useEffect(() => {
    cbRef.current = { onDegrade, onReady };
  });

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const qs = new URLSearchParams(window.location.search);
    const flags = { forceFail: qs.get("heroFps") === "fail", debug: qs.get("heroDebug") === "1" };

    // The mutable input bag — the render loop reads it every frame.
    // lastInput starts at −10 so the ambient idle drift is live from first
    // paint (matches the Direction A loop at rest); real input damps it down.
    const input: HeroInput = {
      targetPx: 0,
      targetPy: 0,
      targetScroll: 0,
      lastInput: -10,
      clock: 0,
      onFrame: undefined,
    };

    // ── FPS watchdog (§3.3) + clock, ticked once per rendered frame ─────────
    const wd = {
      frames: 0,
      dts: [] as number[],
      warmupDone: false,
      lowChecks: 0,
      elapsed: 0,
      fired: false,
      readySent: false,
      debugLogged: false,
    };
    input.onFrame = (dtRaw: number) => {
      input.clock += Math.min(dtRaw, 0.1); // clamp tab-switch jumps

      if (!wd.readySent) {
        wd.readySent = true;
        cbRef.current.onReady?.();
      }
      if (wd.fired) return;
      wd.elapsed += dtRaw;
      wd.frames++;

      if (flags.forceFail && wd.elapsed > 2) {
        wd.fired = true;
        cbRef.current.onDegrade?.();
        return;
      }

      if (flags.debug && !wd.debugLogged && wd.frames === 45) {
        wd.debugLogged = true;
        const i = handle.info();
        console.info(
          `[heroDebug] drawCalls=${i.calls} triangles=${i.triangles} geometries=${i.geometries} textures=${i.textures}`,
        );
      }

      if (wd.frames <= 12) return; // skip shader-compile jank
      if (dtRaw > 0.25) return; // skip tab-switch / loop-resume frames
      wd.dts.push(dtRaw);
      if (wd.dts.length < 90) return;

      const fps = 1 / median(wd.dts);
      wd.dts.length = 0;
      if (!wd.warmupDone) {
        // first clean 90-frame window — the launch gate (floor 45fps)
        wd.warmupDone = true;
        if (fps < 45) {
          wd.fired = true;
          cbRef.current.onDegrade?.();
        }
        return;
      }
      // steady state — two consecutive sub-30fps windows = sustained breach
      if (fps < 30) {
        wd.lowChecks++;
        if (wd.lowChecks >= 2) {
          wd.fired = true;
          cbRef.current.onDegrade?.();
        }
      } else {
        wd.lowChecks = 0;
      }
    };

    // ── window-level input — canvas is pointer-events:none by design ────────
    const onMove = (ev: PointerEvent) => {
      input.targetPx = (ev.clientX / window.innerWidth) * 2 - 1;
      input.targetPy = (ev.clientY / window.innerHeight) * 2 - 1;
      input.lastInput = input.clock;
    };
    const onScroll = () => {
      input.targetScroll = window.scrollY / Math.max(1, window.innerHeight);
      input.lastInput = input.clock;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    input.targetScroll = window.scrollY / Math.max(1, window.innerHeight); // sync, not user input

    // ── renderer + sizing + offscreen pause ──────────────────────────────────
    const handle = createHeroRenderer(canvas, input);
    const size = () => handle.setSize(wrap.clientWidth, wrap.clientHeight);
    size();
    const ro = new ResizeObserver(size);
    ro.observe(wrap);

    let visible = true;
    const io = new IntersectionObserver(([entry]) => {
      const nowVisible = entry.isIntersecting;
      if (nowVisible === visible) return;
      visible = nowVisible;
      if (nowVisible) handle.start();
      else handle.stop(); // §3.6 — zero GPU cost while the hero is offscreen
    });
    io.observe(wrap);
    handle.start();

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      ro.disconnect();
      io.disconnect();
      handle.dispose();
    };
  }, []);

  return (
    <div ref={wrapRef} style={{ position: "absolute", inset: 0, pointerEvents: "none" }} aria-hidden>
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
      />
    </div>
  );
}

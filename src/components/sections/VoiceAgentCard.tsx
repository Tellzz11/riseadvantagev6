"use client";

import { useEffect, useState } from "react";

// VoiceAgentCard — full-width wide-letterbox glimpse of an active voice
// call. Compressed in v3.1 from a tall transcript log to a short ~300px
// rectangular card that reads as a window into a longer call. Only the
// first 4 bubbles are visible; the bottom fades to canvas so the
// conversation appears to continue below the frame.
//
// Transcript content is used verbatim — no paraphrase.

type Side = "ai" | "lead";
type Message = { side: Side; text: string };

// First 4 bubbles of the canonical lead intake — enough to communicate
// the pattern (AI opens, lead engages, AI qualifies, lead answers).
const TRANSCRIPT_HEAD: Message[] = [
  { side: "ai",   text: "Hey, this is Rise — you just filled in our form about getting a quote. Is now a good time for a quick 2-minute chat?" },
  { side: "lead", text: "Yeah go on then." },
  { side: "ai",   text: "Perfect. So the job — is it a one-off tidy up or are you looking for someone regular?" },
  { side: "lead", text: "Regular ideally. Front and back garden." },
];

function useCallTimer(startSeconds = 47) {
  const [s, setS] = useState(startSeconds);
  useEffect(() => {
    const id = setInterval(() => setS((v) => v + 1), 1000);
    return () => clearInterval(id);
  }, []);
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${r.toString().padStart(2, "0")}`;
}

export default function VoiceAgentCard() {
  const timer = useCallTimer(47);

  return (
    <figure
      // Mobile is taller so eyebrow/caption can sit below the transcript
      // bubbles without overlap. Desktop unchanged at 300px.
      className="group relative overflow-hidden rounded-2xl border border-border w-full h-[480px] md:h-[300px]"
      style={{
        background: "var(--canvas-deep)",
      }}
    >
      {/* Soft radial behind the transcript so bubbles lift off the bg */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 65% at 38% 50%, color-mix(in oklab, var(--sage) 10%, transparent) 0%, transparent 70%)",
        }}
      />

      {/* Phone chrome strip — pinned top, full width */}
      <div
        className="absolute left-0 right-0 top-0 flex items-center justify-between"
        style={{
          paddingBlock: "12px",
          paddingInline: "24px",
          color: "var(--text-muted)",
          fontFamily: "var(--font-mono), ui-monospace, monospace",
          fontSize: 11,
          letterSpacing: "0.08em",
          borderBottom: "1px solid color-mix(in oklab, var(--moss-soft) 18%, transparent)",
          background: "color-mix(in oklab, var(--canvas-deep) 92%, transparent)",
        }}
      >
        <div className="flex items-center gap-2">
          <span style={{ color: "var(--text-body)" }}>9:24</span>
          <svg width="14" height="10" viewBox="0 0 14 10" aria-hidden>
            <rect x="0"  y="6" width="2" height="4"  rx="0.5" fill="currentColor" opacity="0.85" />
            <rect x="4"  y="4" width="2" height="6"  rx="0.5" fill="currentColor" opacity="0.85" />
            <rect x="8"  y="2" width="2" height="8"  rx="0.5" fill="currentColor" opacity="0.85" />
            <rect x="12" y="0" width="2" height="10" rx="0.5" fill="currentColor" opacity="0.85" />
          </svg>
        </div>

        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full"
          style={{
            background: "color-mix(in oklab, var(--sage) 14%, transparent)",
            border: "1px solid color-mix(in oklab, var(--sage) 30%, transparent)",
            color: "var(--text-strong)",
            fontFamily: "var(--font-mono), ui-monospace, monospace",
            fontSize: 11,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
          }}
        >
          <span
            aria-hidden
            className="inline-block w-1.5 h-1.5 rounded-full"
            style={{
              background: "#7DDE9A",
              boxShadow: "0 0 0 0 rgba(125, 222, 154, 0.6)",
              animation: "va-pulse 1.6s ease-out infinite",
            }}
          />
          Live call
          <span style={{ color: "var(--text-body)" }}>· {timer}</span>
        </div>

        <div className="flex items-center" aria-hidden>
          <svg width="22" height="11" viewBox="0 0 22 11">
            <rect x="0.5" y="0.5" width="19" height="10" rx="2" ry="2" fill="none" stroke="currentColor" opacity="0.55" />
            <rect x="20.5" y="3.5" width="1.5" height="4" rx="0.5" fill="currentColor" opacity="0.55" />
            <rect x="2" y="2" width="14" height="7" rx="1" fill="currentColor" opacity="0.85" />
          </svg>
        </div>
      </div>

      {/* Transcript — left-offset within the card so the eyebrow/caption
          can sit beneath the bubbles without crowding. Tight bubble gap.
          Mobile: large bottom inset so bubbles never enter the caption
          zone. Desktop: original bottom: 0. overflow-hidden so bubbles
          that don't fit at narrow widths clip INSIDE the fade instead of
          slicing hard across the caption zone (390px audit fix). */}
      <div
        className="absolute overflow-hidden bottom-[140px] md:bottom-0"
        style={{
          left: "max(24px, 4vw)",
          right: "max(24px, 4vw)",
          top: 50,
        }}
      >
        <div
          className="flex flex-col h-full"
          style={{
            gap: 6,
            maxWidth: 720,
          }}
        >
          {TRANSCRIPT_HEAD.map((m, i) => (
            <Bubble key={i} side={m.side} text={m.text} />
          ))}
        </div>

        {/* Bottom fade — suggests the call continues below the frame.
            Ends fully opaque so the overflow clip line never shows. */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-0 right-0"
          style={{
            bottom: 0,
            height: 120,
            background:
              "linear-gradient(180deg, transparent 0%, color-mix(in oklab, var(--canvas-deep) 70%, transparent) 40%, var(--canvas-deep) 85%, var(--canvas-deep) 100%)",
          }}
        />
      </div>

      {/* Eyebrow + caption — pinned bottom-left, sits over the fade */}
      <figcaption
        className="absolute"
        style={{
          left: "max(24px, 4vw)",
          bottom: 18,
          maxWidth: 360,
          zIndex: 2,
        }}
      >
        <p
          className="eyebrow"
          style={{
            color: "var(--text-strong)",
            opacity: 0.78,
            fontFamily: "var(--font-mono), ui-monospace, monospace",
            letterSpacing: "0.18em",
          }}
        >
          AI · VOICE AGENT
        </p>
        <p
          className="mt-1.5 text-balance"
          style={{
            color: "var(--text-strong)",
            fontFamily:
              "var(--font-space-grotesk), var(--font-sans), system-ui, sans-serif",
            fontSize: "clamp(15px, 1.2vw, 18px)",
            lineHeight: 1.4,
          }}
        >
          Qualifies. Books. No human needed.
        </p>
      </figcaption>

      <style>{`
        @keyframes va-pulse {
          0%   { box-shadow: 0 0 0 0   rgba(125, 222, 154, 0.55); }
          70%  { box-shadow: 0 0 0 9px rgba(125, 222, 154, 0);   }
          100% { box-shadow: 0 0 0 0   rgba(125, 222, 154, 0);   }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="va-pulse"] { animation: none !important; }
        }
      `}</style>
    </figure>
  );
}

function Bubble({ side, text }: { side: Side; text: string }) {
  const isAi = side === "ai";
  return (
    <div
      className="flex"
      style={{ justifyContent: isAi ? "flex-start" : "flex-end" }}
    >
      <div
        style={{
          maxWidth: "72%",
          padding: "7px 12px",
          borderRadius: 16,
          borderBottomLeftRadius:  isAi ? 4 : 16,
          borderBottomRightRadius: isAi ? 16 : 4,
          background: isAi ? "#0E2725" : "#163230",
          border: isAi
            ? "1px solid color-mix(in oklab, var(--moss-soft) 22%, transparent)"
            : "1px solid color-mix(in oklab, var(--moss-soft) 32%, transparent)",
          color: "var(--text-strong)",
          fontFamily:
            "var(--font-space-grotesk), var(--font-sans), system-ui, sans-serif",
          fontSize: 13,
          lineHeight: 1.4,
          letterSpacing: "0.005em",
        }}
      >
        {text}
      </div>
    </div>
  );
}

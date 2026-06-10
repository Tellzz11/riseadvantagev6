"use client";

import { useEffect, useRef } from "react";

// ── Cal.com inline embed ────────────────────────────────────────────────
// Bootstraps the official embed.js, mounts the month-view inline calendar,
// themes it to BD-005 (dark canvas + lime brand accent), and prefills the
// lead's details from the personalised email link.
//
// Live Cal.com event: "Discovery Call", 20 min, Google Meet location, with
// custom booking fields (phone + business name required, website optional).
// Created via the Cal v2 API on 2026-06-04 (event-type id 5908131).
const CAL_LINK = "riseadvantage/discovery";

export type CalPrefill = Record<string, string>;

type CalFn = ((...args: unknown[]) => void) & {
  loaded?: boolean;
  ns?: Record<string, unknown>;
  q?: unknown[];
};

export default function CalEmbed({ prefill }: { prefill: CalPrefill }) {
  const booted = useRef(false);

  useEffect(() => {
    if (booted.current) return;
    booted.current = true;

    // Minimal TS-safe adaptation of the official Cal embed bootstrap.
    const w = window as unknown as { Cal?: CalFn };
    if (!w.Cal) {
      const cal: CalFn = function (...args: unknown[]) {
        if (!cal.loaded) {
          cal.ns = {};
          cal.q = cal.q || [];
          const s = document.createElement("script");
          s.src = "https://app.cal.com/embed/embed.js";
          s.async = true;
          document.head.appendChild(s);
          cal.loaded = true;
        }
        (cal.q as unknown[]).push(args);
      } as CalFn;
      w.Cal = cal;
    }

    const Cal = w.Cal;
    Cal("init", { origin: "https://app.cal.com" });
    Cal("inline", {
      elementOrSelector: "#cal-discovery",
      calLink: CAL_LINK,
      layout: "month_view",
      config: { theme: "dark", ...prefill },
    });
    Cal("ui", {
      theme: "dark",
      hideEventTypeDetails: false,
      styles: { branding: { brandColor: "#D8FF85" } },
    });
  }, [prefill]);

  const fallbackHref = `https://cal.com/${CAL_LINK}`;

  return (
    <div className="w-full">
      <div
        id="cal-discovery"
        className="min-h-[640px] w-full overflow-hidden rounded-xl border border-border-strong bg-surface"
      />
      <p className="mt-4 text-center text-sm text-text-muted">
        Calendar not loading?{" "}
        <a
          href={fallbackHref}
          className="text-accent-lime underline underline-offset-4 hover:opacity-80"
        >
          Book here instead →
        </a>
      </p>
    </div>
  );
}

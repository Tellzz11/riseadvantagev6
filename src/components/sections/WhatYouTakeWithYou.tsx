import Image from "next/image";
import Container from "./_Container";

// WhatYouTakeWithYou — "the infrastructure you keep" moment.
// 2026-06-10: the off-palette midnight-navy surface (#0A1628 — old v2
// brief) is retired for BD-005 tokens (--canvas-deep / --canvas-soft) per
// docs/research/imagery-specs-2026-06-10.md Asset 3a. Imagery upgraded to
// crops of the BD-005-correct dashboard.webp / workflow.webp composites
// (cream-tinted MacBook screens on the teal field — Asset 3b Option A).
// Hosts TWO real-work assets — the dashboard you operate on day-to-day,
// and the GHL workflow library that runs underneath it.

const SURFACE = "var(--canvas-deep)";
const INSET   = "var(--canvas-soft)";

const DELIVERABLES = [
  { label: "Campaign account",   body: "Meta + Google + GHL accounts in your name, with the creative + audience structures we built." },
  { label: "Landing pages",      body: "Built on your domain, your Vercel, your repo. Lighthouse-passing. Re-editable." },
  { label: "Workflow library",   body: "GHL automations + the agent prompts that run them. Documented." },
  { label: "Brand operating doc", body: "One markdown source-of-truth for tone, palette, repeatable creative briefs." },
];

export default function WhatYouTakeWithYou() {
  return (
    <section
      id="take-with-you"
      style={{
        background: SURFACE,
        paddingBlock: "var(--gap-11xl)",
        borderTop: "1px solid var(--border-default)",
      }}
    >
      <Container>
        <div className="grid gap-12 md:grid-cols-12 items-center">
          {/* Image column — two MacBook composites stacked. Both shown
              at their native ~1.52:1 aspect so nothing crops, sitting
              directly on the canvas-deep surface (no card chrome). */}
          <div className="md:col-span-7 flex flex-col gap-5">
            <figure
              className="relative overflow-hidden rounded-2xl border"
              style={{
                aspectRatio: "1.517 / 1",
                borderColor: "var(--border-default)",
                background: INSET,
              }}
            >
              <Image
                src="/images/real-work/dashboard-composite.png"
                alt="MacBook showing the Rise reporting dashboard — pipeline, funnel and stage distribution."
                fill
                sizes="(min-width: 768px) 58vw, 100vw"
                className="object-contain"
                priority
              />
              <figcaption
                className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full px-3 py-1.5"
                style={{
                  background: "color-mix(in oklab, var(--canvas-deep) 70%, transparent)",
                  border: "1px solid color-mix(in oklab, var(--text-body) 20%, transparent)",
                  backdropFilter: "blur(8px)",
                  fontFamily: "var(--font-mono), ui-monospace, monospace",
                  fontSize: 11,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--text-body)",
                }}
              >
                <span
                  aria-hidden
                  className="inline-block w-1.5 h-1.5 rounded-full"
                  style={{ background: "var(--sage)" }}
                />
                Reporting · live
              </figcaption>
            </figure>

            <figure
              className="relative overflow-hidden rounded-2xl border"
              style={{
                aspectRatio: "1.517 / 1",
                borderColor: "var(--border-default)",
                background: INSET,
              }}
            >
              <Image
                src="/images/real-work/workflow-composite.png"
                alt="MacBook showing a multi-branch GoHighLevel workflow Rise built — the automations that compound while you sleep."
                fill
                sizes="(min-width: 768px) 58vw, 100vw"
                className="object-contain"
              />
              <figcaption
                className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full px-3 py-1.5"
                style={{
                  background: "color-mix(in oklab, var(--canvas-deep) 70%, transparent)",
                  border: "1px solid color-mix(in oklab, var(--text-body) 20%, transparent)",
                  backdropFilter: "blur(8px)",
                  fontFamily: "var(--font-mono), ui-monospace, monospace",
                  fontSize: 11,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--text-body)",
                }}
              >
                <span
                  aria-hidden
                  className="inline-block w-1.5 h-1.5 rounded-full"
                  style={{ background: "var(--sage)" }}
                />
                Workflow library
              </figcaption>
            </figure>
          </div>

          {/* Copy column */}
          <div className="md:col-span-5">
            <p className="eyebrow mb-6">What you take with you</p>
            <h2
              className="font-sans text-text-strong text-balance"
              style={{
                fontSize: "clamp(32px, 4vw, 56px)",
                lineHeight: 1.1,
                fontWeight: 400,
                letterSpacing: "-0.01em",
              }}
            >
              The work stays. <em>Even after we stop.</em>
            </h2>

            <p className="mt-8 text-text-body max-w-md">
              Every engagement ends with the infrastructure we built for you in
              your name, on your stack. No agency lock-in. No black box you
              can&rsquo;t open. No platform you have to rent forever.
            </p>

            <ul
              className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-px"
              style={{ background: "var(--border-default)" }}
            >
              {DELIVERABLES.map((d) => (
                <li
                  key={d.label}
                  className="p-6"
                  style={{ background: INSET }}
                >
                  <p
                    className="text-text-strong"
                    style={{ fontSize: "15px", lineHeight: 1.4 }}
                  >
                    {d.label}
                  </p>
                  <p
                    className="mt-2 text-sm"
                    style={{ color: "var(--eucalyptus)" }}
                  >
                    {d.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}

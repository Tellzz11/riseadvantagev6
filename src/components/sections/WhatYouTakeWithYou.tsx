import Image from "next/image";
import Container from "./_Container";

// WhatYouTakeWithYou — v3 element brought into v6. Outcome-focused:
// the actual deliverables you own after the engagement ends. Uses the
// generated reflector/Void & Light tile as a single editorial image to
// the right of a deliverables list. Cream surface? No — this lives in
// the dark block as a quieter atelier statement. Surface: pine (slightly
// lifted from canvas) for tonal-green variation per Theo's note.

const DELIVERABLES = [
  { label: "Campaign account",  body: "Meta + Google + GHL accounts in your name, with the creative + audience structures we built." },
  { label: "Landing pages",      body: "Built on your domain, your Vercel, your repo. Lighthouse-passing. Re-editable." },
  { label: "Workflow library",   body: "GHL automations + the agent prompts that run them. Documented." },
  { label: "Brand operating doc", body: "One markdown source-of-truth for tone, palette, repeatable creative briefs." },
];

export default function WhatYouTakeWithYou() {
  return (
    <section
      id="take-with-you"
      style={{
        background: "var(--canvas)",
        paddingBlock: "var(--gap-11xl)",
        borderTop: "1px solid var(--border-default)",
      }}
    >
      <Container>
        <div className="grid gap-12 md:grid-cols-12 items-center">
          {/* Image: Void & Light gallery installation tile */}
          <figure className="md:col-span-6 relative aspect-square overflow-hidden rounded-2xl border border-border">
            <Image
              src="/images/collage/tile-7-reflectors.png"
              alt="Two off-white reflector panels in a deep teal-green gallery space, captioned 'Void & Light'."
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </figure>

          {/* Copy */}
          <div className="md:col-span-6">
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

            <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-px" style={{ background: "var(--border-default)" }}>
              {DELIVERABLES.map((d) => (
                <li
                  key={d.label}
                  className="p-6"
                  style={{ background: "var(--pine)" }}
                >
                  <p className="text-text-strong" style={{ fontSize: "15px", lineHeight: 1.4 }}>
                    {d.label}
                  </p>
                  <p className="mt-2 text-sm" style={{ color: "var(--eucalyptus)" }}>
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

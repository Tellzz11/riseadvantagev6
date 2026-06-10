import Link from "next/link";
import CalEmbed, { type CalPrefill } from "./CalEmbed";

export type DiscoveryProps = {
  biz: string;
  name: string;
  email: string;
  phone: string;
  website: string;
  leaks: string[];
};

// Server component. Renders the personalised proof strip beside the Cal
// embed. Everything to the left of the calendar is driven by the URL params
// the cold-email link carries (?biz=&name=&leaks=Foo|Bar|Baz …), so each
// prospect lands on a page that already speaks to their business.
export default function DiscoverySection({
  biz,
  name,
  email,
  phone,
  website,
  leaks,
}: DiscoveryProps) {
  const hasBiz = biz.trim().length > 0;
  const hasLeaks = leaks.length > 0;

  // Cal prefill — keys map to the live event's booking-field slugs
  // (name, email, phone, business-name, website). The cold-email link carries
  // these as URL params, so the lead lands with the form already filled in.
  const prefill: CalPrefill = {};
  if (name) prefill.name = name;
  if (email) prefill.email = email;
  if (phone) prefill.phone = phone;
  if (hasBiz) prefill["business-name"] = biz;
  if (website) prefill.website = website;

  return (
    <main className="min-h-screen bg-canvas-deep text-text-body">
      {/* lightweight header — logo back to home */}
      <header className="border-b border-border">
        <div
          className="mx-auto flex items-center justify-between py-5"
          style={{ maxWidth: "var(--container-max)", paddingInline: "var(--container-margin)" }}
        >
          <Link href="/" className="text-text-strong">
            <span
              className="italic-display text-2xl"
              style={{ fontFamily: "var(--font-fraunces)", fontStyle: "italic" }}
            >
              Rise
            </span>{" "}
            <span style={{ fontFamily: "var(--font-space-grotesk)" }}>Advantage</span>
          </Link>
          <span className="eyebrow hidden sm:block">Game Plan Call</span>
        </div>
      </header>

      <div
        className="mx-auto grid grid-cols-1 gap-12 py-16 lg:grid-cols-[1fr_1.1fr] lg:gap-16 lg:py-24"
        style={{ maxWidth: "var(--container-max)", paddingInline: "var(--container-margin)" }}
      >
        {/* ── LEFT: personalised proof strip ─────────────────────────────── */}
        <div className="lg:sticky lg:top-16 lg:self-start">
          <p className="eyebrow mb-5">
            {hasBiz ? `For ${biz}` : "Rise Advantage"}
          </p>

          <h1
            className="text-balance text-text-strong"
            style={{
              fontSize: "clamp(34px, 4.5vw, 56px)",
              lineHeight: 1.08,
              fontWeight: 400,
              letterSpacing: "-0.01em",
            }}
          >
            {hasBiz ? (
              <>
                Book your <em>{biz}</em> game plan call
              </>
            ) : (
              <>
                Book your <em>free</em> game plan call
              </>
            )}
          </h1>

          <p className="mt-6 max-w-md text-lg text-text-body">
            {hasLeaks ? (
              <>
                On a quick 20-minute call I&rsquo;ll walk you through the{" "}
                {leaks.length}{" "}
                {leaks.length === 1 ? "gap" : "gaps"}{" "}
                I spotted that are quietly costing you work &mdash; and exactly
                how we&rsquo;d fix them.
              </>
            ) : (
              <>
                Most local businesses are quietly losing work they never see
                &mdash; calls that ring out, enquiries that slip through, and
                leads no one follows up. Pick a time that suits you and
                we&rsquo;ll show you where it&rsquo;s happening &mdash; and the
                simplest way to fix it.
              </>
            )}
          </p>

          {/* what we found — only when the link carries leaks */}
          {hasLeaks && (
            <div className="mt-8">
              <p className="eyebrow mb-4">What we found</p>
              <ul className="space-y-3">
                {leaks.map((leak, i) => (
                  <li key={i} className="flex gap-3 text-text-body">
                    <span
                      aria-hidden
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-lime"
                    />
                    <span>{leak}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* proof card */}
          <div className="mt-10 rounded-xl border border-border-strong bg-surface p-6">
            <p className="text-text-body">
              <span className="text-text-strong">3&times; the enquiries in 14 days.</span>{" "}
              We did exactly this for a two-women London gardening business —
              tripled their enquiries in a fortnight, with 85% converting to paid
              work.
            </p>
          </div>

          {/* reassurance row */}
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-text-muted">
            <span>20 minutes</span>
            <span aria-hidden>·</span>
            <span>Google Meet</span>
            <span aria-hidden>·</span>
            <span>No obligation</span>
          </div>
        </div>

        {/* ── RIGHT: the calendar ────────────────────────────────────────── */}
        <div>
          <CalEmbed prefill={prefill} />
        </div>
      </div>
    </main>
  );
}

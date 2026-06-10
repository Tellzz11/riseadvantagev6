import Container from "./_Container";

// SelectedWork — H&O case study. HR-1: ONLY use the verified pair
// £21.60 → £6.88. No multiplier. No 6.7×. Per CARRY-OVER §4.
// 2026-05-19: GSAP reveals removed (Superside-pattern, audit §1.5).
// Content renders directly, no opacity:0 initial state.

export default function SelectedWork() {
  return (
    <section
      id="selected-work"
      style={{ background: "var(--canvas-light)", paddingBlock: "var(--gap-10xl)" }}
    >
      <Container>
        <p className="eyebrow mb-8" style={{ color: "var(--text-on-light-muted)" }}>
          Selected work
        </p>

        <div className="grid md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-7">
            <h2
              className="font-sans text-balance"
              style={{
                fontSize: "clamp(32px, 4.5vw, 60px)",
                lineHeight: 1.1,
                fontWeight: 400,
                letterSpacing: "-0.01em",
                color: "var(--text-on-light)",
              }}
            >
              From <em>£21.60</em> to <em>£6.88</em> cost per lead in two weeks.
            </h2>

            <p className="mt-8 max-w-xl" style={{ color: "var(--text-on-light-muted)" }}>
              H&amp;O Gardening — a London gardening business with a quiet
              existing offer and zero performance marketing in place. We
              rebuilt the funnel, ran a Meta + Google sweep, fixed the lead
              capture, and shipped weekly creative.
            </p>

            <ul className="mt-8 space-y-3 text-sm" style={{ color: "var(--text-on-light-muted)" }}>
              <li>• Brand-led Meta video ads</li>
              <li>• Custom GHL pipeline with notes, a schedule, and booking slots the owner can add, edit and reorder</li>
              <li>• PWA lead tracker shipped to her phone</li>
            </ul>
          </div>

          <aside className="md:col-span-5 md:sticky md:top-32">
            <div
              className="rounded-2xl p-8"
              style={{
                background: "var(--canvas-light-soft)",
                border: "1px solid rgba(10,33,31,0.1)",
              }}
            >
              <p className="eyebrow" style={{ color: "var(--text-on-light-muted)" }}>
                Cost per lead
              </p>

              <div className="mt-6 flex items-baseline justify-between gap-6">
                <div>
                  <p className="text-sm" style={{ color: "var(--text-on-light-muted)" }}>Before</p>
                  <p
                    className="font-display italic line-through"
                    style={{
                      fontSize: "clamp(40px, 4vw, 56px)",
                      lineHeight: 1,
                      color: "var(--text-on-light)",
                      textDecorationColor: "var(--text-on-light-faint)",
                    }}
                  >
                    £21.60
                  </p>
                </div>
                <span aria-hidden style={{ color: "var(--text-on-light-faint)" }}>→</span>
                <div className="text-right">
                  <p className="text-sm" style={{ color: "var(--text-on-light-muted)" }}>After</p>
                  <p
                    style={{
                      fontSize: "clamp(48px, 5vw, 72px)",
                      lineHeight: 1,
                      fontWeight: 400,
                      color: "var(--text-on-light)",
                    }}
                  >
                    £6.88
                  </p>
                </div>
              </div>

              <p className="mt-8 text-sm" style={{ color: "var(--text-on-light-muted)" }}>
                Two weeks of campaign work, lead tracker rebuild, and creative
                rotation. Numbers from the H&amp;O Meta Ads Manager account.
              </p>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}

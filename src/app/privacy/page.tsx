import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/sections/_Container";
import LogoLockup from "@/components/brand/LogoLockup";

export const metadata: Metadata = {
  title: "Privacy policy — Rise Advantage",
  description:
    "What Rise Advantage collects through this site, why, how long we keep it, and your rights under UK GDPR.",
  alternates: { canonical: "/privacy" },
};

// Privacy policy — UK GDPR basics for a single contact form + no-tracking
// site. Plain language, no boilerplate theatre. Dated so changes are
// auditable.

const LAST_UPDATED = "10 June 2026";

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="font-sans text-text-strong mt-14 mb-4"
      style={{ fontSize: "clamp(22px, 2vw, 28px)", lineHeight: 1.2, fontWeight: 400 }}
    >
      {children}
    </h2>
  );
}

export default function PrivacyPage() {
  return (
    <>
      <main className="flex-1 bg-canvas">
        <Container className="max-w-3xl mx-auto" >
          <div style={{ paddingBlock: "var(--gap-9xl)" }}>
            <Link href="/" aria-label="Back to the Rise Advantage homepage">
              <LogoLockup variant="on-dark" size={30} />
            </Link>

            <h1
              className="font-sans text-text-strong text-balance mt-14"
              style={{ fontSize: "clamp(36px, 4.5vw, 56px)", lineHeight: 1.1, fontWeight: 400, letterSpacing: "-0.01em" }}
            >
              Privacy <em>policy</em>
            </h1>
            <p className="mt-4 text-text-muted text-sm">Last updated {LAST_UPDATED}</p>

            <div className="text-text-body" style={{ lineHeight: 1.65 }}>
              <H2>Who we are</H2>
              <p>
                Rise Advantage is a UK marketing agency. We are the data
                controller for personal information collected through this
                website. You can reach us at{" "}
                <a href="mailto:theo@riseadvantage.co.uk" className="underline underline-offset-4 hover:text-text-strong transition-colors">
                  theo@riseadvantage.co.uk
                </a>
                .
              </p>

              <H2>What we collect</H2>
              <p>
                The only personal information this site collects is what you
                type into the contact form: your name, email address, revenue
                band, what you&rsquo;ve tried so far, your primary marketing
                channel, and your message. Our hosting provider (Vercel) also
                processes your IP address in standard server logs and we use it
                transiently for rate-limiting to keep spam out.
              </p>
              <p className="mt-4">
                This site sets no analytics or advertising cookies and runs no
                third-party trackers.
              </p>

              <H2>Why we collect it, and the lawful basis</H2>
              <p>
                We use your form submission for one thing: replying to your
                enquiry and having a useful first conversation about your
                business. Our lawful basis under UK GDPR is legitimate interest
                — you contacted us, we respond. We don&rsquo;t add you to a
                marketing list, and we don&rsquo;t sell or share your details
                for marketing.
              </p>

              <H2>Where it goes</H2>
              <p>
                Form submissions are delivered to our inbox by Resend (an email
                delivery provider) and the site is hosted on Vercel. Both act
                as processors on our behalf. Nothing else touches the data.
              </p>

              <H2>How long we keep it</H2>
              <p>
                We keep enquiry emails for as long as the conversation is live,
                and for up to 24 months afterwards in case the work picks back
                up. Ask us to delete your details sooner and we will.
              </p>

              <H2>Your rights</H2>
              <p>
                Under UK GDPR you can ask us for a copy of the personal data we
                hold about you, ask us to correct it, delete it, restrict how
                we use it, or object to our use of it. Email{" "}
                <a href="mailto:theo@riseadvantage.co.uk" className="underline underline-offset-4 hover:text-text-strong transition-colors">
                  theo@riseadvantage.co.uk
                </a>{" "}
                and we&rsquo;ll sort it. If you&rsquo;re not happy with how we
                handle it, you can complain to the Information
                Commissioner&rsquo;s Office at{" "}
                <a href="https://ico.org.uk" className="underline underline-offset-4 hover:text-text-strong transition-colors" rel="noopener noreferrer" target="_blank">
                  ico.org.uk
                </a>
                .
              </p>

              <H2>Changes</H2>
              <p>
                If we change how this site handles personal data, we&rsquo;ll
                update this page and the date at the top.
              </p>
            </div>

            <p className="mt-16">
              <Link href="/" className="text-text-muted hover:text-text-strong transition-colors text-sm">
                ← Back to the site
              </Link>
            </p>
          </div>
        </Container>
      </main>
    </>
  );
}

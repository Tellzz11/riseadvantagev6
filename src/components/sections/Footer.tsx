import Container from "./_Container";
import LogoLockup from "@/components/brand/LogoLockup";

// Footer — minimal. Zero-nav contract continues: just a wordmark, a
// small contact link, and the "built on our own infrastructure" line
// the operator kept from the v5 footer audit.

export default function Footer() {
  return (
    <footer className="bg-canvas-deep border-t border-border-faint" style={{ paddingBlock: "var(--gap-7xl)" }}>
      <Container>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">
          <div>
            <LogoLockup variant="on-dark" size={34} />
            <p className="mt-4 text-text-muted text-sm max-w-md">
              A UK marketing agency that runs the work and builds the system
              that compounds it.
            </p>
          </div>

          <div className="text-sm text-text-muted md:text-right">
            <p>
              <a href="#contact" className="hover:text-text-strong transition-colors">
                Talk to us →
              </a>
            </p>
            <p className="mt-3">
              <a
                href="mailto:theo@riseadvantage.co.uk"
                className="hover:text-text-strong transition-colors"
              >
                theo@riseadvantage.co.uk
              </a>
            </p>
            <p className="mt-3">
              <a href="/privacy" className="hover:text-text-strong transition-colors">
                Privacy policy
              </a>
            </p>
            <p className="mt-6 text-text-faint">
              © {new Date().getFullYear()} Rise Advantage. Built on our own
              infrastructure.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}

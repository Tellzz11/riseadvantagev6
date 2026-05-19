import Container from "./_Container";

// Footer — minimal. Zero-nav contract continues: just a wordmark, a
// small contact link, and the "built on our own infrastructure" line
// the operator kept from the v5 footer audit.

export default function Footer() {
  return (
    <footer className="bg-canvas-deep border-t border-border-faint" style={{ paddingBlock: "var(--gap-7xl)" }}>
      <Container>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">
          <div>
            <p className="font-display italic text-text-strong text-2xl">Rise · Advantage</p>
            <p className="mt-2 text-text-muted text-sm max-w-md">
              A UK marketing agency that runs the work and builds the system
              that compounds it.
            </p>
          </div>

          <div className="text-sm text-text-muted">
            <a href="#contact" className="hover:text-text-strong transition-colors">
              Talk to us →
            </a>
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

import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Fraunces,
  Space_Grotesk,
  Instrument_Serif,
} from "next/font/google";
// import localFont from "next/font/local"; // re-enable for PP Editorial swap-back
import SmoothScroll from "@/components/scroll/SmoothScroll";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Logo lockup pairing — Fraunces italic ("Rise") + Space Grotesk
// regular ("Advantage"). Scoped to the brand mark only, not body type.
// Hero perf pass (audit B2) font subsetting: only italic-400 Fraunces and
// regular-400 Space Grotesk are ever rendered (LogoLockup + DiscoverySection
// + HeroCollage/VoiceAgentCard, all fontWeight 400; the OG image uses its own
// bundled TTFs). The 500 weights were dead bytes on the critical path.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["italic"],
  weight: ["400"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400"],
});

// Display italic — Instrument Serif (Google Fonts, OFL). Stand-in for
// PP Editorial New until Theo buys the Pangram Pangram commercial
// licence. Swap-back plan documented at:
//   memory/project_rise_v6_font_swap.md
//
// When the PP Editorial commercial licence is in hand:
//   1. Restore the `localFont` import above.
//   2. Re-enable the `ppEditorial` block below (kept as a commented
//      stub so the swap is a one-line revert).
//   3. Swap `${instrumentSerif.variable}` for `${ppEditorial.variable}`
//      in the <html> className.
//   4. Drop the licensed .woff2 files into ./fonts/pp-editorial-new/
//      (the existing free-for-personal-use files there are NOT licensed
//      for commercial / apex use — they must be replaced with the
//      licensed kit before re-enabling).
const instrumentSerif = Instrument_Serif({
  variable: "--font-pp-editorial", // keeps every site-side reference working unchanged
  subsets: ["latin"],
  weight: "400",
  // italic ONLY — every --font-display use site-wide is italic (the em/i base
  // rule + the three explicit `font-display italic` callsites). The upright
  // face was never rendered; dropping it halves this font's payload.
  style: ["italic"],
});

// const ppEditorial = localFont({
//   variable: "--font-pp-editorial",
//   display: "swap",
//   src: [
//     { path: "./fonts/pp-editorial-new/PPEditorialNew-Ultralight.woff2", weight: "200", style: "normal" },
//     { path: "./fonts/pp-editorial-new/PPEditorialNew-UltralightItalic.woff2", weight: "200", style: "italic" },
//     { path: "./fonts/pp-editorial-new/PPEditorialNew-Regular.woff2", weight: "400", style: "normal" },
//     { path: "./fonts/pp-editorial-new/PPEditorialNew-Italic.woff2", weight: "400", style: "italic" },
//     { path: "./fonts/pp-editorial-new/PPEditorialNew-Ultrabold.woff2", weight: "800", style: "normal" },
//     { path: "./fonts/pp-editorial-new/PPEditorialNew-UltraboldItalic.woff2", weight: "800", style: "italic" },
//   ],
// });

const SITE_URL = "https://riseadvantage.co.uk";
const SITE_TITLE = "Rise Advantage — Campaigns today. Capability tomorrow.";
const SITE_DESCRIPTION =
  "A UK marketing agency that runs the work and builds the system that compounds it. Founder-led, agent-augmented, no fluff.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Rise Advantage",
    locale: "en_GB",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    // og:image is supplied by src/app/opengraph-image.tsx (BD-005 card).
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

// Organization + ProfessionalService JSON-LD. Honest-claims only: no
// certifications, no fabricated review counts, no staged stats (SCR-9).
const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Rise Advantage",
      url: SITE_URL,
      logo: `${SITE_URL}/brand/logo-mark-on-dark.png`,
      email: "theo@riseadvantage.co.uk",
      slogan: "Campaigns today. Capability tomorrow.",
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#service`,
      name: "Rise Advantage",
      url: SITE_URL,
      image: `${SITE_URL}/brand/logo-mark-on-dark.png`,
      email: "theo@riseadvantage.co.uk",
      description: SITE_DESCRIPTION,
      areaServed: { "@type": "Country", name: "United Kingdom" },
      knowsAbout: [
        "Paid social advertising",
        "Google Ads",
        "CRM pipelines and automation",
        "Website design and build",
        "AI voice agents",
      ],
      parentOrganization: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="rise"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} ${fraunces.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-canvas text-text-body">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// HR-1 DEPLOY GATE — these .woff2 files are converted from PP Editorial
// New's "Free for Personal Use" EULA (Pangram Pangram, May 2021). They
// are present in v6 for development + Vercel preview deploys only.
// PROD cutover to riseadvantage.co.uk apex is BLOCKED until the
// commercial Pangram Pangram licence is purchased (~$269). Audit trail
// in docs/research/CARRY-OVER-rise-v6.md §6 row 6.
const ppEditorial = localFont({
  variable: "--font-pp-editorial",
  display: "swap",
  src: [
    { path: "./fonts/pp-editorial-new/PPEditorialNew-Ultralight.woff2", weight: "200", style: "normal" },
    { path: "./fonts/pp-editorial-new/PPEditorialNew-UltralightItalic.woff2", weight: "200", style: "italic" },
    { path: "./fonts/pp-editorial-new/PPEditorialNew-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/pp-editorial-new/PPEditorialNew-Italic.woff2", weight: "400", style: "italic" },
    { path: "./fonts/pp-editorial-new/PPEditorialNew-Ultrabold.woff2", weight: "800", style: "normal" },
    { path: "./fonts/pp-editorial-new/PPEditorialNew-UltraboldItalic.woff2", weight: "800", style: "italic" },
  ],
});

export const metadata: Metadata = {
  title: "Rise Advantage — Campaigns today. Capability tomorrow.",
  description:
    "A UK marketing agency that runs the work and builds the system that compounds it. Founder-led, agent-augmented, no fluff.",
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
      className={`${geistSans.variable} ${geistMono.variable} ${ppEditorial.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-canvas text-text-body">
        {children}
      </body>
    </html>
  );
}

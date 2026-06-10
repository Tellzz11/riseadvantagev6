import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Branded OG card — BD-005: deep teal field, cream type, moss accents.
// Wordmark mirrors LogoLockup (brushstroke mark + Fraunces italic "Rise"
// + Space Grotesk "Advantage") and the hero line provides the one-line
// positioning. Fonts are static OFL TTFs committed at src/assets/og/
// (satori can't consume the variable/woff2 builds next/font uses).

export const alt = "Rise Advantage — Campaigns today. Capability tomorrow.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const assetDir = join(process.cwd(), "src", "assets", "og");
  const [fraunces, grotesk, groteskMedium, mark] = await Promise.all([
    readFile(join(assetDir, "Fraunces-Italic.ttf")),
    readFile(join(assetDir, "SpaceGrotesk-Regular.ttf")),
    readFile(join(assetDir, "SpaceGrotesk-Medium.ttf")),
    readFile(join(process.cwd(), "public", "brand", "logo-mark-on-dark.png")),
  ]);
  const markSrc = `data:image/png;base64,${mark.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: "#0A211F",
          backgroundImage:
            "radial-gradient(ellipse 70% 90% at 85% 10%, rgba(79,117,110,0.35) 0%, rgba(10,33,31,0) 65%)",
        }}
      >
        {/* Wordmark lockup */}
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={markSrc} width={86} height={60} alt="" />
          <div style={{ display: "flex", alignItems: "baseline" }}>
            <span
              style={{
                fontFamily: "Fraunces",
                fontStyle: "italic",
                fontSize: 58,
                color: "#F0F3E8",
                marginRight: 2,
              }}
            >
              Rise
            </span>
            <span
              style={{
                fontFamily: "SpaceGrotesk",
                fontWeight: 400,
                fontSize: 50,
                color: "#F0F3E8",
              }}
            >
              Advantage
            </span>
          </div>
        </div>

        {/* Positioning line */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "baseline",
              fontSize: 84,
              lineHeight: 1.05,
              letterSpacing: "-1px",
            }}
          >
            <span style={{ fontFamily: "SpaceGrotesk", fontWeight: 500, color: "#F0F3E8" }}>
              Campaigns today.&nbsp;
            </span>
            <span style={{ fontFamily: "Fraunces", fontStyle: "italic", color: "#C7D2BE" }}>
              Capability tomorrow.
            </span>
          </div>
          <div
            style={{
              fontFamily: "SpaceGrotesk",
              fontWeight: 400,
              fontSize: 28,
              color: "#8FB0A4",
            }}
          >
            A UK marketing agency that runs the work and builds the system that compounds it.
          </div>
        </div>

        {/* Footer line */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "SpaceGrotesk",
            fontSize: 22,
            letterSpacing: "3px",
            color: "#4F756E",
          }}
        >
          <span>RISEADVANTAGE.CO.UK</span>
          <span>FOUNDER-LED · AGENT-AUGMENTED</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Fraunces", data: fraunces, style: "italic", weight: 400 },
        { name: "SpaceGrotesk", data: grotesk, style: "normal", weight: 400 },
        { name: "SpaceGrotesk", data: groteskMedium, style: "normal", weight: 500 },
      ],
    },
  );
}

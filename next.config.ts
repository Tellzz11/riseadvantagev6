import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // Silence multi-lockfile warning (the MC repo has its own lockfile at root).
  turbopack: {
    root: __dirname,
  },
  images: {
    // BD-005 tiles live in /public/images/collage/ and are bundled — Next/Image
    // serves them with the built-in optimiser. Vercel handles AVIF/WebP variants.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;

import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Personalised per-prospect pages — already noindex via metadata,
        // belt-and-braces here.
        disallow: "/discovery",
      },
    ],
    sitemap: "https://riseadvantage.co.uk/sitemap.xml",
  };
}

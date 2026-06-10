import type { MetadataRoute } from "next";

// Single-page site + privacy. /discovery is per-prospect and noindex —
// deliberately excluded.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://riseadvantage.co.uk",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://riseadvantage.co.uk/privacy",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}

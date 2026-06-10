import type { Metadata } from "next";
import DiscoverySection from "@/components/discovery/DiscoverySection";

export const metadata: Metadata = {
  title: "Book your game plan call — Rise Advantage",
  description: "Twenty minutes to map out the system that wins you more work — more enquiries in, none slipping away, and more booked jobs out the other side.",
  // Personalised, per-prospect URLs — keep them out of the index.
  robots: { index: false, follow: false },
};

type SearchParams = Record<string, string | string[] | undefined>;

// Coerce a possibly-array query value to a single trimmed string.
function one(v: string | string[] | undefined): string {
  const raw = Array.isArray(v) ? v[0] : v;
  return (raw ?? "").trim();
}

export default async function DiscoveryPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;

  const leaksRaw = one(sp.leaks);
  const leaks = leaksRaw
    ? leaksRaw.split("|").map((s) => s.trim()).filter(Boolean)
    : [];

  return (
    <DiscoverySection
      biz={one(sp.biz)}
      name={one(sp.name)}
      email={one(sp.email)}
      phone={one(sp.phone)}
      website={one(sp.website)}
      leaks={leaks}
    />
  );
}

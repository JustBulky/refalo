import type { MetadataRoute } from "next";
import { BRANDS } from "@/lib/brands";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://refalo.io";

  const brandPages = BRANDS.map((brand) => ({
    url: `${base}/referral/${brand.slug}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  return [
    { url: base, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${base}/categories`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.6 },
    ...brandPages,
  ];
}

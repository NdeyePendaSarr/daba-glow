import type { MetadataRoute } from "next";
import { site } from "@/content/site.config";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/prestations", "/a-propos", "/contact"];
  const now = new Date();
  return pages.map((p) => ({
    url: `${site.url}${p}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: p === "" ? 1 : 0.8,
  }));
}

import type { MetadataRoute } from "next";
import { site } from "@/content/site.config";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/prestations", "/a-propos", "/contact"];
  // Pas de lastModified : la date du build n'est pas celle de la dernière modification du contenu,
  // et une date fausse dessert le référencement plus qu'elle ne l'aide.
  return pages.map((p) => ({
    url: `${site.url}${p}`,
    changeFrequency: "monthly" as const,
    priority: p === "" ? 1 : 0.8,
  }));
}

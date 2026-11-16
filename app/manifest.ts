import type { MetadataRoute } from "next";
import { site } from "@/content/site.config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.nom,
    short_name: site.nomCourt,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#fbeee9",
    theme_color: "#6d2f3c",
    // Icône « D » crème et anneau doré (choisie le 16/11/2026). Fond plein et motif dans le
    // cercle central de 80 % : elle sert aussi d'icône « maskable » (découpée par Android).
    icons: [
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}

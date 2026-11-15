import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF en priorité (plus léger), WebP sinon ; le navigateur choisit selon ce qu'il accepte.
    formats: ["image/avif", "image/webp"],
  },
  // Portrait de l'accueil (fichiers statiques non versionnés) : cache de 7 jours au lieu de
  // max-age=0, avec revalidation en arrière-plan. Après un changement de photo, la nouvelle
  // version arrive au plus tard sous 7 jours (renommer les fichiers pour l'imposer tout de suite).
  async headers() {
    return [
      {
        source: "/portrait/:fichier*",
        headers: [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" }],
      },
    ];
  },
  experimental: {
    // La feuille de style (≈ 7 Ko compressés) est intégrée dans le HTML au lieu
    // d'être une requête séparée bloquant le premier affichage : un aller-retour
    // réseau de moins avant que le contenu s'affiche (sensible en 3G/4G instable).
    inlineCss: true,
  },
};

export default nextConfig;

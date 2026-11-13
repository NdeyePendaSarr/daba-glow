import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF en priorité (plus léger), WebP sinon ; le navigateur choisit selon ce qu'il accepte.
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    // La feuille de style (≈ 7 Ko compressés) est intégrée dans le HTML au lieu
    // d'être une requête séparée bloquant le premier affichage : un aller-retour
    // réseau de moins avant que le contenu s'affiche (sensible en 3G/4G instable).
    inlineCss: true,
  },
};

export default nextConfig;

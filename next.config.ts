import type { NextConfig } from "next";

const developpement = process.env.NODE_ENV !== "production";

/**
 * Politique de sécurité du contenu (CSP).
 * - Les pages sont statiques : pas de nonce possible, donc 'unsafe-inline' pour les scripts
 *   intégrés de Next.js (données de la page) et pour la CSS intégrée (experimental.inlineCss).
 *   La CSP reste utile : aucun script, cadre, formulaire ou objet venu d'ailleurs n'est accepté.
 * - frame-src TikTok : la façade TikTok crée l'iframe de la vidéo au clic (components/TikTokEmbed).
 * - vercel.live : barre d'outils des prévisualisations Vercel (commentaires).
 * - 'unsafe-eval' uniquement en développement (rechargement à chaud de Next.js).
 */
export const politiqueContenu = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${developpement ? " 'unsafe-eval'" : ""} https://vercel.live`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self' https://vercel.live",
  "frame-src https://www.tiktok.com https://vercel.live",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "upgrade-insecure-requests",
].join("; ");

/** En-têtes de sécurité envoyés avec toutes les pages et tous les fichiers. */
export const enTetesSecurite = [
  { key: "Content-Security-Policy", value: politiqueContenu },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
];

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
      { source: "/:chemin*", headers: enTetesSecurite },
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

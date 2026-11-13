// Génère les versions optimisées du portrait de l'accueil (élément LCP).
// Usage : node scripts/generer-portrait.mjs
// Tailles = taille affichée (160 px mobile, 224 px ≥ 1024 px) en 1x et 2x.
// Qualité alignée sur l'optimiseur de Next.js : WebP 75, AVIF 75 − 20 = 55.
import sharp from "sharp";
import { mkdirSync, statSync } from "node:fs";

const SOURCE = "public/portrait.jpg";
const DOSSIER = "public/portrait";
const LARGEURS = [160, 224, 320, 448];

mkdirSync(DOSSIER, { recursive: true });
for (const w of LARGEURS) {
  const base = sharp(SOURCE).resize(w, w, { fit: "cover" });
  await base.clone().avif({ quality: 55, effort: 6 }).toFile(`${DOSSIER}/portrait-${w}.avif`);
  await base.clone().webp({ quality: 75, effort: 6 }).toFile(`${DOSSIER}/portrait-${w}.webp`);
  console.log(
    `${w} px : AVIF ${statSync(`${DOSSIER}/portrait-${w}.avif`).size} o, WebP ${statSync(`${DOSSIER}/portrait-${w}.webp`).size} o`
  );
}

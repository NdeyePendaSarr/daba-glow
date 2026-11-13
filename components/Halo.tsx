import { preload } from "react-dom";

/**
 * Portrait de l'accueil (élément LCP) servi directement depuis /public/portrait/,
 * déjà optimisé par scripts/generer-portrait.mjs : AVIF et WebP, aux tailles
 * réellement affichées (144 ou 160 px mobile, 176 px tablette, 224 px dès 1024 px) en 1x et 2x.
 * Il ne passe donc pas par l'optimiseur d'images de Vercel (/_next/image),
 * dont le temps de réponse faisait varier le LCP.
 */
const LARGEURS = [160, 224, 320, 448];
const srcset = (format: "avif" | "webp") =>
  LARGEURS.map((w) => `/portrait/portrait-${w}.${format} ${w}w`).join(", ");
// taille réellement affichée : 160 px (mobile), 176 px (tablette), 224 px (≥ 1024 px)
const TAILLES = "(min-width: 1024px) 224px, (min-width: 768px) 176px, 160px";
// variante compacte (accueil) : 144 px sur mobile, mêmes tailles au-delà
const TAILLES_COMPACT = "(min-width: 1024px) 224px, (min-width: 768px) 176px, 144px";

/**
 * Classes de taille (mobile < 768 px ; tablette et desktop inchangés).
 * - normal  : boîte 288 px, anneaux 256 px, photo 160 px (256 − 2 × 48)
 * - compact : boîte 196 px, anneaux 196 px, photo 144 px (196 − 2 × 26), pour que le portrait
 *   entier tienne dans le premier écran mobile de l'accueil.
 */
const CLASSES = {
  normal: { boite: "h-72 w-72", anneaux: "h-64 w-64", anneauInterieur: "inset-6", photo: "inset-12" },
  compact: { boite: "h-[196px] w-[196px]", anneaux: "h-[196px] w-[196px]", anneauInterieur: "inset-4 md:inset-6", photo: "inset-[26px] md:inset-12" },
};

/**
 * Signature visuelle du site : le portrait dans son halo doré pulsant.
 * Affiche le portrait si demandé, sinon un médaillon terracotta.
 * Le fond dégradé apporte de la profondeur sans alourdir.
 */
export default function Halo({
  avecPortrait = false,
  compactMobile = false,
}: {
  avecPortrait?: boolean;
  /** Accueil : halo réduit sous 768 px (portrait entier dans le premier écran). */
  compactMobile?: boolean;
}) {
  const c = CLASSES[compactMobile ? "compact" : "normal"];
  const tailles = compactMobile ? TAILLES_COMPACT : TAILLES;
  if (avecPortrait) {
    // Équivalent de « priority » : <link rel="preload"> dans le <head>, priorité haute.
    // Justifié : sur l'accueil (compactMobile) comme sur À propos, le portrait est dans
    // le premier écran à toutes les tailles mesurées (360, 412, 768, 1440 px).
    // type="image/avif" : les rares navigateurs sans AVIF ignorent ce préchargement
    // et prennent la source WebP de <picture>.
    preload("/portrait/portrait-320.avif", {
      as: "image",
      type: "image/avif",
      imageSrcSet: srcset("avif"),
      imageSizes: tailles,
      fetchPriority: "high",
    });
  }

  // Taille : 288 px sur mobile (196 px en variante compacte), 320 px sur tablette (la colonne ne fait que 332 px
  // à 768 px), 384 px dès 1024 px. Évite tout défilement horizontal.
  return (
    <div className={`relative mx-auto flex ${c.boite} items-center justify-center md:h-80 md:w-80 lg:h-96 lg:w-96`}>
      {/* Dégradé / texture subtile derrière le halo */}
      <div
        className="absolute inset-0 rounded-full opacity-70"
        style={{
          background:
            "radial-gradient(circle at 40% 35%, color-mix(in srgb, var(--color-dore) 22%, transparent) 0%, color-mix(in srgb, var(--color-terracotta) 12%, transparent) 35%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-4 rounded-full opacity-40"
        style={{
          background:
            "radial-gradient(circle at 60% 70%, color-mix(in srgb, var(--color-cuivre) 15%, transparent) 0%, transparent 55%)",
        }}
        aria-hidden="true"
      />

      <div className={`relative ${c.anneaux} md:h-68 md:w-68 lg:h-80 lg:w-80`} aria-hidden="true">
        <div className="absolute inset-0 animate-halo rounded-full border border-ambre/70" />
        <div className={`absolute ${c.anneauInterieur} animate-halo-late rounded-full border border-dore/80`} />
        <div className={`absolute ${c.photo} overflow-hidden rounded-full bg-terracotta shadow-lg`}>
          {avecPortrait ? (
            <picture>
              <source type="image/avif" srcSet={srcset("avif")} sizes={tailles} />
              <source type="image/webp" srcSet={srcset("webp")} sizes={tailles} />
              {/* Image déjà optimisée : next/image ajouterait un passage par /_next/image. */}
              <img
                src="/portrait/portrait-320.webp"
                alt=""
                width={320}
                height={320}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </picture>
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="font-display text-5xl italic text-cacao">D</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

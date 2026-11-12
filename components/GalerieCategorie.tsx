import { realisations, type Categorie } from "@/content/realisations";
import PolaroidCard from "./PolaroidCard";
import TikTokEmbed from "./TikTokEmbed";
import type { LightboxItem } from "./Lightbox";
import OuvreLightbox from "./OuvreLightbox";
import Reveal from "./Reveal";

/**
 * Galerie des réalisations d'UNE catégorie (maquillage, manucure, coiffure).
 * Composant serveur : seule l'ouverture de la lightbox (OuvreLightbox) et
 * la façade TikTok sont des composants client.
 */
export default function GalerieCategorie({ categorie }: { categorie: Categorie }) {
  const photos = realisations.filter((r) => r.categories.includes(categorie));
  if (photos.length === 0) return null;

  const imageItems = photos.filter((r) => r.image && !r.tiktokId);
  const items: LightboxItem[] = imageItems.map((r) => ({
    src: `/realisations/${r.image}`,
    titre: r.titre,
  }));
  const indexLightbox = (image?: string) => {
    const i = imageItems.findIndex((x) => x.image === image);
    return i >= 0 ? i : undefined;
  };

  return (
    <OuvreLightbox items={items}>
      {/* Mobile : swipe horizontal */}
      <div className="mt-8 flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory md:hidden">
        {photos.map((r, i) => (
          <div key={r.titre} className="w-[70vw] max-w-[280px] flex-shrink-0 snap-center">
            {r.tiktokId ? (
              <TikTokEmbed id={r.tiktokId} titre={r.titre} vignette={r.vignette} />
            ) : (
              <PolaroidCard realisation={r} index={i} lightboxIndex={indexLightbox(r.image)} />
            )}
          </div>
        ))}
      </div>

      {/* Desktop : grille */}
      <div className="mt-8 hidden grid-cols-2 gap-5 md:grid md:grid-cols-3 md:gap-8">
        {photos.map((r, i) => (
          <Reveal key={r.titre} delai={i * 100}>
            {r.tiktokId ? (
              <TikTokEmbed id={r.tiktokId} titre={r.titre} vignette={r.vignette} />
            ) : (
              <PolaroidCard realisation={r} index={i} lightboxIndex={indexLightbox(r.image)} />
            )}
          </Reveal>
        ))}
      </div>
    </OuvreLightbox>
  );
}

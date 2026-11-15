import { realisations, type Categorie } from "@/content/realisations";
import PolaroidCard from "./PolaroidCard";
import TikTokEmbed from "./TikTokEmbed";
import type { LightboxItem } from "./Lightbox";
import OuvreLightbox from "./OuvreLightbox";
import Reveal from "./Reveal";
import DefilementPoints from "./DefilementPoints";

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
      {/* Une seule liste (rendue une fois dans le HTML) :
          mobile : une photo entière par écran (marge autour pour les cartes inclinées), points
          de repère dessous ; desktop (≥ 768 px) : grille de 3 colonnes. */}
      <DefilementPoints
        nombre={photos.length}
        className="mt-8 flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory md:grid md:grid-cols-3 md:gap-8 md:overflow-visible md:pb-0 md:snap-none"
      >
        {photos.map((r, i) => (
          <Reveal
            key={r.titre}
            delai={i * 100}
            desktopSeulement
            className="w-full flex-none snap-center px-[max(2rem,calc(50%-170px))] py-3 md:w-auto md:max-w-none md:p-0"
          >
            {r.tiktokId ? (
              <TikTokEmbed id={r.tiktokId} titre={r.titre} vignette={r.vignette} />
            ) : (
              <PolaroidCard realisation={r} index={i} lightboxIndex={indexLightbox(r.image)} />
            )}
          </Reveal>
        ))}
      </DefilementPoints>
    </OuvreLightbox>
  );
}

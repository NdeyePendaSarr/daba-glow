import Link from "next/link";
import Image from "next/image";
import { realisations } from "@/content/realisations";
import type { LightboxItem } from "./Lightbox";
import OuvreLightbox from "./OuvreLightbox";
import Reveal from "./Reveal";
import DefilementPoints from "./DefilementPoints";

/** Sélection "coup de cœur" pour l'accueil : les plus belles réalisations. */
const coupsDeCoeur = [
  "maquillage-mariee.jpg",
  "chignon-roses.jpg",
  "coiffure-mariee.jpg",
  "mise-en-beaute-soiree.jpg",
];

/** Composant serveur : les vignettes sont dans le HTML ; seule l'ouverture de la lightbox est côté client. */
export default function GalerieApercu() {
  const photos = coupsDeCoeur
    .map((img) => realisations.find((r) => r.image === img))
    .filter((r): r is NonNullable<typeof r> => Boolean(r));

  const items: LightboxItem[] = photos
    .filter((r) => r.image)
    .map((r) => ({ src: `/realisations/${r.image}`, titre: r.titre }));

  return (
    <OuvreLightbox items={items}>
      {/* Une seule liste (rendue une fois dans le HTML) :
          mobile : une photo entière par écran, points de repère dessous, légende toujours visible ;
          desktop (≥ 768 px) : grille décalée, légende au survol, apparition au défilement. */}
      <DefilementPoints
        nombre={photos.length}
        className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin md:grid md:grid-cols-4 md:overflow-visible md:pb-0 md:snap-none"
      >
        {photos.map((r, i) => (
          <Reveal key={r.image} delai={i * 120} desktopSeulement className="w-full flex-none snap-center md:w-auto">
            <button
              type="button"
              data-lightbox={i}
              className={`group relative mx-auto block aspect-[4/5] md:mx-0 md:inline-block w-full max-w-[340px] overflow-hidden rounded-2xl text-left transition-transform duration-150 active:scale-[0.98] md:w-full md:max-w-none ${
                i % 2 === 0 ? "md:translate-y-4" : ""
              }`}
            >
              {/* alt vide : le titre est déjà lu via la légende du bouton (évite la double lecture) */}
              <Image
                src={`/realisations/${r.image}`}
                alt=""
                fill
                sizes="(min-width: 1024px) 240px, (min-width: 768px) 22vw, (max-width: 400px) 90vw, 340px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-chocolat/80 to-transparent p-3 pt-8 text-left text-xs text-creme transition-opacity md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100">
                {r.titre}
              </span>
            </button>
          </Reveal>
        ))}
      </DefilementPoints>

      <div className="mt-10 text-center">
        <Link
          href="/prestations"
          className="btn-secondary inline-block rounded-full border border-cuivre px-7 py-3 font-medium text-cuivre hover:bg-cuivre hover:text-creme"
        >
          Voir toutes les réalisations
        </Link>
      </div>
    </OuvreLightbox>
  );
}

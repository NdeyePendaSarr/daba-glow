import Image from "next/image";
import type { Realisation } from "@/content/realisations";

const teintes = {
  terracotta: "bg-terracotta",
  rose: "bg-rose",
  dore: "bg-dore",
} as const;

const rotations = ["-rotate-3", "rotate-2", "-rotate-1", "rotate-3", "-rotate-2", "rotate-1"];

/**
 * Composant serveur. Si `lightboxIndex` est fourni (et qu'il y a une photo),
 * la carte est un bouton `data-lightbox` : c'est OuvreLightbox qui gère le clic.
 */
export default function PolaroidCard({
  realisation,
  index,
  lightboxIndex,
}: {
  realisation: Realisation;
  index: number;
  lightboxIndex?: number;
}) {
  const teinte = teintes[realisation.teinte ?? "terracotta"];
  const rotation = rotations[index % rotations.length];

  const content = (
    <>
      <div className={`relative aspect-[4/5] overflow-hidden ${teinte}`}>
        {realisation.image ? (
          <Image
            src={`/realisations/${realisation.image}`}
            alt={realisation.titre}
            fill
            sizes="(min-width: 1024px) 300px, (min-width: 768px) 30vw, 260px"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="px-3 text-center font-display text-lg italic text-cacao">
              {realisation.titre}
            </span>
          </div>
        )}
      </div>
      <figcaption className="mt-2 text-center text-xs text-encre">
        {realisation.titre} · {realisation.date}
      </figcaption>
    </>
  );

  if (lightboxIndex !== undefined && realisation.image) {
    return (
      <button
        type="button"
        data-lightbox={lightboxIndex}
        className={`${rotation} block w-full bg-blanc p-2 pb-6 text-left shadow-lg transition-transform duration-300 hover:rotate-0 hover:scale-105`}
      >
        {content}
      </button>
    );
  }

  return (
    <figure
      className={`${rotation} bg-blanc p-2 pb-6 shadow-lg transition-transform duration-300 hover:rotate-0 hover:scale-105`}
    >
      {content}
    </figure>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { realisations } from "@/content/realisations";
import Lightbox, { type LightboxItem } from "./Lightbox";

/** Sélection "coup de cœur" pour l'accueil : les plus belles réalisations. */
const coupsDeCoeur = [
  "maquillage-mariee.jpg",
  "chignon-roses.jpg",
  "coiffure-mariee.jpg",
  "mise-en-beaute-soiree.jpg",
];

export default function GalerieApercu() {
  const photos = coupsDeCoeur
    .map((img) => realisations.find((r) => r.image === img))
    .filter((r): r is NonNullable<typeof r> => Boolean(r));

  const items: LightboxItem[] = photos
    .filter((r) => r.image)
    .map((r) => ({ src: `/realisations/${r.image}`, titre: r.titre }));

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <div>
      {/* Mobile : swipe horizontal fluide */}
      <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin md:hidden">
        {photos.map((r, i) => (
          <button
            key={r.image}
            type="button"
            onClick={() => setLightboxIndex(i)}
            className="relative aspect-[4/5] w-[70vw] max-w-[280px] flex-shrink-0 snap-center overflow-hidden rounded-2xl"
          >
            <Image
              src={`/realisations/${r.image}`}
              alt={r.titre}
              fill
              sizes="70vw"
              className="object-cover"
            />
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-chocolat/80 to-transparent p-3 pt-8 text-left text-xs text-creme">
              {r.titre}
            </span>
          </button>
        ))}
      </div>

      {/* Desktop : grille décalée */}
      <div className="hidden grid-cols-2 gap-4 md:grid md:grid-cols-4">
        {photos.map((r, i) => (
          <button
            key={r.image}
            type="button"
            onClick={() => setLightboxIndex(i)}
            className={`group relative aspect-[4/5] overflow-hidden rounded-2xl text-left ${
              i % 2 === 0 ? "md:translate-y-4" : ""
            }`}
          >
            <Image
              src={`/realisations/${r.image}`}
              alt={r.titre}
              fill
              sizes="(min-width: 768px) 22vw, 45vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-chocolat/80 to-transparent p-3 pt-8 text-xs text-creme opacity-0 transition-opacity group-hover:opacity-100">
              {r.titre}
            </figcaption>
          </button>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/prestations"
          className="btn-secondary inline-block rounded-full border border-cuivre px-7 py-3 font-medium text-cuivre transition-all hover:bg-cuivre hover:text-creme"
        >
          Voir toutes les réalisations
        </Link>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          items={items}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() =>
            setLightboxIndex((i) =>
              i === null ? 0 : (i - 1 + items.length) % items.length
            )
          }
          onNext={() =>
            setLightboxIndex((i) => (i === null ? 0 : (i + 1) % items.length))
          }
        />
      )}
    </div>
  );
}

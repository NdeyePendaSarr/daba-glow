"use client";

import { useState } from "react";
import { realisations, type Categorie } from "@/content/realisations";
import PolaroidCard from "./PolaroidCard";
import TikTokEmbed from "./TikTokEmbed";
import Lightbox, { type LightboxItem } from "./Lightbox";
import Reveal from "./Reveal";

/** Galerie des réalisations d'UNE catégorie donnée (maquillage, manucure, coiffure). */
export default function GalerieCategorie({ categorie }: { categorie: Categorie }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const photos = realisations.filter((r) => r.categories.includes(categorie));

  const imageItems = photos.filter((r) => r.image && !r.tiktokId);
  const items: LightboxItem[] = imageItems.map((r) => ({
    src: `/realisations/${r.image}`,
    titre: r.titre,
  }));

  if (photos.length === 0) return null;

  return (
    <>
      {/* Mobile : swipe horizontal */}
      <div className="mt-8 flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory md:hidden">
        {photos.map((r, i) =>
          r.tiktokId ? (
            <div key={r.titre} className="w-[70vw] max-w-[280px] flex-shrink-0 snap-center">
              <TikTokEmbed id={r.tiktokId} titre={r.titre} />
            </div>
          ) : (
            <div key={r.titre} className="w-[70vw] max-w-[280px] flex-shrink-0 snap-center">
              <PolaroidCard
                realisation={r}
                index={i}
                onOpen={
                  r.image
                    ? () => {
                        const idx = imageItems.findIndex((x) => x.image === r.image);
                        if (idx >= 0) setLightboxIndex(idx);
                      }
                    : undefined
                }
              />
            </div>
          )
        )}
      </div>

      {/* Desktop : grille */}
      <div className="mt-8 hidden grid-cols-2 gap-5 md:grid md:grid-cols-3 md:gap-8">
        {photos.map((r, i) =>
          r.tiktokId ? (
            <Reveal key={r.titre} delai={i * 100}>
              <TikTokEmbed id={r.tiktokId} titre={r.titre} />
            </Reveal>
          ) : (
            <Reveal key={r.titre} delai={i * 100}>
              <PolaroidCard
                realisation={r}
                index={i}
                onOpen={
                  r.image
                    ? () => {
                        const idx = imageItems.findIndex((x) => x.image === r.image);
                        if (idx >= 0) setLightboxIndex(idx);
                      }
                    : undefined
                }
              />
            </Reveal>
          )
        )}
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
    </>
  );
}

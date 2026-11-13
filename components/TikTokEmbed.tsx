"use client";

import { useState } from "react";
import Image from "next/image";

/**
 * Façade TikTok : rien n'est chargé depuis TikTok tant que la visiteuse n'a pas
 * cliqué. On affiche une vignette locale (`/public/realisations/<vignette>`)
 * si elle est fournie dans le contenu, sinon un aplat de couleur ; l'iframe
 * (lourde : script et vidéo de TikTok) n'est créée qu'au clic.
 */
export default function TikTokEmbed({
  id,
  titre,
  vignette,
}: {
  id: string;
  titre: string;
  vignette?: string;
}) {
  const [charge, setCharge] = useState(false);

  return (
    <div className="overflow-hidden rounded-xl border border-encre/15 bg-creme">
      {charge ? (
        <iframe
          src={`https://www.tiktok.com/embed/v2/${id}`}
          title={titre}
          allow="encrypted-media; fullscreen"
          className="aspect-[9/16] w-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setCharge(true)}
          className="relative flex aspect-[9/16] w-full flex-col items-center justify-center gap-3 overflow-hidden bg-encre text-creme transition-colors hover:bg-cacao"
        >
          {vignette && (
            <Image
              src={`/realisations/${vignette}`}
              alt=""
              fill
              sizes="(min-width: 1024px) 300px, (min-width: 768px) 30vw, 260px"
              className="object-cover opacity-60"
            />
          )}
          <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-dore-clair text-2xl text-chocolat">
            ▶
          </span>
          <span className="relative px-4 text-center text-sm">{titre}</span>
          <span className="relative text-xs text-creme/70">Voir la vidéo TikTok</span>
        </button>
      )}
    </div>
  );
}

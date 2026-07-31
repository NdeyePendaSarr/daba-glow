"use client";

import { useState } from "react";

/**
 * Intégration TikTok en chargement différé : l'iframe (lourde) ne se
 * charge qu'au clic — la page reste rapide.
 */
export default function TikTokEmbed({ id, titre }: { id: string; titre: string }) {
  const [charge, setCharge] = useState(false);

  return (
    <div className="overflow-hidden rounded-xl border border-encre/15 bg-creme">
      {charge ? (
        <iframe
          src={`https://www.tiktok.com/embed/v2/${id}`}
          title={titre}
          allow="encrypted-media"
          className="aspect-[9/16] w-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setCharge(true)}
          className="flex aspect-[9/16] w-full flex-col items-center justify-center gap-3 bg-encre text-creme transition-colors hover:bg-cacao"
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-dore text-2xl text-chocolat">
            ▶
          </span>
          <span className="px-4 text-center text-sm">{titre}</span>
          <span className="text-xs text-creme/60">Voir la vidéo TikTok</span>
        </button>
      )}
    </div>
  );
}

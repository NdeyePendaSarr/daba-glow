"use client";

import Image from "next/image";
import type { Realisation } from "@/content/realisations";

const teintes = {
  terracotta: "bg-terracotta",
  rose: "bg-rose",
  dore: "bg-dore",
} as const;

const rotations = ["-rotate-3", "rotate-2", "-rotate-1", "rotate-3", "-rotate-2", "rotate-1"];

export default function PolaroidCard({
  realisation,
  index,
  onOpen,
}: {
  realisation: Realisation;
  index: number;
  onOpen?: () => void;
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
            sizes="(min-width: 768px) 30vw, 45vw"
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

  if (onOpen && realisation.image) {
    return (
      <button
        type="button"
        onClick={onOpen}
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

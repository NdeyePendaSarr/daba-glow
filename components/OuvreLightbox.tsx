"use client";

import { useState } from "react";
import Lightbox, { type LightboxItem } from "./Lightbox";

/**
 * Seule partie interactive des galeries : les vignettes sont rendues côté
 * serveur (HTML visible sans JavaScript) ; ce composant écoute simplement les
 * clics sur les boutons marqués `data-lightbox="<index>"` et ouvre la lightbox.
 * Les boutons étant de vrais <button>, Entrée et Espace déclenchent aussi le clic.
 */
export default function OuvreLightbox({
  items,
  children,
  className,
}: {
  items: LightboxItem[];
  children: React.ReactNode;
  className?: string;
}) {
  const [index, setIndex] = useState<number | null>(null);

  const auClic = (e: React.MouseEvent<HTMLDivElement>) => {
    const bouton = (e.target as HTMLElement).closest<HTMLElement>("[data-lightbox]");
    if (!bouton || !e.currentTarget.contains(bouton)) return;
    const i = Number(bouton.dataset.lightbox);
    if (Number.isInteger(i) && i >= 0 && i < items.length) setIndex(i);
  };

  return (
    // Le clic est délégué aux <button> enfants (accessibles au clavier) ; ce conteneur n'est pas interactif lui-même.
    <div className={className} onClick={auClic}>
      {children}
      {index !== null && (
        <Lightbox
          items={items}
          index={index}
          onClose={() => setIndex(null)}
          onPrev={() => setIndex((i) => (i === null ? 0 : (i - 1 + items.length) % items.length))}
          onNext={() => setIndex((i) => (i === null ? 0 : (i + 1) % items.length))}
        />
      )}
    </div>
  );
}

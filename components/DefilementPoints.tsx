"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Galerie à défilement horizontal sur mobile : une photo entière par écran, et des points
 * de repère dessous (le point de la photo visible est allongé et cuivré).
 * Les photos sont rendues par le serveur (visibles sans JavaScript) ; seul le suivi du point
 * actif utilise JavaScript. Les points sont décoratifs (aria-hidden) : la liste reste
 * parcourable au doigt, au clavier et par les lecteurs d'écran.
 * À partir de 768 px, la liste devient une grille (classes passées par le parent) et les
 * points sont masqués.
 */
export default function DefilementPoints({
  className,
  nombre,
  children,
}: {
  className: string;
  nombre: number;
  children: React.ReactNode;
}) {
  const liste = useRef<HTMLDivElement>(null);
  const [actif, setActif] = useState(0);

  useEffect(() => {
    const el = liste.current;
    if (!el) return;
    const surDefilement = () => {
      const [premier, second] = el.children as unknown as HTMLElement[];
      // pas d'une photo à la suivante (largeur + espacement) ; repli sur la largeur visible
      const pas = second && premier ? second.offsetLeft - premier.offsetLeft : el.clientWidth;
      if (pas > 0) setActif(Math.min(nombre - 1, Math.max(0, Math.round(el.scrollLeft / pas))));
    };
    el.addEventListener("scroll", surDefilement, { passive: true });
    return () => el.removeEventListener("scroll", surDefilement);
  }, [nombre]);

  return (
    <>
      <div ref={liste} className={className}>
        {children}
      </div>
      {nombre > 1 && (
        <div className="mt-1 flex justify-center gap-[5px] md:hidden" aria-hidden="true" data-points>
          {Array.from({ length: nombre }, (_, i) => (
            <span
              key={i}
              data-actif={i === actif || undefined}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === actif ? "w-[18px] bg-cuivre" : "w-1.5 bg-encre/25"
              }`}
            />
          ))}
        </div>
      )}
    </>
  );
}

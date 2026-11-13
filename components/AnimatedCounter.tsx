"use client";

import { useEffect, useRef } from "react";

/**
 * Affiche un chiffre clé ("50+", "2 ans", "100 %", "7j/7").
 *
 * Le HTML du serveur contient TOUJOURS la valeur finale : sans JavaScript, ou
 * avant qu'il ne tourne, la cliente voit le bon chiffre (jamais « 0 »).
 * Amélioration progressive : si le chiffre est encore hors de l'écran au
 * chargement, il est remis à 0 puis compte jusqu'à sa valeur quand il apparaît.
 * Rien ne bouge si le chiffre est déjà visible ou si l'utilisatrice a demandé
 * moins d'animations (prefers-reduced-motion).
 */
export default function AnimatedCounter({
  valeur,
  duree = 1400,
}: {
  valeur: string;
  duree?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const match = valeur.match(/\d+/);
    if (!el || !match) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Déjà à l'écran au chargement : on garde la valeur finale, sans animation.
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) return;

    const cible = parseInt(match[0], 10);
    const prefixe = valeur.slice(0, match.index);
    const suffixe = valeur.slice((match.index ?? 0) + match[0].length);
    const afficher = (n: number) => {
      el.textContent = `${prefixe}${n}${suffixe}`;
    };

    afficher(0); // hors écran : invisible pour la visiteuse
    let image = 0;
    const obs = new IntersectionObserver(
      ([entree]) => {
        if (!entree.isIntersecting) return;
        obs.disconnect();
        const debut = performance.now();
        const anime = (maintenant: number) => {
          const progres = Math.min((maintenant - debut) / duree, 1);
          afficher(Math.round(cible * (1 - Math.pow(1 - progres, 3))));
          if (progres < 1) image = requestAnimationFrame(anime);
        };
        image = requestAnimationFrame(anime);
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      cancelAnimationFrame(image);
      el.textContent = valeur;
    };
  }, [valeur, duree]);

  return <span ref={ref}>{valeur}</span>;
}

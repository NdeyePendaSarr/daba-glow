"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Anime un chiffre de 0 jusqu'à sa valeur finale quand il entre dans l'écran.
 * Fonctionne avec n'importe quel texte contenant un nombre : "50+", "2 ans",
 * "100 %", "7j/7" — seul le premier nombre trouvé est animé, le reste du
 * texte (préfixe/suffixe) est conservé tel quel.
 */
export default function AnimatedCounter({
  valeur,
  duree = 1400,
}: {
  valeur: string;
  duree?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const dejaAnime = useRef(false);

  const match = valeur.match(/\d+/);
  const [affichage, setAffichage] = useState(() => {
    if (!match) return valeur;
    const reduitMouvement =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduitMouvement) return valeur;
    return `${valeur.slice(0, match.index)}0${valeur.slice((match.index ?? 0) + match[0].length)}`;
  });

  useEffect(() => {
    const el = ref.current;
    if (!el || !match) return;

    const reduitMouvement = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduitMouvement) return;

    const cible = parseInt(match[0], 10);
    const prefixe = valeur.slice(0, match.index);
    const suffixe = valeur.slice((match.index ?? 0) + match[0].length);

    const obs = new IntersectionObserver(
      ([entree]) => {
        if (entree.isIntersecting && !dejaAnime.current) {
          dejaAnime.current = true;
          const debut = performance.now();

          const anime = (maintenant: number) => {
            const progres = Math.min((maintenant - debut) / duree, 1);
            const facilite = 1 - Math.pow(1 - progres, 3);
            const valeurActuelle = Math.round(cible * facilite);
            setAffichage(`${prefixe}${valeurActuelle}${suffixe}`);
            if (progres < 1) requestAnimationFrame(anime);
          };
          requestAnimationFrame(anime);
          obs.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valeur, duree]);

  return <span ref={ref}>{affichage}</span>;
}

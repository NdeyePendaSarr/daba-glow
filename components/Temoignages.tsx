import Reveal from "./Reveal";
import { temoignages } from "@/content/temoignages";

/** "Fatou Binta Ndiaye" → { lettre: "F", affichage: "Fatou Binta N." } */
function formaterAuteure(nomComplet: string) {
  const mots = nomComplet.trim().split(/\s+/);
  const dernier = mots[mots.length - 1];
  const prenoms = mots.slice(0, -1).join(" ") || dernier;
  return {
    lettre: mots[0].charAt(0).toUpperCase(),
    affichage: mots.length > 1 ? `${prenoms} ${dernier.charAt(0)}.` : prenoms,
  };
}

/**
 * Grille adaptée au nombre réel de témoignages : jamais de colonne vide.
 * Classes écrites en entier pour que Tailwind les détecte.
 */
export function classeGrille(nombre: number): string {
  if (nombre <= 1) return "mx-auto grid max-w-md gap-6";
  if (nombre === 2) return "mx-auto grid max-w-3xl gap-6 md:grid-cols-2";
  return "grid gap-6 md:grid-cols-3";
}

export default function Temoignages() {
  return (
    <div className={classeGrille(temoignages.length)}>
      {temoignages.map((t, i) => {
        const { lettre, affichage } = formaterAuteure(t.auteure);
        return (
          <Reveal key={t.auteure} delai={i * 120}>
            <article className="flex h-full flex-col rounded-2xl bg-blanc p-6 shadow-sm">
              <div className="text-sm tracking-wide text-dore" aria-hidden="true">
                ★★★★★
              </div>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-encre/80">
                {/* espaces insécables : les guillemets ne restent jamais seuls en fin de ligne */}
                {"«\u00a0"}
                {t.texte}
                {"\u00a0»"}
              </p>
              <div className="mt-6 flex items-center gap-3 border-t border-encre/10 pt-4">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-cuivre font-display text-lg italic text-creme">
                  {lettre}
                </span>
                <div>
                  <p className="text-sm font-medium text-encre">{affichage}</p>
                  <p className="text-xs text-encre/60">{t.contexte}</p>
                </div>
              </div>
            </article>
          </Reveal>
        );
      })}
    </div>
  );
}

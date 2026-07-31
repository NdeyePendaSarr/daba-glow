import type { Prestation } from "@/content/prestations";

/**
 * Carte prestation SANS photo : catalogue clair (nom + description + prix).
 * Les photos vivent dans la galerie de réalisations, juste en dessous —
 * ainsi une même image n'apparaît jamais deux fois dans la catégorie.
 */
export default function PrestationCard({ prestation }: { prestation: Prestation }) {
  return (
    <article className="flex h-full flex-col rounded-2xl bg-blanc p-6 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-md">
      <p className="text-xs uppercase tracking-[0.2em] text-cuivre">{prestation.categorie}</p>
      <h3 className="mt-1 font-display text-2xl italic text-encre">{prestation.nom}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-encre/70">{prestation.description}</p>

      <div className="mt-5 flex items-center justify-between border-t border-encre/10 pt-4">
        <span className="text-xs uppercase tracking-wider text-encre/50">{prestation.duree}</span>
        <span className="rounded-full bg-chocolat px-4 py-1.5 text-lg font-semibold text-dore">
          {prestation.prix}
        </span>
      </div>
    </article>
  );
}

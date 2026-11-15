import type { Prestation } from "@/content/prestations";
import { lienWhatsAppPour } from "@/content/site.config";

/**
 * Carte prestation SANS photo : catalogue clair (nom + description + prix).
 * Les photos vivent dans la galerie de réalisations, juste en dessous —
 * ainsi une même image n'apparaît jamais deux fois dans la catégorie.
 * Chaque carte a son bouton « Réserver » : WhatsApp s'ouvre avec le nom de la prestation
 * déjà écrit. Nom accessible : « Réserver sur WhatsApp : Maquillage jour ».
 */
export default function PrestationCard({ prestation }: { prestation: Prestation }) {
  return (
    <article className="flex h-full flex-col rounded-2xl bg-blanc p-6 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-md">
      <p className="text-xs uppercase tracking-[0.2em] text-cuivre">{prestation.categorie}</p>
      <h3 className="mt-1 font-display text-2xl italic text-encre">{prestation.nom}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-encre/70">{prestation.description}</p>

      <div className="mt-5 flex items-center justify-between border-t border-encre/10 pt-4">
        <span className="text-xs uppercase tracking-wider text-encre/70">{prestation.duree}</span>
        <span className="rounded-full bg-chocolat px-4 py-1.5 text-lg font-semibold text-dore-clair">
          {prestation.prix}
        </span>
      </div>

      <a
        href={lienWhatsAppPour(prestation.nom)}
        target="_blank"
        rel="noopener noreferrer"
        // Nom accessible = texte visible + nom de la prestation (WCAG 2.5.3, étiquette dans le nom)
        aria-label={`Réserver sur WhatsApp : ${prestation.nom}`}
        className="btn-secondary mt-4 inline-flex h-11 w-full items-center justify-center rounded-full border border-cuivre text-sm font-medium text-cuivre hover:bg-cuivre hover:text-creme"
      >
        Réserver sur WhatsApp
      </a>
    </article>
  );
}

import type { Metadata } from "next";
import { lienWhatsApp } from "@/content/site.config";
import Halo from "@/components/Halo";
import Reveal from "@/components/Reveal";
import { parcours } from "@/content/a-propos";

export const metadata: Metadata = {
  alternates: { canonical: "/a-propos" },
  title: "À propos",
  description: `Le parcours de Daba : de la passion aux clientes fidèles, jusqu'au diplôme professionnel.`,
};

export default function APropos() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-16 md:py-24">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-cuivre">L&apos;artiste derrière le glow</p>
          <h1 className="mt-2 font-display text-5xl italic">Daba</h1>
          <p className="mt-5 max-w-sm leading-relaxed text-encre/75">
            La beauté n&apos;est pas un métier que Daba a choisi — c&apos;est une évidence
            qu&apos;elle a professionnalisée. Voici son parcours.
          </p>
        </Reveal>
        <Reveal delai={150}>
          <Halo />
        </Reveal>
      </div>

      <div className="mt-16 border-l border-encre/20 pl-8">
        {parcours.map((etape, i) => (
          // L'espace du bas est sur l'enveloppe Reveal (sœur des autres étapes) : sur le div
          // intérieur, enfant unique, `last:pb-0` s'appliquait à toutes les étapes.
          <Reveal key={etape.titre} delai={i * 100} className="pb-12 last:pb-0">
            <div className="relative">
              <span className="absolute -left-[37px] top-1.5 h-3 w-3 rounded-full bg-dore" aria-hidden="true" />
              <p className="text-xs uppercase tracking-[0.25em] text-cuivre">{etape.periode}</p>
              <h2 className="mt-1 font-display text-2xl italic">{etape.titre}</h2>
              <p className="mt-2 max-w-lg leading-relaxed text-encre/75">{etape.texte}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="mt-12 text-center">
          <a
            href={lienWhatsApp}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-block rounded-full bg-cuivre px-8 py-3.5 font-medium text-creme"
          >
            Faire connaissance sur WhatsApp
          </a>
        </div>
      </Reveal>
    </div>
  );
}

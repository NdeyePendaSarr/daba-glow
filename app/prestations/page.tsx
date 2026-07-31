import type { Metadata } from "next";
import { prestations, categories } from "@/content/prestations";
import { site, lienWhatsApp } from "@/content/site.config";
import PrestationCard from "@/components/PrestationCard";
import GalerieCategorie from "@/components/GalerieCategorie";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Prestations & réalisations",
  description: `Maquillage, manucure et coiffure à domicile à Mbour : prestations, tarifs et réalisations de ${site.nom}.`,
};

export default function Prestations() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-16 md:py-24">
      <Reveal>
        <p className="text-xs uppercase tracking-[0.3em] text-cuivre">Prestations &amp; réalisations</p>
        <h1 className="mt-2 font-display text-5xl italic">Ce que Daba réalise</h1>
        <p className="mt-4 max-w-lg text-encre/70">
          Chaque prestation se fait chez toi ou chez {site.nomCourt}, avec du
          matériel professionnel — accompagnée de vraies réalisations pour que
          tu voies le résultat avant de réserver. Pour les coiffures, le tarif
          dépend du style : demande un devis sur WhatsApp.
        </p>
      </Reveal>

      {categories.map((cat) => (
        <section key={cat} className="mt-16">
          <Reveal>
            <h2 className="border-b-2 border-encre pb-3 font-display text-3xl italic">{cat}</h2>
          </Reveal>

          {/* Les prestations de cette catégorie, avec prix */}
          <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {prestations
              .filter((p) => p.categorie === cat)
              .map((p, i) => (
                <Reveal key={p.nom} delai={i * 100}>
                  <PrestationCard prestation={p} />
                </Reveal>
              ))}
          </div>

          {/* Les réalisations de cette catégorie */}
          <Reveal>
            <p className="mt-12 text-xs uppercase tracking-[0.25em] text-cuivre">
              Réalisations {cat.toLowerCase()}
            </p>
          </Reveal>
          <GalerieCategorie categorie={cat} />
        </section>
      ))}

      <Reveal>
        <div className="mt-16 rounded-2xl bg-chocolat p-8 text-center text-creme">
          <p className="font-display text-2xl italic">Un événement, une envie précise ?</p>
          <a
            href={lienWhatsApp}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-block rounded-full bg-dore px-7 py-3 font-medium text-chocolat"
          >
            Demander un devis sur WhatsApp
          </a>
        </div>
      </Reveal>
    </div>
  );
}

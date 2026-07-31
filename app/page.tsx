import Link from "next/link";
import { site, lienWhatsApp } from "@/content/site.config";
import { prestations } from "@/content/prestations";
import Marquee from "@/components/Marquee";
import Halo from "@/components/Halo";
import Reveal from "@/components/Reveal";
import PrestationCard from "@/components/PrestationCard";
import GalerieApercu from "@/components/GalerieApercu";
import { chiffres, atouts } from "@/content/atouts";

export default function Accueil() {
  const apercu = prestations.filter((p) =>
    ["Maquillage jour", "Nail art", "Tresses"].includes(p.nom)
  );

  return (
    <>
      {/* ───────── Héro ───────── */}
      <section className="mx-auto grid max-w-5xl items-center gap-12 px-5 py-16 md:grid-cols-2 md:gap-16 md:py-28">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-cuivre">
            Beauté à domicile — Mbour
          </p>
          <h1 className="mt-3">
            <span className="block font-display text-6xl italic sm:text-7xl md:text-8xl">
              {site.nomCourt}
            </span>
            <span className="mt-1 block text-2xl font-medium tracking-[0.5em] text-ambre sm:text-3xl md:text-4xl">
              {site.suffixe}
            </span>
          </h1>
          <p className="mt-6 max-w-sm text-lg leading-relaxed text-encre/75">
            {site.accroche}
          </p>

          {/* Pastille de confiance */}
          <p className="mt-5 inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded-full border border-encre/10 bg-blanc px-4 py-2 text-xs font-medium tracking-wide text-encre/80">
            <span>Diplômée</span>
            <span className="text-ambre" aria-hidden="true">·</span>
            <span>À domicile</span>
            <span className="text-ambre" aria-hidden="true">·</span>
            <span>Mbour</span>
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={lienWhatsApp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary rounded-full bg-cuivre px-7 py-3 font-medium text-creme shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              Réserver sur WhatsApp
            </a>
            <Link
              href="/prestations"
              className="btn-secondary rounded-full border border-encre/30 px-7 py-3 text-encre transition-all hover:border-cuivre hover:text-cuivre"
            >
              Découvrir les prestations
            </Link>
          </div>
        </Reveal>
        <Reveal delai={150}>
          <Halo avecPortrait />
        </Reveal>
      </section>

      <Marquee />

      {/* ───────── Prestations (sommaire) ───────── */}
      <section className="bg-sable px-5 py-20 md:py-28">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-cuivre">Le menu beauté</p>
            <h2 className="mt-2 font-display text-4xl italic">Prestations</h2>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {apercu.map((p, i) => (
              <Reveal key={p.nom} delai={i * 100}>
                <PrestationCard prestation={p} />
              </Reveal>
            ))}
          </div>
          <Reveal>
            <Link
              href="/prestations"
              className="mt-10 inline-block text-sm font-medium text-cuivre underline-offset-4 hover:underline"
            >
              Voir toutes les prestations et les tarifs →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ───────── Galerie coup de cœur ───────── */}
      <section className="mx-auto max-w-5xl px-5 py-20 md:py-28">
        <Reveal>
          <p className="text-center text-xs uppercase tracking-[0.3em] text-cuivre">
            Le portfolio
          </p>
          <h2 className="mt-2 text-center font-display text-4xl italic">
            Ses plus belles réalisations
          </h2>
        </Reveal>
        <div className="mt-14">
          <Reveal delai={150}>
            <GalerieApercu />
          </Reveal>
        </div>
      </section>

      {/* ───────── Chiffres clés ───────── */}
      <section className="bg-chocolat px-5 py-16 md:py-20">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 md:grid-cols-4">
          {chiffres.map((c, i) => (
            <Reveal key={c.label} delai={i * 100}>
              <div className="text-center">
                <p className="font-display text-4xl italic text-dore md:text-5xl">{c.valeur}</p>
                <p className="mt-2 text-sm text-creme/70">{c.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ───────── Pourquoi Daba ───────── */}
      <section className="bg-sable px-5 py-20 md:py-28">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="text-center text-xs uppercase tracking-[0.3em] text-cuivre">
              La différence Daba
            </p>
            <h2 className="mt-2 text-center font-display text-4xl italic text-encre">
              Pourquoi lui confier ta beauté
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {atouts.map((a, i) => (
              <Reveal key={a.titre} delai={i * 100}>
                <div className="flex h-full gap-4 rounded-2xl bg-blanc p-6">
                  <span className="font-display text-3xl italic text-cuivre">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="font-display text-xl italic text-encre">{a.titre}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-encre/70">{a.texte}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── CTA final ───────── */}
      <section className="px-5 py-24 text-center md:py-28">
        <Reveal>
          <h2 className="font-display text-4xl italic md:text-5xl">
            Prête pour ton <span className="text-cuivre">glow</span> ?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-encre/75">
            {site.zone}. {site.horaires}.
          </p>
          <a
            href={lienWhatsApp}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-8 inline-block rounded-full bg-cuivre px-9 py-4 text-lg font-medium text-creme shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            Écrire à {site.nomCourt} sur WhatsApp
          </a>
        </Reveal>
      </section>
    </>
  );
}

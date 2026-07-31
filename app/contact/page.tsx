import type { Metadata } from "next";
import { site, lienWhatsApp } from "@/content/site.config";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Contact et réservation",
  description: `Réserver une prestation avec ${site.nom} : WhatsApp, Instagram, TikTok. ${site.zone}.`,
};

function formatWhatsApp(num: string) {
  if (num.length === 12 && num.startsWith("221")) {
    return `+${num.slice(0, 3)} ${num.slice(3, 5)} ${num.slice(5, 8)} ${num.slice(8, 10)} ${num.slice(10)}`;
  }
  return `+${num}`;
}

const etapes = [
  { titre: "Écris sur WhatsApp", texte: "Décris ton envie : maquillage, ongles, coiffure, ou les trois." },
  { titre: "Choisissez le créneau", texte: "Daba te propose une date, un tarif clair, et vous décidez du lieu : chez toi ou chez elle." },
  { titre: "Le jour J, tu brilles", texte: "Daba se déplace avec tout son matériel, ou te reçoit chez elle à Darou Salam. Toi, tu n'as qu'à briller." },
];

export default function Contact() {
  const telAffiche = formatWhatsApp(site.whatsapp);

  return (
    <div className="mx-auto max-w-3xl px-5 py-16 md:py-24">
      <Reveal>
        <p className="text-center text-xs uppercase tracking-[0.3em] text-cuivre">Réservation</p>
        <h1 className="mt-2 text-center font-display text-5xl italic">On se retrouve chez toi ?</h1>
      </Reveal>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {etapes.map((e, i) => (
          <Reveal key={e.titre} delai={i * 120}>
            <div className="h-full rounded-2xl bg-chocolat p-6 text-creme">
              <span className="font-display text-3xl italic text-dore">{i + 1}</span>
              <h2 className="mt-3 text-lg font-medium">{e.titre}</h2>
              <p className="mt-2 text-sm leading-relaxed text-creme/70">{e.texte}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="mt-14 rounded-2xl border border-encre/20 bg-blanc p-8 text-center md:p-10">
          <p className="text-xs uppercase tracking-[0.25em] text-cuivre">Zone d&apos;intervention</p>
          <p className="mt-2 font-display text-2xl italic text-encre">Darou Salam, Mbour</p>
          <p className="mt-2 text-sm text-encre/70">
            Daba se déplace à domicile dans Mbour et les environs, ou te reçoit chez elle.
            L&apos;adresse exacte est partagée à la réservation.
          </p>

          <div className="mx-auto mt-8 max-w-sm rounded-2xl bg-sable px-6 py-5">
            <p className="text-xs uppercase tracking-[0.2em] text-encre/50">WhatsApp</p>
            <a
              href={lienWhatsApp}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 block font-display text-2xl italic text-cuivre transition-colors hover:text-ambre"
            >
              {telAffiche}
            </a>
            <p className="mt-2 text-xs leading-relaxed text-encre/60">
              Réponse en général sous 2 h pendant les horaires d&apos;ouverture.
            </p>
          </div>

          <div className="mx-auto mt-8 max-w-xs space-y-1 border-t border-encre/10 pt-6">
            {site.horairesDetail.map((h) => (
              <div key={h.jour} className="flex justify-between text-sm">
                <span className="text-encre/70">{h.jour}</span>
                <span className="font-medium text-encre">{h.heures}</span>
              </div>
            ))}
          </div>

          <a
            href={lienWhatsApp}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-8 inline-block rounded-full bg-cuivre px-9 py-4 text-lg font-medium text-creme shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            Réserver sur WhatsApp
          </a>

          <div className="mt-6 flex justify-center gap-6 text-sm">
            {site.instagram && (
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-encre/70 hover:text-cuivre"
              >
                Instagram
              </a>
            )}
            <a
              href={site.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="text-encre/70 hover:text-cuivre"
            >
              TikTok
            </a>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

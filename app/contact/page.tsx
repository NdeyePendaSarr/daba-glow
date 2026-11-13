import type { Metadata } from "next";
import { site, lienWhatsApp, lienTelephone } from "@/content/site.config";
import Reveal from "@/components/Reveal";
import { formatTelephone } from "@/lib/format";

export const metadata: Metadata = {
  title: "Contact et réservation",
  description: `Réserver avec ${site.nom} par WhatsApp ou par téléphone. ${site.zone}.`,
};

const etapes = [
  { titre: "Écris sur WhatsApp", texte: "Décris ton envie : maquillage, ongles, coiffure, ou les trois." },
  { titre: "Choisissez le créneau", texte: "Daba te propose une date, un tarif clair, et vous décidez du lieu : au salon ou chez toi." },
  { titre: "Le jour J, tu brilles", texte: "Daba te reçoit au salon à Darou Salam, ou se déplace chez toi avec tout son matériel. Toi, tu n'as qu'à briller." },
];

export default function Contact() {
  const telAffiche = formatTelephone(site.telephone);

  return (
    <div className="mx-auto max-w-3xl px-5 py-16 md:py-24">
      <Reveal>
        <p className="text-center text-xs uppercase tracking-[0.3em] text-cuivre">Réservation</p>
        <h1 className="mt-2 text-center font-display text-5xl italic">Au salon ou chez toi ?</h1>
      </Reveal>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {etapes.map((e, i) => (
          <Reveal key={e.titre} delai={i * 120}>
            <div className="h-full rounded-2xl bg-chocolat p-6 text-creme">
              <span className="font-display text-3xl italic text-dore-clair">{i + 1}</span>
              <h2 className="mt-3 text-lg font-medium">{e.titre}</h2>
              <p className="mt-2 text-sm leading-relaxed text-creme/70">{e.texte}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="mt-14 rounded-2xl border border-encre/20 bg-blanc p-8 text-center md:p-10">
          <p className="text-xs uppercase tracking-[0.25em] text-cuivre">Où ?</p>
          <p className="mt-2 font-display text-2xl italic text-encre">
            Salon à {site.salon.quartier}, {site.salon.ville}
          </p>
          <p className="mt-2 text-sm text-encre/70">
            Daba te reçoit au salon, ou se déplace à domicile sur appel, dans {site.zoneDeplacement}.{" "}
            Appelez ou écrivez sur WhatsApp, on vous guide jusqu&apos;au salon.
          </p>

          <div className="mx-auto mt-8 max-w-sm rounded-2xl bg-sable px-6 py-5">
            <p className="text-xs uppercase tracking-[0.2em] text-encre/75">WhatsApp</p>
            <a
              href={lienWhatsApp}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 block font-display text-2xl italic text-cuivre transition-colors hover:text-ambre"
            >
              {telAffiche}
            </a>
            <p className="mt-2 text-xs leading-relaxed text-encre/75">
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

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={lienWhatsApp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-block rounded-full bg-cuivre px-9 py-4 text-lg font-medium text-creme shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              Réserver sur WhatsApp
            </a>
            <a
              href={lienTelephone}
              className="btn-secondary inline-block rounded-full border border-cuivre px-9 py-4 text-lg font-medium text-cuivre transition-all hover:bg-cuivre hover:text-creme"
            >
              Appeler le {telAffiche}
            </a>
          </div>

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

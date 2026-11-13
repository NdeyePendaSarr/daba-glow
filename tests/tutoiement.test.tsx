import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import Accueil from "@/app/page";
import Prestations from "@/app/prestations/page";
import APropos from "@/app/a-propos/page";
import Contact from "@/app/contact/page";
import NotFound from "@/app/not-found";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { site } from "@/content/site.config";
import { temoignages } from "@/content/temoignages";

/**
 * Le site tutoie la cliente partout (ton d'origine de la marque).
 * Exceptions voulues :
 * - les témoignages (citations des clientes, laissées telles quelles) ;
 * - le message WhatsApp pré-rempli (c'est la cliente qui écrit à Daba).
 */
const VOUVOIEMENT =
  /\b(vous|votre|vos)\b|\b(appelez|écrivez|choisissez|décidez|réservez|contactez|découvrez|venez|décrivez|demandez|faites|révélez)\b/i;

/** « rendez-vous » n'est pas du vouvoiement. */
const sansRdv = (s: string) => s.replace(/rendez-vous/gi, "");

const racine = process.cwd();
function fichiers(dossier: string): string[] {
  return readdirSync(join(racine, dossier)).flatMap((f) => {
    const chemin = join(dossier, f);
    if (statSync(join(racine, chemin)).isDirectory()) return fichiers(chemin);
    return /\.tsx?$/.test(f) && !f.includes(".test.") ? [chemin] : [];
  });
}

describe("tutoiement partout sur le site", () => {
  it("aucun texte du code source (pages, meta, OG, manifest, composants, contenus) ne vouvoie", () => {
    const sources = [...fichiers("app"), ...fichiers("components"), ...fichiers("content"), ...fichiers("lib")].filter(
      (f) => !f.endsWith("temoignages.ts")
    );
    for (const f of sources) {
      readFileSync(join(racine, f), "utf8")
        .split(/\r?\n/)
        .forEach((ligne, i) => {
          if (/^\s*(\/\/|\*|\/\*)/.test(ligne)) return; // commentaires
          if (ligne.includes(site.messageWhatsApp)) return; // exception voulue
          expect(sansRdv(ligne), `${f}:${i + 1}`).not.toMatch(VOUVOIEMENT);
        });
    }
  });

  it("les textes partagés (bandeau, description, meta) tutoient", () => {
    expect(site.zone).toBe("Au salon à Darou Salam (Mbour), ou chez toi à domicile");
    expect(site.description).toContain("ou chez toi à domicile");
  });

  it.each([
    ["accueil", Accueil],
    ["prestations", Prestations],
    ["à propos", APropos],
    ["contact", Contact],
    ["404", NotFound],
    ["en-tête", Header],
    ["pied de page", Footer],
  ] as const)("%s : le texte affiché ne vouvoie pas (hors témoignages)", (_nom, Composant) => {
    const { container } = render(<Composant />);
    let texte = container.textContent ?? "";
    for (const t of temoignages) texte = texte.split(t.texte).join("");
    expect(sansRdv(texte)).not.toMatch(VOUVOIEMENT);
  });
});

import { describe, it, expect } from "vitest";
import { renderToString } from "react-dom/server";
import Accueil from "@/app/page";
import Contact from "@/app/contact/page";
import Footer from "@/components/Footer";
import { site, lienTelephone, lienWhatsApp } from "@/content/site.config";
import { formatTelephone } from "@/lib/format";

const numero = formatTelephone(site.telephone); // « +221 76 885 04 92 »

/** HTML du serveur, analysé dans jsdom. */
const dom = (el: React.ReactElement) => {
  const div = document.createElement("div");
  div.innerHTML = renderToString(el);
  return div;
};

/** Liens qui affichent le numéro : il doit être dans un élément insécable (white-space: nowrap). */
function verifierInsecable(racine: HTMLElement) {
  const liens = [...racine.querySelectorAll<HTMLAnchorElement>(`a[href="${lienTelephone}"], a[href="${lienWhatsApp}"]`)].filter((a) =>
    a.textContent!.includes(numero)
  );
  expect(liens.length).toBeGreaterThan(0);
  for (const a of liens) {
    const porteur = [a, ...a.querySelectorAll("*")].find((el) => el.textContent!.includes(numero) && /\bwhitespace-nowrap\b/.test(el.getAttribute("class") ?? ""));
    expect(porteur, a.outerHTML).toBeDefined();
  }
  return liens;
}

describe("le numéro de téléphone n'est jamais coupé sur deux lignes", () => {
  it("page Contact : bouton « Appeler » et numéro WhatsApp", () => {
    const liens = verifierInsecable(dom(<Contact />));
    expect(liens.some((a) => a.getAttribute("href") === lienTelephone)).toBe(true);
  });

  it("pied de page : liens WhatsApp et appel", () => {
    expect(verifierInsecable(dom(<Footer />))).toHaveLength(2);
  });

  it("accueil : un lien d'appel est dans le héros (premier écran), avant la première section suivante", () => {
    const racine = dom(<Accueil />);
    const heros = racine.querySelector("section")!;
    const appel = heros.querySelector<HTMLAnchorElement>(`a[href="${lienTelephone}"]`);
    expect(appel).not.toBeNull();
    expect(appel!.className).toMatch(/\bmin-h-11\b/); // cible tactile ≥ 44 px
    verifierInsecable(heros);
  });
});

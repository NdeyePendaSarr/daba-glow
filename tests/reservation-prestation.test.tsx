import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import PrestationCard from "@/components/PrestationCard";
import Accueil from "@/app/page";
import Prestations from "@/app/prestations/page";
import { prestations } from "@/content/prestations";
import { site, lienWhatsAppPour } from "@/content/site.config";

const messageDe = (href: string) => decodeURIComponent(new URL(href).searchParams.get("text") ?? "");

describe("bouton « Réserver » sur chaque prestation", () => {
  it("lienWhatsAppPour écrit le nom de la prestation dans le message, vers le numéro unique", () => {
    const href = lienWhatsAppPour("Maquillage mariée");
    expect(href.startsWith(`https://wa.me/${site.telephone}?text=`)).toBe(true);
    expect(messageDe(href)).toBe("Bonjour Daba ! J'ai vu votre site et j'aimerais réserver : Maquillage mariée.");
  });

  it.each(prestations.map((p) => [p.nom, p] as const))("%s : bouton avec un nom accessible complet et le bon message", (nom, p) => {
    render(<PrestationCard prestation={p} />);
    const lien = screen.getByRole("link", { name: `Réserver sur WhatsApp : ${nom}` });
    expect(messageDe(lien.getAttribute("href")!)).toContain(`réserver : ${nom}.`);
    expect(lien).toHaveAttribute("target", "_blank");
    expect(lien).toHaveAttribute("rel", "noopener noreferrer");
    expect(lien.className).toMatch(/\bh-11\b/); // cible tactile de 44 px
    expect(lien.className).toMatch(/\bbtn-secondary\b/); // style « contour » (maquette A)
    expect(lien.className).not.toMatch(/(?<![\w:-])bg-cuivre\b/); // pas un bouton plein au repos (hover:bg-cuivre autorisé)
  });

  it("le texte visible est « Réserver sur WhatsApp », repris en tête du nom accessible", () => {
    render(<PrestationCard prestation={prestations[0]} />);
    const lien = screen.getByRole("link");
    expect(lien.textContent!.trim()).toBe("Réserver sur WhatsApp");
    expect(lien.getAttribute("aria-label")!.startsWith(lien.textContent!.trim())).toBe(true);
  });

  it("chaque carte de l'accueil et de la page Prestations a son bouton (HTML du serveur)", () => {
    const compter = (el: React.ReactElement) => {
      const div = document.createElement("div");
      div.innerHTML = renderToString(el);
      return [...div.querySelectorAll("article a[href*='wa.me']")].map((a) => messageDe(a.getAttribute("href")!));
    };
    const accueil = compter(<Accueil />);
    expect(accueil).toHaveLength(3);
    const page = compter(<Prestations />);
    expect(page).toHaveLength(prestations.length);
    for (const p of prestations) expect(page.some((m) => m.includes(`réserver : ${p.nom}.`))).toBe(true);
  });
});

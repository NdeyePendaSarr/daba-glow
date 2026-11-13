import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import GalerieApercu from "@/components/GalerieApercu";
import GalerieCategorie from "@/components/GalerieCategorie";
import TikTokEmbed from "@/components/TikTokEmbed";
import Header from "@/components/Header";
import { realisations } from "@/content/realisations";

const dossier = join(process.cwd(), "components");

describe("JavaScript réduit au strict nécessaire", () => {
  it("seuls les composants réellement interactifs sont des composants client", () => {
    const clients = readdirSync(dossier)
      .filter((f) => f.endsWith(".tsx"))
      .filter((f) => /^["']use client["']/m.test(readFileSync(join(dossier, f), "utf8")))
      .sort();
    expect(clients).toEqual([
      "AnimatedCounter.tsx", // comptage animé (amélioration progressive, valeur finale dans le HTML)
      "BarreNavigation.tsx", // menu mobile ouvert/fermé + lien actif
      "Lightbox.tsx", // visionneuse au clavier
      "OuvreLightbox.tsx", // ouverture de la visionneuse au clic
      "TikTokEmbed.tsx", // façade : charge la vidéo au clic
    ]);
  });

  it("les vignettes de l'accueil sont du HTML et ouvrent la lightbox au clic", () => {
    const { container } = render(<GalerieApercu />);
    expect(screen.queryByRole("dialog")).toBeNull();
    const vignette = container.querySelector<HTMLButtonElement>('button[data-lightbox="1"]')!;
    expect(vignette).not.toBeNull();
    fireEvent.click(vignette.querySelector("span")!); // clic sur la légende, à l'intérieur du bouton
    expect(screen.getByRole("dialog")).toHaveAccessibleName(vignette.textContent!.trim());
  });

  it("les polaroïds d'une catégorie ouvrent la lightbox sur la bonne photo", () => {
    const { container } = render(<GalerieCategorie categorie="Manucure" />);
    const boutons = container.querySelectorAll<HTMLButtonElement>("button[data-lightbox]");
    expect(boutons.length).toBeGreaterThan(0);
    fireEvent.click(boutons[boutons.length - 1]);
    const titre = boutons[boutons.length - 1].querySelector("img")!.getAttribute("alt")!;
    expect(screen.getByRole("dialog")).toHaveAccessibleName(titre);
  });

  it("l'en-tête garde son menu mobile fonctionnel", () => {
    render(<Header />);
    fireEvent.click(screen.getByRole("button", { name: "Ouvrir le menu" }));
    expect(screen.getByRole("navigation", { name: "Navigation mobile" })).toBeInTheDocument();
  });
});

describe("façade TikTok", () => {
  it("rien n'est chargé depuis TikTok avant le clic, puis l'iframe apparaît", () => {
    const { container } = render(<TikTokEmbed id="123" titre="Vidéo" vignette="maquillage-mariee.jpg" />);
    expect(container.querySelector("iframe")).toBeNull();
    expect(container.innerHTML).not.toContain("tiktok.com");
    expect(container.querySelector("img")).not.toBeNull(); // vignette locale
    fireEvent.click(screen.getByRole("button"));
    expect(container.querySelector("iframe")).toHaveAttribute("src", "https://www.tiktok.com/embed/v2/123");
  });

  it("chaque vignette TikTok déclarée dans le contenu existe dans public/realisations/", () => {
    for (const r of realisations.filter((x) => x.vignette)) {
      expect(existsSync(join(process.cwd(), "public", "realisations", r.vignette!)), r.titre).toBe(true);
    }
  });
});

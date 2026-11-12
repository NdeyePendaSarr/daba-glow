import { describe, it, expect } from "vitest";
import { render, within } from "@testing-library/react";
import GalerieApercu from "@/components/GalerieApercu";
import WhatsAppFab from "@/components/WhatsAppFab";
import Accueil from "@/app/page";

describe("balisage accessible (règles axe image-redundant-alt et region)", () => {
  it("les vignettes « coup de cœur » ne lisent pas leur titre deux fois", () => {
    const { container } = render(<GalerieApercu />);
    const boutons = [...container.querySelectorAll("button")].filter((b) => b.querySelector("img"));
    expect(boutons.length).toBeGreaterThan(0);
    for (const b of boutons) {
      const titre = (b.textContent ?? "").trim();
      expect(titre, "le bouton a un nom visible").not.toBe("");
      // l'image est décorative : son alt ne répète pas la légende
      expect(b.querySelector("img")!.getAttribute("alt")).toBe("");
    }
  });

  it("aucune légende <figcaption> hors d'un <figure>", () => {
    const { container } = render(<GalerieApercu />);
    for (const fc of container.querySelectorAll("figcaption")) {
      expect(fc.closest("figure")).not.toBeNull();
    }
  });

  it("le bouton WhatsApp flottant est dans une zone repère nommée", () => {
    const { getByRole } = render(<WhatsAppFab />);
    const repere = getByRole("complementary", { name: "Contact rapide" });
    expect(within(repere).getByRole("link", { name: "Réserver sur WhatsApp" })).toBeInTheDocument();
  });

  it("l'accueil rend toujours ses vignettes cliquables (non-régression)", () => {
    const { container } = render(<Accueil />);
    expect(container.querySelectorAll("button img").length).toBeGreaterThan(0);
  });
});

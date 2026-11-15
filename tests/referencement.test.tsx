import { describe, it, expect } from "vitest";
import { renderToString } from "react-dom/server";
import Accueil, { metadata as metaAccueil } from "@/app/page";
import { metadata as metaPrestations } from "@/app/prestations/page";
import { metadata as metaAPropos } from "@/app/a-propos/page";
import { metadata as metaContact } from "@/app/contact/page";
import sitemap from "@/app/sitemap";

describe("référencement", () => {
  it.each([
    ["/", metaAccueil],
    ["/prestations", metaPrestations],
    ["/a-propos", metaAPropos],
    ["/contact", metaContact],
  ] as const)("%s a son URL canonique", (route, meta) => {
    expect(meta.alternates?.canonical).toBe(route);
  });

  it("le h1 de l'accueil est descriptif, sans texte visible ajouté", () => {
    const div = document.createElement("div");
    div.innerHTML = renderToString(<Accueil />);
    const h1 = div.querySelector("h1")!;
    expect(h1.textContent).toMatch(/Daba\s*GLOW/);
    expect(h1.textContent).toMatch(/maquillage, coiffure et manucure/);
    expect(h1.querySelector(".sr-only")!.textContent).toMatch(/Mbour/);
  });

  it("le sitemap n'annonce pas de date de modification inventée", () => {
    for (const p of sitemap()) expect(p).not.toHaveProperty("lastModified");
  });
});

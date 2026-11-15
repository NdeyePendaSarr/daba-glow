import { describe, it, expect } from "vitest";
import { renderToString } from "react-dom/server";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import GalerieApercu from "@/components/GalerieApercu";
import GalerieCategorie from "@/components/GalerieCategorie";
import { realisations } from "@/content/realisations";

const html = (el: React.ReactElement) => {
  const div = document.createElement("div");
  div.innerHTML = renderToString(el);
  return div;
};
const css = readFileSync(join(process.cwd(), "app", "globals.css"), "utf8");

describe("galeries rendues une seule fois dans le HTML", () => {
  it("aperçu de l'accueil : une vignette par photo (4, pas 8)", () => {
    const d = html(<GalerieApercu />);
    expect(d.querySelectorAll("button[data-lightbox]")).toHaveLength(4);
    expect(d.querySelectorAll("img")).toHaveLength(4);
  });

  it.each(["Maquillage", "Manucure", "Coiffure"] as const)("galerie %s : un polaroïd par réalisation", (categorie) => {
    const attendu = realisations.filter((r) => r.categories.includes(categorie)).length;
    const d = html(<GalerieCategorie categorie={categorie} />);
    expect(d.querySelectorAll("button[data-lightbox], figure")).toHaveLength(attendu);
  });

  it("l'apparition au défilement des galeries ne joue qu'à partir de 768 px, et jamais avec prefers-reduced-motion", () => {
    expect(css).toMatch(/@media \(min-width: 768px\)\s*\{\s*\.reveal-md\s*\{\s*animation: glissement-entree/);
    expect(css).toMatch(/@media \(prefers-reduced-motion: reduce\)[\s\S]*\.reveal, \.reveal-md\s*\{\s*animation:\s*none/);
    expect(css.match(/\.reveal-md[^{]*\{[^}]*\}/g)!.join("")).not.toMatch(/opacity|visibility|display/);
  });
});

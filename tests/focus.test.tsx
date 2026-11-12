import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Lightbox from "@/components/Lightbox";
import Prestations from "@/app/prestations/page";

const css = readFileSync(join(process.cwd(), "app", "globals.css"), "utf8");
/** Valeur hexadécimale d'un jeton, en suivant les références var(--color-…). */
const jeton = (nom: string): string => {
  const valeur = (css.match(new RegExp(`--color-${nom}:\\s*([^;]+);`)) || [])[1]?.trim() ?? "";
  const ref = valeur.match(/^var\(--color-([a-z-]+)\)$/);
  return ref ? jeton(ref[1]) : valeur;
};

const rgb = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const lum = (h: string) => {
  const [r, g, b] = rgb(h).map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a: string, b: string) => {
  const [x, y] = [lum(a), lum(b)];
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
};

describe("contour de focus visible (WCAG 2.4.7 et 1.4.11, ≥ 3:1)", () => {
  it("le contour par défaut se voit sur les fonds clairs", () => {
    for (const fond of ["creme", "sable", "blanc"]) {
      expect(ratio(jeton("focus"), jeton(fond)), fond).toBeGreaterThanOrEqual(3);
    }
  });

  it("le contour sur fond sombre se voit sur chocolat, cuivre et encre", () => {
    for (const fond of ["chocolat", "cuivre", "encre"]) {
      expect(ratio(jeton("focus-sombre"), jeton(fond)), fond).toBeGreaterThanOrEqual(3);
    }
  });

  it("la feuille de style applique bien ces deux jetons", () => {
    expect(css).toMatch(/:focus-visible\s*{[^}]*outline:\s*2px solid var\(--color-focus\)/);
    expect(css).toMatch(/\[data-fond="sombre"\][^{]*:focus-visible\s*{[^}]*outline-color:\s*var\(--color-focus-sombre\)/);
  });

  it("le menu, le pied de page, la lightbox et l'encart chocolat de Prestations sont marqués comme fonds sombres", () => {
    const menu = render(<Header />).container;
    expect(menu.querySelector('[data-fond="sombre"] a[href="/prestations"]')).not.toBeNull();
    const pied = render(<Footer />).container;
    expect(pied.querySelector('footer[data-fond="sombre"]')).not.toBeNull();
    const lb = render(
      <Lightbox items={[{ src: "/a.jpg", titre: "A" }]} index={0} onClose={() => {}} onPrev={() => {}} onNext={() => {}} />
    ).container;
    expect(lb.querySelector('[role="dialog"][data-fond="sombre"]')).not.toBeNull();
    const prest = render(<Prestations />).container;
    expect(prest.querySelector('.bg-chocolat[data-fond="sombre"] a[href^="https://wa.me/"]')).not.toBeNull();
  });
});

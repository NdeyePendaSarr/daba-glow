// @vitest-environment node
// Rendu serveur réel : pas de window, pas de matchMedia, aucun effet exécuté.
import { describe, it, expect } from "vitest";
import { renderToString } from "react-dom/server";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import Accueil from "@/app/page";
import Prestations from "@/app/prestations/page";
import APropos from "@/app/a-propos/page";
import Contact from "@/app/contact/page";
import { chiffres } from "@/content/atouts";

const lire = (...p: string[]) => readFileSync(join(process.cwd(), ...p), "utf8");
const css = lire("app", "globals.css");

/** Règles CSS (sélecteur → corps) qui ciblent .reveal, hors media queries réduisant le mouvement. */
const reglesReveal = [...css.matchAll(/([^{}]*\.reveal[^{}]*)\{([^{}]*)\}/g)].map((m) => ({ selecteur: m[1].trim(), corps: m[2] }));

describe("contenu visible sans JavaScript (HTML du serveur)", () => {
  it("aucune règle .reveal ne masque le contenu (pas d'opacité, pas de visibility)", () => {
    expect(reglesReveal.length).toBeGreaterThan(0);
    for (const r of reglesReveal) {
      expect(r.corps, r.selecteur).not.toMatch(/opacity\s*:\s*0(?![.\d]*[1-9])|visibility\s*:\s*hidden|display\s*:\s*none/);
    }
  });

  it("l'animation d'entrée ne touche pas à l'opacité et est coupée par prefers-reduced-motion", () => {
    const keyframes = css.match(/@keyframes glissement-entree\s*\{[\s\S]*?\n\}/)?.[0] ?? "";
    expect(keyframes).not.toBe("");
    expect(keyframes).not.toMatch(/opacity/);
    expect(css).toMatch(/@media \(prefers-reduced-motion: reduce\)[\s\S]*\.reveal\s*\{\s*animation:\s*none/);
  });

  it("Reveal n'est plus un composant client (aucun JavaScript requis pour l'afficher)", () => {
    expect(lire("components", "Reveal.tsx")).not.toMatch(/["']use client["']/);
  });

  it("les chiffres clés sont rendus à leur vraie valeur, jamais à « 0 »", () => {
    const html = renderToString(<Accueil />);
    for (const c of chiffres) expect(html).toContain(`>${c.valeur}<`);
    expect(html).not.toMatch(/>0 ans<|>0\+<|>0 %<|>0j\/7</);
  });

  it.each([
    ["/", Accueil, "Daba"],
    ["/prestations", Prestations, "Ce que Daba réalise"],
    ["/a-propos", APropos, "Daba"],
    ["/contact", Contact, "Au salon ou chez toi ?"],
  ] as const)("%s : le titre h1 est dans le HTML du serveur", (_route, Page, titre) => {
    const html = renderToString(<Page />);
    expect(html).toMatch(/<h1[\s>]/);
    expect(html).toContain(titre);
  });
});

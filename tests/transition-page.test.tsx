// @vitest-environment node
import { describe, it, expect } from "vitest";
import { renderToString } from "react-dom/server";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import Template from "@/app/template";

const lire = (...p: string[]) => readFileSync(join(process.cwd(), ...p), "utf8");
const css = lire("app", "globals.css");
const keyframes = css.match(/@keyframes entree-page\s*\{[\s\S]*?\n\}/)?.[0] ?? "";

describe("transition d'entrée entre les pages (app/template.tsx)", () => {
  it("est un composant serveur qui enveloppe la page sans rien masquer dans le HTML", () => {
    expect(lire("app", "template.tsx")).not.toMatch(/["']use client["']/);
    const html = renderToString(<Template><p>contenu</p></Template>);
    expect(html).toBe('<div class="entree-page"><p>contenu</p></div>');
    expect(html).not.toMatch(/style=|hidden|opacity/);
  });

  it("dure 250 ms au plus et ne part jamais d'une opacité nulle", () => {
    const duree = css.match(/\.entree-page\s*\{\s*animation:\s*entree-page\s+(\d+)ms/)?.[1];
    expect(Number(duree)).toBeGreaterThan(0);
    expect(Number(duree)).toBeLessThanOrEqual(250);
    const depart = Number(keyframes.match(/from\s*\{[^}]*opacity:\s*([\d.]+)/)?.[1]);
    expect(depart).toBeGreaterThan(0);
  });

  it("aucune règle .entree-page ne fixe une opacité nulle, visibility ou display", () => {
    for (const [, corps] of css.matchAll(/\.entree-page[^{]*\{([^}]*)\}/g)) {
      expect(corps).not.toMatch(/opacity\s*:\s*0(?![.\d]*[1-9])|visibility|display/);
    }
  });

  it("est désactivée avec prefers-reduced-motion", () => {
    expect(css).toMatch(/@media \(prefers-reduced-motion: reduce\)[\s\S]*\.entree-page\s*\{\s*animation:\s*none/);
  });
});

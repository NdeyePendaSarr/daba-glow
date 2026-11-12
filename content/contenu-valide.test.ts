import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { prestations } from "./prestations";
import { temoignages } from "./temoignages";
import { chiffres, atouts } from "./atouts";

const source = (fichier: string) =>
  readFileSync(join(process.cwd(), "content", fichier), "utf8");

describe("prix et chiffres confirmés", () => {
  it("chaque prix est exprimé en francs CFA (se termine par « F »)", () => {
    for (const p of prestations) expect(p.prix).toMatch(/\d[\d\s–-]*F$/);
  });

  it("chiffres clés et atouts ont des libellés uniques (clés React)", () => {
    expect(new Set(chiffres.map((c) => c.label)).size).toBe(chiffres.length);
    expect(new Set(atouts.map((a) => a.titre)).size).toBe(atouts.length);
  });

  it.each(["prestations.ts", "atouts.ts"])(
    "%s ne contient plus de marqueur de contenu provisoire",
    (fichier) => {
      expect(source(fichier)).not.toMatch(/à remplacer|à ajuster|d'exemple|⚠️/i);
    }
  );
});

describe("témoignages", () => {
  it("ont un texte, une auteure et un contexte, sans doublon", () => {
    for (const t of temoignages) {
      expect(t.texte.trim().length).toBeGreaterThan(20);
      expect(t.auteure.trim()).not.toBe("");
      expect(t.contexte.trim()).not.toBe("");
    }
    const noms = temoignages.map((t) => t.auteure);
    expect(new Set(noms).size).toBe(noms.length);
  });

  it("en comptent au moins 2 pour garder la section crédible", () => {
    expect(temoignages.length).toBeGreaterThanOrEqual(2);
  });

  it("ne contiennent plus le témoignage signé par l'autrice du site", () => {
    expect(temoignages.map((t) => t.auteure)).not.toContain("Ndeye Penda Sarr");
  });
});

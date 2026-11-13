import { describe, it, expect } from "vitest";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const racine = process.cwd();
const lire = (...p: string[]) => readFileSync(join(racine, ...p), "utf8");

/** Tous les .tsx de app/ et components/ (hors tests). */
function fichiersTsx(dossier: string): string[] {
  return readdirSync(join(racine, dossier)).flatMap((f) => {
    const chemin = join(dossier, f);
    if (statSync(join(racine, chemin)).isDirectory()) return fichiersTsx(chemin);
    return f.endsWith(".tsx") && !f.includes(".test.") ? [chemin] : [];
  });
}
const classes = fichiersTsx("app")
  .concat(fichiersTsx("components"))
  .flatMap((f) => [...lire(f).matchAll(/<(?:a|Link)\s[^>]*?className="([^"]*)"/g)].map((m) => ({ f, c: m[1] }))); // liens uniquement

describe("boutons : un seul style de survol, défini dans globals.css", () => {
  it("chaque bouton plein cuivre utilise .btn-primary", () => {
    const boutonsCuivre = classes.filter(({ c }) => /(?<![\w:-])bg-cuivre\b/.test(c) && /\brounded-full\b/.test(c));
    expect(boutonsCuivre.length).toBeGreaterThanOrEqual(5);
    for (const { f, c } of boutonsCuivre) expect(c, f).toMatch(/\bbtn-primary\b/);
  });

  it("aucun bouton .btn-* ne redéfinit transition, déplacement ou ombre au survol", () => {
    const boutons = classes.filter(({ c }) => /\bbtn-(primary|secondary)\b/.test(c));
    for (const { f, c } of boutons) {
      expect(c, f).not.toMatch(/\btransition(-\w+)?\b|hover:-?translate|hover:scale|hover:shadow|\bshadow-(sm|md|lg)\b/);
    }
  });

  it("le survol de .btn-primary n'est déclaré qu'une seule fois", () => {
    const css = lire("app", "globals.css");
    expect(css.match(/\.btn-primary:hover\s*\{/g)).toHaveLength(1);
  });
});

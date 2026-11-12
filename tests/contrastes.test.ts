import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

/** Jetons de couleur lus directement dans @theme (app/globals.css) : la source unique. */
const css = readFileSync(join(process.cwd(), "app", "globals.css"), "utf8");
const jetons: Record<string, string> = Object.fromEntries(
  [...css.matchAll(/--color-([a-z-]+):\s*(#[0-9a-fA-F]{6})\s*;/g)].map((m) => [m[1], m[2].toLowerCase()])
);

const rgb = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const luminance = (h: string) => {
  const [r, g, b] = rgb(h).map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
/** Couleur `fg` à l'opacité `a` posée sur `bg` (comme `text-encre/70` de Tailwind). */
const opacite = (fg: string, bg: string, a: number) =>
  "#" + rgb(fg).map((v, i) => Math.round(v * a + rgb(bg)[i] * (1 - a)).toString(16).padStart(2, "0")).join("");
const ratio = (a: string, b: string) => {
  const [x, y] = [luminance(a), luminance(b)];
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
};
const c = (nom: string) => {
  expect(jetons[nom], `jeton --color-${nom} absent de globals.css`).toBeDefined();
  return jetons[nom];
};

const TEXTE = 4.5;
const NON_TEXTE = 3;

describe("contrastes WCAG AA calculés depuis les jetons", () => {
  const paires: [string, () => [string, string], number][] = [
    ["bouton « Réserver » : chocolat sur dore-clair", () => [c("chocolat"), c("dore-clair")], TEXTE],
    ["prix et « GLOW » : dore-clair sur chocolat", () => [c("dore-clair"), c("chocolat")], TEXTE],
    ["bandeau défilant : encre sur dore", () => [c("encre"), c("dore")], TEXTE],
    ["surtitres : cuivre sur sable", () => [c("cuivre"), c("sable")], TEXTE],
    ["surtitres : cuivre sur creme", () => [c("cuivre"), c("creme")], TEXTE],
    ["boutons principaux : creme sur cuivre", () => [c("creme"), c("cuivre")], TEXTE],
    ["bouton « Appeler » : cuivre sur blanc", () => [c("cuivre"), c("blanc")], TEXTE],
    ["zone du pied de page : terracotta sur chocolat", () => [c("terracotta"), c("chocolat")], TEXTE],
    ["durées : encre/70 sur blanc", () => [opacite(c("encre"), c("blanc"), 0.7), c("blanc")], TEXTE],
    ["label Contact : encre/75 sur sable", () => [opacite(c("encre"), c("sable"), 0.75), c("sable")], TEXTE],
    ["pied de page : creme/70 sur chocolat", () => [opacite(c("creme"), c("chocolat"), 0.7), c("chocolat")], TEXTE],
    ["étoiles : dore-fonce sur blanc (non textuel)", () => [c("dore-fonce"), c("blanc")], NON_TEXTE],
    ["icône WhatsApp : creme sur whatsapp (non textuel)", () => [c("creme"), c("whatsapp")], NON_TEXTE],
  ];

  it.each(paires)("%s", (_nom, couleurs, seuil) => {
    const [fg, bg] = couleurs();
    expect(ratio(fg, bg)).toBeGreaterThanOrEqual(seuil);
  });
});

describe("couleurs définies à un seul endroit", () => {
  const fichiers: string[] = [];
  const parcourir = (dir: string) => {
    for (const nom of readdirSync(dir)) {
      const chemin = join(dir, nom);
      if (statSync(chemin).isDirectory()) parcourir(chemin);
      else if (/\.tsx$/.test(nom) && !/\.test\./.test(nom)) fichiers.push(chemin);
    }
  };
  parcourir(join(process.cwd(), "app"));
  parcourir(join(process.cwd(), "components"));

  it("aucun composant ne contient de couleur en dur (hex, rgb, rgba, hsl)", () => {
    for (const f of fichiers) {
      const src = readFileSync(f, "utf8");
      expect(src, f).not.toMatch(/#[0-9a-fA-F]{3,8}\b(?![\w-])|\brgba?\(|\bhsla?\(/);
    }
  });

  it("aucun texte secondaire sous les opacités minimales (encre ≥ 70 %, creme ≥ 70 %)", () => {
    for (const f of fichiers) {
      const src = readFileSync(f, "utf8");
      expect(src, f).not.toMatch(/text-(encre|creme)\/(10|20|30|40|50|60)\b/);
    }
  });

  it("le doré de décor n'est jamais utilisé comme couleur de texte", () => {
    for (const f of fichiers) {
      const src = readFileSync(f, "utf8");
      expect(src, f).not.toMatch(/\btext-dore(?![-\w])/);
    }
  });
});

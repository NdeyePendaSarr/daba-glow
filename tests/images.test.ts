import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { join } from "node:path";
import config from "@/next.config";

const lire = (...p: string[]) => readFileSync(join(process.cwd(), ...p), "utf8");
const halo = lire("components", "Halo.tsx");
const LARGEURS = [160, 224, 320, 448];

describe("images", () => {
  it("les formats modernes sont activés pour les autres images (AVIF puis WebP)", () => {
    expect(config.images?.formats).toEqual(["image/avif", "image/webp"]);
  });

  it("plus aucune prop priority (obsolète dans Next.js 16)", () => {
    for (const f of readdirSync(join(process.cwd(), "components"))) {
      expect(lire("components", f), f).not.toMatch(/^\s*priority\s*$/m);
    }
  });
});

describe("portrait de l'accueil (élément LCP)", () => {
  it.each(LARGEURS)("la version %i px existe en AVIF et en WebP, et pèse moins de 15 Ko", (w) => {
    for (const ext of ["avif", "webp"]) {
      const f = join(process.cwd(), "public", "portrait", `portrait-${w}.${ext}`);
      expect(existsSync(f), f).toBe(true);
      expect(statSync(f).size).toBeLessThan(15 * 1024);
    }
  });

  it("est servi directement (sans /_next/image) via <picture>, AVIF puis WebP", () => {
    expect(halo).not.toMatch(/from "next\/image"/);
    expect(halo).toMatch(/<picture>/);
    expect(halo.indexOf('type="image/avif"')).toBeLessThan(halo.indexOf('type="image/webp"'));
  });

  it("a un srcset 1x/2x aux tailles affichées", () => {
    // tablette et desktop : anneaux md:h-68 (272 px) et lg:h-80 (320 px), image en md:inset-12 → 176 et 224 px
    expect(halo).toMatch(/md:h-68 md:w-68 lg:h-80 lg:w-80/);
    expect(halo).toContain("const LARGEURS = [160, 224, 320, 448];");
    // mobile, variante normale (À propos) : anneaux h-64 (256 px), image en inset-12 → 160 px
    expect(halo).toContain('normal: { boite: "h-72 w-72", anneaux: "h-64 w-64", anneauInterieur: "inset-6", photo: "inset-12" }');
    expect(halo).toContain('"(min-width: 1024px) 224px, (min-width: 768px) 176px, 160px"');
    // mobile, variante compacte (accueil) : anneaux 196 px, image en inset-[26px] → 144 px
    expect(halo).toContain('compact: { boite: "h-[196px] w-[196px]", anneaux: "h-[196px] w-[196px]"');
    expect(halo).toContain('photo: "inset-[26px] md:inset-12"');
    expect(halo).toContain('"(min-width: 1024px) 224px, (min-width: 768px) 176px, 144px"');
  });

  it("est préchargé et téléchargé en priorité haute (équivalent de priority)", () => {
    expect(halo).toMatch(/preload\("\/portrait\/portrait-320\.avif"/);
    expect(halo).toMatch(/fetchPriority: "high"/);
    expect(halo).toMatch(/fetchPriority="high"/);
    expect(halo).toMatch(/loading="eager"/);
  });
});

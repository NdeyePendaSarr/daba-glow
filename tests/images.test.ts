import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import config from "@/next.config";

const lire = (...p: string[]) => readFileSync(join(process.cwd(), ...p), "utf8");

describe("images", () => {
  it("les formats modernes sont activés (AVIF puis WebP)", () => {
    expect(config.images?.formats).toEqual(["image/avif", "image/webp"]);
  });

  it("le portrait (image LCP de l'accueil) est préchargé en priorité haute", () => {
    const halo = lire("components", "Halo.tsx");
    expect(halo).toMatch(/\bpreload\b/);
    expect(halo).toMatch(/fetchPriority="high"/);
  });

  it("le sizes du portrait correspond à la taille affichée (anneau − 96 px)", () => {
    const halo = lire("components", "Halo.tsx");
    // anneaux : h-64 (256 px), md:h-68 (272 px), lg:h-80 (320 px) ; image en inset-12 (48 px de chaque côté)
    expect(halo).toMatch(/h-64 w-64 md:h-68 md:w-68 lg:h-80 lg:w-80/);
    expect(halo).toMatch(/inset-12/);
    expect(halo).toContain('sizes="(min-width: 1024px) 224px, (min-width: 768px) 176px, 160px"');
  });

  it("plus aucune prop priority (obsolète dans Next.js 16)", () => {
    for (const f of readdirSync(join(process.cwd(), "components"))) {
      expect(lire("components", f), f).not.toMatch(/^\s*priority\s*$/m);
    }
  });
});

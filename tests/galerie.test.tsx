import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { statSync } from "node:fs";
import { join } from "node:path";
import { realisations } from "@/content/realisations";
import PolaroidCard from "@/components/PolaroidCard";

const dossier = join(process.cwd(), "public", "realisations");

describe("galerie de réalisations", () => {
  it("chaque photo est optimisée (≤ 150 Ko, comme les existantes)", () => {
    for (const r of realisations.filter((x) => x.image)) {
      expect(statSync(join(dossier, r.image!)).size, r.image).toBeLessThanOrEqual(150 * 1024);
    }
  });

  it("contient les 14 réalisations ajoutées le 15/11/2026", () => {
    const ajoutees = [
      "maquillage-dore-dentelle.jpg", "maquillage-rose-paillete.jpg", "coiffure-cauris-traditionnelle.jpg",
      "maquillage-peche.jpg", "nattes-collees-maquillage.jpg", "coiffure-plaquee-perles.jpg", "box-braids-bijoux.jpg",
      "chignon-boucle-perles-dorees.jpg", "chignon-banane-strass.jpg", "perruque-bob-chatain.jpg", "perruque-bob-noir.jpg",
      "chignon-torsade-fleur.jpg", "coiffure-plaquee-tresse-bijou.jpg", "coiffure-cascade-bijou-argent.jpg",
    ];
    const images = realisations.map((r) => r.image);
    for (const a of ajoutees) expect(images, a).toContain(a);
  });

  it("la légende n'affiche la date que si elle est connue", () => {
    const avec = realisations.find((r) => r.date)!;
    const sans = realisations.find((r) => !r.date)!;
    const { container: c1 } = render(<PolaroidCard realisation={avec} index={0} />);
    expect(c1.textContent).toContain(`${avec.titre} · ${avec.date}`);
    const { container: c2 } = render(<PolaroidCard realisation={sans} index={0} />);
    expect(c2.textContent).toContain(sans.titre);
    expect(c2.textContent).not.toMatch(/·|undefined/);
  });
});

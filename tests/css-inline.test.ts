import { describe, it, expect } from "vitest";
import config from "@/next.config";

describe("CSS critique", () => {
  it("la feuille de style est intégrée au HTML (aucune requête CSS bloquant le premier affichage)", () => {
    // Mesuré en 3G lente sur l'accueil : titre visible à 2,40 s au lieu de 5,46 s.
    expect(config.experimental?.inlineCss).toBe(true);
  });
});

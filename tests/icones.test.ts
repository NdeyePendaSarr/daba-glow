import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import manifest from "@/app/manifest";

/** Largeur et hauteur d'un PNG (en-tête IHDR). */
const taillePng = (f: string) => {
  const b = readFileSync(join(process.cwd(), "public", f));
  expect(b.subarray(1, 4).toString(), f).toBe("PNG");
  return [b.readUInt32BE(16), b.readUInt32BE(20)];
};

describe("icônes de l'application", () => {
  it("le manifeste déclare une icône 512 px, aussi en « maskable » pour Android", () => {
    const icones = manifest().icons ?? [];
    const i512 = icones.filter((i) => i.src === "/icon-512.png" && i.sizes === "512x512");
    expect(i512.map((i) => i.purpose).sort()).toEqual(["any", "maskable"]);
    expect(icones.some((i) => i.src === "/icon-192.png" && i.sizes === "192x192")).toBe(true);
  });

  it.each([
    ["icon-512.png", 512],
    ["icon-192.png", 192],
    ["apple-icon.png", 180],
    ["favicon-32.png", 32],
  ])("%s mesure bien %i px de côté", (f, n) => {
    expect(taillePng(f)).toEqual([n, n]);
  });
});

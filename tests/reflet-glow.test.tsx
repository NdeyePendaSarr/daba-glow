import { describe, it, expect } from "vitest";
import { renderToString } from "react-dom/server";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import Accueil from "@/app/page";

const css = readFileSync(join(process.cwd(), "app", "globals.css"), "utf8");
const regle = (sel: string) => css.match(new RegExp(`\\n${sel.replace(".", "\\.")}\\s*\\{([^}]*)\\}`))?.[1] ?? "";
const reduit = css.match(/@media \(prefers-reduced-motion: reduce\)\s*\{([\s\S]*?)\n\}/)?.[1] ?? "";

describe("reflet doré sur « GLOW »", () => {
  it("s'applique au mot GLOW du héros, et seulement à lui", () => {
    const div = document.createElement("div");
    div.innerHTML = renderToString(<Accueil />);
    const reflets = div.querySelectorAll(".reflet-glow");
    expect(reflets).toHaveLength(1);
    expect(reflets[0].textContent).toBe("GLOW");
    expect(reflets[0].closest("h1")).not.toBeNull();
  });

  it("tourne en boucle : un passage de 1,6 s puis une pause, après un court délai", () => {
    const r = regle(".reflet-glow");
    // cycle de 6,4 s, démarrage à 0,5 s, répété à l'infini
    expect(r).toMatch(/animation:\s*reflet-glow\s+6\.4s\s+[^;]*\s0\.5s\s+infinite\s+backwards/);
    // le passage occupe le premier quart du cycle (1,6 s), le reste est une pause
    const images = css.match(/@keyframes reflet-glow\s*\{([\s\S]*?)\n\}/)![1];
    expect(images).toMatch(/0%\s*\{\s*background-position:\s*100% 0;\s*\}/);
    expect(images).toMatch(/25%, 100%\s*\{\s*background-position:\s*0 0;\s*\}/);
  });

  it("garde un éclat doré, jamais blanc, et l'ambre au repos", () => {
    const r = regle(".reflet-glow");
    expect(r).toMatch(/var\(--color-ambre\) 0%/);
    expect(r).toMatch(/var\(--color-ambre\) 100%/);
    expect(r).not.toMatch(/#fff\b|#ffffff|white/i);
    expect(r).toMatch(/background-position:\s*0 0/); // état final : ambre plein
  });

  it("est coupé avec prefers-reduced-motion et lisible en mode contraste élevé", () => {
    expect(reduit).toMatch(/\.reflet-glow\s*\{\s*animation:\s*none/);
    expect(css).toMatch(/@media \(forced-colors: active\)\s*\{\s*\.reflet-glow\s*\{\s*background:\s*none;\s*color:\s*CanvasText/);
  });
});

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

  it("ne joue qu'une seule fois (jamais en boucle), après un court délai", () => {
    const r = regle(".reflet-glow");
    expect(r).toMatch(/animation:\s*reflet-glow\s+1\.6s\s+[^;]*\s0\.5s\s+1\s+backwards/);
    expect(r).not.toMatch(/infinite/);
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

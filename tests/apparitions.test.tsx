import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import Lightbox from "@/components/Lightbox";
import GalerieApercu from "@/components/GalerieApercu";

vi.mock("next/navigation", () => ({ usePathname: () => "/" }));
const { default: BarreNavigation } = await import("@/components/BarreNavigation");

const css = readFileSync(join(process.cwd(), "app", "globals.css"), "utf8");
const regle = (sel: string) => css.match(new RegExp(`\\n${sel.replace(".", "\\.")}\\s*\\{([^}]*)\\}`))?.[1] ?? "";
const reduit = css.match(/@media \(prefers-reduced-motion: reduce\)\s*\{([\s\S]*?)\n\}/)?.[1] ?? "";

describe("apparition du menu mobile et de la visionneuse", () => {
  it("le menu mobile apparaît en fondu à l'ouverture", () => {
    render(<BarreNavigation />);
    fireEvent.click(screen.getByRole("button", { name: "Ouvrir le menu" }));
    expect(screen.getByRole("navigation", { name: "Navigation mobile" })).toHaveClass("apparition");
  });

  it("la visionneuse apparaît en fondu, la photo en léger zoom", () => {
    render(<Lightbox items={[{ src: "/realisations/maquillage-dore.jpg", titre: "Essai" }]} index={0} onClose={() => {}} onPrev={() => {}} onNext={() => {}} />);
    const dialogue = screen.getByRole("dialog");
    expect(dialogue).toHaveClass("apparition-fond");
    expect(dialogue.querySelector(".apparition-zoom")).not.toBeNull();
  });

  it("durées courtes (≤ 200 ms) et animations coupées avec prefers-reduced-motion", () => {
    for (const c of [".apparition", ".apparition-fond", ".apparition-zoom"]) {
      const duree = Number(regle(c).match(/(\d+)ms/)?.[1]);
      expect(duree, c).toBeGreaterThan(0);
      expect(duree, c).toBeLessThanOrEqual(200);
    }
    expect(reduit).toMatch(/\.apparition, \.apparition-fond, \.apparition-zoom\s*\{\s*animation:\s*none/);
  });
});

describe("retour au toucher sur les vignettes de la galerie", () => {
  it("les vignettes mobiles (boutons) réagissent au toucher", () => {
    const { container } = render(<GalerieApercu />);
    const boutons = container.querySelectorAll<HTMLButtonElement>("button[data-lightbox]");
    const mobiles = [...boutons].filter((b) => b.className.includes("snap-center"));
    expect(mobiles.length).toBeGreaterThan(0);
    for (const b of mobiles) expect(b.className).toMatch(/active:scale-\[0\.98\]/);
  });
});

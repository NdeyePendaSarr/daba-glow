import { describe, it, expect } from "vitest";
import { renderToString } from "react-dom/server";
import APropos from "@/app/a-propos/page";
import { parcours } from "@/content/a-propos";

describe("À propos : espace entre les étapes du parcours", () => {
  const div = document.createElement("div");
  div.innerHTML = renderToString(<APropos />);
  const frise = div.querySelector(".border-l")!;
  const etapes = [...frise.children];

  it("une étape par élément de content/a-propos.ts, toutes sœurs dans la frise", () => {
    expect(etapes).toHaveLength(parcours.length);
  });

  it("chaque étape porte l'espace du bas (48 px), sauf la dernière grâce à last:pb-0", () => {
    // `last:` ne marche que si l'élément a des frères : sur un enfant unique, il s'applique à toutes les étapes.
    for (const e of etapes) {
      expect(e.className).toMatch(/(^|\s)pb-12(\s|$)/);
      expect(e.className).toMatch(/(^|\s)last:pb-0(\s|$)/);
    }
    // aucune règle `last:` posée sur un enfant unique dans la frise
    for (const el of frise.querySelectorAll("[class*='last:']")) {
      expect(el.parentElement!.children.length, el.className).toBeGreaterThan(1);
    }
  });
});

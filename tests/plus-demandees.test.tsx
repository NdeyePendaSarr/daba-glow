import { describe, it, expect } from "vitest";
import { renderToString } from "react-dom/server";
import Accueil from "@/app/page";

describe("« Les plus demandées » sur l'accueil", () => {
  it("montre maquillage jour, manucure classique et tresses, dans cet ordre", () => {
    const d = document.createElement("div");
    d.innerHTML = renderToString(<Accueil />);
    const titre = [...d.querySelectorAll("p")].find((p) => p.textContent === "Les plus demandées");
    expect(titre).toBeDefined();
    const section = titre!.closest("section")!;
    const noms = [...section.querySelectorAll("h3")].map((h) => h.textContent);
    expect(noms).toEqual(["Maquillage jour", "Manucure classique", "Tresses"]);
  });
});

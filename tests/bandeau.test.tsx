import { describe, it, expect } from "vitest";
import { renderToString } from "react-dom/server";
import Header from "@/components/Header";
import { site } from "@/content/site.config";

describe("bandeau du haut", () => {
  it("affiche le texte choisi sur toutes les pages (en-tête)", () => {
    expect(site.bandeau).toBe("Au salon ou chez toi · Réponse rapide sur WhatsApp");
    const div = document.createElement("div");
    div.innerHTML = renderToString(<Header />);
    expect(div.textContent).toContain(site.bandeau);
  });
});

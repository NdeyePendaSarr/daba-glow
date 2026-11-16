import { describe, it, expect, afterEach } from "vitest";
import { render } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import AnimatedCounter from "@/components/AnimatedCounter";
import Contact from "@/app/contact/page";
import { chiffres } from "@/content/atouts";

const matchMediaParDefaut = window.matchMedia;
afterEach(() => {
  window.matchMedia = matchMediaParDefaut;
});

describe("délai de réponse à la place de « 100 % »", () => {
  it("les chiffres clés annoncent une réponse en moins d'1 h, et plus « 100 % »", () => {
    expect(chiffres).toContainEqual({ valeur: "< 1 h", label: "pour te répondre sur WhatsApp" });
    expect(chiffres.map((c) => c.valeur)).not.toContain("100 %");
  });

  it("la page Contact annonce le même délai", () => {
    const texte = renderToString(<Contact />);
    expect(texte).toContain("en moins d&#x27;1 h");
    expect(texte).not.toContain("sous 2 h");
  });

  it("« < 1 h » ne passe jamais par « < 0 h » (rien à compter), alors que « 50+ » compte depuis 0", () => {
    // jsdom : élément hors écran (rectangle nul) et IntersectionObserver simulé (tests/setup.ts) ;
    // ici, la visiteuse n'a PAS demandé moins d'animations.
    window.matchMedia = ((q: string) => ({ ...matchMediaParDefaut(q), matches: false })) as typeof window.matchMedia;
    const { container: delai } = render(<AnimatedCounter valeur="< 1 h" />);
    expect(delai.textContent).toBe("< 1 h");
    const { container: clientes } = render(<AnimatedCounter valeur="50+" />);
    expect(clientes.textContent).toBe("0+");
  });
});

import { describe, it, expect } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import DefilementPoints from "@/components/DefilementPoints";
import GalerieApercu from "@/components/GalerieApercu";
import GalerieCategorie from "@/components/GalerieCategorie";
import { realisations } from "@/content/realisations";

const html = (el: React.ReactElement) => {
  const div = document.createElement("div");
  div.innerHTML = renderToString(el);
  return div;
};

describe("galeries mobiles : une photo entière à la fois, avec des points", () => {
  it("un point par photo, décoratifs, masqués à partir de 768 px", () => {
    const d = html(<GalerieApercu />);
    const points = d.querySelector("[data-points]")!;
    expect(points.getAttribute("aria-hidden")).toBe("true");
    expect(points.className).toMatch(/\bmd:hidden\b/);
    expect(points.children).toHaveLength(4);
    expect(points.querySelectorAll("[data-actif]")).toHaveLength(1);
    expect(points.children[0].hasAttribute("data-actif")).toBe(true);
  });

  it.each(["Maquillage", "Manucure", "Coiffure"] as const)("galerie %s : un point par réalisation", (categorie) => {
    const attendu = realisations.filter((r) => r.categories.includes(categorie)).length;
    const d = html(<GalerieCategorie categorie={categorie} />);
    expect(d.querySelector("[data-points]")!.children).toHaveLength(attendu);
  });

  it("chaque élément occupe toute la largeur sur mobile, et redevient une case de grille sur desktop", () => {
    const apercu = html(<GalerieApercu />);
    for (const el of apercu.querySelectorAll(".snap-center")) {
      expect(el.className).toMatch(/\bw-full\b.*\bflex-none\b.*\bmd:w-auto\b/);
    }
    const cat = html(<GalerieCategorie categorie="Coiffure" />);
    for (const el of cat.querySelectorAll(".snap-center")) {
      expect(el.className).toMatch(/\bw-full\b.*\bflex-none\b/);
      expect(el.className).toMatch(/\bmd:w-auto\b.*\bmd:p-0\b/);
    }
  });

  it("le point actif suit la photo visible quand on fait défiler", () => {
    const { container } = render(
      <DefilementPoints nombre={3} className="liste">
        <div>a</div>
        <div>b</div>
        <div>c</div>
      </DefilementPoints>
    );
    const liste = container.querySelector(".liste") as HTMLElement;
    const [a, b] = liste.children as unknown as HTMLElement[];
    // jsdom ne calcule pas la mise en page : on simule des photos de 300 px espacées de 16 px
    Object.defineProperty(a, "offsetLeft", { value: 0 });
    Object.defineProperty(b, "offsetLeft", { value: 316 });
    const actif = () => [...container.querySelectorAll("[data-points] > span")].findIndex((s) => s.hasAttribute("data-actif"));

    expect(actif()).toBe(0);
    liste.scrollLeft = 320;
    fireEvent.scroll(liste);
    expect(actif()).toBe(1);
    liste.scrollLeft = 5000; // au-delà de la fin : reste sur la dernière
    fireEvent.scroll(liste);
    expect(actif()).toBe(2);
  });

  it("sans point quand il n'y a qu'une photo", () => {
    const d = html(
      <DefilementPoints nombre={1} className="liste">
        <div>a</div>
      </DefilementPoints>
    );
    expect(d.querySelector("[data-points]")).toBeNull();
  });
});

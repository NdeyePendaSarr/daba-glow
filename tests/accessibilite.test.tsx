import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Footer from "@/components/Footer";
import Lightbox from "@/components/Lightbox";
import PolaroidCard from "@/components/PolaroidCard";
import { realisations } from "@/content/realisations";

vi.mock("next/navigation", () => ({ usePathname: () => "/prestations" }));
const { default: BarreNavigation } = await import("@/components/BarreNavigation");

describe("pied de page : cibles tactiles", () => {
  it("chaque lien fait au moins 44 px de haut (min-h-11)", () => {
    const { container } = render(<Footer />);
    const liens = container.querySelectorAll("a");
    expect(liens.length).toBeGreaterThanOrEqual(4);
    for (const a of liens) expect(a.className, a.textContent!).toMatch(/\bmin-h-11\b/);
  });
});

describe("navigation", () => {
  it("le lien de la page en cours porte aria-current=\"page\" (et lui seul)", () => {
    render(<BarreNavigation />);
    const courants = document.querySelectorAll('[aria-current="page"]');
    expect(courants).toHaveLength(1);
    expect(courants[0]).toHaveAttribute("href", "/prestations");
  });

  it("Échap ferme le menu mobile et rend le focus au bouton du menu", () => {
    render(<BarreNavigation />);
    fireEvent.click(screen.getByRole("button", { name: "Ouvrir le menu" }));
    expect(screen.getByRole("navigation", { name: "Navigation mobile" })).toBeInTheDocument();
    fireEvent.keyDown(window, { key: "Escape" });
    expect(screen.queryByRole("navigation", { name: "Navigation mobile" })).toBeNull();
    expect(document.activeElement).toBe(screen.getByRole("button", { name: "Ouvrir le menu" }));
  });
});

describe("visionneuse photo : focus", () => {
  const items = [{ src: "/a.jpg", titre: "A" }, { src: "/b.jpg", titre: "B" }];

  it("place le focus sur « Fermer » à l'ouverture et le rend à l'élément d'origine à la fermeture", () => {
    const origine = document.createElement("button");
    document.body.append(origine);
    origine.focus();
    const { unmount } = render(<Lightbox items={items} index={0} onClose={() => {}} onPrev={() => {}} onNext={() => {}} />);
    expect(document.activeElement).toBe(screen.getByRole("button", { name: "Fermer" }));
    unmount();
    expect(document.activeElement).toBe(origine);
    origine.remove();
  });

  it("Tab et Maj+Tab restent dans la visionneuse", () => {
    render(<Lightbox items={items} index={0} onClose={() => {}} onPrev={() => {}} onNext={() => {}} />);
    const boutons = screen.getByRole("dialog").querySelectorAll("button");
    const premier = boutons[0], dernier = boutons[boutons.length - 1];
    dernier.focus();
    fireEvent.keyDown(window, { key: "Tab" });
    expect(document.activeElement).toBe(premier);
    fireEvent.keyDown(window, { key: "Tab", shiftKey: true });
    expect(document.activeElement).toBe(dernier);
  });
});

describe("polaroïds", () => {
  const photo = realisations.find((r) => r.image)!;

  it("en bouton : légende en <span> (pas de <figcaption>) et image décorative", () => {
    const { container } = render(<PolaroidCard realisation={photo} index={0} lightboxIndex={0} />);
    expect(container.querySelector("figcaption")).toBeNull();
    expect(container.querySelector("img")).toHaveAttribute("alt", "");
    expect(screen.getByRole("button")).toHaveAccessibleName(new RegExp(photo.titre));
  });

  it("hors bouton : <figure> avec <figcaption> et texte alternatif", () => {
    const { container } = render(<PolaroidCard realisation={photo} index={0} />);
    expect(container.querySelector("figure figcaption")).not.toBeNull();
    expect(container.querySelector("img")).toHaveAttribute("alt", photo.titre);
  });
});

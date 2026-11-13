import { describe, it, expect, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { lienWhatsApp } from "@/content/site.config";

vi.mock("next/navigation", () => ({ usePathname: () => "/" }));
const { default: BarreNavigation } = await import("@/components/BarreNavigation");

/** Taille Tailwind (h-11 = 2.75rem = 44 px) lue dans les classes, faute de mise en page dans jsdom. */
const pixels = (el: Element, axe: "h" | "w") => {
  const m = el.getAttribute("class")!.match(new RegExp(`(?:^|\\s)${axe}-(\\d+)(?:\\s|$)`));
  return m ? Number(m[1]) * 4 : 0;
};

describe("en-tête mobile (< 768 px)", () => {
  it("le burger fait au moins 44 × 44 px", () => {
    render(<BarreNavigation />);
    const burger = screen.getByRole("button", { name: "Ouvrir le menu" });
    expect(pixels(burger, "h")).toBeGreaterThanOrEqual(44);
    expect(pixels(burger, "w")).toBeGreaterThanOrEqual(44);
  });

  it("le bouton « Réserver » WhatsApp est visible à côté du burger, sans ouvrir le menu", () => {
    render(<BarreNavigation />);
    const groupeMobile = screen.getByRole("button", { name: "Ouvrir le menu" }).parentElement!;
    expect(groupeMobile.className).toMatch(/\bmd:hidden\b/);
    const reserver = within(groupeMobile).getByRole("link", { name: "Réserver" });
    expect(reserver).toHaveAttribute("href", lienWhatsApp);
    expect(pixels(reserver, "h")).toBeGreaterThanOrEqual(44);
  });

  it("le logo reste présent dans l'en-tête", () => {
    render(<BarreNavigation />);
    expect(screen.getAllByRole("link").find((a) => a.getAttribute("href") === "/" && /Daba/.test(a.textContent!))).toBeDefined();
  });
});

import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import NotFound, { metadata } from "@/app/not-found";

describe("page 404", () => {
  it("a son propre titre d'onglet, différent de celui de l'accueil", () => {
    expect(metadata.title).toEqual({ absolute: "Page introuvable · Daba Glow" });
  });

  it("affiche un titre h1 et un lien de retour vers l'accueil", () => {
    render(<NotFound />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Cette page a perdu son éclat");
    expect(screen.getByRole("link", { name: /Retour à l'accueil/ })).toHaveAttribute("href", "/");
  });
});

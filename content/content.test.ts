import { describe, it, expect } from "vitest";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { prestations, categories } from "./prestations";
import { realisations } from "./realisations";
import { site, lienWhatsApp } from "./site.config";

const CATS = ["Maquillage", "Manucure", "Coiffure"];
const PUBLIC = join(process.cwd(), "public");

describe("prestations", () => {
  it("ont toutes les champs requis non vides", () => {
    for (const p of prestations) {
      expect(p.nom.trim()).not.toBe("");
      expect(p.description.trim()).not.toBe("");
      expect(p.prix.trim()).not.toBe("");
      expect(p.duree.trim()).not.toBe("");
      expect(CATS).toContain(p.categorie);
    }
  });

  it("ont des noms uniques (clé React des cartes)", () => {
    const noms = prestations.map((p) => p.nom);
    expect(new Set(noms).size).toBe(noms.length);
  });

  it("dérivent la liste des catégories réellement présentes", () => {
    for (const c of categories) expect(CATS).toContain(c);
    for (const p of prestations) expect(categories).toContain(p.categorie);
  });

  it("référencent des images qui existent dans public/prestations/", () => {
    for (const p of prestations) {
      if (!p.image) continue;
      expect(existsSync(join(PUBLIC, "prestations", p.image))).toBe(true);
    }
  });
});

describe("realisations", () => {
  it("ont un titre et au moins une catégorie valide", () => {
    for (const r of realisations) {
      expect(r.titre.trim()).not.toBe("");
      expect(r.categories.length).toBeGreaterThan(0);
      for (const c of r.categories) expect(CATS).toContain(c);
    }
  });

  it("portent soit une image, soit un id TikTok (jamais rien)", () => {
    for (const r of realisations) {
      expect(Boolean(r.image) || Boolean(r.tiktokId)).toBe(true);
    }
  });

  it("référencent des images qui existent dans public/realisations/", () => {
    for (const r of realisations) {
      if (!r.image) continue;
      expect(existsSync(join(PUBLIC, "realisations", r.image))).toBe(true);
    }
  });

  it("ont des titres uniques (clé React de la galerie)", () => {
    const titres = realisations.map((r) => r.titre);
    expect(new Set(titres).size).toBe(titres.length);
  });
});

describe("configuration du site", () => {
  it("a un numéro WhatsApp sénégalais valide (12 chiffres, préfixe 221)", () => {
    expect(site.whatsapp).toMatch(/^221\d{9}$/);
  });

  it("construit un lien wa.me avec le message encodé", () => {
    expect(lienWhatsApp.startsWith(`https://wa.me/${site.whatsapp}?text=`)).toBe(
      true
    );
    expect(lienWhatsApp).not.toContain(" ");
  });

  it("a une URL absolue en https", () => {
    expect(site.url).toMatch(/^https:\/\//);
  });

  it("expose le portrait référencé par le héros", () => {
    expect(existsSync(join(PUBLIC, "portrait.jpg"))).toBe(true);
  });
});

import { test, expect, type Page } from "@playwright/test";

/**
 * Premier écran mobile de l'accueil : sans défiler, on doit voir le portrait de Daba
 * ENTIER, le bouton « Réserver sur WhatsApp » et le lien d'appel.
 */
async function entierementVisible(page: Page, selecteur: string) {
  const el = page.locator(selecteur).first();
  await expect(el).toBeVisible();
  const boite = (await el.boundingBox())!;
  const ecran = page.viewportSize()!;
  expect(boite.y, `${selecteur} : haut`).toBeGreaterThanOrEqual(0);
  expect(boite.x, `${selecteur} : gauche`).toBeGreaterThanOrEqual(0);
  expect(boite.y + boite.height, `${selecteur} : bas (écran de ${ecran.height} px)`).toBeLessThanOrEqual(ecran.height);
  expect(boite.x + boite.width, `${selecteur} : droite`).toBeLessThanOrEqual(ecran.width);
  return boite;
}

for (const ecran of [
  { nom: "360 × 800", width: 360, height: 800 },
  { nom: "412 × 823 (Moto G Power de PageSpeed Insights)", width: 412, height: 823 },
]) {
  test.describe(`accueil, premier écran ${ecran.nom}`, () => {
    test.use({ viewport: { width: ecran.width, height: ecran.height }, isMobile: true, hasTouch: true });

    test("le portrait, le bouton WhatsApp et le lien d'appel sont entièrement visibles sans défiler", async ({ page }) => {
      await page.goto("/");
      const portrait = await entierementVisible(page, "main section picture img");
      expect(portrait.width).toBeGreaterThanOrEqual(140); // portrait assez grand pour rester l'élément LCP
      await entierementVisible(page, 'main section a:has-text("Réserver sur WhatsApp")');
      await entierementVisible(page, 'main section a[href^="tel:"]');
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(ecran.width);
    });
  });
}

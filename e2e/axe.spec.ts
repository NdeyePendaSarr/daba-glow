import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

/**
 * Accessibilité dans un vrai navigateur : 0 violation axe (WCAG 2.1 A et AA + bonnes pratiques)
 * sur les 4 pages, en mobile et en desktop. Même règle que les audits des lots 3 à 9.
 */
const pages = ["/", "/prestations", "/a-propos", "/contact"];
const ecrans = [
  { nom: "mobile 360", viewport: { width: 360, height: 800 }, isMobile: true },
  { nom: "desktop 1440", viewport: { width: 1440, height: 900 }, isMobile: false },
];

for (const e of ecrans) {
  test.describe(`axe, ${e.nom}`, () => {
    test.use({ viewport: e.viewport, isMobile: e.isMobile });
    for (const chemin of pages) {
      test(`${chemin} : aucune violation`, async ({ page }) => {
        await page.goto(chemin);
        // Le contenu apparaît en fondu (opacité 0,4 → 1 en 220 ms, `.entree-page`) : mesurer
        // pendant ce fondu fait échouer les textes les plus pâles. On attend donc sa fin.
        await page.waitForFunction(() =>
          document
            .getAnimations()
            .every((a) => (a as CSSAnimation).animationName !== "entree-page" || a.playState === "finished")
        );
        const resultat = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"])
          .analyze();
        const resume = resultat.violations.map((v) => `${v.id} (${v.nodes.length}) : ${v.nodes[0]?.target.join(" ")}`);
        expect(resume).toEqual([]);
      });
    }
  });
}

test("aucune violation de la politique de sécurité (CSP) en parcourant le site", async ({ page }) => {
  const violations: string[] = [];
  page.on("console", (m) => {
    if (/Content Security Policy|Refused to/i.test(m.text())) violations.push(m.text());
  });
  for (const chemin of pages) {
    await page.goto(chemin);
    await page.waitForLoadState("networkidle");
  }
  // visionneuse : ouverture d'une photo
  await page.goto("/prestations");
  await page.locator("button[data-lightbox]:visible").first().click();
  await expect(page.getByRole("dialog")).toBeVisible();
  expect(violations).toEqual([]);
});

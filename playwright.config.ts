import { defineConfig, devices } from "@playwright/test";

/**
 * Tests de bout en bout (navigateur réel) : `npm run test:e2e`.
 * Par défaut, construit puis démarre le site sur le port 3100 ;
 * E2E_BASE_URL permet de viser un serveur déjà lancé (prévisualisation, etc.).
 */
const base = process.env.E2E_BASE_URL ?? "http://localhost:3100";

export default defineConfig({
  testDir: "e2e",
  fullyParallel: true,
  reporter: "list",
  use: { baseURL: base, ...devices["Desktop Chrome"] },
  webServer: process.env.E2E_BASE_URL
    ? undefined
    : { command: "npm run build && npm run start -- -p 3100", url: base, timeout: 180_000, reuseExistingServer: true },
});

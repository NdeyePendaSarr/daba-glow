import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

const exclus = ["node_modules/**", ".next/**", "e2e/**"];

export default defineConfig({
  resolve: {
    alias: { "@": fileURLToPath(new URL("./", import.meta.url)) },
  },
  test: {
    setupFiles: ["./tests/setup.ts"],
    // Deux projets (remplacent environmentMatchGlobs, retiré de Vitest) :
    // les tests .test.ts tournent dans Node, les tests de rendu .test.tsx dans jsdom.
    // Un fichier peut forcer son environnement avec le commentaire « @vitest-environment ».
    projects: [
      { extends: true, test: { name: "node", environment: "node", include: ["**/*.test.ts"], exclude: exclus } },
      { extends: true, test: { name: "jsdom", environment: "jsdom", include: ["**/*.test.tsx"], exclude: exclus } },
    ],
    coverage: {
      provider: "v8",
      include: ["app/**/*.{ts,tsx}", "components/**/*.tsx", "content/**/*.ts", "lib/**/*.ts"],
      exclude: ["**/*.test.{ts,tsx}"],
      reporter: ["text-summary", "text"],
      // Seuils un peu sous le niveau mesuré le 15/11/2026 (lignes 84,6 %, instructions 80,6 %,
      // fonctions 81,6 %, branches 75,4 %) : la CI échoue si la couverture baisse nettement.
      thresholds: { lines: 80, statements: 75, functions: 75, branches: 70 },
    },
  },
});

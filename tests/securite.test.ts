import { describe, it, expect, vi } from "vitest";

/** Charge next.config.ts avec un NODE_ENV donné (la CSP diffère en développement). */
async function charger(env: string) {
  vi.resetModules();
  vi.stubEnv("NODE_ENV", env);
  const mod = await import("@/next.config");
  vi.unstubAllEnvs();
  return mod;
}

describe("en-têtes de sécurité", () => {
  it("s'appliquent à toutes les pages et à tous les fichiers", async () => {
    const { default: config } = await charger("production");
    const regles = await config.headers!();
    const toutes = regles.find((r) => r.source === "/:chemin*")!;
    const cles = toutes.headers.map((h) => h.key);
    expect(cles).toEqual(["Content-Security-Policy", "X-Frame-Options", "X-Content-Type-Options", "Referrer-Policy", "Permissions-Policy"]);
    expect(toutes.headers).toContainEqual({ key: "X-Frame-Options", value: "DENY" });
    expect(toutes.headers).toContainEqual({ key: "X-Content-Type-Options", value: "nosniff" });
    expect(toutes.headers).toContainEqual({ key: "Referrer-Policy", value: "strict-origin-when-cross-origin" });
  });

  it("CSP de production : rien d'extérieur sauf TikTok (cadre) et la barre Vercel, pas d'eval", async () => {
    const { politiqueContenu } = await charger("production");
    const d = Object.fromEntries(politiqueContenu.split("; ").map((x) => [x.split(" ")[0], x.split(" ").slice(1).join(" ")]));
    expect(d["default-src"]).toBe("'self'");
    expect(d["frame-ancestors"]).toBe("'none'");
    expect(d["object-src"]).toBe("'none'");
    expect(d["base-uri"]).toBe("'self'");
    expect(d["form-action"]).toBe("'self'");
    expect(d["frame-src"]).toBe("https://www.tiktok.com https://vercel.live");
    expect(d["script-src"]).not.toMatch(/unsafe-eval/);
    expect(politiqueContenu).toMatch(/upgrade-insecure-requests/);
  });

  it("'unsafe-eval' n'est ajouté qu'en développement (rechargement à chaud)", async () => {
    const { politiqueContenu } = await charger("development");
    expect(politiqueContenu).toMatch(/script-src [^;]*'unsafe-eval'/);
  });

  it("le cache du portrait est conservé à côté des en-têtes de sécurité", async () => {
    const { default: config } = await charger("production");
    const regles = await config.headers!();
    expect(regles.find((r) => r.source.startsWith("/portrait/"))!.headers).toContainEqual({
      key: "Cache-Control",
      value: "public, max-age=604800, stale-while-revalidate=86400",
    });
  });
});

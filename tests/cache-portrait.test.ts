import { describe, it, expect } from "vitest";
import config from "@/next.config";

describe("cache du portrait", () => {
  it("les fichiers de /portrait/ sont mis en cache 7 jours (au lieu de max-age=0)", async () => {
    const regles = await config.headers!();
    const r = regles.find((x) => x.source.startsWith("/portrait/"))!;
    expect(r.headers).toContainEqual({ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" });
  });
});

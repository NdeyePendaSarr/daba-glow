import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const layout = readFileSync(join(process.cwd(), "app", "layout.tsx"), "utf8");

function sources(): string[] {
  const res: string[] = [];
  const parcourir = (d: string) => {
    for (const n of readdirSync(d)) {
      const p = join(d, n);
      if (statSync(p).isDirectory()) parcourir(p);
      else if (/\.tsx$/.test(n) && !/\.test\./.test(n)) res.push(p);
    }
  };
  parcourir(join(process.cwd(), "app"));
  parcourir(join(process.cwd(), "components"));
  return res;
}

describe("polices", () => {
  it("next/font, sous-ensemble latin et display swap pour les deux polices", () => {
    expect(layout).toMatch(/from "next\/font\/google"/);
    expect(layout.match(/subsets: \["latin"\]/g)).toHaveLength(2);
    expect(layout.match(/display: "swap"/g)).toHaveLength(2);
  });

  it("seul le style italique de Fraunces est chargé", () => {
    expect(layout).toMatch(/style: \["italic"\]/);
  });

  it("toute utilisation de font-display est en italique (sinon le style droit manquerait)", () => {
    for (const f of sources()) {
      const src = readFileSync(f, "utf8");
      for (const m of src.matchAll(/className=(?:"([^"]*)"|\{`([^`]*)`\})/g)) {
        const classes = m[1] ?? m[2];
        if (/\bfont-display\b/.test(classes)) expect(classes, f).toMatch(/\bitalic\b/);
      }
    }
  });
});

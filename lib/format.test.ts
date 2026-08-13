import { describe, it, expect } from "vitest";
import { formatTelephone } from "./format";

describe("formatTelephone", () => {
  it("formate un numéro sénégalais à 12 chiffres", () => {
    expect(formatTelephone("221768850492")).toBe("+221 76 885 04 92");
  });
  it("se rabat proprement sur un format inattendu", () => {
    expect(formatTelephone("123456")).toBe("+123456");
  });
});

import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import Accueil from "@/app/page";
import Prestations from "@/app/prestations/page";
import APropos from "@/app/a-propos/page";
import Contact, { metadata as metaContact } from "@/app/contact/page";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Temoignages, { classeGrille } from "@/components/Temoignages";
import { site, lienWhatsApp, lienTelephone } from "@/content/site.config";
import { temoignages } from "@/content/temoignages";
import { schemaBeautySalon } from "@/lib/donnees-structurees";

const pages = [
  { route: "/", Composant: Accueil },
  { route: "/prestations", Composant: Prestations },
  { route: "/a-propos", Composant: APropos },
  { route: "/contact", Composant: Contact },
];

function rendrePageComplete(Composant: () => React.ReactNode) {
  return render(
    <>
      <Header />
      <main>
        <Composant />
      </main>
      <Footer />
    </>
  );
}

/** Tous les fichiers source publiés (hors tests). */
function fichiersSource(): string[] {
  const res: string[] = [];
  const parcourir = (dir: string) => {
    for (const nom of readdirSync(dir)) {
      const chemin = join(dir, nom);
      if (statSync(chemin).isDirectory()) parcourir(chemin);
      else if (/\.(ts|tsx)$/.test(nom) && !/\.test\./.test(nom)) res.push(chemin);
    }
  };
  for (const d of ["app", "components", "content", "lib"]) parcourir(join(process.cwd(), d));
  return res;
}

describe("le salon ET le déplacement à domicile sont dits clairement", () => {
  it("la configuration expose le salon (quartier, ville) et une zone de déplacement distinctes", () => {
    expect(site.salon.quartier).toBe("Darou Salam");
    expect(site.salon.ville).toBe("Mbour");
    expect(site.zoneDeplacement).toBeTruthy();
  });

  it.each(pages)("la page $route mentionne le salon et le domicile", ({ Composant }) => {
    const { container } = rendrePageComplete(Composant);
    const texte = container.textContent ?? "";
    expect(texte).toMatch(/salon/i);
    expect(texte).toMatch(/domicile/i);
  });

  it("la page Contact annonce le salon à Darou Salam et explique comment s'y rendre", () => {
    const { container } = render(<Contact />);
    const texte = container.textContent ?? "";
    expect(texte).toContain("Salon à Darou Salam, Mbour");
    expect(texte).toContain("Darou Salam, Mbour. Appelez ou écrivez sur WhatsApp, on vous guide jusqu'au salon.");
  });

  it("la meta de Contact ne promet pas Instagram si le compte n'est pas configuré", () => {
    if (!site.instagram) expect(String(metaContact.description)).not.toMatch(/Instagram/);
  });
});

describe("numéro unique pour WhatsApp et les appels", () => {
  it("les liens WhatsApp et tel: sont construits depuis site.telephone", () => {
    expect(site.telephone).toMatch(/^221\d{9}$/);
    expect(new URL(lienWhatsApp).pathname).toBe(`/${site.telephone}`);
    expect(lienTelephone).toBe(`tel:+${site.telephone}`);
  });

  it("le pied de page propose un lien d'appel tel:", () => {
    const { container } = render(<Footer />);
    expect(container.querySelector('a[href^="tel:"]')).not.toBeNull();
  });

  it.each(pages)(
    "sur $route, tous les liens WhatsApp et tel: utilisent le même numéro",
    ({ route, Composant }) => {
      const { container } = rendrePageComplete(Composant);
      const wa = [...container.querySelectorAll('a[href^="https://wa.me/"]')].map(
        (a) => new URL(a.getAttribute("href")!).pathname.slice(1)
      );
      const tel = [...container.querySelectorAll('a[href^="tel:"]')].map((a) =>
        a.getAttribute("href")!.replace(/^tel:\+?/, "")
      );
      expect(wa.length).toBeGreaterThan(0);
      expect(tel.length).toBeGreaterThan(0);
      if (route === "/contact") expect(tel.length).toBeGreaterThanOrEqual(2); // page + pied de page
      for (const n of [...wa, ...tel]) expect(n).toBe(site.telephone);
    }
  );
});

describe("données structurées schema.org", () => {
  it("l'accueil publie un JSON-LD BeautySalon à Mbour, quartier Darou Salam", () => {
    const { container } = render(<Accueil />);
    const balise = container.querySelector('script[type="application/ld+json"]');
    expect(balise).not.toBeNull();
    const ld = JSON.parse(balise!.textContent!);
    expect(ld["@type"]).toBe("BeautySalon");
    expect(ld.address.addressLocality).toBe("Mbour");
    expect(ld.containedInPlace.name).toContain("Darou Salam");
    expect(ld.areaServed.name).toBe("Mbour");
    expect(ld.telephone).toBe(`+${site.telephone}`);
  });
});

describe("aucune adresse exacte ni coordonnée GPS n'est publiée", () => {
  const CLES_INTERDITES = ["streetAddress", "postalCode", "geo", "latitude", "longitude", "hasMap"];

  it("le JSON-LD ne contient ni rue, ni code postal, ni coordonnées, ni carte", () => {
    const cles: string[] = [];
    const parcourir = (v: unknown) => {
      if (v && typeof v === "object") {
        for (const [k, x] of Object.entries(v)) {
          cles.push(k);
          parcourir(x);
        }
      }
    };
    parcourir(schemaBeautySalon());
    for (const c of CLES_INTERDITES) expect(cles).not.toContain(c);
  });

  it("ni le code source ni les pages rendues ne contiennent d'adresse, de GPS ou de lien de carte", () => {
    const motifs: [string, RegExp][] = [
      ["coordonnées décimales", /-?\d{1,3}\.\d{3,}\s*,\s*-?\d{1,3}\.\d{3,}/],
      ["coordonnées en degrés", /\d{1,3}\s*°\s*\d{1,2}\s*['′]/],
      ["clé schema.org d'adresse ou de position", /streetAddress|postalCode|GeoCoordinates|latitude|longitude|hasMap/i],
      ["lien de carte", /google\.[a-z.]+\/maps|maps\.google|maps\.app\.goo\.gl|goo\.gl\/maps|openstreetmap\.org|waze\.com|maps\.apple\.com/i],
      ["numéro de rue ou de parcelle", /\b(rue|avenue|av\.|villa|parcelle|lot|lotissement|cité)\s*n?°?\s*\d+/i],
    ];
    const sources = fichiersSource().map((f) => [f, readFileSync(f, "utf8")] as const);
    const rendus = pages.map(({ route, Composant }) => {
      const { container } = rendrePageComplete(Composant);
      return [`rendu ${route}`, container.innerHTML] as const;
    });
    for (const [ou, contenu] of [...sources, ...rendus]) {
      for (const [nom, motif] of motifs) {
        expect(motif.test(contenu), `${nom} trouvé dans ${ou}`).toBe(false);
      }
    }
  });
});

describe("grille des témoignages", () => {
  it("n'a jamais de colonne vide selon le nombre de témoignages", () => {
    expect(classeGrille(1)).not.toMatch(/grid-cols/);
    expect(classeGrille(2)).toContain("md:grid-cols-2");
    expect(classeGrille(2)).toContain("mx-auto");
    expect(classeGrille(3)).toContain("md:grid-cols-3");
  });

  it("affiche toutes les cartes dans une grille adaptée au nombre réel", () => {
    const { container } = render(<Temoignages />);
    expect(container.querySelectorAll("article")).toHaveLength(temoignages.length);
    expect((container.firstChild as HTMLElement).className).toBe(classeGrille(temoignages.length));
  });
});

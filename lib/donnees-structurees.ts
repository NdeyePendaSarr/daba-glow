import { site } from "@/content/site.config";

/**
 * Données structurées schema.org « BeautySalon » pour le référencement local.
 * Volontairement SANS adresse exacte : ni rue, ni code postal, ni coordonnées
 * GPS. Seuls la ville et le quartier sont publiés (vérifié par les tests).
 */
export function schemaBeautySalon() {
  return {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    name: site.nom,
    description: site.description,
    url: site.url,
    image: `${site.url}/og-image.jpg`,
    telephone: `+${site.telephone}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.salon.ville,
      addressCountry: site.salon.pays,
    },
    containedInPlace: {
      "@type": "Place",
      name: `${site.salon.quartier}, ${site.salon.ville}`,
    },
    areaServed: {
      "@type": "City",
      name: site.salon.ville,
    },
    sameAs: [site.tiktok, site.instagram].filter(Boolean),
  };
}

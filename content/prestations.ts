/**
 * 💅 PRESTATIONS & TARIFS
 * ⚠️ Prix et durées d'exemple — À REMPLACER par les vrais tarifs de Daba.
 *
 * PHOTOS : déposer les images dans /public/prestations/ puis renseigner
 * le champ `image` (ex: image: "maquillage-jour.jpg").
 * Tant que la photo manque, la carte affiche un aperçu coloré avec une icône.
 */

export type Prestation = {
  categorie: "Maquillage" | "Manucure" | "Coiffure";
  nom: string;
  description: string;
  prix: string;
  duree: string;
  image?: string;
};

export const prestations: Prestation[] = [
  {
    categorie: "Maquillage",
    nom: "Maquillage jour",
    image: "maquillage-jour.jpg",
    description: "Teint lumineux et naturel pour le quotidien ou le bureau.",
    prix: "3 000 F",
    duree: "45 min",
  },
  {
    categorie: "Maquillage",
    nom: "Maquillage soirée",
    image: "maquillage-soiree.jpg",
    description: "Regard intense, teint sculpté, tenue longue durée.",
    prix: "5 000 F",
    duree: "1 h",
  },
  {
    categorie: "Maquillage",
    nom: "Maquillage mariée",
    image: "maquillage-mariee.jpg",
    description:
      "Essai inclus, produits longue tenue, retouches le jour J. Le glow du plus beau jour.",
    prix: "7 000 F",
    duree: "essai + jour J",
  },
  {
    categorie: "Manucure",
    nom: "Manucure classique",
    image: "manucure-classique.jpg",
    description: "Soin des mains, mise en forme et pose de vernis.",
    prix: "2 000 F",
    duree: "45 min",
  },
  {
    categorie: "Manucure",
    nom: "Nail art",
    image: "nail-art.jpg",
    description: "Créations personnalisées, du minimaliste à l'audacieux.",
    prix: "4 000 F",
    duree: "1 h – 1 h 30",
  },
  {
    categorie: "Coiffure",
    nom: "Tresses",
    image: "tresses.jpg",
    description: "Braids, twists et nattes collées, avec ou sans mèches.",
    prix: "3 000 – 7 000 F",
    duree: "selon le style",
  },
  {
    categorie: "Coiffure",
    nom: "Brushing & chignon",
    image: "brushing-chignon.jpg",
    description: "Coiffure événement : mariage, baptême, soirée.",
    prix: "5 000 F",
    duree: "1 h",
  },
];

export const categories = [...new Set(prestations.map((p) => p.categorie))];

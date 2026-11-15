/**
 * 📸 RÉALISATIONS (galerie)
 * - image : fichier placé dans /public/realisations/
 * - date : facultative ; affichée sous la photo seulement si elle est renseignée.
 * - categories : une réalisation peut appartenir à PLUSIEURS catégories
 *   (ex : maquillage + coiffure faits ensemble) — elle apparaît alors
 *   dans chacun des filtres correspondants.
 * - tiktokId : à la place d'une image, l'identifiant d'une vidéo TikTok
 *   (le nombre à la fin de l'URL de la vidéo).
 */

export type Categorie = "Maquillage" | "Manucure" | "Coiffure";

export type Realisation = {
  titre: string;
  categories: Categorie[];
  /** Facultative : affichée sous la photo seulement si elle est connue. */
  date?: string;
  image?: string;
  tiktokId?: string;
  /** Vignette locale d'une vidéo TikTok (fichier dans /public/realisations/), affichée avant le clic. */
  vignette?: string;
  teinte?: "terracotta" | "rose" | "dore";
};

export const realisations: Realisation[] = [
  {
    titre: "Maquillage de fête, éclat orangé",
    categories: ["Maquillage"],
    date: "2026",
    image: "maquillage-korite.jpg",
  },
  {
    titre: "Maquillage doré, teint sublimé",
    categories: ["Maquillage"],
    date: "2026",
    image: "maquillage-dore.jpg",
  },
  {
    titre: "Maquillage naturel lumineux",
    categories: ["Maquillage"],
    date: "2026",
    image: "maquillage-violet.jpg",
  },
  {
    titre: "Coiffure & maquillage enfant",
    categories: ["Coiffure", "Maquillage"],
    date: "2026",
    image: "coiffure-maquillage-enfant.jpg",
  },
  {
    titre: "Maquillage & coiffure de mariée",
    categories: ["Maquillage", "Coiffure"],
    date: "2026",
    image: "maquillage-mariee.jpg",
  },
  {
    titre: "Coiffure de mariée, fleurs perlées",
    categories: ["Coiffure", "Maquillage"],
    date: "2026",
    image: "coiffure-mariee.jpg",
  },
  {
    titre: "Mise en beauté de soirée",
    categories: ["Maquillage", "Coiffure"],
    date: "2026",
    image: "mise-en-beaute-soiree.jpg",
  },
  {
    titre: "Chignon roses sculptées",
    categories: ["Coiffure"],
    date: "2026",
    image: "chignon-roses.jpg",
  },
  {
    titre: "Chignon de cérémonie perlé",
    categories: ["Coiffure"],
    date: "2026",
    image: "chignon-perle.jpg",
  },
  {
    titre: "Coiffure événement, bijou de tête",
    categories: ["Coiffure"],
    date: "2026",
    image: "coiffure-evenement.jpg",
  },
  {
    titre: "Pose lace, bob caramel",
    categories: ["Coiffure"],
    date: "2026",
    image: "pose-lace-caramel.jpg",
  },
  {
    titre: "Pose lace frontal, baby hairs",
    categories: ["Coiffure"],
    date: "2026",
    image: "pose-lace-noire.jpg",
  },
  {
    titre: "Maquillage naturel, éclat doux",
    categories: ["Maquillage"],
    date: "2026",
    image: "maquillage-douceur.jpg",
  },
  {
    titre: "Tresses twists, attaché bas",
    categories: ["Coiffure"],
    date: "2026",
    image: "tresses-twists.jpg",
  },
  {
    titre: "Pose gel bordeaux, nail art",
    categories: ["Manucure"],
    date: "2026",
    image: "pose-gel-bordeaux.jpg",
  },
  {
    titre: "Pose rouge classique",
    categories: ["Manucure"],
    date: "2026",
    image: "pose-rouge.jpg",
  },
  // Ajoutées le 15/11/2026 (photos fournies, date de réalisation non précisée)
  {
    titre: "Maquillage doré, lèvres corail",
    categories: ["Maquillage"],
    image: "maquillage-dore-dentelle.jpg",
  },
  {
    titre: "Maquillage rose pailleté, cils colorés",
    categories: ["Maquillage"],
    image: "maquillage-rose-paillete.jpg",
  },
  {
    titre: "Coiffure tressée aux cauris, look traditionnel",
    categories: ["Coiffure", "Maquillage"],
    image: "coiffure-cauris-traditionnelle.jpg",
  },
  {
    titre: "Maquillage pêche, regard lumineux",
    categories: ["Maquillage"],
    image: "maquillage-peche.jpg",
  },
  {
    titre: "Nattes collées et maquillage doux",
    categories: ["Coiffure", "Maquillage"],
    image: "nattes-collees-maquillage.jpg",
  },
  {
    titre: "Coiffure plaquée aux perles, regard prune",
    categories: ["Coiffure", "Maquillage"],
    image: "coiffure-plaquee-perles.jpg",
  },
  {
    titre: "Box braids, bijoux dorés",
    categories: ["Coiffure"],
    image: "box-braids-bijoux.jpg",
  },
  {
    titre: "Chignon bouclé, perles dorées",
    categories: ["Coiffure"],
    image: "chignon-boucle-perles-dorees.jpg",
  },
  {
    titre: "Chignon banane, barrette strass",
    categories: ["Coiffure"],
    image: "chignon-banane-strass.jpg",
  },
  {
    titre: "Perruque bob châtain, baby hair",
    categories: ["Coiffure"],
    image: "perruque-bob-chatain.jpg",
  },
  {
    titre: "Perruque bob noir, baby hair",
    categories: ["Coiffure"],
    image: "perruque-bob-noir.jpg",
  },
  {
    titre: "Chignon torsadé, fleur de perles",
    categories: ["Coiffure"],
    image: "chignon-torsade-fleur.jpg",
  },
  {
    titre: "Coiffure plaquée et tresse, bijou de perles",
    categories: ["Coiffure"],
    image: "coiffure-plaquee-tresse-bijou.jpg",
  },
  {
    titre: "Coiffure tressée en cascade, bijou argenté",
    categories: ["Coiffure"],
    image: "coiffure-cascade-bijou-argent.jpg",
  },
  // Exemple d'intégration TikTok (⚠️ remplacer par un vrai id de vidéo) :
  // { titre: "Transformation mariée", categories: ["Maquillage"], date: "2026", tiktokId: "7300000000000000000" },
];

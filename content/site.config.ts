/**
 * ⚙️ CONFIGURATION DU SITE — Daba Glow
 * ------------------------------------------------------------
 * TOUT le contenu "identité" du site vit ici.
 * Pour adapter ce template à un autre client :
 * changer ce fichier + les fichiers de ce dossier, jamais le code.
 */

export const site = {
  nom: "Daba Glow",
  nomCourt: "Daba",
  suffixe: "GLOW",
  slogan: "Révèle ton éclat, au salon ou chez toi",
  accroche:
    "Le glow n'est pas un filtre. C'est un savoir-faire, au salon ou jusqu'à ta porte.",
  description:
    "Maquillage, manucure et coiffure au salon à Darou Salam (Mbour), ou chez toi à domicile. Mise en beauté professionnelle par Daba, artiste beauté diplômée.",

  // Numéro unique (format international sans « + ») : sert aux liens WhatsApp ET aux appels.
  telephone: "221768850492",
  messageWhatsApp:
    "Bonjour Daba ! J'ai vu votre site et j'aimerais réserver une prestation.",

  // Laisser instagram vide ("") pour masquer le lien tant que le compte n'existe pas
  instagram: "",
  tiktok: "https://www.tiktok.com/@daba.tine.122",

  // Salon (dans la maison de Daba) : l'adresse publiée est « Darou Salam, Mbour ».
  // Jamais de rue, de numéro ni de coordonnées GPS : on guide la cliente par téléphone ou WhatsApp.
  salon: {
    quartier: "Darou Salam",
    ville: "Mbour",
    pays: "SN",
  },
  zoneDeplacement: "Mbour et les environs",

  zone: "Au salon à Darou Salam (Mbour), ou chez toi à domicile",
  horaires: "Sur rendez-vous, 7j/7",
  horairesDetail: [
    { jour: "Lundi – Samedi", heures: "9h – 20h" },
    { jour: "Dimanche", heures: "Sur rendez-vous" },
  ],

  url: "https://daba-glow.vercel.app",
} as const;

export const lienWhatsApp = `https://wa.me/${site.telephone}?text=${encodeURIComponent(
  site.messageWhatsApp
)}`;

export const lienTelephone = `tel:+${site.telephone}`;

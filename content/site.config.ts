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
  slogan: "Révèle ton éclat, chez toi",
  accroche:
    "Le glow n'est pas un filtre. C'est un savoir-faire, et il vient jusqu'à ta porte.",
  description:
    "Maquillage, manucure et coiffure à domicile à Darou Salam, Mbour. Mise en beauté professionnelle par Daba, artiste beauté diplômée.",

  whatsapp: "221768850492",
  messageWhatsApp:
    "Bonjour Daba ! J'ai vu votre site et j'aimerais réserver une prestation.",

  // Laisser instagram vide ("") pour masquer le lien tant que le compte n'existe pas
  instagram: "",
  tiktok: "https://www.tiktok.com/@daba.tine.122",

  zone: "À domicile ou chez Daba — Darou Salam, Mbour",
  horaires: "Sur rendez-vous, 7j/7",
  horairesDetail: [
    { jour: "Lundi – Samedi", heures: "9h – 20h" },
    { jour: "Dimanche", heures: "Sur rendez-vous" },
  ],

  url: "https://daba-glow.vercel.app",
} as const;

export const lienWhatsApp = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
  site.messageWhatsApp
)}`;

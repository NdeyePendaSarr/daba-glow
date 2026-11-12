/**
 * 💬 TÉMOIGNAGES — clientes réelles de Daba
 */

export type Temoignage = {
  texte: string;
  auteure: string;
  contexte: string;
};

export const temoignages: Temoignage[] = [
  {
    texte:
      "Coiffée et maquillée par Daba pour un mariage : j'étais éclatante du début à la fin de la cérémonie. Un travail soigné, fait avec le sourire.",
    auteure: "Mbathio Diaw",
    contexte: "mariage — coiffure et maquillage",
  },
  {
    texte:
      "Pour un mariage, Daba s'est occupée de tout : coiffure, maquillage. Je me suis sentie belle comme jamais. Je recommande les yeux fermés.",
    auteure: "Sassoum Ndeye",
    contexte: "mariage — mise en beauté complète",
  },
];

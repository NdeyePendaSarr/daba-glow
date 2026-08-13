/**
 * Helpers de formatage purs — sans effet de bord, réutilisables et testables.
 */

/**
 * Formate un numéro WhatsApp sénégalais pour l'affichage.
 * "221768850492" → "+221 76 885 04 92". Repli lisible pour tout autre format.
 */
export function formatTelephone(num: string): string {
  if (num.length === 12 && num.startsWith("221")) {
    return `+${num.slice(0, 3)} ${num.slice(3, 5)} ${num.slice(5, 8)} ${num.slice(8, 10)} ${num.slice(10)}`;
  }
  return `+${num}`;
}

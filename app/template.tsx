/**
 * Transition d'entrée entre les pages (CSS uniquement, composant serveur, zéro JavaScript).
 * Next.js remonte ce gabarit à chaque navigation : l'animation `.entree-page`
 * (app/globals.css) rejoue donc à chaque changement de page.
 * Le contenu n'est jamais masqué : l'opacité de départ est partielle, et l'animation
 * est désactivée par prefers-reduced-motion.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="entree-page">{children}</div>;
}

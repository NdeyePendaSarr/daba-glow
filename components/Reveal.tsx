/**
 * Apparition douce au défilement, en CSS uniquement (aucun JavaScript).
 *
 * Le contenu est TOUJOURS visible : l'animation ne joue que sur un léger
 * glissement (transform), jamais sur l'opacité. Il s'affiche donc dès que le
 * HTML et la CSS arrivent, même si le JavaScript n'a pas encore tourné.
 * Voir `.reveal` dans app/globals.css (désactivé par prefers-reduced-motion).
 * `desktopSeulement` : animation à partir de 768 px seulement (`.reveal-md`), pour les
 * éléments qui défilent horizontalement sur mobile (galeries).
 */
export default function Reveal({
  children,
  className = "",
  delai = 0,
  desktopSeulement = false,
}: {
  children: React.ReactNode;
  className?: string;
  delai?: number;
  desktopSeulement?: boolean;
}) {
  return (
    <div className={`${desktopSeulement ? "reveal-md" : "reveal"} ${className}`} style={{ "--delai": `${delai}ms` } as React.CSSProperties}>
      {children}
    </div>
  );
}

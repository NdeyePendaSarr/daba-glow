/**
 * Apparition douce au défilement, en CSS uniquement (aucun JavaScript).
 *
 * Le contenu est TOUJOURS visible : l'animation ne joue que sur un léger
 * glissement (transform), jamais sur l'opacité. Il s'affiche donc dès que le
 * HTML et la CSS arrivent, même si le JavaScript n'a pas encore tourné.
 * Voir `.reveal` dans app/globals.css (désactivé par prefers-reduced-motion).
 */
export default function Reveal({
  children,
  className = "",
  delai = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delai?: number;
}) {
  return (
    <div className={`reveal ${className}`} style={{ "--delai": `${delai}ms` } as React.CSSProperties}>
      {children}
    </div>
  );
}

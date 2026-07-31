"use client";

import { useEffect, useRef } from "react";

/** Apparition douce au scroll (IntersectionObserver, zéro dépendance). */
export default function Reveal({
  children,
  className = "",
  delai = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delai?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entree]) => {
        if (entree.isIntersecting) {
          el.classList.add("is-visible");
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delai}ms` }}>
      {children}
    </div>
  );
}

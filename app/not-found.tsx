import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site.config";

// Titre d'onglet propre à la 404 (sinon, c'est celui de l'accueil qui s'affiche).
// Le statut HTTP 404 est géré par Next.js et n'est pas modifié.
export const metadata: Metadata = {
  title: { absolute: `Page introuvable · ${site.nom}` },
};

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-5 text-center">
      <p className="font-display text-8xl italic text-cuivre">404</p>
      <h1 className="mt-3 font-display text-3xl italic">Cette page a perdu son éclat</h1>
      <p className="mt-3 max-w-sm text-encre/70">
        Elle n&apos;existe pas ou a été déplacée. Le glow, lui, est toujours là.
      </p>
      <Link
        href="/"
        className="btn-primary mt-8 rounded-full bg-cuivre px-7 py-3 font-medium text-creme"
      >
        Retour à l&apos;accueil de {site.nom}
      </Link>
    </div>
  );
}

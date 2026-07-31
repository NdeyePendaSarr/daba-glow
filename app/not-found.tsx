import Link from "next/link";
import { site } from "@/content/site.config";

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
        className="mt-8 rounded-full bg-cuivre px-7 py-3 font-medium text-creme"
      >
        Retour à l&apos;accueil de {site.nom}
      </Link>
    </div>
  );
}

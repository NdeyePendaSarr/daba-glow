import { site } from "@/content/site.config";
import BarreNavigation from "./BarreNavigation";

/** En-tête (composant serveur) : bandeau d'information + barre de navigation (client). */
export default function Header() {
  return (
    <header className="sticky top-0 z-40">
      <div className="bg-cuivre px-4 py-2 text-center text-xs font-medium tracking-wide text-creme">
        {site.zone}
      </div>
      <BarreNavigation />
    </header>
  );
}

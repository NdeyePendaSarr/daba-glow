import { site, lienWhatsApp, lienTelephone } from "@/content/site.config";
import { formatTelephone } from "@/lib/format";

export default function Footer() {
  const telAffiche = formatTelephone(site.telephone);

  return (
    <footer className="border-t border-cacao bg-chocolat px-5 py-12">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 text-center md:flex-row md:justify-between md:text-left">
        <div>
          <p className="font-display text-xl italic text-creme">
            {site.nomCourt}{" "}
            <span className="font-sans text-xs not-italic tracking-[0.35em] text-dore-clair">
              {site.suffixe}
            </span>
          </p>
          <p className="mt-2 text-sm text-terracotta">{site.zone}</p>
          <p className="text-sm text-creme/70">{site.horaires}</p>
          <a
            href={lienWhatsApp}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-sm font-medium text-dore-clair transition-colors hover:text-creme"
          >
            WhatsApp {telAffiche}
          </a>
          <a
            href={lienTelephone}
            className="mt-1 block text-sm font-medium text-creme transition-colors hover:text-dore-clair"
          >
            Appeler le {telAffiche}
          </a>
        </div>
        <ul className="flex gap-5" aria-label="Réseaux sociaux">
          <li>
            <a
              href={lienWhatsApp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="text-creme/70 transition-colors hover:text-dore-clair"
            >
              WhatsApp
            </a>
          </li>
          {site.instagram && (
            <li>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-creme/70 transition-colors hover:text-dore-clair"
              >
                Instagram
              </a>
            </li>
          )}
          <li>
            <a
              href={site.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="text-creme/70 transition-colors hover:text-dore-clair"
            >
              TikTok
            </a>
          </li>
        </ul>
      </div>
      <p className="mt-10 text-center text-xs text-creme/70">
        © {new Date().getFullYear()} {site.nom} — Site conçu par NPS
      </p>
    </footer>
  );
}

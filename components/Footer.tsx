import { site, lienWhatsApp } from "@/content/site.config";

function formatWhatsApp(num: string) {
  // 221768850492 → +221 76 885 04 92
  if (num.length === 12 && num.startsWith("221")) {
    return `+${num.slice(0, 3)} ${num.slice(3, 5)} ${num.slice(5, 8)} ${num.slice(8, 10)} ${num.slice(10)}`;
  }
  return `+${num}`;
}

export default function Footer() {
  const telAffiche = formatWhatsApp(site.whatsapp);

  return (
    <footer className="border-t border-cacao bg-chocolat px-5 py-12">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 text-center md:flex-row md:justify-between md:text-left">
        <div>
          <p className="font-display text-xl italic text-creme">
            {site.nomCourt}{" "}
            <span className="font-sans text-xs not-italic tracking-[0.35em] text-dore">
              {site.suffixe}
            </span>
          </p>
          <p className="mt-2 text-sm text-terracotta">{site.zone}</p>
          <p className="text-sm text-creme/60">{site.horaires}</p>
          <a
            href={lienWhatsApp}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-sm font-medium text-dore transition-colors hover:text-creme"
          >
            WhatsApp {telAffiche}
          </a>
        </div>
        <ul className="flex gap-5" aria-label="Réseaux sociaux">
          <li>
            <a
              href={lienWhatsApp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="text-creme/70 transition-colors hover:text-dore"
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
                className="text-creme/70 transition-colors hover:text-dore"
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
              className="text-creme/70 transition-colors hover:text-dore"
            >
              TikTok
            </a>
          </li>
        </ul>
      </div>
      <p className="mt-10 text-center text-xs text-creme/60">
        © {new Date().getFullYear()} {site.nom} — Site conçu par NPS
      </p>
    </footer>
  );
}

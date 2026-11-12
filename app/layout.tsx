import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site.config";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFab from "@/components/WhatsAppFab";

// Polices auto-hébergées par next/font : sous-ensemble latin, affichage immédiat
// du texte avec une police de secours ajustée (swap), aucun chargement bloquant.
// Fraunces n'est utilisée qu'en italique : le style droit (35 Ko) n'est plus téléchargé.
const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["italic"],
  display: "swap",
  variable: "--font-fraunces",
});

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.nom} — Beauté au salon ou à domicile à Mbour`,
    template: `%s — ${site.nom}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.nom} — Beauté au salon ou à domicile à Mbour`,
    description: site.description,
    url: site.url,
    siteName: site.nom,
    locale: "fr_SN",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${site.nom} — mise en beauté au salon à ${site.salon.quartier} (${site.salon.ville}), ou chez vous à domicile`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.nom} — Beauté au salon ou à domicile à Mbour`,
    description: site.description,
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: [{ url: "/favicon-32.png", sizes: "32x32", type: "image/png" }],
    apple: [{ url: "/apple-icon.png" }],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${fraunces.variable} ${outfit.variable}`}>
      <body className="bg-creme font-sans text-encre antialiased">
        <a
          href="#contenu"
          data-fond="sombre"
          className="absolute -top-20 left-4 z-50 rounded-b-lg bg-cuivre px-4 py-2 font-medium text-creme transition-all focus:top-0"
        >
          Aller au contenu principal
        </a>
        <Header />
        <main id="contenu">{children}</main>
        <Footer />
        <WhatsAppFab />
      </body>
    </html>
  );
}

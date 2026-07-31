import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site.config";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFab from "@/components/WhatsAppFab";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["italic", "normal"],
  variable: "--font-fraunces",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.nom} — Beauté à domicile à Mbour`,
    template: `%s — ${site.nom}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.nom} — Beauté à domicile à Mbour`,
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
        alt: `${site.nom} — mise en beauté à domicile`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.nom} — Beauté à domicile à Mbour`,
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

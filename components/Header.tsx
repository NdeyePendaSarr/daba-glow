"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site, lienWhatsApp } from "@/content/site.config";

const liens = [
  { href: "/", label: "Accueil" },
  { href: "/prestations", label: "Prestations" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [ouvert, setOuvert] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40">
      <div className="bg-cuivre px-4 py-2 text-center text-xs font-medium tracking-wide text-creme">
        Beauté à domicile — Daba se déplace à Mbour et environs
      </div>
      <div className="border-b border-cacao bg-chocolat/95 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
        <Link href="/" className="flex items-baseline gap-1" onClick={() => setOuvert(false)}>
          <span className="font-display text-2xl italic text-creme">{site.nomCourt}</span>
          <span className="text-xs font-medium tracking-[0.35em] text-dore">
            {site.suffixe}
          </span>
        </Link>

        <nav aria-label="Navigation principale" className="hidden select-none items-center gap-7 md:flex">
          {liens.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-md px-1 text-sm tracking-wide transition-colors hover:text-dore ${
                pathname === l.href ? "text-dore" : "text-creme/80"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <a
            href={lienWhatsApp}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-dore px-5 py-2 text-sm font-medium text-chocolat transition-transform hover:-translate-y-0.5"
          >
            Réserver
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOuvert(!ouvert)}
          aria-expanded={ouvert}
          aria-label={ouvert ? "Fermer le menu" : "Ouvrir le menu"}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span className={`h-0.5 w-6 bg-creme transition-transform ${ouvert ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`h-0.5 w-6 bg-creme transition-opacity ${ouvert ? "opacity-0" : ""}`} />
          <span className={`h-0.5 w-6 bg-creme transition-transform ${ouvert ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      {ouvert && (
        <nav aria-label="Navigation mobile" className="select-none border-t border-cacao px-5 pb-6 pt-2 md:hidden">
          {liens.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOuvert(false)}
              className={`block py-3 text-lg ${pathname === l.href ? "text-dore" : "text-creme"}`}
            >
              {l.label}
            </Link>
          ))}
          <a
            href={lienWhatsApp}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block rounded-full bg-dore px-6 py-2.5 font-medium text-chocolat"
          >
            Réserver sur WhatsApp
          </a>
        </nav>
      )}
      </div>
    </header>
  );
}

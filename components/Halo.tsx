import Image from "next/image";

/**
 * Signature visuelle du site : le portrait dans son halo doré pulsant.
 * Affiche /public/portrait.jpg si présent, sinon un médaillon terracotta.
 * Le fond dégradé apporte de la profondeur sans alourdir.
 */
export default function Halo({ avecPortrait = false }: { avecPortrait?: boolean }) {
  // Taille : 288 px sur mobile, 320 px sur tablette (la colonne ne fait que 332 px
  // à 768 px), 384 px dès 1024 px. Évite tout défilement horizontal.
  return (
    <div className="relative mx-auto flex h-72 w-72 items-center justify-center md:h-80 md:w-80 lg:h-96 lg:w-96">
      {/* Dégradé / texture subtile derrière le halo */}
      <div
        className="absolute inset-0 rounded-full opacity-70"
        style={{
          background:
            "radial-gradient(circle at 40% 35%, color-mix(in srgb, var(--color-dore) 22%, transparent) 0%, color-mix(in srgb, var(--color-terracotta) 12%, transparent) 35%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-4 rounded-full opacity-40"
        style={{
          background:
            "radial-gradient(circle at 60% 70%, color-mix(in srgb, var(--color-cuivre) 15%, transparent) 0%, transparent 55%)",
        }}
        aria-hidden="true"
      />

      <div className="relative h-64 w-64 md:h-68 md:w-68 lg:h-80 lg:w-80" aria-hidden="true">
        <div className="absolute inset-0 animate-halo rounded-full border border-ambre/70" />
        <div className="absolute inset-6 animate-halo-late rounded-full border border-dore/80" />
        <div className="absolute inset-12 overflow-hidden rounded-full bg-terracotta shadow-lg">
          {avecPortrait ? (
            <Image
              src="/portrait.jpg"
              alt=""
              fill
              // taille réellement affichée : 160 px (mobile), 176 px (tablette), 224 px (≥ 1024 px)
              sizes="(min-width: 1024px) 224px, (min-width: 768px) 176px, 160px"
              className="object-cover"
              preload
              fetchPriority="high"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="font-display text-5xl italic text-cacao">D</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

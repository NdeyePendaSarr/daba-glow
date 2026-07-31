import Image from "next/image";

/**
 * Signature visuelle du site : le portrait dans son halo doré pulsant.
 * Affiche /public/portrait.jpg si présent, sinon un médaillon terracotta.
 * Le fond dégradé apporte de la profondeur sans alourdir.
 */
export default function Halo({ avecPortrait = false }: { avecPortrait?: boolean }) {
  return (
    <div className="relative mx-auto flex h-72 w-72 items-center justify-center md:h-96 md:w-96">
      {/* Dégradé / texture subtile derrière le halo */}
      <div
        className="absolute inset-0 rounded-full opacity-70"
        style={{
          background:
            "radial-gradient(circle at 40% 35%, rgba(212,130,15,0.22) 0%, rgba(227,154,114,0.12) 35%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-4 rounded-full opacity-40"
        style={{
          background:
            "radial-gradient(circle at 60% 70%, rgba(178,74,53,0.15) 0%, transparent 55%)",
        }}
        aria-hidden="true"
      />

      <div className="relative h-64 w-64 md:h-80 md:w-80" aria-hidden="true">
        <div className="absolute inset-0 animate-halo rounded-full border border-ambre/70" />
        <div className="absolute inset-6 animate-halo-late rounded-full border border-dore/80" />
        <div className="absolute inset-12 overflow-hidden rounded-full bg-terracotta shadow-lg">
          {avecPortrait ? (
            <Image
              src="/portrait.jpg"
              alt=""
              fill
              sizes="(min-width: 768px) 320px, 256px"
              className="object-cover"
              priority
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

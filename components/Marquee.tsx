const mots = ["Maquillage", "Manucure", "Coiffure", "Mariée", "Nail art", "Tresses"];

export default function Marquee() {
  const sequence = [...mots, ...mots];
  return (
    <div className="group overflow-hidden bg-dore py-2.5" aria-hidden="true">
      <div className="flex w-max animate-marquee gap-8 group-hover:[animation-play-state:paused]">
        {sequence.map((mot, i) => (
          <span
            key={i}
            className="flex items-center gap-8 text-sm font-medium uppercase tracking-[0.2em] text-encre"
          >
            {mot} <span className="text-chocolat">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

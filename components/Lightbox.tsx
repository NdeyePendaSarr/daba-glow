"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";

export type LightboxItem = {
  src: string;
  titre: string;
};

type Props = {
  items: LightboxItem[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

export default function Lightbox({ items, index, onClose, onPrev, onNext }: Props) {
  const item = items[index];

  const onKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    },
    [onClose, onPrev, onNext]
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onKey]);

  if (!item) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.titre}
      className="fixed inset-0 z-50 flex items-center justify-center bg-chocolat/95 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Fermer"
        className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-creme/10 text-2xl text-creme transition-colors hover:bg-creme/20"
      >
        ×
      </button>

      {items.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            aria-label="Photo précédente"
            className="absolute left-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-creme/10 text-2xl text-creme transition-colors hover:bg-creme/20 md:left-6"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            aria-label="Photo suivante"
            className="absolute right-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-creme/10 text-2xl text-creme transition-colors hover:bg-creme/20 md:right-6"
          >
            ›
          </button>
        </>
      )}

      <div
        className="relative flex max-h-[85vh] w-full max-w-3xl flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-[4/5] w-full max-h-[75vh] overflow-hidden rounded-2xl bg-cacao shadow-2xl">
          <Image
            src={item.src}
            alt={item.titre}
            fill
            sizes="(min-width: 768px) 60vw, 95vw"
            className="object-contain"
            priority
          />
        </div>
        <p className="mt-4 text-center text-sm text-creme/80">
          {item.titre}
          {items.length > 1 && (
            <span className="ml-2 text-creme/50">
              {index + 1} / {items.length}
            </span>
          )}
        </p>
      </div>
    </div>
  );
}

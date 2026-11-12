import { vi, afterEach } from "vitest";

// Chargé aussi par les tests en environnement "node" : les simulations
// du navigateur ne sont installées que si `window` existe.
if (typeof window !== "undefined") {
  await import("@testing-library/jest-dom/vitest");
  const { cleanup } = await import("@testing-library/react");
  afterEach(() => cleanup());

  // jsdom n'implémente ni IntersectionObserver ni matchMedia.
  class IO {
    cb: IntersectionObserverCallback;
    constructor(cb: IntersectionObserverCallback) {
      this.cb = cb;
    }
    observe(el: Element) {
      this.cb(
        [{ isIntersecting: true, target: el } as IntersectionObserverEntry],
        this as unknown as IntersectionObserver
      );
    }
    disconnect() {}
    unobserve() {}
    takeRecords() {
      return [];
    }
  }
  vi.stubGlobal("IntersectionObserver", IO);

  window.matchMedia = ((q: string) => ({
    matches: q.includes("reduce"),
    media: q,
    onchange: null,
    addEventListener() {},
    removeEventListener() {},
    addListener() {},
    removeListener() {},
    dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia;
}

// next/font ne fonctionne qu'à la compilation Next : on le simule.
vi.mock("next/font/google", () => ({
  Fraunces: () => ({ variable: "font-fraunces", className: "" }),
  Outfit: () => ({ variable: "font-outfit", className: "" }),
}));

// usePathname a besoin du routeur Next : on le simule.
vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

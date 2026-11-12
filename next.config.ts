import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF en priorité (plus léger), WebP sinon ; le navigateur choisit selon ce qu'il accepte.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;

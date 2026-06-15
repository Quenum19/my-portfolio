import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Fixe la racine du workspace : un autre package-lock.json existe plus haut
  // dans l'arborescence (C:\wamp64\www), ce qui faussait la détection de Turbopack.
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    // Autorise l'optimisation des SVG (nos visuels placeholder de projets).
    // CSP en bac à sable : empêche tout script éventuel dans un SVG.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;

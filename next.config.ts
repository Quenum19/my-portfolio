import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Fixe la racine du workspace : un autre package-lock.json existe plus haut
  // dans l'arborescence (C:\wamp64\www), ce qui faussait la détection de Turbopack.
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;

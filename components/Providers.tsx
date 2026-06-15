"use client";
import { ThemeProvider } from "next-themes";
import { MotionConfig } from "framer-motion";
import React from "react";

/**
 * Fournisseurs globaux de l'application :
 * - ThemeProvider (next-themes) : gère le thème clair/sombre/système,
 *   pose la classe `.dark` sur <html> et persiste le choix sans flash.
 * - MotionConfig reducedMotion="user" : désactive automatiquement les
 *   animations Framer Motion si l'utilisateur a activé `prefers-reduced-motion`.
 */
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ThemeProvider>
  );
}

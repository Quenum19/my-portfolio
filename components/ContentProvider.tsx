"use client";
import { createContext, useContext } from "react";
import type { SiteContent } from "@/lib/content";

const ContentContext = createContext<SiteContent | null>(null);

/** Fournit le contenu du site (chargé côté serveur) aux composants clients. */
export function ContentProvider({
  value,
  children,
}: {
  value: SiteContent;
  children: React.ReactNode;
}) {
  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

/** Accès au contenu du site dans un composant client. */
export function useContent(): SiteContent {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error("useContent doit être utilisé dans <ContentProvider>");
  return ctx;
}

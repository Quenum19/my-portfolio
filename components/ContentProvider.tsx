"use client";
import { createContext, useContext } from "react";
import type { ResolvedContent } from "@/lib/content";

const ContentContext = createContext<ResolvedContent | null>(null);

/** Fournit le contenu RÉSOLU (une langue) aux composants clients. */
export function ContentProvider({
  value,
  children,
}: {
  value: ResolvedContent;
  children: React.ReactNode;
}) {
  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

/** Accès au contenu résolu du site dans un composant client. */
export function useContent(): ResolvedContent {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error("useContent doit être utilisé dans <ContentProvider>");
  return ctx;
}

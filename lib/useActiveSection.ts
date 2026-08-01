"use client";
import { useEffect, useState } from "react";

/**
 * Renvoie l'id de la section active (scroll-spy).
 * Approche par position : la section active est la DERNIÈRE dont le haut a
 * franchi une ligne de référence (~35% de la hauteur d'écran). Fiable même
 * avec des sections très hautes (contrairement au ratio d'intersection).
 * Ne fait rien si aucune section n'est présente (ex. pages /blog, /projets).
 */
export function useActiveSection(ids: string[]): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const present = ids.filter((id) => document.getElementById(id));
    if (present.length === 0) return;

    const compute = () => {
      const line = window.innerHeight * 0.35;

      // Bas de page atteint : on active la dernière section.
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom) {
        setActive(present[present.length - 1]);
        return;
      }

      let current = present[0];
      for (const id of present) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top - line <= 0) current = id;
      }
      setActive(current);
    };

    compute();
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute);
    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, [ids]);

  return active;
}

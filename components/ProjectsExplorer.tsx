"use client";
import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Search, X, Plus } from "lucide-react";
import type { ResolvedProject } from "@/lib/content";
import { projectMatches, projectTypes, sortProjects } from "@/lib/projects";
import ProjectCard from "@/components/ProjectCard";

/** Taille d'un lot : le DOM ne grossit que si le visiteur le demande. */
const PAGE_SIZE = 12;

export default function ProjectsExplorer({ projects }: { projects: ResolvedProject[] }) {
  const t = useTranslations("projects");
  const [query, setQuery] = useState("");
  const [type, setType] = useState<string>("all");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const ordered = useMemo(() => sortProjects(projects), [projects]);
  const types = useMemo(() => projectTypes(projects), [projects]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ordered.filter((p) => (type === "all" || p.type === type) && projectMatches(p, q));
  }, [ordered, query, type]);

  const shown = filtered.slice(0, visible);
  const remaining = filtered.length - shown.length;
  const filtering = query !== "" || type !== "all";

  // Toute nouvelle recherche repart du premier lot.
  function search(value: string) {
    setQuery(value);
    setVisible(PAGE_SIZE);
  }
  function pickType(value: string) {
    setType(value);
    setVisible(PAGE_SIZE);
  }
  function reset() {
    setQuery("");
    setType("all");
    setVisible(PAGE_SIZE);
  }

  return (
    <div>
      {/* Barre de recherche */}
      <div className="relative mb-4">
        <Search
          size={18}
          className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-slate-400"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => search(e.target.value)}
          placeholder={t("searchPlaceholder")}
          aria-label={t("searchLabel")}
          className="focus:border-primary-500 focus:ring-primary-500/30 w-full rounded-full border border-slate-200 bg-white py-3 pr-4 pl-11 text-sm outline-none focus:ring-2 dark:border-slate-800 dark:bg-slate-900"
        />
      </div>

      {/* Filtres par type */}
      {types.length > 1 && (
        <div className="mb-6 flex flex-wrap gap-2">
          <FilterChip active={type === "all"} onClick={() => pickType("all")}>
            {t("filterAll")}
          </FilterChip>
          {types.map((value) => (
            <FilterChip key={value} active={type === value} onClick={() => pickType(value)}>
              {value}
            </FilterChip>
          ))}
        </div>
      )}

      {/* Compteur + réinitialisation */}
      <div className="mb-8 flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
        <span>{t("count", { count: filtered.length })}</span>
        {filtering && (
          <button
            type="button"
            onClick={reset}
            className="hover:text-primary-500 inline-flex items-center gap-1 underline underline-offset-4 transition-colors"
          >
            <X size={14} /> {t("reset")}
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-slate-300 p-12 text-center text-slate-500 dark:border-slate-700">
          {t("empty")}
        </p>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {shown.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={index % PAGE_SIZE}
              showFeaturedBadge
            />
          ))}
        </div>
      )}

      {remaining > 0 && (
        <div className="mt-12 flex justify-center">
          <button
            type="button"
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className="focus-visible:ring-primary-500 inline-flex items-center gap-2 rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold transition-colors hover:border-slate-400 hover:bg-white focus-visible:ring-2 focus-visible:outline-none dark:border-slate-700 dark:hover:bg-slate-900"
          >
            <Plus size={16} /> {t("loadMore", { count: Math.min(remaining, PAGE_SIZE) })}
          </button>
        </div>
      )}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`focus-visible:ring-primary-500 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none ${
        active
          ? "border-primary-500 bg-primary-500 text-white"
          : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
      }`}
    >
      {children}
    </button>
  );
}

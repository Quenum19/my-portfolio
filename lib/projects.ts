import type { ResolvedProject } from "./content";

/**
 * Ordre d'affichage des projets : les « mis en avant » d'abord, puis l'ordre
 * défini dans l'admin. Tri stable — deux projets de même statut gardent leur
 * position relative.
 */
export function sortProjects(projects: ResolvedProject[]): ResolvedProject[] {
  return projects
    .map((project, index) => ({ project, index }))
    .sort((a, b) => {
      if (a.project.featured !== b.project.featured) return a.project.featured ? -1 : 1;
      return a.index - b.index;
    })
    .map(({ project }) => project);
}

/** Les types de projet présents, dédoublonnés et triés (chips de filtre). */
export function projectTypes(projects: ResolvedProject[]): string[] {
  return Array.from(new Set(projects.map((p) => p.type).filter(Boolean))).sort((a, b) =>
    a.localeCompare(b),
  );
}

/**
 * Recherche plein texte sur un projet : titre, description, type, année et
 * technologies. `query` est supposée déjà normalisée (minuscules, trim).
 */
export function projectMatches(project: ResolvedProject, query: string): boolean {
  if (!query) return true;
  const haystack = [project.title, project.description, project.type, project.year, ...project.tech]
    .join(" ")
    .toLowerCase();
  return query.split(/\s+/).every((word) => haystack.includes(word));
}

"use client";
import { useContent } from "@/components/ContentProvider";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import { sortProjects } from "@/lib/projects";

/** Nombre de projets affichés sur l'accueil ; le reste vit sur /projets. */
const HOME_LIMIT = 6;

export default function Projects() {
  const t = useTranslations("projects");
  const DATA = useContent();

  // Les projets mis en avant d'abord, puis l'ordre défini dans l'admin.
  const ordered = sortProjects(DATA.projects);
  const shown = ordered.slice(0, HOME_LIMIT);
  const hasMore = ordered.length > shown.length;

  return (
    <section id="projects" className="py-24">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">{t("title")}</h2>
          <p className="text-slate-600 dark:text-slate-400">{t("subtitle")}</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {shown.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>

        {hasMore && (
          <div className="mt-12 flex justify-center">
            <Link
              href="/projets"
              className="border-primary-500/40 text-primary-600 dark:text-primary-400 hover:bg-primary-500 focus-visible:ring-primary-500 inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none dark:focus-visible:ring-offset-slate-950"
            >
              {t("seeAll", { count: ordered.length })}
              <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

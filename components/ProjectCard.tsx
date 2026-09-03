"use client";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ExternalLink, Github, FolderGit2, ArrowUpRight, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ResolvedProject } from "@/lib/content";

/** Nombre de technologies affichées sur une carte ; le reste est résumé (+N). */
const TECH_SHOWN = 6;

/**
 * Carte projet, partagée par la section d'accueil et la page /projets.
 * `index` ne sert qu'au décalage d'animation, plafonné pour rester lisible
 * même sur une liste de cent projets.
 */
export default function ProjectCard({
  project,
  index = 0,
  showFeaturedBadge = false,
}: {
  project: ResolvedProject;
  index?: number;
  showFeaturedBadge?: boolean;
}) {
  const t = useTranslations("projects");
  const extraTech = project.tech.length - TECH_SHOWN;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: Math.min(index, 5) * 0.08 }}
      className="dark:bg-dark-card group flex flex-col overflow-hidden rounded-xl border border-slate-100 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800"
    >
      <Link
        href={`/projets/${project.slug}`}
        className="focus-visible:ring-primary-500 relative block h-48 overflow-hidden bg-slate-200 focus-visible:ring-2 focus-visible:outline-none dark:bg-slate-700"
        aria-label={`${t("viewProject")} — ${project.title}`}
      >
        {/* Fallback (sous l'image) : icône sur un dégradé, visible si l'image manque */}
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 text-slate-500">
          <FolderGit2 size={48} opacity={0.5} />
        </div>
        {project.image && (
          <Image
            src={project.image}
            alt={`Aperçu du projet ${project.title}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        )}
        <div className="absolute top-4 right-4 rounded bg-black/70 px-2 py-1 text-xs text-white backdrop-blur-sm">
          {project.type}
        </div>
        {showFeaturedBadge && project.featured && (
          <div className="bg-primary-500/90 absolute top-4 left-4 flex items-center gap-1 rounded px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
            <Star size={12} fill="currentColor" /> {t("featured")}
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <Link href={`/projets/${project.slug}`} className="group/title">
          <h3 className="group-hover/title:text-primary-500 mb-2 flex items-center gap-1 text-xl font-bold transition-colors">
            {project.title}
            <ArrowUpRight
              size={16}
              className="opacity-0 transition-opacity group-hover/title:opacity-100"
            />
          </h3>
        </Link>
        <p className="mb-4 line-clamp-3 text-sm text-slate-600 dark:text-slate-400">
          {project.description}
        </p>

        <div className="mb-6 flex flex-wrap gap-2">
          {project.tech.slice(0, TECH_SHOWN).map((tech) => (
            <span
              key={tech}
              className="rounded bg-slate-100 px-2 py-1 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300"
            >
              {tech}
            </span>
          ))}
          {extraTech > 0 && (
            <span className="rounded px-2 py-1 text-xs text-slate-500 dark:text-slate-400">
              +{extraTech}
            </span>
          )}
        </div>

        <div className="mt-auto flex gap-4 border-t border-slate-100 pt-4 dark:border-slate-800">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary-500 flex items-center gap-2 text-sm font-medium transition-colors"
            >
              <ExternalLink size={16} /> {t("demo")}
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary-500 flex items-center gap-2 text-sm font-medium transition-colors"
            >
              <Github size={16} /> {t("code")}
            </a>
          )}
          <Link
            href={`/projets/${project.slug}`}
            className="hover:text-primary-500 ml-auto flex items-center gap-1 text-sm font-medium transition-colors"
          >
            {t("caseStudy")} <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

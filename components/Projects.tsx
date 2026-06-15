"use client";
import { motion } from "framer-motion";
import { DATA } from "@/lib/data";
import { useTranslations } from "next-intl";
import { ExternalLink, Github, FolderGit2, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Projects() {
  const t = useTranslations("projects");

  return (
    <section id="projects" className="py-24">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">{t("title")}</h2>
          <p className="text-slate-600 dark:text-slate-400">{t("subtitle")}</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {DATA.projects.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
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
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded bg-slate-100 px-2 py-1 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex gap-4 border-t border-slate-100 pt-4 dark:border-slate-800">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary-500 flex items-center gap-2 text-sm font-medium transition-colors"
                  >
                    <ExternalLink size={16} /> {t("demo")}
                  </a>
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
          ))}
        </div>
      </div>
    </section>
  );
}

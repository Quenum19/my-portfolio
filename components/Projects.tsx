"use client";
import { motion } from "framer-motion";
import { DATA } from "@/lib/data";
import { ExternalLink, Github, FolderGit2 } from "lucide-react";
import Image from "next/image";

export default function Projects() {
  return (
    <section id="projects" className="py-24">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Projets Réalisés</h2>
          <p className="text-slate-600 dark:text-slate-400">
            Une sélection de mes travaux Fullstack et Mobile.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {DATA.projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group dark:bg-dark-card overflow-hidden rounded-xl border border-slate-100 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800"
            >
              <div className="relative h-48 overflow-hidden bg-slate-200 dark:bg-slate-700">
                {/* Fallback (sous l'image) : icône sur un dégradé, visible si l'image manque */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 text-slate-500">
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
              </div>

              <div className="p-6">
                <h3 className="group-hover:text-primary-500 mb-2 text-xl font-bold transition-colors">
                  {project.title}
                </h3>
                <p className="mb-4 line-clamp-3 text-sm text-slate-600 dark:text-slate-400">
                  {project.description}
                </p>

                <div className="mb-6 flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded bg-slate-100 px-2 py-1 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4 border-t border-slate-100 pt-4 dark:border-slate-800">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary-500 flex items-center gap-2 text-sm font-medium transition-colors"
                  >
                    <ExternalLink size={16} /> Demo Live
                  </a>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary-500 flex items-center gap-2 text-sm font-medium transition-colors"
                    >
                      <Github size={16} /> Code
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

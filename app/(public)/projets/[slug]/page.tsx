import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { getContent } from "@/lib/db";
import { resolveContent } from "@/lib/content";
import { defaultLocale, locales, type Locale } from "@/i18n/config";

type Params = { slug: string };

// Génère les routes statiques pour chaque projet connu.
export async function generateStaticParams() {
  const { projects } = await getContent();
  return projects.map((p) => ({ slug: p.slug }));
}

async function getProject(slug: string) {
  const raw = (await getLocale()) as Locale;
  const locale = locales.includes(raw) ? raw : defaultLocale;
  const { projects } = resolveContent(await getContent(), locale);
  return projects.find((p) => p.slug === slug);
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: project.image ? [project.image] : undefined,
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const t = await getTranslations("projects");

  return (
    <article className="bg-slate-50 pt-24 pb-24 dark:bg-slate-950">
      <div className="container mx-auto max-w-4xl px-6">
        <Link
          href="/#projects"
          className="hover:text-primary-500 mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors dark:text-slate-400"
        >
          <ArrowLeft size={16} /> {t("back")}
        </Link>

        <div className="mb-4 flex items-center gap-3">
          <span className="bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300 rounded-full px-3 py-1 text-xs font-medium">
            {project.type}
          </span>
          <span className="text-sm text-slate-500">{project.year}</span>
        </div>

        <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">{project.title}</h1>
        <p className="mb-8 text-lg text-slate-600 dark:text-slate-400">{project.description}</p>

        <div className="relative mb-10 aspect-[16/10] overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 dark:border-slate-800 dark:bg-slate-800">
          {project.image && (
            <Image
              src={project.image}
              alt={`Aperçu du projet ${project.title}`}
              fill
              sizes="(max-width: 896px) 100vw, 896px"
              className="object-cover"
              priority
            />
          )}
        </div>

        <div className="mb-10 flex flex-wrap gap-4">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary-600 hover:bg-primary-500 inline-flex items-center gap-2 rounded-lg px-6 py-3 font-medium text-white transition-colors"
          >
            <ExternalLink size={18} /> {t("demo")}
          </a>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-6 py-3 font-medium transition-colors hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
            >
              <Github size={18} /> {t("code")}
            </a>
          )}
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <CaseBlock title={t("problem")} text={project.problem} />
          <CaseBlock title={t("solution")} text={project.solution} />
          <CaseBlock title={t("result")} text={project.result} />
        </div>

        <div className="mt-10">
          <h2 className="mb-3 text-sm font-semibold tracking-wide text-slate-500 uppercase">
            {t("stack")}
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="rounded-lg border border-slate-200 bg-white px-3 py-1 text-sm font-medium dark:border-slate-700 dark:bg-slate-800"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

function CaseBlock({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
      <h2 className="text-primary-600 dark:text-primary-400 mb-2 text-sm font-semibold tracking-wide uppercase">
        {title}
      </h2>
      <p className="text-slate-700 dark:text-slate-300">{text}</p>
    </div>
  );
}

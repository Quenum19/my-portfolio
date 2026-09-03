import Link from "next/link";
import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import { ArrowLeft } from "lucide-react";
import { getContent } from "@/lib/db";
import { resolveContent } from "@/lib/content";
import { defaultLocale, locales, type Locale } from "@/i18n/config";
import ProjectsExplorer from "@/components/ProjectsExplorer";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("projects");
  return { title: t("indexTitle"), description: t("indexSubtitle") };
}

export default async function ProjectsIndexPage() {
  const t = await getTranslations("projects");
  const raw = (await getLocale()) as Locale;
  const locale = locales.includes(raw) ? raw : defaultLocale;
  const { projects } = resolveContent(await getContent(), locale);

  return (
    <div className="bg-slate-50 pt-24 pb-24 dark:bg-slate-950">
      <div className="container mx-auto px-6">
        <Link
          href="/#projects"
          className="hover:text-primary-500 mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors dark:text-slate-400"
        >
          <ArrowLeft size={16} /> {t("backHome")}
        </Link>

        <h1 className="mb-3 text-4xl font-bold tracking-tight md:text-5xl">{t("indexTitle")}</h1>
        <p className="mb-12 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
          {t("indexSubtitle")}
        </p>

        <ProjectsExplorer projects={projects} />
      </div>
    </div>
  );
}

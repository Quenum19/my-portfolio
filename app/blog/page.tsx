import Link from "next/link";
import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import { ArrowUpRight, Clock } from "lucide-react";
import { getContent } from "@/lib/db";
import { readingMinutes } from "@/lib/reading-time";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("blog");
  return { title: t("title"), description: t("subtitle") };
}

export default async function BlogPage() {
  const t = await getTranslations("blog");
  const locale = await getLocale();
  const { posts } = await getContent();
  const published = posts.filter((p) => p.published).sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <div className="bg-slate-50 pt-24 pb-24 dark:bg-slate-950">
      <div className="container mx-auto max-w-3xl px-6">
        <h1 className="mb-3 text-4xl font-bold tracking-tight md:text-5xl">{t("title")}</h1>
        <p className="mb-12 text-lg text-slate-600 dark:text-slate-400">{t("subtitle")}</p>

        {published.length === 0 ? (
          <p className="text-slate-500">{t("empty")}</p>
        ) : (
          <ul className="space-y-6">
            {published.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group hover:border-primary-500/50 block rounded-2xl border border-slate-200 bg-white p-6 transition-colors dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="mb-2 flex items-center gap-3 text-sm text-slate-500">
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString(locale, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                    <span className="flex items-center gap-1">
                      <Clock size={14} />{" "}
                      {t("readingTime", { minutes: readingMinutes(post.content) })}
                    </span>
                  </div>
                  <h2 className="group-hover:text-primary-500 flex items-center gap-1 text-xl font-bold transition-colors">
                    {post.title}
                    <ArrowUpRight
                      size={18}
                      className="opacity-0 transition-opacity group-hover:opacity-100"
                    />
                  </h2>
                  <p className="mt-2 text-slate-600 dark:text-slate-400">{post.description}</p>
                  {post.tags.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded bg-slate-100 px-2 py-1 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

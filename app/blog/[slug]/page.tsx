import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import { getTranslations, getLocale } from "next-intl/server";
import { ArrowLeft, Clock } from "lucide-react";
import { getContent } from "@/lib/db";
import { readingMinutes } from "@/lib/reading-time";

type Params = { slug: string };

export async function generateStaticParams() {
  const { posts } = await getContent();
  return posts.filter((p) => p.published).map((p) => ({ slug: p.slug }));
}

async function getPost(slug: string) {
  const { posts } = await getContent();
  return posts.find((p) => p.slug === slug && p.published);
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: { type: "article", title: post.title, description: post.description },
  };
}

// Coloration syntaxique via Shiki, avec thèmes clair/sombre.
const prettyCodeOptions = {
  theme: { light: "github-light", dark: "github-dark" },
  keepBackground: false,
};

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const t = await getTranslations("blog");
  const locale = await getLocale();

  return (
    <article className="bg-slate-50 pt-24 pb-24 dark:bg-slate-950">
      <div className="container mx-auto max-w-3xl px-6">
        <Link
          href="/blog"
          className="hover:text-primary-500 mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors dark:text-slate-400"
        >
          <ArrowLeft size={16} /> {t("back")}
        </Link>

        <div className="mb-3 flex items-center gap-3 text-sm text-slate-500">
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString(locale, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <span className="flex items-center gap-1">
            <Clock size={14} /> {t("readingTime", { minutes: readingMinutes(post.content) })}
          </span>
        </div>

        <h1 className="mb-8 text-4xl font-bold tracking-tight md:text-5xl">{post.title}</h1>

        <div className="prose prose-slate dark:prose-invert prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-800 max-w-none">
          <MDXRemote
            source={post.content}
            options={{ mdxOptions: { rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]] } }}
          />
        </div>
      </div>
    </article>
  );
}

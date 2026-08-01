import type { MetadataRoute } from "next";
import { getContent } from "@/lib/db";
import { BLOG_ENABLED } from "@/lib/features";

// Toujours refléter le contenu courant de la base (modifs admin sans rebuild).
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const content = await getContent();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || content.site.url;

  const projectPages: MetadataRoute.Sitemap = content.projects.map((p) => ({
    url: `${siteUrl}/projets/${p.slug}`,
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  const blogPages: MetadataRoute.Sitemap = BLOG_ENABLED
    ? [
        { url: `${siteUrl}/blog`, changeFrequency: "weekly", priority: 0.8 },
        ...content.posts
          .filter((p) => p.published)
          .map((p) => ({
            url: `${siteUrl}/blog/${p.slug}`,
            lastModified: p.date,
            changeFrequency: "monthly" as const,
            priority: 0.6,
          })),
      ]
    : [];

  return [{ url: siteUrl, changeFrequency: "monthly", priority: 1 }, ...projectPages, ...blogPages];
}

import type { MetadataRoute } from "next";
import { DATA, SITE } from "@/lib/data";
import { getAllPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || SITE.url;

  const projectPages: MetadataRoute.Sitemap = DATA.projects.map((p) => ({
    url: `${siteUrl}/projets/${p.slug}`,
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  const blogPages: MetadataRoute.Sitemap = getAllPosts().map((p) => ({
    url: `${siteUrl}/blog/${p.slug}`,
    lastModified: p.date,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [
    { url: siteUrl, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/blog`, changeFrequency: "weekly", priority: 0.8 },
    ...projectPages,
    ...blogPages,
  ];
}

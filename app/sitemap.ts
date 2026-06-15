import type { MetadataRoute } from "next";
import { DATA, SITE } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || SITE.url;

  const projectPages: MetadataRoute.Sitemap = DATA.projects.map((p) => ({
    url: `${siteUrl}/projets/${p.slug}`,
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  return [{ url: siteUrl, changeFrequency: "monthly", priority: 1 }, ...projectPages];
}

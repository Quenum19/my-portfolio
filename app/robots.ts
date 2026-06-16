import type { MetadataRoute } from "next";
import { getContent } from "@/lib/db";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const { site } = await getContent();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || site.url;
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/admin"] },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}

import type { MetadataRoute } from "next";
import { getContent } from "@/lib/db";
import { resolveContent } from "@/lib/content";
import { defaultLocale } from "@/i18n/config";

export const dynamic = "force-dynamic";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const { personal } = resolveContent(await getContent(), defaultLocale);
  return {
    name: `${personal.name} — Portfolio`,
    short_name: personal.name.split(" ")[0],
    description: personal.bio,
    start_url: "/",
    display: "standalone",
    background_color: "#0f172a",
    theme_color: "#0ea5e9",
    icons: [
      { src: "/icon", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}

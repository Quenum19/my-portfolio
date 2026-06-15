import type { MetadataRoute } from "next";
import { DATA } from "@/lib/data";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${DATA.personal.name} — Portfolio`,
    short_name: DATA.personal.name.split(" ")[0],
    description: DATA.personal.bio,
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

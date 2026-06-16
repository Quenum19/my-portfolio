import { ImageResponse } from "next/og";
import { getContent } from "@/lib/db";
import { resolveContent } from "@/lib/content";
import { defaultLocale } from "@/i18n/config";

export const alt = "Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Image Open Graph dynamique (partage réseaux sociaux).
export default async function OpengraphImage() {
  const { personal } = resolveContent(await getContent(), defaultLocale);
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        background: "#0f172a",
        backgroundImage:
          "radial-gradient(circle at 80% 20%, rgba(14,165,233,0.35), transparent 45%), radial-gradient(circle at 10% 90%, rgba(124,58,237,0.30), transparent 40%)",
        color: "white",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ fontSize: 30, color: "#38bdf8", fontWeight: 600 }}>{personal.role}</div>
      <div
        style={{ fontSize: 84, fontWeight: 800, marginTop: 16, lineHeight: 1.05, display: "flex" }}
      >
        {personal.name}
      </div>
      <div
        style={{ fontSize: 30, marginTop: 28, color: "#cbd5e1", maxWidth: 900, display: "flex" }}
      >
        React · Laravel · Node.js — {personal.location}
      </div>
    </div>,
    size,
  );
}

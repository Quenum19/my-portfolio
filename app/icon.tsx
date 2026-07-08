import { ImageResponse } from "next/og";
import { getContent } from "@/lib/db";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";
export const dynamic = "force-dynamic";

// Favicon généré : initiale sur fond dégradé de la marque.
export default async function Icon() {
  const { personal } = await getContent();
  const initial = personal.name.trim().charAt(0).toUpperCase() || "D";
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0ea5e9, #7c3aed)",
        color: "white",
        fontSize: 320,
        fontWeight: 700,
      }}
    >
      {initial}
    </div>,
    size,
  );
}

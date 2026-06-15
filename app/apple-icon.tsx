import { ImageResponse } from "next/og";
import { DATA } from "@/lib/data";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  const initial = DATA.personal.name.trim().charAt(0).toUpperCase() || "D";
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
        fontSize: 110,
        fontWeight: 700,
      }}
    >
      {initial}
    </div>,
    size,
  );
}

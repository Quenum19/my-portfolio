import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { isAuthenticated } from "@/lib/auth";

/** Téléverse une image vers Vercel Blob (nécessite BLOB_READ_WRITE_TOKEN). */
export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: "Upload non configuré (Vercel Blob). Colle plutôt une URL d'image." },
      { status: 400 },
    );
  }

  const filename = req.nextUrl.searchParams.get("filename") || "upload";
  if (!req.body) {
    return NextResponse.json({ error: "Fichier manquant." }, { status: 400 });
  }

  try {
    const blob = await put(`portfolio/${Date.now()}-${filename}`, req.body, {
      access: "public",
      addRandomSuffix: true,
    });
    return NextResponse.json({ url: blob.url });
  } catch (e) {
    console.error("[upload]", e);
    return NextResponse.json({ error: "Upload impossible." }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { saveContent } from "@/lib/db";
import type { SiteContent } from "@/lib/content";

/** Enregistre le contenu complet du site (réservé à l'admin authentifié). */
export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }
  try {
    const data = (await req.json()) as SiteContent;
    if (!data || typeof data !== "object" || !data.personal || !data.skills) {
      return NextResponse.json({ error: "Données invalides." }, { status: 400 });
    }
    await saveContent(data);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[admin/content]", e);
    return NextResponse.json({ error: "Enregistrement impossible." }, { status: 500 });
  }
}

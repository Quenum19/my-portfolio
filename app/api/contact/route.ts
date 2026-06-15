import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { DATA } from "@/lib/data";

/**
 * Route d'envoi du formulaire de contact.
 * - Validation côté serveur (Zod)
 * - Anti-spam : honeypot (`company`) + rate-limit basique par IP
 * - Envoi via Resend si RESEND_API_KEY est défini (sinon mode "dry-run" loggué)
 */

// Schéma de validation — la source de vérité côté serveur.
const ContactSchema = z.object({
  name: z.string().trim().min(2, "Nom trop court").max(100),
  email: z.string().trim().email("Email invalide").max(160),
  message: z.string().trim().min(10, "Message trop court").max(5000),
  // Champ piège invisible pour les bots. On l'accepte dans le schéma puis on
  // le traite plus bas : s'il est rempli, on simule un succès sans rien envoyer.
  company: z.string().optional(),
});

// Rate-limit en mémoire (basique, par instance) : 5 requêtes / 10 min / IP.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_REQUESTS;
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Trop de tentatives. Réessaie dans quelques minutes." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const parsed = ContactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Champs invalides.", details: z.flattenError(parsed.error).fieldErrors },
      { status: 400 },
    );
  }

  // Honeypot rempli => bot. On répond "succès" pour ne pas l'informer.
  if (parsed.data.company) {
    return NextResponse.json({ ok: true });
  }

  const { name, email, message } = parsed.data;
  const apiKey = process.env.RESEND_API_KEY;

  // Sans clé API (dev local non configuré) : on ne casse pas, on loggue.
  if (!apiKey) {
    console.warn("[contact] RESEND_API_KEY manquante — message non envoyé:", {
      name,
      email,
    });
    return NextResponse.json({ ok: true, dryRun: true });
  }

  try {
    const resend = new Resend(apiKey);
    const to = process.env.CONTACT_TO_EMAIL || DATA.personal.email;
    const from = process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";

    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `Nouveau message portfolio — ${name}`,
      text: `De : ${name} <${email}>\n\n${message}`,
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json({ error: "Envoi impossible pour le moment." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Exception:", err);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}

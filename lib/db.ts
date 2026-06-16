import "server-only";
import { sql } from "@vercel/postgres";
import { DEFAULT_CONTENT, type SiteContent } from "./content";

// La librairie @vercel/postgres lit POSTGRES_URL. Selon l'intégration Vercel,
// la variable peut s'appeler DATABASE_URL : on fait le pont si besoin.
if (!process.env.POSTGRES_URL && process.env.DATABASE_URL) {
  process.env.POSTGRES_URL = process.env.DATABASE_URL;
}

export function isDbConfigured(): boolean {
  return Boolean(process.env.POSTGRES_URL || process.env.DATABASE_URL);
}

let ensured = false;
async function ensureTable() {
  if (ensured) return;
  await sql`
    CREATE TABLE IF NOT EXISTS site_content (
      id INT PRIMARY KEY DEFAULT 1,
      data JSONB NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      CONSTRAINT single_row CHECK (id = 1)
    );
  `;
  ensured = true;
}

/** Lit le contenu du site (BDD), avec repli sur DEFAULT_CONTENT. */
export async function getContent(): Promise<SiteContent> {
  if (!isDbConfigured()) return DEFAULT_CONTENT;
  try {
    await ensureTable();
    const { rows } = await sql`SELECT data FROM site_content WHERE id = 1`;
    if (rows.length === 0) return DEFAULT_CONTENT;
    // Fusion superficielle avec le défaut pour tolérer un schéma incomplet.
    return { ...DEFAULT_CONTENT, ...(rows[0].data as SiteContent) };
  } catch (e) {
    console.error("[db] getContent: repli sur le contenu par défaut.", e);
    return DEFAULT_CONTENT;
  }
}

/** Écrit (upsert) le contenu complet du site. */
export async function saveContent(data: SiteContent): Promise<void> {
  await ensureTable();
  await sql`
    INSERT INTO site_content (id, data, updated_at)
    VALUES (1, ${JSON.stringify(data)}::jsonb, now())
    ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data, updated_at = now();
  `;
}

/** Initialise la base avec le contenu par défaut si elle est vide. */
export async function seedContent(): Promise<{ seeded: boolean }> {
  await ensureTable();
  const { rows } = await sql`SELECT 1 FROM site_content WHERE id = 1`;
  if (rows.length > 0) return { seeded: false };
  await saveContent(DEFAULT_CONTENT);
  return { seeded: true };
}

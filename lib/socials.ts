/* =====================================================================
   RÉSEAUX SOCIAUX — source unique
   Ajouter une plateforme ici suffit : le <select> de l'admin, la détection
   automatique depuis l'URL et les icônes du site s'alignent dessus.
   (Les icônes elles-mêmes vivent dans components/SocialIcon.tsx.)
   ===================================================================== */

export const SOCIAL_PLATFORMS = [
  "website",
  "email",
  "phone",
  "whatsapp",
  "github",
  "gitlab",
  "linkedin",
  "twitter",
  "facebook",
  "instagram",
  "youtube",
  "tiktok",
  "telegram",
  "twitch",
  "dribbble",
  "behance",
  "figma",
  "codepen",
  "medium",
  "rss",
] as const;

export type SocialPlatform = (typeof SOCIAL_PLATFORMS)[number];

/** Libellé lisible affiché dans le <select> de l'admin. */
export const SOCIAL_LABELS: Record<SocialPlatform, string> = {
  website: "Site web",
  email: "Email",
  phone: "Téléphone",
  whatsapp: "WhatsApp",
  github: "GitHub",
  gitlab: "GitLab",
  linkedin: "LinkedIn",
  twitter: "X / Twitter",
  facebook: "Facebook",
  instagram: "Instagram",
  youtube: "YouTube",
  tiktok: "TikTok",
  telegram: "Telegram",
  twitch: "Twitch",
  dribbble: "Dribbble",
  behance: "Behance",
  figma: "Figma",
  codepen: "CodePen",
  medium: "Medium",
  rss: "Flux RSS",
};

/** Fragment d'URL identifiant chaque plateforme (ordre = priorité de test). */
const URL_HINTS: [SocialPlatform, RegExp][] = [
  ["whatsapp", /(wa\.me|whatsapp\.com)/i],
  ["github", /github\.com/i],
  ["gitlab", /gitlab\.com/i],
  ["linkedin", /linkedin\.com/i],
  ["twitter", /(twitter\.com|x\.com)/i],
  ["facebook", /(facebook\.com|fb\.com|fb\.me)/i],
  ["instagram", /instagram\.com/i],
  ["youtube", /(youtube\.com|youtu\.be)/i],
  ["tiktok", /tiktok\.com/i],
  ["telegram", /(t\.me|telegram\.me)/i],
  ["twitch", /twitch\.tv/i],
  ["dribbble", /dribbble\.com/i],
  ["behance", /behance\.net/i],
  ["figma", /figma\.com/i],
  ["codepen", /codepen\.io/i],
  ["medium", /medium\.com/i],
];

/**
 * Devine la plateforme à partir d'une URL collée dans l'admin.
 * Renvoie null si rien ne correspond : on laisse alors le choix de l'auteur.
 */
export function platformFromUrl(url: string): SocialPlatform | null {
  const value = url.trim();
  if (!value) return null;
  if (/^mailto:/i.test(value)) return "email";
  if (/^tel:/i.test(value)) return "phone";
  for (const [platform, pattern] of URL_HINTS) {
    if (pattern.test(value)) return platform;
  }
  return null;
}

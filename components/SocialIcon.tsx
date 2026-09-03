import {
  Globe,
  Mail,
  Phone,
  MessageCircle,
  Github,
  Gitlab,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  Youtube,
  Music2,
  Send,
  Twitch,
  Dribbble,
  Palette,
  Figma,
  Codepen,
  BookOpen,
  Rss,
  type LucideIcon,
} from "lucide-react";
import type { SocialPlatform } from "@/lib/socials";

/**
 * Icône de chaque réseau. Lucide ne fournit pas de marque officielle pour
 * WhatsApp, TikTok, Telegram, Behance et Medium : on utilise l'icône la plus
 * proche (bulle, note de musique, avion en papier, palette, livre) — le nom du
 * réseau reste porté par le libellé et l'aria-label du lien.
 */
export const SOCIAL_ICONS: Record<SocialPlatform, LucideIcon> = {
  website: Globe,
  email: Mail,
  phone: Phone,
  whatsapp: MessageCircle,
  github: Github,
  gitlab: Gitlab,
  linkedin: Linkedin,
  twitter: Twitter,
  facebook: Facebook,
  instagram: Instagram,
  youtube: Youtube,
  tiktok: Music2,
  telegram: Send,
  twitch: Twitch,
  dribbble: Dribbble,
  behance: Palette,
  figma: Figma,
  codepen: Codepen,
  medium: BookOpen,
  rss: Rss,
};

export default function SocialIcon({
  platform,
  size = 20,
  className,
}: {
  platform: SocialPlatform;
  size?: number;
  className?: string;
}) {
  const Icon = SOCIAL_ICONS[platform] ?? Globe;
  return <Icon size={size} className={className} />;
}

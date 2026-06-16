"use client";
import { useContent } from "@/components/ContentProvider";
import { useTranslations } from "next-intl";
import { Github, Linkedin, Mail, Twitter, Globe, type LucideIcon } from "lucide-react";
import type { SocialPlatform } from "@/lib/content";

const ICONS: Record<SocialPlatform, LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  email: Mail,
  twitter: Twitter,
  website: Globe,
};

export default function Footer() {
  const t = useTranslations("footer");
  const DATA = useContent();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-900 bg-slate-950 py-8 text-slate-400">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-6 md:flex-row">
        <p className="text-sm">
          © {year} {DATA.personal.name}. {t("rights")}
        </p>
        <div className="flex gap-6">
          {DATA.personal.socials.map((social) => {
            const Icon = ICONS[social.platform] ?? Globe;
            return (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-white"
                aria-label={social.label}
              >
                <Icon size={20} />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}

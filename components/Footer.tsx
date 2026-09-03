"use client";
import { useContent } from "@/components/ContentProvider";
import { useTranslations } from "next-intl";
import SocialIcon from "@/components/SocialIcon";

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
        <div className="flex flex-wrap justify-center gap-6">
          {DATA.personal.socials.map((social) => (
            <a
              key={`${social.platform}-${social.url}`}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white"
              aria-label={social.label || social.platform}
              title={social.label || social.platform}
            >
              <SocialIcon platform={social.platform} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

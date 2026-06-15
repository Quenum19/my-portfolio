import { DATA } from "@/lib/data";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");
  return (
    <footer className="border-t border-slate-900 bg-slate-950 py-8 text-slate-400">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-6 md:flex-row">
        <p className="text-sm">
          © {new Date().getFullYear()} {DATA.personal.name}. {t("rights")}
        </p>
        <div className="flex gap-6">
          {DATA.personal.socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white"
              aria-label={social.name}
            >
              <social.icon size={20} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

"use client";
import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { setLocale } from "@/app/actions/locale";
import type { Locale } from "@/i18n/config";

/** Bascule FR <-> EN : enregistre le choix en cookie puis rafraîchit la page. */
export default function LanguageToggle() {
  const locale = useLocale();
  const t = useTranslations("a11y");
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const next: Locale = locale === "fr" ? "en" : "fr";

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() =>
        startTransition(async () => {
          await setLocale(next);
          router.refresh();
        })
      }
      aria-label={t("toggleLanguage")}
      title={t("toggleLanguage")}
      className="focus-visible:ring-primary-500 hover:text-primary-500 flex h-9 items-center justify-center rounded-lg border border-slate-200 px-2.5 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-100 focus-visible:ring-2 focus-visible:outline-none disabled:opacity-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
    >
      {locale.toUpperCase()}
    </button>
  );
}

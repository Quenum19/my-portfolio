import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";
import { defaultLocale, LOCALE_COOKIE, locales, type Locale } from "./config";

// Détermine la langue active à partir du cookie, sinon FR par défaut,
// puis charge les messages correspondants.
export default getRequestConfig(async () => {
  const store = await cookies();
  const candidate = store.get(LOCALE_COOKIE)?.value as Locale | undefined;
  const locale = candidate && locales.includes(candidate) ? candidate : defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});

import { getTranslations } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReadingProgress from "@/components/ReadingProgress";

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const t = await getTranslations("a11y");

  return (
    <>
      <a
        href="#main-content"
        className="focus:bg-primary-600 sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:px-4 focus:py-2 focus:text-white"
      >
        {t("skipToContent")}
      </a>
      <ReadingProgress />
      <Header />
      <main id="main-content" className="min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  );
}

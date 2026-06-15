import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import React from "react";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";
import Providers from "@/components/Providers";
import JsonLd from "@/components/JsonLd";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReadingProgress from "@/components/ReadingProgress";
import { DATA, SITE } from "@/lib/data";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || SITE.url;
const title = `${DATA.personal.name} | ${DATA.personal.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: `%s | ${DATA.personal.name}`,
  },
  description: DATA.personal.bio,
  applicationName: `${DATA.personal.name} — Portfolio`,
  authors: [{ name: DATA.personal.name }],
  creator: DATA.personal.name,
  keywords: [
    "développeur fullstack",
    "React",
    "Laravel",
    "Node.js",
    DATA.personal.name,
    DATA.personal.location,
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteUrl,
    siteName: title,
    title,
    description: DATA.personal.bio,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: DATA.personal.bio,
    creator: SITE.twitterHandle ? `@${SITE.twitterHandle}` : undefined,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const t = await getTranslations("a11y");

  return (
    <html lang={locale} className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrains.variable} dark:bg-dark-bg bg-slate-50 text-slate-900 transition-colors duration-300 dark:text-slate-100`}
      >
        <JsonLd />
        <NextIntlClientProvider>
          <Providers>
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
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

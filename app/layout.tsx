import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import React from "react";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import Providers from "@/components/Providers";
import { ContentProvider } from "@/components/ContentProvider";
import JsonLd from "@/components/JsonLd";
import Analytics from "@/components/Analytics";
import { getContent } from "@/lib/db";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent();
  const { personal, site } = content;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || site.url;
  const title = `${personal.name} | ${personal.role}`;

  return {
    metadataBase: new URL(siteUrl),
    title: { default: title, template: `%s | ${personal.name}` },
    description: personal.bio,
    applicationName: `${personal.name} — Portfolio`,
    authors: [{ name: personal.name }],
    creator: personal.name,
    keywords: [
      "développeur fullstack",
      "React",
      "Laravel",
      "Node.js",
      personal.name,
      personal.location,
    ],
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      locale: "fr_FR",
      url: siteUrl,
      siteName: title,
      title,
      description: personal.bio,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: personal.bio,
      creator: site.twitterHandle ? `@${site.twitterHandle}` : undefined,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
  };
}

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
  const content = await getContent();

  return (
    <html lang={locale} className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrains.variable} dark:bg-dark-bg bg-slate-50 text-slate-900 transition-colors duration-300 dark:text-slate-100`}
      >
        <JsonLd content={content} />
        <Analytics />
        <NextIntlClientProvider>
          <ContentProvider value={content}>
            <Providers>{children}</Providers>
          </ContentProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

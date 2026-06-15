import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import React from "react";
import "./globals.css";
import Providers from "@/components/Providers";
import JsonLd from "@/components/JsonLd";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrains.variable} dark:bg-dark-bg bg-slate-50 text-slate-900 transition-colors duration-300 dark:text-slate-100`}
      >
        <JsonLd />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

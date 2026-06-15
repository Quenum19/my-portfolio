import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import React from "react";
import "./globals.css";
import Providers from "@/components/Providers";
import { DATA } from "@/lib/data";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

export const metadata: Metadata = {
  title: `${DATA.personal.name} | ${DATA.personal.role}`,
  description: DATA.personal.bio,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrains.variable} bg-slate-50 dark:bg-dark-bg text-slate-900 dark:text-slate-100 transition-colors duration-300`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

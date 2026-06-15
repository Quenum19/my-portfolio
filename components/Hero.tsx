"use client";
import { motion } from "framer-motion";
import { DATA } from "@/lib/data";
import { useTranslations } from "next-intl";
import { ArrowDown, Download } from "lucide-react";

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16"
    >
      {/* Background Abstract Shapes */}
      <div className="bg-primary-500/10 absolute top-20 right-0 -z-10 h-96 w-96 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 -z-10 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />

      <div className="container mx-auto grid items-center gap-12 px-6 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {DATA.personal.available && (
            <div className="bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 mb-6 inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium">
              <span className="relative flex h-2 w-2">
                <span className="bg-primary-400 absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"></span>
                <span className="bg-primary-500 relative inline-flex h-2 w-2 rounded-full"></span>
              </span>
              {t("badge")}
            </div>
          )}

          <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-7xl">
            {t("titlePre")}{" "}
            <span className="from-primary-600 bg-gradient-to-r to-purple-600 bg-clip-text text-transparent">
              {t("titleHighlight")}
            </span>
            .
          </h1>

          <p className="mb-8 max-w-lg text-xl leading-relaxed text-slate-600 dark:text-slate-400">
            {t("intro", { name: DATA.personal.name, age: DATA.personal.age })}
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#projects"
              className="rounded-lg bg-slate-900 px-8 py-4 font-medium text-white transition-transform hover:scale-105 dark:bg-white dark:text-slate-900"
            >
              {t("ctaProjects")}
            </a>
            <a
              href="#contact"
              className="rounded-lg border border-slate-200 px-8 py-4 font-medium transition-colors hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
            >
              {t("ctaContact")}
            </a>
            {DATA.personal.cvUrl && (
              <a
                href={DATA.personal.cvUrl}
                download
                className="hover:text-primary-500 inline-flex items-center gap-2 px-4 py-4 font-medium text-slate-600 transition-colors dark:text-slate-300"
              >
                <Download size={18} /> {t("downloadCv")}
              </a>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="relative hidden md:block"
        >
          {/* Code Snippet Visual */}
          <div className="rotate-3 rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-2xl transition-transform duration-500 hover:rotate-0">
            <div className="mb-4 flex gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500" />
              <div className="h-3 w-3 rounded-full bg-yellow-500" />
              <div className="h-3 w-3 rounded-full bg-green-500" />
            </div>
            <pre className="overflow-x-auto font-mono text-sm text-slate-300">
              <code>
                {`const developer = {
  name: "${DATA.personal.name}",
  stack: ["React", "Laravel"],
  hardWorker: true,
  quickLearner: true,

  code: () => {
    return "Passion & Quality";
  }
};`}
              </code>
            </pre>
          </div>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-400"
      >
        <ArrowDown size={24} />
      </motion.div>
    </section>
  );
}

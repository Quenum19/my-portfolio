"use client";
import { motion } from "framer-motion";
import { useContent } from "@/components/ContentProvider";
import { useTranslations } from "next-intl";
import { Database, Layout, Server, Wrench, Code2 } from "lucide-react";

const icons: Record<string, typeof Code2> = {
  frontend: Layout,
  backend: Server,
  database: Database,
  tools: Wrench,
};

export default function Skills() {
  const t = useTranslations("skills");
  const DATA = useContent();

  // Les libellés de catégories sont traduits ; les items restent des données.
  const categories = [
    { id: "frontend", items: DATA.skills.frontend },
    { id: "backend", items: DATA.skills.backend },
    { id: "database", items: DATA.skills.database },
    { id: "tools", items: DATA.skills.tools },
  ] as const;

  return (
    <section id="skills" className="dark:bg-dark-bg bg-white py-24">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">{t("title")}</h2>
          <p className="text-slate-600 dark:text-slate-400">{t("subtitle")}</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat, idx) => {
            const Icon = icons[cat.id] || Code2;

            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="rounded-2xl bg-slate-50 p-6 transition-colors hover:bg-slate-100 dark:bg-slate-800/50 dark:hover:bg-slate-800"
              >
                <div className="bg-primary-100 dark:bg-primary-900/30 text-primary-600 mb-6 flex h-12 w-12 items-center justify-center rounded-xl">
                  <Icon size={24} />
                </div>
                <h3 className="mb-4 text-xl font-bold">{t(cat.id)}</h3>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-slate-200 bg-white px-3 py-1 text-sm font-medium dark:border-slate-600 dark:bg-slate-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

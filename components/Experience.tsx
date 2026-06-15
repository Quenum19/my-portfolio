"use client";
import { motion } from "framer-motion";
import { DATA } from "@/lib/data";
import { useTranslations } from "next-intl";
import { Briefcase } from "lucide-react";

export default function Experience() {
  const t = useTranslations("experience");
  return (
    <section id="experience" className="bg-slate-50 py-24 dark:bg-slate-900/50">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">{t("title")}</h2>
          <div className="bg-primary-500 h-1 w-20 rounded"></div>
        </div>

        <div className="relative ml-3 space-y-12 border-l-2 border-slate-200 md:ml-6 dark:border-slate-700">
          {DATA.experience.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-8 md:pl-12"
            >
              {/* Dot indicator */}
              <div className="bg-primary-500 absolute top-0 -left-[9px] h-4 w-4 rounded-full border-4 border-white dark:border-slate-900"></div>

              <div className="mb-2 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{exp.role}</h3>
                <span className="text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 mt-2 w-fit rounded-full px-3 py-1 font-mono text-sm sm:mt-0">
                  {exp.period}
                </span>
              </div>

              <div className="mb-4 flex items-center gap-2 text-lg font-medium text-slate-700 dark:text-slate-300">
                <Briefcase size={18} />
                {exp.company}
              </div>

              <p className="mb-4 text-slate-600 italic dark:text-slate-400">{exp.description}</p>

              <ul className="mb-4 list-inside list-disc space-y-2 text-slate-600 dark:text-slate-400">
                {exp.achievements.map((item, i) => (
                  <li key={i} className="marker:text-primary-500 pl-2">
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {exp.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded border border-slate-200 px-2 py-1 font-mono text-xs text-slate-500 dark:border-slate-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

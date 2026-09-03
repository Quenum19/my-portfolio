"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useContent } from "@/components/ContentProvider";
import { useTranslations } from "next-intl";
import { Briefcase, ChevronDown } from "lucide-react";
import type { ResolvedExperience } from "@/lib/content";

/** Expériences dépliées d'office ; les précédentes restent repliées. */
const DETAILED = 3;

export default function Experience() {
  const t = useTranslations("experience");
  const DATA = useContent();
  const [showOlder, setShowOlder] = useState(false);

  const recent = DATA.experience.slice(0, DETAILED);
  const older = DATA.experience.slice(DETAILED);

  return (
    <section id="experience" className="bg-slate-50 py-24 dark:bg-slate-900/50">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">{t("title")}</h2>
          <div className="bg-primary-500 h-1 w-20 rounded"></div>
        </div>

        <div className="relative ml-3 space-y-12 border-l-2 border-slate-200 md:ml-6 dark:border-slate-700">
          {recent.map((exp, index) => (
            <motion.div
              key={`${exp.company}-${index}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-8 md:pl-12"
            >
              <Dot />
              <ExperienceHeader exp={exp} />
              <ExperienceBody exp={exp} />
            </motion.div>
          ))}

          {showOlder &&
            older.map((exp, index) => (
              <CollapsedExperience key={`${exp.company}-${DETAILED + index}`} exp={exp} />
            ))}
        </div>

        {older.length > 0 && (
          <div className="mt-10 ml-3 md:ml-6">
            <button
              type="button"
              onClick={() => setShowOlder((v) => !v)}
              aria-expanded={showOlder}
              className="hover:border-primary-500/50 hover:text-primary-500 focus-visible:ring-primary-500 inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:outline-none dark:border-slate-700"
            >
              {showOlder ? t("showLess") : t("showAll", { count: older.length })}
              <ChevronDown
                size={16}
                className={`transition-transform ${showOlder ? "rotate-180" : ""}`}
              />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

/** Expérience ancienne : une ligne compacte, dépliable à la demande. */
function CollapsedExperience({ exp }: { exp: ResolvedExperience }) {
  const t = useTranslations("experience");
  const [open, setOpen] = useState(false);

  return (
    <div className="relative pl-8 md:pl-12">
      <Dot muted={!open} />
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="group focus-visible:ring-primary-500 flex w-full items-start justify-between gap-4 rounded-lg text-left focus-visible:ring-2 focus-visible:outline-none"
      >
        <span>
          <span className="group-hover:text-primary-500 block font-bold text-slate-900 transition-colors dark:text-white">
            {exp.role}
          </span>
          <span className="mt-1 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
            <Briefcase size={14} />
            {exp.company}
            <span className="text-slate-400">·</span>
            <span className="font-mono">{exp.period}</span>
          </span>
        </span>
        <span className="mt-1 flex shrink-0 items-center gap-1 text-xs text-slate-500">
          <span className="hidden sm:inline">{open ? t("hideDetails") : t("showDetails")}</span>
          <ChevronDown size={16} className={`transition-transform ${open ? "rotate-180" : ""}`} />
        </span>
      </button>

      {open && (
        <div className="mt-4">
          <ExperienceBody exp={exp} />
        </div>
      )}
    </div>
  );
}

function Dot({ muted = false }: { muted?: boolean }) {
  return (
    <div
      className={`absolute top-0 -left-[9px] h-4 w-4 rounded-full border-4 border-white dark:border-slate-900 ${
        muted ? "bg-slate-300 dark:bg-slate-600" : "bg-primary-500"
      }`}
    />
  );
}

function ExperienceHeader({ exp }: { exp: ResolvedExperience }) {
  return (
    <>
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
    </>
  );
}

function ExperienceBody({ exp }: { exp: ResolvedExperience }) {
  return (
    <>
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
    </>
  );
}

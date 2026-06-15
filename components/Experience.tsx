'use client';
import { motion } from "framer-motion";
import { DATA } from "@/lib/data";
import { Briefcase } from "lucide-react";

export default function Experience() {
  return (
    <section id="experience" className="py-24 bg-slate-50 dark:bg-slate-900/50">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Expérience Professionnelle</h2>
          <div className="h-1 w-20 bg-primary-500 rounded"></div>
        </div>

        <div className="relative border-l-2 border-slate-200 dark:border-slate-700 ml-3 md:ml-6 space-y-12">
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
              <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-primary-500 border-4 border-white dark:border-slate-900"></div>
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{exp.role}</h3>
                <span className="text-sm font-mono text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 px-3 py-1 rounded-full w-fit mt-2 sm:mt-0">
                  {exp.period}
                </span>
              </div>
              
              <div className="text-lg font-medium text-slate-700 dark:text-slate-300 mb-4 flex items-center gap-2">
                <Briefcase size={18} />
                {exp.company}
              </div>
              
              <p className="text-slate-600 dark:text-slate-400 mb-4 italic">
                {exp.description}
              </p>

              <ul className="list-disc list-inside space-y-2 mb-4 text-slate-600 dark:text-slate-400">
                {exp.achievements.map((item, i) => (
                  <li key={i} className="pl-2 marker:text-primary-500">{item}</li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {exp.stack.map((tech) => (
                  <span key={tech} className="text-xs font-mono border border-slate-200 dark:border-slate-700 px-2 py-1 rounded text-slate-500">
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
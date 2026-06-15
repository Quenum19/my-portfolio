'use client';
import { motion } from 'framer-motion';
import { DATA } from '@/lib/data';
import { Database, Layout, Server, Wrench, Code2 } from 'lucide-react';

const icons: Record<string, typeof Code2> = {
  frontend: Layout,
  backend: Server,
  database: Database,
  tools: Wrench,
};

export default function Skills() {
  // Transformation des données pour l'affichage
  const categories = [
    { id: 'frontend', label: 'Frontend & UI', items: DATA.skills.frontend },
    { id: 'backend', label: 'Backend & API', items: DATA.skills.backend },
    { id: 'database', label: 'Base de données', items: DATA.skills.database },
    { id: 'tools', label: 'Outils & DevOps', items: DATA.skills.tools },
  ];

  return (
    <section id="skills" className="py-24 bg-white dark:bg-dark-bg">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Compétences Techniques</h2>
          <p className="text-slate-600 dark:text-slate-400">Mon arsenal technologique pour créer des solutions complètes.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat, idx) => {
            const Icon = icons[cat.id] || Code2;
            
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 text-primary-600 rounded-xl flex items-center justify-center mb-6">
                  <Icon size={24} />
                </div>
                <h3 className="text-xl font-bold mb-4">{cat.label}</h3>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-white dark:bg-slate-700 rounded-full text-sm font-medium border border-slate-200 dark:border-slate-600">
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
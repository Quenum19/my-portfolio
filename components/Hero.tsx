'use client';
import { motion } from "framer-motion";
import { DATA } from "@/lib/data";
import { ArrowDown, Code2 } from "lucide-react";

export default function Hero() {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
      {/* Background Abstract Shapes */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 left-0 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-sm font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
            </span>
            Disponible pour opportunités
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Je construis le <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-purple-600">Web de demain</span>.
          </h1>
          
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-lg leading-relaxed">
            Salut, je suis <span className="font-semibold text-slate-900 dark:text-white">{DATA.personal.name}</span>. 
            Développeur Fullstack de {DATA.personal.age} ans. Je transforme vos idées en applications React & Laravel performantes.
          </p>

          <div className="flex gap-4">
            <a href="#projects" className="px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg font-medium hover:scale-105 transition-transform">
              Voir mes projets
            </a>
            <a href="#contact" className="px-8 py-4 border border-slate-200 dark:border-slate-700 rounded-lg font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              Me contacter
            </a>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="relative hidden md:block"
        >
           {/* Code Snippet Visual */}
           <div className="bg-slate-900 rounded-xl p-6 shadow-2xl border border-slate-800 rotate-3 hover:rotate-0 transition-transform duration-500">
             <div className="flex gap-2 mb-4">
               <div className="w-3 h-3 rounded-full bg-red-500"/>
               <div className="w-3 h-3 rounded-full bg-yellow-500"/>
               <div className="w-3 h-3 rounded-full bg-green-500"/>
             </div>
             <pre className="font-mono text-sm text-slate-300 overflow-x-auto">
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
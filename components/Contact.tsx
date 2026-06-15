'use client';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send } from 'lucide-react';
import { DATA } from '@/lib/data';

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Parlons de votre projet</h2>
          <p className="text-slate-300 mb-8 text-lg">
            Je suis actuellement disponible pour des missions freelance ou des postes en CDI. 
            Discutons de la manière dont je peux contribuer à votre équipe.
          </p>
          
          <div className="space-y-6">
            <a href={`mailto:${DATA.personal.email}`} className="flex items-center gap-4 text-slate-300 hover:text-white transition-colors">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-sm text-slate-400">Email</p>
                <p className="font-medium">{DATA.personal.email}</p>
              </div>
            </a>
            
            <div className="flex items-center gap-4 text-slate-300">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-sm text-slate-400">Localisation</p>
                <p className="font-medium">{DATA.personal.location}</p>
              </div>
            </div>
          </div>
        </div>

        <form className="bg-white/5 p-8 rounded-2xl border border-white/10 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Nom</label>
              <input type="text" className="w-full bg-slate-800/50 border border-slate-700 rounded-lg p-3 focus:ring-2 focus:ring-primary-500 outline-none transition-all" placeholder="Votre nom" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Email</label>
              <input type="email" className="w-full bg-slate-800/50 border border-slate-700 rounded-lg p-3 focus:ring-2 focus:ring-primary-500 outline-none transition-all" placeholder="votre@email.com" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Message</label>
            <textarea rows={4} className="w-full bg-slate-800/50 border border-slate-700 rounded-lg p-3 focus:ring-2 focus:ring-primary-500 outline-none transition-all" placeholder="Parlez-moi de votre projet..."></textarea>
          </div>
          <button type="submit" className="w-full py-4 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2">
            <Send size={18} />
            Envoyer le message
          </button>
        </form>
      </div>
    </section>
  );
}
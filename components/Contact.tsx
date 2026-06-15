'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { DATA } from '@/lib/data';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle');
  const [feedback, setFeedback] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'loading') return;

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus('loading');
    setFeedback('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Une erreur est survenue. Réessaie.");
      }

      setStatus('success');
      setFeedback('Merci ! Ton message a bien été envoyé. Je te réponds vite.');
      form.reset();
    } catch (err) {
      setStatus('error');
      setFeedback(err instanceof Error ? err.message : 'Une erreur est survenue.');
    }
  }

  const isLoading = status === 'loading';

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
            <a
              href={`mailto:${DATA.personal.email}`}
              className="flex items-center gap-4 text-slate-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-lg"
            >
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

        <form onSubmit={handleSubmit} noValidate className="bg-white/5 p-8 rounded-2xl border border-white/10 space-y-4">
          {/* Honeypot anti-spam : invisible pour les humains, piège pour les bots. */}
          <div className="absolute left-[-9999px]" aria-hidden="true">
            <label htmlFor="company">Ne pas remplir</label>
            <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-slate-300">Nom</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                minLength={2}
                disabled={isLoading}
                className="w-full bg-slate-800/50 border border-slate-700 rounded-lg p-3 focus:ring-2 focus:ring-primary-500 outline-none transition-all disabled:opacity-60"
                placeholder="Votre nom"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-slate-300">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                disabled={isLoading}
                className="w-full bg-slate-800/50 border border-slate-700 rounded-lg p-3 focus:ring-2 focus:ring-primary-500 outline-none transition-all disabled:opacity-60"
                placeholder="votre@email.com"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium text-slate-300">Message</label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              minLength={10}
              disabled={isLoading}
              className="w-full bg-slate-800/50 border border-slate-700 rounded-lg p-3 focus:ring-2 focus:ring-primary-500 outline-none transition-all disabled:opacity-60"
              placeholder="Parlez-moi de votre projet..."
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
          >
            {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
            {isLoading ? 'Envoi en cours…' : 'Envoyer le message'}
          </button>

          {/* Retour accessible : annoncé par les lecteurs d'écran */}
          <p
            role="status"
            aria-live="polite"
            className={`flex items-center gap-2 text-sm min-h-5 ${
              status === 'success' ? 'text-emerald-400' : status === 'error' ? 'text-red-400' : 'text-transparent'
            }`}
          >
            {status === 'success' && <CheckCircle2 size={16} className="shrink-0" />}
            {status === 'error' && <AlertCircle size={16} className="shrink-0" />}
            {feedback}
          </p>
        </form>
      </div>
    </section>
  );
}

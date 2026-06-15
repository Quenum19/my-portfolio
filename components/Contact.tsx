"use client";
import { useState } from "react";
import { Mail, MapPin, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { DATA } from "@/lib/data";

type Status = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading") return;

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus("loading");
    setFeedback("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Une erreur est survenue. Réessaie.");
      }

      setStatus("success");
      setFeedback("Merci ! Ton message a bien été envoyé. Je te réponds vite.");
      form.reset();
    } catch (err) {
      setStatus("error");
      setFeedback(err instanceof Error ? err.message : "Une erreur est survenue.");
    }
  }

  const isLoading = status === "loading";

  return (
    <section id="contact" className="relative overflow-hidden bg-slate-900 py-24 text-white">
      {/* Background Decor */}
      <div className="bg-primary-500/10 absolute top-0 right-0 h-64 w-64 rounded-full blur-3xl" />

      <div className="container mx-auto grid gap-16 px-6 md:grid-cols-2">
        <div>
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">Parlons de votre projet</h2>
          <p className="mb-8 text-lg text-slate-300">
            Je suis actuellement disponible pour des missions freelance ou des postes en CDI.
            Discutons de la manière dont je peux contribuer à votre équipe.
          </p>

          <div className="space-y-6">
            <a
              href={`mailto:${DATA.personal.email}`}
              className="focus-visible:ring-primary-500 flex items-center gap-4 rounded-lg text-slate-300 transition-colors hover:text-white focus-visible:ring-2 focus-visible:outline-none"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-sm text-slate-400">Email</p>
                <p className="font-medium">{DATA.personal.email}</p>
              </div>
            </a>

            <div className="flex items-center gap-4 text-slate-300">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-sm text-slate-400">Localisation</p>
                <p className="font-medium">{DATA.personal.location}</p>
              </div>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-8"
        >
          {/* Honeypot anti-spam : invisible pour les humains, piège pour les bots. */}
          <div className="absolute left-[-9999px]" aria-hidden="true">
            <label htmlFor="company">Ne pas remplir</label>
            <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-slate-300">
                Nom
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                minLength={2}
                disabled={isLoading}
                className="focus:ring-primary-500 w-full rounded-lg border border-slate-700 bg-slate-800/50 p-3 transition-all outline-none focus:ring-2 disabled:opacity-60"
                placeholder="Votre nom"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-slate-300">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                disabled={isLoading}
                className="focus:ring-primary-500 w-full rounded-lg border border-slate-700 bg-slate-800/50 p-3 transition-all outline-none focus:ring-2 disabled:opacity-60"
                placeholder="votre@email.com"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium text-slate-300">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              minLength={10}
              disabled={isLoading}
              className="focus:ring-primary-500 w-full rounded-lg border border-slate-700 bg-slate-800/50 p-3 transition-all outline-none focus:ring-2 disabled:opacity-60"
              placeholder="Parlez-moi de votre projet..."
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="bg-primary-600 hover:bg-primary-500 focus-visible:ring-primary-400 flex w-full items-center justify-center gap-2 rounded-lg py-4 font-bold text-white transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
            {isLoading ? "Envoi en cours…" : "Envoyer le message"}
          </button>

          {/* Retour accessible : annoncé par les lecteurs d'écran */}
          <p
            role="status"
            aria-live="polite"
            className={`flex min-h-5 items-center gap-2 text-sm ${
              status === "success"
                ? "text-emerald-400"
                : status === "error"
                  ? "text-red-400"
                  : "text-transparent"
            }`}
          >
            {status === "success" && <CheckCircle2 size={16} className="shrink-0" />}
            {status === "error" && <AlertCircle size={16} className="shrink-0" />}
            {feedback}
          </p>
        </form>
      </div>
    </section>
  );
}

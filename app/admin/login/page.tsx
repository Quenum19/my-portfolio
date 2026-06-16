"use client";
import { useActionState } from "react";
import { LogIn, Loader2, Lock } from "lucide-react";
import { login, type LoginState } from "@/app/actions/auth";

export default function LoginPage() {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(login, {});

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6 dark:bg-slate-950">
      <form
        action={formAction}
        className="w-full max-w-sm space-y-5 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900"
      >
        <div className="flex items-center gap-3">
          <div className="bg-primary-100 text-primary-600 dark:bg-primary-900/30 flex h-10 w-10 items-center justify-center rounded-xl">
            <Lock size={20} />
          </div>
          <div>
            <h1 className="text-lg font-bold">Administration</h1>
            <p className="text-sm text-slate-500">Accès réservé</p>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">
            Mot de passe
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoFocus
            autoComplete="current-password"
            className="focus:ring-primary-500 w-full rounded-lg border border-slate-300 bg-white p-3 outline-none focus:ring-2 dark:border-slate-700 dark:bg-slate-800"
            placeholder="••••••••"
          />
        </div>

        {state.error && (
          <p role="alert" className="text-sm text-red-500">
            {state.error}
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="bg-primary-600 hover:bg-primary-500 flex w-full items-center justify-center gap-2 rounded-lg py-3 font-medium text-white transition-colors disabled:opacity-60"
        >
          {pending ? <Loader2 size={18} className="animate-spin" /> : <LogIn size={18} />}
          Se connecter
        </button>
      </form>
    </div>
  );
}

import Link from "next/link";
import type { Metadata } from "next";
import { ExternalLink, LogOut } from "lucide-react";
import { getContent, isDbConfigured } from "@/lib/db";
import { logout } from "@/app/actions/auth";
import AdminDashboard from "@/components/admin/AdminDashboard";

export const metadata: Metadata = { title: "Administration", robots: { index: false } };

export default async function AdminPage() {
  const content = await getContent();
  const dbReady = isDbConfigured();

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-900/90">
        <div className="container mx-auto flex h-14 items-center justify-between px-4">
          <span className="font-bold">
            Admin<span className="text-primary-500">.</span>
          </span>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <ExternalLink size={15} /> Voir le site
            </Link>
            <form action={logout}>
              <button
                type="submit"
                className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm text-slate-600 hover:bg-red-50 hover:text-red-600 dark:text-slate-300 dark:hover:bg-red-950/30"
              >
                <LogOut size={15} /> Déconnexion
              </button>
            </form>
          </div>
        </div>
      </header>

      {!dbReady && (
        <div className="container mx-auto px-4 pt-4">
          <p className="rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-800 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-300">
            {
              "⚠️ Base de données non connectée : tes modifications ne seront pas enregistrées tant que Vercel Postgres n'est pas branché à ce projet."
            }
          </p>
        </div>
      )}

      <AdminDashboard initial={content} />
    </div>
  );
}

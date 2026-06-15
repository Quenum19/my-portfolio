'use client';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun, Monitor } from 'lucide-react';

/**
 * Bouton de bascule du thème : cycle clair → sombre → système.
 * Évite le mismatch d'hydratation en n'affichant l'icône qu'après le montage.
 */
export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const cycle = () => {
    setTheme(theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light');
  };

  // Avant le montage : placeholder neutre pour éviter le flash / décalage de layout.
  if (!mounted) {
    return (
      <span
        className="h-9 w-9 rounded-lg border border-slate-200 dark:border-slate-700"
        aria-hidden="true"
      />
    );
  }

  const label =
    theme === 'light'
      ? 'Thème clair (cliquer pour sombre)'
      : theme === 'dark'
        ? 'Thème sombre (cliquer pour système)'
        : 'Thème système (cliquer pour clair)';

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={label}
      title={label}
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-colors hover:bg-slate-100 hover:text-primary-500 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
    >
      {theme === 'light' && <Sun size={18} />}
      {theme === 'dark' && <Moon size={18} />}
      {theme === 'system' && <Monitor size={18} />}
    </button>
  );
}

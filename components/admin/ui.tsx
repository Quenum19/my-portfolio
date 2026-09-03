"use client";
import { useState } from "react";
import { Plus, Trash2, ChevronUp, ChevronDown, ChevronRight, Search } from "lucide-react";
import type { L, LList } from "@/lib/content";

/** Champ de recherche d'une liste longue (projets, expériences…). */
export function ListFilter({
  value,
  onChange,
  placeholder,
  shown,
  total,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  shown: number;
  total: number;
}) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search
          size={16}
          className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-slate-400"
        />
        <input
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="focus:border-primary-500 w-full rounded-lg border border-slate-300 bg-white py-2 pr-3 pl-9 text-sm outline-none dark:border-slate-700 dark:bg-slate-900"
        />
      </div>
      <span className="text-xs text-slate-500">
        {shown} / {total}
      </span>
    </div>
  );
}

function LangBadge({ lang }: { lang: "FR" | "EN" }) {
  return (
    <span className="bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300 mb-1 inline-block rounded px-1.5 py-0.5 text-[10px] font-bold tracking-wide">
      {lang}
    </span>
  );
}

/** Champ texte bilingue (FR + EN côte à côte). */
export function LocalizedInput({ value, onChange }: { value: L; onChange: (v: L) => void }) {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      <div>
        <LangBadge lang="FR" />
        <TextInput value={value.fr} onChange={(e) => onChange({ ...value, fr: e.target.value })} />
      </div>
      <div>
        <LangBadge lang="EN" />
        <TextInput value={value.en} onChange={(e) => onChange({ ...value, en: e.target.value })} />
      </div>
    </div>
  );
}

/** Zone de texte bilingue (FR + EN). */
export function LocalizedTextArea({
  value,
  onChange,
  rows = 3,
}: {
  value: L;
  onChange: (v: L) => void;
  rows?: number;
}) {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      <div>
        <LangBadge lang="FR" />
        <TextArea
          rows={rows}
          value={value.fr}
          onChange={(e) => onChange({ ...value, fr: e.target.value })}
        />
      </div>
      <div>
        <LangBadge lang="EN" />
        <TextArea
          rows={rows}
          value={value.en}
          onChange={(e) => onChange({ ...value, en: e.target.value })}
        />
      </div>
    </div>
  );
}

/** Liste de textes bilingue (FR + EN). */
export function LocalizedStringList({
  value,
  onChange,
}: {
  value: LList;
  onChange: (v: LList) => void;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <div>
        <LangBadge lang="FR" />
        <StringList values={value.fr} onChange={(fr) => onChange({ ...value, fr })} />
      </div>
      <div>
        <LangBadge lang="EN" />
        <StringList values={value.en} onChange={(en) => onChange({ ...value, en })} />
      </div>
    </div>
  );
}

export function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <label className="block space-y-1">
      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</span>
      {children}
      {hint && <span className="block text-xs text-slate-400">{hint}</span>}
    </label>
  );
}

const inputClass =
  "w-full rounded-lg border border-slate-300 bg-white p-2.5 text-sm outline-none focus:ring-2 focus:ring-primary-500 dark:border-slate-700 dark:bg-slate-800";

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={inputClass} />;
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`${inputClass} font-mono`} />;
}

export function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="accent-primary-600 h-4 w-4"
      />
      <span className="text-sm text-slate-700 dark:text-slate-300">{label}</span>
    </label>
  );
}

/** Éditeur de liste de chaînes (compétences, tech, tags, réalisations…). */
export function StringList({
  values,
  onChange,
  placeholder,
}: {
  values: string[];
  onChange: (v: string[]) => void;
  placeholder?: string;
}) {
  return (
    <div className="space-y-2">
      {values.map((val, i) => (
        <div key={i} className="flex gap-2">
          <input
            value={val}
            placeholder={placeholder}
            onChange={(e) => {
              const next = [...values];
              next[i] = e.target.value;
              onChange(next);
            }}
            className={inputClass}
          />
          <IconButton title="Supprimer" onClick={() => onChange(values.filter((_, j) => j !== i))}>
            <Trash2 size={16} />
          </IconButton>
        </div>
      ))}
      <AddButton onClick={() => onChange([...values, ""])} label="Ajouter" />
    </div>
  );
}

export function IconButton({
  children,
  onClick,
  title,
}: {
  children: React.ReactNode;
  onClick: () => void;
  title: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      aria-label={title}
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-300 text-slate-500 transition-colors hover:bg-red-50 hover:text-red-600 dark:border-slate-700 dark:hover:bg-red-950/30"
    >
      {children}
    </button>
  );
}

export function AddButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-primary-600 hover:text-primary-500 inline-flex items-center gap-1 text-sm font-medium"
    >
      <Plus size={16} /> {label}
    </button>
  );
}

/**
 * Conteneur d'un élément de liste (carte) avec actions monter/descendre/supprimer.
 * Repliable : sur une liste longue, les cartes sont fermées d'office
 * (`defaultOpen={false}`) pour que le formulaire reste utilisable.
 */
export function ListItemCard({
  title,
  subtitle,
  defaultOpen = true,
  onMoveUp,
  onMoveDown,
  onRemove,
  children,
}: {
  title: string;
  subtitle?: string;
  defaultOpen?: boolean;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  onRemove: () => void;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/50">
      <div className="flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="focus-visible:ring-primary-500 flex min-w-0 flex-1 items-center gap-2 rounded text-left focus-visible:ring-2 focus-visible:outline-none"
        >
          <ChevronRight
            size={16}
            className={`shrink-0 text-slate-400 transition-transform ${open ? "rotate-90" : ""}`}
          />
          <span className="min-w-0">
            <span className="block truncate text-sm font-semibold text-slate-500">{title}</span>
            {subtitle && <span className="block truncate text-xs text-slate-400">{subtitle}</span>}
          </span>
        </button>
        <div className="flex shrink-0 gap-1">
          {onMoveUp && (
            <IconButton title="Monter" onClick={onMoveUp}>
              <ChevronUp size={16} />
            </IconButton>
          )}
          {onMoveDown && (
            <IconButton title="Descendre" onClick={onMoveDown}>
              <ChevronDown size={16} />
            </IconButton>
          )}
          <IconButton
            title="Supprimer"
            onClick={() => {
              if (window.confirm(`Supprimer « ${title} » ? Pense à cliquer sur « Enregistrer ».`)) {
                onRemove();
              }
            }}
          >
            <Trash2 size={16} />
          </IconButton>
        </div>
      </div>
      {open && children}
    </div>
  );
}

/** Déplace un élément d'un tableau (utilitaire de réordonnancement). */
export function move<T>(arr: T[], from: number, to: number): T[] {
  if (to < 0 || to >= arr.length) return arr;
  const next = [...arr];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

"use client";
import { Plus, Trash2, ChevronUp, ChevronDown } from "lucide-react";

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

/** Conteneur d'un élément de liste (carte) avec actions monter/descendre/supprimer. */
export function ListItemCard({
  title,
  onMoveUp,
  onMoveDown,
  onRemove,
  children,
}: {
  title: string;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  onRemove: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/50">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-slate-500">{title}</h4>
        <div className="flex gap-1">
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
          <IconButton title="Supprimer" onClick={onRemove}>
            <Trash2 size={16} />
          </IconButton>
        </div>
      </div>
      {children}
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

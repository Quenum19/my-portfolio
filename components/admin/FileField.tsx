"use client";
import { useState } from "react";
import { Upload, Loader2, FileText, ExternalLink } from "lucide-react";
import { TextInput } from "./ui";

/**
 * Champ fichier (CV, plaquette…) : coller un chemin OU téléverser un PDF.
 * Le téléversement passe par Vercel Blob ; sans `BLOB_READ_WRITE_TOKEN`,
 * l'API renvoie un message clair et le champ texte reste utilisable.
 */
export function FileField({
  value,
  onChange,
  accept = "application/pdf",
  placeholder = "/cv.pdf ou https://…",
}: {
  value: string;
  onChange: (v: string) => void;
  accept?: string;
  placeholder?: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState("");

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setErr("");
    try {
      const res = await fetch(`/api/admin/upload?filename=${encodeURIComponent(file.name)}`, {
        method: "POST",
        body: file,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload impossible");
      onChange(data.url);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Upload impossible");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <TextInput
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
        <label className="flex h-10 shrink-0 cursor-pointer items-center gap-1 rounded-lg border border-slate-300 px-3 text-sm text-slate-600 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">
          {uploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
          <span>Téléverser</span>
          <input
            type="file"
            accept={accept}
            className="hidden"
            onChange={handleFile}
            disabled={uploading}
          />
        </label>
      </div>
      {err && <p className="text-xs text-red-500">{err}</p>}
      {value && (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-600 hover:text-primary-500 inline-flex items-center gap-1.5 text-xs"
        >
          <FileText size={14} />
          Ouvrir le fichier actuel
          <ExternalLink size={12} />
        </a>
      )}
    </div>
  );
}

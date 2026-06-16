"use client";
import { useState } from "react";
import { Upload, Loader2 } from "lucide-react";
import Image from "next/image";
import { TextInput } from "./ui";

/** Champ image : coller une URL OU téléverser un fichier (si Vercel Blob est configuré). */
export function ImageField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
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
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <TextInput
          value={value}
          placeholder="/projects/mon-image.jpg ou https://…"
          onChange={(e) => onChange(e.target.value)}
        />
        <label className="flex h-10 shrink-0 cursor-pointer items-center gap-1 rounded-lg border border-slate-300 px-3 text-sm text-slate-600 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">
          {uploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
          <span>Téléverser</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFile}
            disabled={uploading}
          />
        </label>
      </div>
      {err && <p className="text-xs text-red-500">{err}</p>}
      {value && (
        <div className="relative h-28 w-44 overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700">
          <Image src={value} alt="Aperçu" fill sizes="176px" className="object-cover" />
        </div>
      )}
    </div>
  );
}

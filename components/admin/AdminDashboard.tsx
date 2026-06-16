"use client";
import { useState } from "react";
import { Save, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import type {
  SiteContent,
  Experience,
  Education,
  Project,
  Testimonial,
  Post,
  SocialPlatform,
} from "@/lib/content";
import {
  Field,
  TextInput,
  Toggle,
  StringList,
  LocalizedInput,
  LocalizedTextArea,
  LocalizedStringList,
  ListItemCard,
  AddButton,
  move,
} from "./ui";
import { ImageField } from "./ImageField";

const emptyL = { fr: "", en: "" };

type TabId =
  | "personal"
  | "skills"
  | "experience"
  | "education"
  | "projects"
  | "testimonials"
  | "blog";

const TABS: { id: TabId; label: string }[] = [
  { id: "personal", label: "Infos perso" },
  { id: "skills", label: "Compétences" },
  { id: "experience", label: "Expériences" },
  { id: "education", label: "Formation" },
  { id: "projects", label: "Projets" },
  { id: "testimonials", label: "Témoignages" },
  { id: "blog", label: "Blog" },
];

const PLATFORMS: SocialPlatform[] = ["github", "linkedin", "email", "twitter", "website"];

export default function AdminDashboard({ initial }: { initial: SiteContent }) {
  const [content, setContent] = useState<SiteContent>(initial);
  const [tab, setTab] = useState<TabId>("personal");
  const [status, setStatus] = useState<"idle" | "saving" | "ok" | "error">("idle");
  const [message, setMessage] = useState("");

  function patch(part: Partial<SiteContent>) {
    setContent((c) => ({ ...c, ...part }));
  }

  async function save() {
    setStatus("saving");
    setMessage("");
    // Nettoyage : github vide -> null
    const payload: SiteContent = {
      ...content,
      projects: content.projects.map((p) => ({ ...p, github: p.github?.trim() ? p.github : null })),
    };
    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur");
      setContent(payload);
      setStatus("ok");
      setMessage("Modifications enregistrées ✓ (visibles immédiatement sur le site)");
    } catch (e) {
      setStatus("error");
      setMessage(e instanceof Error ? e.message : "Erreur");
    }
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Barre d'onglets + bouton enregistrer */}
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <div className="flex flex-wrap gap-1 rounded-xl border border-slate-200 bg-white p-1 dark:border-slate-800 dark:bg-slate-900">
          {TABS.map((tb) => (
            <button
              key={tb.id}
              onClick={() => setTab(tb.id)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                tab === tb.id
                  ? "bg-primary-600 text-white"
                  : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              }`}
            >
              {tb.label}
            </button>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-3">
          {status !== "idle" && status !== "saving" && (
            <span
              className={`flex items-center gap-1 text-sm ${status === "ok" ? "text-emerald-600" : "text-red-600"}`}
            >
              {status === "ok" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
              {message}
            </span>
          )}
          <button
            onClick={save}
            disabled={status === "saving"}
            className="bg-primary-600 hover:bg-primary-500 flex items-center gap-2 rounded-lg px-5 py-2 font-medium text-white transition-colors disabled:opacity-60"
          >
            {status === "saving" ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Save size={18} />
            )}
            Enregistrer
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        {tab === "personal" && <PersonalSection content={content} patch={patch} />}
        {tab === "skills" && <SkillsSection content={content} patch={patch} />}
        {tab === "experience" && (
          <ExperienceSection
            items={content.experience}
            onChange={(experience) => patch({ experience })}
          />
        )}
        {tab === "education" && (
          <EducationSection
            items={content.education}
            onChange={(education) => patch({ education })}
          />
        )}
        {tab === "projects" && (
          <ProjectsSection items={content.projects} onChange={(projects) => patch({ projects })} />
        )}
        {tab === "testimonials" && (
          <TestimonialsSection
            items={content.testimonials}
            onChange={(testimonials) => patch({ testimonials })}
          />
        )}
        {tab === "blog" && (
          <BlogSection items={content.posts} onChange={(posts) => patch({ posts })} />
        )}
      </div>
    </div>
  );
}

/* ------------------------------- Sections ------------------------------- */

function PersonalSection({
  content,
  patch,
}: {
  content: SiteContent;
  patch: (p: Partial<SiteContent>) => void;
}) {
  const p = content.personal;
  const setP = (part: Partial<SiteContent["personal"]>) => patch({ personal: { ...p, ...part } });

  return (
    <div className="grid gap-5 md:grid-cols-2">
      <Field label="Nom complet">
        <TextInput value={p.name} onChange={(e) => setP({ name: e.target.value })} />
      </Field>
      <Field label="Âge">
        <TextInput
          type="number"
          value={p.age}
          onChange={(e) => setP({ age: Number(e.target.value) })}
        />
      </Field>
      <div className="md:col-span-2">
        <Field label="Titre / rôle (FR / EN)">
          <LocalizedInput value={p.role} onChange={(role) => setP({ role })} />
        </Field>
      </div>
      <div className="md:col-span-2">
        <Field label="Localisation (FR / EN)">
          <LocalizedInput value={p.location} onChange={(location) => setP({ location })} />
        </Field>
      </div>
      <Field label="Email">
        <TextInput value={p.email} onChange={(e) => setP({ email: e.target.value })} />
      </Field>
      <Field label="Téléphone">
        <TextInput value={p.phone} onChange={(e) => setP({ phone: e.target.value })} />
      </Field>
      <Field label="Chemin du CV (PDF)" hint="ex. /cv.pdf — laisser vide pour masquer le bouton">
        <TextInput value={p.cvUrl} onChange={(e) => setP({ cvUrl: e.target.value })} />
      </Field>
      <div className="flex items-end">
        <Toggle
          checked={p.available}
          onChange={(available) => setP({ available })}
          label="Afficher le badge « Disponible »"
        />
      </div>
      <div className="md:col-span-2">
        <Field label="Bio (FR / EN)">
          <LocalizedTextArea rows={4} value={p.bio} onChange={(bio) => setP({ bio })} />
        </Field>
      </div>

      <div className="md:col-span-2">
        <h3 className="mb-3 text-sm font-semibold text-slate-500">Réseaux sociaux</h3>
        <div className="space-y-3">
          {p.socials.map((s, i) => (
            <div key={i} className="grid gap-2 sm:grid-cols-[140px_1fr_1fr_auto]">
              <select
                value={s.platform}
                onChange={(e) => {
                  const socials = [...p.socials];
                  socials[i] = { ...s, platform: e.target.value as SocialPlatform };
                  setP({ socials });
                }}
                className="rounded-lg border border-slate-300 bg-white p-2.5 text-sm dark:border-slate-700 dark:bg-slate-800"
              >
                {PLATFORMS.map((pl) => (
                  <option key={pl} value={pl}>
                    {pl}
                  </option>
                ))}
              </select>
              <TextInput
                value={s.label}
                placeholder="Libellé"
                onChange={(e) => {
                  const socials = [...p.socials];
                  socials[i] = { ...s, label: e.target.value };
                  setP({ socials });
                }}
              />
              <TextInput
                value={s.url}
                placeholder="https://… ou mailto:…"
                onChange={(e) => {
                  const socials = [...p.socials];
                  socials[i] = { ...s, url: e.target.value };
                  setP({ socials });
                }}
              />
              <button
                type="button"
                onClick={() => setP({ socials: p.socials.filter((_, j) => j !== i) })}
                className="rounded-lg border border-slate-300 px-3 text-sm text-red-600 hover:bg-red-50 dark:border-slate-700"
              >
                Suppr.
              </button>
            </div>
          ))}
          <AddButton
            onClick={() =>
              setP({ socials: [...p.socials, { platform: "website", label: "", url: "" }] })
            }
            label="Ajouter un réseau"
          />
        </div>
      </div>
    </div>
  );
}

function SkillsSection({
  content,
  patch,
}: {
  content: SiteContent;
  patch: (p: Partial<SiteContent>) => void;
}) {
  const s = content.skills;
  const cats: { key: keyof SiteContent["skills"]; label: string }[] = [
    { key: "frontend", label: "Frontend & UI" },
    { key: "backend", label: "Backend & API" },
    { key: "database", label: "Base de données" },
    { key: "tools", label: "Outils & DevOps" },
  ];
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {cats.map((c) => (
        <div key={c.key}>
          <h3 className="mb-2 text-sm font-semibold text-slate-500">{c.label}</h3>
          <StringList
            values={s[c.key]}
            placeholder="ex. React.js"
            onChange={(v) => patch({ skills: { ...s, [c.key]: v } })}
          />
        </div>
      ))}
    </div>
  );
}

function ExperienceSection({
  items,
  onChange,
}: {
  items: Experience[];
  onChange: (v: Experience[]) => void;
}) {
  const set = (i: number, part: Partial<Experience>) =>
    onChange(items.map((it, j) => (j === i ? { ...it, ...part } : it)));
  return (
    <div className="space-y-4">
      {items.map((exp, i) => (
        <ListItemCard
          key={i}
          title={exp.role.fr || `Expérience ${i + 1}`}
          onMoveUp={i > 0 ? () => onChange(move(items, i, i - 1)) : undefined}
          onMoveDown={i < items.length - 1 ? () => onChange(move(items, i, i + 1)) : undefined}
          onRemove={() => onChange(items.filter((_, j) => j !== i))}
        >
          <Field label="Entreprise">
            <TextInput value={exp.company} onChange={(e) => set(i, { company: e.target.value })} />
          </Field>
          <Field label="Poste (FR / EN)">
            <LocalizedInput value={exp.role} onChange={(role) => set(i, { role })} />
          </Field>
          <Field label="Période (FR / EN)">
            <LocalizedInput value={exp.period} onChange={(period) => set(i, { period })} />
          </Field>
          <Field label="Description (FR / EN)">
            <LocalizedInput
              value={exp.description}
              onChange={(description) => set(i, { description })}
            />
          </Field>
          <Field label="Réalisations (FR / EN)">
            <LocalizedStringList
              value={exp.achievements}
              onChange={(achievements) => set(i, { achievements })}
            />
          </Field>
          <Field label="Stack">
            <StringList values={exp.stack} onChange={(stack) => set(i, { stack })} />
          </Field>
        </ListItemCard>
      ))}
      <AddButton
        onClick={() =>
          onChange([
            ...items,
            {
              company: "",
              role: { ...emptyL },
              period: { ...emptyL },
              description: { ...emptyL },
              achievements: { fr: [], en: [] },
              stack: [],
            },
          ])
        }
        label="Ajouter une expérience"
      />
    </div>
  );
}

function EducationSection({
  items,
  onChange,
}: {
  items: Education[];
  onChange: (v: Education[]) => void;
}) {
  const set = (i: number, part: Partial<Education>) =>
    onChange(items.map((it, j) => (j === i ? { ...it, ...part } : it)));
  return (
    <div className="space-y-4">
      {items.map((ed, i) => (
        <ListItemCard
          key={i}
          title={ed.degree.fr || `Formation ${i + 1}`}
          onMoveUp={i > 0 ? () => onChange(move(items, i, i - 1)) : undefined}
          onMoveDown={i < items.length - 1 ? () => onChange(move(items, i, i + 1)) : undefined}
          onRemove={() => onChange(items.filter((_, j) => j !== i))}
        >
          <Field label="Diplôme (FR / EN)">
            <LocalizedInput value={ed.degree} onChange={(degree) => set(i, { degree })} />
          </Field>
          <div className="grid gap-3 md:grid-cols-2">
            <Field label="École">
              <TextInput value={ed.school} onChange={(e) => set(i, { school: e.target.value })} />
            </Field>
            <Field label="Année (FR / EN)">
              <LocalizedInput value={ed.year} onChange={(year) => set(i, { year })} />
            </Field>
          </div>
        </ListItemCard>
      ))}
      <AddButton
        onClick={() =>
          onChange([...items, { degree: { ...emptyL }, school: "", year: { ...emptyL } }])
        }
        label="Ajouter une formation"
      />
    </div>
  );
}

function ProjectsSection({
  items,
  onChange,
}: {
  items: Project[];
  onChange: (v: Project[]) => void;
}) {
  const set = (i: number, part: Partial<Project>) =>
    onChange(items.map((it, j) => (j === i ? { ...it, ...part } : it)));
  return (
    <div className="space-y-4">
      {items.map((pr, i) => (
        <ListItemCard
          key={i}
          title={pr.title || `Projet ${i + 1}`}
          onMoveUp={i > 0 ? () => onChange(move(items, i, i - 1)) : undefined}
          onMoveDown={i < items.length - 1 ? () => onChange(move(items, i, i + 1)) : undefined}
          onRemove={() => onChange(items.filter((_, j) => j !== i))}
        >
          <div className="grid gap-3 md:grid-cols-2">
            <Field label="Titre">
              <TextInput value={pr.title} onChange={(e) => set(i, { title: e.target.value })} />
            </Field>
            <Field label="Slug (URL)" hint="lettres minuscules et tirets, ex. mon-projet">
              <TextInput value={pr.slug} onChange={(e) => set(i, { slug: e.target.value })} />
            </Field>
            <Field label="Type">
              <TextInput value={pr.type} onChange={(e) => set(i, { type: e.target.value })} />
            </Field>
            <Field label="Année">
              <TextInput value={pr.year} onChange={(e) => set(i, { year: e.target.value })} />
            </Field>
            <Field label="Lien démo">
              <TextInput value={pr.link} onChange={(e) => set(i, { link: e.target.value })} />
            </Field>
            <Field label="Lien GitHub" hint="laisser vide si dépôt privé">
              <TextInput
                value={pr.github ?? ""}
                onChange={(e) => set(i, { github: e.target.value })}
              />
            </Field>
          </div>
          <Field label="Description courte (FR / EN)">
            <LocalizedInput
              value={pr.description}
              onChange={(description) => set(i, { description })}
            />
          </Field>
          <Field label="Problème (FR / EN)">
            <LocalizedTextArea
              rows={3}
              value={pr.problem}
              onChange={(problem) => set(i, { problem })}
            />
          </Field>
          <Field label="Solution (FR / EN)">
            <LocalizedTextArea
              rows={3}
              value={pr.solution}
              onChange={(solution) => set(i, { solution })}
            />
          </Field>
          <Field label="Résultat (FR / EN)">
            <LocalizedTextArea
              rows={3}
              value={pr.result}
              onChange={(result) => set(i, { result })}
            />
          </Field>
          <Field label="Technologies">
            <StringList values={pr.tech} onChange={(tech) => set(i, { tech })} />
          </Field>
          <Field label="Image de couverture">
            <ImageField value={pr.image} onChange={(image) => set(i, { image })} />
          </Field>
          <Toggle
            checked={pr.featured}
            onChange={(featured) => set(i, { featured })}
            label="Projet mis en avant"
          />
        </ListItemCard>
      ))}
      <AddButton
        onClick={() =>
          onChange([
            ...items,
            {
              slug: "",
              title: "",
              description: { ...emptyL },
              problem: { ...emptyL },
              solution: { ...emptyL },
              result: { ...emptyL },
              tech: [],
              link: "",
              github: null,
              type: "",
              year: "",
              featured: false,
              image: "",
            },
          ])
        }
        label="Ajouter un projet"
      />
    </div>
  );
}

function TestimonialsSection({
  items,
  onChange,
}: {
  items: Testimonial[];
  onChange: (v: Testimonial[]) => void;
}) {
  const set = (i: number, part: Partial<Testimonial>) =>
    onChange(items.map((it, j) => (j === i ? { ...it, ...part } : it)));
  return (
    <div className="space-y-4">
      {items.map((tm, i) => (
        <ListItemCard
          key={i}
          title={tm.author || `Témoignage ${i + 1}`}
          onMoveUp={i > 0 ? () => onChange(move(items, i, i - 1)) : undefined}
          onMoveDown={i < items.length - 1 ? () => onChange(move(items, i, i + 1)) : undefined}
          onRemove={() => onChange(items.filter((_, j) => j !== i))}
        >
          <Field label="Citation (FR / EN)">
            <LocalizedTextArea rows={3} value={tm.quote} onChange={(quote) => set(i, { quote })} />
          </Field>
          <div className="grid gap-3 md:grid-cols-2">
            <Field label="Auteur">
              <TextInput value={tm.author} onChange={(e) => set(i, { author: e.target.value })} />
            </Field>
            <Field label="Rôle / entreprise (FR / EN)">
              <LocalizedInput value={tm.role} onChange={(role) => set(i, { role })} />
            </Field>
          </div>
        </ListItemCard>
      ))}
      <AddButton
        onClick={() =>
          onChange([...items, { quote: { ...emptyL }, author: "", role: { ...emptyL } }])
        }
        label="Ajouter un témoignage"
      />
    </div>
  );
}

function BlogSection({ items, onChange }: { items: Post[]; onChange: (v: Post[]) => void }) {
  const set = (i: number, part: Partial<Post>) =>
    onChange(items.map((it, j) => (j === i ? { ...it, ...part } : it)));
  return (
    <div className="space-y-4">
      {items.map((post, i) => (
        <ListItemCard
          key={i}
          title={post.title.fr || `Article ${i + 1}`}
          onMoveUp={i > 0 ? () => onChange(move(items, i, i - 1)) : undefined}
          onMoveDown={i < items.length - 1 ? () => onChange(move(items, i, i + 1)) : undefined}
          onRemove={() => onChange(items.filter((_, j) => j !== i))}
        >
          <div className="grid gap-3 md:grid-cols-2">
            <Field label="Slug (URL)">
              <TextInput value={post.slug} onChange={(e) => set(i, { slug: e.target.value })} />
            </Field>
            <Field label="Date">
              <TextInput
                type="date"
                value={post.date}
                onChange={(e) => set(i, { date: e.target.value })}
              />
            </Field>
          </div>
          <Field label="Titre (FR / EN)">
            <LocalizedInput value={post.title} onChange={(title) => set(i, { title })} />
          </Field>
          <Field label="Description (FR / EN)">
            <LocalizedInput
              value={post.description}
              onChange={(description) => set(i, { description })}
            />
          </Field>
          <Field label="Tags">
            <StringList values={post.tags} onChange={(tags) => set(i, { tags })} />
          </Field>
          <Field label="Contenu Markdown (FR / EN)" hint="titres ##, listes, blocs de code ```">
            <LocalizedTextArea
              rows={12}
              value={post.content}
              onChange={(content) => set(i, { content })}
            />
          </Field>
          <Toggle
            checked={post.published}
            onChange={(published) => set(i, { published })}
            label="Publié"
          />
        </ListItemCard>
      ))}
      <AddButton
        onClick={() =>
          onChange([
            ...items,
            {
              slug: "",
              title: { ...emptyL },
              description: { ...emptyL },
              date: new Date().toISOString().slice(0, 10),
              tags: [],
              content: { ...emptyL },
              published: false,
            },
          ])
        }
        label="Ajouter un article"
      />
    </div>
  );
}

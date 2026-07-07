/* =====================================================================
   MODÈLE DE CONTENU DU PORTFOLIO (bilingue FR/EN)
   - SiteContent : contenu BRUT stocké en base (textes = { fr, en }).
   - ResolvedContent : contenu RÉSOLU pour une langue (textes = string),
     consommé par les pages publiques.
   - DEFAULT_CONTENT sert de valeur initiale (seed) et de repli.
   ===================================================================== */

import type { Locale } from "@/i18n/config";

/** Texte traduisible : une valeur par langue. */
export type L = { fr: string; en: string };
/** Liste de textes traduisible. */
export type LList = { fr: string[]; en: string[] };

export type SocialPlatform = "github" | "linkedin" | "email" | "twitter" | "website";
export type Social = { platform: SocialPlatform; label: string; url: string };

/* ----- Types BRUTS (bilingues, tels que stockés en base) ----- */
export type Experience = {
  company: string;
  role: L;
  period: L;
  description: L;
  achievements: LList;
  stack: string[];
};
export type Education = { degree: L; school: string; year: L };
export type Project = {
  slug: string;
  title: string;
  description: L;
  problem: L;
  solution: L;
  result: L;
  tech: string[];
  link: string;
  github: string | null;
  type: string;
  year: string;
  featured: boolean;
  image: string;
};
export type Testimonial = { quote: L; author: string; role: L; avatar?: string };
export type Post = {
  slug: string;
  title: L;
  description: L;
  date: string;
  tags: string[];
  content: L;
  published: boolean;
};

export type SiteContent = {
  site: { url: string; twitterHandle: string };
  personal: {
    name: string;
    role: L;
    age: number;
    location: L;
    available: boolean;
    bio: L;
    email: string;
    phone: string;
    cvUrl: string;
    socials: Social[];
  };
  skills: { frontend: string[]; backend: string[]; database: string[]; tools: string[] };
  experience: Experience[];
  education: Education[];
  projects: Project[];
  testimonials: Testimonial[];
  posts: Post[];
};

/* ----- Types RÉSOLUS (une langue, textes = string) ----- */
export type ResolvedExperience = {
  company: string;
  role: string;
  period: string;
  description: string;
  achievements: string[];
  stack: string[];
};
export type ResolvedEducation = { degree: string; school: string; year: string };
export type ResolvedProject = {
  slug: string;
  title: string;
  description: string;
  problem: string;
  solution: string;
  result: string;
  tech: string[];
  link: string;
  github: string | null;
  type: string;
  year: string;
  featured: boolean;
  image: string;
};
export type ResolvedTestimonial = { quote: string; author: string; role: string; avatar?: string };
export type ResolvedPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  content: string;
  published: boolean;
};
export type ResolvedContent = {
  site: { url: string; twitterHandle: string };
  personal: {
    name: string;
    role: string;
    age: number;
    location: string;
    available: boolean;
    bio: string;
    email: string;
    phone: string;
    cvUrl: string;
    socials: Social[];
  };
  skills: { frontend: string[]; backend: string[]; database: string[]; tools: string[] };
  experience: ResolvedExperience[];
  education: ResolvedEducation[];
  projects: ResolvedProject[];
  testimonials: ResolvedTestimonial[];
  posts: ResolvedPost[];
};

/* ----- Helpers de résolution ----- */
function pick(v: L | undefined, locale: Locale): string {
  if (!v) return "";
  return v[locale] ?? v.fr ?? "";
}
function pickList(v: LList | undefined, locale: Locale): string[] {
  if (!v) return [];
  return v[locale] ?? v.fr ?? [];
}

/** Convertit le contenu bilingue brut en contenu d'une seule langue. */
export function resolveContent(c: SiteContent, locale: Locale): ResolvedContent {
  return {
    site: c.site,
    personal: {
      ...c.personal,
      role: pick(c.personal.role, locale),
      location: pick(c.personal.location, locale),
      bio: pick(c.personal.bio, locale),
    },
    skills: c.skills,
    experience: c.experience.map((e) => ({
      company: e.company,
      role: pick(e.role, locale),
      period: pick(e.period, locale),
      description: pick(e.description, locale),
      achievements: pickList(e.achievements, locale),
      stack: e.stack,
    })),
    education: c.education.map((ed) => ({
      degree: pick(ed.degree, locale),
      school: ed.school,
      year: pick(ed.year, locale),
    })),
    projects: c.projects.map((p) => ({
      slug: p.slug,
      title: p.title,
      description: pick(p.description, locale),
      problem: pick(p.problem, locale),
      solution: pick(p.solution, locale),
      result: pick(p.result, locale),
      tech: p.tech,
      link: p.link,
      github: p.github,
      type: p.type,
      year: p.year,
      featured: p.featured,
      image: p.image,
    })),
    testimonials: c.testimonials.map((t) => ({
      quote: pick(t.quote, locale),
      author: t.author,
      role: pick(t.role, locale),
      avatar: t.avatar,
    })),
    posts: c.posts.map((po) => ({
      slug: po.slug,
      title: pick(po.title, locale),
      description: pick(po.description, locale),
      date: po.date,
      tags: po.tags,
      content: pick(po.content, locale),
      published: po.published,
    })),
  };
}

/* ----- Normalisation : migre l'ancien format (texte simple) vers { fr, en } ----- */
function toL(v: unknown): L {
  if (v && typeof v === "object" && "fr" in v) {
    const o = v as { fr?: string; en?: string };
    return { fr: o.fr ?? "", en: o.en ?? o.fr ?? "" };
  }
  if (typeof v === "string") return { fr: v, en: v };
  return { fr: "", en: "" };
}
function toLList(v: unknown): LList {
  if (v && typeof v === "object" && !Array.isArray(v) && "fr" in v) {
    const o = v as { fr?: string[]; en?: string[] };
    return { fr: o.fr ?? [], en: o.en ?? o.fr ?? [] };
  }
  if (Array.isArray(v)) return { fr: v as string[], en: v as string[] };
  return { fr: [], en: [] };
}

/**
 * Garantit que le contenu lu en base respecte le schéma bilingue,
 * même s'il a été enregistré dans l'ancien format mono-langue.
 */
export function normalizeContent(raw: SiteContent): SiteContent {
  return {
    site: raw.site ?? DEFAULT_CONTENT.site,
    personal: {
      ...DEFAULT_CONTENT.personal,
      ...raw.personal,
      role: toL(raw.personal?.role),
      location: toL(raw.personal?.location),
      bio: toL(raw.personal?.bio),
    },
    skills: raw.skills ?? DEFAULT_CONTENT.skills,
    experience: (raw.experience ?? []).map((e) => ({
      company: e.company ?? "",
      role: toL(e.role),
      period: toL(e.period),
      description: toL(e.description),
      achievements: toLList(e.achievements),
      stack: e.stack ?? [],
    })),
    education: (raw.education ?? []).map((ed) => ({
      degree: toL(ed.degree),
      school: ed.school ?? "",
      year: toL(ed.year),
    })),
    projects: (raw.projects ?? []).map((p) => ({
      slug: p.slug ?? "",
      title: p.title ?? "",
      description: toL(p.description),
      problem: toL(p.problem),
      solution: toL(p.solution),
      result: toL(p.result),
      tech: p.tech ?? [],
      link: p.link ?? "",
      github: p.github ?? null,
      type: p.type ?? "",
      year: p.year ?? "",
      featured: Boolean(p.featured),
      image: p.image ?? "",
    })),
    testimonials: (raw.testimonials ?? []).map((t) => ({
      quote: toL(t.quote),
      author: t.author ?? "",
      role: toL(t.role),
      avatar: t.avatar,
    })),
    posts: (raw.posts ?? []).map((po) => ({
      slug: po.slug ?? "",
      title: toL(po.title),
      description: toL(po.description),
      date: po.date ?? "1970-01-01",
      tags: po.tags ?? [],
      content: toL(po.content),
      published: Boolean(po.published),
    })),
  };
}

/* ----- Contenu par défaut (bilingue) ----- */
const l = (fr: string, en: string): L => ({ fr, en });

export const DEFAULT_CONTENT: SiteContent = {
  site: { url: "https://my-portfolio-tau-three-56.vercel.app", twitterHandle: "" },
  personal: {
    name: "Sio Romuald Quenum",
    role: l("Développeur Web Fullstack", "Fullstack Web Developer"),
    age: 24,
    location: l("Abidjan, Côte d'Ivoire", "Abidjan, Ivory Coast"),
    available: true,
    bio: l(
      "Passionné par la création d'architectures web robustes. Je navigue avec aisance entre le frontend interactif (React) et le backend structuré (Laravel/Node). Autonome et curieux, je transforme des besoins complexes en solutions digitales élégantes.",
      "Passionate about building robust web architectures. I move easily between interactive frontends (React) and structured backends (Laravel/Node). Autonomous and curious, I turn complex needs into elegant digital solutions.",
    ),
    email: "sioquenum75@gmail.com",
    phone: "+225 0173501445 / +225 0779162986",
    cvUrl: "/cv.pdf",
    socials: [
      { platform: "github", label: "GitHub", url: "https://github.com/Quenum19" },
      {
        platform: "linkedin",
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/quenum-sio-267122290",
      },
      { platform: "email", label: "Email", url: "mailto:sioquenum75@gmail.com" },
    ],
  },
  skills: {
    frontend: ["React.js", "Tailwind CSS", "JavaScript (ES6+)", "HTML5/CSS3", "Bootstrap"],
    backend: ["Laravel", "PHP", "Node.js", "Express.js"],
    database: ["MySQL", "MongoDB"],
    tools: ["Git & GitHub", "Postman", "VS Code", "Photoshop", "Canva"],
  },
  experience: [
    {
      company: "Markel Technologie",
      role: l("Stagiaire Assistant Développeur Web", "Junior Web Developer (Intern)"),
      period: l("Sept 2022 – Juin 2024", "Sept 2022 – June 2024"),
      description: l(
        "Développement et maintenance d'applications web PHP/Laravel.",
        "Development and maintenance of PHP/Laravel web applications.",
      ),
      achievements: {
        fr: [
          "Développement et maintenance d'applications web PHP/Laravel.",
          "Conception de bases de données MySQL adaptées aux projets.",
          "Contribution à l'architecture technique et au choix des solutions.",
          "Tests fonctionnels et correction d'anomalies avant mise en production.",
          "Méthodologie Agile/Scrum et accompagnement des nouveaux stagiaires.",
          "Gestion de contenu e-learning et contribution au projet Recrulink.",
        ],
        en: [
          "Built and maintained PHP/Laravel web applications.",
          "Designed MySQL databases tailored to project needs.",
          "Contributed to technical architecture and solution choices.",
          "Ran functional tests and fixed bugs before production releases.",
          "Worked in Agile/Scrum and mentored new interns.",
          "Managed e-learning content and contributed to the Recrulink project.",
        ],
      },
      stack: ["PHP", "Laravel", "MySQL", "Git"],
    },
    {
      company: "Markel Technologie",
      role: l("Stagiaire Développeur d'Applications", "Application Developer (Intern)"),
      period: l("Nov 2021 – Avril 2022", "Nov 2021 – April 2022"),
      description: l(
        "Développement mobile multiplateforme et maintenance web.",
        "Cross-platform mobile development and web maintenance.",
      ),
      achievements: {
        fr: [
          "Développement d'une application mobile multiplateforme avec Ionic.",
          "Maintenance corrective et évolutive de sites web existants.",
          "Optimisation de l'expérience utilisateur (UX/UI).",
        ],
        en: [
          "Developed a cross-platform mobile app with Ionic.",
          "Corrective and evolutive maintenance of existing websites.",
          "Improved user experience (UX/UI).",
        ],
      },
      stack: ["Ionic", "JavaScript", "CSS"],
    },
  ],
  education: [
    {
      degree: l(
        "Certificat de Qualification Professionnelle (CQP)",
        "Professional Qualification Certificate (CQP)",
      ),
      school: "Projet E2C_TIC, Abidjan",
      year: l("Août 2024 – Déc. 2025", "Aug 2024 – Dec 2025"),
    },
    {
      degree: l(
        "Certificat Bootcamp Développeur de Logiciels",
        "Software Developer Bootcamp Certificate",
      ),
      school: "GOMYCODE, Abidjan",
      year: l("Nov 2024 – Juin 2025", "Nov 2024 – June 2025"),
    },
    {
      degree: l(
        "Licence Professionnelle Génie Logiciel",
        "Professional Bachelor's in Software Engineering",
      ),
      school: "HEC La Roche, Abidjan",
      year: l("2023 – 2024", "2023 – 2024"),
    },
    {
      degree: l(
        "BTS Développeur d'Applications",
        "Higher Technician Diploma — Application Developer",
      ),
      school: "EST Groupe Loko, Abidjan",
      year: l("2019 – 2021", "2019 – 2021"),
    },
    {
      degree: l("Baccalauréat série D", "High School Diploma (Science, Series D)"),
      school: "Lycée Moderne 1, Bouaflé",
      year: l("2018 – 2019", "2018 – 2019"),
    },
  ],
  projects: [
    {
      slug: "icare-elearning",
      title: "ICARE E-Learning",
      description: l(
        "Plateforme complète de cours en ligne. Gestion des étudiants, cours vidéos et quizz.",
        "Complete online learning platform. Student management, video courses and quizzes.",
      ),
      problem: l(
        "Le centre de formation avait besoin de digitaliser ses cours et de suivre la progression de centaines d'étudiants, sans solution centralisée.",
        "The training center needed to digitize its courses and track the progress of hundreds of students, without a centralized solution.",
      ),
      solution: l(
        "Conception d'une plateforme Laravel/MySQL : gestion des inscriptions, diffusion de cours vidéo, quizz auto-évalués et tableau de bord administrateur, déployée sur un VPS.",
        "Designed a Laravel/MySQL platform: enrollment management, video course delivery, self-graded quizzes and an admin dashboard, deployed on a VPS.",
      ),
      result: l(
        "Centralisation de la formation, suivi des étudiants automatisé et réduction du travail administratif manuel.",
        "Centralized training, automated student tracking and reduced manual administrative work.",
      ),
      tech: ["Laravel", "MySQL", "Bootstrap", "VPS"],
      link: "https://e-learning.icare-formations.com/",
      github: null,
      type: "Fullstack",
      year: "2023",
      featured: true,
      image: "/projects/icare.svg",
    },
    {
      slug: "new-wine-churches",
      title: "New Wine Churches",
      description: l(
        "Site vitrine et gestion pour une organisation religieuse. Architecture MVC robuste.",
        "Showcase website and management tool for a religious organization. Robust MVC architecture.",
      ),
      problem: l(
        "L'organisation n'avait pas de présence en ligne ni d'outil pour gérer ses contenus et ses événements.",
        "The organization had no online presence nor a tool to manage its content and events.",
      ),
      solution: l(
        "Développement d'un site vitrine Laravel avec back-office de gestion de contenu, sur une architecture MVC claire et un hébergement mutualisé.",
        "Built a Laravel showcase website with a content-management back office, on a clean MVC architecture and shared hosting.",
      ),
      result: l(
        "Présence en ligne professionnelle et autonomie de l'équipe pour publier ses contenus.",
        "Professional online presence and team autonomy to publish content.",
      ),
      tech: ["Laravel", "MySQL", "Shared Hosting"],
      link: "https://newwinechurches.com",
      github: null,
      type: "Fullstack",
      year: "2023",
      featured: true,
      image: "/projects/newwine.svg",
    },
    {
      slug: "super-todo-list",
      title: "Super ToDo List",
      description: l(
        "Application de gestion de tâches avec authentification. Projet d'apprentissage MERN Stack.",
        "Task management app with authentication. A MERN Stack learning project.",
      ),
      problem: l(
        "Mettre en pratique la stack MERN de bout en bout avec une vraie authentification.",
        "Practice the MERN stack end to end with real authentication.",
      ),
      solution: l(
        "Application full MERN (MongoDB, Express, React, Node) avec authentification, CRUD de tâches et déploiement sur Render.",
        "Full MERN app (MongoDB, Express, React, Node) with authentication, task CRUD and deployment on Render.",
      ),
      result: l(
        "Maîtrise concrète de la stack JavaScript fullstack et du cycle de déploiement cloud.",
        "Hands-on mastery of the fullstack JavaScript stack and the cloud deployment cycle.",
      ),
      tech: ["React", "Node.js", "Express", "MongoDB", "Render"],
      link: "https://mon-todo-mern-app-client.onrender.com/login",
      github: null,
      type: "MERN Stack",
      year: "2024",
      featured: false,
      image: "/projects/todo.svg",
    },
  ],
  testimonials: [],
  posts: [
    {
      slug: "bien-demarrer-nextjs-16",
      title: l(
        "Bien démarrer avec Next.js 16 et l'App Router",
        "Getting started with Next.js 16 and the App Router",
      ),
      description: l(
        "Mes notes pour structurer proprement une application Next.js moderne : App Router, Server Components et Tailwind v4.",
        "My notes for cleanly structuring a modern Next.js app: App Router, Server Components and Tailwind v4.",
      ),
      date: "2026-06-10",
      tags: ["Next.js", "React", "Tailwind"],
      published: true,
      content: l(
        `> ✏️ **Article d'exemple** — modifie ou remplace ce contenu depuis l'admin.

Next.js 16 pousse encore plus loin l'architecture **App Router** et les **Server Components**.

## 1. Server Components par défaut

\`\`\`tsx
export default function Page() {
  return <h1>Bonjour 👋</h1>;
}
\`\`\`

À toi de jouer : écris ton premier vrai article depuis le tableau de bord !`,
        `> ✏️ **Example article** — edit or replace this content from the admin.

Next.js 16 pushes the **App Router** and **Server Components** architecture even further.

## 1. Server Components by default

\`\`\`tsx
export default function Page() {
  return <h1>Hello 👋</h1>;
}
\`\`\`

Your turn: write your first real article from the dashboard!`,
      ),
    },
  ],
};

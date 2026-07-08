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
      slug: "new-wine-church-platform",
      title: "New Wine Church — Plateforme",
      description: l(
        "Plateforme fullstack bilingue pour une église : gestion des membres, billetterie avec QR code, live streaming, blog, sermons, et back-office multi-rôles. Pensée pour scaler.",
        "Bilingual fullstack platform for a church: member management, ticketing with QR codes, live streaming, blog, sermons, and multi-role admin back office. Built to scale.",
      ),
      problem: l(
        "L'église gérait ses membres sur Excel, ses inscriptions événements par WhatsApp et n'avait aucun outil pour ses lives, sa billetterie ou son blog. La communication FR/EN était impossible à maintenir. Aucun back-office métier n'existait pour distinguer pasteur, gouverneur, chef de cellule et secrétaire.",
        "The church tracked members in Excel, handled event signups over WhatsApp, and had no tool for live streaming, ticketing, or blogging. Bilingual FR/EN communication was unmanageable. No dedicated back office existed to separate pastor, governor, cell-leader, and secretary responsibilities.",
      ),
      solution: l(
        "Application fullstack Laravel 13 + React 19 avec 8 rôles hiérarchiques, billetterie complète (QR scan, liste d'attente, paiement Mobile Money & CinetPay), live streaming Agora, blog Tiptap, gestion sermons avec séries, notifications WhatsApp Meta et médias auto-catégorisés. Interface bilingue FR/EN dynamique sur tout le contenu (champs `_en` + fallback intelligent). Architecture prête pour des millions de visiteurs (queue jobs, cache, rate limiting, audit trail).",
        "Fullstack Laravel 13 + React 19 application with 8 hierarchical roles, full ticketing (QR scan, waitlist, Mobile Money & CinetPay payments), Agora live streaming, Tiptap blog, sermon management with series, WhatsApp Meta notifications, and auto-categorized media. Dynamic FR/EN bilingual interface across all content (`_en` fields + smart fallback). Architecture ready for millions of visitors (queue jobs, caching, rate limiting, audit trail).",
      ),
      result: l(
        "Plateforme production en 8 phases + refonte livrée. L'équipe pastorale est autonome sur tout le cycle de vie du contenu, la billetterie remplace WhatsApp, et le site est SEO-ready dans les deux langues.",
        "Production platform delivered across 8 phases plus a full redesign. The pastoral team owns the full content lifecycle, ticketing replaced WhatsApp, and the site is SEO-ready in both languages.",
      ),
      tech: [
        "Laravel 13",
        "React 19",
        "Vite 8",
        "MySQL 8",
        "Tailwind CSS 4",
        "Sanctum",
        "Spatie Permissions",
        "Tiptap",
        "Agora RTC",
        "CinetPay",
        "WhatsApp Meta API",
        "DomPDF",
      ],
      link: "https://newwinechurch.ci",
      github: null,
      type: "Fullstack SaaS",
      year: "2026",
      featured: true,
      image: "/projects/nwc-platform.svg",
    },
    {
      slug: "panora",
      title: "Panora",
      description: l(
        "Plateforme SaaS de gestion complète pour régie d'affichage OOH en Côte d'Ivoire. Admin web + espace tech mobile PWA.",
        "End-to-end SaaS platform for an Out-Of-Home advertising agency in Ivory Coast. Web admin + mobile PWA for field technicians.",
      ),
      problem: l(
        "La régie gérait 337 panneaux publicitaires répartis sur 31 communes avec des fichiers Excel et du papier. Facturation manuelle sujette à erreurs, aucune visibilité temps réel sur l'activité terrain, calculs de taxes communales dispersés, coordination WhatsApp désorganisée.",
        "The agency managed 337 billboards across 31 municipalities using Excel and paper. Manual invoicing prone to errors, no real-time field visibility, scattered municipal-tax calculations, disorganized WhatsApp coordination.",
      ),
      solution: l(
        "Plateforme complète Laravel 12 : dashboard direction avec KPIs live, module campagnes avec facturation FNE conforme, espace technicien PWA géolocalisé (Y aller / Arrivé / Photo), pilotage terrain temps réel, rapports Excel/PDF harmonisés, notifications WhatsApp Twilio, système de signalements terrain, gestion taxes par commune avec snapshots à la date.",
        "Full Laravel 12 platform: executive dashboard with live KPIs, campaigns module with FNE-compliant invoicing, geo-tracked technician PWA (En route / Arrived / Photo), real-time field control tower, unified Excel/PDF reports, WhatsApp/Twilio notifications, field incident workflow, per-municipality tax management with dated snapshots.",
      ),
      result: l(
        "Temps de facturation divisé par 5. Visibilité live sur les équipes terrain (chrono par pose, statuts, retards). Réduction des litiges client grâce à l'audit trail. Rapports comptables en 1 clic. Coordination WhatsApp automatisée. Adopté par toute l'équipe.",
        "Invoicing time cut by 5x. Live visibility on field teams (per-installation chrono, statuses, delays). Client disputes reduced thanks to audit trail. Accounting reports in 1 click. Automated WhatsApp coordination. Adopted by the entire team.",
      ),
      tech: [
        "Laravel 12",
        "PHP 8.3",
        "MySQL",
        "Blade",
        "JavaScript ESM",
        "PWA / Service Worker",
        "Twilio (WhatsApp Business)",
        "DomPDF",
        "Maatwebsite Excel",
        "Chart.js",
        "Alpine.js",
        "Select2",
      ],
      link: "https://dev.panora-cible.com",
      github: null,
      type: "SaaS Fullstack",
      year: "2026",
      featured: true,
      image: "/projects/panora.svg",
    },
    {
      slug: "capi-sante",
      title: "Capi Sante",
      description: l(
        "SaaS multi-cabinet de kinésithérapie pour l'Afrique francophone : marketplace, agenda, bilans HAS-compliant, IA, paiement Mobile Money.",
        "Multi-practice kinesitherapy SaaS for French-speaking Africa: marketplace, agenda, HAS-compliant assessments, AI, Mobile Money payment.",
      ),
      problem: l(
        "Les cabinets de kiné en Côte d'Ivoire n'ont pas d'outil moderne pour gérer patients, bilans et rendez-vous. Les patients peinent à trouver un praticien qualifié et à réserver en ligne. Aucune conformité RGPD/HDS dans les solutions existantes.",
        "Kinesitherapy practices in Cote d'Ivoire lack modern tools to manage patients, assessments and appointments. Patients struggle to find qualified therapists and book online. Existing solutions have no GDPR/HDS compliance.",
      ),
      solution: l(
        "Plateforme SaaS multi-tenant end-to-end : marketplace publique vérifiée, agenda + réservation en ligne (guest booking + magic link), bilans dynamiques à moteur JSON avec 9 templates cliniques (échelles Held/Ashworth/Barthel/CIF), assistant IA Claude pour rédaction, protocoles multi-phases reliés à une bibliothèque de 28 catégories d'exercices, PWA patient offline-first, notifications push VAPID, paiements Mobile Money (CinetPay) + Stripe, vérification légale (RCCM, agrément Ordre kiné, diplôme), consentement RGPD explicite, audit trail patient. Multi-cabinet propre (un kiné dans N cabinets), gouvernance owner/admin/practitioner, analytics BI.",
        "End-to-end multi-tenant SaaS platform: verified public marketplace, online agenda + booking (guest booking + magic link), JSON-schema dynamic assessments with 9 clinical templates (Held/Ashworth/Barthel/ICF scales), Claude AI writing assistant, multi-phase protocols linked to a 28-category exercise library, offline-first patient PWA, VAPID push notifications, Mobile Money (CinetPay) + Stripe payments, legal verification (business registration, therapist board, diploma), explicit GDPR consent, patient audit trail. Clean multi-practice model (one therapist across N practices), owner/admin/practitioner governance, BI analytics.",
      ),
      result: l(
        "Plateforme prête pour pilote client : 20+ sprints livrés en 3 mois, tunnel de conversion Google → RDV complet, gouvernance légale intégrée, 204 tests automatisés verts (955 assertions), zéro régression cross-sprints. Déploiement continu sur Neon + Render + Cloudflare R2 via GitHub Actions.",
        "Platform ready for client pilot: 20+ sprints delivered in 3 months, complete Google → appointment conversion funnel, integrated legal governance, 204 automated tests green (955 assertions), zero cross-sprint regressions. Continuous deployment on Neon + Render + Cloudflare R2 via GitHub Actions.",
      ),
      tech: [
        "Laravel 11",
        "PHP 8.3",
        "PostgreSQL (Neon)",
        "Inertia.js",
        "Vue 3",
        "Tailwind CSS",
        "PWA (Workbox)",
        "Chart.js",
        "Cloudflare R2",
        "Resend",
        "Claude API",
        "CinetPay",
        "Stripe",
        "Docker",
        "Render",
        "GitHub Actions",
      ],
      link: "https://capi-sante.onrender.com",
      github: null,
      type: "Fullstack",
      year: "2026",
      featured: true,
      image: "/projects/capi-sante.svg",
    },
    {
      slug: "icare-elearning",
      title: "ICARE E-Learning",
      description: l(
        "Contribution, en équipe, au développement d'une plateforme e-learning pour un centre de formation. Gestion des étudiants, cours vidéo et quizz.",
        "Team contribution to the development of an e-learning platform for a training center. Student management, video courses and quizzes.",
      ),
      problem: l(
        "Le centre de formation avait besoin de digitaliser ses cours et de suivre la progression de centaines d'étudiants, sans solution centralisée.",
        "The training center needed to digitize its courses and track the progress of hundreds of students, without a centralized solution.",
      ),
      solution: l(
        "Contribution au développement d'une plateforme Laravel/MySQL au sein de l'équipe : gestion des inscriptions, diffusion de cours vidéo, quizz auto-évalués et tableau de bord administrateur, déployée sur un VPS.",
        "Contributed, as part of the team, to a Laravel/MySQL platform: enrollment management, video course delivery, self-graded quizzes and an admin dashboard, deployed on a VPS.",
      ),
      result: l(
        "Projet d'entreprise livré en équipe : formation centralisée, suivi des étudiants automatisé et travail administratif réduit.",
        "Company project delivered as a team: centralized training, automated student tracking and reduced administrative work.",
      ),
      tech: ["Laravel", "MySQL", "Bootstrap", "VPS"],
      link: "https://e-learning.icare-formations.com/",
      github: null,
      type: "Fullstack (équipe)",
      year: "2023",
      featured: false,
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

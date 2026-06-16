/* =====================================================================
   MODÈLE DE CONTENU DU PORTFOLIO
   Tout le contenu éditable du site (géré via /admin et stocké en base).
   DEFAULT_CONTENT sert de valeur initiale (seed) et de repli si la base
   n'est pas disponible.
   ===================================================================== */

export type SocialPlatform = "github" | "linkedin" | "email" | "twitter" | "website";

export type Social = {
  platform: SocialPlatform;
  label: string;
  url: string;
};

export type Experience = {
  company: string;
  role: string;
  period: string;
  description: string;
  achievements: string[];
  stack: string[];
};

export type Education = {
  degree: string;
  school: string;
  year: string;
};

export type Project = {
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

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  avatar?: string;
};

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  tags: string[];
  content: string; // Markdown / MDX
  published: boolean;
};

export type SiteContent = {
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
  skills: {
    frontend: string[];
    backend: string[];
    database: string[];
    tools: string[];
  };
  experience: Experience[];
  education: Education[];
  projects: Project[];
  testimonials: Testimonial[];
  posts: Post[];
};

export const DEFAULT_CONTENT: SiteContent = {
  site: {
    url: "https://my-portfolio-tau-three-56.vercel.app",
    twitterHandle: "",
  },
  personal: {
    name: "Sio Romuald Quenum",
    role: "Développeur Web Fullstack",
    age: 24,
    location: "Abidjan, Côte d'Ivoire",
    available: true,
    bio: "Passionné par la création d'architectures web robustes. Je navigue avec aisance entre le frontend interactif (React) et le backend structuré (Laravel/Node). Autonome et curieux, je transforme des besoins complexes en solutions digitales élégantes.",
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
      role: "Stagiaire Assistant Développeur Web",
      period: "Sept 2022 – Juin 2024",
      description: "Développement et maintenance d'applications web dynamiques.",
      achievements: [
        "Contribution au développement Fullstack PHP/Laravel.",
        "Conception de bases de données MySQL complexes.",
        "Participation active aux rituels Agile/Scrum.",
        "Mentoring des nouveaux stagiaires sur les bonnes pratiques.",
        "Gestion de contenu E-learning et maintenance du projet Recrulink.",
      ],
      stack: ["PHP", "Laravel", "MySQL", "Git"],
    },
    {
      company: "Markel Technologie",
      role: "Stagiaire Développeur d'Applications",
      period: "Nov 2021 – Avril 2022",
      description: "Développement mobile et maintenance web.",
      achievements: [
        "Développement d'application mobile multiplateforme avec Ionic.",
        "Maintenance corrective et évolutive de sites web existants.",
        "Optimisation UX/UI.",
      ],
      stack: ["Ionic", "JavaScript", "CSS"],
    },
  ],
  education: [
    {
      degree: "Certificat Bootcamp Développeur de Logiciels",
      school: "GOMYCODE, Abidjan",
      year: "Nov 2024 – Juin 2025",
    },
    {
      degree: "Licence Professionnelle Génie Logiciel",
      school: "HEC La Roche, Abidjan",
      year: "2023 – 2024",
    },
    {
      degree: "BTS Développeur d'Applications",
      school: "EST Groupe Loko, Abidjan",
      year: "2019 – 2021",
    },
  ],
  projects: [
    {
      slug: "icare-elearning",
      title: "ICARE E-Learning",
      description:
        "Plateforme complète de cours en ligne. Gestion des étudiants, cours vidéos et quizz.",
      problem:
        "Le centre de formation avait besoin de digitaliser ses cours et de suivre la progression de centaines d'étudiants, sans solution centralisée.",
      solution:
        "Conception d'une plateforme Laravel/MySQL : gestion des inscriptions, diffusion de cours vidéo, quizz auto-évalués et tableau de bord administrateur, déployée sur un VPS.",
      result:
        "Centralisation de la formation, suivi des étudiants automatisé et réduction du travail administratif manuel.",
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
      description:
        "Site vitrine et gestion pour une organisation religieuse. Architecture MVC robuste.",
      problem:
        "L'organisation n'avait pas de présence en ligne ni d'outil pour gérer ses contenus et ses événements.",
      solution:
        "Développement d'un site vitrine Laravel avec back-office de gestion de contenu, sur une architecture MVC claire et un hébergement mutualisé.",
      result:
        "Présence en ligne professionnelle et autonomie de l'équipe pour publier ses contenus.",
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
      description:
        "Application de gestion de tâches avec authentification. Projet d'apprentissage MERN Stack.",
      problem: "Mettre en pratique la stack MERN de bout en bout avec une vraie authentification.",
      solution:
        "Application full MERN (MongoDB, Express, React, Node) avec authentification, CRUD de tâches et déploiement sur Render.",
      result:
        "Maîtrise concrète de la stack JavaScript fullstack et du cycle de déploiement cloud.",
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
      title: "Bien démarrer avec Next.js 16 et l'App Router",
      description:
        "Mes notes pour structurer proprement une application Next.js moderne : App Router, Server Components et Tailwind v4.",
      date: "2026-06-10",
      tags: ["Next.js", "React", "Tailwind"],
      published: true,
      content: `> ✏️ **Article d'exemple** — modifie ou remplace ce contenu depuis l'admin.

Next.js 16 pousse encore plus loin l'architecture **App Router** et les **Server Components**.

## 1. Server Components par défaut

Tout composant est un Server Component tant qu'on n'ajoute pas \`"use client"\`.

\`\`\`tsx
export default function Page() {
  return <h1>Bonjour 👋</h1>;
}
\`\`\`

## 2. Tailwind v4 : la config dans le CSS

\`\`\`css
@theme {
  --color-primary-500: #0ea5e9;
}
\`\`\`

À toi de jouer : écris ton premier vrai article depuis le tableau de bord !`,
    },
  ],
};

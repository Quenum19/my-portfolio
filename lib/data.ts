import { Github, Linkedin, Mail, type LucideIcon } from "lucide-react";

/* =====================================================================
   CONFIG UNIQUE DU PORTFOLIO
   ---------------------------------------------------------------------
   Source de vérité de tout le contenu. Les valeurs marquées « TODO: »
   sont à remplacer par tes vraies informations. Le reste est déjà rempli.
   (Les textes d'interface — titres de sections, boutons — sont gérés
    séparément par l'i18n dans /messages.)
   ===================================================================== */

/* ---------------------------------------------------------------------
   1. SITE — métadonnées globales (SEO, URL de prod, analytics)
   --------------------------------------------------------------------- */
export const SITE = {
  // TODO: URL finale de déploiement (sert au SEO, sitemap, OG image)
  url: "https://ton-domaine.dev",
  // TODO: @ Twitter/X sans le @ (laisser "" si aucun)
  twitterHandle: "",
  defaultLocale: "fr" as const,
  locales: ["fr", "en"] as const,
};

/* ---------------------------------------------------------------------
   2. INFOS PERSONNELLES
   --------------------------------------------------------------------- */
export const DATA = {
  personal: {
    name: "Ton Prénom", // TODO: ton vrai prénom + nom
    role: "Développeur Web Fullstack",
    age: 24, // TODO: vérifier
    location: "Abidjan, Côte d'Ivoire",
    available: true, // affiche le badge « Disponible »
    bio: "Passionné par la création d'architectures web robustes. Je navigue avec aisance entre le frontend interactif (React) et le backend structuré (Laravel/Node). Autonome et curieux, je transforme des besoins complexes en solutions digitales élégantes.",
    email: "ton.email@example.com", // TODO: ton vrai email
    phone: "", // TODO: optionnel, ex. "+225 07 00 00 00 00" (laisser "" pour masquer)
    // TODO: dépose ton CV en PDF dans public/ et ajuste le chemin (laisser "" pour masquer le bouton)
    cvUrl: "/cv.pdf",
    socials: [
      // TODO: remplace les URL par tes vrais profils
      { name: "GitHub", url: "https://github.com/tonprofil", icon: Github as LucideIcon },
      { name: "LinkedIn", url: "https://linkedin.com/in/tonprofil", icon: Linkedin as LucideIcon },
      { name: "Email", url: "mailto:ton.email@example.com", icon: Mail as LucideIcon }, // TODO: même email que ci-dessus
    ],
  },

  /* -------------------------------------------------------------------
     3. COMPÉTENCES
     ------------------------------------------------------------------- */
  skills: {
    frontend: ["React.js", "Tailwind CSS", "JavaScript (ES6+)", "HTML5/CSS3", "Bootstrap"],
    backend: ["Laravel", "PHP", "Node.js", "Express.js"],
    database: ["MySQL", "MongoDB"],
    tools: ["Git & GitHub", "Postman", "VS Code", "Photoshop", "Canva"],
  },

  /* -------------------------------------------------------------------
     4. EXPÉRIENCE
     ------------------------------------------------------------------- */
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

  /* -------------------------------------------------------------------
     5. FORMATION
     ------------------------------------------------------------------- */
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

  /* -------------------------------------------------------------------
     6. PROJETS (façon « case study »)
     Chaque projet a une page de détail : /projets/<slug>
     - problem / solution / result : storytelling pour la page détail
     - image : visuel de couverture dans public/projects/ (placeholder fourni)
     ------------------------------------------------------------------- */
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
      github: null, // null = dépôt privé (le bouton « Code » est masqué)
      type: "Fullstack",
      year: "2023",
      featured: true,
      image: "/projects/icare.svg", // TODO: remplacer par un vrai visuel (.jpg/.png/.webp)
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
      image: "/projects/newwine.svg", // TODO: remplacer par un vrai visuel
    },
    {
      slug: "super-todo-list",
      title: "Super ToDo List",
      description:
        "Application de gestion de tâches avec authentification. Projet d'apprentissage MERN Stack.",
      problem:
        "Mettre en pratique la stack MERN de bout en bout avec une vraie authentification.",
      solution:
        "Application full MERN (MongoDB, Express, React, Node) avec authentification, CRUD de tâches et déploiement sur Render.",
      result:
        "Maîtrise concrète de la stack JavaScript fullstack et du cycle de déploiement cloud.",
      tech: ["React", "Node.js", "Express", "MongoDB", "Render"],
      link: "https://mon-todo-mern-app-client.onrender.com/login",
      github: "https://github.com/tonprofil/todo-mern", // TODO: vrai lien du dépôt (ou null si privé)
      type: "MERN Stack",
      year: "2024",
      featured: false,
      image: "/projects/todo.svg", // TODO: remplacer par un vrai visuel
    },
  ],

  /* -------------------------------------------------------------------
     7. TÉMOIGNAGES (optionnel — laisser le tableau vide masque la section)
     ------------------------------------------------------------------- */
  testimonials: [
    // TODO: ajoute de vrais témoignages, ex. :
    // {
    //   quote: "Travail sérieux, livraison dans les temps et code propre.",
    //   author: "Prénom Nom",
    //   role: "CTO, Entreprise",
    //   avatar: "/testimonials/personne.jpg", // optionnel
    // },
  ] as Testimonial[],
};

/* ---------------------------------------------------------------------
   Types exportés (réutilisés par les composants et les pages détail)
   --------------------------------------------------------------------- */
export type Project = (typeof DATA.projects)[number];
export type Experience = (typeof DATA.experience)[number];

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  avatar?: string;
};

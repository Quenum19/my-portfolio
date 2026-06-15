import { Github, Linkedin, Mail, Twitter } from "lucide-react";

export const DATA = {
  personal: {
    name: "Ton Prénom", // Remplacer par ton vrai nom
    role: "Développeur Web Fullstack",
    age: 24,
    location: "Abidjan, Côte d'Ivoire",
    bio: "Passionné par la création d'architectures web robustes. Je navigue avec aisance entre le frontend interactif (React) et le backend structuré (Laravel/Node). Autonome et curieux, je transforme des besoins complexes en solutions digitales élégantes.",
    email: "ton.email@example.com",
    socials: [
      { name: "GitHub", url: "https://github.com/tonprofil", icon: Github },
      { name: "LinkedIn", url: "https://linkedin.com/in/tonprofil", icon: Linkedin },
      { name: "Email", url: "mailto:ton.email@example.com", icon: Mail },
    ]
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
        "Gestion de contenu E-learning et maintenance du projet Recrulink."
      ],
      stack: ["PHP", "Laravel", "MySQL", "Git"]
    },
    {
      company: "Markel Technologie",
      role: "Stagiaire Développeur d'Applications",
      period: "Nov 2021 – Avril 2022",
      description: "Développement mobile et maintenance web.",
      achievements: [
        "Développement d'application mobile multiplateforme avec Ionic.",
        "Maintenance corrective et évolutive de sites web existants.",
        "Optimisation UX/UI."
      ],
      stack: ["Ionic", "JavaScript", "CSS"]
    }
  ],
  education: [
    {
      degree: "Certificat Bootcamp Développeur de Logiciels",
      school: "GOMYCODE, Abidjan",
      year: "Nov 2024 – Juin 2025"
    },
    {
      degree: "Licence Professionnelle Génie Logiciel",
      school: "HEC La Roche, Abidjan",
      year: "2023 – 2024"
    },
    {
      degree: "BTS Développeur d'Applications",
      school: "EST Groupe Loko, Abidjan",
      year: "2019 – 2021"
    }
  ],
  projects: [
    {
      title: "ICARE E-Learning",
      description: "Plateforme complète de cours en ligne. Gestion des étudiants, cours vidéos et quizz.",
      tech: ["Laravel", "MySQL", "Bootstrap", "VPS"],
      link: "https://e-learning.icare-formations.com/",
      github: null, // Mettre null si privé
      type: "Fullstack",
      image: "/projects/icare.jpg" // À ajouter dans public/projects
    },
    {
      title: "New Wine Churches",
      description: "Site vitrine et gestion pour une organisation religieuse. Architecture MVC robuste.",
      tech: ["Laravel", "MySQL", "Shared Hosting"],
      link: "https://newwinechurches.com",
      github: null,
      type: "Fullstack",
      image: "/projects/newwine.jpg"
    },
    {
      title: "Super ToDo List",
      description: "Application de gestion de tâches avec authentification. Projet d'apprentissage MERN Stack.",
      tech: ["React", "Node.js", "Express", "MongoDB", "Render"],
      link: "https://mon-todo-mern-app-client.onrender.com/login",
      github: "https://github.com/tonprofil/todo-mern", // À remplacer
      type: "MERN Stack",
      image: "/projects/todo.jpg"
    }
  ]
};
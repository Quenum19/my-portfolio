# Portfolio — Next.js 16

Portfolio de développeur fullstack : bilingue **FR/EN**, dark mode, blog technique en MDX,
pages projets « case study », formulaire de contact fonctionnel, SEO et accessibilité soignés.

## Stack

- **Next.js 16** (App Router, Turbopack, React Compiler) · **React 19**
- **Tailwind CSS v4** (config CSS-first via `@theme`) · **Framer Motion**
- **next-intl** (i18n FR/EN par cookie) · **next-themes** (clair/sombre/système)
- **Resend** + **Zod** (formulaire de contact) · **MDX** (blog, coloration Shiki)

## Démarrage

```bash
npm install
cp .env.example .env.local   # puis remplir les variables (voir ci-dessous)
npm run dev                  # http://localhost:3000
```

Scripts utiles : `npm run build`, `npm run start`, `npm run lint`, `npm run format`.

## Gérer le contenu (sans code) — `/admin`

Tout le contenu (infos, compétences, expériences, formation, projets, témoignages, blog)
se gère depuis le **tableau de bord** : `https://<ton-site>/admin`.

- Connexion par mot de passe (`ADMIN_PASSWORD`).
- Les modifications sont enregistrées en **base Vercel Postgres** et **visibles immédiatement**
  sur le site (aucun redéploiement nécessaire).
- Le contenu par défaut (repli + valeur initiale) est dans `lib/content.ts` (`DEFAULT_CONTENT`).
- Les textes d'interface (boutons, titres de sections) restent dans `messages/fr.json` / `messages/en.json`.

## Variables d'environnement

Voir `.env.example`. Principales :

| Variable                       | Rôle                                                          |
| ------------------------------ | ------------------------------------------------------------- |
| `ADMIN_PASSWORD`               | Mot de passe d'accès à `/admin`.                              |
| `AUTH_SECRET`                  | Secret de signature des sessions admin (chaîne aléatoire).    |
| `POSTGRES_URL`                 | Connexion BDD — injectée par Vercel Postgres.                 |
| `BLOB_READ_WRITE_TOKEN`        | Upload d'images (Vercel Blob). Sinon, coller une URL.         |
| `RESEND_API_KEY`               | Active l'envoi réel du formulaire (sinon mode « dry-run »).   |
| `CONTACT_TO_EMAIL`             | Destinataire des messages (défaut : email du contenu).        |
| `CONTACT_FROM_EMAIL`           | Expéditeur (domaine vérifié Resend).                          |
| `NEXT_PUBLIC_SITE_URL`         | URL de prod (SEO, sitemap, OG).                               |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Active l'analytics Plausible (sans cookie). Vide = désactivé. |

## Déploiement (Vercel)

1. Pousser le dépôt sur GitHub, puis « Import Project » sur [vercel.com](https://vercel.com).
2. Renseigner les variables d'environnement (au minimum `NEXT_PUBLIC_SITE_URL`,
   et `RESEND_API_KEY` pour le formulaire).
3. Build command `next build`, aucune config supplémentaire nécessaire.
4. Créer la base : **Storage → Create Database → Postgres**, puis **Connect Project**.
5. Définir `ADMIN_PASSWORD` et `AUTH_SECRET`, puis vérifier `/`, `/admin`, `/blog`, `/sitemap.xml`.

## Accessibilité & SEO

Lien d'évitement clavier, landmarks, focus visibles, `prefers-reduced-motion`,
métadonnées Open Graph/Twitter, image OG dynamique, JSON-LD `Person`/`WebSite`,
`robots.ts`, `sitemap.ts`, manifest PWA.

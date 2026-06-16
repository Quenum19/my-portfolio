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

## Où remplir mon contenu

Tout le contenu est centralisé dans **`lib/data.ts`** (cherche les `// TODO:`).
Les textes d'interface (boutons, titres de sections) sont dans **`messages/fr.json`** et
**`messages/en.json`**. Les articles de blog sont des fichiers **`content/blog/*.mdx`**.

## Variables d'environnement

Voir `.env.example`. Principales :

| Variable                       | Rôle                                                          |
| ------------------------------ | ------------------------------------------------------------- |
| `RESEND_API_KEY`               | Active l'envoi réel du formulaire (sinon mode « dry-run »).   |
| `CONTACT_TO_EMAIL`             | Destinataire des messages (défaut : email de `lib/data.ts`).  |
| `CONTACT_FROM_EMAIL`           | Expéditeur (domaine vérifié Resend).                          |
| `NEXT_PUBLIC_SITE_URL`         | URL de prod (SEO, sitemap, OG).                               |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Active l'analytics Plausible (sans cookie). Vide = désactivé. |

## Déploiement (Vercel)

1. Pousser le dépôt sur GitHub, puis « Import Project » sur [vercel.com](https://vercel.com).
2. Renseigner les variables d'environnement (au minimum `NEXT_PUBLIC_SITE_URL`,
   et `RESEND_API_KEY` pour le formulaire).
3. Build command `next build`, aucune config supplémentaire nécessaire.
4. Vérifier après déploiement : `/`, `/blog`, `/projets/<slug>`, `/robots.txt`, `/sitemap.xml`.

## Accessibilité & SEO

Lien d'évitement clavier, landmarks, focus visibles, `prefers-reduced-motion`,
métadonnées Open Graph/Twitter, image OG dynamique, JSON-LD `Person`/`WebSite`,
`robots.ts`, `sitemap.ts`, manifest PWA.

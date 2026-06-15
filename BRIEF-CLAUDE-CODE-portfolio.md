# Brief de mission — Finaliser & optimiser `my-portfolio`

> **À coller dans Claude Code, à la racine du projet.**
> Mission : analyser l'existant, réparer ce qui bloque, remplacer le contenu placeholder, puis pousser le portfolio au niveau **production / compétitif marché**. Travaille de façon autonome, phase par phase, jusqu'au bout.

---

## 🎯 Contexte & objectif

C'est mon portfolio de développeur (Next.js 16 / React 19 / Tailwind v4 / Framer Motion). Il est bien structuré mais **ne build pas**, le **dark mode est cassé**, et **tout le contenu est du placeholder**. Objectif final : un portfolio bilingue (FR/EN), rapide (Lighthouse ~100), accessible (WCAG AA), bien référencé, avec un formulaire de contact qui marche, et un design qui ne ressemble pas à un template.

---

## 📏 Règles de travail (à respecter pendant toute la mission)

1. **Commence par lire avant d'écrire.** Ne modifie rien tant que la Phase 0 n'est pas terminée.
2. **Travaille par phases**, dans l'ordre. À la fin de chaque phase : vérifie que le projet build (`npm run build`) et résume ce qui a été fait.
3. **Commits atomiques** : un commit clair par étape logique (ex. `fix: charge la palette Tailwind v4`, `feat: dark mode avec persistance`).
4. **Ne casse pas ce qui marche.** L'architecture par composants et la séparation des données (`lib/data.ts`) sont bonnes — préserve-les.
5. **Données personnelles** : tu ne peux pas inventer mon nom, mes vrais projets, mes liens. Centralise TOUT le contenu à remplir dans un seul fichier config bien commenté, et liste-moi à la fin **exactement** ce que je dois remplir (avec des `TODO:` repérables). Pour le reste, va jusqu'au bout sans m'attendre.
6. **Respecte `prefers-reduced-motion`** sur toutes les animations.
7. Réponds-moi et commente le code **en français**.

---

## 🔍 Phase 0 — Analyse & compréhension

Avant toute modification :

- Cartographie l'arborescence (`app/`, `components/`, `lib/`, `public/`, fichiers de config).
- Lis `package.json`, `next.config.ts`, `tailwind.config.ts`, `app/globals.css`, `app/layout.tsx`, `lib/data.ts` et chaque composant.
- Lance `npm install` puis `npm run build` et **relève les erreurs exactes**.
- Produis un court rapport : ce qui est en place, ce qui marche, ce qui est cassé, et ton plan d'action priorisé. **Attends que je valide ce plan avant de continuer** (sauf si je t'ai dit « go direct », alors enchaîne).

---

## 🔴 Phase 1 — Réparer les bloquants (le projet doit builder)

1. **Conflit Tailwind v4 ↔ config v3.**
   - Migre la palette custom (`primary`, `dark.bg`, `dark.card`, etc.) vers un bloc `@theme { … }` dans `app/globals.css` (syntaxe v4), avec des variables CSS.
   - Remplace tous les `theme(colors.dark.bg)` et équivalents par les variables CSS / classes v4 correspondantes.
   - Supprime ou réduit `tailwind.config.ts` à ce que v4 sait charger. Vérifie que `bg-primary-500`, `dark:bg-dark-bg`, etc. rendent bien visuellement.
2. **Dark mode réellement fonctionnel.**
   - Implémente un toggle (clair / sombre / système) qui ajoute la classe `.dark` **sur `<html>`** (pas `body.dark`).
   - Corrige `globals.css` pour cibler `.dark` et non `body.dark`.
   - Persiste le choix (localStorage) **sans flash** au chargement (script inline dans `<head>` ou stratégie équivalente App Router).
   - Respecte la préférence système par défaut.
3. **Bug `Code2` non importé dans `components/Skills.tsx`.**
   - Importe `Code2` depuis `lucide-react`. Retire le `@ts-ignore` qui masquait le problème.

✅ Critère de sortie : `npm run build` passe sans erreur, le dark mode fonctionne, plus aucun `@ts-ignore` non justifié.

---

## 🟠 Phase 2 — Contenu : sortir du placeholder

- Crée un fichier de config unique et clair (ex. `lib/config.ts` ou enrichis `lib/data.ts`) regroupant **toutes** mes infos : nom, titre, bio, email, téléphone, localisation, réseaux (GitHub, LinkedIn, etc.), compétences, expériences, projets.
- Marque chaque valeur à fournir par moi avec `// TODO: à remplir`.
- Mets à jour partout où le placeholder traîne : `app/layout.tsx` (`<title>`, description), `components/Header.tsx` (logo), Hero, Footer.
- **Images de projets** : crée le dossier `public/projects/`, ajoute des placeholders propres (ratio cohérent), décommente les `<Image>` avec `fallback` gracieux + `alt` descriptif + `width/height` ou `fill` correct. Indique-moi les images à remplacer.
- Vérifie qu'il ne reste **aucune** occurrence de « Ton Prénom », « ton.email », « tonprofil ».

---

## 🟡 Phase 3 — Fonctionnel

1. **Formulaire de contact opérationnel.**
   - Crée une route API (`app/api/contact/route.ts`) avec **validation côté serveur (Zod)** et anti-spam (honeypot + rate-limit basique).
   - Branche l'envoi via **Resend** (laisse la clé en variable d'env `RESEND_API_KEY` dans `.env.local`, documentée dans `.env.example`).
   - Côté client : `onSubmit`, états `loading / success / error`, désactivation du bouton pendant l'envoi, messages clairs, accessibilité (labels, `aria-live` pour le retour).
2. **Navigation cohérente** : « Accueil » → ancre propre (`#hero` ou scroll-to-top via handler), pas de `Link href="#"` superflu. Smooth scroll + offset header.

---

## 🟢 Phase 4 — Qualité, accessibilité, SEO de base

- **Accessibilité** : `aria-label` sur le burger, focus visibles, navigation clavier complète, contrastes AA dans les deux thèmes, `<Link>` au lieu de `<a>` quand pertinent, landmarks (`<header>`, `<main>`, `<nav>`, `<footer>`).
- **SEO** : `metadataBase`, balises Open Graph + Twitter Card, **og:image dynamique** (`opengraph-image.tsx`), `robots.ts`, `sitemap.ts`, **vrai favicon** + `apple-touch-icon` + manifest.
- **Données structurées** : JSON-LD `Person` (et `WebSite`) dans le `<head>`.
- **Qualité code** : ESLint + Prettier propres, `npm run lint` sans erreur, plus de `@ts-ignore`, types corrects.

---

## 🚀 Phase 5 — Niveau compétitif (faire la différence sur le marché)

Implémente ces améliorations (ordre = priorité) :

1. **Internationalisation FR/EN.** C'est le point qui ouvre le marché international. Architecture i18n (next-intl ou équivalent App Router), toggle de langue, tous les textes externalisés. Garde le FR par défaut.
2. **Section Projets façon « case studies ».** Pour chaque projet : problème → solution → stack → résultat/impact → liens (démo + repo). Page de détail par projet (route dédiée) plutôt qu'une simple carte.
3. **Blog / écrits techniques en MDX.** Montre l'expertise et booste le SEO. Liste + page article, support code highlighting, dates, temps de lecture. (Squelette + 1 article d'exemple à remplacer.)
4. **CV téléchargeable** (bouton « Télécharger mon CV », PDF dans `public/`).
5. **Performance** : viser Lighthouse ~100. Lazy-loading images, `next/font`, préchargement maîtrisé, pas de layout shift, bundle propre. Vérifie les Core Web Vitals.
6. **Analytics respectueux de la vie privée** (Plausible ou Umami, sans cookies) — désactivable par variable d'env.
7. **Témoignages / clients** (section optionnelle, données dans la config).
8. **Micro-interactions & design distinctif** : ne pas rester sur un look « template ». Travaille une identité visuelle (typographie hiérarchisée, accent de couleur, hover states soignés, transitions de page, curseur/scroll subtils) tout en restant sobre et pro. Animations toujours derrière `prefers-reduced-motion`.
9. **PWA légère** : manifest + installable, theme-color clair/sombre.
10. **Indicateur de section active** dans la nav (scroll spy) + barre de progression de lecture (subtile).

---

## ✅ Phase 6 — Vérification finale & livraison

- `npm run build` + `npm run lint` : zéro erreur.
- Teste manuellement : dark mode, toggle langue, formulaire (cas succès + erreur), navigation, responsive (mobile/tablette/desktop).
- Vérifie l'absence totale de placeholder.
- Prépare le déploiement (instructions Vercel + variables d'env nécessaires).
- **Rends-moi un récapitulatif final** : ce qui a été fait, la **liste précise des `TODO:` que je dois remplir** (contenu, images, clés API), et les prochaines évolutions possibles.

---

### Démarre par la Phase 0 et présente-moi ton plan.

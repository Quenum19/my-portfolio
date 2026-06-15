import { DATA, SITE } from "@/lib/data";

/**
 * Données structurées JSON-LD (schema.org) : Person + WebSite.
 * Améliore la compréhension du site par les moteurs de recherche.
 */
export default function JsonLd() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || SITE.url;

  const data = [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: DATA.personal.name,
      jobTitle: DATA.personal.role,
      email: `mailto:${DATA.personal.email}`,
      url: siteUrl,
      address: {
        "@type": "PostalAddress",
        addressLocality: DATA.personal.location,
      },
      knowsAbout: [...DATA.skills.frontend, ...DATA.skills.backend, ...DATA.skills.database],
      sameAs: DATA.personal.socials.filter((s) => s.url.startsWith("http")).map((s) => s.url),
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: `${DATA.personal.name} — Portfolio`,
      url: siteUrl,
      inLanguage: "fr",
    },
  ];

  return (
    <script
      type="application/ld+json"
      // Contenu généré côté serveur à partir de la config (pas d'entrée utilisateur).
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

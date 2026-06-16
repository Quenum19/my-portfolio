import type { ResolvedContent } from "@/lib/content";

/**
 * Données structurées JSON-LD (schema.org) : Person + WebSite.
 * Améliore la compréhension du site par les moteurs de recherche.
 */
export default function JsonLd({ content }: { content: ResolvedContent }) {
  const { personal, skills, site } = content;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || site.url;

  const data = [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: personal.name,
      jobTitle: personal.role,
      email: `mailto:${personal.email}`,
      url: siteUrl,
      address: {
        "@type": "PostalAddress",
        addressLocality: personal.location,
      },
      knowsAbout: [...skills.frontend, ...skills.backend, ...skills.database],
      sameAs: personal.socials.filter((s) => s.url.startsWith("http")).map((s) => s.url),
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: `${personal.name} — Portfolio`,
      url: siteUrl,
      inLanguage: "fr",
    },
  ];

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}

import Script from "next/script";

/**
 * Analytics Plausible (respectueux de la vie privée, sans cookie).
 * Ne s'active que si NEXT_PUBLIC_PLAUSIBLE_DOMAIN est défini.
 */
export default function Analytics() {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  if (!domain) return null;

  const host = process.env.NEXT_PUBLIC_PLAUSIBLE_HOST || "https://plausible.io";

  return (
    <Script defer data-domain={domain} src={`${host}/js/script.js`} strategy="afterInteractive" />
  );
}

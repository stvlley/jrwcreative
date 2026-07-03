export const defaultSiteUrl = "https://jrwtech.works";

const localhostPattern = /^(localhost|127\.0\.0\.1|\[::1\])(?::\d+)?$/;

export function resolveSiteUrl(host?: string | null, protocol = "https") {
  const explicitUrl = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL;
  const vercelUrl =
    process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
  const candidate = host ?? explicitUrl ?? vercelUrl ?? defaultSiteUrl;

  if (/^https?:\/\//i.test(candidate)) {
    return candidate.replace(/\/+$/, "");
  }

  const resolvedProtocol = localhostPattern.test(candidate) ? protocol : "https";

  return `${resolvedProtocol}://${candidate}`.replace(/\/+$/, "");
}

export const siteUrl = resolveSiteUrl();

export const siteName = "JRW TechWorks";

export const legalName = "JRW Creative Group LLC";

export const siteTitle =
  "JRW TechWorks | In-Home Tech Consulting, Home Theater, A/V, Servers & Retro";

export const siteDescription =
  "JRW TechWorks provides in-home tech consulting, home theater and A/V design, local server, NAS, and self-hosted LLM installs, and bespoke retro console setups across Burlington County, Mercer County, Philadelphia, and Princeton.";

export const serviceArea = [
  "Fieldsboro, NJ",
  "Bordentown, NJ",
  "Burlington County, NJ",
  "Mercer County, NJ",
  "Philadelphia, PA",
  "Princeton, NJ",
];

export const seoKeywords = [
  "JRW TechWorks",
  "in-home tech consulting NJ",
  "home theater design Burlington County",
  "A/V routing Philadelphia Princeton corridor",
  "local LLM installation",
  "self-hosted AI installation NJ",
  "NAS server installation NJ",
  "media server setup NJ",
  "retro console restoration NJ",
  "in-home tech installer Mercer County",
];

export function resolvePrimaryImage(baseUrl = siteUrl) {
  return `${baseUrl}/assets/jrw-tech-workbench-photo.webp`;
}

export const primaryImage = resolvePrimaryImage(siteUrl);

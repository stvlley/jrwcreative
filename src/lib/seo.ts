export const defaultSiteUrl = "https://jrwcreative.group";

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

export const siteName = "JRW Creative Group LLC";

export const siteTitle =
  "JRW Creative Group LLC | In-Home Tech Consulting, The Swap, 3D Printing";

export const siteDescription =
  "JRW Creative Group LLC and The Swap provide in-home tech consulting, home theater and A/V design, local server and LLM installs, 3D printing, workshops, events, and upgraded retro hardware across Burlington County, Mercer County, Philadelphia, and Princeton.";

export const serviceArea = [
  "Fieldsboro, NJ",
  "Bordentown, NJ",
  "Burlington County, NJ",
  "Mercer County, NJ",
  "Philadelphia, PA",
  "Princeton, NJ",
];

export const seoKeywords = [
  "JRW Creative Group",
  "The Swap makerspace",
  "in-home tech consulting NJ",
  "home theater design Burlington County",
  "A/V routing Philadelphia Princeton corridor",
  "local LLM installation",
  "NAS server installation NJ",
  "3D printing service Burlington County",
  "retro console restoration NJ",
  "neurodivergent friendly workshops",
];

export function resolvePrimaryImage(baseUrl = siteUrl) {
  return `${baseUrl}/assets/jrw-maker-pop-up-photo.webp`;
}

export const primaryImage = resolvePrimaryImage(siteUrl);

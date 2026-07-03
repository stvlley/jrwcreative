import { promises as fs } from "node:fs";
import path from "node:path";
import { list, put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import {
  siteContent as defaultContent,
  type Caption,
  type CtaLink,
  type FaqItem,
  type ServiceItem,
  type SiteContent,
  type SpotlightItem,
} from "@/content/site";

// One JSON document holds all editable site copy.
const CONTENT_KEY = "content.json";
// Local dev fallback file (Vercel's runtime FS is read-only, so prod uses Blob).
const LOCAL_PATH = path.join(process.cwd(), ".cms-content.json");

function blobToken() {
  return process.env.BLOB_READ_WRITE_TOKEN;
}

function isProd() {
  return process.env.NODE_ENV === "production";
}

/**
 * Read the live site content. Uses Vercel Blob when configured, a local JSON
 * file in dev, and falls back to the in-repo defaults when nothing is stored or
 * the document is unreadable — so the public site always renders.
 */
export async function getContent(): Promise<SiteContent> {
  const token = blobToken();

  if (!token) {
    // Dev/local fallback: read the on-disk document if it exists.
    try {
      const raw = await fs.readFile(LOCAL_PATH, "utf8");
      return normalizeContent(JSON.parse(raw));
    } catch {
      return defaultContent;
    }
  }

  try {
    const { blobs } = await list({ prefix: CONTENT_KEY, limit: 1, token });
    const blob = blobs.find((b) => b.pathname === CONTENT_KEY);
    if (!blob) return defaultContent;

    // Read live each request (the home route is already dynamic). The cache-bust
    // query bypasses the Blob CDN edge cache so a save is visible immediately
    // (read-your-own-writes), not after the blob's cache-control window.
    const res = await fetch(`${blob.url}?_=${Date.now()}`, { cache: "no-store" });
    if (!res.ok) return defaultContent;

    // Normalize so a partial/legacy document never drops sections.
    return normalizeContent(await res.json());
  } catch {
    return defaultContent;
  }
}

/** Persist edited content and make the public site reflect it immediately. */
export async function saveContent(next: SiteContent): Promise<void> {
  const token = blobToken();

  if (token) {
    await put(CONTENT_KEY, JSON.stringify(next, null, 2), {
      access: "public",
      token,
      contentType: "application/json",
      addRandomSuffix: false,
      allowOverwrite: true,
      // Minimum allowed (60s). Reads also cache-bust, so edits surface immediately;
      // this just keeps the blob's own CDN window short as a backstop.
      cacheControlMaxAge: 60,
    });
  } else if (!isProd()) {
    // Local dev: persist to disk so the edit→save→see-it-change loop works.
    await fs.writeFile(LOCAL_PATH, JSON.stringify(next, null, 2), "utf8");
  } else {
    throw new Error("Content store is not configured (BLOB_READ_WRITE_TOKEN missing).");
  }

  // The home route reads live, but purge its render cache as a safeguard.
  revalidatePath("/");
}

/** True when saves will persist (Blob in prod, local file in dev). */
export function isContentStoreConfigured() {
  return Boolean(blobToken()) || !isProd();
}

// --- Validation ---------------------------------------------------------
// Rebuild a clean SiteContent from untrusted input, coercing every field and
// falling back to defaults, so a malformed or hostile payload can never corrupt
// the stored document or drop sections.

type Rec = Record<string, unknown>;
const asObj = (v: unknown): Rec => (v && typeof v === "object" ? (v as Rec) : {});
const str = (v: unknown, fallback: string): string =>
  typeof v === "string" ? v : fallback;

function cta(v: unknown, fallback: CtaLink): CtaLink {
  const o = asObj(v);
  return { label: str(o.label, fallback.label), href: str(o.href, fallback.href) };
}

function strList(v: unknown, fallback: string[]): string[] {
  return Array.isArray(v) && v.length ? v.map((x, i) => str(x, fallback[i] ?? "")) : fallback;
}

function mapList<T>(v: unknown, fallback: T[], map: (o: Rec, fb: T) => T): T[] {
  if (!Array.isArray(v) || !v.length) return fallback;
  return v.map((item, i) => map(asObj(item), fallback[i] ?? fallback[0]));
}

export function normalizeContent(input: unknown): SiteContent {
  const o = asObj(input);
  const d = defaultContent;

  const hero = asObj(o.hero);
  const intro = asObj(o.intro);
  const approach = asObj(o.approach);
  const consulting = asObj(o.consulting);
  const proof = asObj(o.proof);
  const spotlights = asObj(o.spotlights);
  const ctaBand = asObj(o.cta);
  const faq = asObj(o.faq);
  const contact = asObj(o.contact);
  const footer = asObj(o.footer);

  return {
    hero: {
      badge: str(hero.badge, d.hero.badge),
      headline: str(hero.headline, d.hero.headline),
      subhead: str(hero.subhead, d.hero.subhead),
      primaryCta: cta(hero.primaryCta, d.hero.primaryCta),
      secondaryCta: cta(hero.secondaryCta, d.hero.secondaryCta),
      cornerNote: str(hero.cornerNote, d.hero.cornerNote),
      captions: mapList<Caption>(hero.captions, d.hero.captions, (c, fb) => ({
        kicker: str(c.kicker, fb.kicker),
        text: str(c.text, fb.text),
      })),
    },
    proofSignals: strList(o.proofSignals, d.proofSignals),
    intro: {
      eyebrow: str(intro.eyebrow, d.intro.eyebrow),
      title: str(intro.title, d.intro.title),
      cards: mapList(intro.cards, d.intro.cards, (c, fb) => ({
        title: str(c.title, fb.title),
        text: str(c.text, fb.text),
      })),
    },
    approach: {
      eyebrow: str(approach.eyebrow, d.approach.eyebrow),
      title: str(approach.title, d.approach.title),
      details: strList(approach.details, d.approach.details),
    },
    consulting: {
      eyebrow: str(consulting.eyebrow, d.consulting.eyebrow),
      title: str(consulting.title, d.consulting.title),
      intro: str(consulting.intro, d.consulting.intro),
      services: mapList<ServiceItem>(consulting.services, d.consulting.services, (s, fb) => ({
        key: str(s.key, fb.key),
        title: str(s.title, fb.title),
        text: str(s.text, fb.text),
      })),
    },
    proof: {
      eyebrow: str(proof.eyebrow, d.proof.eyebrow),
      title: str(proof.title, d.proof.title),
      intro: str(proof.intro, d.proof.intro),
      note: str(proof.note, d.proof.note),
      points: strList(proof.points, d.proof.points),
    },
    spotlights: {
      items: mapList<SpotlightItem>(spotlights.items, d.spotlights.items, (s, fb) => ({
        key: str(s.key, fb.key),
        eyebrow: str(s.eyebrow, fb.eyebrow),
        title: str(s.title, fb.title),
        body: str(s.body, fb.body),
        foot: str(s.foot, fb.foot),
      })),
    },
    cta: {
      eyebrow: str(ctaBand.eyebrow, d.cta.eyebrow),
      title: str(ctaBand.title, d.cta.title),
      body: str(ctaBand.body, d.cta.body),
      button: cta(ctaBand.button, d.cta.button),
    },
    faq: {
      eyebrow: str(faq.eyebrow, d.faq.eyebrow),
      title: str(faq.title, d.faq.title),
      intro: str(faq.intro, d.faq.intro),
      items: mapList<FaqItem>(faq.items, d.faq.items, (f, fb) => ({
        question: str(f.question, fb.question),
        answer: str(f.answer, fb.answer),
      })),
    },
    contact: {
      eyebrow: str(contact.eyebrow, d.contact.eyebrow),
      title: str(contact.title, d.contact.title),
      intro: str(contact.intro, d.contact.intro),
      email: str(contact.email, d.contact.email),
      phone: str(contact.phone, d.contact.phone),
      phoneHref: str(contact.phoneHref, d.contact.phoneHref),
      localFocus: str(contact.localFocus, d.contact.localFocus),
      availabilityNote: str(contact.availabilityNote, d.contact.availabilityNote),
    },
    footer: {
      legalLine: str(footer.legalLine, d.footer.legalLine),
    },
  };
}

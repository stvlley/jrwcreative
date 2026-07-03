// Single source of truth for all editable site copy.
// Phase 2 (CMS) stores this exact shape as a JSON document in Vercel Blob and
// renders from it; these values are the type definition and the seed/fallback.

export type CtaLink = { label: string; href: string };
export type ServiceItem = { key: string; title: string; text: string };
export type FaqItem = { question: string; answer: string };
export type Caption = { kicker: string; text: string };
// An uploaded image that overrides a built-in photo. Empty src => keep the
// default (which retains its webp/jpg <picture> fallback).
export type ImageRef = { src: string; alt: string };
export type SpotlightItem = {
  key: string;
  eyebrow: string;
  title: string;
  body: string;
  foot: string;
};

export type SiteContent = {
  branding: {
    logo: string;
  };
  hero: {
    badge: string;
    headline: string;
    subhead: string;
    primaryCta: CtaLink;
    secondaryCta: CtaLink;
    cornerNote: string;
    captions: Caption[];
    imageOverride: ImageRef;
  };
  proofSignals: string[];
  intro: {
    eyebrow: string;
    title: string;
    cards: { title: string; text: string }[];
  };
  approach: {
    eyebrow: string;
    title: string;
    details: string[];
  };
  consulting: {
    eyebrow: string;
    title: string;
    intro: string;
    services: ServiceItem[];
  };
  proof: {
    eyebrow: string;
    title: string;
    intro: string;
    note: string;
    points: string[];
    imageOverride: ImageRef;
  };
  spotlights: {
    items: SpotlightItem[];
  };
  cta: {
    eyebrow: string;
    title: string;
    body: string;
    button: CtaLink;
  };
  faq: {
    eyebrow: string;
    title: string;
    intro: string;
    items: FaqItem[];
  };
  contact: {
    eyebrow: string;
    title: string;
    intro: string;
    email: string;
    phone: string;
    phoneHref: string;
    localFocus: string;
    availabilityNote: string;
  };
  footer: {
    legalLine: string;
  };
};

export const siteContent: SiteContent = {
  branding: {
    logo: "",
  },
  hero: {
    badge: "Fieldsboro / Bordentown / Philadelphia / Princeton",
    headline: "Work with the gear. Leave with the confidence.",
    subhead:
      "JRW TechWorks designs and installs better home theaters, smarter local systems, self-hosted AI, and bespoke retro setups — done right, quoted per project, without the gatekeeping.",
    primaryCta: { label: "Request a free consultation", href: "#contact" },
    secondaryCta: { label: "See what we build", href: "#consulting" },
    cornerNote: "done right",
    captions: [
      {
        kicker: "JRW TechWorks brings",
        text: "home theaters, local AI, servers, and retro builds under one roof.",
      },
      {
        kicker: "Design + install + support",
        text: "One team, from first plan to final install.",
      },
    ],
    imageOverride: { src: "", alt: "" },
  },
  proofSignals: [
    "Free 1-hour consult",
    "Quoted per project",
    "Equipment billed at cost",
    "Real rooms, real hardware",
    "Local NJ + PA corridor",
  ],
  intro: {
    eyebrow: "One focus, done right",
    title: "Home tech, designed and installed right.",
    cards: [
      {
        title: "In-home design & install",
        text: "Quote-based in-home design and installation for home theaters, studios, A/V routing, local servers, self-hosted AI, media systems, and bespoke retro setups.",
      },
      {
        title: "Premium, relationship-driven",
        text: "Every project starts with a free one-hour consult, then a fixed-scope remote design package or local in-home install — labor quoted after the consult, equipment billed at cost.",
      },
    ],
  },
  approach: {
    eyebrow: "How it feels to work with us",
    title: "No jargon, no upsell, no surprises.",
    details: [
      "Clear quotes before work starts",
      "Gear guidance without the upsell haze",
      "Equipment billed at cost, labor quoted per project",
      "In-home installs and remote design options",
    ],
  },
  consulting: {
    eyebrow: "Consulting",
    title: "Start with a free one-hour consult.",
    intro:
      "Every project begins with a no-cost, no-obligation conversation. From there, choose a fixed-scope remote design package or local in-home installation — labor quoted after the consult and equipment billed at cost. No published prices, because every room and system is different.",
    services: [
      {
        key: "home-theater",
        title: "Home theaters",
        text: "Projector and screen design, calibration, room layout, acoustics, and source planning.",
      },
      {
        key: "studios",
        title: "Studios",
        text: "Audio and creative workspace builds that make recording, editing, streaming, and making easier to repeat.",
      },
      {
        key: "av-routing",
        title: "A/V routing",
        text: "Whole-system signal routing, integration, source cleanup, and practical control paths.",
      },
      {
        key: "servers",
        title: "In-home servers",
        text: "Local LLM setups, voice-ready AI options, NAS storage, backup plans, ZFS arrays, and media servers.",
      },
      {
        key: "retro",
        title: "Retro setups",
        text: "Aesthetic design, rare hardware sourcing, restoration, customization, and quality-focused console builds.",
      },
    ],
  },
  proof: {
    eyebrow: "Why JRW TechWorks",
    title: "Capable, local, and done right.",
    intro:
      "The work is practical, local, and built to last — clear quotes, honest gear guidance, and setups tuned to how you actually live and work.",
    note: "Built right the first time.",
    points: [
      "Clear quotes before any work starts",
      "Honest gear guidance, no upsell",
      "Local installs across the NJ + PA corridor",
      "Every project starts with a free consult",
    ],
    imageOverride: { src: "", alt: "" },
  },
  spotlights: {
    items: [
      {
        key: "servers",
        eyebrow: "In-home servers & local AI",
        title: "Self-hosted AI and storage, done properly.",
        body: "Local LLM setups with optional voice, NAS storage, ZFS arrays, backup plans, and media servers — private, fast, and fully yours.",
        foot: "Local LLM · NAS · ZFS · media servers",
      },
      {
        key: "retro",
        eyebrow: "Bespoke retro setups",
        title: "The ultimate setup for any console.",
        body: "Aesthetic design, rare hardware sourcing, restoration, and customization for quality-focused, piracy-free builds.",
        foot: "Sourcing · restoration · customization",
      },
    ],
  },
  cta: {
    eyebrow: "Ready when you are",
    title: "Build it right the first time.",
    body: "Every project starts with a free one-hour consult — no cost, no obligation. Tell us the room, the system, or the idea and we'll map the path.",
    button: { label: "Book your free consult", href: "#contact" },
  },
  faq: {
    eyebrow: "Quick answers",
    title: "Practical facts for local search.",
    intro:
      "A concise summary of what JRW TechWorks does, where it works, and how to start.",
    items: [
      {
        question: "Where does JRW TechWorks work?",
        answer:
          "JRW TechWorks is based around Fieldsboro and Bordentown, New Jersey, and serves Burlington County, Mercer County, Philadelphia, Princeton, and the Philadelphia-to-Princeton corridor.",
      },
      {
        question: "What can I ask JRW TechWorks to design or install?",
        answer:
          "Home theaters, studios, A/V routing, local LLM systems, NAS and media servers, backup plans, ZFS arrays, and bespoke retro setups all start with a free one-hour consultation.",
      },
      {
        question: "How does pricing work?",
        answer:
          "Every project is quoted individually after the free consult. You choose a fixed-scope remote design package or local in-home installation, with labor quoted and equipment billed at cost.",
      },
      {
        question: "Do you work on retro consoles?",
        answer:
          "Yes. Retro setups cover aesthetic design, rare hardware sourcing, restoration, customization, and quality-focused console builds — all piracy-free.",
      },
    ],
  },
  contact: {
    eyebrow: "Contact",
    title: "Tell us what you want to build next.",
    intro:
      "Use this for a free in-home tech consultation, a retro setup, or questions about home theater, A/V, servers, or local AI.",
    email: "jaime@jrwcreative.group",
    phone: "640-248-7074",
    phoneHref: "+16402487074",
    localFocus:
      "Local focus: Fieldsboro, Bordentown, Burlington County, Mercer County, Philadelphia, and Princeton.",
    availabilityNote:
      "Consultations are scheduled as availability allows — reach out and we'll find a time.",
  },
  footer: {
    legalLine: "© 2026 JRW Creative Group LLC. All rights reserved.",
  },
};

export type EditableItem = {
  title: string;
  meta: string;
  location: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
};

export const events: EditableItem[] = [
  {
    title: "Monthly Swap Pop-Ups",
    meta: "Year one cadence: monthly",
    location: "Locations announced per event",
    description:
      "Donation-based community events for makers, players, tinkerers, artists, and people who want useful tech to feel less closed off.",
    ctaLabel: "Ask about the next event",
    ctaHref: "#contact",
  },
  {
    title: "Convention Booths",
    meta: "Confirmed dates added here",
    location: "Philadelphia to Princeton corridor",
    description:
      "Find The Swap at conventions when booth dates are confirmed. This module is intentionally easy to edit as plans lock in.",
    ctaLabel: "Find us",
    ctaHref: "#contact",
  },
];

export const workshops: EditableItem[] = [
  {
    title: "How To Life",
    meta: "Flagship series",
    location: "ND-friendly pop-up workshops",
    description:
      "Accessible, practical sessions for fixing, making, maintaining, and understanding everyday things with less gatekeeping.",
    ctaLabel: "Join the interest list",
    ctaHref: "#contact",
  },
  {
    title: "Make + Mod Sessions",
    meta: "3D printing, soldering, art, textile craft",
    location: "Events and partner venues",
    description:
      "Hands-on sessions across creative hardware, software modding, makeup, crochet, knitting, repairs, and instructor-led skill swaps.",
    ctaLabel: "Suggest a workshop",
    ctaHref: "#contact",
  },
];

export const printing = {
  prompt: "Send a model, reference, or rough idea for a 3D print quote.",
  guidance:
    "Pricing is quote-based and depends on the actual model, size, material needs, and complexity. Two prints with the same volume can price differently when one is harder to produce cleanly.",
  equipment: "Bambu Lab P1P active now. P1S + AMS 2 Pro incoming.",
};

export const retroOfferings = {
  prompt: "Contact for current upgraded retro hardware offerings.",
  guidance:
    "The Swap focuses on restoration, customization, signal quality, durable hardware work, and legitimate personal setups. No preloaded copyrighted libraries or piracy-forward builds.",
  ctaLabel: "Ask what is available",
};

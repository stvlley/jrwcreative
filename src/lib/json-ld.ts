import type { SiteContent } from "@/content/site";
import { legalName, primaryImage, serviceArea, siteDescription, siteName, siteUrl } from "@/lib/seo";

const services = [
  {
    "@type": "Service",
    "@id": `${siteUrl}/#home-theater-consulting`,
    name: "Home theater and A/V consulting",
    description:
      "Projector and screen design, room layout, calibration, acoustics, whole-system A/V routing, and practical control planning.",
    areaServed: serviceArea,
    provider: { "@id": `${siteUrl}/#organization` },
  },
  {
    "@type": "Service",
    "@id": `${siteUrl}/#local-server-llm-installation`,
    name: "Local server, NAS, media server, and LLM installation",
    description:
      "In-home server installation for local AI, voice-ready LLM setups, NAS storage, ZFS arrays, backups, and media systems.",
    areaServed: serviceArea,
    provider: { "@id": `${siteUrl}/#organization` },
  },
  {
    "@type": "Service",
    "@id": `${siteUrl}/#studio-build`,
    name: "Studio and creative workspace builds",
    description:
      "Audio and creative workspace design and installation for recording, editing, streaming, and making.",
    areaServed: serviceArea,
    provider: { "@id": `${siteUrl}/#organization` },
  },
  {
    "@type": "Service",
    "@id": `${siteUrl}/#retro-setups`,
    name: "Retro console setups and restoration",
    description:
      "Piracy-free aesthetic design, rare hardware sourcing, restoration, customization, and quality-focused console builds.",
    areaServed: serviceArea,
    provider: { "@id": `${siteUrl}/#organization` },
  },
];

export function buildHomePageJsonLd(content: SiteContent) {
  const { contact, faq } = content;
  const telephone = `+1-${contact.phone}`;
  const contactPoint = {
    "@type": "ContactPoint",
    email: contact.email,
    telephone,
    contactType: "customer service",
    areaServed: ["US-NJ", "US-PA"],
    availableLanguage: "en",
  };

  return {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
      "@id": `${siteUrl}/#organization`,
      name: siteName,
      legalName,
      url: siteUrl,
      image: primaryImage,
      description: siteDescription,
      email: contact.email,
      telephone,
      areaServed: serviceArea,
      contactPoint,
      makesOffer: services.map((service) => ({ "@id": service["@id"] })),
      knowsAbout: [
        "home theater design",
        "A/V routing",
        "local LLM installation",
        "self-hosted AI",
        "NAS servers",
        "media servers",
        "ZFS storage",
        "retro hardware restoration",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: siteName,
      description: siteDescription,
      publisher: { "@id": `${siteUrl}/#organization` },
      inLanguage: "en-US",
    },
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/#webpage`,
      url: siteUrl,
      name: `${siteName} | In-Home Tech Consulting`,
      description: siteDescription,
      isPartOf: { "@id": `${siteUrl}/#website` },
      about: { "@id": `${siteUrl}/#organization` },
      primaryImageOfPage: primaryImage,
      inLanguage: "en-US",
    },
    ...services,
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/#faq`,
      mainEntity: faq.items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ],
  };
}

export function stringifyJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

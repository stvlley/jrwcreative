import { primaryImage, serviceArea, siteDescription, siteName, siteUrl } from "@/lib/seo";

const contactPoint = {
  "@type": "ContactPoint",
  email: "jaime@jrwcreative.group",
  telephone: "+1-640-248-7074",
  contactType: "customer service",
  areaServed: ["US-NJ", "US-PA"],
  availableLanguage: "en",
};

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
    "@id": `${siteUrl}/#3d-printing-service`,
    name: "3D print-for-hire service",
    description:
      "Quote-based 3D printing using the actual model, size, material needs, and production complexity.",
    areaServed: serviceArea,
    provider: { "@id": `${siteUrl}/#organization` },
  },
  {
    "@type": "Service",
    "@id": `${siteUrl}/#workshops-events`,
    name: "The Swap workshops and maker events",
    description:
      "Monthly pop-ups, practical workshops, How To Life sessions, maker events, and community-first learning opportunities.",
    areaServed: serviceArea,
    provider: { "@id": `${siteUrl}/#organization` },
  },
  {
    "@type": "Service",
    "@id": `${siteUrl}/#retro-hardware`,
    name: "Upgraded retro hardware and console restoration",
    description:
      "Piracy-free restoration, customization, signal quality work, and bespoke retro hardware setup guidance.",
    areaServed: serviceArea,
    provider: { "@id": `${siteUrl}/#organization` },
  },
];

export const homePageJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
      "@id": `${siteUrl}/#organization`,
      name: siteName,
      alternateName: "The Swap",
      url: siteUrl,
      image: primaryImage,
      description: siteDescription,
      email: "jaime@jrwcreative.group",
      telephone: "+1-640-248-7074",
      areaServed: serviceArea,
      contactPoint,
      makesOffer: services.map((service) => ({ "@id": service["@id"] })),
      knowsAbout: [
        "home theater design",
        "A/V routing",
        "local LLM installation",
        "NAS servers",
        "media servers",
        "3D printing",
        "retro hardware restoration",
        "maker workshops",
        "neurodivergent-friendly learning",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: `${siteName} | The Swap`,
      description: siteDescription,
      publisher: { "@id": `${siteUrl}/#organization` },
      inLanguage: "en-US",
    },
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/#webpage`,
      url: siteUrl,
      name: "JRW Creative Group LLC and The Swap",
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
      mainEntity: [
        {
          "@type": "Question",
          name: "Where does JRW Creative Group work?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "JRW Creative Group is based around Fieldsboro and Bordentown, New Jersey, and focuses on Burlington County, Mercer County, Philadelphia, Princeton, and the Philadelphia-to-Princeton corridor.",
          },
        },
        {
          "@type": "Question",
          name: "What does the free consultation cover?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The free one-hour consultation is the first step for in-home tech consulting, home theater, A/V routing, server, local AI, media system, and retro setup projects.",
          },
        },
        {
          "@type": "Question",
          name: "Does The Swap offer 3D printing?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. The Swap offers quote-based 3D print-for-hire service. Pricing depends on the model, size, material needs, and production complexity.",
          },
        },
        {
          "@type": "Question",
          name: "What is The Swap?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The Swap is the community side of JRW Creative Group, focused on maker pop-ups, workshops, print-for-hire 3D work, and upgraded retro hardware.",
          },
        },
      ],
    },
  ],
};

export function stringifyJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

import type { MetadataRoute } from "next";
import { primaryImage, siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date("2026-06-16"),
      changeFrequency: "monthly",
      priority: 1,
      images: [
        primaryImage,
        `${siteUrl}/assets/jrw-tech-workbench-photo.webp`,
        `${siteUrl}/assets/jrw-makerspace-interior-photo.webp`,
        `${siteUrl}/assets/jrw-storefront-photo.webp`,
      ],
    },
  ];
}

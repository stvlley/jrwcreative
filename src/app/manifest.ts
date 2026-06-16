import type { MetadataRoute } from "next";
import { siteDescription, siteName } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteName} | The Swap`,
    short_name: "JRW Creative",
    description: siteDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#f7f2ea",
    theme_color: "#111111",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}

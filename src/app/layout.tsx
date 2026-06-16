import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import {
  resolvePrimaryImage,
  resolveSiteUrl,
  seoKeywords,
  siteDescription,
  siteName,
  siteTitle,
} from "@/lib/seo";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
  const protocol = requestHeaders.get("x-forwarded-proto") ?? "https";
  const requestSiteUrl = resolveSiteUrl(host, protocol);
  const requestPrimaryImage = resolvePrimaryImage(requestSiteUrl);

  return {
    metadataBase: new URL(requestSiteUrl),
    title: {
      default: siteTitle,
      template: `%s | ${siteName}`,
    },
    description: siteDescription,
    applicationName: siteName,
    authors: [{ name: siteName, url: requestSiteUrl }],
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/jrw-logo.svg", type: "image/svg+xml" },
      ],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    },
    creator: siteName,
    publisher: siteName,
    category: "technology consulting",
    keywords: seoKeywords,
    alternates: {
      canonical: "/",
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: requestSiteUrl,
      siteName: `${siteName} | The Swap`,
      title: siteTitle,
      description: siteDescription,
      images: [
        {
          url: requestPrimaryImage,
          alt: "JRW Creative Group maker pop-up with people collaborating around tools and creative hardware",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: siteTitle,
      description: siteDescription,
      images: [
        {
          url: requestPrimaryImage,
          alt: "JRW Creative Group maker pop-up with people collaborating around tools and creative hardware",
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    other: {
      "geo.region": "US-NJ",
      "geo.placename": "Fieldsboro, Bordentown, Burlington County, Mercer County, Philadelphia, Princeton",
      "business:contact_data:locality": "Fieldsboro",
      "business:contact_data:region": "NJ",
      "business:contact_data:country_name": "United States",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

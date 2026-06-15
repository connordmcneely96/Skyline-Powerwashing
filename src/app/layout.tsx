import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google";
import "./globals.css";

import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { brand, serviceAreas, services } from "@/lib/site-config";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-oswald",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = "https://skylineexteriorcleaning.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${brand.name} | Pressure & Soft Washing in Arkansas & Oklahoma`,
    template: `%s | ${brand.name}`,
  },
  description:
    "Professional exterior cleaning for homes and businesses — pressure washing, soft washing, roof, window, and gutter cleaning. Serving Arkansas & Oklahoma. Licensed, insured, free estimates.",
  keywords: [
    "pressure washing",
    "soft washing",
    "roof cleaning",
    "window cleaning",
    "gutter cleaning",
    "exterior cleaning",
    "Little Rock",
    "Oklahoma City",
  ],
  openGraph: {
    title: `${brand.name} | Professional Exterior Cleaning`,
    description:
      "Pressure washing, soft washing, roof, window & gutter cleaning for homes and businesses across Arkansas & Oklahoma.",
    url: siteUrl,
    siteName: brand.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/og.png",
        width: 1200,
        height: 630,
        alt: brand.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${brand.name} | Professional Exterior Cleaning`,
    description:
      "Pressure washing, soft washing, roof, window & gutter cleaning across Arkansas & Oklahoma.",
    images: ["/images/og.png"],
  },
  alternates: { canonical: "/" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: brand.name,
  image: `${siteUrl}/images/og.png`,
  url: siteUrl,
  telephone: brand.phoneDisplay,
  email: brand.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Little Rock",
    addressRegion: "AR",
    addressCountry: "US",
  },
  areaServed: [
    { "@type": "State", name: "Arkansas" },
    { "@type": "State", name: "Oklahoma" },
    ...[...serviceAreas.AR, ...serviceAreas.OK].map((c) => ({
      "@type": "City",
      name: c,
    })),
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Exterior Cleaning Services",
    itemListElement: services.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.title, description: s.desc },
    })),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${oswald.variable} ${inter.variable}`}>
      <body className="bg-surface text-text antialiased">
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}

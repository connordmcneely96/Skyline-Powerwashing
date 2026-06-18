import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google";
import "./globals.css";

import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { brand, serviceAreas, allServices } from "@/lib/site-config";

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
    default: `${brand.name} | Drone-Powered Exterior Cleaning in Arkansas & Oklahoma`,
    template: `%s | ${brand.name}`,
  },
  description:
    "Drone-powered exterior cleaning for commercial and multi-story properties — building facades, roofs, high windows, and solar up to ~150 ft with no scaffolding or lifts. Plus a ground crew for homes and flatwork. Serving Arkansas & Oklahoma. Free estimates.",
  keywords: [
    "drone exterior cleaning",
    "drone power washing",
    "commercial building washing",
    "drone roof cleaning",
    "high-rise window cleaning",
    "solar panel cleaning",
    "pressure washing",
    "soft washing",
    "Little Rock",
    "Oklahoma City",
  ],
  openGraph: {
    title: `${brand.name} | Drone-Powered Exterior Cleaning`,
    description:
      "Clean entire buildings from the air — facades, roofs, high windows & solar — no scaffolding or lifts. Commercial & residential across Arkansas & Oklahoma.",
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
    title: `${brand.name} | Drone-Powered Exterior Cleaning`,
    description:
      "Clean entire buildings from the air — no scaffolding or lifts. Commercial & residential across Arkansas & Oklahoma.",
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
    itemListElement: allServices.map((s) => ({
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

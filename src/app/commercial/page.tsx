import type { Metadata } from "next";

import { PageShell } from "@/components/site/page-shell";

export const metadata: Metadata = {
  title: "Commercial Exterior Cleaning",
  description:
    "Commercial pressure washing and soft washing for storefronts, offices, and properties of all sizes across Arkansas & Oklahoma.",
};

export default function CommercialPage() {
  return (
    <PageShell
      title="Commercial Cleaning"
      subtitle="Storefronts, parking lots, building exteriors and more — handled with minimal disruption to your business."
    />
  );
}

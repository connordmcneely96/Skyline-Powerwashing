import type { Metadata } from "next";

import { PageShell } from "@/components/site/page-shell";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Local and family owned, fully licensed and insured. Learn more about Skyline Exterior Cleaning.",
};

export default function AboutPage() {
  return (
    <PageShell
      title="About Us"
      subtitle="Local & family owned. Proudly serving our community with honesty, integrity, and reliable service."
    />
  );
}

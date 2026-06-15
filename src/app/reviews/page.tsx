import type { Metadata } from "next";

import { PageShell } from "@/components/site/page-shell";

export const metadata: Metadata = {
  title: "Reviews",
  description:
    "See what homeowners and businesses across Arkansas & Oklahoma say about Skyline Exterior Cleaning.",
};

export default function ReviewsPage() {
  return (
    <PageShell
      title="Reviews"
      subtitle="What our customers across Arkansas & Oklahoma have to say."
    />
  );
}

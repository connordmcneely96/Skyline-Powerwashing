import type { Metadata } from "next";

import { PageShell } from "@/components/site/page-shell";

export const metadata: Metadata = {
  title: "Request a Free Quote",
  description:
    "Request a free, no-obligation estimate from Skyline Exterior Cleaning. Serving Arkansas & Oklahoma.",
};

export default function QuoteRequestPage() {
  return (
    <PageShell
      title="Request a Free Quote"
      subtitle="Tell us about your property and we'll get back to you with a free, no-obligation estimate."
    >
      <p className="max-w-2xl text-text-muted">
        The online quote form is coming soon. For now, call or email us and
        we&apos;ll schedule your free estimate right away.
      </p>
    </PageShell>
  );
}

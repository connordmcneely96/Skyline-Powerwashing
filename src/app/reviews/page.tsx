import type { Metadata } from "next";

import { PageShell } from "@/components/site/page-shell";

export const metadata: Metadata = {
  title: "Reviews & Projects",
  description:
    "Project photos and customer reviews from Skyline Exterior Cleaning are coming soon. Serving Arkansas & Oklahoma.",
};

export default function ReviewsPage() {
  return (
    <PageShell
      title="Reviews & Projects"
      subtitle="We're a new, owner-operated business — and we believe in earning trust honestly."
    >
      <div className="max-w-2xl rounded-xl border border-dashed border-line bg-surface-muted p-8 text-center">
        <p className="font-display text-lg font-semibold uppercase tracking-wide text-ink">
          Project Photos &amp; Reviews Coming Soon
        </p>
        <p className="mt-3 text-sm leading-relaxed text-text-muted">
          Rather than post anything we can&apos;t back up, we&apos;re building this
          page with real before/after photos and verified customer reviews as we
          complete jobs. Want to be one of our first? Request a free quote and
          let&apos;s get started.
        </p>
      </div>
    </PageShell>
  );
}

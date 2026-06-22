import type { Metadata } from "next";
import Link from "next/link";

import { PageShell } from "@/components/site/page-shell";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Reviews & Project Photos",
  description:
    "Skyline is building its reputation one spotless building at a time. Real customer reviews and project photos are on the way.",
};

export default function ReviewsPage() {
  return (
    <PageShell
      title="Reviews & Projects"
      subtitle="We're a new, owner-operated business — and we believe in earning trust honestly."
    >
      <div className="max-w-2xl rounded-xl border border-dashed border-line bg-surface-muted p-8 text-center">
        <p className="font-display text-lg font-semibold uppercase tracking-wide text-ink">
          Building Our Reputation, One Spotless Building at a Time
        </p>
        <p className="mt-3 text-sm leading-relaxed text-text-muted">
          We&apos;re just getting started, so rather than post anything we
          can&apos;t back up, we&apos;ll add real customer reviews and
          before/after project photos here as we complete jobs. Want to be one of
          our first reviews? Book a job and we&apos;d be honored to earn it.
        </p>
        <Button asChild className="mt-6">
          <Link href="/quote-request">Get a Free Quote</Link>
        </Button>
      </div>

      {/*
        TODO(owner): Real reviews go here once you have them. Suggested shape for
        each card (keep it honest — only real, attributable reviews):
          - quote: the customer's words
          - name: first name + last initial
          - location: city, state
          - source: Google / Facebook (link to the original where possible)
        Do NOT add placeholder or sample testimonials in the meantime.
      */}
    </PageShell>
  );
}

import type { Metadata } from "next";
import { Phone, CircleCheck } from "lucide-react";

import { brand } from "@/lib/site-config";
import { QuoteForm } from "@/components/quote-form";

export const metadata: Metadata = {
  title: "Request a Free Quote",
  description:
    "Request a free, no-obligation estimate from Skyline Exterior Cleaning — drone-powered commercial cleaning and residential exterior services across Arkansas & Oklahoma.",
};

const ASSURANCES = [
  "Free, no-obligation estimate",
  "Commercial & residential",
  "Drone-powered for high work",
];

export default function QuoteRequestPage() {
  return (
    <>
      <section className="bg-ink pb-12 pt-36 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1
            className="font-display font-bold uppercase leading-tight"
            style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)" }}
          >
            Request a Free Quote
          </h1>
          <p className="mt-4 max-w-2xl text-base text-white/80">
            Tell us about your property and we&apos;ll get back to you with a
            free, no-obligation estimate.
          </p>
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
            {ASSURANCES.map((a) => (
              <li key={a} className="inline-flex items-center gap-2 text-sm text-white/85">
                <CircleCheck className="h-4 w-4 text-brand-bright" aria-hidden="true" />
                {a}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-surface-muted py-12 sm:py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_320px] lg:px-8">
          <QuoteForm />

          <aside className="order-first lg:order-last">
            <div className="rounded-xl border border-line bg-white p-6 shadow-card">
              <h2 className="font-display text-lg font-semibold uppercase tracking-wide text-ink">
                Prefer to Talk?
              </h2>
              <p className="mt-2 text-sm text-text-muted">
                Call and we&apos;ll answer your questions and schedule your free
                estimate.
              </p>
              <a
                href={brand.phoneHref}
                className="mt-4 inline-flex items-center gap-2 text-lg font-semibold text-brand hover:text-brand-bright"
              >
                <Phone className="h-5 w-5" aria-hidden="true" />
                {brand.phoneDisplay}
              </a>
              <p className="mt-4 text-xs text-text-muted">{brand.serving}</p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

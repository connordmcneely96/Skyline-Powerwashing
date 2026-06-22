import type { Metadata } from "next";
import { Phone, Mail, MapPin } from "lucide-react";

import { PageShell } from "@/components/site/page-shell";
import { brand } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact Us for a Free Estimate",
  description:
    "Call, email, or request a quote from Skyline Exterior Cleaning. Drone-powered and ground exterior cleaning across Arkansas & Oklahoma.",
};

export default function ContactPage() {
  return (
    <PageShell
      title="Contact Us"
      subtitle="Free estimates and fast, friendly responses. The quickest way to get started is the quote form — or reach us directly below."
    >
      <ul className="grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
        <li className="flex flex-col gap-2 rounded-xl border border-line bg-white p-5 shadow-card">
          <Phone className="h-5 w-5 text-brand" aria-hidden="true" />
          <span className="text-sm font-semibold text-ink">Call or Text</span>
          <a
            href={brand.phoneHref}
            className="text-sm font-medium text-brand hover:text-brand-bright"
          >
            {brand.phoneDisplay}
          </a>
        </li>
        <li className="flex flex-col gap-2 rounded-xl border border-line bg-white p-5 shadow-card">
          <Mail className="h-5 w-5 text-brand" aria-hidden="true" />
          <span className="text-sm font-semibold text-ink">Email</span>
          <a
            href={brand.emailHref}
            className="break-all text-sm font-medium text-brand hover:text-brand-bright"
          >
            {brand.email}
          </a>
        </li>
        <li className="flex flex-col gap-2 rounded-xl border border-line bg-white p-5 shadow-card">
          <MapPin className="h-5 w-5 text-brand" aria-hidden="true" />
          <span className="text-sm font-semibold text-ink">Service Area</span>
          <span className="text-sm text-text-muted">{brand.serving}</span>
        </li>
      </ul>

      <p className="mt-8 max-w-2xl text-sm leading-relaxed text-text-muted">
        For commercial properties, tell us about the building and access when you
        reach out and we&apos;ll come back with a tailored, no-scaffolding drone
        assessment. Prefer to talk it through? Call and we&apos;ll answer your
        questions and schedule your free estimate.
      </p>
    </PageShell>
  );
}

import type { Metadata } from "next";
import { Phone, Mail, MapPin } from "lucide-react";

import { PageShell } from "@/components/site/page-shell";
import { brand } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Skyline Exterior Cleaning for a free estimate. Serving Arkansas & Oklahoma.",
};

export default function ContactPage() {
  return (
    <PageShell
      title="Contact Us"
      subtitle="Free estimates, fast responses. Reach out and we'll take care of the rest."
    >
      <ul className="grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
        <li className="flex flex-col gap-2 rounded-xl border border-line bg-white p-5 shadow-card">
          <Phone className="h-5 w-5 text-brand" aria-hidden="true" />
          <span className="text-sm font-semibold text-ink">Call</span>
          <a href={brand.phoneHref} className="text-sm text-text-muted hover:text-brand">
            {brand.phoneDisplay}
          </a>
        </li>
        <li className="flex flex-col gap-2 rounded-xl border border-line bg-white p-5 shadow-card">
          <Mail className="h-5 w-5 text-brand" aria-hidden="true" />
          <span className="text-sm font-semibold text-ink">Email</span>
          <a href={brand.emailHref} className="break-all text-sm text-text-muted hover:text-brand">
            {brand.email}
          </a>
        </li>
        <li className="flex flex-col gap-2 rounded-xl border border-line bg-white p-5 shadow-card">
          <MapPin className="h-5 w-5 text-brand" aria-hidden="true" />
          <span className="text-sm font-semibold text-ink">Based in</span>
          <span className="text-sm text-text-muted">{brand.city}</span>
        </li>
      </ul>
    </PageShell>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { MapPin } from "lucide-react";

import { PageShell } from "@/components/site/page-shell";
import { brand, serviceAreas } from "@/lib/site-config";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Service Areas in Arkansas & Oklahoma",
  description:
    "Drone power washing and commercial building cleaning across Little Rock, Oklahoma City, and surrounding AR & OK communities.",
};

export default function ServiceAreasPage() {
  return (
    <PageShell
      title="Service Areas"
      subtitle="Proudly serving commercial and residential properties across Arkansas and Oklahoma."
    >
      <div className="max-w-2xl space-y-4 text-base leading-relaxed text-text">
        <p>
          From drone power washing in Little Rock to commercial building washing
          in Oklahoma City, we bring no-scaffolding, no-lift exterior cleaning to
          properties across both states. Our hybrid model means the same crew can
          clean a high-rise facade from the air and handle the driveway and
          storefront windows on the ground.
        </p>
        <p>
          We&apos;re based in {brand.city} and travel throughout central Arkansas
          and the Oklahoma City metro for commercial work. If you manage multiple
          locations, we&apos;re happy to coordinate across sites.
        </p>
      </div>

      <div className="mt-10 grid max-w-3xl grid-cols-1 gap-8 sm:grid-cols-2">
        <div className="rounded-xl border border-line bg-white p-6 shadow-card">
          <h2 className="flex items-center gap-2 font-display text-lg font-semibold uppercase tracking-wide text-ink">
            <MapPin className="h-5 w-5 text-brand" aria-hidden="true" />
            Arkansas
          </h2>
          <ul className="mt-4 space-y-2 text-text-muted">
            {serviceAreas.AR.map((c) => (
              <li key={c}>{c}</li>
            ))}
            <li className="italic text-text-muted/80">{serviceAreas.note}</li>
          </ul>
        </div>
        <div className="rounded-xl border border-line bg-white p-6 shadow-card">
          <h2 className="flex items-center gap-2 font-display text-lg font-semibold uppercase tracking-wide text-ink">
            <MapPin className="h-5 w-5 text-brand" aria-hidden="true" />
            Oklahoma
          </h2>
          <ul className="mt-4 space-y-2 text-text-muted">
            {serviceAreas.OK.map((c) => (
              <li key={c}>{c}</li>
            ))}
            <li className="italic text-text-muted/80">{serviceAreas.note}</li>
          </ul>
        </div>
      </div>

      <div className="mt-10 max-w-2xl rounded-xl border border-line bg-surface-muted p-6">
        <p className="text-sm text-text">
          <span className="font-semibold text-ink">Don&apos;t see your city?</span>{" "}
          We very likely cover it. Give us a call at{" "}
          <a href={brand.phoneHref} className="font-semibold text-brand hover:text-brand-bright">
            {brand.phoneDisplay}
          </a>{" "}
          and we&apos;ll let you know.
        </p>
        <Button asChild className="mt-5">
          <Link href="/quote-request">Get a Free Quote</Link>
        </Button>
      </div>
    </PageShell>
  );
}

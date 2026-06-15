import type { Metadata } from "next";

import { PageShell } from "@/components/site/page-shell";
import { serviceAreas } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Service Areas",
  description:
    "Skyline Exterior Cleaning serves Little Rock, Oklahoma City, and surrounding communities across Arkansas & Oklahoma.",
};

export default function ServiceAreasPage() {
  return (
    <PageShell
      title="Service Areas"
      subtitle="Proudly serving communities across Arkansas & Oklahoma."
    >
      <div className="grid max-w-2xl grid-cols-1 gap-8 sm:grid-cols-2">
        <div>
          <h2 className="font-display text-lg font-semibold uppercase tracking-wide text-ink">
            Arkansas
          </h2>
          <ul className="mt-3 space-y-2 text-text-muted">
            {serviceAreas.AR.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-display text-lg font-semibold uppercase tracking-wide text-ink">
            Oklahoma
          </h2>
          <ul className="mt-3 space-y-2 text-text-muted">
            {serviceAreas.OK.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </div>
      <p className="mt-6 text-sm italic text-text-muted">{serviceAreas.note}</p>
    </PageShell>
  );
}

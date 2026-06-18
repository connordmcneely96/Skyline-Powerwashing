import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageShell } from "@/components/site/page-shell";
import { services } from "@/lib/site-config";

interface Params {
  params: { slug: string };
}

// Only the known service slugs exist — keeps the route fully static (no runtime
// SSR), which is required for the Cloudflare Pages / edge build.
export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) return { title: "Service" };
  return {
    title: service.title,
    description: service.desc,
  };
}

export default function ServicePage({ params }: Params) {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) notFound();

  return (
    <PageShell title={service.title} subtitle={service.desc}>
      <p className="max-w-2xl text-text-muted">
        Detailed information about our {service.title.toLowerCase()} service is
        coming soon. Request a free quote and we&apos;ll walk you through exactly
        what your property needs.
      </p>
    </PageShell>
  );
}

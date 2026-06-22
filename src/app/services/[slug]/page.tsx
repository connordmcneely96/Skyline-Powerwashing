import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CircleCheck, PlaneTakeoff, ArrowRight } from "lucide-react";

import { allServices, brand } from "@/lib/site-config";
import { PageShell } from "@/components/site/page-shell";
import { iconMap } from "@/components/icons";

interface Params {
  params: { slug: string };
}

// Only the known service slugs exist — keeps the route fully static (no runtime
// SSR), which is required for the Cloudflare Pages / edge build.
export const dynamicParams = false;

export function generateStaticParams() {
  return allServices.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const service = allServices.find((s) => s.slug === params.slug);
  if (!service) return { title: "Service" };
  return {
    title: service.title,
    description: service.seoDescription ?? service.desc,
  };
}

export default function ServicePage({ params }: Params) {
  const service = allServices.find((s) => s.slug === params.slug);
  if (!service) notFound();

  const Icon = iconMap[service.icon];
  const isDrone = service.category === "drone";

  return (
    <PageShell title={service.title} subtitle={service.desc}>
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]">
        {/* Main copy */}
        <div className="max-w-2xl">
          <span
            className={
              "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider " +
              (isDrone
                ? "bg-brand text-white"
                : "bg-surface-muted text-text-muted")
            }
          >
            {isDrone ? (
              <>
                <PlaneTakeoff className="h-3 w-3" aria-hidden="true" />
                Drone-Powered
              </>
            ) : (
              "Ground Crew Service"
            )}
          </span>

          <div className="mt-6 space-y-4">
            {service.longBody.map((para) => (
              <p key={para.slice(0, 24)} className="text-base leading-relaxed text-text">
                {para}
              </p>
            ))}
          </div>

          <h2 className="mt-10 font-display text-xl font-semibold uppercase tracking-wide text-ink">
            Why It Works
          </h2>
          <ul className="mt-4 space-y-3">
            {service.benefits.map((b) => (
              <li key={b} className="flex items-start gap-3">
                <CircleCheck
                  className="mt-0.5 h-5 w-5 shrink-0 text-brand"
                  aria-hidden="true"
                />
                <span className="text-sm leading-relaxed text-text">{b}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Sidebar */}
        <aside className="space-y-4 lg:pt-1">
          <div className="rounded-xl border border-line bg-white p-6 shadow-card">
            <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand/10 text-brand">
              <Icon className="h-6 w-6" aria-hidden="true" />
            </span>
            <h2 className="mt-4 font-display text-sm font-semibold uppercase tracking-wider text-ink">
              Who It&apos;s For
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-text-muted">
              {service.forWho}
            </p>
            {isDrone && (
              <p className="mt-3 text-xs text-text-muted">{brand.pilotLine}</p>
            )}
            <Link
              href={
                isDrone ? "/quote-request?type=commercial" : "/quote-request"
              }
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition-colors hover:text-brand-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            >
              Get a free quote
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </aside>
      </div>
    </PageShell>
  );
}

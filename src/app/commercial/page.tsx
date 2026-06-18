import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Phone, ArrowRight, CircleCheck } from "lucide-react";

import {
  brand,
  commercialValue,
  commercialAudience,
} from "@/lib/site-config";
import { iconMap } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Commercial Drone Cleaning",
  description:
    "Clean your entire building from the air — facades, roofs, high windows, and solar up to ~150 ft. No scaffolding, no lift rental, nobody working at height. Serving Arkansas & Oklahoma.",
};

// Pre-set the quote form to the commercial branch.
const COMMERCIAL_QUOTE = "/quote-request?type=commercial";

export default function CommercialPage() {
  return (
    <>
      {/* Hero band */}
      <section className="relative overflow-hidden bg-ink pb-20 pt-36 text-white">
        <Image
          src="/images/skyline.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/50"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-brand-bright">
            Commercial Services
          </p>
          <h1
            className="mt-4 max-w-3xl font-display font-bold uppercase leading-[1.04]"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            Clean Your Entire Building — From the Air
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/85">
            Facades, roofs, high windows, and solar up to ~150&nbsp;ft with{" "}
            <span className="font-semibold text-white">no scaffolding</span>,{" "}
            <span className="font-semibold text-white">no lift rental</span>, and{" "}
            <span className="font-semibold text-white">nobody working at height</span>
            {" "}— faster, safer, and typically cheaper than traditional methods.
          </p>
          <p className="mt-3 text-sm font-medium text-white/70">
            {brand.pilotLine}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href={COMMERCIAL_QUOTE}>
                Get a Commercial Quote
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={brand.phoneHref}>
                <Phone aria-hidden="true" />
                Call Now
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Value prop grid */}
      <section className="bg-surface py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Why Drone Cleaning Wins"
              title="The Commercial Advantage"
              subtitle="Drone-powered cleaning removes the most expensive, slowest, and riskiest parts of multi-story exterior work."
            />
          </Reveal>
          <ul className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {commercialValue.map((item, i) => {
              const Icon = iconMap[item.icon];
              return (
                <Reveal
                  as="li"
                  key={item.title}
                  delay={i * 0.05}
                  className="rounded-xl border border-line bg-white p-6 shadow-card"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand/10 text-brand">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">
                    {item.desc}
                  </p>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Who it's for */}
      <section className="bg-surface-muted py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <SectionHeading
                align="left"
                eyebrow="Who We Serve"
                title="Built for Commercial Properties"
                subtitle="If you manage a building, a campus, or a portfolio, drone cleaning keeps exteriors sharp with minimal disruption to tenants and customers."
                className="max-w-none"
              />
              <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {commercialAudience.map((who) => (
                  <li
                    key={who}
                    className="flex items-center gap-2.5 rounded-lg border border-line bg-white px-4 py-3 text-sm font-medium text-ink shadow-sm"
                  >
                    <CircleCheck
                      className="h-5 w-5 shrink-0 text-brand"
                      aria-hidden="true"
                    />
                    {who}
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Safety + cost story */}
            <Reveal y={0}>
              <div className="rounded-xl border border-line bg-ink p-8 text-white shadow-card">
                <h3 className="font-display text-xl font-semibold uppercase tracking-wide">
                  The Safety &amp; Cost Story
                </h3>
                <dl className="mt-6 space-y-5 text-sm">
                  <div>
                    <dt className="font-semibold text-brand-bright">
                      Safer by design
                    </dt>
                    <dd className="mt-1 text-white/75">
                      Cleaning from the air means no workers on ladders,
                      scaffolding, or lifts — reducing fall risk and the
                      liability that comes with at-height work on your property.
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-brand-bright">
                      Less equipment, less cost
                    </dt>
                    <dd className="mt-1 text-white/75">
                      No boom-lift rental, permits, or scaffolding setup. That
                      removes line items and labor hours, which typically makes
                      aerial cleaning more cost-effective on multi-story jobs.
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-brand-bright">
                      Faster, with less disruption
                    </dt>
                    <dd className="mt-1 text-white/75">
                      Minimal rigging means we cover large facades quickly and
                      keep walkways, entrances, and parking areas open for
                      tenants and customers.
                    </dd>
                  </div>
                </dl>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-brand to-ink py-20 text-white sm:py-24">
        <Reveal className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2
            className="font-display font-bold uppercase leading-tight"
            style={{ fontSize: "clamp(1.875rem, 4.5vw, 3rem)" }}
          >
            Ready for a No-Scaffolding Assessment?
            <span className="mt-2 block text-brand-bright">
              Get a Commercial Quote
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base text-white/85">
            Tell us about your property and we&apos;ll put together a tailored,
            drone-powered cleaning plan.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="bg-white text-brand hover:bg-white/90">
              <Link href={COMMERCIAL_QUOTE}>Request Commercial Quote</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={brand.phoneHref}>
                <Phone aria-hidden="true" />
                {brand.phoneDisplay}
              </a>
            </Button>
          </div>
        </Reveal>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import { PlaneTakeoff, Building2, ShieldCheck, MapPin } from "lucide-react";

import { PageShell } from "@/components/site/page-shell";
import { brand } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About Our Drone-Powered Cleaning Company",
  description:
    "Skyline is a locally owned, drone-powered exterior cleaning company bringing safer, faster commercial cleaning to Arkansas & Oklahoma.",
};

const VALUES = [
  {
    icon: PlaneTakeoff,
    title: "Drone-Powered",
    desc: "We clean from the air — facades, roofs, high windows, and solar up to ~150 ft — so no one has to work at height.",
  },
  {
    icon: Building2,
    title: "Commercial-First, Hybrid",
    desc: "Drone work leads for multi-story properties; a ground crew handles homes, driveways, and flatwork.",
  },
  {
    icon: ShieldCheck,
    title: "Certified Piloting",
    desc: "Every flight is operated by an FAA Part 107 certified remote pilot, by the book.",
  },
  {
    icon: MapPin,
    title: "Local & Owner-Operated",
    desc: "Based in Little Rock, serving Arkansas and Oklahoma with honest, reliable work.",
  },
];

export default function AboutPage() {
  return (
    <PageShell
      title="About Skyline"
      subtitle="A locally owned, drone-powered exterior cleaning company serving Arkansas & Oklahoma."
    >
      <div className="max-w-2xl space-y-4 text-base leading-relaxed text-text">
        <p>
          Skyline Exterior Cleaning was built around a simple idea: cleaning a
          building shouldn&apos;t require scaffolding, boom lifts, or anyone
          risking a fall. We&apos;re a new, locally owned operation bringing
          drone-powered exterior cleaning to commercial and multi-story
          properties across Arkansas and Oklahoma — a safer, faster, and often
          lower-cost alternative to the way this work has always been done.
        </p>
        <p>
          Our model is hybrid by design. For facades, roofs, high windows, and
          solar, we clean from the air with a drone flown by an FAA Part 107
          certified pilot. For houses, driveways, and flatwork, a traditional
          ground crew handles the job. That combination lets us take care of an
          entire property — top to bottom — without the cost and disruption of
          renting lifts or closing off your site.
        </p>
        <p>
          We&apos;re owner-operated and community-minded. That means you deal
          with people who answer the phone, show up when they say they will, and
          stand behind the work. We&apos;re just getting started in this market,
          and we intend to earn our reputation one spotless building at a time.
        </p>
        {/* TODO(owner): If you'd like to add credibility, we can mention that the
            team also runs a local exterior-maintenance / landscaping operation.
            Leave this out until you confirm you want it stated. */}
        {/* TODO(owner): Add an insurance line here once commercial liability
            coverage is bound (e.g., "fully insured commercial operations"). */}
      </div>

      <ul className="mt-12 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
        {VALUES.map((v) => {
          const Icon = v.icon;
          return (
            <li
              key={v.title}
              className="flex gap-4 rounded-xl border border-line bg-white p-6 shadow-card"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h2 className="text-base font-semibold text-ink">{v.title}</h2>
                <p className="mt-1 text-sm leading-relaxed text-text-muted">
                  {v.desc}
                </p>
              </div>
            </li>
          );
        })}
      </ul>

      <p className="mt-10 max-w-2xl text-sm text-text-muted">
        Questions about your property? Call us at{" "}
        <a href={brand.phoneHref} className="font-semibold text-brand hover:text-brand-bright">
          {brand.phoneDisplay}
        </a>{" "}
        or email{" "}
        <a href={brand.emailHref} className="font-semibold text-brand hover:text-brand-bright">
          {brand.email}
        </a>
        .
      </p>
    </PageShell>
  );
}

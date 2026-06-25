import type { Metadata } from "next";
import { PlaneTakeoff, Building2, ShieldCheck, MapPin } from "lucide-react";

import { PageShell } from "@/components/site/page-shell";
import { brand } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About Our Drone-Powered Cleaning Company",
  description:
    "The story behind Skyline — a locally owned, drone-powered exterior cleaning company bringing safer, faster commercial cleaning to Arkansas & Oklahoma.",
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
      {/* Our Story */}
      <div className="max-w-2xl">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">
          Our Story
        </p>
        <p className="mt-3 text-2xl font-bold leading-snug tracking-tight text-ink sm:text-3xl">
          Every company starts with an idea. Skyline started with an obsession.
        </p>

        <div className="mt-6 space-y-4 text-base leading-relaxed text-text">
          <p>
            It began late one night, long after everyone else had gone to bed,
            with a problem that had gone unsolved for decades. Keeping a building
            clean still meant putting people on lifts, ropes, and ladders,
            working at dangerous heights to get it done. It worked — but it never
            sat right with us. There had to be a better way.
          </p>
          <p>
            That kind of idea needs the right partner, and there was only one
            call to make. Within minutes of sharing the vision, we were both
            hooked. We weren&apos;t talking about another side project; we were
            talking about the future of exterior cleaning — safer, faster, more
            efficient, and more affordable than the way it had always been done.
            A future where drones do the dangerous work instead of people.
          </p>
          <p>
            But an idea is worthless without action. We knew Skyline
            couldn&apos;t become one more plan that stayed on paper, so we got to
            work. Between full-time responsibilities and everyday life, we built
            it in the margins — hours after everyone else was asleep, minutes
            squeezed out of busy days. Every conversation, every plan, every late
            night moved the vision one step closer to real. We ran on short sleep
            and long determination, because every sacrifice had a purpose.
          </p>
          <p>
            Today, Skyline is built on a simple belief: innovation should make
            life better. By putting advanced drone technology to work, we remove
            the risks that come with traditional exterior cleaning — no one
            hanging from ropes, no one exposed to unnecessary heights. Just
            smarter technology delivering exceptional results.
          </p>
          <p>
            What started as a late-night conversation between two friends is now
            a company with a mission: to redefine the future of exterior
            cleaning.
          </p>
        </div>

        <blockquote className="mt-8 border-l-4 border-brand pl-5">
          <p className="text-lg font-semibold text-ink sm:text-xl">
            We&apos;re not here to follow the industry. We&apos;re here to change
            it.
          </p>
          <p className="mt-1 text-base text-text-muted">
            And this is only the beginning.
          </p>
        </blockquote>

        {/* TODO(owner): Add an insurance line once commercial liability coverage
            is bound (e.g., "fully insured commercial operations"). */}
      </div>

      {/* What we stand for */}
      <p className="mt-14 text-xs font-bold uppercase tracking-[0.2em] text-brand">
        What We Stand For
      </p>
      <ul className="mt-4 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
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

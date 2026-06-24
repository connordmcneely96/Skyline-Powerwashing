import Image from "next/image";
import Link from "next/link";
import { ArrowRight, PlaneTakeoff } from "lucide-react";

import { droneServices, groundServices, type Service } from "@/lib/site-config";
import { iconMap } from "@/components/icons";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = iconMap[service.icon];
  return (
    <Reveal as="li" delay={index * 0.06} className="h-full">
      <Link
        href={`/services/${service.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src={`/images/${service.slug}.jpg`}
            alt={`${service.title} service`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {service.category === "drone" && (
            <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-brand px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-white shadow">
              <PlaneTakeoff className="h-3 w-3" aria-hidden="true" />
              Drone
            </span>
          )}
        </div>

        <div className="relative flex flex-1 flex-col px-5 pb-6 pt-8">
          <span className="absolute -top-6 left-5 flex h-12 w-12 items-center justify-center rounded-full bg-brand text-white shadow-md ring-4 ring-white">
            <Icon className="h-6 w-6" aria-hidden="true" />
          </span>

          <h3 className="text-[1.05rem] font-semibold text-ink">
            {service.title}
          </h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-text-muted">
            {service.desc}
          </p>
          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition-colors group-hover:text-brand-bright">
            Learn More
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

export function Services() {
  return (
    <section id="services" className="scroll-mt-24 bg-surface py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Drone-led headline group */}
        <Reveal>
          <SectionHeading
            eyebrow="Our Headline Offer"
            title="Drone-Powered Cleaning"
            subtitle="Reach facades, roofs, high windows, and solar arrays from the air — no scaffolding, no lifts, nobody at height. Ideal for commercial and multi-story properties."
          />
        </Reveal>

        <ul className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {droneServices.map((service, i) => (
            <ServiceCard key={service.slug} service={service} index={i} />
          ))}
        </ul>

        {/* Ground-supported group */}
        <Reveal className="mt-20">
          <SectionHeading
            eyebrow="The Hybrid Advantage"
            title="Ground Crew Services"
            subtitle="A traditional crew handles homes, driveways, and flatwork — the everyday cleaning that keeps your whole property looking its best."
          />
        </Reveal>

        <ul className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {groundServices.map((service, i) => (
            <ServiceCard key={service.slug} service={service} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}

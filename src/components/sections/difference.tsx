import Image from "next/image";

import { resolveDifference } from "@/lib/site-config";
import { iconMap } from "@/components/icons";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

export function Difference() {
  const difference = resolveDifference();
  return (
    <section className="bg-surface py-20 sm:py-24 lg:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        {/* Left — text + grid */}
        <div>
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow="Why Skyline"
              title="The Skyline Difference"
              className="max-w-none"
            />
          </Reveal>

          <ul className="mt-10 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2">
            {difference.map((item, i) => {
              const Icon = iconMap[item.icon];
              return (
                <Reveal as="li" key={item.title} delay={i * 0.05} className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-ink">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-text-muted">
                      {item.desc}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </div>

        {/* Right — image */}
        <Reveal y={0} className="order-first lg:order-last">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-line shadow-card">
            <Image
              src="/images/skyline.jpg"
              alt="Drone flying over a city skyline at dusk"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

import { CircleCheck } from "lucide-react";

import { trustBadges } from "@/lib/site-config";

export function TrustBar() {
  return (
    <section aria-label="Why choose us" className="bg-ink-2 text-white">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <ul className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3 lg:grid-cols-5">
          {trustBadges.map((badge) => (
            <li
              key={badge}
              className="flex items-center justify-center gap-2.5 text-center text-sm font-medium"
            >
              <CircleCheck
                className="h-5 w-5 shrink-0 text-brand-bright"
                aria-hidden="true"
              />
              <span>{badge}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

import Link from "next/link";
import { Phone, Mail, MapPin, ShieldCheck } from "lucide-react";

import {
  brand,
  quickLinks,
  serviceAreas,
  copyrightYear,
} from "@/lib/site-config";
import { Logo } from "@/components/site/logo";
import { FacebookIcon, GoogleIcon } from "@/components/icons";

export function Footer() {
  return (
    <footer className="bg-ink text-white/80">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Col 1 — brand */}
          <div>
            <Logo tone="light" />
            <p className="mt-4 max-w-xs text-sm text-white/65">
              {brand.serving}. Drone-powered cleaning for commercial and
              multi-story properties, plus a ground crew for homes and flatwork.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href={brand.social.facebook}
                aria-label="Follow us on Facebook"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <FacebookIcon className="h-5 w-5" />
              </a>
              <a
                href={brand.social.google}
                aria-label="Find us on Google"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <GoogleIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Col 2 — contact */}
          <div>
            <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
              Contact Us
            </h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={brand.phoneHref}
                  className="inline-flex items-center gap-3 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <Phone className="h-4 w-4 shrink-0 text-brand-bright" aria-hidden="true" />
                  {brand.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={brand.emailHref}
                  className="inline-flex items-center gap-3 break-all transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <Mail className="h-4 w-4 shrink-0 text-brand-bright" aria-hidden="true" />
                  {brand.email}
                </a>
              </li>
              <li className="inline-flex items-center gap-3">
                <MapPin className="h-4 w-4 shrink-0 text-brand-bright" aria-hidden="true" />
                {brand.city}
              </li>
              <li className="text-white/60">{brand.serving}</li>
            </ul>
          </div>

          {/* Col 3 — quick links */}
          <div>
            <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h2>
            <ul className="mt-4 space-y-3 text-sm">
              {quickLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — service areas */}
          <div>
            <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
              Service Areas
            </h2>
            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="mb-2 font-semibold text-brand-bright">Arkansas</p>
                <ul className="space-y-1.5 text-white/70">
                  {serviceAreas.AR.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-2 font-semibold text-brand-bright">Oklahoma</p>
                <ul className="space-y-1.5 text-white/70">
                  {serviceAreas.OK.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="mt-4 text-xs italic text-white/55">
              {serviceAreas.note}
            </p>
            {/* HONESTY: verifiable claim only. TODO(owner): add an insurance
                tag here once commercial liability coverage is in place. */}
            <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white">
              <ShieldCheck className="h-4 w-4 text-brand-bright" aria-hidden="true" />
              FAA Part 107 Certified Pilot
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-white/55">
          © {copyrightYear} {brand.name}. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

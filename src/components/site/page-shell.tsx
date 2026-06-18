import Link from "next/link";
import { Phone } from "lucide-react";

import { brand } from "@/lib/site-config";
import { Button } from "@/components/ui/button";

interface PageShellProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

/**
 * Shared layout for stub/inner pages: a navy hero band (clears the fixed header)
 * + a content slot + a closing CTA. Real page content drops into `children`.
 */
export function PageShell({ title, subtitle, children }: PageShellProps) {
  return (
    <>
      <section className="bg-ink pb-16 pt-36 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1
            className="font-display font-bold uppercase leading-tight"
            style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)" }}
          >
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 max-w-2xl text-base text-white/80">{subtitle}</p>
          )}
        </div>
      </section>

      <section className="bg-surface py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {children ?? (
            <p className="max-w-2xl text-text-muted">
              This page is coming soon. In the meantime, give us a call or
              request a free quote and we&apos;ll get right back to you.
            </p>
          )}

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/quote-request">Get Free Quote</Link>
            </Button>
            <Button asChild size="lg" variant="outline-ink">
              <a href={brand.phoneHref}>
                <Phone aria-hidden="true" />
                {brand.phoneDisplay}
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

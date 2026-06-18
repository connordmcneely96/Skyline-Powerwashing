import Link from "next/link";
import { Phone } from "lucide-react";

import { brand } from "@/lib/site-config";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";

export function CtaBanner() {
  return (
    <section className="bg-gradient-to-br from-brand to-ink py-20 text-white sm:py-24">
      <Reveal className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h2
          className="font-display font-bold uppercase leading-tight"
          style={{ fontSize: "clamp(1.875rem, 4.5vw, 3rem)" }}
        >
          Ready to Restore Your Property?
          <span className="mt-2 block text-brand-bright">
            Get a Free Quote Today!
          </span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base text-white/85">
          {brand.serving}. Fast, friendly, and fully insured — let&apos;s make
          your property shine.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild size="lg" variant="outline">
            <a href={brand.phoneHref}>
              <Phone aria-hidden="true" />
              Call Now
            </a>
          </Button>
          <Button asChild size="lg" className="bg-white text-brand hover:bg-white/90">
            <Link href="/quote-request">Request Quote</Link>
          </Button>
        </div>
      </Reveal>
    </section>
  );
}

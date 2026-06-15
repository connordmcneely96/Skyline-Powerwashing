import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-surface px-4 pt-20">
      <div className="text-center">
        <p className="font-display text-7xl font-bold text-brand">404</p>
        <h1 className="mt-4 font-display text-2xl font-semibold uppercase text-ink">
          Page Not Found
        </h1>
        <p className="mt-3 text-text-muted">
          Sorry, we couldn&apos;t find the page you were looking for.
        </p>
        <Button asChild className="mt-8">
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </section>
  );
}

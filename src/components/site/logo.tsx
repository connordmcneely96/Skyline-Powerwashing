import Image from "next/image";
import Link from "next/link";

import { brand } from "@/lib/site-config";
import { cn } from "@/lib/utils";

interface LogoProps {
  /** Text color treatment — light for dark backgrounds, dark for light. */
  tone?: "light" | "dark";
  className?: string;
  /** Hide the wordmark, show emblem only (e.g. tight spaces). */
  emblemOnly?: boolean;
}

/**
 * Logo lockup: emblem (skyline + drone) + stacked "SKYLINE / EXTERIOR CLEANING"
 * wordmark. Swap /images/logo.svg for the real mark — the lockup is structural.
 */
export function Logo({ tone = "light", className, emblemOnly = false }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label={`${brand.name} — home`}
      className={cn(
        "group inline-flex items-center gap-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
        className
      )}
    >
      <Image
        src="/images/logo.svg"
        alt=""
        width={44}
        height={44}
        className="h-11 w-11 rounded-lg"
        priority
      />
      {!emblemOnly && (
        <span className="flex flex-col leading-none">
          <span
            className={cn(
              "font-display text-lg font-bold uppercase tracking-tight",
              tone === "light" ? "text-white" : "text-ink"
            )}
          >
            Skyline
          </span>
          <span
            className={cn(
              "font-display text-[0.7rem] font-medium uppercase tracking-[0.18em]",
              tone === "light" ? "text-white/75" : "text-text-muted"
            )}
          >
            Exterior Cleaning
          </span>
        </span>
      )}
    </Link>
  );
}

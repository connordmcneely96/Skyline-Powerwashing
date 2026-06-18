"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";

import { brand } from "@/lib/site-config";
import { Button } from "@/components/ui/button";

export function Hero() {
  const reduceMotion = useReducedMotion();

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };
  const item = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section className="relative flex min-h-[85vh] items-center overflow-hidden bg-ink">
      {/* Background photo */}
      <Image
        src="/images/hero.png"
        alt="Drone cleaning the upper facade of a multi-story commercial building"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {/* Left-to-right dark gradient for text legibility */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/30"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent"
        aria-hidden="true"
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative mx-auto w-full max-w-7xl px-4 pb-16 pt-28 sm:px-6 lg:px-8"
      >
        <div className="max-w-2xl">
          <motion.p
            variants={item}
            className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-brand-bright"
          >
            Commercial &amp; Residential · {brand.serving}
          </motion.p>

          <motion.h1
            variants={item}
            className="mt-4 font-display font-bold uppercase leading-[1.02] text-white"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
          >
            Drone-Powered
            <br />
            Exterior Cleaning
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-3 font-display text-xl font-semibold uppercase tracking-wide text-brand-bright sm:text-2xl"
          >
            For Commercial &amp; Multi-Story Properties
          </motion.p>

          <motion.p
            variants={item}
            className="mt-5 max-w-xl text-base leading-relaxed text-white/90"
          >
            Clean your entire building — facades, roofs, high windows, and solar
            — up to ~150&nbsp;ft with{" "}
            <span className="font-semibold text-white">no scaffolding</span>,{" "}
            <span className="font-semibold text-white">no lift rental</span>, and{" "}
            <span className="font-semibold text-white">nobody working at height</span>.
            Plus a traditional ground crew for homes, driveways, and flatwork.
          </motion.p>

          <motion.p
            variants={item}
            className="mt-3 text-sm font-medium text-white/70"
          >
            {brand.pilotLine}
          </motion.p>

          <motion.div
            variants={item}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Button asChild size="lg">
              <Link href="/quote-request">Get a Free Quote</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/commercial">
                Commercial Services
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </motion.div>

          <motion.p
            variants={item}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white ring-1 ring-white/15 backdrop-blur"
          >
            <MapPin className="h-4 w-4 text-brand-bright" aria-hidden="true" />
            {brand.serving}
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}

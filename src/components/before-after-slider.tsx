"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

interface BeforeAfterSliderProps {
  beforeSrc: string;
  afterSrc: string;
  /** Used to build descriptive alt text, e.g. "House Wash". */
  label: string;
  className?: string;
  /** Initial divider position, 0–100. */
  initial?: number;
}

/**
 * Draggable before/after comparison. The "after" image sits on the bottom; the
 * "before" image is clipped on top and revealed by a draggable vertical handle.
 * Works with pointer (mouse + touch) and keyboard (arrow/Home/End). Exposed as a
 * native slider via role="slider" + aria-value*.
 */
export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  label,
  className,
  initial = 50,
}: BeforeAfterSliderProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [position, setPosition] = React.useState(initial);
  const [dragging, setDragging] = React.useState(false);

  const setFromClientX = React.useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    setDragging(true);
    setFromClientX(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    setFromClientX(e.clientX);
  };

  const stopDragging = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    setDragging(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const step = e.shiftKey ? 10 : 2;
    let next: number | null = null;
    switch (e.key) {
      case "ArrowLeft":
      case "ArrowDown":
        next = position - step;
        break;
      case "ArrowRight":
      case "ArrowUp":
        next = position + step;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = 100;
        break;
    }
    if (next !== null) {
      e.preventDefault();
      setPosition(Math.min(100, Math.max(0, next)));
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "group relative aspect-[4/3] w-full select-none overflow-hidden rounded-xl border border-white/10 bg-ink",
        dragging ? "cursor-grabbing" : "cursor-ew-resize",
        className
      )}
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerDown}
      onPointerUp={stopDragging}
      onPointerLeave={stopDragging}
      onPointerCancel={stopDragging}
    >
      {/* AFTER (bottom layer) */}
      <Image
        src={afterSrc}
        alt={`${label} — after professional cleaning`}
        fill
        sizes="(max-width: 768px) 90vw, 33vw"
        className="object-cover"
        draggable={false}
      />
      <span className="pointer-events-none absolute right-3 top-3 z-20 rounded-full bg-brand px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-white shadow">
        After
      </span>

      {/* BEFORE (clipped top layer) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image
          src={beforeSrc}
          alt={`${label} — before cleaning`}
          fill
          sizes="(max-width: 768px) 90vw, 33vw"
          className="object-cover"
          draggable={false}
        />
        <span className="pointer-events-none absolute left-3 top-3 z-20 rounded-full bg-ink/80 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-white shadow ring-1 ring-white/20">
          Before
        </span>
      </div>

      {/* Divider + handle */}
      <div
        className="absolute inset-y-0 z-30 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_0_1px_rgba(10,27,51,0.25)]"
        style={{ left: `${position}%` }}
      >
        <div
          role="slider"
          tabIndex={0}
          aria-label={`${label}: drag to compare before and after`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(position)}
          aria-valuetext={`${Math.round(position)}% before revealed`}
          onKeyDown={handleKeyDown}
          className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-grab touch-none items-center justify-center rounded-full bg-white text-ink shadow-card-hover ring-1 ring-ink/10 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand active:cursor-grabbing"
        >
          <ChevronLeft className="h-4 w-4 -mr-1" aria-hidden="true" />
          <ChevronRight className="h-4 w-4 -ml-1" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}

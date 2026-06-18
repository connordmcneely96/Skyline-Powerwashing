"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";

interface RevealProps extends HTMLMotionProps<"div"> {
  /** Stagger delay in seconds. */
  delay?: number;
  /** Vertical offset to slide from (px). */
  y?: number;
  as?: "div" | "section" | "li" | "article";
}

/**
 * Scroll-reveal wrapper. Fades + slides children in when they enter the
 * viewport. Honors prefers-reduced-motion by rendering with no transform.
 */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  as = "div",
  ...props
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  if (reduceMotion) {
    return (
      <MotionTag
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.4, delay }}
        {...props}
      >
        {children}
      </MotionTag>
    );
  }

  return (
    <MotionTag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </MotionTag>
  );
}

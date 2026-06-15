import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  /** Optional second line rendered in brand-bright (for dark sections). */
  highlight?: string;
  eyebrow?: string;
  subtitle?: string;
  tone?: "light" | "dark";
  align?: "center" | "left";
  className?: string;
  id?: string;
}

/** Centered section header with a short brand underline accent. */
export function SectionHeading({
  title,
  highlight,
  eyebrow,
  subtitle,
  tone = "light",
  align = "center",
  className,
  id,
}: SectionHeadingProps) {
  const dark = tone === "dark";
  return (
    <div
      className={cn(
        align === "center" ? "mx-auto text-center" : "text-left",
        "max-w-2xl",
        className
      )}
    >
      {eyebrow && (
        <p className="mb-3 font-display text-sm font-semibold uppercase tracking-[0.18em] text-brand">
          {eyebrow}
        </p>
      )}
      <h2
        id={id}
        className={cn(
          "section-heading heading-accent",
          align === "left" && "[&::after]:ml-0",
          dark ? "text-white" : "text-ink"
        )}
      >
        {title}
        {highlight && (
          <>
            {" "}
            <span className="text-brand-bright">{highlight}</span>
          </>
        )}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-5 text-base leading-relaxed",
            dark ? "text-white/75" : "text-text-muted"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

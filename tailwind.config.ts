import type { Config } from "tailwindcss";

/** rgb(var(--token) / <alpha>) so opacity utilities work with our CSS-var tokens. */
const token = (name: string) => `rgb(var(${name}) / <alpha-value>)`;

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: token("--ink"),
        "ink-2": token("--ink-2"),
        brand: token("--brand"),
        "brand-bright": token("--brand-bright"),
        surface: token("--surface"),
        "surface-muted": token("--surface-muted"),
        text: token("--text"),
        "text-muted": token("--text-muted"),
        line: token("--line"),
        ring: token("--ring"),
      },
      fontFamily: {
        display: ["var(--font-oswald)", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 0.25rem)",
        sm: "calc(var(--radius) - 0.375rem)",
        xl: "calc(var(--radius) + 0.25rem)",
      },
      boxShadow: {
        card: "0 1px 2px rgb(10 27 51 / 0.04), 0 8px 24px rgb(10 27 51 / 0.06)",
        "card-hover": "0 2px 6px rgb(10 27 51 / 0.08), 0 16px 40px rgb(10 27 51 / 0.12)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;

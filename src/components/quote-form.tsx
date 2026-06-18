"use client";

import * as React from "react";
import { House, Building2, Loader2, CircleCheck, Phone } from "lucide-react";

import { brand, groundServices } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

type LeadType = "residential" | "commercial";

interface FormState {
  type: LeadType | "";
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zip: string;
  message: string;
  // residential
  serviceInterest: string;
  propertySize: string;
  // commercial
  propertyType: string;
  buildings: string;
  stories: string;
  sqft: string;
  // shared
  heardAbout: string;
  // hidden / attribution
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  referrer: string;
  // honeypot
  companyWebsite: string;
}

const EMPTY: FormState = {
  type: "",
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  zip: "",
  message: "",
  serviceInterest: "",
  propertySize: "",
  propertyType: "",
  buildings: "",
  stories: "",
  sqft: "",
  heardAbout: "",
  utmSource: "",
  utmMedium: "",
  utmCampaign: "",
  referrer: "",
  companyWebsite: "",
};

const PROPERTY_SIZES = [
  "Under 1,500 sq ft",
  "1,500 – 3,000 sq ft",
  "3,000 – 5,000 sq ft",
  "Over 5,000 sq ft",
];

const PROPERTY_TYPES = [
  { value: "apartment", label: "Apartment / Multi-family" },
  { value: "hotel", label: "Hotel / Hospitality" },
  { value: "office", label: "Office / Commercial" },
  { value: "retail", label: "Retail / Storefront" },
  { value: "other", label: "Other" },
];

const HEARD_ABOUT = [
  "Google Search",
  "Social Media",
  "Referral / Word of Mouth",
  "Saw our vehicle / signage",
  "Repeat customer",
  "Other",
];

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function QuoteForm() {
  const [form, setForm] = React.useState<FormState>(EMPTY);
  const [errors, setErrors] = React.useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = React.useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverError, setServerError] = React.useState<string | null>(null);

  // Read query (?type=), UTM params, and referrer on mount — silent attribution.
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const typeParam = params.get("type");
    setForm((prev) => ({
      ...prev,
      type: typeParam === "commercial" || typeParam === "residential" ? typeParam : prev.type,
      utmSource: params.get("utm_source") ?? "",
      utmMedium: params.get("utm_medium") ?? "",
      utmCampaign: params.get("utm_campaign") ?? "",
      referrer: document.referrer ?? "",
    }));
  }, []);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
  };

  function validate(state: FormState) {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!state.type) e.type = "Please choose home or business.";
    if (!state.name.trim()) e.name = "Please enter your name.";
    if (!state.email.trim()) e.email = "Please enter your email.";
    else if (!emailRe.test(state.email)) e.email = "Please enter a valid email.";
    if (!state.phone.trim()) e.phone = "Please enter a phone number.";
    if (!state.city.trim()) e.city = "Please enter your city.";
    if (!state.zip.trim()) e.zip = "Please enter your ZIP code.";
    if (state.type === "residential" && !state.serviceInterest)
      e.serviceInterest = "Please select a service.";
    if (state.type === "commercial" && !state.propertyType)
      e.propertyType = "Please select a property type.";
    return e;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const e = validate(form);
    setErrors(e);
    if (Object.keys(e).length > 0) {
      // Move focus to the first invalid field for accessibility.
      const first = Object.keys(e)[0];
      document.getElementById(first)?.focus();
      return;
    }

    setStatus("submitting");
    setServerError(null);
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      const data = (await res.json().catch(() => ({}))) as { success?: boolean };
      if (data.success === false) throw new Error("Submission was not accepted.");
      setStatus("success");
    } catch (err) {
      // The /api/quote endpoint is built in the backend pass; until it's
      // deployed this will surface a friendly error with a call fallback.
      setStatus("error");
      setServerError(
        err instanceof Error ? err.message : "Something went wrong."
      );
    }
  }

  if (status === "success") {
    const commercial = form.type === "commercial";
    return (
      <div className="rounded-xl border border-line bg-white p-8 text-center shadow-card">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand/10 text-brand">
          <CircleCheck className="h-7 w-7" aria-hidden="true" />
        </span>
        <h2 className="mt-5 font-display text-2xl font-semibold uppercase text-ink">
          Request Received
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-text-muted">
          Thanks, {form.name.split(" ")[0] || "there"}! We&apos;ve got your
          details{commercial ? " for a tailored, no-scaffolding drone assessment" : ""} and
          we&apos;ll reach out shortly. Check your email for a confirmation.
        </p>
        <Button asChild className="mt-6" variant="outline-ink">
          <a href={brand.phoneHref}>
            <Phone aria-hidden="true" />
            Prefer to talk now? {brand.phoneDisplay}
          </a>
        </Button>
      </div>
    );
  }

  const isResidential = form.type === "residential";
  const isCommercial = form.type === "commercial";

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-xl border border-line bg-white p-6 shadow-card sm:p-8"
    >
      {/* Step 1 — type */}
      <fieldset>
        <legend className="mb-3 font-display text-lg font-semibold uppercase tracking-wide text-ink">
          Is this for a home or a business?
        </legend>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {(
            [
              { value: "residential", label: "My Home", icon: House, hint: "Houses, driveways, flatwork" },
              { value: "commercial", label: "My Business", icon: Building2, hint: "Buildings, facades, multi-story" },
            ] as const
          ).map((opt) => {
            const Icon = opt.icon;
            const active = form.type === opt.value;
            return (
              <label
                key={opt.value}
                className={cn(
                  "flex cursor-pointer items-start gap-3 rounded-xl border-2 p-4 transition-colors focus-within:ring-2 focus-within:ring-brand/40",
                  active
                    ? "border-brand bg-brand/5"
                    : "border-line bg-white hover:border-brand/40"
                )}
              >
                <input
                  type="radio"
                  name="type"
                  value={opt.value}
                  checked={active}
                  onChange={() => set("type", opt.value)}
                  className="sr-only"
                />
                <span
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                    active ? "bg-brand text-white" : "bg-surface-muted text-brand"
                  )}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block font-semibold text-ink">{opt.label}</span>
                  <span className="block text-xs text-text-muted">{opt.hint}</span>
                </span>
              </label>
            );
          })}
        </div>
        {errors.type && (
          <p id="type" tabIndex={-1} className="mt-2 text-sm text-red-600">
            {errors.type}
          </p>
        )}
      </fieldset>

      {/* The rest reveals once a type is chosen */}
      <div
        className={cn(
          "transition-opacity",
          form.type ? "mt-8 opacity-100" : "pointer-events-none mt-8 opacity-50"
        )}
        aria-hidden={!form.type}
      >
        {/* Contact details */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field id="name" label="Full Name" required error={errors.name}>
            <Input
              id="name"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              autoComplete="name"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
          </Field>
          <Field id="email" label="Email" required error={errors.email}>
            <Input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              autoComplete="email"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
          </Field>
          <Field id="phone" label="Phone" required error={errors.phone}>
            <Input
              id="phone"
              type="tel"
              value={form.phone}
              onChange={(e) => set("phone", e.target.value)}
              autoComplete="tel"
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "phone-error" : undefined}
            />
          </Field>
          <Field id="address" label="Street Address" error={errors.address}>
            <Input
              id="address"
              value={form.address}
              onChange={(e) => set("address", e.target.value)}
              autoComplete="street-address"
            />
          </Field>
          <Field id="city" label="City" required error={errors.city}>
            <Input
              id="city"
              value={form.city}
              onChange={(e) => set("city", e.target.value)}
              autoComplete="address-level2"
              aria-invalid={!!errors.city}
              aria-describedby={errors.city ? "city-error" : undefined}
            />
          </Field>
          <Field id="zip" label="ZIP Code" required error={errors.zip}>
            <Input
              id="zip"
              inputMode="numeric"
              value={form.zip}
              onChange={(e) => set("zip", e.target.value)}
              autoComplete="postal-code"
              aria-invalid={!!errors.zip}
              aria-describedby={errors.zip ? "zip-error" : undefined}
            />
          </Field>
        </div>

        {/* Residential-only */}
        {isResidential && (
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field id="serviceInterest" label="Service Interest" required error={errors.serviceInterest}>
              <Select
                id="serviceInterest"
                value={form.serviceInterest}
                onChange={(e) => set("serviceInterest", e.target.value)}
                aria-invalid={!!errors.serviceInterest}
                aria-describedby={errors.serviceInterest ? "serviceInterest-error" : undefined}
              >
                <option value="">Select a service…</option>
                {groundServices.map((s) => (
                  <option key={s.slug} value={s.title}>
                    {s.title}
                  </option>
                ))}
                <option value="Drone / High Work">Drone / High Work</option>
                <option value="Not sure yet">Not sure yet</option>
              </Select>
            </Field>
            <Field id="propertySize" label="Property Size" error={errors.propertySize}>
              <Select
                id="propertySize"
                value={form.propertySize}
                onChange={(e) => set("propertySize", e.target.value)}
              >
                <option value="">Select size…</option>
                {PROPERTY_SIZES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </Select>
            </Field>
          </div>
        )}

        {/* Commercial-only */}
        {isCommercial && (
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field id="propertyType" label="Property Type" required error={errors.propertyType}>
              <Select
                id="propertyType"
                value={form.propertyType}
                onChange={(e) => set("propertyType", e.target.value)}
                aria-invalid={!!errors.propertyType}
                aria-describedby={errors.propertyType ? "propertyType-error" : undefined}
              >
                <option value="">Select type…</option>
                {PROPERTY_TYPES.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.label}
                  </option>
                ))}
              </Select>
            </Field>
            <Field id="buildings" label="Number of Buildings" error={errors.buildings}>
              <Input
                id="buildings"
                inputMode="numeric"
                value={form.buildings}
                onChange={(e) => set("buildings", e.target.value)}
                placeholder="e.g. 3"
              />
            </Field>
            <Field id="stories" label="Number of Stories" error={errors.stories}>
              <Input
                id="stories"
                inputMode="numeric"
                value={form.stories}
                onChange={(e) => set("stories", e.target.value)}
                placeholder="e.g. 5"
              />
            </Field>
            <Field id="sqft" label="Estimated Sq Ft" error={errors.sqft}>
              <Input
                id="sqft"
                inputMode="numeric"
                value={form.sqft}
                onChange={(e) => set("sqft", e.target.value)}
                placeholder="e.g. 40,000"
              />
            </Field>
          </div>
        )}

        {/* Message + attribution */}
        <div className="mt-4 grid grid-cols-1 gap-4">
          <Field id="message" label="Anything else we should know?" error={errors.message}>
            <Textarea
              id="message"
              value={form.message}
              onChange={(e) => set("message", e.target.value)}
              placeholder="Tell us about the property, surfaces, timing, or anything specific…"
            />
          </Field>
          <Field id="heardAbout" label="How did you hear about us?" error={errors.heardAbout}>
            <Select
              id="heardAbout"
              value={form.heardAbout}
              onChange={(e) => set("heardAbout", e.target.value)}
            >
              <option value="">Select one…</option>
              {HEARD_ABOUT.map((h) => (
                <option key={h} value={h}>
                  {h}
                </option>
              ))}
            </Select>
          </Field>
        </div>

        {/* Honeypot — visually hidden, off-screen, not announced. Bots fill it. */}
        <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
          <label htmlFor="company_website">Company Website (leave blank)</label>
          <input
            id="company_website"
            name="company_website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={form.companyWebsite}
            onChange={(e) => set("companyWebsite", e.target.value)}
          />
        </div>

        {status === "error" && (
          <div
            role="alert"
            className="mt-6 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            We couldn&apos;t submit your request{serverError ? ` (${serverError})` : ""}.
            Please try again, or call us at{" "}
            <a href={brand.phoneHref} className="font-semibold underline">
              {brand.phoneDisplay}
            </a>
            .
          </div>
        )}

        <Button
          type="submit"
          size="lg"
          className="mt-6 w-full sm:w-auto"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="animate-spin" aria-hidden="true" />
              Sending…
            </>
          ) : (
            "Request My Free Quote"
          )}
        </Button>
      </div>
    </form>
  );
}

/** Label + control + inline error wrapper. */
function Field({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

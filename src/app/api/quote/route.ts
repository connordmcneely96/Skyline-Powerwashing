import { getRequestContext } from "@cloudflare/next-on-pages";
import { z } from "zod";

import type { CloudflareEnv } from "@/lib/cloudflare-env";
import {
  sendEmail,
  ownerEmailHtml,
  customerEmailHtml,
  type QuoteLead,
} from "@/lib/email";

export const runtime = "edge";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RATE_LIMIT_MAX = 5; // submissions per IP per hour
const RATE_LIMIT_WINDOW = 3600;

const str = (max: number) => z.string().trim().max(max).default("");

const leadSchema = z
  .object({
    type: z.enum(["residential", "commercial"]),
    name: z.string().trim().min(1).max(120),
    email: z.string().trim().min(3).max(200).regex(EMAIL_RE, "Invalid email"),
    phone: str(40),
    address: str(200),
    city: str(120),
    zip: str(20),
    message: str(4000),
    serviceInterest: str(120),
    propertySize: str(120),
    propertyType: str(60),
    buildings: str(20),
    stories: str(20),
    sqft: str(30),
    heardAbout: str(120),
    utmSource: str(200),
    utmMedium: str(200),
    utmCampaign: str(200),
    referrer: str(500),
    // honeypot — must be empty for a real human
    companyWebsite: z.string().max(200).default(""),
  })
  .superRefine((data, ctx) => {
    if (data.type === "residential" && !data.serviceInterest) {
      ctx.addIssue({
        code: "custom",
        path: ["serviceInterest"],
        message: "Service interest is required.",
      });
    }
    if (data.type === "commercial" && !data.propertyType) {
      ctx.addIssue({
        code: "custom",
        path: ["propertyType"],
        message: "Property type is required.",
      });
    }
  });

/** Parse a possibly-formatted number string ("40,000") to an int, or null. */
function toInt(value: string): number | null {
  const digits = value.replace(/[^\d]/g, "");
  if (!digits) return null;
  const n = parseInt(digits, 10);
  return Number.isFinite(n) ? n : null;
}

function clientIp(req: Request): string {
  return (
    req.headers.get("cf-connecting-ip") ||
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  );
}

/** Fixed-window IP rate limit using KV. Fails open if KV/binding is absent. */
async function isRateLimited(env: CloudflareEnv, ip: string): Promise<boolean> {
  if (!env.RATE_LIMIT || ip === "unknown") return false;
  const bucket = Math.floor(Date.now() / 1000 / RATE_LIMIT_WINDOW);
  const key = `rl:${ip}:${bucket}`;
  try {
    const current = parseInt((await env.RATE_LIMIT.get(key)) || "0", 10);
    if (current >= RATE_LIMIT_MAX) return true;
    await env.RATE_LIMIT.put(key, String(current + 1), {
      expirationTtl: RATE_LIMIT_WINDOW + 60,
    });
    return false;
  } catch {
    return false; // never block a real lead on a KV hiccup
  }
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

export async function POST(req: Request): Promise<Response> {
  let env: CloudflareEnv;
  try {
    env = getRequestContext().env as unknown as CloudflareEnv;
  } catch {
    return json({ success: false, error: "Server not configured." }, 500);
  }

  // Parse JSON
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return json({ success: false, error: "Invalid request." }, 400);
  }

  const parsed = leadSchema.safeParse(payload);
  if (!parsed.success) {
    return json({ success: false, error: "Validation failed." }, 400);
  }
  const data = parsed.data;

  // Honeypot DISABLED (2026-06). The hidden field is labeled "Company Website",
  // which browsers and password managers autofill — that was silently dropping
  // real submissions (200 OK, no insert, no email). Re-enable ONLY with a
  // neutral, non-autofilled field name or a real CAPTCHA. The value is still
  // captured by the schema above for later auditing, just no longer acted on.
  // if (data.companyWebsite.trim() !== "") {
  //   return json({ success: true });
  // }

  const ip = clientIp(req);
  if (await isRateLimited(env, ip)) {
    return json(
      { success: false, error: "Too many requests. Please try again later." },
      429
    );
  }

  const lead: QuoteLead = {
    id: crypto.randomUUID(),
    type: data.type,
    name: data.name,
    email: data.email,
    phone: data.phone,
    address: data.address,
    city: data.city,
    zip: data.zip,
    message: data.message,
    serviceInterest: data.serviceInterest,
    propertySize: data.propertySize,
    propertyType: data.propertyType,
    buildings: toInt(data.buildings),
    stories: toInt(data.stories),
    sqft: toInt(data.sqft),
    heardAbout: data.heardAbout,
    utmSource: data.utmSource,
    utmMedium: data.utmMedium,
    utmCampaign: data.utmCampaign,
    referrer: data.referrer,
    ip,
  };

  // Store the lead (source of truth).
  try {
    await env.DB.prepare(
      `INSERT INTO leads (
        id, type, name, email, phone, address, city, zip, message,
        service_interest, property_size, property_type, buildings, stories, sqft,
        heard_about, utm_source, utm_medium, utm_campaign, referrer, ip
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
      .bind(
        lead.id,
        lead.type,
        lead.name,
        lead.email,
        lead.phone || null,
        lead.address || null,
        lead.city || null,
        lead.zip || null,
        lead.message || null,
        lead.serviceInterest || null,
        lead.propertySize || null,
        lead.propertyType || null,
        lead.buildings,
        lead.stories,
        lead.sqft,
        lead.heardAbout || null,
        lead.utmSource || null,
        lead.utmMedium || null,
        lead.utmCampaign || null,
        lead.referrer || null,
        lead.ip || null
      )
      .run();
  } catch {
    return json(
      { success: false, error: "Could not save your request." },
      500
    );
  }

  // Send notifications (best-effort — never fail the request on email errors).
  await sendNotifications(env, lead);

  return json({ success: true });
}

async function sendNotifications(env: CloudflareEnv, lead: QuoteLead) {
  const { RESEND_API_KEY, RESEND_FROM } = env;
  if (!RESEND_API_KEY || !RESEND_FROM) return;

  const isCommercial = lead.type === "commercial";
  const ownerTo = isCommercial
    ? env.COMMERCIAL_INBOX
    : env.RESIDENTIAL_INBOX;
  const subjectPrefix = isCommercial ? "[COMMERCIAL]" : "[Residential]";

  const tasks: Promise<unknown>[] = [];

  // Owner notification (routed by lead type)
  if (ownerTo) {
    tasks.push(
      sendEmail({
        apiKey: RESEND_API_KEY,
        from: RESEND_FROM,
        to: ownerTo,
        replyTo: lead.email,
        subject: `${subjectPrefix} New ${isCommercial ? "commercial" : "residential"} lead — ${lead.name}`,
        html: ownerEmailHtml(lead),
      })
    );
  }

  // Customer auto-reply
  tasks.push(
    sendEmail({
      apiKey: RESEND_API_KEY,
      from: RESEND_FROM,
      to: lead.email,
      subject: "We received your request — Skyline Exterior Cleaning",
      html: customerEmailHtml(lead),
    })
  );

  try {
    await Promise.allSettled(tasks);
  } catch {
    // swallow — the lead is already stored
  }
}

/**
 * Resend email helper (HTTP API via fetch — no Node SDK, edge-safe) plus the
 * owner-notification and customer-auto-reply templates. Brand-styled, inline CSS
 * for email-client compatibility, mobile-friendly.
 */

export interface QuoteLead {
  id: string;
  type: "residential" | "commercial";
  name: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  zip?: string;
  message?: string;
  serviceInterest?: string;
  propertySize?: string;
  propertyType?: string;
  buildings?: number | null;
  stories?: number | null;
  sqft?: number | null;
  heardAbout?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  referrer?: string;
  ip?: string;
}

const COLORS = {
  ink: "#0A1B33",
  ink2: "#0F2747",
  brand: "#1E6BE0",
  bright: "#3D8BF2",
  muted: "#5E7186",
  line: "#E3E9F0",
  surface: "#F4F7FB",
  amber: "#B45309",
  amberBg: "#FEF3C7",
};

/** Escape user-provided text before embedding in HTML emails. */
function esc(value: unknown): string {
  if (value === null || value === undefined || value === "") return "";
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export interface SendEmailArgs {
  apiKey: string;
  from: string;
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

export interface SendEmailResult {
  ok: boolean;
  status: number;
  error?: string;
}

export async function sendEmail({
  apiKey,
  from,
  to,
  subject,
  html,
  replyTo,
}: SendEmailArgs): Promise<SendEmailResult> {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      subject,
      html,
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
  });

  if (!res.ok) {
    const error = await res.text().catch(() => "");
    return { ok: false, status: res.status, error };
  }
  return { ok: true, status: res.status };
}

/* -------------------------------------------------------------------------- */
/* Templates                                                                  */
/* -------------------------------------------------------------------------- */

function row(label: string, value: unknown): string {
  const v = esc(value);
  if (!v) return "";
  return `
    <tr>
      <td style="padding:8px 0;color:${COLORS.muted};font-size:13px;width:170px;vertical-align:top;">${esc(
        label
      )}</td>
      <td style="padding:8px 0;color:${COLORS.ink};font-size:14px;font-weight:600;">${v}</td>
    </tr>`;
}

function shell(inner: string): string {
  return `<!doctype html><html><body style="margin:0;background:${COLORS.surface};font-family:Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${COLORS.surface};padding:24px 12px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border:1px solid ${COLORS.line};border-radius:12px;overflow:hidden;">
        ${inner}
      </table>
    </td></tr>
  </table>
  </body></html>`;
}

/** Owner notification — routed + prefixed by type; commercial stands out. */
export function ownerEmailHtml(lead: QuoteLead): string {
  const isCommercial = lead.type === "commercial";

  const banner = isCommercial
    ? `<div style="background:${COLORS.amberBg};color:${COLORS.amber};font-weight:700;font-size:13px;letter-spacing:.04em;text-transform:uppercase;padding:10px 28px;">★ Priority Commercial Lead</div>`
    : "";

  const headerColor = isCommercial ? COLORS.ink : COLORS.brand;

  const typeSpecific = isCommercial
    ? `${row("Property type", lead.propertyType)}
       ${row("Buildings", lead.buildings)}
       ${row("Stories", lead.stories)}
       ${row("Estimated sq ft", lead.sqft)}`
    : `${row("Service interest", lead.serviceInterest)}
       ${row("Property size", lead.propertySize)}`;

  const inner = `
    ${banner}
    <tr><td style="background:${headerColor};padding:24px 28px;">
      <div style="color:#ffffff;font-size:20px;font-weight:700;text-transform:uppercase;letter-spacing:-0.3px;">
        New ${isCommercial ? "Commercial" : "Residential"} Lead
      </div>
      <div style="color:rgba(255,255,255,0.75);font-size:13px;margin-top:4px;">
        ${esc(lead.name)} &middot; ${esc(lead.email)}
      </div>
    </td></tr>
    <tr><td style="padding:24px 28px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        ${row("Name", lead.name)}
        ${row("Email", lead.email)}
        ${row("Phone", lead.phone)}
        ${row("Address", lead.address)}
        ${row("City", lead.city)}
        ${row("ZIP", lead.zip)}
        ${typeSpecific}
        ${row("Message", lead.message)}
      </table>

      <div style="margin-top:20px;padding-top:16px;border-top:1px solid ${COLORS.line};">
        <div style="color:${COLORS.muted};font-size:11px;text-transform:uppercase;letter-spacing:.08em;margin-bottom:6px;">Attribution</div>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          ${row("Heard about us", lead.heardAbout)}
          ${row("UTM source", lead.utmSource)}
          ${row("UTM medium", lead.utmMedium)}
          ${row("UTM campaign", lead.utmCampaign)}
          ${row("Referrer", lead.referrer)}
          ${row("IP", lead.ip)}
          ${row("Lead ID", lead.id)}
        </table>
      </div>
    </td></tr>`;

  return shell(inner);
}

/** Customer auto-reply — warm, on-brand; commercial copy differs. */
export function customerEmailHtml(lead: QuoteLead): string {
  const isCommercial = lead.type === "commercial";
  const firstName = esc(lead.name.split(" ")[0] || "there");

  const body = isCommercial
    ? `Thanks for reaching out about your property. We&rsquo;ll review the details
       you shared and follow up to put together a tailored, no-scaffolding drone
       assessment &mdash; cleaning your building from the air with nobody working
       at height.`
    : `Thanks for reaching out! We&rsquo;ve received your request and we&rsquo;ll
       be in touch shortly to learn more and get you a free, no-obligation
       estimate.`;

  const inner = `
    <tr><td style="background:${COLORS.ink};padding:28px;text-align:center;">
      <div style="color:#ffffff;font-size:22px;font-weight:700;text-transform:uppercase;letter-spacing:-0.3px;">
        Skyline Exterior Cleaning
      </div>
      <div style="color:${COLORS.bright};font-size:12px;text-transform:uppercase;letter-spacing:.18em;margin-top:4px;">
        Drone-Powered Exterior Cleaning
      </div>
    </td></tr>
    <tr><td style="padding:28px;">
      <p style="margin:0 0 14px;color:${COLORS.ink};font-size:16px;font-weight:600;">Hi ${firstName},</p>
      <p style="margin:0 0 16px;color:${COLORS.muted};font-size:14px;line-height:1.6;">${body}</p>
      <p style="margin:0 0 22px;color:${COLORS.muted};font-size:14px;line-height:1.6;">
        If anything is urgent, just reply to this email and we&rsquo;ll get right back to you.
      </p>
      <div style="background:${COLORS.surface};border:1px solid ${COLORS.line};border-radius:10px;padding:16px 18px;">
        <div style="color:${COLORS.muted};font-size:11px;text-transform:uppercase;letter-spacing:.08em;">What you asked about</div>
        <div style="color:${COLORS.ink};font-size:14px;font-weight:600;margin-top:4px;">
          ${isCommercial ? "Commercial / drone-powered cleaning" : esc(lead.serviceInterest || "Residential exterior cleaning")}
        </div>
      </div>
      <p style="margin:22px 0 0;color:${COLORS.ink};font-size:14px;font-weight:600;">&mdash; The Skyline Team</p>
    </td></tr>
    <tr><td style="background:${COLORS.ink2};padding:16px 28px;text-align:center;">
      <div style="color:rgba(255,255,255,0.7);font-size:12px;">Serving Arkansas &amp; Oklahoma</div>
    </td></tr>`;

  return shell(inner);
}

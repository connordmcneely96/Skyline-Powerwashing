import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body, null, 2), {
    status,
    headers: { "Content-Type": "application/json" },
  });

// TEMPORARY DIAGNOSTIC — reports which bindings/vars the live Pages Functions
// runtime actually sees. Booleans only; no secret values are exposed. Visiting
// /api/health in a browser tells us:
//   - 404 page            -> API routes aren't built (wrong Pages build command)
//   - { hasDB: false }    -> the D1 binding isn't reaching the runtime
//   - { hasDB: true, ... } -> bindings are fine; the fault is downstream
// Safe to delete once the lead pipeline is confirmed working.
export function GET(): Response {
  try {
    const env = getRequestContext().env as Record<string, unknown>;
    return json({
      ok: true,
      runtime: "edge",
      hasDB: !!env.DB,
      hasResendKey: !!env.RESEND_API_KEY,
      hasResendFrom: !!env.RESEND_FROM,
      hasResidentialInbox: !!env.RESIDENTIAL_INBOX,
      hasCommercialInbox: !!env.COMMERCIAL_INBOX,
    });
  } catch (e) {
    return json(
      { ok: false, stage: "no-request-context", error: String(e) },
      500
    );
  }
}

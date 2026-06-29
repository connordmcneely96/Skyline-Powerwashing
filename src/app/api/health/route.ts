import { getRequestContext } from "@cloudflare/next-on-pages";

import type { CloudflareEnv } from "@/lib/cloudflare-env";

export const runtime = "edge";

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body, null, 2), {
    status,
    headers: { "Content-Type": "application/json" },
  });

// TEMPORARY DIAGNOSTIC. Reports live bindings/vars AND actively tests the exact
// D1 read + write path that /api/quote depends on. No secret values are
// exposed. Safe to delete once the lead pipeline is confirmed working.
export async function GET(): Promise<Response> {
  let env: CloudflareEnv;
  try {
    env = getRequestContext().env as unknown as CloudflareEnv;
  } catch (e) {
    return json(
      { ok: false, stage: "no-request-context", error: String(e) },
      500
    );
  }

  const out: Record<string, unknown> = {
    ok: true,
    runtime: "edge",
    hasDB: !!env.DB,
    hasResendKey: !!env.RESEND_API_KEY,
    hasResendFrom: !!env.RESEND_FROM,
    hasResidentialInbox: !!env.RESIDENTIAL_INBOX,
    hasCommercialInbox: !!env.COMMERCIAL_INBOX,
  };

  if (env.DB) {
    // Read test — can the runtime query the leads table at all?
    try {
      const row = await env.DB.prepare(
        "SELECT COUNT(*) AS n FROM leads"
      ).first<{ n: number }>();
      out.dbReadOk = true;
      out.leadCount = row?.n ?? null;
    } catch (e) {
      out.dbReadOk = false;
      out.dbReadError = String(e);
    }

    // Write test — insert a sentinel row, then remove it. Surfaces the exact
    // error if the same insert the quote handler runs is failing.
    try {
      const testId = `healthcheck-${crypto.randomUUID()}`;
      await env.DB.prepare(
        "INSERT INTO leads (id, type, name, email) VALUES (?, 'residential', 'healthcheck', 'healthcheck@example.com')"
      )
        .bind(testId)
        .run();
      await env.DB.prepare("DELETE FROM leads WHERE id = ?")
        .bind(testId)
        .run();
      out.dbWriteOk = true;
    } catch (e) {
      out.dbWriteOk = false;
      out.dbWriteError = String(e);
    }
  }

  return json(out);
}

/**
 * Minimal Cloudflare binding types — just what the quote API uses. Avoids a hard
 * dependency on @cloudflare/workers-types while staying type-safe on the edge.
 */

export interface D1Result {
  success: boolean;
}

export interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  run(): Promise<D1Result>;
  first<T = unknown>(colName?: string): Promise<T | null>;
}

export interface D1Database {
  prepare(query: string): D1PreparedStatement;
}

export interface KVNamespace {
  get(key: string): Promise<string | null>;
  put(
    key: string,
    value: string,
    options?: { expirationTtl?: number }
  ): Promise<void>;
}

export interface CloudflareEnv {
  /** D1 binding — see wrangler.toml. */
  DB: D1Database;
  /** Optional KV binding for IP rate limiting. */
  RATE_LIMIT?: KVNamespace;
  RESEND_API_KEY?: string;
  /** Verified sender, e.g. "Skyline <quotes@yourdomain.com>". */
  RESEND_FROM?: string;
  RESIDENTIAL_INBOX?: string;
  COMMERCIAL_INBOX?: string;
}

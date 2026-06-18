-- Skyline quote-request leads.
-- Idempotent: safe to run more than once.
--
-- Apply remotely:
--   wrangler d1 execute skyline-leads --remote --file=./migrations/0001_leads.sql
-- Apply locally (against the wrangler dev D1):
--   wrangler d1 execute skyline-leads --local --file=./migrations/0001_leads.sql

CREATE TABLE IF NOT EXISTS leads (
  id               TEXT PRIMARY KEY,
  created_at       TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  type             TEXT NOT NULL,            -- 'residential' | 'commercial'

  -- contact
  name             TEXT NOT NULL,
  email            TEXT NOT NULL,
  phone            TEXT,
  address          TEXT,
  city             TEXT,
  zip              TEXT,
  message          TEXT,

  -- residential
  service_interest TEXT,
  property_size    TEXT,

  -- commercial
  property_type    TEXT,
  buildings        INTEGER,
  stories          INTEGER,
  sqft             INTEGER,

  -- attribution
  heard_about      TEXT,
  utm_source       TEXT,
  utm_medium       TEXT,
  utm_campaign     TEXT,
  referrer         TEXT,

  -- ops
  status           TEXT NOT NULL DEFAULT 'new',
  ip               TEXT
);

CREATE INDEX IF NOT EXISTS idx_leads_type_created_at
  ON leads (type, created_at);

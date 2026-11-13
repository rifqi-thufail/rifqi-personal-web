CREATE TABLE IF NOT EXISTS leads (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at   TEXT    NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ','now')),
  name         TEXT    NOT NULL,
  email        TEXT    NOT NULL,
  organisation TEXT,
  purpose      TEXT    NOT NULL,
  message      TEXT,
  ip_hash      TEXT    NOT NULL,   -- HMAC of the IP, never the raw address
  user_agent   TEXT,
  status       TEXT    NOT NULL DEFAULT 'new' CHECK (status IN ('new','contacted','archived'))
);
CREATE INDEX IF NOT EXISTS idx_leads_created ON leads (created_at);
CREATE INDEX IF NOT EXISTS idx_leads_email   ON leads (email);

-- Sliding-window rate limiting, keyed by an HMAC bucket (ip / admin attempts).
CREATE TABLE IF NOT EXISTS rate_events (
  bucket TEXT    NOT NULL,
  ts     INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_rate_bucket_ts ON rate_events (bucket, ts);


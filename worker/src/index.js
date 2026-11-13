// Lead-capture API for thufail.dev.
//   POST /api/lead         form submission -> stores lead (no contact details are ever returned)
//   GET  /api/admin/leads  (Bearer ADMIN_TOKEN) list leads, ?format=csv for export
//   PATCH /api/admin/leads/:id  (Bearer ADMIN_TOKEN) {status}
// The API never hands out the owner's contact details. Visitors leave theirs; the owner reads the
// leads through the admin routes and replies personally.

const MAX_BODY = 4096;
const PURPOSES = new Set(['internship', 'project', 'collaboration', 'speaking', 'other']);
const EMAIL_RE = /^[^\s@<>"',;:\\]{1,64}@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+$/;
const STATUSES = new Set(['new', 'contacted', 'archived']);

const LIMITS = {
  lead: { max: 5, windowSec: 3600 }, // per IP per hour
  leadGlobal: { max: 300, windowSec: 3600 }, // whole-site circuit breaker
  admin: { max: 10, windowSec: 900 }, // failed admin attempts per IP per 15 min
};

const SECURITY_HEADERS = {
  'Cache-Control': 'no-store',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'no-referrer',
  'Cross-Origin-Resource-Policy': 'same-site',
  'Content-Security-Policy': "default-src 'none'; frame-ancestors 'none'",
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'X-Frame-Options': 'DENY',
};

const allowedOrigins = (env) => (env.ALLOWED_ORIGINS || '').split(',').map((s) => s.trim()).filter(Boolean);

function corsHeaders(request, env) {
  const origin = request.headers.get('Origin');
  if (origin && allowedOrigins(env).includes(origin)) {
    return {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '600',
      Vary: 'Origin',
    };
  }
  return { Vary: 'Origin' };
}

function json(data, status, extra = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', ...SECURITY_HEADERS, ...extra },
  });
}

const hex = (buf) => [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');

async function hmac(key, text) {
  const k = await crypto.subtle.importKey('raw', new TextEncoder().encode(key), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return hex(await crypto.subtle.sign('HMAC', k, new TextEncoder().encode(text)));
}

// Constant-time string comparison (hashes first so length does not leak).
async function safeEqual(a, b, key) {
  const [x, y] = await Promise.all([hmac(key, a), hmac(key, b)]);
  let diff = 0;
  for (let i = 0; i < x.length; i++) diff |= x.charCodeAt(i) ^ y.charCodeAt(i);
  return diff === 0;
}

async function rateCount(env, bucket, windowSec) {
  const since = Date.now() - windowSec * 1000;
  const row = await env.DB.prepare('SELECT COUNT(*) AS n FROM rate_events WHERE bucket = ?1 AND ts > ?2').bind(bucket, since).first();
  return row?.n ?? 0;
}

async function rateHit(env, bucket) {
  await env.DB.prepare('INSERT INTO rate_events (bucket, ts) VALUES (?1, ?2)').bind(bucket, Date.now()).run();
}

async function pruneRate(env) {
  await env.DB.prepare('DELETE FROM rate_events WHERE ts < ?1').bind(Date.now() - 24 * 3600 * 1000).run();
}

// eslint-disable-next-line no-control-regex
const clean = (v, max) => (typeof v === 'string' ? v.replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, max) : '');

async function verifyTurnstile(env, token, ip) {
  if (typeof token !== 'string' || !token || token.length > 2048) return false;
  const body = new FormData();
  body.append('secret', env.TURNSTILE_SECRET);
  body.append('response', token);
  if (ip) body.append('remoteip', ip);
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body });
  if (!res.ok) return false;
  const out = await res.json();
  return out.success === true;
}

async function readJson(request) {
  const type = request.headers.get('Content-Type') || '';
  if (!type.toLowerCase().startsWith('application/json')) return { error: 'unsupported_media_type', status: 415 };
  const len = Number(request.headers.get('Content-Length') || 0);
  if (len > MAX_BODY) return { error: 'too_large', status: 413 };
  const text = await request.text();
  if (text.length > MAX_BODY) return { error: 'too_large', status: 413 };
  try {
    const data = JSON.parse(text);
    if (!data || typeof data !== 'object' || Array.isArray(data)) throw new Error('shape');
    return { data };
  } catch {
    return { error: 'invalid_json', status: 400 };
  }
}

async function handleLead(request, env, cors) {
  const origin = request.headers.get('Origin');
  if (!origin || !allowedOrigins(env).includes(origin)) return json({ error: 'forbidden_origin' }, 403, cors);

  const ip = request.headers.get('CF-Connecting-IP') || '';
  const ipHash = await hmac(env.IP_HMAC_KEY, ip || 'unknown');

  const global = await rateCount(env, 'lead:all', LIMITS.leadGlobal.windowSec);
  if (global >= LIMITS.leadGlobal.max) return json({ error: 'busy' }, 503, { ...cors, 'Retry-After': '600' });
  const mine = await rateCount(env, `lead:${ipHash}`, LIMITS.lead.windowSec);
  if (mine >= LIMITS.lead.max) return json({ error: 'rate_limited' }, 429, { ...cors, 'Retry-After': '3600' });

  const parsed = await readJson(request);
  if (parsed.error) return json({ error: parsed.error }, parsed.status, cors);
  const b = parsed.data;

  // Honeypot: real users never fill this hidden field. Pretend success, reveal nothing.
  if (typeof b.website === 'string' && b.website.length > 0) {
    await rateHit(env, `lead:${ipHash}`);
    return json({ ok: true }, 200, cors);
  }

  const name = clean(b.name, 100);
  const email = clean(b.email, 254).toLowerCase();
  const organisation = clean(b.organisation, 150);
  const purpose = clean(b.purpose, 30);
  const message = clean(b.message, 1000);

  const fields = {};
  if (name.length < 2) fields.name = 'Enter your name.';
  if (!EMAIL_RE.test(email)) fields.email = 'Enter a valid email address.';
  if (!PURPOSES.has(purpose)) fields.purpose = 'Choose a reason.';
  if (Object.keys(fields).length) return json({ error: 'validation', fields }, 422, cors);

  await rateHit(env, `lead:${ipHash}`);
  if (!(await verifyTurnstile(env, b.turnstileToken, ip))) return json({ error: 'captcha_failed' }, 400, cors);

  await rateHit(env, 'lead:all');

  await env.DB.prepare(
    'INSERT INTO leads (name, email, organisation, purpose, message, ip_hash, user_agent) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)',
  ).bind(name, email, organisation || null, purpose, message || null, ipHash, clean(request.headers.get('User-Agent') || '', 200) || null).run();

  return json({ ok: true }, 200, cors);
}

function csvCell(v) {
  let s = v == null ? '' : String(v);
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`; // neutralise spreadsheet formula injection
  return `"${s.replace(/"/g, '""')}"`;
}

async function adminAuth(request, env) {
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  const bucket = `admin:${await hmac(env.IP_HMAC_KEY, ip)}`;
  if ((await rateCount(env, bucket, LIMITS.admin.windowSec)) >= LIMITS.admin.max) return { res: json({ error: 'rate_limited' }, 429, { 'Retry-After': '900' }) };
  const header = request.headers.get('Authorization') || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  if (!env.ADMIN_TOKEN || env.ADMIN_TOKEN.length < 32 || !token || !(await safeEqual(token, env.ADMIN_TOKEN, env.IP_HMAC_KEY))) {
    await rateHit(env, bucket);
    return { res: json({ error: 'unauthorized' }, 401, { 'WWW-Authenticate': 'Bearer' }) };
  }
  return {};
}

async function handleAdmin(request, env, url) {
  const auth = await adminAuth(request, env);
  if (auth.res) return auth.res;

  if (request.method === 'GET' && url.pathname === '/api/admin/leads') {
    const limit = Math.min(Math.max(parseInt(url.searchParams.get('limit') || '200', 10) || 200, 1), 1000);
    const status = url.searchParams.get('status');
    const q = status && STATUSES.has(status)
      ? env.DB.prepare('SELECT id, created_at, name, email, organisation, purpose, message, status FROM leads WHERE status = ?1 ORDER BY id DESC LIMIT ?2').bind(status, limit)
      : env.DB.prepare('SELECT id, created_at, name, email, organisation, purpose, message, status FROM leads ORDER BY id DESC LIMIT ?1').bind(limit);
    const { results } = await q.all();
    if (url.searchParams.get('format') === 'csv') {
      const cols = ['id', 'created_at', 'name', 'email', 'organisation', 'purpose', 'message', 'status'];
      const body = [cols.join(','), ...results.map((r) => cols.map((c) => csvCell(r[c])).join(','))].join('\n');
      return new Response(body, { headers: { 'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': 'attachment; filename="leads.csv"', ...SECURITY_HEADERS } });
    }
    return json({ leads: results }, 200);
  }

  const m = url.pathname.match(/^\/api\/admin\/leads\/(\d{1,12})$/);
  if (request.method === 'PATCH' && m) {
    const parsed = await readJson(request);
    if (parsed.error) return json({ error: parsed.error }, parsed.status);
    if (!STATUSES.has(parsed.data.status)) return json({ error: 'validation' }, 422);
    const r = await env.DB.prepare('UPDATE leads SET status = ?1 WHERE id = ?2').bind(parsed.data.status, Number(m[1])).run();
    return json({ ok: r.meta.changes > 0 }, r.meta.changes > 0 ? 200 : 404);
  }
  return json({ error: 'not_found' }, 404);
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const cors = corsHeaders(request, env);

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: { ...SECURITY_HEADERS, ...cors } });
    }
    try {
      if (url.pathname === '/api/lead' && request.method === 'POST') {
        ctx.waitUntil(pruneRate(env));
        return await handleLead(request, env, cors);
      }
      if (url.pathname.startsWith('/api/admin/')) return await handleAdmin(request, env, url);
      return json({ error: 'not_found' }, 404);
    } catch {
      return json({ error: 'server_error' }, 500, cors);
    }
  },
};

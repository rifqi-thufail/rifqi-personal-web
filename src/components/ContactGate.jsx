import { useEffect, useRef, useState } from 'react';

const API_URL = (import.meta.env?.VITE_API_URL || '').replace(/\/$/, '');
const SITE_KEY = import.meta.env?.VITE_TURNSTILE_SITE_KEY || '';

const PURPOSES = [
  ['internship', 'Internship opportunity'],
  ['project', 'Project or consulting'],
  ['collaboration', 'Collaboration'],
  ['speaking', 'Speaking or event'],
  ['other', 'Something else'],
];

const ERRORS = {
  validation: 'Please check the highlighted fields.',
  captcha_failed: 'Verification failed. Please try again.',
  rate_limited: 'Too many requests. Please try again later.',
  busy: 'The form is busy right now. Please try again in a few minutes.',
};

function loadTurnstile() {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    s.async = true;
    s.onload = () => resolve(window.turnstile);
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

function Thanks({ name, email }) {
  return (
    <div className="contact-form card" role="status">
      <p className="contact-reveal__note">Thanks, {name}. Your message is with me.</p>
      <p className="contact-form__fine">I read every request personally and will reply to <strong>{email}</strong>, usually within a few days.</p>
    </div>
  );
}

export default function ContactGate() {
  const [form, setForm] = useState({ name: '', email: '', organisation: '', purpose: 'internship', message: '', website: '' });
  const [token, setToken] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const widgetRef = useRef(null);
  const widgetId = useRef(null);

  useEffect(() => {
    if (!SITE_KEY || !widgetRef.current) return undefined;
    let cancelled = false;
    loadTurnstile()
      .then((ts) => {
        if (cancelled || widgetId.current != null) return;
        widgetId.current = ts.render(widgetRef.current, {
          sitekey: SITE_KEY,
          callback: setToken,
          'expired-callback': () => setToken(''),
          'error-callback': () => setToken(''),
        });
      })
      .catch(() => setError('Could not load the verification check. Please reload the page.'));
    return () => {
      cancelled = true;
    };
  }, []);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setFieldErrors({});
    if (!API_URL || !SITE_KEY) return setError('The contact form is not configured yet.');
    if (!token) return setError('Please complete the verification check.');
    setBusy(true);
    try {
      const res = await fetch(`${API_URL}/api/lead`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'omit',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({ ...form, turnstileToken: token }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setSent(true);
        return;
      }
      if (data.fields) setFieldErrors(data.fields);
      setError(ERRORS[data.error] || 'Something went wrong. Please try again.');
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setBusy(false);
      setToken('');
      if (widgetId.current != null) window.turnstile?.reset(widgetId.current);
    }
  };

  if (sent) return <Thanks name={form.name} email={form.email} />;

  return (
    <form className="contact-form card" onSubmit={submit} noValidate>
      <p className="contact-form__lead">Tell me who you are and what you have in mind. I reply to every genuine message from my own email.</p>

      <label className="field">
        <span className="mono-label">Name</span>
        <input type="text" name="name" autoComplete="name" required maxLength={100} value={form.name} onChange={set('name')} aria-invalid={!!fieldErrors.name} />
        {fieldErrors.name && <span className="field__error">{fieldErrors.name}</span>}
      </label>

      <label className="field">
        <span className="mono-label">Email</span>
        <input type="email" name="email" autoComplete="email" required maxLength={254} value={form.email} onChange={set('email')} aria-invalid={!!fieldErrors.email} />
        {fieldErrors.email && <span className="field__error">{fieldErrors.email}</span>}
      </label>

      <label className="field">
        <span className="mono-label">Organisation (optional)</span>
        <input type="text" name="organisation" autoComplete="organization" maxLength={150} value={form.organisation} onChange={set('organisation')} />
      </label>

      <label className="field">
        <span className="mono-label">Reason for contact</span>
        <select name="purpose" value={form.purpose} onChange={set('purpose')}>
          {PURPOSES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
        </select>
      </label>

      <label className="field">
        <span className="mono-label">Message (optional)</span>
        <textarea name="message" rows={3} maxLength={1000} value={form.message} onChange={set('message')} />
      </label>

      {/* Honeypot: hidden from people and assistive tech, bots fill it in. */}
      <div className="field field--trap" aria-hidden="true">
        <label>Website<input type="text" name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={set('website')} /></label>
      </div>

      <div ref={widgetRef} className="contact-form__captcha" />

      {error && <p className="field__error" role="alert">{error}</p>}

      <button type="submit" className="btn btn-primary" disabled={busy}>{busy ? 'Sending…' : 'Send message'}</button>
      <p className="contact-form__fine">Your details are stored only so I can follow up, and are never shared.</p>
    </form>
  );
}

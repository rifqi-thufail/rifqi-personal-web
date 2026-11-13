# thufail.dev

Personal site of Rifqi Aufa Thufail. React + Vite, deployed to GitHub Pages on every push to `main`.

## Commands

- `npm run dev` — local dev server
- `npm run build` — client build, then prerender every route to static HTML
- `npm run preview` — serve the production build locally
- `npm run lint`

## How it is built

The site is a single React app with real URL paths (`/`, `/experience/`, `/portfolio/`,
`/portfolio/<id>/`, `/skills/`). `npm run build` renders each route to its own `index.html`
(`scripts/prerender.mjs`) so search engines and language models get the full text without
running JavaScript, and the browser hydrates that markup.

SEO lives in three places:

- `src/router.js` — routes plus the `<title>` and description for each page
- `scripts/prerender.mjs` — canonical URLs, Open Graph / Twitter tags, JSON-LD and `sitemap.xml`
- `public/robots.txt`, `public/llms.txt`, `public/og.png` — static files

When a project is added to `src/data/portfolioData.js` it gets a page and a sitemap entry
automatically. Update `public/llms.txt` by hand when the content changes.

## Contact form and lead database

Contact details are not in the repo, the bundle, or any API response. The contact section is a
form; the Worker in `worker/` checks Turnstile, rate-limits, and stores the lead in Cloudflare D1.
You read the leads with the admin token and reply from your own email.

One-time setup (Cloudflare CLI `cf`; check `cf d1 --help` for exact flags on your version):

1. `cf d1 create thufail-leads`, put the id in `worker/cloudflare.config.ts`, then apply `worker/schema.sql`.
2. Create a Turnstile widget for `thufail.dev`; site key goes in the `VITE_TURNSTILE_SITE_KEY` repo variable.
3. Set secrets on the Worker: `TURNSTILE_SECRET`, `IP_HMAC_KEY` (random 32+ bytes), `ADMIN_TOKEN` (random 32+ bytes).
4. Deploy the Worker, then set `VITE_API_URL` (repo variable) to its URL and redeploy the site.

Read leads (admin token required; the admin routes allow no browser origin):

    curl -H "Authorization: Bearer $ADMIN_TOKEN" https://<worker>/api/admin/leads
    curl -H "Authorization: Bearer $ADMIN_TOKEN" "https://<worker>/api/admin/leads?format=csv" -o leads.csv

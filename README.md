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

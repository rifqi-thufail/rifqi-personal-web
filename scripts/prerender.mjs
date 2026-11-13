// Turns the client build into static HTML: one index.html per route with its own
// <title>, description, canonical URL, social tags and JSON-LD, plus 404.html and
// sitemap.xml. Crawlers and language models that do not run JavaScript get the
// full page text.
//
// Runs after `vite build` and `vite build --ssr src/entry-server.jsx --outDir dist-ssr`.
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const ssrDir = join(root, 'dist-ssr');

const { ALL_PATHS, CONTACT, PROJECTS, SITE_NAME, SITE_URL, metaFor, parsePath, render } = await import(
  pathToFileURL(join(ssrDir, 'entry-server.js')).href
);

const template = await readFile(join(dist, 'index.html'), 'utf8');
const esc = (text) => text.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const PERSON_ID = `${SITE_URL}/#person`;
const OG_IMAGE = `${SITE_URL}/og.png`;

const person = {
  '@type': 'Person',
  '@id': PERSON_ID,
  name: SITE_NAME,
  alternateName: ['Rifqi Thufail', 'Rifqi Aufa'],
  givenName: 'Rifqi',
  familyName: 'Thufail',
  url: `${SITE_URL}/`,
  image: OG_IMAGE,
  email: `mailto:${CONTACT.email}`,
  jobTitle: 'Information Systems student and project lead',
  description:
    'Dual-degree Information Systems student at Universiti Teknologi PETRONAS and Institut Teknologi Sepuluh Nopember who builds data analytics, blockchain and SAP ERP systems.',
  address: { '@type': 'PostalAddress', addressRegion: 'Perak', addressCountry: 'MY' },
  affiliation: [
    { '@type': 'CollegeOrUniversity', name: 'Universiti Teknologi PETRONAS', url: 'https://www.utp.edu.my/' },
    { '@type': 'CollegeOrUniversity', name: 'Institut Teknologi Sepuluh Nopember', url: 'https://www.its.ac.id/' },
  ],
  knowsAbout: [
    'Information systems',
    'Big data analytics',
    'Business intelligence',
    'Microsoft Power BI',
    'Blockchain',
    'Smart contracts',
    'SAP S/4HANA',
    'Enterprise architecture',
    'ESG reporting',
  ],
  knowsLanguage: ['en', 'id', 'ms'],
  award: [
    '2nd Place, Telkomsel × Information Systems Expo 2025 National Business Case Competition',
    'Finalist (Top 12 of 263 teams), Travoy Jasamarga × Marketeers WOW Case Competition 2026',
    '1st Place, Best Expo Stand, Agile Innovation Expo ITS 2024',
  ],
  sameAs: [CONTACT.linkedinUrl, CONTACT.githubUrl],
};

const website = {
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: `${SITE_URL}/`,
  name: SITE_NAME,
  inLanguage: 'en',
  publisher: { '@id': PERSON_ID },
};

function breadcrumb(route, title) {
  const items = [{ name: 'Home', path: '/' }];
  if (route.page !== 'home') items.push({ name: route.page[0].toUpperCase() + route.page.slice(1), path: `/${route.page}/` });
  if (route.projectId) items.push({ name: title, path: `/${route.page}/${route.projectId}/` });
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: SITE_URL + item.path,
    })),
  };
}

function head(path) {
  const route = parsePath(path);
  const { title, description } = metaFor(route);
  const url = SITE_URL + path;
  const project = PROJECTS.find((p) => p.id === route.projectId);
  const image = project?.image ? SITE_URL + project.image : OG_IMAGE;

  const webpage = {
    '@type': route.page === 'home' ? 'ProfilePage' : 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: title,
    description,
    inLanguage: 'en',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': PERSON_ID },
    ...(route.page === 'home' ? { mainEntity: { '@id': PERSON_ID } } : {}),
  };
  const graph = [person, website, webpage];
  if (route.page !== 'home') graph.push(breadcrumb(route, project?.title ?? title));
  if (project) {
    graph.push({
      '@type': 'CreativeWork',
      '@id': `${url}#project`,
      name: project.title,
      headline: project.subtitle,
      description: project.description,
      keywords: project.tags.join(', '),
      image: SITE_URL + project.image,
      url,
      author: { '@id': PERSON_ID },
    });
  }
  const jsonLd = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c');

  return [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="${route.page === 'home' ? 'profile' : 'website'}" />`,
    `<meta property="og:site_name" content="${esc(SITE_NAME)}" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:alt" content="${esc(title)}" />`,
    `<meta property="og:locale" content="en_GB" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(title)}" />`,
    `<meta name="twitter:description" content="${esc(description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    `<script type="application/ld+json">${jsonLd}</script>`,
  ].join('\n    ');
}

function page(path, { noindex = false } = {}) {
  let html = template
    .replace(/<!--seo:start-->[\s\S]*?<!--seo:end-->/, () => head(path))
    .replace('<div id="root"></div>', () => `<div id="root">${render(path)}</div>`);
  if (noindex) {
    html = html
      .replace(/<meta name="robots"[^>]*>/, '<meta name="robots" content="noindex" />')
      .replace(/\s*<link rel="canonical"[^>]*>/, '');
  }
  if (!html.includes('<div id="root"><')) throw new Error(`Prerender produced no markup for ${path}`);
  return html;
}

for (const path of ALL_PATHS) {
  const file = join(dist, path, 'index.html');
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, page(path));
}

// GitHub Pages serves this for any unknown path.
await writeFile(join(dist, '404.html'), page('/404/', { noindex: true }));

const today = new Date().toISOString().slice(0, 10);
await writeFile(
  join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ALL_PATHS.map((path) => `  <url><loc>${SITE_URL}${path}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>
`,
);

await rm(ssrDir, { recursive: true, force: true });
console.log(`Prerendered ${ALL_PATHS.length} pages, 404.html and sitemap.xml`);

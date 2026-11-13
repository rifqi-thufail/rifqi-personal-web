import { PROJECTS } from './data/portfolioData';
import { SITE_NAME } from './data/site';

// Real paths (prerendered to static HTML at build time, see scripts/prerender.mjs):
//   /  /experience/  /portfolio/  /portfolio/<id>/  /skills/
const PAGES = ['experience', 'portfolio', 'skills'];

export function parsePath(pathname) {
  const parts = pathname.split('/').filter(Boolean);
  if (parts.length === 0) return { page: 'home', projectId: null };
  const [page, id, ...rest] = parts;
  if (page === 'portfolio' && id && rest.length === 0 && PROJECTS.some((p) => p.id === id)) {
    return { page, projectId: id };
  }
  if (PAGES.includes(page) && !id) return { page, projectId: null };
  return { page: 'notfound', projectId: null };
}

export function pathFor(page, projectId) {
  if (page === 'home') return '/';
  return projectId ? `/${page}/${projectId}/` : `/${page}/`;
}

// Links from the old hash router (#experience, #portfolio/<id>, …) keep working.
export function legacyHashPath(hash) {
  const raw = hash.replace(/^#\/?/, '').replace(/\/$/, '');
  if (!raw || raw === 'contact' || raw === 'main') return null;
  const route = parsePath(`/${raw}`);
  return route.page === 'notfound' ? null : pathFor(route.page, route.projectId);
}

// Every prerendered route, in sitemap order.
export const ALL_PATHS = [
  '/',
  '/experience/',
  '/portfolio/',
  ...PROJECTS.map((p) => pathFor('portfolio', p.id)),
  '/skills/',
];

const clip = (text, max = 158) => (text.length <= max ? text : `${text.slice(0, max - 1).replace(/\s+\S*$/, '')}…`);

// <title> and meta description per route, shared by the client and the prerender.
export function metaFor({ page, projectId }) {
  switch (page) {
    case 'experience':
      return {
        title: `Experience & Education — ${SITE_NAME}`,
        description:
          'Tech lead on GovChain Permit and project lead on FarmSync at Indonesia Blockchain Center. Dual degree in Information Systems at UTP Malaysia and ITS Indonesia.',
      };
    case 'portfolio': {
      const project = PROJECTS.find((p) => p.id === projectId);
      if (project) {
        return { title: `${project.title} — ${SITE_NAME}`, description: clip(project.description) };
      }
      return {
        title: `Portfolio & Projects — ${SITE_NAME}`,
        description:
          'Consulting and analytics projects led by Rifqi Aufa Thufail: a Power BI Balanced Scorecard for PT United Tractors and an Enterprise Architecture plan for Velox Bicycles.',
      };
    }
    case 'skills':
      return {
        title: `Skills & Certifications — ${SITE_NAME}`,
        description:
          'Python, JavaScript, Power BI, SAP S/4HANA, EVM smart contracts and Figma, with AWS, Alibaba Cloud and SAP certifications. English (IELTS 7.0), Indonesian, Malay.',
      };
    case 'notfound':
      return { title: `Page not found — ${SITE_NAME}`, description: 'This page does not exist on thufail.dev.' };
    default:
      return {
        title: `${SITE_NAME} — Information Systems, Data & Blockchain`,
        description:
          'Rifqi Aufa Thufail is a dual-degree Information Systems student (UTP Malaysia, ITS Indonesia) who builds data analytics, blockchain and SAP ERP systems. Open to internships.',
      };
  }
}

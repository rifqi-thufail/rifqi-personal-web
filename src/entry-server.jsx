import { renderToString } from 'react-dom/server';
import App from './App.jsx';

export { ALL_PATHS, metaFor, parsePath } from './router';
export { CONTACT, SITE_NAME, SITE_URL } from './data/site';
export { PROJECTS } from './data/portfolioData';

export function render(path) {
  return renderToString(<App initialPath={path} />);
}

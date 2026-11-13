import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { legacyHashPath } from './router';

const container = document.getElementById('root');

// Links from the old hash router (#experience, #portfolio/<id>, …) move to real paths.
const legacyPath = legacyHashPath(window.location.hash);
if (legacyPath) window.history.replaceState(null, '', legacyPath);

const app = (
  <StrictMode>
    <App initialPath={window.location.pathname} />
  </StrictMode>
);

// Production pages are prerendered, so hydrate them. The dev server starts empty,
// and a redirected legacy link no longer matches the markup it was served with.
if (container.hasChildNodes() && !legacyPath) {
  hydrateRoot(container, app);
} else {
  container.replaceChildren();
  createRoot(container).render(app);
}

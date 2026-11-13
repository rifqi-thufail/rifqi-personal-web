import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

import Header from './components/Header';
import Footer from './components/Footer';
import CommandMenu from './components/CommandMenu';

import HomePage from './pages/HomePage';
import ExperiencePage from './pages/ExperiencePage';
import PortfolioPage from './pages/PortfolioPage';
import SkillsPage from './pages/SkillsPage';

import NotFoundPage from './pages/NotFoundPage';

import { initPointerFx } from './utils/pointerFx';
import { setTheme, useTheme } from './utils/theme';
import { legacyHashPath, metaFor, parsePath, pathFor } from './router';

function prefersReducedMotion() {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
}

// The target page may still be mounting (page transition), so retry briefly.
function scrollToHash(hash) {
  const id = hash.replace(/^#/, '');
  let tries = 0;
  const tick = () => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
    } else if (tries++ < 40) {
      setTimeout(tick, 50);
    }
  };
  tick();
}

export default function App({ initialPath = '/' }) {
  const [route, setRoute] = useState(() => parsePath(initialPath));
  const theme = useTheme();
  const [cmdOpen, setCmdOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);

  const { page, projectId } = route;

  // Client-side navigation between the prerendered pages.
  const go = useCallback((pathname, hash = '') => {
    if (pathname !== window.location.pathname) {
      window.history.pushState(null, '', pathname + hash);
      setRoute(parsePath(pathname));
    } else if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
    if (hash) scrollToHash(hash);
  }, []);

  useEffect(() => {
    if (window.location.hash.length > 1) scrollToHash(window.location.hash);

    const onPopState = () => setRoute(parsePath(window.location.pathname));

    // Old hash-router links (#experience, #portfolio/<id>, …) followed while the site is open.
    const onHashChange = () => {
      const legacy = legacyHashPath(window.location.hash);
      if (!legacy) return;
      window.history.replaceState(null, '', legacy);
      setRoute(parsePath(legacy));
    };

    // Same-origin page links are handled in place; everything else is left alone.
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = e.target instanceof Element ? e.target.closest('a[href]') : null;
      if (!link || link.target || link.hasAttribute('download')) return;
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (parsePath(url.pathname).page === 'notfound') return;
      // In-page anchors scroll natively.
      if (url.pathname === window.location.pathname && url.hash) return;
      e.preventDefault();
      go(url.pathname, url.hash);
    };

    window.addEventListener('popstate', onPopState);
    window.addEventListener('hashchange', onHashChange);
    document.addEventListener('click', onClick);
    return () => {
      window.removeEventListener('popstate', onPopState);
      window.removeEventListener('hashchange', onHashChange);
      document.removeEventListener('click', onClick);
    };
  }, [go]);

  // Start every page at the top, with its own title.
  useEffect(() => {
    document.title = metaFor({ page, projectId }).title;
    if (!window.location.hash) window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [page, projectId]);

  // Card spotlight / tilt and backdrop parallax.
  useEffect(() => initPointerFx(), []);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCmdOpen((v) => !v);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const toggleTheme = useCallback(() => {
    const root = document.documentElement;
    root.classList.add('theme-transitioning');
    setTheme(root.getAttribute('data-theme') === 'light' ? 'dark' : 'light');
    setTimeout(() => root.classList.remove('theme-transitioning'), 350);
  }, []);

  const navigate = useCallback((target) => go(pathFor(target)), [go]);

  const goToContact = useCallback(() => go('/', '#contact'), [go]);

  const closeCmd = useCallback(() => setCmdOpen(false), []);

  let content;
  switch (page) {
    case 'experience':
      content = <ExperiencePage />;
      break;
    case 'portfolio':
      content = <PortfolioPage projectId={projectId} />;
      break;
    case 'skills':
      content = <SkillsPage />;
      break;
    case 'notfound':
      content = <NotFoundPage />;
      break;
    default:
      content = <HomePage />;
  }

  return (
    <MotionConfig reducedMotion="user">
      <div className="app">
        <a className="skip-link" href="#main" onClick={(e) => {
          e.preventDefault();
          document.getElementById('main')?.focus();
        }}>
          Skip to content
        </a>

        <Header
          activePage={page}
          theme={theme}
          onToggleTheme={toggleTheme}
          onOpenCommandMenu={() => setCmdOpen(true)}
          onContact={goToContact}
        />

        <CommandMenu
          isOpen={cmdOpen}
          onClose={closeCmd}
          onNavigate={navigate}
          onContact={goToContact}
          onToggleTheme={toggleTheme}
          theme={theme}
        />

        <main id="main" className="app__main" tabIndex={-1}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`${page}/${projectId ?? ''}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              {content}
            </motion.div>
          </AnimatePresence>
        </main>

        <Footer />

        <AnimatePresence>
          {showTop && (
            <motion.button
              type="button"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.2 }}
              onClick={() => window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })}
              className="back-to-top"
              aria-label="Back to top"
            >
              <ArrowUp size={16} aria-hidden="true" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}

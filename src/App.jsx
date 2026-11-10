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

import { initPointerFx } from './utils/pointerFx';

const PAGES = ['home', 'experience', 'portfolio', 'skills'];

// Hash routes: '' (home), #experience, #portfolio, #portfolio/<id>, #skills, #contact
function parseHash() {
  const raw = window.location.hash.replace(/^#\/?/, '');
  const [page, ...rest] = raw.split('/');
  if (page === 'portfolio') {
    return { page, projectId: rest.join('/') || null, contact: false };
  }
  if (PAGES.includes(page)) return { page, projectId: null, contact: false };
  return { page: 'home', projectId: null, contact: page === 'contact' };
}

function getInitialTheme() {
  try {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark' || stored === 'light') return stored;
  } catch {
    // Storage unavailable (private mode etc.) — fall back to the default.
  }
  return 'dark';
}

function prefersReducedMotion() {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
}

// The home page may still be mounting (page transition), so retry briefly.
function scrollToContact() {
  let tries = 0;
  const tick = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
    } else if (tries++ < 40) {
      setTimeout(tick, 50);
    }
  };
  tick();
}

export default function App() {
  const [route, setRoute] = useState(parseHash);
  const [theme, setTheme] = useState(getInitialTheme);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);

  const { page, projectId } = route;

  // Keep the route in sync with the URL hash (deep links, back/forward).
  useEffect(() => {
    const onHashChange = () => {
      const next = parseHash();
      setRoute(next);
      if (next.contact) scrollToContact();
    };
    window.addEventListener('hashchange', onHashChange);
    if (parseHash().contact) scrollToContact();
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // Start every page at the top.
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [page, projectId]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('theme', theme);
    } catch {
      // Ignore storage failures; the theme still applies for this session.
    }
  }, [theme]);

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
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
    setTimeout(() => root.classList.remove('theme-transitioning'), 350);
  }, []);

  const navigate = useCallback((target) => {
    const hash = target === 'home' ? '' : `#${target}`;
    if (window.location.hash === hash || (hash === '' && window.location.hash === '#')) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      return;
    }
    window.location.hash = hash;
  }, []);

  const goToContact = useCallback(() => {
    if (parseHash().page !== 'home') window.location.hash = '';
    scrollToContact();
  }, []);

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
    default:
      content = <HomePage onContact={goToContact} />;
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

        <Footer onContact={goToContact} />

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

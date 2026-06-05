import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

import Header from './components/Header';
import PlanetGlow from './components/PlanetGlow';
import CommandMenu from './components/CommandMenu';

// Pages
import HomePage from './pages/HomePage';
import ExperiencePage from './pages/ExperiencePage';
import PortfolioPage from './pages/PortfolioPage';
import SkillsPage from './pages/SkillsPage';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });
  const [cmdOpen, setCmdOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    // Synchronize page based on window hash for direct sharing / back buttons
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#portfolio/')) {
        setActivePage('portfolio');
      } else if (hash === '#experience') {
        setActivePage('experience');
      } else if (hash === '#portfolio') {
        setActivePage('portfolio');
      } else if (hash === '#skills') {
        setActivePage('skills');
      } else {
        setActivePage('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Run on mount
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    // Apply theme attribute to document element for global CSS styling
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCmdOpen(v => !v);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleTheme = () => {
    // Add transition class so all elements animate color changes
    document.documentElement.classList.add('theme-transitioning');
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
    // Remove class after transition completes (matches CSS 0.4s duration)
    setTimeout(() => {
      document.documentElement.classList.remove('theme-transitioning');
    }, 500);
  };

  const handleNavigate = (page) => {
    setActivePage(page);
    window.location.hash = page === 'home' ? '' : page;
  };

  const renderActivePage = () => {
    switch (activePage) {
      case 'experience':
        return <ExperiencePage />;
      case 'portfolio':
        return <PortfolioPage />;
      case 'skills':
        return <SkillsPage />;
      case 'home':
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div style={{ position: 'relative', overflowX: 'hidden', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* Global Background space visuals */}
      <PlanetGlow activePage={activePage} theme={theme} />

      {/* Header Navigation */}
      <Header
        activePage={activePage}
        onNavigate={handleNavigate}
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenCommandMenu={() => setCmdOpen(true)}
      />

      {/* Command Explorer Menu */}
      <CommandMenu
        isOpen={cmdOpen}
        onClose={() => setCmdOpen(false)}
        onNavigate={handleNavigate}
      />

      {/* Main Content Area with Page Transitions */}
      <main style={{ flex: 1, zIndex: 10, position: 'relative' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{ width: '100%' }}
          >
            {renderActivePage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerInner}>
          <span style={styles.footerText}>© {new Date().getFullYear()} Rifqi Aufa Thufail</span>
          <span style={styles.footerRight}>Built with React & Framer Motion</span>
        </div>
      </footer>

      {/* Back to Top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, y: 12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.9 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={styles.bttBtn}
            className="back-to-top-btn"
            aria-label="Back to top"
          >
            <ArrowUp size={13} />
            <span>Top</span>
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}

const styles = {
  footer: {
    borderTop: '1px solid var(--border)',
    padding: '28px 24px',
    position: 'relative',
    zIndex: 10,
    background: 'var(--glass-bg)',
  },
  footerInner: {
    maxWidth: '1100px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '8px',
  },
  footerText: { fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)' },
  footerRight: { fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)', fontFamily: 'monospace' },

  bttBtn: {
    position: 'fixed',
    bottom: '28px',
    right: '28px',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    background: 'var(--bg-secondary)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    border: '1px solid var(--border)',
    color: 'var(--text-secondary)',
    padding: '9px 16px',
    borderRadius: '100px',
    fontSize: 'var(--font-size-xs)',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 8px 24px -6px rgba(0,0,0,0.5)',
  },
};

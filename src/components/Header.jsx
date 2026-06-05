import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV = [
  { label: 'Home',       page: 'home'       },
  { label: 'Experience', page: 'experience' },
  { label: 'Portfolio',  page: 'portfolio'  },
  { label: 'Skills',     page: 'skills'     },
];

export default function Header({ activePage, onNavigate, theme, onToggleTheme, onOpenCommandMenu }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navigateTo = (e, page) => {
    e.preventDefault();
    setMobileOpen(false);
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getHeaderBg = () => {
    if (mobileOpen) {
      return theme === 'dark' ? 'rgba(10, 10, 10, 0.92)' : 'rgba(255, 255, 255, 0.92)';
    }
    if (theme === 'dark') {
      return scrolled ? 'rgba(10, 10, 10, 0.65)' : 'rgba(10, 10, 10, 0.3)';
    } else {
      return scrolled ? 'rgba(255, 255, 255, 0.65)' : 'rgba(255, 255, 255, 0.3)';
    }
  };

  const getHeaderBorder = () => {
    if (theme === 'dark') {
      return scrolled ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.05)';
    } else {
      return scrolled ? 'rgba(0, 0, 0, 0.08)' : 'rgba(0, 0, 0, 0.05)';
    }
  };

  return (
    <>
      <header
        className={`floating-header ${scrolled ? 'scrolled' : ''} ${mobileOpen ? 'mobile-open' : ''}`}
        style={{
          background: getHeaderBg(),
          borderColor: getHeaderBorder(),
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          maxHeight: mobileOpen ? '450px' : '64px',
          borderRadius: mobileOpen ? '24px' : '100px',
          boxShadow: theme === 'dark'
            ? (scrolled || mobileOpen ? '0 12px 30px -10px rgba(0, 0, 0, 0.5)' : '0 4px 20px -10px rgba(0, 0, 0, 0.3)')
            : (scrolled || mobileOpen ? '0 12px 30px -10px rgba(15, 23, 42, 0.08)' : '0 4px 20px -10px rgba(15, 23, 42, 0.03)'),
        }}
      >
        <div style={styles.inner} className="floating-header-inner">

          {/* Logo */}
          <a href="#home" onClick={(e) => navigateTo(e, 'home')} style={styles.logo}>
            <span style={styles.logoMark} />
            <span style={styles.logoText}>thufail.dev</span>
          </a>

          {/* Desktop nav */}
          <nav style={styles.nav} className="header-desktop-nav desktop-only">
            {NAV.map((n) => {
              const isActive = activePage === n.page;
              return (
                <a
                  key={n.label}
                  href={`#${n.page}`}
                  onClick={(e) => navigateTo(e, n.page)}
                  style={{
                    ...styles.navLink,
                    color: isActive ? '#3b82f6' : 'var(--text-secondary)',
                    fontWeight: isActive ? 600 : 500
                  }}
                  className="hdr-link"
                >
                  {n.label}
                </a>
              );
            })}
          </nav>

          {/* Right actions */}
          <div style={styles.actions} className="header-actions desktop-only">
            {/* Theme Toggle */}
            <button
              onClick={onToggleTheme}
              style={styles.actionBtn}
              className="hdr-action-btn"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* Command Menu Toggle */}
            <button
              onClick={onOpenCommandMenu}
              style={styles.cmdBtn}
              className="hdr-cmd"
              title="Open command explorer (⌘K)"
            >
              <span style={styles.cmdIcon}>⌘</span>
              <span>K</span>
            </button>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('home');
                setTimeout(() => {
                  const el = document.getElementById('contact-direct');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              style={styles.ctaBtn}
              className="hdr-cta"
            >
              Let's Talk
            </a>
          </div>

          {/* Mobile toggle & theme icon */}
          <div style={styles.mobileRightActions} className="header-mobile-right-actions mobile-only">
            <button
              onClick={onToggleTheme}
              style={styles.actionBtn}
              className="hdr-action-btn"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <button
              onClick={() => setMobileOpen(v => !v)}
              style={styles.mobileToggle}
              aria-label="Toggle menu"
              className="header-mobile-toggle mobile-burger-btn"
            >
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '20px', height: '12px' }}>
                <div className={`burger-line line-1 ${mobileOpen ? 'open' : ''}`} />
                <div className={`burger-line line-2 ${mobileOpen ? 'open' : ''}`} />
                <div className={`burger-line line-3 ${mobileOpen ? 'open' : ''}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile menu inside the header element */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              style={{ ...styles.mobileMenu, overflow: 'hidden' }}
              className="header-mobile-menu mobile-only"
            >
              {NAV.map((n) => {
                const isActive = activePage === n.page;
                return (
                  <a
                    key={n.label}
                    href={`#${n.page}`}
                    onClick={(e) => navigateTo(e, n.page)}
                    style={{
                      ...styles.mobileLink,
                      color: isActive ? '#3b82f6' : 'var(--text-secondary)',
                      fontWeight: isActive ? 600 : 500
                    }}
                  >
                    {n.label}
                  </a>
                );
              })}
              <div style={styles.mobileDivider} />
              <button
                onClick={() => { setMobileOpen(false); onOpenCommandMenu(); }}
                style={styles.mobileCmdBtn}
              >
                Command Explorer ⌘K
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <style>{`
        .floating-header {
          position: fixed;
          left: 50%;
          transform: translateX(-50%);
          width: calc(100% - 32px);
          max-width: 1000px;
          top: 16px;
          z-index: 1000;
          overflow: hidden;
          border: 1px solid transparent;
          transition: max-height 0.3s cubic-bezier(0.16, 1, 0.3, 1),
                      border-radius 0.3s cubic-bezier(0.16, 1, 0.3, 1),
                      background 0.3s ease,
                      border-color 0.3s ease,
                      box-shadow 0.3s ease;
        }

        @media (max-width: 768px) {
          .floating-header {
            width: calc(100% - 24px);
            top: 12px;
          }
        }

        .floating-header-inner {
          padding-left: 36px;
          padding-right: 12px;
        }
        @media (max-width: 768px) {
          .floating-header-inner {
            padding: 0 20px;
            gap: 16px !important;
          }
        }

        .header-mobile-menu {
          padding: 12px 36px 32px 36px !important;
          display: flex !important;
          flex-direction: column;
          gap: 16px;
          width: 100%;
        }
        @media (max-width: 768px) {
          .header-mobile-menu {
            padding: 12px 20px 24px 20px !important;
          }
        }

        .hdr-link {
          transition: opacity 0.2s ease, color 0.2s ease;
        }
        .hdr-link:hover { color: #3b82f6 !important; }

        .hdr-action-btn {
          background: var(--glass-bg);
          border: 1px solid var(--border);
          border-radius: 6px;
          color: var(--text-secondary);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          transition: all 0.2s ease;
        }
        .hdr-action-btn:hover {
          background: rgba(59, 130, 246, 0.1);
          border-color: rgba(59, 130, 246, 0.2);
          color: #3b82f6;
        }

        .hdr-cmd {
          transition: all 0.2s ease;
        }
        .hdr-cmd:hover {
          background: rgba(59, 130, 246, 0.1) !important;
          border-color: rgba(59, 130, 246, 0.2) !important;
          color: #3b82f6 !important;
        }

        .hdr-cta {
          transition: all 0.2s ease;
        }
        .hdr-cta:hover {
          background: #3b82f6 !important;
          color: #ffffff !important;
          box-shadow: 0 4px 14px -2px rgba(59,130,246,0.3) !important;
        }

        /* Responsive Visibility Control */
        .desktop-only { display: flex !important; }
        .mobile-only { display: none !important; }

        @media (max-width: 768px) {
          .desktop-only { display: none !important; }
          .mobile-only { display: flex !important; }
        }

        /* Focus Ring Reset to prevent ugly outlines */
        button:focus, a:focus {
          outline: none !important;
        }
        button:focus-visible, a:focus-visible {
          outline: 2px solid var(--accent) !important;
          outline-offset: 2px !important;
        }

        /* Custom Animated Burger Button */
        .mobile-burger-btn {
          background: var(--glass-bg) !important;
          border: 1px solid var(--border) !important;
          border-radius: 6px !important;
          color: var(--text-secondary) !important;
          cursor: pointer;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          width: 32px !important;
          height: 32px !important;
          transition: all 0.2s ease !important;
          padding: 0 !important;
        }
        .mobile-burger-btn:hover {
          background: rgba(59, 130, 246, 0.1) !important;
          border-color: rgba(59, 130, 246, 0.2) !important;
          color: #3b82f6 !important;
        }

        .burger-line {
          width: 20px;
          height: 2px;
          background-color: var(--text-primary);
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
          transform-origin: center;
        }

        .burger-line.line-1.open {
          transform: translateY(5px) rotate(45deg);
        }

        .burger-line.line-2.open {
          opacity: 0;
          transform: scaleX(0);
        }

        .burger-line.line-3.open {
          transform: translateY(-5px) rotate(-45deg);
        }
      `}</style>
    </>
  );
}

const styles = {
  header: {},
  inner: {
    width: '100%',
    height: '64px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '24px',
    position: 'relative',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '9px',
    flexShrink: 0,
  },
  logoMark: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #60a5fa, #3b82f6)',
    boxShadow: '0 0 12px rgba(59,130,246,0.6)',
    flexShrink: 0,
  },
  logoText: {
    fontFamily: "'Outfit', sans-serif",
    fontWeight: 600,
    fontSize: 'var(--font-size-base)',
    color: 'var(--text-primary)',
    letterSpacing: '-0.02em',
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: '28px',
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
  },
  navLink: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--text-secondary)',
    letterSpacing: '0.01em',
    transition: 'color 0.2s ease',
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    flexShrink: 0,
  },
  mobileRightActions: {
    alignItems: 'center',
    gap: '8px',
  },
  actionBtn: {},
  cmdBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '3px',
    background: 'var(--glass-bg)',
    border: '1px solid var(--border)',
    borderRadius: '6px',
    padding: '5px 10px',
    color: 'var(--text-secondary)',
    fontSize: 'var(--font-size-xs)',
    fontFamily: 'monospace',
    cursor: 'pointer',
    letterSpacing: '0.02em',
    height: '32px',
  },
  cmdIcon: {
    fontSize: 'var(--font-size-xs)',
  },
  ctaBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    background: 'var(--btn-primary-bg)',
    color: 'var(--btn-primary-text)',
    fontSize: 'var(--font-size-sm)',
    fontWeight: 600,
    padding: '7px 16px',
    borderRadius: '100px',
    border: 'none',
    cursor: 'pointer',
    letterSpacing: '0.01em',
  },
  mobileToggle: {
    background: 'none',
    border: 'none',
    color: 'var(--text-primary)',
    cursor: 'pointer',
    padding: 0,
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '32px',
  },
  mobileMenu: {},
  mobileLink: {
    fontSize: 'var(--font-size-base)',
    color: 'var(--text-secondary)',
    padding: '4px 0',
  },
  mobileDivider: {
    height: '1px',
    background: 'var(--border)',
  },
  mobileCmdBtn: {
    background: 'var(--glass-bg)',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    color: 'var(--text-secondary)',
    padding: '10px 14px',
    fontSize: 'var(--font-size-sm)',
    fontFamily: 'monospace',
    cursor: 'pointer',
    textAlign: 'left',
  },
};

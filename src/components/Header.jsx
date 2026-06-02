import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const NAV = [
  { label: 'About',      href: '#about'       },
  { label: 'Experience', href: '#experience'   },
  { label: 'Projects',   href: '#projects'     },
  { label: 'Skills',     href: '#skills'       },
  { label: 'Contact',    href: '#contact'      },
];

export default function Header({ onOpenCommandMenu }) {
  const [scrolled,    setScrolled]    = useState(false);
  const [progress,    setProgress]    = useState(0);
  const [mobileOpen,  setMobileOpen]  = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <header style={{
        ...styles.header,
        background: scrolled
          ? 'rgba(10, 10, 10, 0.85)'
          : 'transparent',
        borderBottomColor: scrolled
          ? 'rgba(255,255,255,0.07)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
      }}>
        <div style={styles.inner}>

          {/* Logo */}
          <a href="#" onClick={(e) => go(e, 'body')} style={styles.logo}>
            <span style={styles.logoMark} />
            <span style={styles.logoText}>Rifqi Aufa</span>
          </a>

          {/* Desktop nav */}
          <nav style={styles.nav} className="header-desktop-nav">
            {NAV.map((n) => (
              <a
                key={n.label}
                href={n.href}
                onClick={(e) => go(e, n.href)}
                style={styles.navLink}
                className="hdr-link"
              >
                {n.label}
              </a>
            ))}
          </nav>

          {/* Right actions */}
          <div style={styles.actions} className="header-actions">
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
              onClick={(e) => go(e, '#contact')}
              style={styles.ctaBtn}
              className="hdr-cta"
            >
              Let's Talk
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(v => !v)}
            style={styles.mobileToggle}
            aria-label="Toggle menu"
            className="header-mobile-toggle"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Progress bar */}
        <div style={styles.progressTrack}>
          <div style={{ ...styles.progressBar, width: `${progress}%` }} />
        </div>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={styles.mobileMenu} className="header-mobile-menu">
          {NAV.map((n) => (
            <a
              key={n.label}
              href={n.href}
              onClick={(e) => go(e, n.href)}
              style={styles.mobileLink}
            >
              {n.label}
            </a>
          ))}
          <div style={styles.mobileDivider} />
          <button
            onClick={() => { setMobileOpen(false); onOpenCommandMenu(); }}
            style={styles.mobileCmdBtn}
          >
            Command Explorer ⌘K
          </button>
        </div>
      )}

      <style>{`
        .hdr-link {
          opacity: 0.55;
          transition: opacity 0.2s ease, color 0.2s ease;
        }
        .hdr-link:hover { opacity: 1; color: #ffffff; }

        .hdr-cmd {
          transition: all 0.2s ease;
        }
        .hdr-cmd:hover {
          background: rgba(255,255,255,0.08) !important;
          border-color: rgba(255,255,255,0.18) !important;
        }

        .hdr-cta {
          transition: all 0.2s ease;
        }
        .hdr-cta:hover {
          background: rgba(255,255,255,0.9) !important;
          box-shadow: 0 4px 14px -2px rgba(255,255,255,0.15) !important;
        }

        @media (max-width: 768px) {
          .header-desktop-nav { display: none !important; }
          .header-actions { display: none !important; }
          .header-mobile-toggle { display: flex !important; }
        }
        @media (min-width: 769px) {
          .header-mobile-toggle { display: none !important; }
          .header-mobile-menu { display: none !important; }
        }
      `}</style>
    </>
  );
}

const styles = {
  header: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: '64px',
    borderBottom: '1px solid transparent',
    zIndex: 1000,
    transition: 'background 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease',
  },
  inner: {
    maxWidth: '1100px',
    height: '100%',
    margin: '0 auto',
    padding: '0 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '24px',
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
    background: 'linear-gradient(135deg, #a78bfa, #60a5fa)',
    boxShadow: '0 0 12px rgba(124,58,237,0.6)',
    flexShrink: 0,
  },
  logoText: {
    fontFamily: "'Outfit', sans-serif",
    fontWeight: 600,
    fontSize: 'var(--font-size-base)',
    color: '#ffffff',
    letterSpacing: '-0.02em',
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: '28px',
    flex: 1,
    justifyContent: 'center',
  },
  navLink: {
    fontSize: 'var(--font-size-sm)',
    fontWeight: 500,
    color: '#ffffff',
    letterSpacing: '0.01em',
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    flexShrink: 0,
  },
  cmdBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '3px',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '6px',
    padding: '5px 10px',
    color: 'rgba(255,255,255,0.5)',
    fontSize: 'var(--font-size-xs)',
    fontFamily: 'monospace',
    cursor: 'pointer',
    letterSpacing: '0.02em',
  },
  cmdIcon: {
    fontSize: 'var(--font-size-xs)',
  },
  ctaBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    background: '#ffffff',
    color: '#000000',
    fontSize: 'var(--font-size-sm)',
    fontWeight: 600,
    padding: '7px 16px',
    borderRadius: '7px',
    border: 'none',
    cursor: 'pointer',
    letterSpacing: '0.01em',
  },
  mobileToggle: {
    background: 'none',
    border: 'none',
    color: '#ffffff',
    cursor: 'pointer',
    padding: '8px',
    borderRadius: '6px',
    display: 'none',
  },
  mobileMenu: {
    position: 'fixed',
    top: '64px',
    left: 0,
    right: 0,
    zIndex: 999,
    background: 'rgba(10,10,10,0.97)',
    borderBottom: '1px solid rgba(255,255,255,0.07)',
    backdropFilter: 'blur(20px)',
    padding: '24px 28px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  mobileLink: {
    fontSize: 'var(--font-size-base)',
    fontWeight: 500,
    color: 'rgba(255,255,255,0.8)',
    padding: '4px 0',
  },
  mobileDivider: {
    height: '1px',
    background: 'rgba(255,255,255,0.07)',
  },
  mobileCmdBtn: {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '8px',
    color: 'rgba(255,255,255,0.7)',
    padding: '10px 14px',
    fontSize: 'var(--font-size-sm)',
    fontFamily: 'monospace',
    cursor: 'pointer',
    textAlign: 'left',
  },
  progressTrack: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '1px',
    background: 'rgba(255,255,255,0.04)',
  },
  progressBar: {
    height: '100%',
    background: 'linear-gradient(90deg, #7c3aed, #3b82f6)',
    transition: 'width 0.1s linear',
  },
};

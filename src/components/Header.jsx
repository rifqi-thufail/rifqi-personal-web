import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Menu, Search, X } from 'lucide-react';
import { NAV } from '../data/site';
import { useIsMac } from '../utils/client';

export default function Header({ activePage, onOpenCommandMenu, onContact }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMac = useIsMac();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu on Escape or when the viewport grows to desktop.
  useEffect(() => {
    if (!mobileOpen) return undefined;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    const mq = window.matchMedia('(min-width: 901px)');
    const onChange = (e) => {
      if (e.matches) setMobileOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    mq.addEventListener('change', onChange);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      mq.removeEventListener('change', onChange);
    };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <header className={`site-header${scrolled || mobileOpen ? ' is-scrolled' : ''}`}>
      <div className="container site-header__inner">
        <a href="/" className="brand" onClick={closeMobile} aria-label="thufail.dev — home">
          <img className="brand__mark" src="/logo.svg" alt="" width="22" height="26" />
          <span>thufail.dev</span>
        </a>

        <nav className="site-nav" aria-label="Primary">
          {NAV.map((n) => (
            <a
              key={n.page}
              href={n.href}
              className="site-nav__link"
              aria-current={activePage === n.page ? 'page' : undefined}
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="site-header__actions">
          <button type="button" className="search-btn" onClick={onOpenCommandMenu} aria-label="Open command menu">
            <Search size={14} aria-hidden="true" />
            <span>Search</span>
            <kbd>{isMac ? '⌘K' : 'Ctrl K'}</kbd>
          </button>

          <a className="btn btn-hot btn-sm site-header__cta" href="/#contact">
            Let&rsquo;s talk <ArrowRight size={14} aria-hidden="true" />
          </a>

          <button
            type="button"
            className="icon-btn menu-toggle"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            className="mobile-menu"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
          >
            <nav className="container mobile-menu__inner" aria-label="Mobile">
              {NAV.map((n) => (
                <a
                  key={n.page}
                  href={n.href}
                  className="mobile-menu__link"
                  aria-current={activePage === n.page ? 'page' : undefined}
                  onClick={closeMobile}
                >
                  {n.label}
                </a>
              ))}
              <div className="mobile-menu__actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    closeMobile();
                    onOpenCommandMenu();
                  }}
                >
                  <Search size={15} aria-hidden="true" /> Search
                </button>
                <button
                  type="button"
                  className="btn btn-hot"
                  onClick={() => {
                    closeMobile();
                    onContact();
                  }}
                >
                  Let&rsquo;s talk <ArrowRight size={15} aria-hidden="true" />
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

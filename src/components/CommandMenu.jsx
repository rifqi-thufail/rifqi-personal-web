import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Check, ExternalLink, Mail, Moon, Search, Sparkles, Sun, X } from 'lucide-react';
import { CONTACT } from '../data/site';
import { copyToClipboard } from '../utils/clipboard';

function Palette({ onClose, onNavigate, onContact, onToggleTheme, theme }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copyState, setCopyState] = useState('idle'); // 'idle' | 'copied' | 'failed'
  const inputRef = useRef(null);
  const closeRef = useRef(null);
  const listRef = useRef(null);

  // Focus the input on open; restore focus to the trigger on close.
  useEffect(() => {
    const previous = document.activeElement;
    inputRef.current?.focus();
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = overflow;
      if (previous instanceof HTMLElement) previous.focus({ preventScroll: true });
    };
  }, []);

  // Give the "copied" confirmation a moment on screen, then close.
  useEffect(() => {
    if (copyState !== 'copied') return undefined;
    const timer = setTimeout(onClose, 1100);
    return () => clearTimeout(timer);
  }, [copyState, onClose]);

  const items = useMemo(() => {
    const go = (page) => () => {
      onNavigate(page);
      onClose();
    };
    return [
      { id: 'home', label: 'Go to Home', category: 'Navigation', icon: <ArrowRight size={15} />, action: go('home') },
      { id: 'experience', label: 'Go to Experience & Education', category: 'Navigation', icon: <ArrowRight size={15} />, action: go('experience') },
      { id: 'portfolio', label: 'Go to Portfolio & Projects', category: 'Navigation', icon: <ArrowRight size={15} />, action: go('portfolio') },
      { id: 'skills', label: 'Go to Skills & Certifications', category: 'Navigation', icon: <ArrowRight size={15} />, action: go('skills') },
      {
        id: 'contact',
        label: 'Go to Contact Info',
        category: 'Navigation',
        icon: <ArrowRight size={15} />,
        action: () => {
          onClose();
          onContact();
        },
      },
      {
        id: 'linkedin',
        label: 'Open LinkedIn Profile',
        category: 'Links',
        icon: <ExternalLink size={15} />,
        action: () => {
          window.open(CONTACT.linkedinUrl, '_blank', 'noopener,noreferrer');
          onClose();
        },
      },
      {
        id: 'email',
        label:
          copyState === 'copied' ? 'Email copied to clipboard'
          : copyState === 'failed' ? `Copy failed — ${CONTACT.email}`
          : 'Copy Email to Clipboard',
        category: 'Contact',
        icon: copyState === 'copied' ? <Check size={15} /> : <Mail size={15} />,
        success: copyState === 'copied',
        action: async () => {
          const ok = await copyToClipboard(CONTACT.email);
          setCopyState(ok ? 'copied' : 'failed');
        },
      },
      {
        id: 'theme',
        label: theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme',
        category: 'Preferences',
        icon: theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />,
        action: () => {
          onToggleTheme();
          onClose();
        },
      },
      {
        id: 'confetti',
        label: 'Trigger Confetti',
        category: 'Fun',
        icon: <Sparkles size={15} />,
        action: async () => {
          const { default: confetti } = await import('canvas-confetti');
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#2a63f6', '#7aa2ff', '#e0213a', '#ffffff'],
            disableForReducedMotion: true,
          });
          onClose();
        },
      },
    ];
  }, [copyState, onClose, onContact, onNavigate, onToggleTheme, theme]);

  const q = query.trim().toLowerCase();
  const filtered = items.filter(
    (item) => item.label.toLowerCase().includes(q) || item.category.toLowerCase().includes(q),
  );
  const active = filtered.length ? Math.min(selectedIndex, filtered.length - 1) : -1;

  useEffect(() => {
    listRef.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (filtered.length) setSelectedIndex((active + 1) % filtered.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (filtered.length) setSelectedIndex((active - 1 + filtered.length) % filtered.length);
    } else if (e.key === 'Enter') {
      if (document.activeElement === closeRef.current) return;
      e.preventDefault();
      filtered[active]?.action();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    } else if (e.key === 'Tab') {
      // Keep focus inside the dialog: it only has the input and the close button.
      e.preventDefault();
      (document.activeElement === inputRef.current ? closeRef.current : inputRef.current)?.focus();
    }
  };

  return (
    <motion.div
      className="cmd-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        className="cmd"
        role="dialog"
        aria-modal="true"
        aria-label="Command menu"
        initial={{ opacity: 0, scale: 0.98, y: -8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: -8 }}
        transition={{ duration: 0.16, ease: 'easeOut' }}
        onKeyDown={onKeyDown}
      >
        <div className="cmd__search">
          <Search size={17} aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-expanded="true"
            aria-controls="cmd-list"
            aria-activedescendant={active >= 0 ? `cmd-item-${filtered[active].id}` : undefined}
            aria-label="Search commands"
            placeholder="Search pages and actions…"
            autoComplete="off"
            spellCheck="false"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
          />
          <button ref={closeRef} type="button" className="icon-btn icon-btn--sm" onClick={onClose} aria-label="Close command menu">
            <X size={15} aria-hidden="true" />
          </button>
        </div>

        <div className="cmd__list" id="cmd-list" role="listbox" aria-label="Commands" ref={listRef}>
          {filtered.length > 0 ? (
            filtered.map((item, idx) => (
              <div
                key={item.id}
                id={`cmd-item-${item.id}`}
                role="option"
                aria-selected={idx === active}
                className={`cmd__item${item.success ? ' is-success' : ''}`}
                onClick={item.action}
                onMouseMove={() => setSelectedIndex(idx)}
              >
                <span className="cmd__item-icon" aria-hidden="true">{item.icon}</span>
                <span className="cmd__item-label">{item.label}</span>
                <span className="cmd__item-category">{item.category}</span>
              </div>
            ))
          ) : (
            <div className="cmd__empty">No commands matching &ldquo;{query}&rdquo;.</div>
          )}
        </div>

        <div className="cmd__footer" aria-hidden="true">
          <span><kbd>↑</kbd><kbd>↓</kbd> Navigate</span>
          <span><kbd>↵</kbd> Select</span>
          <span><kbd>Esc</kbd> Close</span>
        </div>

        <span className="sr-only" role="status">
          {copyState === 'copied' ? 'Email copied to clipboard' : copyState === 'failed' ? 'Copy failed' : ''}
        </span>
      </motion.div>
    </motion.div>
  );
}

export default function CommandMenu({ isOpen, ...props }) {
  return (
    <AnimatePresence>
      {isOpen && <Palette key="palette" {...props} />}
    </AnimatePresence>
  );
}

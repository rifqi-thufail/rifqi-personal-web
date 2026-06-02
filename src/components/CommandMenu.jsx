import { useState, useEffect, useRef } from 'react';
import { Search, Hash, Globe, Mail, Sparkles, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function CommandMenu({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  // Focus input automatically on open
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const items = [
    { id: 'about', label: 'Scroll to: About Me', category: 'Navigation', icon: <Hash size={14} />, action: () => scrollToSection('#about') },
    { id: 'experience', label: 'Scroll to: Work Experience', category: 'Navigation', icon: <Hash size={14} />, action: () => scrollToSection('#experience') },
    { id: 'projects', label: 'Scroll to: Key Projects', category: 'Navigation', icon: <Hash size={14} />, action: () => scrollToSection('#projects') },
    { id: 'skills', label: 'Scroll to: Skills & Certifications', category: 'Navigation', icon: <Hash size={14} />, action: () => scrollToSection('#skills') },
    { id: 'contact', label: 'Scroll to: Contact Form', category: 'Navigation', icon: <Hash size={14} />, action: () => scrollToSection('#contact') },
    { id: 'linkedin', label: 'Open: LinkedIn Profile', category: 'External Links', icon: <Globe size={14} />, action: () => window.open('https://linkedin.com/in/rifqiaufathufail/', '_blank') },
    { id: 'email', label: 'Copy Email to Clipboard', category: 'Contact', icon: <Mail size={14} />, action: () => copyEmail() },
    { id: 'confetti', label: 'Trigger Confetti Splash', category: 'Fun', icon: <Sparkles size={14} />, action: () => triggerConfetti() },
  ];

  const filteredItems = items.filter(item =>
    item.label.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  const scrollToSection = (id) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    onClose();
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('rifqi_26000130@utp.edu.my');
    alert('Email copied to clipboard!');
    onClose();
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#a78bfa', '#60a5fa', '#ffffff', '#f9fafb']
    });
    onClose();
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % filteredItems.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredItems.length) % filteredItems.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          filteredItems[selectedIndex].action();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, filteredItems, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div style={styles.overlay} onClick={onClose}>
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            style={styles.modal}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Input bar */}
            <div style={styles.searchBar}>
              <Search size={16} style={styles.searchIcon} />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search commands (e.g. scroll, LinkedIn, confetti)..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                style={styles.searchInput}
              />
              <button onClick={onClose} style={styles.closeBtn}>
                <X size={14} />
              </button>
            </div>

            {/* Command List */}
            <div style={styles.list}>
              {filteredItems.length > 0 ? (
                filteredItems.map((item, idx) => {
                  const isSelected = idx === selectedIndex;
                  return (
                    <div
                      key={item.id}
                      onClick={item.action}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      style={{
                        ...styles.item,
                        backgroundColor: isSelected ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
                      }}
                    >
                      <div style={styles.itemLeft}>
                        <div style={{
                          ...styles.itemIcon,
                          color: isSelected ? '#ffffff' : 'var(--text-muted)'
                        }}>
                          {item.icon}
                        </div>
                        <span style={{
                          ...styles.itemLabel,
                          color: isSelected ? '#ffffff' : 'var(--text-secondary)'
                        }}>
                          {item.label}
                        </span>
                      </div>
                      <span style={styles.itemCategory}>{item.category}</span>
                    </div>
                  );
                })
              ) : (
                <div style={styles.emptyState}>No commands matching "{query}" found.</div>
              )}
            </div>

            {/* Navigation Tips Footer */}
            <div style={styles.footer}>
              <span>Use <kbd style={styles.kbd}>↑↓</kbd> to navigate</span>
              <span><kbd style={styles.kbd}>Enter</kbd> to select</span>
              <span><kbd style={styles.kbd}>Esc</kbd> to close</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(3, 7, 18, 0.7)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    zIndex: 9999,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingTop: '15vh',
  },
  modal: {
    width: '100%',
    maxWidth: '560px',
    background: 'rgba(12, 12, 12, 0.97)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '14px',
    boxShadow: '0 40px 80px -20px rgba(0, 0, 0, 0.9), 0 0 0 1px rgba(255,255,255,0.04)',
    overflow: 'hidden',
    backdropFilter: 'blur(24px)',
    WebkitBackdropFilter: 'blur(24px)',
  },
  searchBar: {
    display: 'flex',
    alignItems: 'center',
    padding: '16px 20px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
  },
  searchIcon: {
    color: 'rgba(255,255,255,0.3)',
    marginRight: '12px',
    flexShrink: 0,
  },
  searchInput: {
    flex: 1,
    background: 'none',
    border: 'none',
    outline: 'none',
    color: '#ffffff',
    fontSize: 'var(--font-size-sm)',
    fontFamily: 'var(--font-sans)',
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--text-muted)',
    cursor: 'pointer',
    padding: '4px',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      backgroundColor: 'rgba(255,255,255,0.05)',
      color: '#ffffff',
    }
  },
  list: {
    maxHeight: '280px',
    overflowY: 'auto',
    padding: '8px',
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 14px',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.15s ease',
  },
  itemLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  itemIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemLabel: {
    fontSize: 'var(--font-size-sm)',
    fontWeight: 500,
  },
  itemCategory: {
    fontSize: 'var(--font-size-xs)',
    color: 'rgba(255,255,255,0.25)',
    fontFamily: 'monospace',
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
  },
  emptyState: {
    padding: '32px 0',
    textAlign: 'center',
    fontSize: 'var(--font-size-sm)',
    color: 'rgba(255,255,255,0.3)',
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '12px 20px',
    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
    background: 'rgba(255,255,255,0.02)',
    fontSize: 'var(--font-size-xs)',
    color: 'rgba(255,255,255,0.3)',
  },
  kbd: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '4px',
    padding: '1px 4px',
    margin: '0 2px',
    fontFamily: 'var(--font-mono)',
    fontSize: 'var(--font-size-xs)',
  },
};

import { ChevronRight, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import PlanetGlow from './PlanetGlow';

const VARIANTS = {
  hidden: { opacity: 0, y: 18 },
  show:   { opacity: 1, y: 0 },
};

export default function Hero({ onOpenCommandMenu }) {
  const scrollTo = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="hero-section" style={styles.section}>
      {/* Background space visuals */}
      <PlanetGlow />
      <div className="hero-inner" style={styles.inner}>

        {/* ── Eyebrow label ── */}
        <motion.div
          variants={VARIANTS}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={styles.eyebrow}
        >
          <span style={styles.eyebrowDot} />
          <span style={styles.eyebrowText}>Available for internship · Sep 2026 – Apr 2027</span>
        </motion.div>

        {/* ── Headline ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <motion.h2  
            variants={VARIANTS}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            style={styles.introHeadline}
          >
            Hello! 👋 My name is..
          </motion.h2>
          <motion.h1
            variants={VARIANTS}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            style={styles.headline}
          >
            Rifqi Aufa Thufail
          </motion.h1>
        </div>

        {/* ── Subheadline ── */}
        <motion.p
          variants={VARIANTS}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.7, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
          style={styles.sub}
        >
          Information Systems leader specialising in{' '}
          <span style={styles.subAccent}>Big Data Analytics</span>,{' '}
          <span style={styles.subAccent}>Blockchain Architecture</span>, and{' '}
          <span style={styles.subAccent}>SAP ERP</span> building digital systems that scale.
        </motion.p>

        {/* ── Badge row ── */}
        <motion.div
          variants={VARIANTS}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.7, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
          style={styles.badges}
        >
          {BADGES.map((b, i) => (
            <span key={i} style={{ ...styles.badge, borderColor: b.borderColor, color: b.color }}>
              {b.label}
            </span>
          ))}
        </motion.div>

        {/* ── CTA buttons ── */}
        <motion.div
          variants={VARIANTS}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.7, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
          style={styles.ctas}
          className="hero-ctas"
        >
          <button
            className="btn-primary hero-cta-primary"
            onClick={() => scrollTo('#projects')}
          
          >
            View Work
            <ChevronRight size={15} />
          </button>
          <button
            className="btn-secondary hero-cta-secondary"
            onClick={onOpenCommandMenu}
            style={{ borderRadius: '35px' }}
          >
            <Search size={15} />
            Search
            <kbd style={styles.kbdBadge}>⌘K</kbd>
          </button>
        </motion.div>

        {/* ── Stat row ── */}
        <motion.div
          variants={VARIANTS}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.7, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
          style={styles.stats}
          className="hero-stats"
        >
          {STATS.map((s, i) => (
            <div key={i} style={styles.stat} className="hero-stat">
              <span style={styles.statVal}>{s.value}</span>
              <span style={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </motion.div>

      </div>

      <style>{`
        .hero-cta-primary svg { transition: transform 0.2s ease; }
        .hero-cta-primary:hover svg { transform: translateX(3px); }

        .hero-section {
          padding: 120px 24px 80px;
        }

        .hero-inner {
          gap: 28px;
        }

        .hero-stats {
          display: grid !important;
          grid-template-columns: repeat(4, 1fr) !important;
          gap: 0;
          border-top: 1px solid rgba(255, 255, 255, 0.07);
          padding-top: 28px;
          width: 100%;
        }

        .hero-stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0 16px;
          border-right: 1px solid rgba(255, 255, 255, 0.07);
          gap: 4px;
        }

        .hero-stat:last-child {
          border-right: none;
        }

        @media (max-width: 768px) {
          .hero-section {
            padding: 96px 16px 90px !important;
          }

          .hero-inner {
            gap: 24px !important;
          }

          .hero-ctas {
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 12px;
          }

          .hero-ctas button {
            width: 100%;
            justify-content: center;
          }

          .hero-stats {
            grid-template-columns: repeat(2, 1fr) !important;
            border-top: none !important;
            padding: 24px 16px !important;
            background: rgba(255, 255, 255, 0.02) !important;
            backdrop-filter: blur(12px) !important;
            -webkit-backdrop-filter: blur(12px) !important;
            border: 1px solid rgba(255, 255, 255, 0.06) !important;
            border-radius: 16px !important;
            row-gap: 20px !important;
            column-gap: 0 !important;
          }

          .hero-stat {
            border-right: none !important;
            padding: 0 8px !important;
          }

          .hero-stat:nth-child(odd) {
            border-right: 1px solid rgba(255, 255, 255, 0.07) !important;
          }
        }
      `}</style>
    </section>
  );
}

const BADGES = [
  { label: "Dean's List — UTP",        color: 'rgba(167,139,250,0.9)', borderColor: 'rgba(124,58,237,0.3)' },
  { label: 'Dual Degree · 🇲🇾 MY & 🇮🇩 ID',    color: 'rgba(255,255,255,0.65)', borderColor: 'rgba(255,255,255,0.1)' },
];

const STATS = [
  { value: '3.52',   label: 'CGPA at UTP' },
  { value: '3.56',   label: 'CGPA at ITS' },
  { value: '2×',     label: 'National Finalist' },
  { value: '400K+',  label: 'Content Views' },
];

const styles = {
  section: {
    minHeight: '100svh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 10,
  },
  inner: {
    maxWidth: '740px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    position: 'relative',
    zIndex: 2,
  },
  eyebrow: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '100px',
    padding: '6px 14px',
  },
  eyebrowDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    backgroundColor: '#4ade80',
    boxShadow: '0 0 8px rgba(74,222,128,0.6)',
    flexShrink: 0,
  },
  eyebrowText: {
    fontSize: 'var(--font-size-xs)',
    fontWeight: 500,
    color: 'rgba(255,255,255,0.55)',
    letterSpacing: '0.01em',
  },
  introHeadline: {
    fontSize: 'var(--font-size-lg)',
    fontWeight: 600,
    color: 'rgba(255,255,255,0.7)',
    margin: 0,
  },
  headline: {
    fontSize: 'var(--font-size-4xl)',
    fontWeight: 800,
    letterSpacing: '-0.04em',
    lineHeight: 1.1,
    color: '#ffffff',
  },
  sub: {
    fontSize: 'var(--font-size-base)',
    lineHeight: 1.6,
    color: 'rgba(255,255,255,0.52)',
    maxWidth: '600px',
    fontWeight: 400,
  },
  subAccent: {
    color: 'rgba(255,255,255,0.85)',
    fontWeight: 500,
  },
  badges: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '8px',
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid',
    borderRadius: '100px',
    padding: '5px 13px',
    fontSize: 'var(--font-size-xs)',
    fontWeight: 500,
    letterSpacing: '0.01em',
  },
  ctas: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '12px',
  },
  kbdBadge: {
    fontSize: 'var(--font-size-xs)',
    background: 'rgba(255,255,255,0.07)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '4px',
    padding: '1px 5px',
    fontFamily: 'monospace',
    color: 'rgba(255,255,255,0.45)',
  },
  stats: {},
  stat: {},
  statVal: {
    fontSize: 'var(--font-size-xl)',
    fontWeight: 700,
    color: '#ffffff',
    fontFamily: "'Outfit', sans-serif",
    letterSpacing: '-0.03em',
    lineHeight: 1,
  },
  statLabel: {
    fontSize: 'var(--font-size-xs)',
    color: 'rgba(255,255,255,0.4)',
    fontWeight: 500,
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
    marginTop: '4px',
  },
};

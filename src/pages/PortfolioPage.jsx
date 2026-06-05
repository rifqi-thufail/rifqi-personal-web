/* eslint-disable react-hooks/immutability */
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Briefcase, Award, ChevronRight } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';

export default function PortfolioPage() {
  const [selectedId, setSelectedId] = useState(null);

  // Sync hash with active project for direct linking if desired
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#portfolio/')) {
        const id = hash.replace('#portfolio/', '');
        const match = PROJECTS.find(p => p.id === id);
        if (match) setSelectedId(id);
      } else {
        setSelectedId(null);
      }
    };

    window.addEventListener('hashchange', handleHash);
    handleHash(); // Initial check
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const selectProject = (id) => {
    if (id) {
      window.location.hash = `portfolio/${id}`;
    } else {
      window.location.hash = 'portfolio';
    }
  };

  const activeProject = PROJECTS.find((p) => p.id === selectedId);

  const glow = (e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mouse-x', `${e.clientX - r.left}px`);
    el.style.setProperty('--mouse-y', `${e.clientY - r.top}px`);
  };

  return (
    <div className="section-container" style={{ paddingTop: '112px', minHeight: '80vh' }}>
      <AnimatePresence mode="wait">
        {!activeProject ? (
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            {/* Title */}
            <div style={{ textAlign: 'center', marginBottom: '56px' }}>
              <span className="label-mono">Hall of Fame</span>
              <h1 style={pp.title}>Portfolio & Projects</h1>
              <p style={pp.subtitle}>A record of consulting projects, technical designs, and corporate strategies.</p>
            </div>

            {/* Projects Grid */}
            <div style={pp.grid}>
              {PROJECTS.map((proj) => (
                <div
                  key={proj.id}
                  className="glass-card project-list-card"
                  style={pp.card}
                  onClick={() => selectProject(proj.id)}
                  onMouseMove={glow}
                >
                  {proj.image && (
                    <div className="project-card-image-wrapper" style={{ marginBottom: '16px' }}>
                      <img src={proj.image} alt={proj.title} className="project-card-image" />
                    </div>
                  )}
                  <div style={pp.cardContent}>
                    <div style={pp.cardHead}>
                      <Briefcase size={18} style={{ color: '#3b82f6' }} />
                      <span style={pp.cardTag}>{proj.tags[0]}</span>
                    </div>
                    <h3 style={pp.cardTitle}>{proj.title}</h3>
                    <p style={pp.cardDesc}>{proj.subtitle}</p>
                    <div style={pp.cardFooter}>
                      <span style={pp.learnMoreBtn}>View details <ChevronRight size={14} /></span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="detail"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            style={pp.detailContainer}
          >
            {/* Back Button */}
            <button onClick={() => selectProject(null)} style={pp.backBtn}>
              <ArrowLeft size={16} /> Back to Portfolios
            </button>

            {/* Project Heading */}
            <div style={pp.detailHeader}>
              <h1 style={pp.detailTitle}>{activeProject.title}</h1>
              <p style={pp.detailSubtitle}>{activeProject.subtitle}</p>
              <div style={pp.tagRow}>
                {activeProject.tags.map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </div>

            {/* Project Body */}
            <div style={pp.detailGrid}>
              <div style={pp.detailLeft}>
                <h3 style={pp.sectionTitle}>Overview</h3>
                <p style={pp.detailText}>{activeProject.description}</p>

                <h3 style={pp.sectionTitle} style={{ marginTop: '32px', marginBottom: '16px' }}>Key Accomplishments</h3>
                <div style={pp.bullets}>
                  {activeProject.achievements.map((ach, idx) => (
                    <div key={idx} style={pp.bullet}>
                      <Award size={16} style={{ color: '#3b82f6', flexShrink: 0, marginTop: '2px' }} />
                      <span>{ach}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={pp.detailRight}>
                {activeProject.image ? (
                  <div className="glass-card" style={pp.imageWrapper}>
                    <img src={activeProject.image} alt={activeProject.title} style={pp.detailImage} />
                  </div>
                ) : (
                  <div className="glass-card" style={pp.blueprintCard}>
                    <span className="label-mono">System Blueprint</span>
                    <h4 style={pp.blueprintTitle}>Enterprise Architecture Map</h4>
                    <p style={pp.blueprintText}>Visual modelling of governance matrices, target processes, and stakeholder communications under TOGAF standards.</p>
                    <div style={pp.blueprintGraph}>
                      {[
                        { l: 'Governance Board', c: '#3b82f6' },
                        { l: 'Capability Mapping', c: '#60a5fa' },
                        { l: 'Transformation Roadmap', c: '#93c5fd' }
                      ].map((item, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: item.c }} />
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{item.l}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const pp = {
  title: {
    fontSize: 'var(--font-size-3xl)',
    fontWeight: 800,
    color: 'var(--text-primary)',
    letterSpacing: '-0.04em',
    marginBottom: '8px',
  },
  subtitle: {
    fontSize: 'var(--font-size-base)',
    color: 'var(--text-secondary)',
    maxWidth: '540px',
    margin: '0 auto',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '24px',
    marginTop: '48px',
  },
  card: {
    padding: '24px',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    gap: '12px',
  },
  cardHead: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTag: {
    fontSize: '0.7rem',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: 'var(--text-muted)',
    fontWeight: 600,
  },
  cardTitle: {
    fontSize: '1.2rem',
    fontWeight: 700,
    color: 'var(--text-primary)',
    lineHeight: 1.3,
  },
  cardDesc: {
    fontSize: '0.88rem',
    color: 'var(--text-secondary)',
    lineHeight: 1.5,
  },
  cardFooter: {
    marginTop: 'auto',
    paddingTop: '16px',
    borderTop: '1px solid var(--border)',
  },
  learnMoreBtn: {
    fontSize: 'var(--font-size-xs)',
    color: '#3b82f6',
    fontWeight: 600,
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
  },
  detailContainer: {
    width: '100%',
  },
  backBtn: {
    background: 'none',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    color: 'var(--text-secondary)',
    padding: '8px 16px',
    fontSize: '0.85rem',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '32px',
    transition: 'all 0.2s ease',
    '&:hover': {
      background: 'var(--bg-secondary)',
      borderColor: 'var(--border-hover)',
    }
  },
  detailHeader: {
    marginBottom: '40px',
  },
  detailTitle: {
    fontSize: 'var(--font-size-2xl)',
    fontWeight: 800,
    color: 'var(--text-primary)',
    letterSpacing: '-0.03em',
    lineHeight: 1.2,
    marginBottom: '10px',
  },
  detailSubtitle: {
    fontSize: 'var(--font-size-md)',
    color: 'var(--text-secondary)',
    marginBottom: '20px',
  },
  tagRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
  },
  detailGrid: {
    display: 'grid',
    gridTemplateColumns: '1.2fr 1fr',
    gap: '48px',
    alignItems: 'flex-start',
  },
  detailLeft: {
    display: 'flex',
    flexDirection: 'column',
  },
  detailRight: {
    width: '100%',
  },
  sectionTitle: {
    fontSize: 'var(--font-size-md)',
    fontWeight: 700,
    color: 'var(--text-primary)',
    marginBottom: '12px',
  },
  detailText: {
    fontSize: 'var(--font-size-base)',
    color: 'var(--text-secondary)',
    lineHeight: 1.7,
  },
  bullets: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  bullet: {
    display: 'flex',
    gap: '12px',
    alignItems: 'flex-start',
    fontSize: 'var(--font-size-sm)',
    color: 'var(--text-secondary)',
    lineHeight: 1.5,
  },
  imageWrapper: {
    overflow: 'hidden',
    borderRadius: '12px',
    border: '1px solid var(--border-hover)',
  },
  detailImage: {
    width: '100%',
    display: 'block',
    objectFit: 'contain',
  },
  blueprintCard: {
    padding: '32px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  blueprintTitle: {
    fontSize: '1.1rem',
    fontWeight: 700,
    color: 'var(--text-primary)',
  },
  blueprintText: {
    fontSize: '0.88rem',
    color: 'var(--text-secondary)',
    lineHeight: 1.6,
  },
  blueprintGraph: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    borderTop: '1px solid var(--border)',
    paddingTop: '20px',
    marginTop: '10px',
  },
  // Responsive layout style is handled in CSS media queries
};

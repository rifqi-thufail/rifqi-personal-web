import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ExternalLink, Mail, Phone, Award, Camera, Video, Code, Compass, Activity, Trophy, Check } from 'lucide-react';
import Gallery from '../components/Gallery';

const LinkedinIcon = ({ size = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size}
    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" />
  </svg>
);

const VARIANTS = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

const HOBBIES = [
  { name: 'Photography', icon: <Camera size={20} />, desc: 'Capturing moments through visual storytelling. Details coming soon.' },
  { name: 'Videography', icon: <Video size={20} />, desc: 'Directing and editing short cinematic clips. Details coming soon.' },
  { name: 'Coding Projects', icon: <Code size={20} />, desc: 'Architecting decentralised systems and web tools. Details coming soon.' },
  { name: 'Badminton', icon: <Activity size={20} />, desc: 'Staying active on court with competitive speed. Details coming soon.' },
  { name: 'Basketball', icon: <Trophy size={20} />, desc: 'Team play, strategy, and precision on the court. Details coming soon.' },
  { name: 'Adventure', icon: <Compass size={20} />, desc: 'Exploring nature, hiking, and outdoor discovery. Details coming soon.' },
];

const ACHIEVEMENTS = [
  {
    place: '2nd Place',
    placeColor: 'rgba(59, 130, 246, 0.9)',
    placeBorder: 'rgba(59, 130, 246, 0.25)',
    time: 'Oct 2025',
    title: 'Telkomsel × IS Expo 2025',
    desc: 'Architected a five-layer ESG IT solution on SAP BTP, integrating IoT sensors and SAP ERP modules into a unified data pipeline for real-time sustainability tracking. Designed a Carbon MRV engine covering Scope 1, 2, and 3 emissions aligned with IFRS S1 and S2.',
    sub: 'National Business Case Competition · 300+ participants',
  },
  {
    place: 'Finalist (Top 12)',
    placeColor: 'rgba(96, 165, 250, 0.9)',
    placeBorder: 'rgba(96, 165, 250, 0.25)',
    time: 'May 2026',
    title: 'Travoy Jasamarga × Marketeers WOW Case',
    desc: 'Architected an end-to-end marketing strategy targeting 30% user growth and 9% to 20% YoY customer acquisition. Designed a three-phase influencer marketing strategy applying Innovation Adoption Theory.',
    sub: 'Held by Philip Kotler\'s Markplus Inc. · 263 Teams',
  },
];

const EXTRA_ACHIEVEMENTS = [
  '1st Place, Best Expo Stand — Agile Innovation Expo ITS 2024',
  'ISCOM Game Application Development 2024 Finalist',
  'Markplus Institute bluChamp Business Plan Certified',
];

const PARTNERS = [
  { name: 'Indonesia Blockchain Center', logo: '/partners/indonesia-blockchain-center.png' },
  { name: 'Universiti Teknologi PETRONAS', logo: '/partners/universiti-teknologi-petronas.png' },
  { name: 'Institut Teknologi Sepuluh Nopember', logo: '/partners/institut-teknologi-sepuluh-nopember.svg' },
  { name: 'PT. United Tractors', logo: '/partners/pt-united-tractors.svg' },
  { name: 'Jasa Marga', logo: '/partners/jasa-marga.png' },
  { name: 'Travoy', logo: '/partners/travoy.png' },
  { name: 'Telkomsel', logo: '/partners/telkomsel.png' },
  { name: 'MarkPlus Inc', logo: '/partners/markplus-inc.png' }
];

export default function HomePage({ onNavigate }) {
  const [copied, setCopied] = useState('');

  const copyText = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {/* Hero Section */}
      <section className="hero-section" style={hs.section}>
        <div className="hero-inner" style={hs.inner}>
          {/* Eyebrow */}
          <motion.div
            variants={VARIANTS}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={hs.eyebrow}
          >
            <span style={hs.eyebrowDot} />
            <span style={hs.eyebrowText}>Available for internship · Sep 2026 – Apr 2027</span>
          </motion.div>

          {/* Heading */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <motion.h2
              variants={VARIANTS}
              initial="hidden"
              animate="show"
              transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              style={hs.introHeadline}
            >
              Hello! 👋 My name is
            </motion.h2>
            <motion.h1
              variants={VARIANTS}
              initial="hidden"
              animate="show"
              transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              style={hs.headline}
            >
              Rifqi Aufa Thufail
            </motion.h1>
          </div>

          {/* Description */}
          <motion.p
            variants={VARIANTS}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.7, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            style={hs.sub}
          >
            Information Systems leader specialising in{' '}
            <span style={hs.subAccent}>Big Data Analytics</span>,{' '}
            <span style={hs.subAccent}>Blockchain Architecture</span>, and{' '}
            <span style={hs.subAccent}>SAP ERP</span>. Dual-degree student across Malaysia and Indonesia building digital systems that scale.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={VARIANTS}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.7, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            style={hs.ctas}
            className="hero-ctas"
          >
            <button className="btn-primary" onClick={() => onNavigate('portfolio')}>
              View Portfolio <ChevronRight size={15} />
            </button>
            <button className="btn-secondary" onClick={() => {
              const el = document.getElementById('contact-direct');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}>
              Contact Info
            </button>
          </motion.div>

          {/* Centered browser mockup displaying the Gallery */}
          <motion.div
            variants={VARIANTS}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.7, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
            style={hs.browserWrapper}
            className="browser-mockup-container"
          >
            <div style={hs.browserHeader}>
              <div style={hs.browserDots}>
                <span style={{ ...hs.browserDot, background: '#ef4444' }} />
                <span style={{ ...hs.browserDot, background: '#f59e0b' }} />
                <span style={{ ...hs.browserDot, background: '#10b981' }} />
              </div>
              <div style={hs.browserAddressBar}>thufail.dev/gallery</div>
            </div>
            <div style={hs.browserContent} className="browser-mockup-content">
              <Gallery />
            </div>
          </motion.div>

          {/* Floating overview cards on the left/right - Nicepay inspired layout */}
          <div style={hs.floatingGrid} className="floating-overview-grid">
            <div className="glass-card" style={hs.floatCard}>
              <h4 style={hs.floatCardTitle}>Life Overview (80%)</h4>
              <p style={hs.floatCardText}>
                I lead an active academic life pursuing a dual degree program between Malaysia and Indonesia. I focus on big data ecosystems, predictive modelling, and enterprise architectures.
              </p>
              <div style={hs.eduMiniRow}>
                <div>
                  <span style={hs.eduMiniUni}>UTP Malaysia</span>
                  <span style={hs.eduMiniCgpa}>CGPA 3.52</span>
                </div>
                <div style={hs.eduMiniDivider} />
                <div>
                  <span style={hs.eduMiniUni}>ITS Indonesia</span>
                  <span style={hs.eduMiniCgpa}>CGPA 3.56</span>
                </div>
              </div>
            </div>

            <div className="glass-card" style={hs.floatCard}>
              <h4 style={hs.floatCardTitle}>Achievements (20%)</h4>
              <p style={hs.floatCardText}>
                Validated business case strategies, blockchain solutions, and digital marketing accomplishments across national stages.
              </p>
              <div style={hs.statsMiniGrid}>
                <div>
                  <div style={hs.statMiniVal}>2×</div>
                  <div style={hs.statMiniLbl}>Finalist</div>
                </div>
                <div>
                  <div style={hs.statMiniVal}>400K+</div>
                  <div style={hs.statMiniLbl}>Views</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Ticker */}
      <section style={hs.tickerSection}>
        <span className="label-mono" style={{ display: 'block', textAlign: 'center', marginBottom: '24px', fontSize: '0.75rem' }}>
          Collaborated With & Studied At
        </span>
        <div className="marquee-container">
          <div className="marquee-content">
            {[...PARTNERS, ...PARTNERS].map((p, idx) => (
              <div key={`p1-${idx}`} className="partner-item" title={p.name}>
                <img src={p.logo} alt={p.name} className="partner-logo" />
              </div>
            ))}
          </div>
          <div className="marquee-content" aria-hidden="true">
            {[...PARTNERS, ...PARTNERS].map((p, idx) => (
              <div key={`p2-${idx}`} className="partner-item" title={p.name}>
                <img src={p.logo} alt={p.name} className="partner-logo" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hobbies Section */}
      <section className="section-container" style={{ paddingTop: '48px', paddingBottom: '48px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span className="label-mono">My Hobbies</span>
          <h2 style={hs.sectionHeading}>What I Do Outside Classes</h2>
          <p style={hs.sectionSub}>A preview of interests and activities. Detailed stories will be filled in later.</p>
        </div>

        <div style={hs.hobbiesGrid} className="hobbies-grid">
          {HOBBIES.map((h) => (
            <div key={h.name} className="glass-card hobby-card" style={hs.hobbyCard}>
              <div style={hs.hobbyIconWrapper}>{h.icon}</div>
              <h3 style={hs.hobbyName}>{h.name}</h3>
              <p style={hs.hobbyDesc}>{h.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Accolades & Professional Achievements Section */}
      <section className="section-container" style={{ paddingTop: '48px', paddingBottom: '48px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span className="label-mono">Accolades</span>
          <h2 style={hs.sectionHeading}>Competitions & Honours</h2>
        </div>

        <div style={hs.achGrid}>
          {ACHIEVEMENTS.map((a, i) => (
            <div key={i} className="glass-card" style={hs.achCard}>
              <div style={hs.achTop}>
                <span style={{ ...hs.achPlace, color: a.placeColor, borderColor: a.placeBorder }}>{a.place}</span>
                <span style={hs.achTime}>{a.time}</span>
              </div>
              <h3 style={hs.achTitle}>{a.title}</h3>
              <p style={hs.achDesc}>{a.desc}</p>
              <div style={hs.achSubInfo}>
                <span>{a.sub}</span>
              </div>
            </div>
          ))}
        </div>

        <div style={hs.achExtras}>
          {EXTRA_ACHIEVEMENTS.map((e, i) => (
            <div key={i} style={hs.achExtra}>
              <Award size={14} style={{ color: 'var(--accent)', flexShrink: 0 }} />
              <span>{e}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section (Direct clickable links only - no form) */}
      <section id="contact-direct" className="section-container" style={{ borderTop: '1px solid var(--border)', paddingTop: '64px' }}>
        <div style={hs.contactContent}>
          <div style={{ maxWidth: '480px' }}>
            <span className="label-mono">Connect</span>
            <h2 style={hs.sectionHeading}>Let's Build Something Great</h2>
            <p style={hs.contactText}>
              Looking for an internship from September 2026 to April 2027. Reach out directly to discuss how I can contribute to your data pipelines, processes, or systems.
            </p>
          </div>

          <div style={hs.contactGrid} className="contact-links-grid">
            {[
              { label: 'WhatsApp Chat', val: '+60108228354', href: 'https://wa.me/60108228354', icon: <Phone size={18} />, actionLabel: 'Open Chat' },
              { label: 'Email Address', val: 'rifqi_26000130@utp.edu.my', href: 'mailto:rifqi_26000130@utp.edu.my', icon: <Mail size={18} />, actionLabel: 'Send Mail' },
              { label: 'LinkedIn Profile', val: 'linkedin.com/in/rifqiaufathufail', href: 'https://linkedin.com/in/rifqiaufathufail/', icon: <LinkedinIcon size={18} />, actionLabel: 'Connect', ext: true },
            ].map((c) => (
              <div key={c.label} className="glass-card" style={hs.contactCard}>
                <div style={hs.contactCardHead}>
                  <div style={hs.contactCardIcon}>{c.icon}</div>
                  <div>
                    <span style={hs.contactCardLabel}>{c.label}</span>
                    <span style={hs.contactCardVal}>{c.val}</span>
                  </div>
                </div>
                <div style={hs.contactCardActions}>
                  <a href={c.href} target={c.ext ? '_blank' : undefined} rel="noreferrer" className="btn-primary" style={{ padding: '6px 14px', fontSize: '0.8rem', gap: '4px' }}>
                    {c.actionLabel} {c.ext && <ExternalLink size={10} />}
                  </a>
                  <button onClick={() => copyText(c.val, c.label)} style={hs.copyBtn} className="copy-btn">
                    {copied === c.label ? <Check size={12} style={{ color: '#10b981' }} /> : 'Copy'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

const hs = {
  section: {
    minHeight: '100svh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '112px 24px 80px',
  },
  inner: {
    maxWidth: '1100px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    gap: '32px',
  },
  eyebrow: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    background: 'var(--border)',
    border: '1px solid var(--border-hover)',
    borderRadius: '100px',
    padding: '6px 14px',
  },
  eyebrowDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    backgroundColor: '#3b82f6',
    boxShadow: '0 0 8px rgba(59,130,246,0.6)',
    flexShrink: 0,
  },
  eyebrowText: {
    fontSize: 'var(--font-size-xs)',
    fontWeight: 500,
    color: 'var(--text-secondary)',
  },
  introHeadline: {
    fontSize: 'var(--font-size-lg)',
    fontWeight: 600,
    color: 'var(--text-secondary)',
    margin: 0,
  },
  headline: {
    fontSize: 'var(--font-size-4xl)',
    fontWeight: 800,
    letterSpacing: '-0.04em',
    lineHeight: 1.1,
    color: 'var(--text-primary)',
  },
  sub: {
    fontSize: 'var(--font-size-base)',
    lineHeight: 1.6,
    color: 'var(--text-secondary)',
    maxWidth: '680px',
    margin: 0,
  },
  subAccent: {
    color: 'var(--text-primary)',
    fontWeight: 600,
  },
  ctas: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  browserWrapper: {
    width: '100%',
    maxWidth: '840px',
    background: 'var(--bg-secondary)',
    border: '1px solid var(--border-hover)',
    borderRadius: '12px',
    boxShadow: 'var(--glass-shadow-hover)',
    overflow: 'hidden',
    marginTop: '16px',
  },
  browserHeader: {
    height: '40px',
    background: 'var(--bg-tertiary)',
    borderBottom: '1px solid var(--border)',
    display: 'flex',
    alignItems: 'center',
    padding: '0 16px',
    position: 'relative',
  },
  browserDots: {
    display: 'flex',
    gap: '6px',
    position: 'absolute',
    left: '16px',
  },
  browserDot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
  },
  browserAddressBar: {
    margin: '0 auto',
    width: '180px',
    background: 'var(--bg-secondary)',
    border: '1px solid var(--border)',
    borderRadius: '6px',
    fontSize: '0.7rem',
    color: 'var(--text-muted)',
    fontFamily: 'monospace',
    padding: '2px 0',
  },
  browserContent: {
    padding: '24px',
    background: 'var(--bg-primary)',
  },
  floatingGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '24px',
    width: '100%',
    maxWidth: '840px',
    marginTop: '24px',
  },
  floatCard: {
    padding: '24px',
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  floatCardTitle: {
    fontSize: 'var(--font-size-sm)',
    fontWeight: 700,
    color: 'var(--text-primary)',
  },
  floatCardText: {
    fontSize: '0.88rem',
    color: 'var(--text-secondary)',
    lineHeight: 1.6,
  },
  eduMiniRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginTop: 'auto',
    paddingTop: '8px',
  },
  eduMiniUni: {
    fontSize: '0.78rem',
    fontWeight: 600,
    color: 'var(--text-primary)',
    display: 'block',
  },
  eduMiniCgpa: {
    fontSize: '0.72rem',
    color: 'var(--text-muted)',
    display: 'block',
  },
  eduMiniDivider: {
    width: '1px',
    height: '24px',
    background: 'var(--border)',
  },
  statsMiniGrid: {
    display: 'flex',
    gap: '32px',
    marginTop: 'auto',
    paddingTop: '8px',
  },
  statMiniVal: {
    fontSize: '1.25rem',
    fontWeight: 700,
    color: '#3b82f6',
  },
  statMiniLbl: {
    fontSize: '0.7rem',
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
  },
  tickerSection: {
    borderTop: '1px solid var(--border)',
    borderBottom: '1px solid var(--border)',
    padding: '32px 24px',
    width: '100%',
    background: 'var(--bg-secondary)',
  },
  sectionHeading: {
    fontSize: 'var(--font-size-2xl)',
    fontWeight: 800,
    color: 'var(--text-primary)',
    letterSpacing: '-0.03em',
    marginBottom: '8px',
  },
  sectionSub: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--text-secondary)',
    maxWidth: '540px',
    margin: '0 auto',
  },
  hobbiesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '20px',
  },
  hobbyCard: {
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  hobbyIconWrapper: {
    width: '40px',
    height: '40px',
    borderRadius: '8px',
    background: 'rgba(59, 130, 246, 0.1)',
    border: '1px solid rgba(59, 130, 246, 0.2)',
    color: '#3b82f6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hobbyName: {
    fontSize: 'var(--font-size-sm)',
    fontWeight: 700,
    color: 'var(--text-primary)',
  },
  hobbyDesc: {
    fontSize: '0.85rem',
    color: 'var(--text-secondary)',
    lineHeight: 1.5,
  },
  achGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '20px',
  },
  achCard: {
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  achTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  achPlace: {
    fontSize: '0.72rem',
    fontWeight: 700,
    letterSpacing: '0.08em',
    border: '1px solid',
    borderRadius: '4px',
    padding: '2px 7px',
    textTransform: 'uppercase',
  },
  achTime: {
    fontSize: '0.72rem',
    color: 'var(--text-muted)',
    fontFamily: 'monospace',
  },
  achTitle: {
    fontSize: 'var(--font-size-md)',
    fontWeight: 700,
    color: 'var(--text-primary)',
  },
  achDesc: {
    fontSize: '0.9rem',
    lineHeight: 1.6,
    color: 'var(--text-secondary)',
  },
  achSubInfo: {
    borderTop: '1px solid var(--border)',
    paddingTop: '12px',
    marginTop: 'auto',
    fontSize: '0.72rem',
    color: 'var(--text-muted)',
  },
  achExtras: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
    marginTop: '24px',
    justifyContent: 'center',
  },
  achExtra: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: 'var(--bg-secondary)',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    padding: '9px 14px',
    fontSize: 'var(--font-size-xs)',
    color: 'var(--text-secondary)',
  },
  contactContent: {
    display: 'flex',
    gap: '48px',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  contactText: {
    fontSize: 'var(--font-size-base)',
    color: 'var(--text-secondary)',
    lineHeight: 1.7,
    marginTop: '12px',
  },
  contactGrid: {
    flex: 1,
    minWidth: '280px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  contactCard: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  contactCardHead: {
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
  },
  contactCardIcon: {
    width: '42px',
    height: '42px',
    borderRadius: '8px',
    background: 'var(--bg-tertiary)',
    border: '1px solid var(--border)',
    color: 'var(--text-primary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactCardLabel: {
    fontSize: '0.7rem',
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    display: 'block',
  },
  contactCardVal: {
    fontSize: 'var(--font-size-sm)',
    fontWeight: 600,
    color: 'var(--text-primary)',
    display: 'block',
    marginTop: '2px',
    wordBreak: 'break-all',
  },
  contactCardActions: {
    display: 'flex',
    gap: '8px',
    borderTop: '1px solid var(--border)',
    paddingTop: '12px',
  },
  copyBtn: {
    background: 'none',
    border: '1px solid var(--border)',
    borderRadius: '6px',
    color: 'var(--text-secondary)',
    fontSize: '0.8rem',
    padding: '6px 12px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    '&:hover': {
      background: 'var(--bg-tertiary)',
      borderColor: 'var(--border-hover)',
    }
  }
};
